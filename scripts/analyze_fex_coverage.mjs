#!/usr/bin/env node
// Analyze fex_rates.json coverage to decide if Phase B scrape is warranted.
// Reports per-age-bracket: # products, # face anchors per product, gap density.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FEX = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'fex_rates.json'), 'utf8'));

const products = Object.keys(FEX);
const TIERS = ['MNS', 'MS', 'FNS', 'FS'];

function bucket(age) {
  if (age < 18) return '01-17 juvenile';
  if (age < 30) return '18-29 young adult';
  if (age < 50) return '30-49 mid adult';
  if (age < 75) return '50-74 senior';
  return '75-89 senior+';
}

// Per-bucket: how many (product × tier × age × face) cells populated?
const buckets = {};
const productsByBucket = {};

for (const p of products) {
  for (const tier of TIERS) {
    const tierData = FEX[p][tier];
    if (!tierData) continue;
    for (const ageStr of Object.keys(tierData)) {
      const age = +ageStr;
      const b = bucket(age);
      buckets[b] = (buckets[b] || 0) + Object.keys(tierData[ageStr]).length;
      if (!productsByBucket[b]) productsByBucket[b] = new Set();
      productsByBucket[b].add(p);
    }
  }
}

console.log('=== COVERAGE BY AGE BRACKET ===');
for (const [b, cells] of Object.entries(buckets)) {
  const prods = productsByBucket[b]?.size || 0;
  console.log(`  ${b.padEnd(20)} : ${cells.toString().padStart(6)} cells across ${prods.toString().padStart(2)} products`);
}

// For each product, find: min age, max age, # face anchors per typical age (median)
console.log('\n=== JUVENILE-CAPABLE PRODUCT DETAIL (min age <18, MNS tier) ===');
for (const p of products) {
  const mns = FEX[p].MNS;
  if (!mns) continue;
  const ages = Object.keys(mns).map(Number).sort((a, b) => a - b);
  if (ages[0] >= 18) continue;
  const facesAtMinAge = Object.keys(mns[ages[0]]);
  const allFaces = new Set();
  for (const age of ages) for (const f of Object.keys(mns[age])) allFaces.add(+f);
  const sortedFaces = [...allFaces].sort((a, b) => a - b);
  console.log(`  ${p}`);
  console.log(`    ages: ${ages[0]}-${ages[ages.length - 1]} (${ages.length} ages populated)`);
  console.log(`    faces in juvenile band: ${facesAtMinAge.map(f => '$' + (+f).toLocaleString()).join(', ')}`);
  console.log(`    face anchors total: ${sortedFaces.length} (${sortedFaces.length > 6 ? sortedFaces.slice(0, 3).map(f => '$' + (+f / 1000) + 'k').join(',') + '...' + sortedFaces.slice(-2).map(f => '$' + (+f / 1000) + 'k').join(',') : sortedFaces.map(f => '$' + (+f / 1000) + 'k').join(',')})`);
}

// Gap analysis: for each (product, tier), how many ages between minAge and maxAge are missing?
console.log('\n=== GAP DENSITY — ages 18-49 (MNS) ===');
console.log('Products that quote at age 18 OR age 49 but have gaps in between:');
const gapReport = [];
for (const p of products) {
  const mns = FEX[p].MNS;
  if (!mns) continue;
  const ages = Object.keys(mns).map(Number).sort((a, b) => a - b);
  const inBracket = ages.filter(a => a >= 18 && a <= 49);
  if (inBracket.length === 0) continue;
  const minA = inBracket[0], maxA = inBracket[inBracket.length - 1];
  const span = maxA - minA + 1;
  const present = inBracket.length;
  const missing = span - present;
  if (missing > 0) {
    gapReport.push({ p, minA, maxA, present, missing, density: ((present / span) * 100).toFixed(0) + '%' });
  }
}
gapReport.sort((a, b) => b.missing - a.missing);
for (const g of gapReport.slice(0, 15)) {
  console.log(`  [${g.density.padStart(4)} dense] ${g.minA}-${g.maxA}: ${g.present}/${g.maxA - g.minA + 1} ages · ${g.missing} gaps · ${g.p}`);
}

// Total: how many (product × age 18-49 × MNS) cells would a full backfill add?
const TARGET_AGES = [];
for (let a = 18; a <= 49; a++) TARGET_AGES.push(a);
const allProductsWithAnyData = products.filter(p => FEX[p].MNS && Object.keys(FEX[p].MNS).length > 0);
let totalCells = 0, missingCells = 0;
for (const p of allProductsWithAnyData) {
  for (const tier of TIERS) {
    const td = FEX[p][tier];
    if (!td) continue;
    for (const a of TARGET_AGES) {
      // If neighboring ages exist (sandwiched), this is a "fillable" cell
      const ages = Object.keys(td).map(Number);
      const min = Math.min(...ages), max = Math.max(...ages);
      if (a >= min && a <= max) {
        totalCells++;
        if (!td[a]) missingCells++;
      }
    }
  }
}
console.log(`\n=== POTENTIAL BACKFILL (ages 18-49, all tiers, all products with any data) ===`);
console.log(`  Total cells in scope: ${totalCells}`);
console.log(`  Missing cells:        ${missingCells} (${((missingCells / totalCells) * 100).toFixed(0)}%)`);
console.log(`  These would be filled by interpolation since the surrounding ages exist.`);
