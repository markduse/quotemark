#!/usr/bin/env node
// Verify budget-mode solveForFace returns sensible faces for $110/mo at age 35.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FEX = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'fex_rates.json'), 'utf8'));

function fexLookup(company, planName, age, male, smoker, face) {
  const key = `${company}||${planName}`;
  const combo = male ? (smoker ? 'MS' : 'MNS') : (smoker ? 'FS' : 'FNS');
  const bands = FEX?.[key]?.[combo]?.[String(age)];
  if (!bands || Object.keys(bands).length === 0) return null;
  const sorted = Object.keys(bands).map(Number).sort((a, b) => a - b);
  const valid = sorted.filter(b => b <= face);
  const effFace = valid.length ? valid[valid.length - 1] : sorted[0];
  return { prem: Math.round(bands[String(effFace)] * 100) / 100, face: effFace };
}

// Patched solveForFace
function solveForFace(budget, age, male, smoker, fn) {
  let lo = 1000, hi = 50000, best = 0;
  for (let i = 0; i < 50; i++) {
    const mid = Math.round((lo + hi) / 2 / 1000) * 1000;
    if (lo > hi) break;
    const r = fn(age, male, smoker, mid);
    const p = (r && typeof r === 'object') ? r.prem : r;
    if (p != null && p <= budget + 0.001) { best = mid; lo = mid + 1000; }
    else hi = mid - 1000;
  }
  return best > 0 ? best : null;
}

// Profile: $110/mo, age 35, female, non-smoker, Preferred → matches Mark's screenshot
const PROFILE = { budget: 110, age: 35, male: false, smoker: false };
const TIER_B_PRODUCTS = [
  ['American Amicable (Family Choice)', 'Family Choice Immediate'],
  ['Transamerica (Solutions)', 'Immediate Solution Preferred'],
  ['Liberty Bankers', 'SIMPL Preferred'],
  ['Royal Neighbors (Jet Whole Life)', 'Jet Whole Life Preferred'],
  ['Baltimore Life (aPriority 0-49)', 'aPriority (0-49) Standard'],
  ['American Home Life (GuideStar 0-44)', 'GuideStar Level'],
  ['Foresters (PlanRight)', 'PlanRight Level'],
];

console.log(`Profile: $${PROFILE.budget}/mo · age ${PROFILE.age} · ${PROFILE.male ? 'M' : 'F'} · ${PROFILE.smoker ? 'smoker' : 'non-smoker'} · Preferred\n`);
console.log('Carrier'.padEnd(60) + 'Solved face');
console.log('-'.repeat(85));
for (const [co, plan] of TIER_B_PRODUCTS) {
  const fn = (age, male, smoker, face) => fexLookup(co, plan, age, male, smoker, face);
  const face = solveForFace(PROFILE.budget, PROFILE.age, PROFILE.male, PROFILE.smoker, fn);
  const r = face ? fexLookup(co, plan, PROFILE.age, PROFILE.male, PROFILE.smoker, face) : null;
  if (face && r) {
    console.log(`${(co + ' · ' + plan).padEnd(60)}$${face.toLocaleString()} @ $${r.prem}/mo (effective $${r.face.toLocaleString()})`);
  } else {
    console.log(`${(co + ' · ' + plan).padEnd(60)}— no fit`);
  }
}
