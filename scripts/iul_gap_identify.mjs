#!/usr/bin/env node
// Identify missing (carrier × age × sex × tobacco × premium) combos in the
// IUL scrape. Outputs a JSON list ready to feed into the browser-console
// gap-fill script.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const raw = JSON.parse(fs.readFileSync(path.join(__dirname, 'itk_iul_raw.json'), 'utf8'));

// Carrier coverage Mark confirmed:
const CARRIERS = [
  { company: 'Americo (Instant Decision IUL)',                   issueAgeMax: 80 },
  { company: 'Mutual of Omaha (Indexed Universal Life Express)', issueAgeMax: 75 },
];

const AGES = [18, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];
const SEXES = ['Male', 'Female'];
const TOBACCOS = ['None', 'Cigarettes'];
const PREMIUM_ANCHORS = [50, 100, 150, 200, 300, 500];

// Index what we already have: company → age → sex → tobacco → Set of premiums
const have = {};
for (const r of raw) {
  const c = r.company, a = r.age, s = r.sex, t = r.tobacco, p = +r.premium;
  if (!have[c]) have[c] = {};
  if (!have[c][a]) have[c][a] = {};
  if (!have[c][a][s]) have[c][a][s] = {};
  if (!have[c][a][s][t]) have[c][a][s][t] = new Set();
  have[c][a][s][t].add(p);
}

// Build the missing list
const missing = [];
for (const { company, issueAgeMax } of CARRIERS) {
  for (const age of AGES) {
    if (age > issueAgeMax) continue;
    for (const sex of SEXES) {
      for (const tobacco of TOBACCOS) {
        const got = have[company]?.[age]?.[sex]?.[tobacco] || new Set();
        for (const premium of PREMIUM_ANCHORS) {
          if (!got.has(premium)) {
            missing.push({ company, age, sex, tobacco, premium });
          }
        }
      }
    }
  }
}

// Summary
const byCarrier = {};
for (const m of missing) {
  byCarrier[m.company] = (byCarrier[m.company] || 0) + 1;
}

console.log('=== MISSING IUL COMBOS ===');
console.log('Total missing:', missing.length);
for (const [c, n] of Object.entries(byCarrier)) console.log(`  ${c}: ${n} combos`);

// Per-age coverage gap
const ageGaps = {};
for (const m of missing) {
  const key = m.company.split(' (')[0] + ' · age ' + m.age + ' · ' + m.sex + ' · ' + m.tobacco;
  if (!ageGaps[key]) ageGaps[key] = [];
  ageGaps[key].push(m.premium);
}
console.log('\n=== MISSING COMBOS BY (carrier, age, sex, tobacco) ===');
for (const [k, prems] of Object.entries(ageGaps).slice(0, 40)) {
  console.log(`  ${k}: premiums ${prems.join(', ')}`);
}
if (Object.keys(ageGaps).length > 40) console.log(`  ... and ${Object.keys(ageGaps).length - 40} more`);

// Write the gap list for the scrape script to consume
fs.writeFileSync(path.join(__dirname, 'iul_gap_combos.json'), JSON.stringify(missing, null, 2));
console.log('\nWrote', missing.length, 'combos to iul_gap_combos.json');
