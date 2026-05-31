#!/usr/bin/env node
// Merge itk_term_smoker_gap_raw.json into term_rates.json.
//
// Same dedupe + reshape as merge_gap.mjs, with one extra paranoia check:
// ITK is known to return placeholder/stale data when it can't really quote
// a (product × tier × age × class × face) combo. We watch for two patterns:
//
//   1. ZERO monthly premium  → reject row outright (never a real quote)
//   2. Group-level: 3+ anchors at same (product, term, tier, class, age)
//      with identical monthly premium across faces → reject the group
//      (real rates scale with face, placeholders don't)
//
// Stats reported at the end.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GAP_PATH   = path.join(__dirname, 'itk_term_smoker_gap_raw.json');
const RATES_PATH = path.join(__dirname, '..', 'src', 'data', 'term_rates.json');
const RAW_PATH   = path.join(__dirname, 'itk_term_raw.json');

if (!fs.existsSync(GAP_PATH)) {
  console.error(`Missing ${GAP_PATH}. Run scripts/run_term_smoker_scrape.mjs first.`);
  process.exit(1);
}

const gap   = JSON.parse(fs.readFileSync(GAP_PATH,'utf8'));
const rates = JSON.parse(fs.readFileSync(RATES_PATH,'utf8'));
const raw   = JSON.parse(fs.readFileSync(RAW_PATH,'utf8'));

console.log(`Gap rows to merge: ${gap.length}`);

const KNOWN_TIERS = [
  'Preferred Plus','Ultimate Preferred','Super Preferred','Elite','Preferred',
  'Select','Approved','Level','Standard Plus','Standard','Standard Extra',
  'Trendsetter Super 2021','Trendsetter LB 2017',
  'Continuation 10','Continuation 25','HMS',
  'Payment Protector Continuation','Payment Protector',
  'Simple Term Deluxe','Simple Term',
];

function extractTier(r) {
  const plan = (r.plan_name || '').trim();
  const rawTier = (r.tier_name || '').trim();
  for (const t of KNOWN_TIERS) if (plan.includes(t)) return t;
  if (KNOWN_TIERS.includes(rawTier)) return rawTier;
  if (rawTier) return rawTier;
  return 'Standard';
}

function productKey(r) {
  if (r.company === 'Americo (HMS)') {
    if (/Term 100/.test(r.plan_name)) return 'Americo (HMS Term 100)';
    if (/Term 125/.test(r.plan_name)) return 'Americo (HMS Term 125)';
  }
  return r.company;
}

function num(s) { return parseFloat(String(s).replace(/,/g, '')); }

// ── PLACEHOLDER DETECTION ─────────────────────────────────────
// Group rows by (product, tier, term, class, age). If 3+ different faces
// returned the exact same monthly premium, the carrier wasn't really quoting.
const groupKey = r => [productKey(r), extractTier(r), r.term,
  (r.sex==='Male'?'M':'F')+(r.tobacco==='Cigarettes'?'S':'NS'), r.age].join('|');
const groups = new Map();
for (const r of gap) {
  const m = num(r.monthly);
  if (!isFinite(m) || m <= 0) continue;
  const k = groupKey(r);
  if (!groups.has(k)) groups.set(k, []);
  groups.get(k).push({ face: num(r.face), monthly: m });
}
const badGroups = new Set();
for (const [k, rows] of groups) {
  if (rows.length < 3) continue;
  // Distinct faces, identical monthly → fake
  const faces = new Set(rows.map(r => r.face));
  if (faces.size < 3) continue;
  const monthlies = rows.map(r => r.monthly);
  if (monthlies.every(m => m === monthlies[0])) badGroups.add(k);
}
console.log(`Detected ${badGroups.size} placeholder groups (3+ faces, identical monthly)`);

let added = 0, dup = 0, zero = 0, junk = 0;
for (const r of gap) {
  const m = num(r.monthly);
  if (!isFinite(m) || m <= 0) { zero++; continue; }
  if (badGroups.has(groupKey(r))) { junk++; continue; }
  const product = productKey(r);
  const tier    = extractTier(r);
  const cls     = (r.sex==='Male'?'M':'F') + (r.tobacco==='Cigarettes'?'S':'NS');
  const term    = String(r.term);
  const age     = String(r.age);
  const face    = String(r.face);
  if (!rates[product])              rates[product] = {};
  if (!rates[product][term])        rates[product][term] = {};
  if (!rates[product][term][tier])  rates[product][term][tier] = {};
  if (!rates[product][term][tier][cls])         rates[product][term][tier][cls] = {};
  if (!rates[product][term][tier][cls][age])    rates[product][term][tier][cls][age] = {};
  if (rates[product][term][tier][cls][age][face] != null) {
    dup++;
  } else {
    rates[product][term][tier][cls][age][face] = m;
    added++;
  }
}

console.log(`\nMerge result:`);
console.log(`  Added:   ${added} new cells`);
console.log(`  Dup:     ${dup} (already had data — left untouched)`);
console.log(`  Zero:    ${zero} (rejected — monthly was 0/invalid)`);
console.log(`  Junk:    ${junk} (rejected — placeholder group pattern)`);
console.log(`  Total in: ${gap.length}`);

// Append gap raw rows to the master raw file so future audits see them
const combined = raw.concat(gap);
fs.writeFileSync(RAW_PATH, JSON.stringify(combined));
console.log(`  Appended ${gap.length} rows to itk_term_raw.json (now ${combined.length} total)`);

fs.writeFileSync(RATES_PATH, JSON.stringify(rates) + '\n');
console.log(`\nWrote ${RATES_PATH} (${(fs.statSync(RATES_PATH).size/1024).toFixed(0)} KB)`);
