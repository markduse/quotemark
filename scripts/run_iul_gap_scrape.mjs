#!/usr/bin/env node
// Autonomous IUL gap-fill scrape.
//
// 1. Playwright spins up a headless Chromium, logs into ITK with stored creds
// 2. Navigates to the IUL Quoter and triggers a sample quote
// 3. Captures the JWT from the in-flight quoter API request
// 4. Once we have the JWT, fires the 399 missing combos directly against the
//    quoter API (no UI automation — much faster, ~3 min for the whole batch)
// 5. Saves results to scripts/itk_iul_gap_raw.json
//
// Run: node scripts/run_iul_gap_scrape.mjs
// Then: node scripts/merge_iul_gap.mjs

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Use env first, fall back to the embedded creds in scripts/scrape_itk_rates.js
// (Mark: rotate this password and move to .env when convenient.)
const EMAIL = process.env.ITK_EMAIL || 'markdusevic@gmail.com';
const PASSWORD = process.env.ITK_PASSWORD || 'Notebook1122!';

const COMBOS = JSON.parse(fs.readFileSync(path.join(__dirname, 'iul_gap_combos.json'), 'utf8'));
const OUT_PATH = path.join(__dirname, 'itk_iul_gap_raw.json');

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function captureJwt(page) {
  // Listen for any /quoter/ POST and grab the Authorization header
  return new Promise(async (resolve, reject) => {
    let resolved = false;
    let sampleBody = null;
    const timeout = setTimeout(() => {
      if (!resolved) { resolved = true; reject(new Error('Timed out waiting for JWT — no /quoter/ request seen')); }
    }, 60000);

    page.on('request', req => {
      const url = req.url();
      if (url.includes('/quoter/') && req.method() === 'POST') {
        const auth = req.headers()['authorization'] || '';
        const m = auth.match(/^Bearer\s+(.+)$/);
        try {
          const body = JSON.parse(req.postData() || '{}');
          if (body.toolkit === 'IUL') sampleBody = body;
        } catch (e) {}
        if (m && !resolved) {
          resolved = true;
          clearTimeout(timeout);
          resolve({ jwt: m[1], sampleBody });
        }
      }
    });

    // Trigger a sample quote to force a /quoter/ request
    console.log('[scrape] Navigating to IUL quoter…');
    await page.goto('https://insurancetoolkits.com/iul/quoter');
    await sleep(2000);

    // Try to click "Get Quote" — the IUL form may have defaults that fire on load
    try {
      const btn = page.locator('button:has-text("Get Quote")').first();
      await btn.click({ timeout: 5000 });
    } catch (e) {
      console.log('[scrape] Get Quote button not found, waiting for any /quoter/ XHR…');
    }
  });
}

async function postQuote(jwt, base, combo) {
  const body = {
    ...base,
    premium: combo.premium,
    monthlyPremium: combo.premium,
    sex: combo.sex,
    tobacco: combo.tobacco,
    month: '06', day: '15',
    year: String(new Date().getFullYear() - combo.age),
    underwritingItems: [],
    state: 'MI',
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
  if (r.status === 400) return { quotes: [] };
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
    const { jwt, sampleBody } = await captureJwt(page);
    console.log('[scrape] Got JWT (' + jwt.length + ' chars), sample body:', sampleBody ? Object.keys(sampleBody).join(',') : 'none');
    await browser.close();

    const base = sampleBody ? { ...sampleBody, toolkit: 'IUL', paymentType: sampleBody.paymentType || 'Bank Draft/EFT' } : {
      toolkit: 'IUL', paymentType: 'Bank Draft/EFT', state: 'MI',
    };

    const results = [];
    const errors = [];
    const start = Date.now();
    let ok = 0, gap = 0, err = 0;

    console.log('[scrape] Firing', COMBOS.length, 'combos…');
    for (let i = 0; i < COMBOS.length; i++) {
      const c = COMBOS[i];
      try {
        const res = await postQuote(jwt, base, c);
        const quotes = (res.quotes || []).filter(q => {
          const cname = (q.company || '').toLowerCase();
          const target = c.company.toLowerCase();
          return target.includes(cname) || cname.includes(target.split(' (')[0].toLowerCase());
        });
        for (const q of quotes) {
          results.push({
            sex: c.sex, tobacco: c.tobacco, age: c.age, premium: c.premium, state: 'MI',
            company: c.company, plan_name: q.plan_name, tier_name: q.tier_name,
            face_amount: q.face_amount, monthly: q.monthly, yearly: q.yearly,
          });
        }
        if (!quotes.length) gap++; else ok++;
      } catch (e) {
        err++;
        errors.push({ combo: c, error: String(e) });
      }
      if (i % 25 === 0 || i === COMBOS.length - 1) {
        const pct = (((i+1) / COMBOS.length) * 100).toFixed(0);
        const elapsed = ((Date.now() - start) / 1000).toFixed(0);
        console.log(`[scrape] ${i+1}/${COMBOS.length} (${pct}%) · ok=${ok} gap=${gap} err=${err} · ${elapsed}s`);
      }
      await sleep(400); // throttle
    }

    fs.writeFileSync(OUT_PATH, JSON.stringify(results, null, 2));
    console.log(`\n[scrape] DONE · ${results.length} rows · ok=${ok} gap=${gap} err=${err}`);
    console.log(`[scrape] Wrote ${OUT_PATH}`);
    if (errors.length) {
      const errPath = path.join(__dirname, 'itk_iul_gap_errors.json');
      fs.writeFileSync(errPath, JSON.stringify(errors, null, 2));
      console.log(`[scrape] ${errors.length} errors → ${errPath}`);
    }
  } catch (e) {
    console.error('[scrape] FAILED:', e);
    await browser.close();
    process.exit(1);
  }
})();
