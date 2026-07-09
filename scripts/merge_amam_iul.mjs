#!/usr/bin/env node
// Merge the scraped American-Amicable Intelligent Choice IUL grid into
// src/data/iul_rates.json.
//
// The scrape (amam_iul_grid.json) is face→premium: {class:{age:{face:monthly}}}.
// iul_rates.json is premium→face: {product:{class:{age:{premiumDollars:face}}}}
// (matches Americo/MOO). So we INVERT each (face, premium) pair into a
// premium→face anchor, then interpolate every integer age between the scraped
// 5-year anchors (premium-vs-age is smooth). Also writes the state-availability
// list to a small JSON the app imports for gating.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GRID   = path.join(__dirname, 'amam_iul_grid.json');
const STATES = path.join(__dirname, 'amam_iul_states.json');
const IUL    = path.join(__dirname, '..', 'src', 'data', 'iul_rates.json');
const AVAIL  = path.join(__dirname, '..', 'src', 'data', 'iul_state_availability.json');

const PRODUCT = 'American Amicable (Intelligent Choice IUL)';
const grid = JSON.parse(fs.readFileSync(GRID, 'utf8'));       // {class:{age:{face:monthly}}}
const iul  = JSON.parse(fs.readFileSync(IUL, 'utf8'));
const FACES = [50000, 100000, 250000, 300000, 400000, 450000];
const CLASSES = Object.keys(grid);

// The engine (iulFaceFor / iulPremiumForFace) keys rows by PREMIUM and, for a
// non-anchor age, only interpolates premiums present in BOTH bracketing age
// rows. Americo/MOO have identical premium keys across ages (premium-input
// quoters), but AmAm is inverted from a FACE-input quoter, so its premium keys
// differ per age → cross-age intersection would be empty. Fix: densify EVERY
// integer age here (in face-space, where the axis is stable), so every age has
// its own exact row and the engine's exact-age path is used (no intersection).
let interp = 0;
const prod = {};
for (const cls of CLASSES) {
  prod[cls] = {};
  const anchorAges = Object.keys(grid[cls]).map(Number).sort((a, b) => a - b);
  const premAt = (age, face) => {                    // premium at (age, face), interpolating age
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
      const monthly = premAt(age, face);
      if (monthly != null) anchors[String(Math.round(monthly))] = face;   // premiumRounded → exact face
    }
    if (Object.keys(anchors).length) { prod[cls][age] = anchors; if (!grid[cls][age]) interp++; }
  }
}

iul[PRODUCT] = prod;
fs.writeFileSync(IUL, JSON.stringify(iul));

// 3. State availability → data file the app imports.
const st = JSON.parse(fs.readFileSync(STATES, 'utf8'));
const avail = fs.existsSync(AVAIL) ? JSON.parse(fs.readFileSync(AVAIL, 'utf8')) : {};
avail[PRODUCT] = st.available;
fs.writeFileSync(AVAIL, JSON.stringify(avail, null, 2));

// Report
const sample = prod.MNS?.['45'];
console.log(`Merged ${PRODUCT}`);
console.log(`  classes: ${CLASSES.join(',')} · +${interp} interpolated ages`);
console.log(`  MNS age 45 anchors (premium→face): ${JSON.stringify(sample)}`);
console.log(`  available in ${st.available.length} states: ${st.available.join(',')}`);
console.log(`  blocked in ${st.blocked.length}: ${st.blocked.join(',')}`);
