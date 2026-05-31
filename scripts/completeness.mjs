#!/usr/bin/env node
// "Completeness" = within each product's actual issue-age range, what % of
// the ages × classes do we have rate data for? Tells us exactly what's
// missing and where to scrape next.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const D = p => path.join(__dirname, '..', 'src', 'data', p);
const FEX = JSON.parse(fs.readFileSync(D('fex_rates.json'), 'utf8'));
const TERM = JSON.parse(fs.readFileSync(D('term_rates.json'), 'utf8'));
const IUL = JSON.parse(fs.readFileSync(D('iul_rates.json'), 'utf8'));
const FAC = JSON.parse(fs.readFileSync(D('rate_factors.json'), 'utf8'));

const CLASSES = ['MNS','MS','FNS','FS'];

// ── IUL — official issue ranges per carrier ──
const IUL_RANGES = {
  'Americo (Instant Decision IUL)':                    { min: 18, max: 80 },
  'Mutual of Omaha (Indexed Universal Life Express)':  { min: 18, max: 75 },
};

// ── FEX — for each product, determine the carrier's actual writable range
//    by taking the WIDEST age range across all classes. Anything inside that
//    range with no data is a gap (combos the carrier writes but we missed).
function rangeOf(productData) {
  let min = Infinity, max = 0;
  for (const cls of CLASSES) {
    const ages = Object.keys(productData?.[cls] || {}).map(Number);
    if (!ages.length) continue;
    min = Math.min(min, ...ages);
    max = Math.max(max, ...ages);
  }
  return { min, max };
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('IUL — completeness within each carrier\'s issue window');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
const iulRows = [];
for (const product of Object.keys(IUL)) {
  const range = IUL_RANGES[product] || rangeOf(IUL[product]);
  const span = range.max - range.min + 1;
  const total = span * CLASSES.length;
  let have = 0;
  const missing = [];
  for (const cls of CLASSES) {
    const ageList = Object.keys(IUL[product]?.[cls] || {}).map(Number);
    if (!ageList.length) { for (let a=range.min;a<=range.max;a++) missing.push(`${cls} age ${a}`); continue; }
    const aMin = Math.min(...ageList), aMax = Math.max(...ageList);
    for (let a = range.min; a <= range.max; a++) {
      // Covered if within the populated range (interpolation fills gaps)
      if (a >= aMin && a <= aMax) have++;
      else missing.push(`${cls} age ${a}`);
    }
  }
  const pct = Math.round(100 * have / total);
  iulRows.push({ product, range, have, total, pct, missing });
}
for (const r of iulRows) {
  console.log(`\n${r.product.split(' (')[0]}  (ages ${r.range.min}-${r.range.max}):`);
  console.log(`  Completeness: ${r.have}/${r.total}  (${r.pct}%)`);
  console.log(`  Missing: ${r.total - r.have} cells across 4 classes × ${r.range.max - r.range.min + 1} ages`);
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('FEX/WL — completeness within each product\'s discovered range');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
// For each product, the "writable range" is the widest age span we've seen
// from ITK. Missing cells are gaps INSIDE that range (real data ITK didn't
// return on that scrape pass).
const fexRows = [];
for (const product of Object.keys(FEX)) {
  const range = rangeOf(FEX[product]);
  if (!isFinite(range.min)) continue;
  const span = range.max - range.min + 1;
  const total = span * CLASSES.length;
  let have = 0;
  for (const cls of CLASSES) {
    const ageList = Object.keys(FEX[product]?.[cls] || {}).map(Number);
    if (!ageList.length) continue;
    const aMin = Math.min(...ageList), aMax = Math.max(...ageList);
    for (let a = range.min; a <= range.max; a++) if (a >= aMin && a <= aMax) have++;
  }
  fexRows.push({ product, range, have, total, pct: Math.round(100 * have / total) });
}
fexRows.sort((a, b) => a.pct - b.pct);
console.log('\nWORST 10 (most gaps inside known writable range):');
for (const r of fexRows.slice(0, 10)) {
  console.log(`  ${r.pct.toString().padStart(3)}% · ${r.have}/${r.total} cells · ages ${r.range.min}-${r.range.max} · ${r.product}`);
}
const fexTotal = fexRows.reduce((s, r) => s + r.total, 0);
const fexHave  = fexRows.reduce((s, r) => s + r.have, 0);
console.log(`\nFEX OVERALL: ${fexHave}/${fexTotal}  (${Math.round(100 * fexHave / fexTotal)}% complete inside discovered ranges)`);

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('TERM — completeness within each product\'s discovered range');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
const termRows = [];
for (const product of Object.keys(TERM)) {
  // Pick the most popular term length (20yr) as the representative
  const td = TERM[product]['20'] || TERM[product][Object.keys(TERM[product])[0]];
  if (!td) continue;
  const tiers = Object.keys(td);
  const range = { min: Infinity, max: 0 };
  for (const tier of tiers) for (const cls of CLASSES) {
    const ages = Object.keys(td[tier]?.[cls] || {}).map(Number);
    if (!ages.length) continue;
    range.min = Math.min(range.min, ...ages);
    range.max = Math.max(range.max, ...ages);
  }
  if (!isFinite(range.min)) continue;
  const span = range.max - range.min + 1;
  const total = span * CLASSES.length;
  // For the first/best tier, count age × class hits
  const bestTier = tiers[0];
  let have = 0;
  for (const cls of CLASSES) {
    const ageList = Object.keys(td[bestTier]?.[cls] || {}).map(Number);
    if (!ageList.length) continue;
    const aMin = Math.min(...ageList), aMax = Math.max(...ageList);
    for (let a = range.min; a <= range.max; a++) if (a >= aMin && a <= aMax) have++;
  }
  termRows.push({ product, range, have, total, pct: Math.round(100 * have / total) });
}
termRows.sort((a, b) => a.pct - b.pct);
console.log('\nWORST 10:');
for (const r of termRows.slice(0, 10)) {
  console.log(`  ${r.pct.toString().padStart(3)}% · ${r.have}/${r.total} cells · ages ${r.range.min}-${r.range.max} · ${r.product}`);
}
const termTotal = termRows.reduce((s, r) => s + r.total, 0);
const termHave  = termRows.reduce((s, r) => s + r.have, 0);
console.log(`\nTERM OVERALL: ${termHave}/${termTotal}  (${Math.round(100 * termHave / termTotal)}% complete inside discovered ranges)`);

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('NET ANSWER PER TAB');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`IUL : ${Math.round(iulRows.reduce((s,r)=>s+r.have,0)/iulRows.reduce((s,r)=>s+r.total,0)*100)}% complete inside Americo's 18-80 + MOO's 18-75 windows`);
console.log(`FEX : ${Math.round(fexHave/fexTotal*100)}% complete inside each product's discovered range`);
console.log(`TERM: ${Math.round(termHave/termTotal*100)}% complete inside each product's discovered range`);
