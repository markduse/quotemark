// Merge itk_gap_raw.json (the gap-fill scrape) into term_rates.json.
// Uses the same reshape logic as the original scrape: extracts tier from
// plan_name when tier_name is generic.

import fs from 'fs';

const GAP_PATH = '/Users/marksmacmini/quotemark/scripts/itk_gap_raw.json';
const RATES_PATH = '/Users/marksmacmini/quotemark/src/data/term_rates.json';
const RAW_PATH   = '/Users/marksmacmini/quotemark/scripts/itk_term_raw.json';

if (!fs.existsSync(GAP_PATH)) {
  console.error(`Missing ${GAP_PATH}. Drop the downloaded itk_gap_raw.json into scripts/ first.`);
  process.exit(1);
}

const gap   = JSON.parse(fs.readFileSync(GAP_PATH,'utf8'));
const rates = JSON.parse(fs.readFileSync(RATES_PATH,'utf8'));
const raw   = JSON.parse(fs.readFileSync(RAW_PATH,'utf8'));

console.log(`Gap rows to merge: ${gap.length}`);
console.log(`Existing products: ${Object.keys(rates).length}`);

// Known tier names (same list as original reshape)
const KNOWN_TIERS = [
  'Preferred Plus','Ultimate Preferred','Super Preferred','Elite','Preferred',
  'Select','Approved','Level','Standard Plus','Standard','Standard Extra',
  'Trendsetter Super 2021','Trendsetter LB 2017',
  'Continuation 10','Continuation 25','HMS',
  'Payment Protector Continuation','Payment Protector',
  'Simple Term Deluxe','Simple Term',
];

function extractTier(r) {
  const plan = (r.plan_name || '').trim();
  const rawTier = (r.tier_name || '').trim();
  for (const t of KNOWN_TIERS) if (plan.includes(t)) return t;
  if (KNOWN_TIERS.includes(rawTier)) return rawTier;
  if (rawTier) return rawTier;
  return 'Standard';
}

// Special-case Americo HMS Term 100/125 split (same as the HMS fix earlier)
function productKey(r) {
  if (r.company === 'Americo (HMS)') {
    if (/Term 100/.test(r.plan_name)) return 'Americo (HMS Term 100)';
    if (/Term 125/.test(r.plan_name)) return 'Americo (HMS Term 125)';
  }
  return r.company;
}

let added = 0, dup = 0;
for (const r of gap) {
  const m = parseFloat(r.monthly);
  if (isNaN(m) || m <= 0) continue;
  const product = productKey(r);
  const tier    = extractTier(r);
  const cls     = (r.sex==='Male'?'M':'F') + (r.tobacco==='Cigarettes'?'S':'NS');
  const term    = String(r.term);
  const age     = String(r.age);
  const face    = String(r.face);
  if (!rates[product])              rates[product] = {};
  if (!rates[product][term])        rates[product][term] = {};
  if (!rates[product][term][tier])  rates[product][term][tier] = {};
  if (!rates[product][term][tier][cls])         rates[product][term][tier][cls] = {};
  if (!rates[product][term][tier][cls][age])    rates[product][term][tier][cls][age] = {};
  if (rates[product][term][tier][cls][age][face] != null) {
    dup++;
  } else {
    rates[product][term][tier][cls][age][face] = m;
    added++;
  }
}

console.log(`\nMerge result:`);
console.log(`  Added: ${added} new cells`);
console.log(`  Dup:   ${dup} (already had data — left untouched)`);
console.log(`  Products after merge: ${Object.keys(rates).length}`);

// Append gap raw rows to the master raw file so next gap-scan sees them
const combined = raw.concat(gap);
fs.writeFileSync(RAW_PATH, JSON.stringify(combined));
console.log(`  Appended ${gap.length} rows to itk_term_raw.json (now ${combined.length} total)`);

fs.writeFileSync(RATES_PATH, JSON.stringify(rates) + '\n');
console.log(`\nWrote ${RATES_PATH} (${(fs.statSync(RATES_PATH).size/1024).toFixed(0)} KB)`);

// Verify Mark's flagged cell
const probe = rates['Foresters (Your Term Medical)']?.['30']?.['Preferred Plus']?.['FNS']?.['35']?.['500000'];
console.log(`\nSpot-check: Foresters Your Term Medical 30y Pref+ FNS age 35 $500k → ${probe != null ? '$'+probe+'/mo ✓' : 'still null'}`);
