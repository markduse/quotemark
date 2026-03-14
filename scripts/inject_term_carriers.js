/**
 * Inject term carrier data into App.jsx
 */
const fs = require('fs');
const path = require('path');

// Load term carrier data
const termData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/term_carriers.json')));
const appFile = path.join(__dirname, '../src/App.jsx');
let content = fs.readFileSync(appFile, 'utf8');

// Generate term rate lookup functions
const termFunctions = [];
const termCarrierEntries = [];
const termCarrierIds = [];

for (const [carrierName, carrierData] of Object.entries(termData)) {
  const carrierId = carrierName.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z_]/g, '');
  termCarrierIds.push(carrierId);
  
  // Extract rates for 10yr (only term length we have)
  const product = carrierData.products[0];
  const rates10 = product.rates['10'];
  
  // Generate rate lookup function
  const fnName = `${carrierId}Term10`;
  termFunctions.push(`
// ${carrierName} Term 10yr rates (per $1000 monthly)
const ${fnName.toUpperCase()}_MN = ${JSON.stringify(rates10.mn)};
const ${fnName.toUpperCase()}_MT = ${JSON.stringify(rates10.mt)};
const ${fnName.toUpperCase()}_FN = ${JSON.stringify(rates10.fn)};
const ${fnName.toUpperCase()}_FT = ${JSON.stringify(rates10.ft)};

function ${fnName}(age, male, smoker, face) {
  const tbl = male ? (smoker ? ${fnName.toUpperCase()}_MT : ${fnName.toUpperCase()}_MN) 
                  : (smoker ? ${fnName.toUpperCase()}_FT : ${fnName.toUpperCase()}_FN);
  const knownAges = Object.keys(tbl).map(Number).sort((a,b)=>a-b);
  if (age < knownAges[0] || age > knownAges[knownAges.length-1]) return null;
  
  // Find rate at this age (with interpolation)
  let rate;
  if (tbl[age]) {
    rate = tbl[age];
  } else {
    // Interpolate between surrounding ages
    let lo = knownAges[0], hi = knownAges[knownAges.length-1];
    for (let i = 0; i < knownAges.length - 1; i++) {
      if (age > knownAges[i] && age < knownAges[i+1]) {
        lo = knownAges[i]; hi = knownAges[i+1]; break;
      }
    }
    const rateLo = tbl[lo], rateHi = tbl[hi];
    if (rateLo == null || rateHi == null) return null;
    const t = (age - lo) / (hi - lo);
    rate = rateLo + t * (rateHi - rateLo);
  }
  
  // Scale by face amount (rates are per $100k, scale to actual face)
  return Math.round(rate * face / 100000 * 100) / 100;
}`);

  // Generate carrier entry
  const abbr = carrierName.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 2);
  termCarrierEntries.push(`  {id:'${carrierId}', name:'${carrierName}', sub:'Term Life', abbr:'${abbr}', enabled:true, termOnly:true,
   product:{B:'Term 10yr',C:null,D:null,E:null},
   fn:(age,male,smoker,tier,face)=>{
     if(tier!=='B') return null;
     return ${fnName}(age,male,smoker,face);
   }}`);
}

// Insert term functions before the CARRIERS array
const termFunctionCode = termFunctions.join('\n');
const carriersMatch = content.match(/(\/\/ Each carrier gets a single neutral initials label[^]*?)(\nconst CARRIERS = \[)/);
if (carriersMatch) {
  content = content.replace(carriersMatch[0], carriersMatch[1] + '\n\n// ── TERM LIFE CARRIERS ──' + termFunctionCode + carriersMatch[2]);
}

// Insert term carrier entries at the end of CARRIERS array (before the closing bracket)
const termCarrierCode = ',\n  // ── TERM LIFE CARRIERS ──\n' + termCarrierEntries.join(',\n');
const carriersEnd = content.match(/(\];)/);
if (carriersEnd) {
  const carriersEndPos = content.lastIndexOf('];');
  if (carriersEndPos > content.indexOf('const CARRIERS = [')) {
    content = content.substring(0, carriersEndPos) + termCarrierCode + '\n' + content.substring(carriersEndPos);
  }
}

// Write updated content
fs.writeFileSync(appFile, content);

console.log(`✅ Added ${termCarrierIds.length} term carriers to App.jsx:`);
termCarrierIds.forEach(id => console.log(`  - ${id}`));