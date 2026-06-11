#!/usr/bin/env node
// Merge new FEX carrier rows (from the ITK FEX quoter, faceAmount-mode) into
// src/data/fex_rates.json.
//
// Schema: { "Company||Plan": { tier: { age: { face: monthlyPremium } } } }
//   where tier = MNS / MS / FNS / FS  (gender + smoker), and the UW class
//   (Preferred/Standard/Modified/Graded/Immediate/Level) is baked into the
//   "||Plan" half of the product key (matches existing convention).
//
// Raw rows: { company, plan_name, tier_name, sex, tobacco, age, face_req,
//             face_amount, monthly }. We key by the RETURNED face_amount so
//             carriers with $500/$1000 increments land on their real bands.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW = path.join(__dirname, 'fex_carriers_raw.json');
const RATES = path.join(__dirname, '..', 'src', 'data', 'fex_rates.json');

if (!fs.existsSync(RAW)) { console.error(`Missing ${RAW}`); process.exit(1); }
const num = (s) => parseFloat(String(s).replace(/,/g, ''));
const raw = JSON.parse(fs.readFileSync(RAW, 'utf8'));
const rates = JSON.parse(fs.readFileSync(RATES, 'utf8'));

const clsOf = (r) => (r.sex === 'Male' ? 'M' : 'F') + (r.tobacco === 'Cigarettes' ? 'S' : 'NS');

let added = 0, dupe = 0, invalid = 0;
const productCells = {};
for (const r of raw) {
  const prem = num(r.monthly), face = num(r.face_amount);
  if (!isFinite(prem) || prem <= 0 || !isFinite(face) || face <= 0) { invalid++; continue; }
  const product = `${r.company}||${r.plan_name}`;
  const cls = clsOf(r), age = String(r.age), faceKey = String(Math.round(face));
  if (!rates[product]) rates[product] = {};
  if (!rates[product][cls]) rates[product][cls] = {};
  if (!rates[product][cls][age]) rates[product][cls][age] = {};
  if (rates[product][cls][age][faceKey] != null) { dupe++; continue; }
  rates[product][cls][age][faceKey] = prem;
  added++;
  productCells[product] = (productCells[product] || 0) + 1;
}

console.log('── FEX carriers merge ──');
console.log(`  Raw rows:  ${raw.length}`);
console.log(`  Added:     ${added}`);
console.log(`  Dupe:      ${dupe}`);
console.log(`  Invalid:   ${invalid}`);
console.log('\n── New/updated products (cells) ──');
for (const [p, n] of Object.entries(productCells).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)} · ${p}`);
}

fs.writeFileSync(RATES, JSON.stringify(rates));
console.log(`\nWrote ${RATES} (${(fs.statSync(RATES).size / 1024).toFixed(0)} KB)`);

// Per-product class+age coverage summary
console.log('\n── Coverage per new product ──');
for (const p of Object.keys(productCells)) {
  const parts = [];
  for (const cls of ['MNS', 'MS', 'FNS', 'FS']) {
    const ages = Object.keys(rates[p][cls] || {}).map(Number).sort((a, b) => a - b);
    if (ages.length) parts.push(`${cls}:${ages[0]}-${ages[ages.length - 1]}(${ages.length})`);
  }
  console.log(`  ${p.split('||')[0]} | ${p.split('||')[1]}`);
  console.log(`     ${parts.join('  ')}`);
}
