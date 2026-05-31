#!/usr/bin/env node
// "Practical" coverage — at a representative agent test profile,
// how many carriers actually produce a quote?

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const D = p => path.join(__dirname, '..', 'src', 'data', p);
const FEX = JSON.parse(fs.readFileSync(D('fex_rates.json'), 'utf8'));
const TERM = JSON.parse(fs.readFileSync(D('term_rates.json'), 'utf8'));
const IUL = JSON.parse(fs.readFileSync(D('iul_rates.json'), 'utf8'));

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('PRACTICAL COVERAGE — how many carriers quote per profile?');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

// ────── FEX ──────
console.log('\nFEX/WL (face $10,000, MNS):');
const fexProducts = Object.keys(FEX);
for (const age of [5, 18, 35, 50, 60, 65, 70, 75, 80, 85]) {
  let quotes = 0;
  for (const p of fexProducts) {
    const ages = Object.keys(FEX[p]?.MNS || {}).map(Number);
    if (!ages.length) continue;
    if (age >= Math.min(...ages) && age <= Math.max(...ages)) quotes++;
  }
  const pct = Math.round(100 * quotes / fexProducts.length);
  console.log(`  Age ${age.toString().padStart(2)} M NS  →  ${quotes.toString().padStart(2)}/${fexProducts.length} products quote  (${pct}%)`);
}

// ────── TERM ──────
console.log('\nTerm (20-year, Pref+, MNS):');
const termProducts = Object.keys(TERM);
for (const age of [25, 30, 35, 40, 50, 55, 60, 65, 70, 75]) {
  let quotes = 0;
  for (const p of termProducts) {
    const td = TERM[p]['20'];
    if (!td) continue;
    const tiers = Object.keys(td);
    let hit = false;
    for (const tier of tiers) {
      const ages = Object.keys(td[tier]?.MNS || {}).map(Number);
      if (!ages.length) continue;
      if (age >= Math.min(...ages) && age <= Math.max(...ages)) { hit = true; break; }
    }
    if (hit) quotes++;
  }
  const pct = Math.round(100 * quotes / termProducts.length);
  console.log(`  Age ${age.toString().padStart(2)} M NS  →  ${quotes.toString().padStart(2)}/${termProducts.length} products quote  (${pct}%)`);
}

// ────── IUL ──────
console.log('\nIUL (target $150k face or $200/mo premium, MNS):');
const iulProducts = Object.keys(IUL);
for (const age of [25, 35, 45, 50, 55, 60, 65, 70, 75]) {
  let quotes = 0;
  const carriers = [];
  for (const p of iulProducts) {
    const ages = Object.keys(IUL[p]?.MNS || {}).map(Number);
    if (!ages.length) continue;
    if (age >= Math.min(...ages) && age <= Math.max(...ages)) {
      quotes++;
      carriers.push(p.split(' (')[0]);
    }
  }
  console.log(`  Age ${age.toString().padStart(2)} M NS  →  ${quotes}/${iulProducts.length} carriers quote  [${carriers.join(', ')}]`);
}

console.log('\nIUL (same, FNS):');
for (const age of [25, 35, 45, 50, 55, 60, 65, 70, 75]) {
  const carriers = [];
  for (const p of iulProducts) {
    const ages = Object.keys(IUL[p]?.FNS || {}).map(Number);
    if (!ages.length) continue;
    if (age >= Math.min(...ages) && age <= Math.max(...ages)) carriers.push(p.split(' (')[0]);
  }
  console.log(`  Age ${age.toString().padStart(2)} F NS  →  ${carriers.length}/${iulProducts.length} carriers quote  [${carriers.join(', ') || 'NONE'}]`);
}
