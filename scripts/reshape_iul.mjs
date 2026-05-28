// Reshape the raw ITK IUL scrape into a lookup table keyed by:
//   product → class → age → premium → face_amount
//
// Same shape as term_rates.json but inverted dimension:
//   - For term, we input face → look up monthly premium
//   - For IUL, we input premium → look up face amount
//
// Bilinear interpolation across (age, premium) anchors.

import fs from 'fs';

const RAW_PATH = '/Users/marksmacmini/quotemark/scripts/itk_iul_raw.json';
const OUT_PATH = '/Users/marksmacmini/quotemark/src/data/iul_rates.json';

const raw = JSON.parse(fs.readFileSync(RAW_PATH, 'utf8'));
console.log(`Reading ${raw.length} raw rows`);

function num(s) { return parseFloat(String(s).replace(/,/g, '')); }

const out = {};
let added = 0;
for (const r of raw) {
  const face = num(r.face_amount);
  if (isNaN(face) || face <= 0) continue;
  const product = r.company;
  const cls = (r.sex === 'Male' ? 'M' : 'F') + (r.tobacco === 'Cigarettes' ? 'S' : 'NS');
  const age = String(r.age);
  const premium = String(r.premium);
  if (!out[product]) out[product] = {};
  if (!out[product][cls]) out[product][cls] = {};
  if (!out[product][cls][age]) out[product][cls][age] = {};
  out[product][cls][age][premium] = face;
  added++;
}

console.log(`Wrote ${added} cells`);
console.log(`Products: ${Object.keys(out).join(' / ')}`);

for (const p of Object.keys(out)) {
  const classes = Object.keys(out[p]);
  const allAges = new Set();
  const allPrems = new Set();
  for (const c of classes) {
    for (const age of Object.keys(out[p][c])) {
      allAges.add(+age);
      for (const pr of Object.keys(out[p][c][age])) allPrems.add(+pr);
    }
  }
  console.log(`  ${p}`);
  console.log(`    classes: ${classes.join(',')}`);
  console.log(`    ages: ${[...allAges].sort((a,b)=>a-b).join(',')}`);
  console.log(`    premiums: ${[...allPrems].sort((a,b)=>a-b).join(',')}`);
}

fs.mkdirSync('/Users/marksmacmini/quotemark/src/data', { recursive: true });
fs.writeFileSync(OUT_PATH, JSON.stringify(out) + '\n');
console.log(`\n✓ Wrote ${OUT_PATH}`);
