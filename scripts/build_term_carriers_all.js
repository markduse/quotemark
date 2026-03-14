/**
 * Build structured term carrier rate tables from all available scraped data
 * Handles 10yr, 15yr, 20yr, 30yr (uses whatever files exist)
 */
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');

// Carrier → ITK product name mapping
const CARRIER_PRODUCTS = {
  'American Amicable': {
    '10': ['Safecare Term Preferred 10-Year','Safecare Term Standard 10-Year','Easy Term 10-Year','Term Made Simple Preferred 10-Year','Term Made Simple Standard 10-Year','Home Certainty Preferred 10-Year','Home Certainty Standard 10-Year','Strong Foundation 10-Year'],
    '15': ['Safecare Term Preferred 15-Year','Safecare Term Standard 15-Year','Term Made Simple Preferred 15-Year','Term Made Simple Standard 15-Year','Home Certainty Preferred 15-Year','Home Certainty Standard 15-Year','Strong Foundation 15-Year'],
    '20': ['Safecare Term Preferred 20-Year','Safecare Term Standard 20-Year','Easy Term 20-Year','Term Made Simple Preferred 20-Year','Term Made Simple Standard 20-Year','Home Certainty Preferred 20-Year','Home Certainty Standard 20-Year','Strong Foundation 20-Year'],
    '30': ['Strong Foundation 30-Year','Safecare Term Preferred 30-Year','Safecare Term Standard 30-Year'],
  },
  'Instabrain': {
    '10': ['IB Term Preferred Plus 10-Year','IB Term Preferred 10-Year','IB Term Standard 10-Year','IB Term Standard Extra 10-Year'],
    '15': ['IB Term Preferred Plus 15-Year','IB Term Preferred 15-Year','IB Term Standard 15-Year','IB Term Standard Extra 15-Year'],
    '20': ['IB Term Preferred Plus 20-Year','IB Term Preferred 20-Year','IB Term Standard 20-Year','IB Term Standard Extra 20-Year'],
    '30': ['IB Term Preferred Plus 30-Year','IB Term Preferred 30-Year'],
  },
  'John Hancock': {
    '10': ['Simple Term with Vitality (2023) Preferred 10-Year','Simple Term with Vitality (2023) Standard 10-Year'],
    '15': ['Simple Term with Vitality (2023) Preferred 15-Year','Simple Term with Vitality (2023) Standard 15-Year'],
    '20': ['Simple Term with Vitality (2023) Preferred 20-Year','Simple Term with Vitality (2023) Standard 20-Year'],
    '30': ['Simple Term with Vitality (2023) Preferred 30-Year','Simple Term with Vitality (2023) Standard 30-Year'],
  },
  'Mutual of Omaha': {
    '10': ['Term Life Express 10-Year'],
    '15': ['Term Life Express 15-Year'],
    '20': ['Term Life Express 20-Year'],
    '30': ['Term Life Express 30-Year'],
  },
  'SBLI': {
    '10': ['Super Preferred 10-Year','Ultimate Preferred 10-Year','Level 10-Year','Standard 10-Year'],
    '15': ['Super Preferred 15-Year','Ultimate Preferred 15-Year','Level 15-Year','Standard 15-Year'],
    '20': ['Super Preferred 20-Year','Ultimate Preferred 20-Year','Level 20-Year','Standard 20-Year'],
    '30': ['Super Preferred 30-Year','Ultimate Preferred 30-Year','Level 30-Year','Standard 30-Year'],
  },
  'Royal Neighbors': {
    '10': ['10-Year Elite','10-Year Preferred','10-Year Select','10-Year Standard','10-Year Express 1','10-Year Express 2'],
    '15': ['15-Year Elite','15-Year Preferred','15-Year Select','15-Year Standard','15-Year Express 1','15-Year Express 2'],
    '20': ['20-Year Elite','20-Year Preferred','20-Year Select','20-Year Standard','20-Year Express 1','20-Year Express 2'],
    '30': ['30-Year Preferred','30-Year Standard'],
  },
  'Transamerica': {
    '10': ['Trendsetter Super 2021 10-Year Preferred Plus','Trendsetter Super 2021 10-Year Preferred','Your Term (Medical) 10-Year Preferred Plus','Your Term (Medical) 10-Year Preferred','Trendsetter LB 2017 10-Year Preferred','Your Term 10-Year Non-Med'],
    '15': ['Trendsetter Super 2021 15-Year Preferred Plus','Trendsetter Super 2021 15-Year Preferred','Your Term (Medical) 15-Year Preferred Plus','Your Term (Medical) 15-Year Preferred','Trendsetter LB 2017 15-Year Preferred','Your Term 15-Year Non-Med'],
    '20': ['Trendsetter Super 2021 20-Year Preferred Plus','Trendsetter Super 2021 20-Year Preferred','Your Term (Medical) 20-Year Preferred Plus','Your Term (Medical) 20-Year Preferred','Trendsetter LB 2017 20-Year Preferred','Your Term 20-Year Non-Med'],
    '30': ['Trendsetter Super 2021 30-Year Preferred Plus','Trendsetter Super 2021 30-Year Preferred','Your Term (Medical) 30-Year Preferred Plus','Your Term (Medical) 30-Year Preferred'],
  },
};

