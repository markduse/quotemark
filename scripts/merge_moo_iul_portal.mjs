#!/usr/bin/env node
// Merge moo_iul_portal_raw.json into src/data/iul_rates.json under
//   "Mutual of Omaha (Indexed Universal Life Express)" / cls / age / premium.
//
// Junk filter (paranoia from the ITK lesson):
//  1. ZERO face → reject
//  2. Group-level: 3+ different premiums returning identical face for a single
//     (age, cls) → reject group (placeholder pattern)
//  3. Row-level: face <= $25,000 (carrier minimum) AND premium >= $200 → reject
//     (real rates differentiate above the floor)
//
// Reports added / dupe / overwritten / junked counts.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_PATH   = path.join(__dirname, 'moo_iul_portal_raw.json');
const RATES_PATH = path.join(__dirname, '..', 'src', 'data', 'iul_rates.json');
const PRODUCT = 'Mutual of Omaha (Indexed Universal Life Express)';
const MOO_MIN_FACE = 25000;

if (!fs.existsSync(RAW_PATH)) {
  console.error(`Missing ${RAW_PATH}. Run scripts/run_moo_iul_scrape.mjs first.`);
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(RAW_PATH, 'utf8'));
const rates = JSON.parse(fs.readFileSync(RATES_PATH, 'utf8'));

if (!rates[PRODUCT]) rates[PRODUCT] = {};

// Group by (cls, age) and detect placeholder pattern
const groupKey = r => `${r.cls}|${r.age}`;
const groups = new Map();
for (const r of raw) {
  if (!isFinite(r.face) || r.face <= 0) continue;
  if (!groups.has(groupKey(r))) groups.set(groupKey(r), []);
  groups.get(groupKey(r)).push(r);
}
const badGroups = new Set();
for (const [k, rows] of groups) {
  if (rows.length < 3) continue;
  const prems = new Set(rows.map(r => r.premium));
  if (prems.size < 3) continue;
  const faces = rows.map(r => r.face);
  if (faces.every(f => f === faces[0])) badGroups.add(k);
}
console.log(`Detected ${badGroups.size} placeholder groups (3+ premiums, identical face)`);

let added = 0, dup = 0, junk = 0, suspect = 0, zero = 0;
for (const r of raw) {
  if (!isFinite(r.face) || r.face <= 0) { zero++; continue; }
  if (badGroups.has(groupKey(r))) { junk++; continue; }
  if (r.face <= MOO_MIN_FACE && r.premium >= 200) { suspect++; continue; }
  if (!rates[PRODUCT][r.cls]) rates[PRODUCT][r.cls] = {};
  if (!rates[PRODUCT][r.cls][r.age]) rates[PRODUCT][r.cls][r.age] = {};
  if (rates[PRODUCT][r.cls][r.age][r.premium] != null) {
    dup++;
    continue;
  }
  rates[PRODUCT][r.cls][r.age][r.premium] = r.face;
  added++;
}

console.log(`Merge result:`);
console.log(`  Added:    ${added}`);
console.log(`  Existing: ${dup} (preserved)`);
console.log(`  Junk:     ${junk} (placeholder group)`);
console.log(`  Suspect:  ${suspect} (face <= carrier min at premium >= 200)`);
console.log(`  Zero:     ${zero}`);
console.log(`  Total in: ${raw.length}`);

fs.writeFileSync(RATES_PATH, JSON.stringify(rates, null, 2));
console.log(`\nWrote ${RATES_PATH}`);

// Updated coverage snapshot
console.log('\n=== MOO IUL coverage after merge ===');
for (const cls of ['MNS', 'MS', 'FNS', 'FS']) {
  const ages = Object.keys(rates[PRODUCT][cls] || {}).map(Number).sort((a, b) => a - b);
  console.log(`  ${cls}: ${ages.length} ages [${ages.join(',')}]`);
}
