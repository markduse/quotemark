#!/usr/bin/env node
// Identify the SMOKER-class age gaps inside each term product's writable range.
//
// Approach:
// - For each product × term-length × MS/FS class:
//   1. Find the *eligible* tier (the lowest tier that has any smoker data —
//      this is the one smokers actually qualify for).
//   2. Compute the (smoker) age range from any-class data (non-smoker ages
//      tell us how far the product writes overall).
//   3. Inside that range, list any age the eligible tier doesn't have data for.
// - Collapse all gaps into unique (sex, tobacco, term, age, face) combos, since
//   one ITK call returns every product at once.
//
// Face anchors mirror the original ITK scrape: 50k, 100k, 250k, 500k, 1M.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TERM = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src/data/term_rates.json'), 'utf8'));

const SMOKER_CLASSES = ['MS', 'FS'];
const TERMS = ['10', '15', '20', '25', '30'];
const FACES = [50000, 100000, 250000, 500000, 1000000];

function rangeOf(td) {
  let min = Infinity, max = 0;
  for (const tier of Object.keys(td)) for (const c of ['MNS','MS','FNS','FS']) {
    const ages = Object.keys(td[tier]?.[c] || {}).map(Number);
    if (!ages.length) continue;
    min = Math.min(min, ...ages); max = Math.max(max, ...ages);
  }
  return { min, max };
}

function eligibleTier(td, cls) {
  const tiers = Object.keys(td);
  for (const t of tiers) if (Object.keys(td[t]?.[cls] || {}).length) return t;
  return null;
}

// Track which (sex, tobacco, term, age) tuples need scraping.
const needed = new Map(); // key → { sex, tobacco, term, age }
const productAudit = [];

for (const product of Object.keys(TERM)) {
  for (const T of TERMS) {
    const td = TERM[product][T];
    if (!td) continue;
    const rng = rangeOf(td);
    if (!isFinite(rng.min)) continue;
    for (const cls of SMOKER_CLASSES) {
      const tier = eligibleTier(td, cls);
      if (!tier) continue; // product doesn't issue to this smoker class at all
      const ages = Object.keys(td[tier]?.[cls] || {}).map(Number);
      if (!ages.length) continue;
      const aMin = Math.min(...ages), aMax = Math.max(...ages);
      // Inside the product's range, find gaps between rng.min..rng.max where
      // we don't have data. We scrape at standard age anchors only (25/30/35
      // /40/45/50/55/60/65/70) so we don't blow up the request count.
      const ANCHORS = [25,30,35,40,45,50,55,60,65,70];
      for (const age of ANCHORS) {
        if (age < rng.min || age > rng.max) continue;
        if (age >= aMin && age <= aMax) continue;
        const sex = cls.startsWith('M') ? 'Male' : 'Female';
        for (const face of FACES) {
          const k = `${sex}|Cigarettes|${T}|${age}|${face}`;
          if (!needed.has(k)) {
            needed.set(k, { sex, tobacco: 'Cigarettes', term: T, age, face });
          }
        }
        productAudit.push({ product, term: T, cls, age });
      }
    }
  }
}

const combos = [...needed.values()];
const OUT = path.join(__dirname, 'term_smoker_gap_combos.json');
fs.writeFileSync(OUT, JSON.stringify(combos, null, 2));

console.log(`Identified ${productAudit.length} (product × term × class × age) gap cells`);
console.log(`Distinct ITK calls needed: ${combos.length}`);
console.log(`Wrote ${OUT}\n`);

// Show breakdown
const byProduct = new Map();
for (const r of productAudit) {
  byProduct.set(r.product, (byProduct.get(r.product) || 0) + 1);
}
console.log('Cells per product:');
for (const [p, n] of [...byProduct.entries()].sort((a,b)=>b[1]-a[1])) {
  console.log(`  ${String(n).padStart(3)} · ${p}`);
}

// And by (term, age, class):
const byTAC = new Map();
for (const r of productAudit) {
  const k = `T${r.term} ${r.cls} age ${r.age}`;
  byTAC.set(k, (byTAC.get(k) || 0) + 1);
}
console.log('\nGap cells per (term, class, age):');
for (const [k, n] of [...byTAC.entries()].sort()) {
  console.log(`  ${String(n).padStart(2)} · ${k}`);
}
