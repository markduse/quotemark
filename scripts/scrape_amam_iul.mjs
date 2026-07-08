#!/usr/bin/env node
// ── AMERICAN-AMICABLE "INTELLIGENT CHOICE" IUL SCRAPER (Playwright, headless) ──
//
// Source: insuranceapplication.com — American-Amicable Group's own quoter (also
// serves the Occidental Life brand; both route to the same engine). NOT on ITK.
//
// Cracking notes (why this works where fetch/node replays all HTTP 500):
//  • The State <select> has ASP.NET AutoPostBack: changing it fires a server
//    round-trip that loads that state's rate tables AND runs the availability
//    check. Every failed replay skipped this, so the engine crashed with no
//    state context ("Length cannot be less than zero"). Fix: change State, WAIT
//    for its postback, THEN fill the rest and click Generate.
//  • No login/auth needed — the agent number is in the URL. A fresh headless
//    Chromium works once the postback ordering is right.
//  • Premiums are NATIONAL: TX/OH/FL all return $87.82 for M/NT/45/$100k. Only
//    AVAILABILITY varies by state (e.g. Michigan is blocked). So we scrape ONE
//    national rate grid + a per-state availability list.
//
// Output (scripts/):
//   amam_iul_grid.json      national face→premium grid {class:{age:{face:monthly}}}
//   amam_iul_states.json    { available:[...], blocked:[...] }
//
// RUN:  cd ~/quotemark && node scripts/scrape_amam_iul.mjs

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GRID_OUT   = path.join(__dirname, 'amam_iul_grid.json');
const STATES_OUT = path.join(__dirname, 'amam_iul_states.json');

const MAGENT = 'http://insuranceapplication.com/cgi/webapp/Magentinfo.aspx?agentnumber=0001165985&company=110';
const RATE_STATE = 'TX';   // any available state — rates are national

// All states offered in the quoter's dropdown (availability candidates).
const ALL_STATES = ['AK','AL','AR','AZ','CA','CO','CT','DC','DE','FL','GA','HI','IA','ID','IL','IN','KS','KY','LA','MA','MD','ME','MI','MN','MO','MS','MT','NC','ND','NE','NH','NJ','NM','NV','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VA','VT','WA','WI','WV','WY'];

// National rate grid. Face→premium; ages every ~5yr across 18–75 (interpolate
// in-between locally). 3 face anchors capture the affine premium-vs-face line.
const CLASSES = [
  { sex: 'Male',   tob: 'Non-Tobacco', k: 'MNS' },
  { sex: 'Male',   tob: 'Tobacco',     k: 'MS'  },
  { sex: 'Female', tob: 'Non-Tobacco', k: 'FNS' },
  { sex: 'Female', tob: 'Tobacco',     k: 'FS'  },
];
const AGES  = [18, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75];
const FACES = [50000, 100000, 250000];

const sleep = ms => new Promise(r => setTimeout(r, ms));
const num = s => { const n = Number(String(s).replace(/[$,]/g, '')); return Number.isFinite(n) && n > 0 ? n : null; };

let page;
async function enter(state) {
  await page.goto(MAGENT, { waitUntil: 'domcontentloaded' });
  await page.selectOption('select[name=DropDownList2]', { label: 'Intelligent Choice' });
  await Promise.all([page.waitForNavigation({ waitUntil: 'domcontentloaded' }), page.click('input[name=ImageButton3]')]);
  await page.waitForSelector('select[name=scrState]', { timeout: 20000 });
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }).catch(() => {}),
    page.selectOption('select[name=scrState]', state),
  ]);
  await page.waitForSelector('select[name=scrSex]', { timeout: 20000 });
}

// Fill + Generate on the current (already state-set) form. Returns premium or null.
async function generate(sex, tob, age, face) {
  await page.selectOption('select[name=scrSex]', sex);
  await page.selectOption('select[name=scrPremClass]', tob);
  await page.selectOption('select[name=scrdobAge]', String(age));
  await page.check('input[name=scrHealthPlan][value=N]').catch(() => {});
  const cov = page.locator('input[name=scrCoverage]');
  await cov.fill(''); await cov.fill(String(face));
  await page.locator('input[name=scrPremium]').fill('');
  await Promise.all([page.waitForNavigation({ waitUntil: 'domcontentloaded' }), page.click('input[name=ImageButton1]')]);
  const formHere = await page.locator('select[name=scrSex]').count();
  if (!formHere) return { premium: null, blocked: true };   // "not able to sell in your state" error page
  return { premium: num(await page.inputValue('input[name=scrPremium]').catch(() => '')), blocked: false };
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  page = await browser.newPage();

  // ── 1. AVAILABILITY SWEEP — one national-profile quote per state ──
  console.log(`Availability sweep · ${ALL_STATES.length} states`);
  const available = [], blocked = [];
  for (const st of ALL_STATES) {
    try {
      await enter(st);
      const r = await generate('Male', 'Non-Tobacco', 45, 100000);
      if (r.blocked || r.premium == null) blocked.push(st);
      else available.push(st);
    } catch (e) { blocked.push(st); }
    fs.writeFileSync(STATES_OUT, JSON.stringify({ available, blocked }, null, 2));
    process.stdout.write(`  ${st}:${blocked.includes(st) ? '✗' : '✓'} `);
    await sleep(400);
  }
  console.log(`\n  available: ${available.join(',')}\n  blocked: ${blocked.join(',')}`);

  // ── 2. NATIONAL RATE GRID — scrape in one available state, loop in place ──
  const grid = fs.existsSync(GRID_OUT) ? JSON.parse(fs.readFileSync(GRID_OUT, 'utf8')) : {};
  const rateState = available.includes(RATE_STATE) ? RATE_STATE : available[0];
  if (!rateState) { console.log('No available state — cannot scrape rates.'); await browser.close(); return; }
  console.log(`\nRate grid in ${rateState}`);
  await enter(rateState);
  let n = 0, tot = CLASSES.length * AGES.length * FACES.length;
  for (const c of CLASSES) {
    grid[c.k] = grid[c.k] || {};
    for (const a of AGES) {
      grid[c.k][a] = grid[c.k][a] || {};
      for (const f of FACES) {
        n++;
        if (grid[c.k][a][f] != null) continue;
        let prem = null;
        for (let attempt = 0; attempt < 3 && prem == null; attempt++) {
          try { const r = await generate(c.sex, c.tob, a, f); prem = r.premium; }
          catch (e) { await enter(rateState); }   // recover from a navigation hiccup
          if (prem == null) { await enter(rateState); await sleep(400); }
        }
        if (prem != null) grid[c.k][a][f] = prem;
        if (n % 6 === 0) { fs.writeFileSync(GRID_OUT, JSON.stringify(grid)); console.log(`  ${n}/${tot} · ${c.k} age ${a} $${f/1000}k = $${prem ?? '—'}`); }
        await sleep(500);
      }
    }
  }
  fs.writeFileSync(GRID_OUT, JSON.stringify(grid, null, 2));
  console.log(`\nDONE · grid → ${GRID_OUT} · states → ${STATES_OUT}`);
  await browser.close();
})();
