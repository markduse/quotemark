#!/usr/bin/env node
// Smarter Term completeness.
//
// The v1 metric counted "Pref+ tier MS class" as missing, but Preferred Plus
// is a non-smoker-only tier at virtually every carrier. So smoker rates in
// Pref+ aren't a data gap — they don't exist by carrier policy.
//
// v2: for each class, use the carrier's *eligible* tier:
//   - MNS/FNS → first tier (Pref+/Super Pref/Ultimate Pref, etc.)
//   - MS/FS  → the *lowest* tier offered, which is what smokers get
//
// Anything missing inside the eligible tier is a real scrape gap.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TERM = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src/data/term_rates.json'), 'utf8'));

const CLASSES = ['MNS','MS','FNS','FS'];

function ageRange(td) {
  let min = Infinity, max = 0;
  for (const tier of Object.keys(td)) for (const c of CLASSES) {
    const ages = Object.keys(td[tier]?.[c] || {}).map(Number);
    if (!ages.length) continue;
    min = Math.min(min, ...ages); max = Math.max(max, ...ages);
  }
  return { min, max };
}

// For smokers: pick the tier that actually has smoker data (any age).
// For non-smokers: pick the first tier (typically the best class).
function eligibleTier(td, cls) {
  const tiers = Object.keys(td);
  if (cls === 'MNS' || cls === 'FNS') return tiers[0];
  for (const t of tiers) {
    const ageList = Object.keys(td[t]?.[cls] || {});
    if (ageList.length) return t;
  }
  return null; // smoker NOT issuable
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('TERM — completeness within ISSUABLE tier for each class');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

const rows = [];
for (const product of Object.keys(TERM)) {
  const td = TERM[product]['20'] || TERM[product][Object.keys(TERM[product])[0]];
  if (!td) continue;
  const range = ageRange(td);
  if (!isFinite(range.min)) continue;
  const span = range.max - range.min + 1;
  let total = 0, have = 0, smokerEligible = 0;
  const perClass = {};
  for (const cls of CLASSES) {
    const tier = eligibleTier(td, cls);
    if (!tier) {
      // Smoker not eligible — exclude from completeness entirely (it's not a gap)
      perClass[cls] = 'N/A';
      continue;
    }
    smokerEligible += (cls==='MS'||cls==='FS') ? 1 : 0;
    const ageList = Object.keys(td[tier]?.[cls] || {}).map(Number);
    if (!ageList.length) {
      perClass[cls] = `0/${span}`;
      total += span;
      continue;
    }
    const aMin = Math.min(...ageList), aMax = Math.max(...ageList);
    let c = 0;
    for (let a = range.min; a <= range.max; a++) if (a >= aMin && a <= aMax) c++;
    have += c; total += span;
    perClass[cls] = `${c}/${span}`;
  }
  const pct = total ? Math.round(100 * have / total) : 0;
  rows.push({ product, range, perClass, total, have, pct });
}

rows.sort((a, b) => a.pct - b.pct);
console.log('\nWORST 10 (real gaps inside the tier where each class IS issuable):');
for (const r of rows.slice(0, 10)) {
  console.log(`  ${r.pct.toString().padStart(3)}% · ${r.have}/${r.total} · ages ${r.range.min}-${r.range.max} · ${r.product}`);
  console.log(`        ${Object.entries(r.perClass).map(([k,v])=>`${k}:${v}`).join('  ')}`);
}

const gt = rows.reduce((s,r)=>s+r.total,0);
const gh = rows.reduce((s,r)=>s+r.have,0);
console.log(`\nTERM REAL COMPLETENESS: ${gh}/${gt} (${Math.round(100*gh/gt)}%)`);
console.log('\nNote: Pref+/Super Pref/Ultimate Pref tiers are NON-SMOKER ONLY at virtually');
console.log('every carrier — smokers cannot qualify. So smoker cells in those tiers are');
console.log('not a "gap." This metric counts only cells the carrier WILL issue.');
