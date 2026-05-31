#!/usr/bin/env node
// Autonomous TERM smoker gap-fill scrape.
//
// 1. Playwright spins up a headless Chromium, logs into ITK with stored creds
// 2. Navigates to the Term Quoter to trigger a real /quoter/ POST
// 3. Captures the JWT from the Authorization header on that request
// 4. Closes the browser; fires the gap combos directly against the quoter API
// 5. Saves results to scripts/itk_term_smoker_gap_raw.json
//
// Run:  node scripts/run_term_smoker_scrape.mjs
// Then: node scripts/merge_term_smoker_gap.mjs

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Use env first, fall back to embedded creds. Mark: rotate this when convenient.
const EMAIL = process.env.ITK_EMAIL || 'markdusevic@gmail.com';
const PASSWORD = process.env.ITK_PASSWORD || 'Notebook1122!';

const COMBOS = JSON.parse(fs.readFileSync(path.join(__dirname, 'term_smoker_gap_combos.json'), 'utf8'));
const OUT_PATH = path.join(__dirname, 'itk_term_smoker_gap_raw.json');

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function captureJwt(page) {
  return new Promise(async (resolve, reject) => {
    let resolved = false;
    const timeout = setTimeout(() => {
      if (!resolved) { resolved = true; reject(new Error('Timed out waiting for JWT — no /quoter/ request seen')); }
    }, 60000);

    page.on('request', req => {
      const url = req.url();
      if (url.includes('/quoter/') && req.method() === 'POST') {
        const auth = req.headers()['authorization'] || '';
        const m = auth.match(/^Bearer\s+(.+)$/);
        if (m && !resolved) {
          resolved = true;
          clearTimeout(timeout);
          resolve(m[1]);
        }
      }
    });

    console.log('[scrape] Navigating to Term quoter…');
    await page.goto('https://insurancetoolkits.com/term/quoter');
    await sleep(2000);
    try {
      const btn = page.locator('button:has-text("Get Quote")').first();
      await btn.click({ timeout: 5000 });
    } catch (e) {
      console.log('[scrape] Get Quote button not found, waiting for any /quoter/ XHR…');
    }
  });
}

async function postQuote(jwt, combo) {
  const body = {
    faceAmount: combo.face,
    sex: combo.sex,
    term: combo.term,
    state: 'MI',
    month: '06', day: '15',
    year: String(new Date().getFullYear() - combo.age),
    tobacco: combo.tobacco,
    paymentType: 'Bank Draft/EFT',
    underwritingItems: [],
    toolkit: 'TERM',
  };
  const r = await fetch('https://api.insurancetoolkits.com/quoter/', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + jwt,
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (r.status === 400) return { quotes: [] }; // legitimate "no quote"
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

(async () => {
  console.log('[scrape] Launching browser…');
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  try {
    console.log('[scrape] Logging in as', EMAIL);
    await page.goto('https://insurancetoolkits.com/login');
    await page.fill('input[placeholder="EMAIL"]', EMAIL);
    await page.fill('input[placeholder="PASSWORD"]', PASSWORD);
    await page.click('button:has-text("Submit")');
    await sleep(2500);

    console.log('[scrape] Capturing JWT…');
    const jwt = await captureJwt(page);
    console.log('[scrape] Got JWT (' + jwt.length + ' chars)');
    await browser.close();

    const results = [];
    const errors = [];
    const start = Date.now();
    let ok = 0, gap = 0, err = 0;

    console.log('[scrape] Firing', COMBOS.length, 'combos…');
    for (let i = 0; i < COMBOS.length; i++) {
      const c = COMBOS[i];
      try {
        const res = await postQuote(jwt, c);
        const quotes = res.quotes || [];
        for (const q of quotes) {
          results.push({
            sex: c.sex, tobacco: c.tobacco, term: c.term, age: c.age, face: c.face,
            company: q.company, tier_name: q.tier_name, plan_name: q.plan_name,
            monthly: q.monthly, yearly: q.yearly, face_amount: q.face_amount,
          });
        }
        if (!quotes.length) gap++; else ok++;
      } catch (e) {
        err++;
        errors.push({ combo: c, error: String(e) });
      }
      if (i % 10 === 0 || i === COMBOS.length - 1) {
        const pct = (((i+1) / COMBOS.length) * 100).toFixed(0);
        const elapsed = ((Date.now() - start) / 1000).toFixed(0);
        console.log(`[scrape] ${i+1}/${COMBOS.length} (${pct}%) · ok=${ok} gap=${gap} err=${err} · ${elapsed}s`);
      }
      await sleep(400);
    }

    fs.writeFileSync(OUT_PATH, JSON.stringify(results, null, 2));
    console.log(`\n[scrape] DONE · ${results.length} rows · ok=${ok} gap=${gap} err=${err}`);
    console.log(`[scrape] Wrote ${OUT_PATH}`);
    if (errors.length) {
      const errPath = path.join(__dirname, 'itk_term_smoker_gap_errors.json');
      fs.writeFileSync(errPath, JSON.stringify(errors, null, 2));
      console.log(`[scrape] ${errors.length} errors → ${errPath}`);
    }
  } catch (e) {
    console.error('[scrape] FAILED:', e);
    await browser.close();
    process.exit(1);
  }
})();
