/**
 * Term Rate Scraper v6 — Slow & Verified
 * Reloads page every iteration, waits longer, verifies term length in results
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const CREDS = { email: 'markdusevic@gmail.com', password: 'Notebook1122!' };
const FACE = 100000;
const STATE = 'Texas';

// Reduced set: one term, one combo first to verify correctness
const AGES = [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75];
const TERMS = ['10', '15', '20', '30'];
const COMBOS = [
  { gender: 'Male',   tobacco: 'None',       key: 'mn' },
  { gender: 'Male',   tobacco: 'Cigarettes', key: 'mt' },
  { gender: 'Female', tobacco: 'None',       key: 'fn' },
  { gender: 'Female', tobacco: 'Cigarettes', key: 'ft' },
];

const OUT = path.join(__dirname, '../data/term_v6.json');
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const sleep = ms => new Promise(r => setTimeout(r, ms));

function parse(txt) {
  const lines = txt.split('\n').map(l => l.trim()).filter(Boolean);
  const out = {};
  let in_ = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === 'Company Name') { in_ = true; continue; }
    if (!in_) continue;
    if (lines[i] === 'Clear Fields') break;
    const m = lines[i].match(/^\$?(\d+\.\d{2})$/);
    if (m) {
      const price = parseFloat(m[1]);
      const name = lines[i + 1] || '';
      if (name && !['Compare','E-App','•'].includes(name) && name.length > 3 && !name.startsWith('$'))
        out[name] = price;
    }
  }
  return out;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();

  // Login
  await page.goto('https://insurancetoolkits.com/login', { waitUntil: 'networkidle' });
  await page.locator('input').nth(0).fill(CREDS.email);
  await page.locator('input').nth(1).fill(CREDS.password);
  try { await page.click('button[type="submit"]'); } catch { await page.keyboard.press('Enter'); }
  await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }).catch(() => {});
  await sleep(2000);
  console.log('Logged in. URL:', page.url());

  const all = {};

  for (const term of TERMS) {
    all[term] = {};
    for (const combo of COMBOS) {
      all[term][combo.key] = {};
      console.log(`\n▶ ${term}yr ${combo.key}`);

      for (const age of AGES) {
        // Fresh page load every time — guarantees clean state
        await page.goto('https://app.insurancetoolkits.com/term/quoter', { waitUntil: 'networkidle', timeout: 20000 });
        await sleep(1000);

        // Term length button
        await page.evaluate((t) => {
          const btns = [...document.querySelectorAll('button')];
          const btn = btns.find(b => b.textContent.trim() === t);
          if (btn) btn.click();
        }, term);
        await sleep(400);

        // Face amount
        await page.evaluate((f) => {
          const inputs = [...document.querySelectorAll('input')];
          const inp = inputs.find(i => i.placeholder === 'Face Amount');
          if (inp) { inp.focus(); inp.value = ''; inp.value = String(f); inp.dispatchEvent(new Event('input', {bubbles:true})); inp.dispatchEvent(new Event('change', {bubbles:true})); }
        }, FACE);

        // Age
        await page.evaluate((a) => {
          const inputs = [...document.querySelectorAll('input')];
          const inp = inputs.find(i => i.placeholder === 'age');
          if (inp) { inp.focus(); inp.value = ''; inp.value = String(a); inp.dispatchEvent(new Event('input', {bubbles:true})); inp.dispatchEvent(new Event('change', {bubbles:true})); }
        }, age);

        // State
        await page.evaluate((s) => {
          const sels = [...document.querySelectorAll('select')];
          const sel = sels.find(el => [...el.options].some(o => o.text.includes('Alabama')));
          if (sel) { sel.value = [...sel.options].find(o => o.text === s)?.value || sel.value; sel.dispatchEvent(new Event('change', {bubbles:true})); }
        }, STATE);

        // Gender
        await page.evaluate((g) => {
          const btns = [...document.querySelectorAll('button')];
          const btn = btns.find(b => b.textContent.trim() === g);
          if (btn) btn.click();
        }, combo.gender);

        // Tobacco
        await page.evaluate((t) => {
          const sels = [...document.querySelectorAll('select')];
          const sel = sels.find(el => [...el.options].some(o => o.text.includes('Cigarettes')));
          if (sel) { sel.value = [...sel.options].find(o => o.text === t)?.value || sel.value; sel.dispatchEvent(new Event('change', {bubbles:true})); }
        }, combo.tobacco);

        await sleep(300);

        // Click Get Quote
        await page.evaluate(() => {
          const btns = [...document.querySelectorAll('button')];
          const btn = btns.find(b => b.textContent.includes('Get Quote'));
          if (btn) btn.click();
        });

        await sleep(4000);

        const txt = await page.evaluate(() => document.body.innerText);
        const quotes = parse(txt);

        // Verify term is correct by checking product names
        const firstKey = Object.keys(quotes)[0] || '';
        const termInResult = firstKey.match(/(\d+)-Year/)?.[1];
        const correct = !firstKey || termInResult === term;

        all[term][combo.key][age] = quotes;
        const n = Object.keys(quotes).length;
        console.log(`  age${age}: ${n} products [${termInResult || '?'}yr]${!correct ? ' ⚠️ MISMATCH' : ''}`);

        // Save incrementally
        fs.writeFileSync(OUT, JSON.stringify(all, null, 2));
      }
    }
  }

  await browser.close();

  // Summary
  console.log('\n=== CARRIER MAPPING ===');
  const carriers = new Set();
  for (const t of Object.values(all))
    for (const c of Object.values(t))
      for (const a of Object.values(c))
        Object.keys(a).forEach(k => carriers.add(k));
  [...carriers].sort().forEach(c => console.log(' ', c));
  console.log('\n✅ Done:', OUT);
}

main().catch(e => { console.error(e); process.exit(1); });
