#!/usr/bin/env node
// Merge itk_iul_gap_raw.json into src/data/iul_rates.json.
//
// Same dedupe pattern as merge_gap.mjs:
// - For each gap row, derive (product, class, age, premium) and write the face
// - Skip if the cell is already present (preserves original scrape values)
// - Report how many cells were added / skipped / overwritten

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const GAP_PATH  = path.join(__dirname, 'itk_iul_gap_raw.json');
const RATES_PATH = path.join(__dirname, '..', 'src', 'data', 'iul_rates.json');

if (!fs.existsSync(GAP_PATH)) {
  console.error('Missing', GAP_PATH);
  console.error('Run scripts/itk_iul_gap_scrape.js in the ITK browser console first,');
  console.error('then call window.__qm_iul_save() and place the downloaded file here.');
  process.exit(1);
}

const gap = JSON.parse(fs.readFileSync(GAP_PATH, 'utf8'));
const rates = JSON.parse(fs.readFileSync(RATES_PATH, 'utf8'));

function num(s) { return parseFloat(String(s).replace(/,/g, '')); }

// ITK PLACEHOLDER DETECTION
// When ITK can't really quote a (product × age × sex × tobacco × premium)
// combo, it returns the carrier's minimum face ($50,000 for Americo, etc.)
// across EVERY premium anchor instead of a real differentiated rate. This
// is junk data — at $500/mo a 30yo non-smoker should get $500k+ face, not
// $50k. Two-stage filter:
//
// 1. Group-level: if 3+ anchors at the same (product, age, sex, tobacco)
//    combo all return the IDENTICAL face, the whole group is fake.
// 2. Row-level: any single row where face is at or below the carrier's
//    declared minimum face AND premium is >= $200 is suspect because real
//    quotes scale up with premium.
const CARRIER_MIN_FACE = {
  'Americo (Instant Decision IUL)': 50000,
  'Mutual of Omaha (Indexed Universal Life Express)': 25000,
};
const groupKey = r => r.company + '|' + r.sex + '|' + r.tobacco + '|' + r.age;
const groups = new Map();
for (const r of gap) {
  const k = groupKey(r);
  if (!groups.has(k)) groups.set(k, []);
  groups.get(k).push(r);
}
const badGroups = new Set();
for (const [k, rows] of groups) {
  if (rows.length < 3) continue;
  const faces = rows.map(r => num(r.face_amount));
  if (faces.every(f => f === faces[0])) badGroups.add(k);
}
console.log(`Detected ${badGroups.size} placeholder groups (3+ anchors identical face)`);

let added = 0, skipped = 0, dupes = 0, invalid = 0, junk = 0, suspect = 0;
for (const r of gap) {
  const product = r.company;
  if (!product) { invalid++; continue; }
  if (badGroups.has(groupKey(r))) { junk++; continue; }
  const face = num(r.face_amount);
  if (!isFinite(face) || face <= 0) { invalid++; continue; }
  // Row-level: at premium >= $200, face hitting the carrier minimum is
  // almost certainly a placeholder return, not a real quote.
  const minFace = CARRIER_MIN_FACE[product];
  if (minFace && face <= minFace && Number(r.premium) >= 200) { suspect++; continue; }
  const cls = (r.sex === 'Male' ? 'M' : 'F') + (r.tobacco === 'Cigarettes' ? 'S' : 'NS');
  const age = String(r.age);
  const premium = String(r.premium);

  if (!rates[product]) rates[product] = {};
  if (!rates[product][cls]) rates[product][cls] = {};
  if (!rates[product][cls][age]) rates[product][cls][age] = {};

  if (rates[product][cls][age][premium] != null) {
    dupes++;
    continue;
  }
  rates[product][cls][age][premium] = Math.round(face);
  added++;
}
console.log(`  Group-level junk filtered: ${junk}`);
console.log(`  Row-level suspect filtered: ${suspect} (face <= carrier min at premium >= $200)`);

console.log(`Merge complete:`);
console.log(`  Added:    ${added}`);
console.log(`  Existing: ${dupes} (preserved original)`);
console.log(`  Invalid:  ${invalid}`);
console.log(`  Total processed: ${gap.length}`);

fs.writeFileSync(RATES_PATH, JSON.stringify(rates, null, 2));
console.log(`\nWrote updated iul_rates.json`);

// Re-summary the coverage
console.log('\n=== UPDATED COVERAGE ===');
for (const product of Object.keys(rates)) {
  console.log(product + ':');
  for (const cls of ['MNS', 'MS', 'FNS', 'FS']) {
    const ages = Object.keys(rates[product][cls] || {}).map(Number).sort((a,b)=>a-b);
    console.log(`  ${cls}: ${ages.length} ages [${ages.join(',')}]`);
  }
}
