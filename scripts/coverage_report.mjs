#!/usr/bin/env node
// Honest coverage report across FEX, Term, IUL.
// "Coverage" = % of realistic agent-profile combos that produce a quote.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const D = p => path.join(__dirname, '..', 'src', 'data', p);

const FEX = JSON.parse(fs.readFileSync(D('fex_rates.json'), 'utf8'));
const TERM = JSON.parse(fs.readFileSync(D('term_rates.json'), 'utf8'));
const IUL = JSON.parse(fs.readFileSync(D('iul_rates.json'), 'utf8'));

const CLASSES = ['MNS', 'MS', 'FNS', 'FS'];

// ─────────────────────────────────────────────────────────────
// IUL — what % of realistic profiles get at least one quote?
// ─────────────────────────────────────────────────────────────
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('IUL COVERAGE — Americo & MOO');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
{
  const carriers = [
    { name: 'Americo (Instant Decision IUL)',                  maxAge: 80 },
    { name: 'Mutual of Omaha (Indexed Universal Life Express)', maxAge: 75 },
  ];
  const AGES = [];
  for (let a = 18; a <= 80; a += 1) AGES.push(a);

  for (const { name, maxAge } of carriers) {
    const tbl = IUL[name];
    if (!tbl) { console.log(name + ': NO DATA'); continue; }

    let total = 0, covered = 0;
    const byClass = {};
    for (const cls of CLASSES) {
      byClass[cls] = { total: 0, covered: 0 };
      const ages = Object.keys(tbl[cls] || {}).map(Number).sort((a, b) => a - b);
      const minA = ages[0] || 18;
      const maxA_data = ages[ages.length - 1] || maxAge;
      for (const a of AGES) {
        if (a > maxAge) continue; // outside carrier's issuable range
        byClass[cls].total++;
        total++;
        // Is this age covered? Either has direct data OR sits between two anchors.
        if (a >= minA && a <= maxA_data) { byClass[cls].covered++; covered++; }
      }
    }
    console.log(`\n${name.split(' (')[0]} (writes to age ${maxAge}):`);
    for (const cls of CLASSES) {
      const pct = byClass[cls].total ? Math.round(100 * byClass[cls].covered / byClass[cls].total) : 0;
      console.log(`  ${cls}: ${byClass[cls].covered}/${byClass[cls].total} ages quotable  (${pct}%)`);
    }
    console.log(`  OVERALL: ${covered}/${total}  (${Math.round(100 * covered / total)}%)`);
  }
}

// ─────────────────────────────────────────────────────────────
// TERM — % of (age × class × term × health) profiles that quote
// ─────────────────────────────────────────────────────────────
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('TERM COVERAGE — 28 products');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
{
  const TERMS = ['10', '15', '20', '25', '30'];
  const AGES = []; for (let a = 25; a <= 75; a += 5) AGES.push(a);
  const FACE = 250000; // representative face

  let grandTotal = 0, grandCovered = 0;
  const perProduct = [];
  for (const product of Object.keys(TERM)) {
    let total = 0, covered = 0;
    for (const term of TERMS) {
      const td = TERM[product][term];
      if (!td) { total += AGES.length * CLASSES.length; continue; }
      // For each tier the product offers, count age × class combos
      const tiers = Object.keys(td);
      if (!tiers.length) { total += AGES.length * CLASSES.length; continue; }
      const bestTier = tiers[0]; // use the first/Pref tier for the check
      for (const cls of CLASSES) {
        const ages = Object.keys(td[bestTier]?.[cls] || {}).map(Number);
        if (!ages.length) { total += AGES.length; continue; }
        const minA = Math.min(...ages), maxA = Math.max(...ages);
        for (const a of AGES) {
          total++;
          if (a >= minA && a <= maxA) covered++;
        }
      }
    }
    grandTotal += total; grandCovered += covered;
    perProduct.push({ product, total, covered, pct: total ? Math.round(100 * covered / total) : 0 });
  }
  perProduct.sort((a, b) => a.pct - b.pct);
  console.log('Products with lowest coverage (likely age-capped at 60 or have sparse data):');
  for (const p of perProduct.slice(0, 10)) {
    console.log(`  ${p.pct.toString().padStart(3)}% · ${p.covered}/${p.total} · ${p.product}`);
  }
  console.log(`\nOVERALL TERM: ${grandCovered}/${grandTotal}  (${Math.round(100 * grandCovered / grandTotal)}%)`);
}

// ─────────────────────────────────────────────────────────────
// FEX — % of (age × class) profiles per product that quote
// ─────────────────────────────────────────────────────────────
console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('FEX / WL COVERAGE — 73 products');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
{
  const AGES = []; for (let a = 50; a <= 85; a += 5) AGES.push(a); // typical FE buyer range
  let grandTotal = 0, grandCovered = 0;
  for (const product of Object.keys(FEX)) {
    let total = 0, covered = 0;
    for (const cls of CLASSES) {
      const ages = Object.keys(FEX[product]?.[cls] || {}).map(Number);
      if (!ages.length) { total += AGES.length; continue; }
      const minA = Math.min(...ages), maxA = Math.max(...ages);
      for (const a of AGES) { total++; if (a >= minA && a <= maxA) covered++; }
    }
    grandTotal += total; grandCovered += covered;
  }
  console.log(`OVERALL FEX (senior range 50-85): ${grandCovered}/${grandTotal}  (${Math.round(100 * grandCovered / grandTotal)}%)`);

  // Also: full age 1-89 spectrum
  const AGES_FULL = []; for (let a = 1; a <= 89; a += 1) AGES_FULL.push(a);
  let fullTotal = 0, fullCovered = 0;
  for (const product of Object.keys(FEX)) {
    for (const cls of CLASSES) {
      const ages = Object.keys(FEX[product]?.[cls] || {}).map(Number);
      if (!ages.length) { fullTotal += AGES_FULL.length; continue; }
      const minA = Math.min(...ages), maxA = Math.max(...ages);
      for (const a of AGES_FULL) { fullTotal++; if (a >= minA && a <= maxA) fullCovered++; }
    }
  }
  console.log(`OVERALL FEX/WL (full 1-89 spectrum): ${fullCovered}/${fullTotal}  (${Math.round(100 * fullCovered / fullTotal)}%)`);
}

console.log('\nNotes:');
console.log('* "Quotable" = the age falls within the product\'s populated age range,');
console.log('  so the lookup will return a real rate (possibly snapped to nearest band).');
console.log('* Per-carrier max ages: Americo IUL 80, MOO IUL 75, term products vary 60-75.');
console.log('* Lower % per product usually means simplified-issue (caps at 60) or sparse data.');
