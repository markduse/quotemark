#!/usr/bin/env node
// Merge the re-scraped Americo Instant Decision IUL grid (ITK, ages 18-70,
// faces to $450k) into src/data/iul_rates.json. Same approach as AmAm: the
// scrape is face→premium; iul_rates is premium→face. Densify every integer
// age in face-space (so each age gets its own exact row with its own premium
// keys), then invert to premium→face anchors.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GRID = path.join(__dirname, 'ame_iul_grid.json');
const IUL  = path.join(__dirname, '..', 'src', 'data', 'iul_rates.json');
const PRODUCT = 'Americo (Instant Decision IUL)';

const grid = JSON.parse(fs.readFileSync(GRID, 'utf8'));   // {cls:{age:{face:monthly}}}
const iul  = JSON.parse(fs.readFileSync(IUL, 'utf8'));
const FACES = [50000, 100000, 150000, 250000, 350000, 450000];
const CLASSES = Object.keys(grid);

let interp = 0;
const prod = {};
for (const cls of CLASSES) {
  prod[cls] = {};
  const anchorAges = Object.keys(grid[cls]).map(Number).sort((a, b) => a - b);
  const premAt = (age, face) => {
    const row = grid[cls][age];
    if (row && row[face] != null) return row[face];
    for (let i = 0; i < anchorAges.length - 1; i++) {
      const a0 = anchorAges[i], a1 = anchorAges[i + 1];
      if (age > a0 && age < a1) {
        const p0 = grid[cls][a0]?.[face], p1 = grid[cls][a1]?.[face];
        if (p0 == null || p1 == null) return null;
        return p0 + (age - a0) * (p1 - p0) / (a1 - a0);
      }
    }
    return null;
  };
  for (let age = anchorAges[0]; age <= anchorAges[anchorAges.length - 1]; age++) {
    const anchors = {};
    for (const face of FACES) {
      const m = premAt(age, face);
      if (m != null) anchors[String(Math.round(m))] = face;
    }
    if (Object.keys(anchors).length) { prod[cls][age] = anchors; if (!grid[cls][age]) interp++; }
  }
}
iul[PRODUCT] = prod;
fs.writeFileSync(IUL, JSON.stringify(iul));
console.log(`Merged ${PRODUCT}`);
console.log(`  classes ${CLASSES.join(',')} · ages ${Object.keys(prod.MNS)[0]}-${Object.keys(prod.MNS).at(-1)} · +${interp} interpolated`);
console.log(`  MNS 45 anchors: ${JSON.stringify(prod.MNS['45'])}`);
