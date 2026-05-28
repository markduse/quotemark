#!/usr/bin/env node
// Phase D test: simulate the FE/WL lookup at every key age band.
// Mimics fexLookup() from App.jsx exactly so we know what the agent will see.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FEX = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'fex_rates.json'), 'utf8'));

// Mirror fexLookup() at line 1439 of App.jsx
function fexLookup(company, planName, age, male, smoker, face) {
  const key = `${company}||${planName}`;
  const combo = male ? (smoker ? 'MS' : 'MNS') : (smoker ? 'FS' : 'FNS');
  const bands = FEX?.[key]?.[combo]?.[String(age)];
  if (!bands || Object.keys(bands).length === 0) return null;
  const sorted = Object.keys(bands).map(Number).sort((a, b) => a - b);
  const valid = sorted.filter(b => b <= face);
  const effFace = valid.length ? valid[valid.length - 1] : sorted[0];
  const prem = bands[String(effFace)];
  if (prem == null) return null;
  return { prem: Math.round(prem * 100) / 100, face: effFace };
}

function quoteAll(age, male, smoker, face) {
  const results = [];
  for (const key of Object.keys(FEX)) {
    const [company, planName] = key.split('||');
    const r = fexLookup(company, planName, age, male, smoker, face);
    if (r) results.push({ key, ...r });
  }
  return results.sort((a, b) => a.prem - b.prem);
}

// Test profiles — what an agent would actually enter
const PROFILES = [
  { label: '5yo daughter, $25k juvenile WL', age: 5, male: false, smoker: false, face: 25000 },
  { label: '10yo son, $25k juvenile WL', age: 10, male: true, smoker: false, face: 25000 },
  { label: '15yo, $25k juvenile WL', age: 15, male: true, smoker: false, face: 25000 },
  { label: '22yo non-smoking male, $20k WL', age: 22, male: true, smoker: false, face: 20000 },
  { label: '35yo non-smoking female, $20k WL', age: 35, male: false, smoker: false, face: 20000 },
  { label: '45yo non-smoking male, $25k WL', age: 45, male: true, smoker: false, face: 25000 },
  { label: '55yo non-smoking female, $15k FE', age: 55, male: false, smoker: false, face: 15000 },
  { label: '65yo non-smoking male, $10k FE', age: 65, male: true, smoker: false, face: 10000 },
  { label: '75yo smoker female, $10k FE', age: 75, male: false, smoker: true, face: 10000 },
  { label: '85yo non-smoking male, $10k FE', age: 85, male: true, smoker: false, face: 10000 },
];

for (const p of PROFILES) {
  console.log(`\n━━━ ${p.label} ━━━`);
  const results = quoteAll(p.age, p.male, p.smoker, p.face);
  console.log(`  ${results.length} carriers returned a quote`);
  for (const r of results.slice(0, 5)) {
    const wantedVsActual = r.face === p.face ? '' : ` (snap to $${r.face.toLocaleString()})`;
    console.log(`    $${r.prem.toString().padStart(6)}/mo · ${r.key}${wantedVsActual}`);
  }
  if (results.length > 5) console.log(`    ... +${results.length - 5} more`);
  if (results.length === 0) console.log(`    ⚠ NO QUOTES — gap in coverage`);
}
