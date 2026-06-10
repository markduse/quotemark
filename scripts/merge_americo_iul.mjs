#!/usr/bin/env node
// Merge scripts/itk_americo_iul_raw.json (from itk_americo_iul_scrape.js) into
// src/data/iul_rates.json under "Americo (Instant Decision IUL)".
//
// Schema target: { class: { age: { premium: face } } }  (class = MNS/MS/FNS/FS)
//
// PLACEHOLDER FILTER (the lesson from the reverted junk scrape): ITK returns a
// flat carrier-minimum face for EVERY premium when it can't really quote a
// (age × class) combo. Two-stage rejection:
//   1. Group-level: 3+ premium anchors for one (class, age) all returning the
//      IDENTICAL face → whole group is fake.
//   2. Row-level: face <= $50,000 (Americo IUL min) AND premium >= $200 → fake
//      (real IUL leverages far above the floor at $200+/mo).
//
// Reports the real writable matrix vs. ITK-can't-quote so we KNOW what still
// needs the Americo Agent Portal.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW = path.join(__dirname, 'itk_americo_iul_raw.json');
const RATES = path.join(__dirname, '..', 'src', 'data', 'iul_rates.json');
const PRODUCT = 'Americo (Instant Decision IUL)';
const MIN_FACE = 50000;

if (!fs.existsSync(RAW)) {
  console.error(`Missing ${RAW}\nRun scripts/itk_americo_iul_scrape.js in the ITK browser console, then drop the downloaded file here.`);
  process.exit(1);
}

const num = (s) => parseFloat(String(s).replace(/,/g, ''));
const raw = JSON.parse(fs.readFileSync(RAW, 'utf8'));
const rates = JSON.parse(fs.readFileSync(RATES, 'utf8'));
if (!rates[PRODUCT]) rates[PRODUCT] = {};

const clsOf = (r) => (r.sex === 'Male' ? 'M' : 'F') + (r.tobacco === 'Cigarettes' ? 'S' : 'NS');

// Stage 1: group-level placeholder detection
const groups = new Map();
for (const r of raw) {
  const f = num(r.face_amount);
  if (!isFinite(f) || f <= 0) continue;
  const k = clsOf(r) + '|' + r.age;
  if (!groups.has(k)) groups.set(k, []);
  groups.get(k).push({ premium: Number(r.premium), face: f });
}
const badGroups = new Set();
for (const [k, rows] of groups) {
  if (rows.length < 3) continue;
  const prems = new Set(rows.map((r) => r.premium));
  if (prems.size < 3) continue;
  const faces = rows.map((r) => r.face);
  if (faces.every((f) => f === faces[0])) badGroups.add(k);
}

let added = 0, dupe = 0, junkGroup = 0, junkRow = 0, invalid = 0;
for (const r of raw) {
  const face = num(r.face_amount);
  if (!isFinite(face) || face <= 0) { invalid++; continue; }
  const cls = clsOf(r), age = String(r.age), premium = String(r.premium);
  if (badGroups.has(cls + '|' + r.age)) { junkGroup++; continue; }
  if (face <= MIN_FACE && Number(r.premium) >= 200) { junkRow++; continue; }
  if (!rates[PRODUCT][cls]) rates[PRODUCT][cls] = {};
  if (!rates[PRODUCT][cls][age]) rates[PRODUCT][cls][age] = {};
  if (rates[PRODUCT][cls][age][premium] != null) { dupe++; continue; }
  rates[PRODUCT][cls][age][premium] = Math.round(face);
  added++;
}

console.log('── Americo IUL merge ──');
console.log(`  Raw rows:        ${raw.length}`);
console.log(`  Added (real):    ${added}`);
console.log(`  Already had:     ${dupe}`);
console.log(`  Junk (group):    ${junkGroup}  (flat face across 3+ premiums)`);
console.log(`  Junk (row):      ${junkRow}  (face<=$50k at premium>=$200)`);
console.log(`  Invalid:         ${invalid}`);

fs.writeFileSync(RATES, JSON.stringify(rates, null, 2));
console.log(`\nWrote ${RATES}`);

console.log('\n── Americo writable matrix (real anchors after merge) ──');
for (const cls of ['MNS', 'MS', 'FNS', 'FS']) {
  const ages = Object.keys(rates[PRODUCT][cls] || {}).map(Number).sort((a, b) => a - b);
  console.log(`  ${cls}: ${ages.length} ages [${ages.join(',')}]`);
}
