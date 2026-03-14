/**
 * InsuranceTookit Term Rate Scraper v5
 * Term length = buttons (10/15/20/25/30/35/40), not a select.
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const CREDENTIALS = { email: 'markdusevic@gmail.com', password: 'Notebook1122!' };
const FACE = 100000;
const STATE = 'Texas';
const AGES = [18, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75];
const TERM_LENGTHS = ['10', '15', '20', '30'];
const COMBOS = [
  { gender: 'Male',   tobacco: 'None',       key: 'male_nt'   },
  { gender: 'Male',   tobacco: 'Cigarettes', key: 'male_tb'   },
  { gender: 'Female', tobacco: 'None',       key: 'female_nt' },
  { gender: 'Female', tobacco: 'Cigarettes', key: 'female_tb' },
];

const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function extractQuotes(pageText) {
  const lines = pageText.split('\n').map(l => l.trim()).filter(Boolean);
  const results = {};
  let inResults = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === 'Company Name') { inResults = true; continue; }
    if (!inResults) continue;
    if (lines[i] === 'Clear Fields') break;
    const m = lines[i].match(/^\$?(\d+\.\d{2})$/);
    if (m) {
      const price = parseFloat(m[1]);
      const name = lines[i + 1] || '';
      if (name && !name.match(/^(Compare|E-App|•|\$)/) && name.length > 3) {
        results[name] = price;
      }
    }
  }
  return results;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  console.log('Logging in...');
  await page.goto('https://insurancetoolkits.com/login');
  await sleep(2000);
  await page.locator('input').nth(0).fill(CREDENTIALS.email);
  await page.locator('input').nth(1).fill(CREDENTIALS.password);
  try { await page.click('button[type="submit"]'); } catch { await page.keyboard.press('Enter'); }
  await sleep(3000);

  await page.goto('https://app.insurancetoolkits.com/term/quoter');
  await sleep(2000);

  const allData = {};
  let totalQuoted = 0;

  for (const term of TERM_LENGTHS) {
    allData[term] = {};

    // Click the term length button (stays selected across subsequent quotes)
    try {
      const btns = page.locator('button');
      const cnt = await btns.count();
      for (let i = 0; i < cnt; i++) {
        const t = (await btns.nth(i).textContent() || '').trim();
        if (t === term) { await btns.nth(i).click(); await sleep(300); break; }
      }
      console.log(`\nSelected term: ${term}yr`);
    } catch(e) { console.error('term btn err', e.message); }

    for (const combo of COMBOS) {
      allData[term][combo.key] = {};
      console.log(`  ${combo.key}`);

      for (const age of AGES) {
        // Re-click term button before each quote to ensure it stays selected
        try {
          const btns = page.locator('button');
          const cnt = await btns.count();
          for (let i = 0; i < cnt; i++) {
            const t = (await btns.nth(i).textContent() || '').trim();
            if (t === term) { await btns.nth(i).click(); break; }
          }
        } catch {}

        // Face amount
        try {
          await page.locator('input').nth(0).click({ clickCount: 3 });
          await page.locator('input').nth(0).fill(String(FACE));
        } catch {}

        // Age (index 6)
        try {
          await page.locator('input').nth(6).click({ clickCount: 3 });
          await page.locator('input').nth(6).fill(String(age));
        } catch {}

        // State (select index 0)
        try { await page.locator('select').nth(0).selectOption(STATE); } catch {}

        // Gender button
        try {
          const btns = page.locator('button');
          const cnt = await btns.count();
          for (let i = 0; i < cnt; i++) {
            const t = (await btns.nth(i).textContent() || '').trim();
            if (t === combo.gender) { await btns.nth(i).click(); break; }
          }
        } catch {}

        // Tobacco (select index 1)
        try { await page.locator('select').nth(1).selectOption(combo.tobacco); } catch {}

        // Get Quote button
        try { await page.click('button:has-text("Get Quote")'); } catch {}

        await sleep(3000);

        const text = await page.evaluate(() => document.body.innerText);
        const quotes = extractQuotes(text);
        allData[term][combo.key][age] = quotes;
        totalQuoted++;

        const cnt = Object.keys(quotes).length;
        // Verify term length by checking first result name
        const firstResult = Object.keys(quotes)[0] || '';
        const termInResult = firstResult.match(/(\d+)-Year/)?.[1];

        process.stdout.write(`    age${age}: ${cnt} [${termInResult||'?'}yr] `);
        if (cnt > 0 && termInResult !== term) {
          process.stdout.write('⚠️  WRONG TERM ');
        }
        process.stdout.write('\n');

        // Save incrementally
        fs.writeFileSync(path.join(dataDir, 'term_rates_raw.json'), JSON.stringify(allData, null, 2));
      }
    }
  }

  await browser.close();

  // Print summary of carriers found
  console.log('\n=== CARRIER SUMMARY ===');
  const allCarriers = new Set();
  for (const term of Object.values(allData)) {
    for (const combo of Object.values(term)) {
      for (const age of Object.values(combo)) {
        Object.keys(age).forEach(k => allCarriers.add(k));
      }
    }
  }
  console.log([...allCarriers].sort().join('\n'));
  console.log(`\n✅ Done! ${totalQuoted} quotes. ${allCarriers.size} unique carrier products.`);
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
