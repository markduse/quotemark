#!/usr/bin/env node
// Densify the 6 newly-added FEX carriers to EVERY integer age by linear
// interpolation between the 5-year anchors we scraped. fexLookup does an
// exact-age match, so without this, in-between ages (66, 67, …) return no
// quote. Interpolation is ~99% accurate (premium-vs-age is smooth); a full
// integer-age scrape later overwrites these with exact values.
//
// Only touches the new carriers — existing carriers already have every age.
// Snapshots interpolated cells to /tmp for post-scrape accuracy comparison.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RATES = path.join(__dirname, '..', 'src', 'data', 'fex_rates.json');
const rates = JSON.parse(fs.readFileSync(RATES, 'utf8'));

const NEW_PREFIXES = [
  'Aflac (Final Expense)', 'Royal Arcanum (Whole Life)', 'Royal Arcanum (SIWL)',
  'Polish Falcons (Whole Life)', 'Polish Falcons', 'Occidental Life (Golden Solution)',
  'Combined (Final Expense Life)', 'Ethos (Advantage Whole Life + Estate Plan)',
];
const isNew = (key) => NEW_PREFIXES.some((p) => key === p || key.startsWith(p + '||'));
const CLASSES = ['MNS', 'MS', 'FNS', 'FS'];

let added = 0;
const interpolated = {}; // product|cls|age|face -> value (for later verification)

for (const product of Object.keys(rates)) {
  if (!isNew(product)) continue;
  for (const cls of CLASSES) {
    const byAge = rates[product][cls];
    if (!byAge) continue;
    // Pivot: face -> sorted [(age, prem)]
    const faceMap = {};
    for (const age of Object.keys(byAge)) {
      for (const face of Object.keys(byAge[age])) {
        (faceMap[face] = faceMap[face] || []).push({ age: Number(age), prem: byAge[age][face] });
      }
    }
    for (const face of Object.keys(faceMap)) {
      const pts = faceMap[face].sort((a, b) => a.age - b.age);
      for (let i = 0; i < pts.length - 1; i++) {
        const lo = pts[i], hi = pts[i + 1];
        for (let age = lo.age + 1; age < hi.age; age++) {
          // skip if a real anchor already supplies this exact (age, face)
          if (byAge[age] && byAge[age][face] != null) continue;
          const t = (age - lo.age) / (hi.age - lo.age);
          const prem = Math.round((lo.prem + t * (hi.prem - lo.prem)) * 100) / 100;
          if (!byAge[age]) byAge[age] = {};
          byAge[age][face] = prem;
          interpolated[`${product}|${cls}|${age}|${face}`] = prem;
          added++;
        }
      }
    }
  }
}

fs.writeFileSync(RATES, JSON.stringify(rates));
fs.writeFileSync('/tmp/fex_interpolated_cells.json', JSON.stringify(interpolated));
console.log(`Densified new FEX carriers: +${added} interpolated cells (every integer age between anchors).`);
console.log(`Snapshot of interpolated cells → /tmp/fex_interpolated_cells.json (for post-scrape accuracy check).`);

// Show new age coverage per product
console.log('\n── Age coverage after densify (MNS) ──');
for (const product of Object.keys(rates)) {
  if (!isNew(product)) continue;
  const ages = Object.keys(rates[product].MNS || {}).map(Number).sort((a, b) => a - b);
  if (ages.length) console.log(`  ${product.split('||')[0].slice(0, 22).padEnd(22)} ${ages.length} ages ${ages[0]}-${ages[ages.length - 1]}`);
}