const TERM_LENGTHS = ['10','15','20','30'];
const AGES = [25,30,35,40,45,50,55,60,65,70,75];

// Load available term data files
function loadTermData(term) {
  const p = path.join(dataDir, `term_${term}yr.json`);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p));
}

function getBestRate(termData, term, combo, age, productNames) {
  if (!termData) return null;
  const quotes = termData[combo]?.[String(age)] || {};
  let best = Infinity;
  for (const name of productNames) {
    const rate = quotes[name];
    if (rate != null && rate < best) best = rate;
  }
  return best === Infinity ? null : best;
}

function interpolateAges(ratesByAge) {
  const result = { ...ratesByAge };
  const rate25 = ratesByAge[25], rate30 = ratesByAge[30];
  if (rate25 && rate30) {
    for (let age = 18; age <= 24; age++) {
      const ratio = (30 - age) / (30 - 25);
      result[age] = Math.round((rate25 * ratio + rate30 * (1 - ratio)) * 100) / 100;
    }
  }
  return result;
}

const allCarriers = {};

for (const [carrierName, termProducts] of Object.entries(CARRIER_PRODUCTS)) {
  const carrierId = carrierName.toLowerCase().replace(/\s+/g,'_').replace(/[^a-z_]/g,'');
  const ratesByTerm = {};
  let supportedTerms = [];

  for (const term of TERM_LENGTHS) {
    const termData = loadTermData(term);
    if (!termData) continue;

    const products = termProducts[term] || [];
    if (!products.length) continue;

    const rates = {};
    for (const combo of ['mn','mt','fn','ft']) {
      rates[combo] = {};
      for (const age of AGES) {
        const rate = getBestRate(termData, term, combo, age, products);
        if (rate != null) rates[combo][age] = rate;
      }
      rates[combo] = interpolateAges(rates[combo]);
    }

    // Only include if we have actual data
    const hasData = Object.values(rates.mn).length > 0;
    if (hasData) {
      ratesByTerm[term] = rates;
      supportedTerms.push(term);
    }
  }

  if (supportedTerms.length === 0) continue;

  allCarriers[carrierId] = {
    name: carrierName,
    supportedTerms,
    ratesByTerm,
  };

  // Sample output
  const sample = allCarriers[carrierId].ratesByTerm[supportedTerms[0]]?.mn?.[35];
  console.log(`${carrierName}: ${supportedTerms.join('/')}yr terms, age35=$${sample?.toFixed(2)||'N/A'}`);
}

fs.writeFileSync(path.join(dataDir, 'term_carriers_all.json'), JSON.stringify(allCarriers, null, 2));
console.log('\nSaved term_carriers_all.json');
console.log('Carriers:', Object.keys(allCarriers).join(', '));
