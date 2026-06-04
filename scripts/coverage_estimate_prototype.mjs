#!/usr/bin/env node
// Prototype the coverage estimator before wiring it into App.jsx.
//
// For each prospect profile, reverse-lookup the FEX/WL rate table:
//   - For every product (73 of them), find which face anchor's premium
//     at (issue_age, class) is closest to the entered monthly premium
//   - That product would have sold roughly that face for that premium
// - Aggregate: p25 / median / p75 across all products that returned a hit
//
// Tobacco "Unknown" mode: blends MNS+MS (or FNS+FS) — averages the face
// implied by each class so we don't bias smoker or non-smoker.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FEX = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src/data/fex_rates.json'), 'utf8'));

// Reverse-lookup face from premium at a given (product, age, class).
// FEX shape: { "Company||Plan": { cls: { age: { face: monthlyPremium } } } }
// (Tier is baked into the plan name — no separate tier layer.)
function faceForPremium(productTbl, age, cls, targetPrem) {
  const ageMap = productTbl?.[cls];
  if (!ageMap) return null;
  const rates = ageMap[String(age)];
  if (!rates) return null;
  const candidates = Object.entries(rates).map(([face, prem]) => ({
    face: Number(face),
    prem: Number(prem),
  }));
  if (!candidates.length) return null;
  candidates.sort((a, b) => Math.abs(a.prem - targetPrem) - Math.abs(b.prem - targetPrem));
  return candidates[0];
}

// Standard/Modified/Graded/Level — what 80% of FE buyers actually get.
// Exclude Preferred (top ~10%), GI (bottom catch-all), ROP (niche), juvenile,
// Eagle Select Plan 1 (Americo's Preferred-equivalent), plus MOO and Baltimore
// (Mark's call — they price as outliers and skew the band).
function isStandardTier(productKey) {
  const carrier = productKey.split('||')[0] || '';
  const plan = productKey.split('||')[1] || '';
  if (/Preferred/i.test(plan)) return false;
  if (/Guaranteed Issue|^GI\b/i.test(plan)) return false;
  if (/\bROP\b/i.test(plan)) return false;
  if (/BrightFuture|Children/i.test(plan)) return false;
  if (/Plan 1$/.test(plan)) return false; // Americo Eagle Select Plan 1 (Pref tier)
  if (/Mutual of Omaha/i.test(carrier)) return false; // outlier
  if (/Baltimore/i.test(carrier)) return false;        // outlier
  return true;
}

function estimate({ currentAge, policyYears, monthlyPremium, gender, tobacco }) {
  const issueAge = currentAge - policyYears;
  const classes =
    tobacco === 'unknown' ? (gender === 'M' ? ['MNS', 'MS'] : ['FNS', 'FS']) :
    tobacco === 'S' ? (gender === 'M' ? ['MS'] : ['FS']) :
    (gender === 'M' ? ['MNS'] : ['FNS']);

  const productFaces = [];
  for (const productKey of Object.keys(FEX)) {
    if (!isStandardTier(productKey)) continue;
    const tbl = FEX[productKey];
    const perClassFaces = [];
    for (const cls of classes) {
      const hit = faceForPremium(tbl, issueAge, cls, monthlyPremium);
      if (hit) perClassFaces.push(hit.face);
    }
    if (perClassFaces.length) {
      // Average the face across smoker/nonsmoker if unknown
      const avg = perClassFaces.reduce((s, f) => s + f, 0) / perClassFaces.length;
      productFaces.push(avg);
    }
  }
  if (!productFaces.length) return { error: 'no products matched at that issue age' };
  productFaces.sort((a, b) => a - b);
  const pct = p => productFaces[Math.floor(p * (productFaces.length - 1))];
  return {
    issueAge,
    productsMatched: productFaces.length,
    p10: Math.round(pct(0.1)),
    p25: Math.round(pct(0.25)),
    median: Math.round(pct(0.5)),
    p75: Math.round(pct(0.75)),
    p90: Math.round(pct(0.9)),
    classes,
  };
}

// Realistic prospect profiles
const PROFILES = [
  { label: 'Female 65, $40/mo, 5yrs (small FE, unknown tobacco)', currentAge: 65, policyYears: 5, monthlyPremium: 40, gender: 'F', tobacco: 'unknown' },
  { label: 'Male 70, $60/mo, 10yrs (mid FE, unknown tobacco)',   currentAge: 70, policyYears: 10, monthlyPremium: 60, gender: 'M', tobacco: 'unknown' },
  { label: 'Male 55, $30/mo, 8yrs (low premium, unknown)',       currentAge: 55, policyYears: 8, monthlyPremium: 30, gender: 'M', tobacco: 'unknown' },
  { label: 'Female 75, $80/mo, 3yrs (later FE, unknown)',        currentAge: 75, policyYears: 3, monthlyPremium: 80, gender: 'F', tobacco: 'unknown' },
  { label: 'Male 60, $100/mo, 15yrs (mid-size WL, unknown)',     currentAge: 60, policyYears: 15, monthlyPremium: 100, gender: 'M', tobacco: 'unknown' },
  { label: 'Female 80, $50/mo, 2yrs (senior FE, unknown)',       currentAge: 80, policyYears: 2, monthlyPremium: 50, gender: 'F', tobacco: 'unknown' },
  // Same as #1 but tobacco specified — see how the band tightens
  { label: 'Female 65, $40/mo, 5yrs (NS specified — narrow)',    currentAge: 65, policyYears: 5, monthlyPremium: 40, gender: 'F', tobacco: 'NS' },
  { label: 'Female 65, $40/mo, 5yrs (S specified — narrow)',     currentAge: 65, policyYears: 5, monthlyPremium: 40, gender: 'F', tobacco: 'S' },
];

console.log('━'.repeat(70));
console.log('COVERAGE ESTIMATE PROTOTYPE — reverse-lookup of FEX/WL rate tables');
console.log('━'.repeat(70));
console.log();

for (const p of PROFILES) {
  const r = estimate(p);
  if (r.error) {
    console.log(p.label);
    console.log('  ⚠️  ' + r.error + '\n');
    continue;
  }
  const fmt = n => '$' + n.toLocaleString();
  console.log(p.label);
  console.log(`  issue age ${r.issueAge} · ${r.productsMatched} products matched`);
  console.log(`  Most likely:  ${fmt(r.median)}`);
  console.log(`  Likely range: ${fmt(r.p25)} – ${fmt(r.p75)}`);
  console.log(`  Outer band:   ${fmt(r.p10)} – ${fmt(r.p90)}`);
  console.log();
}
