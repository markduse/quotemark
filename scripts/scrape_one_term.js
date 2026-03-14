/**
 * Scrapes one term length at a time.
 * Usage: node scrape_one_term.js 10
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const TERM = process.argv[2] || '10';
const CREDS = { email: 'markdusevic@gmail.com', password: 'Notebook1122!' };
const FACE = 100000;
const STATE = 'Texas';
const AGES = [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75];
const COMBOS = [
  { gender: 'Male',   tobacco: 'None',       key: 'mn' },
  { gender: 'Male',   tobacco: 'Cigarettes', key: 'mt' },
  { gender: 'Female', tobacco: 'None',       key: 'fn' },
  { gender: 'Female', tobacco: 'Cigarettes', key: 'ft' },
];

const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const OUT = path.join(dataDir, `term_${TERM}yr.json`);

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
  console.log(`Scraping ${TERM}-year term...`);
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();

  await page.goto('https://insurancetoolkits.com/login', { waitUntil: 'networkidle', timeout: 15000 });
  await page.locator('input').nth(0).fill(CREDS.email);
  await page.locator('input').nth(1).fill(CREDS.password);
  try { await page.click('button[type="submit"]'); } catch { await page.keyboard.press('Enter'); }
  await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }).catch(() => {});
  await sleep(1500);

  const result = {};
  for (const combo of COMBOS) {
    result[combo.key] = {};
    console.log(`\n${TERM}yr ${combo.key}`);
    for (const age of AGES) {
      await page.goto('https://app.insurancetoolkits.com/term/quoter', { waitUntil: 'networkidle', timeout: 15000 });
      await sleep(800);

      // Term length button
      await page.evaluate(t => {
        const btn = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === t);
        if (btn) btn.click();
      }, TERM);
      await sleep(300);

      // Face amount
      await page.evaluate(f => {
        const inp = [...document.querySelectorAll('input')].find(i => i.placeholder === 'Face Amount');
        if (inp) { inp.focus(); inp.value = String(f); inp.dispatchEvent(new Event('input',{bubbles:true})); inp.dispatchEvent(new Event('change',{bubbles:true})); }
      }, FACE);

      // Age
      await page.evaluate(a => {
        const inp = [...document.querySelectorAll('input')].find(i => i.placeholder === 'age');
        if (inp) { inp.focus(); inp.value = String(a); inp.dispatchEvent(new Event('input',{bubbles:true})); inp.dispatchEvent(new Event('change',{bubbles:true})); }
      }, age);

      // State
      await page.evaluate(s => {
        const sel = [...document.querySelectorAll('select')].find(el => [...el.options].some(o => o.text.includes('Alabama')));
        if (sel) { const opt = [...sel.options].find(o => o.text === s); if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change',{bubbles:true})); } }
      }, STATE);

      // Gender
      await page.evaluate(g => {
        const btn = [...document.querySelectorAll('button')].find(b => b.textContent.trim() === g);
        if (btn) btn.click();
      }, combo.gender);

      // Tobacco
      await page.evaluate(t => {
        const sel = [...document.querySelectorAll('select')].find(el => [...el.options].some(o => o.text.includes('Cigarettes')));
        if (sel) { const opt = [...sel.options].find(o => o.text === t); if (opt) { sel.value = opt.value; sel.dispatchEvent(new Event('change',{bubbles:true})); } }
      }, combo.tobacco);

      await sleep(300);

      // Get Quote
      await page.evaluate(() => {
        const btn = [...document.querySelectorAll('button')].find(b => b.textContent.includes('Get Quote'));
        if (btn) btn.click();
      });

      await sleep(4000);

      const txt = await page.evaluate(() => document.body.innerText);
      const quotes = parse(txt);
      result[combo.key][age] = quotes;
      const first = Object.keys(quotes)[0] || '';
      const termCheck = first.match(/(\d+)-Year/)?.[1];
      console.log(`  age${age}: ${Object.keys(quotes).length} [${termCheck||'?'}yr]`);
      fs.writeFileSync(OUT, JSON.stringify(result, null, 2));
    }
  }

  await browser.close();
  console.log(`\n✅ ${TERM}yr complete →`, OUT);
}

main().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
