#!/usr/bin/env node
// Merge Americo IUL face→premium curve (from the ITK SIUL quoter, which only
// quotes face→premium) into src/data/iul_rates.json as premium→face anchors.
//
// ITK gives: for a faceAmount, the monthly premium. We scraped that curve at
// several face points per (age × class). Per (age,class) the relationship is
// essentially linear (premium ≈ a·face + b), so we:
//   1. Least-squares fit a,b from the valid (non-null) points.
//   2. Take minFace/maxFace = smallest/largest face that ITK actually quoted
//      (nulls = below carrier minimum or above max — the true writable window).
//   3. For each standard premium anchor [50,100,150,200,300,500], invert:
//      face = (premium - b) / a, and KEEP it only if it lands within
//      [minFace, maxFace] — i.e. a face Americo will actually issue. Premiums
//      whose implied face is below the carrier minimum are dropped (that's why
//      older ages only have higher premium anchors — matches the baseline).
//
// Output schema: { "Americo (Instant Decision IUL)": { class: { age: { premium: face } } } }

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW = path.join(__dirname, 'itk_americo_iul_raw.json');
const RATES = path.join(__dirname, '..', 'src', 'data', 'iul_rates.json');
const PRODUCT = 'Americo (Instant Decision IUL)';
const PREMIUM_ANCHORS = [50, 100, 150, 200, 300, 500];

if (!fs.existsSync(RAW)) { console.error(`Missing ${RAW}`); process.exit(1); }
const num = (s) => parseFloat(String(s).replace(/,/g, ''));
const raw = JSON.parse(fs.readFileSync(RAW, 'utf8'));
const rates = JSON.parse(fs.readFileSync(RATES, 'utf8'));
if (!rates[PRODUCT]) rates[PRODUCT] = {};

const clsOf = (r) => (r.sex === 'Male' ? 'M' : 'F') + (r.tobacco === 'Cigarettes' ? 'S' : 'NS');

// Group valid (face, premium) points by (class, age)
const groups = new Map();
for (const r of raw) {
  const prem = num(r.monthly), face = num(r.faceAmount);
  if (!isFinite(prem) || prem <= 0 || !isFinite(face) || face <= 0) continue;
  const k = clsOf(r) + '|' + r.age;
  if (!groups.has(k)) groups.set(k, []);
  groups.get(k).push({ face, prem });
}

function fit(points) {
  // least-squares premium = a*face + b
  const n = points.length;
  let sx = 0, sy = 0, sxx = 0, sxy = 0;
  for (const p of points) { sx += p.face; sy += p.prem; sxx += p.face * p.face; sxy += p.face * p.prem; }
  const denom = n * sxx - sx * sx;
  if (denom === 0) return null;
  const a = (n * sxy - sx * sy) / denom;
  const b = (sy - a * sx) / n;
  return { a, b };
}

let emitted = 0, anchorsKept = 0, comboSkipped = 0;
for (const [k, pts] of groups) {
  if (pts.length < 2) { comboSkipped++; continue; }
  const [cls, ageStr] = k.split('|');
  const f = fit(pts);
  if (!f || f.a <= 0) { comboSkipped++; continue; }
  const minFace = Math.min(...pts.map((p) => p.face));
  const maxFace = Math.max(...pts.map((p) => p.face));
  for (const P of PREMIUM_ANCHORS) {
    const face = (P - f.b) / f.a;
    if (face < minFace || face > maxFace) continue; // outside Americo's issuable window
    if (!rates[PRODUCT][cls]) rates[PRODUCT][cls] = {};
    if (!rates[PRODUCT][cls][ageStr]) rates[PRODUCT][cls][ageStr] = {};
    rates[PRODUCT][cls][ageStr][String(P)] = Math.round(face);
    anchorsKept++;
  }
  emitted++;
}

console.log('── Americo IUL curve merge ──');
console.log(`  Raw face→premium points: ${raw.length}`);
console.log(`  (class,age) curves fit:  ${emitted}`);
console.log(`  Premium anchors written: ${anchorsKept}`);
console.log(`  Combos skipped (sparse): ${comboSkipped}`);

fs.writeFileSync(RATES, JSON.stringify(rates, null, 2));
console.log(`\nWrote ${RATES}`);

console.log('\n── Americo writable matrix after merge ──');
for (const cls of ['MNS', 'MS', 'FNS', 'FS']) {
  const ages = Object.keys(rates[PRODUCT][cls] || {}).map(Number).sort((a, b) => a - b);
  console.log(`  ${cls}: ${ages.length} ages [${ages.join(',')}]`);
}
