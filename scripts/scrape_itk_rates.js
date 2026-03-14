/**
 * InsuranceTookit Rate Scraper
 * Run via: node scripts/scrape_itk_rates.js
 * 
 * Uses Playwright to log into InsuranceTookit and pull quotes
 * for target carriers across all age/gender/tobacco combos.
 * 
 * Target carriers: Elco (Silver Eagle), Baltimore Life, Senior Life, AIG SIWL
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const CREDENTIALS = {
  email: 'markdusevic@gmail.com',
  password: 'Notebook1122!'
};

const TARGET_CARRIERS = [
  'Silver Eagle Premier',    // Elco Level Preferred (Tier B)
  'Silver Eagle Plus',       // Elco Level Standard (Tier C) 
  'Silver Eagle Standard',   // Elco Modified (Tier D)
  'Silver Eagle GI',         // Elco GI (Tier E)
  'Silver Guard Standard',   // Baltimore Life
  'Silver Guard Special',    // Baltimore Life
  'iProvide (45-69) Preferred', // Baltimore Life
  'iProvide (45-69) Standard',  // Baltimore Life
  'Platinum Protection',     // Senior Life
  'Simplified Issue Level',  // AIG SIWL (Tier B/C)
];

const AGES = [50, 55, 60, 65, 70, 75, 80];
const FACE = 10000;
const STATE = 'Illinois'; // Elco is IL-based

// Combos: [gender button, tobacco value]
const COMBOS = [
  { gender: 'Male', tobacco: 'None', key: 'male_nt' },
  { gender: 'Male', tobacco: 'Cigarettes', key: 'male_tb' },
  { gender: 'Female', tobacco: 'None', key: 'female_nt' },
  { gender: 'Female', tobacco: 'Cigarettes', key: 'female_tb' },
];

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function runQuote(page, { age, gender, tobacco, face, state }) {
  // Set face amount
  await page.fill('input[placeholder="Face Amount"]', String(face));
  
  // Set age
  const ageInput = page.locator('input[placeholder="age"]');
  await ageInput.fill(String(age));
  
  // Set state (Coverage Type is nth(0), State is nth(1))
  await page.locator('select').nth(1).selectOption(state);
  
  // Set gender
  await page.click(`button:has-text("${gender}")`);
  
  // Set tobacco (Nicotine Use is nth(2))
  await page.locator('select').nth(2).selectOption(tobacco === 'None' ? 'None' : 'Cigarettes');
  
  // Click Get Quote
  await page.click('button:has-text("Get Quote")');
  await sleep(2500);
  
  // Extract results
  const text = await page.evaluate(() => document.body.innerText);
  const lines = text.split('\n').map(l => l.trim()).filter(l => l);
  
  const results = {};
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^\$[0-9]+\.[0-9]+$/)) {
      const price = parseFloat(lines[i].replace('$', ''));
      const name = lines[i + 1] || '';
      if (name && !['E-App', 'Compare', '★'].includes(name)) {
        results[name] = price;
      }
    }
  }
  return results;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Logging in...');
  await page.goto('https://insurancetoolkits.com/login');
  await page.fill('input[placeholder="EMAIL"]', CREDENTIALS.email);
  await page.fill('input[placeholder="PASSWORD"]', CREDENTIALS.password);
  await page.click('button:has-text("Submit")');
  await sleep(2000);
  
  await page.goto('https://insurancetoolkits.com/fex/quoter');
  await sleep(1500);
  
  const allData = {};
  
  for (const combo of COMBOS) {
    console.log(`\n=== ${combo.gender} ${combo.tobacco} ===`);
    allData[combo.key] = {};
    
    for (const age of AGES) {
      console.log(`  Age ${age}...`);
      const quotes = await runQuote(page, {
        age, 
        gender: combo.gender,
        tobacco: combo.tobacco,
        face: FACE,
        state: STATE
      });
      
      // Filter to only target carriers
      const filtered = {};
      for (const carrier of TARGET_CARRIERS) {
        if (quotes[carrier] !== undefined) {
          filtered[carrier] = quotes[carrier];
        }
      }
      allData[combo.key][age] = filtered;
      console.log('    Found:', Object.keys(filtered).join(', '));
    }
  }
  
  await browser.close();
  
  // Save to data file
  const outPath = path.join(__dirname, '../data/scraped_rates.json');
  fs.writeFileSync(outPath, JSON.stringify(allData, null, 2));
  console.log('\n✅ Saved to', outPath);
  console.log(JSON.stringify(allData, null, 2));
}

main().catch(console.error);
