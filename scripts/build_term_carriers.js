/**
 * Build structured term carrier rate tables from scraped ITK data
 */
const fs = require('fs');
const path = require('path');

// Load scraped 10yr data (complete set)
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/term_v6.json')));

// Carrier mapping based on ITK product names
const CARRIERS = {
  'American Amicable': [
    'Safecare Term Preferred 10-Year',
    'Safecare Term Standard 10-Year',
    'Easy Term 10-Year',
    'Term Made Simple Preferred 10-Year',
    'Term Made Simple Standard 10-Year',
    'Home Certainty Preferred 10-Year',
    'Home Certainty Standard 10-Year',
    'Strong Foundation 10-Year'
  ],
  'Instabrain': [
    'IB Term Preferred Plus 10-Year',
    'IB Term Preferred 10-Year',
    'IB Term Standard 10-Year',
    'IB Term Standard Extra 10-Year'
  ],
  'John Hancock': [
    'Simple Term with Vitality (2023) Preferred 10-Year',
    'Simple Term with Vitality (2023) Standard 10-Year',
    'Simple Term with Vitality (2023) Select 10-Year'
  ],
  'Mutual of Omaha': [
    'Term Life Express 10-Year'
  ],
  'SBLI': [
    'Super Preferred 10-Year',
    'Ultimate Preferred 10-Year',
    'Level 10-Year',
    'Standard 10-Year'
  ],
  'Royal Neighbors': [
    '10-Year Elite',
    '10-Year Preferred',
    '10-Year Select',
    '10-Year Standard',
    '10-Year Express 1',
    '10-Year Express 2'
  ],
  'Transamerica': [
    'Trendsetter Super 2021 10-Year Preferred Plus',
    'Trendsetter Super 2021 10-Year Preferred',
    'Trendsetter Super 2021 10-Year Standard Plus',
    'Trendsetter Super 2021 10-Year Standard',
    'Trendsetter LB 2017 10-Year Preferred',
    'Trendsetter LB 2017 10-Year Standard',
    'Your Term (Medical) 10-Year Preferred Plus',
    'Your Term (Medical) 10-Year Preferred',
    'Your Term (Medical) 10-Year Standard Plus',
    'Your Term (Medical) 10-Year Standard',
    'Your Term 10-Year Non-Med'
  ]
};

// Ages we scraped
const AGES = [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75];

function interpolateAges(ratesByAge) {
  // Add interpolation for missing ages 18-24
  const result = { ...ratesByAge };
  
  // Linear interpolation between age 25 and 30 to fill 18-24
  const rate25 = ratesByAge[25];
  const rate30 = ratesByAge[30];
  if (rate25 && rate30) {
    for (let age = 18; age <= 24; age++) {
      const ratio = (30 - age) / (30 - 25); // closer to 25 = higher ratio
      result[age] = rate25 * ratio + rate30 * (1 - ratio);
    }
  }
  
  return result;
}

function buildCarrierData(carrierName, productNames) {
  const d10 = data['10'] || {};
  
  // Find best rate for each age/combo
  const rates = {};
  
  for (const combo of ['mn', 'mt', 'fn', 'ft']) {
    rates[combo] = {};
    
    for (const age of AGES) {
      const ageStr = String(age);
      const quotes = d10[combo]?.[ageStr] || {};
      
      // Find lowest rate among this carrier's products
      let bestRate = Infinity;
      for (const productName of productNames) {
        const rate = quotes[productName];
        if (rate && rate < bestRate) {
          bestRate = rate;
        }
      }
      
      if (bestRate !== Infinity) {
        rates[combo][age] = bestRate;
      }
    }
    
    // Interpolate missing ages
    rates[combo] = interpolateAges(rates[combo]);
  }
  
  return {
    name: carrierName,
    products: [{
      name: `${carrierName} Term`,
      termLengths: ['10'],
      ages: { min: 18, max: 75 },
      coverage: { min: 25000, max: 300000 },
      states: ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC'],
      rates: {
        '10': rates
      }
    }]
  };
}

// Generate all carrier data
const carriers = {};
for (const [name, products] of Object.entries(CARRIERS)) {
  carriers[name] = buildCarrierData(name, products);
}

// Save to file
const outPath = path.join(__dirname, '../data/term_carriers.json');
fs.writeFileSync(outPath, JSON.stringify(carriers, null, 2));

// Summary
console.log('Built term carriers:');
Object.keys(carriers).forEach(name => {
  const sampleRates = carriers[name].products[0].rates['10'].mn;
  const ageCount = Object.keys(sampleRates).length;
  const sampleAge35 = sampleRates[35];
  console.log(`  ${name}: ${ageCount} ages, $${sampleAge35?.toFixed(2) || 'N/A'} at age 35`);
});
console.log('\nSaved to:', outPath);