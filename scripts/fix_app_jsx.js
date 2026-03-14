/**
 * Clean fix for App.jsx:
 * 1. Remove the corrupted term carrier injection (which broke JSX)
 * 2. Remove old per-carrier 10yr-only functions
 * 3. Insert new clean multi-term code in the right place
 */
const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '../src/App.jsx');
let content = fs.readFileSync(appPath, 'utf8');

// ─── STEP 1: Remove corrupted CARRIERS array injection ───
// The old script inserted term carriers mid-JSX, breaking the render tree.
// Find the corrupted section: from "// ── TERM LIFE CARRIERS ──\n  {id:'american_amicable'"
// to the closing ]; // sorted cheapest first
const corruptStart = content.indexOf('\n  // ── TERM LIFE CARRIERS ──\n  {id:\'american_amicable\'');
const corruptEnd = content.indexOf(']; // sorted cheapest first');
if (corruptStart !== -1 && corruptEnd !== -1) {
  content = content.substring(0, corruptStart) + content.substring(corruptEnd + ']; // sorted cheapest first'.length);
  console.log('✅ Removed corrupted CARRIERS injection');
} else {
  console.log('⚠️  Corrupted injection markers not found, skipping step 1');
}

// ─── STEP 2: Remove old per-carrier 10yr functions + rate tables ───
// These are the blocks starting with "// ── TERM LIFE CARRIERS ──\n// American Amicable Term 10yr"
const oldTermStart = content.indexOf('\n\n// ── TERM LIFE CARRIERS ──\n// American Amicable Term 10yr');
const oldTermEnd = content.indexOf('\n\n// Each carrier gets a single neutral initials label');
if (oldTermStart !== -1 && oldTermEnd !== -1) {
  content = content.substring(0, oldTermStart) + content.substring(oldTermEnd);
  console.log('✅ Removed old per-carrier 10yr functions');
} else {
  console.log('⚠️  Old term functions block not found precisely, trying alternate markers...');
  // Try alternate
  const alt1 = content.indexOf('// ── TERM LIFE CARRIERS ──\n// American Amicable');
  if (alt1 !== -1) {
    const alt2 = content.indexOf('\n// Each carrier gets', alt1);
    if (alt2 !== -1) {
      content = content.substring(0, alt1) + content.substring(alt2 + 1);
      console.log('✅ Removed (alternate markers)');
    }
  }
}

// ─── STEP 3: Remove old term carrier entries from CARRIERS array (if any remain) ───
const oldInArrayStart = content.indexOf(',\n  // ── TERM LIFE CARRIERS ──\n  {id:\'american_amicable\'');
if (oldInArrayStart !== -1) {
  // Find end of old term entries in CARRIERS (the ];)
  const carriersClose = content.indexOf('\n];', oldInArrayStart);
  if (carriersClose !== -1) {
    content = content.substring(0, oldInArrayStart) + content.substring(carriersClose);
    console.log('✅ Removed old term entries from CARRIERS array');
  }
}

// ─── STEP 4: Load new term carrier code ───
const newTermCode = fs.readFileSync(path.join(__dirname, '../data/term_carriers_code.js'), 'utf8');

// ─── STEP 5: Insert new term code before "// Each carrier gets a single neutral" ───
const insertBefore = '\n// Each carrier gets a single neutral initials label';
const insertPos = content.indexOf(insertBefore);
if (insertPos !== -1) {
  content = content.substring(0, insertPos) + '\n' + newTermCode + content.substring(insertPos);
  console.log('✅ Inserted new multi-term carrier code');
} else {
  console.log('❌ Insert position not found! Aborting.');
  process.exit(1);
}

// ─── STEP 6: Update CARRIERS array to include TERM_CARRIERS ───
// Replace the closing ]; of CARRIERS with a spread of TERM_CARRIERS
const carriersClose = '\n  {id:\'sl_pp\', name:\'Senior Life\',         sub:\'Platinum Protection\', abbr:\'SL\', enabled:true,\n   product:{B:\'Level\',C:null,D:null,E:null},\n   fn:(age,male,smoker,tier,face)=>slPpQuote(age,male,smoker,tier,face)},\n];';
const carriersCloseNew = `\n  {id:'sl_pp', name:'Senior Life',         sub:'Platinum Protection', abbr:'SL', enabled:true,\n   product:{B:'Level',C:null,D:null,E:null},\n   fn:(age,male,smoker,tier,face)=>slPpQuote(age,male,smoker,tier,face)},\n  // ── TERM LIFE CARRIERS (injected below) ──\n  ...TERM_CARRIERS,\n];`;
if (content.includes(carriersClose)) {
  content = content.replace(carriersClose, carriersCloseNew);
  console.log('✅ Spread TERM_CARRIERS into CARRIERS array');
} else {
  console.log('⚠️  CARRIERS close not found, trying simpler approach...');
  // Try to find the end of CARRIERS
  const idx = content.indexOf("fn:(age,male,smoker,tier,face)=>slPpQuote(age,male,smoker,tier,face)},\n];");
  if (idx !== -1) {
    const insertAt = idx + "fn:(age,male,smoker,tier,face)=>slPpQuote(age,male,smoker,tier,face)},\n".length;
    content = content.substring(0, insertAt) + '  ...TERM_CARRIERS,\n' + content.substring(insertAt);
    console.log('✅ Spread TERM_CARRIERS (alternate method)');
  }
}

// ─── STEP 7: Update termResults to pass termLength to carrier fn ───
// The carrier fn now accepts termLen as 5th param
content = content.replace(
  /const prem = carr\.fn\(termAgeNum, male, smoker, 'B', termFace\);/g,
  "const prem = carr.fn(termAgeNum, male, smoker, 'B', termFace, termLength);"
);
console.log('✅ Updated termResults to pass termLength');

// ─── STEP 8: Update product label in carrier entry to be dynamic ───
// Replace static 'Term 10yr' product label
content = content.replace(
  /product:\{B:'Term 10yr',C:null,D:null,E:null\}/g,
  "product:{B:'Term',C:null,D:null,E:null}"
);
console.log('✅ Updated product label');

// Write back
fs.writeFileSync(appPath, content);
console.log('\n✅ App.jsx updated successfully');
