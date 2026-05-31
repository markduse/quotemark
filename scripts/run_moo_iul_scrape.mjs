#!/usr/bin/env node
// MOO IUL Express direct-portal scrape.
//
// Endpoint: https://api.mutualofomaha.com//mobile-quotes/v1/products/iule/calculate
// Auth: Basic <baked-in mobile-quotes public key> (no user login required)
// Mode: FACEAMOUNT — we send a desired premium, MOO returns the achievable face
//
// Issue range: age 18-75
// Face range: $25k-$550k (age 46), narrows to $25k-$350k at age 70
//
// Output: scripts/moo_iul_portal_raw.json — array of
//   { sex, tobacco, age, premium, face } rows
// Then merge with scripts/merge_moo_iul_portal.mjs.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.join(__dirname, 'moo_iul_portal_raw.json');
const ERR_PATH = path.join(__dirname, 'moo_iul_portal_errors.json');

const AUTH = 'Basic MG9hZXVzMnZ0c2xoMlE2dnY0aDc6cll5TVoyVzFtQjVPRU9kLWdCUDZoT1d0Q3dBLTNTNUZGQ0JCRkd2RENkTTJqNFdpaUZQME9wc0ExS2E1OGpaWg==';
const ENDPOINT = 'https://api.mutualofomaha.com//mobile-quotes/v1/products/iule/calculate';
const PRODUCT_VERSION = '1.0.119';

// Match our app's existing premium anchors.
const AGES = [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75];
const PREMIUMS = [50, 100, 150, 200, 300, 500];
const CLASSES = [
  { code: 'MNS', gender: 'MALE',   tobacco: 'NO'  },
  { code: 'MS',  gender: 'MALE',   tobacco: 'YES' },
  { code: 'FNS', gender: 'FEMALE', tobacco: 'NO'  },
  { code: 'FS',  gender: 'FEMALE', tobacco: 'YES' },
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

function buildBody({ age, gender, tobacco, premium }) {
  return {
    context: 'QUOTE',
    data: {
      additionalFields: {
        calculateType: 'FACEAMOUNT',
        desiredPayment: String(premium),
        desiredPaymentMode: 'MONTHLY',
        faceAmount: '',
      },
      insureds: [{
        additionalFields: { age: String(age) },
        coverages: {
          BASE: [{
            additionalFields: {
              calculateAnnually: '',
              calculateMonthlyBSP: '',
              calculateFaceAmount: '0.00',
            },
          }],
        },
        gender,
        residentialAddress: { state: 'MI' },
        tobaccoUse: tobacco,
      }],
      issueState: 'MI',
      productDefinitionInfo: { productDefinitionVersion: PRODUCT_VERSION, productId: 'IULE' },
      useExistingFundsToPay: '',
    },
  };
}

async function calculate(combo) {
  const r = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'Authorization': AUTH,
      'Origin': 'https://www3.mutualofomaha.com',
      'Referer': 'https://www3.mutualofomaha.com/',
    },
    body: JSON.stringify(buildBody(combo)),
  });
  if (!r.ok) {
    const txt = await r.text();
    throw new Error(`HTTP ${r.status}: ${txt.slice(0, 200)}`);
  }
  const j = await r.json();
  const face = parseFloat(j?.insureds?.[0]?.coverages?.BASE?.[0]?.additionalFields?.calculateFaceAmount ?? '0');
  const minP = parseFloat(j?.additionalFields?.minDesiredPayment ?? '0');
  const maxP = parseFloat(j?.additionalFields?.maxDesiredPayment ?? '0');
  return { face, minP, maxP };
}

(async () => {
  const results = [];
  const errors = [];
  const start = Date.now();
  const combos = [];
  for (const cls of CLASSES) for (const age of AGES) for (const premium of PREMIUMS) {
    combos.push({ ...cls, age, premium });
  }
  console.log(`[moo-iul] Firing ${combos.length} combos…`);

  let ok = 0, skip = 0, err = 0;
  for (let i = 0; i < combos.length; i++) {
    const c = combos[i];
    try {
      const { face, minP, maxP } = await calculate(c);
      // Skip combos where premium is outside MOO's allowed range for that age/class.
      if (minP && c.premium < minP) { skip++; }
      else if (maxP && c.premium > maxP) { skip++; }
      else if (!isFinite(face) || face <= 0) { skip++; }
      else {
        results.push({
          sex: c.gender === 'MALE' ? 'Male' : 'Female',
          tobacco: c.tobacco === 'YES' ? 'Cigarettes' : 'None',
          cls: c.code, age: c.age, premium: c.premium,
          face: Math.round(face),
          minP, maxP,
        });
        ok++;
      }
    } catch (e) {
      err++;
      errors.push({ combo: c, error: String(e) });
    }
    if (i % 25 === 0 || i === combos.length - 1) {
      const pct = (((i + 1) / combos.length) * 100).toFixed(0);
      const elapsed = ((Date.now() - start) / 1000).toFixed(0);
      console.log(`[moo-iul] ${i + 1}/${combos.length} (${pct}%) · ok=${ok} skip=${skip} err=${err} · ${elapsed}s`);
    }
    await sleep(500); // be polite to MOO's public quoter
  }

  fs.writeFileSync(OUT_PATH, JSON.stringify(results, null, 2));
  console.log(`\n[moo-iul] DONE · ${results.length} rows saved · ${OUT_PATH}`);
  if (errors.length) {
    fs.writeFileSync(ERR_PATH, JSON.stringify(errors, null, 2));
    console.log(`[moo-iul] ${errors.length} errors → ${ERR_PATH}`);
  }
})();
