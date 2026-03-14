/**
 * Generate JavaScript code for term carrier rate tables to inject into App.jsx
 */
const fs = require('fs');
const path = require('path');

const allCarriers = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/term_carriers_all.json')));

let code = `\n// ═══════════════════════════════════════════════════════════\n// ── TERM LIFE CARRIERS — Scraped from InsuranceToolkits ──\n// ═══════════════════════════════════════════════════════════\n\n`;

// Generate lookup function once (shared by all carriers)
code += `function termLookup(ratesByTerm, termLen, combo, age, face) {
  const tRates = ratesByTerm[termLen];
  if (!tRates) return null;
  const comboRates = tRates[combo];
  if (!comboRates) return null;
  const knownAges = Object.keys(comboRates).map(Number).sort((a,b)=>a-b);
  if (!knownAges.length) return null;
  if (age < knownAges[0] || age > knownAges[knownAges.length-1]) return null;
  // Get rate at age (with interpolation)
  let rate;
  if (comboRates[age] != null) {
    rate = comboRates[age];
  } else {
    let lo = knownAges[0], hi = knownAges[knownAges.length-1];
    for (let i = 0; i < knownAges.length-1; i++) {
      if (age > knownAges[i] && age < knownAges[i+1]) { lo=knownAges[i]; hi=knownAges[i+1]; break; }
    }
    const rLo = comboRates[lo], rHi = comboRates[hi];
    if (rLo==null||rHi==null) return null;
    rate = rLo + (age-lo)/(hi-lo)*(rHi-rLo);
  }
  // Scale: rates scraped at $100K face, scale linearly
  return Math.round(rate * face / 100000 * 100) / 100;
}\n\n`;

const carrierEntries = [];

for (const [carrierId, data] of Object.entries(allCarriers)) {
  const varName = carrierId.toUpperCase() + '_TERM_RATES';
  
  // Compact the ratesByTerm object (integer keys, 2 decimal precision)
  const compact = {};
  for (const [term, combos] of Object.entries(data.ratesByTerm)) {
    compact[term] = {};
    for (const [combo, ages] of Object.entries(combos)) {
      compact[term][combo] = {};
      for (const [age, rate] of Object.entries(ages)) {
        compact[term][combo][age] = Math.round(rate * 100) / 100;
      }
    }
  }
  
  code += `const ${varName} = ${JSON.stringify(compact)};\n`;
  
  const abbr = data.name.split(' ').map(w=>w[0]).join('').toUpperCase().substring(0,2);
  const supportedTerms = data.supportedTerms.map(t=>`'${t}'`).join(',');
  
  carrierEntries.push(`  {id:'${carrierId}', name:'${data.name}', sub:'Term Life', abbr:'${abbr}', enabled:true, termOnly:true, supportedTerms:[${supportedTerms}],
   product:{B:'Term',C:null,D:null,E:null},
   fn:(age,male,smoker,tier,face,termLen)=>{
     if(tier!=='B') return null;
     const combo = male?(smoker?'mt':'mn'):(smoker?'ft':'fn');
     const tl = termLen||'10';
     if(![${supportedTerms}].includes(tl)) return null;
     return termLookup(${varName}, tl, combo, age, face);
   }}`);
}

code += `\n// ── TERM CARRIER ARRAY ──\nconst TERM_CARRIERS = [\n${carrierEntries.join(',\n')}\n];\n`;

fs.writeFileSync(path.join(__dirname, '../data/term_carriers_code.js'), code);
console.log('Generated term_carriers_code.js');
console.log('Code length:', code.length, 'chars');
