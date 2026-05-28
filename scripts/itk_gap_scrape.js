// ITK GAP-FILL SCRAPER
// Targets only the 175 (sex/tobacco/term/age/face) combos missing from the
// original May 26 scrape. Paste into the ITK browser console once logged in.
//
// USAGE:
//   1. Log into https://app.insurancetoolkits.com/term
//   2. Open DevTools console
//   3. Paste this entire file
//   4. It auto-captures the JWT from any in-flight XHR
//   5. Wait ~3 min for completion
//   6. Trigger download: window.__qm_gap_save()
//
// MERGE:
//   Drop the downloaded itk_gap_raw.json into scripts/, then run:
//     node scripts/merge_gap.mjs

(() => {
  // ── Inline the 175 missing combos (generated from raw scrape diff) ──
  const MISSING = [{"sex":"Female","tobacco":"None","term":"10","age":25,"face":1000000},{"sex":"Female","tobacco":"None","term":"10","age":30,"face":50000},{"sex":"Female","tobacco":"None","term":"10","age":30,"face":100000},{"sex":"Female","tobacco":"None","term":"10","age":30,"face":250000},{"sex":"Female","tobacco":"None","term":"10","age":30,"face":500000},{"sex":"Female","tobacco":"None","term":"10","age":65,"face":50000},{"sex":"Female","tobacco":"None","term":"10","age":65,"face":100000},{"sex":"Female","tobacco":"None","term":"15","age":45,"face":50000},{"sex":"Female","tobacco":"None","term":"15","age":45,"face":100000},{"sex":"Female","tobacco":"None","term":"15","age":45,"face":250000},{"sex":"Female","tobacco":"None","term":"15","age":45,"face":500000},{"sex":"Female","tobacco":"None","term":"15","age":45,"face":1000000},{"sex":"Female","tobacco":"None","term":"15","age":50,"face":50000},{"sex":"Female","tobacco":"None","term":"15","age":50,"face":100000},{"sex":"Female","tobacco":"None","term":"15","age":50,"face":250000},{"sex":"Female","tobacco":"None","term":"15","age":50,"face":500000},{"sex":"Female","tobacco":"None","term":"15","age":50,"face":1000000},{"sex":"Female","tobacco":"None","term":"15","age":55,"face":50000},{"sex":"Female","tobacco":"None","term":"15","age":55,"face":100000},{"sex":"Female","tobacco":"None","term":"15","age":55,"face":250000},{"sex":"Female","tobacco":"None","term":"15","age":55,"face":500000},{"sex":"Female","tobacco":"None","term":"15","age":55,"face":1000000},{"sex":"Female","tobacco":"None","term":"15","age":60,"face":50000},{"sex":"Female","tobacco":"None","term":"15","age":60,"face":100000},{"sex":"Female","tobacco":"None","term":"15","age":60,"face":250000},{"sex":"Female","tobacco":"None","term":"15","age":60,"face":500000},{"sex":"Female","tobacco":"None","term":"15","age":60,"face":1000000},{"sex":"Female","tobacco":"None","term":"15","age":65,"face":50000},{"sex":"Female","tobacco":"None","term":"15","age":65,"face":100000},{"sex":"Female","tobacco":"None","term":"15","age":65,"face":250000},{"sex":"Female","tobacco":"None","term":"20","age":30,"face":100000},{"sex":"Female","tobacco":"None","term":"20","age":30,"face":250000},{"sex":"Female","tobacco":"None","term":"20","age":30,"face":500000},{"sex":"Female","tobacco":"None","term":"20","age":30,"face":1000000},{"sex":"Female","tobacco":"None","term":"20","age":35,"face":50000},{"sex":"Female","tobacco":"None","term":"20","age":35,"face":100000},{"sex":"Female","tobacco":"None","term":"20","age":35,"face":250000},{"sex":"Female","tobacco":"None","term":"20","age":35,"face":500000},{"sex":"Female","tobacco":"None","term":"20","age":35,"face":1000000},{"sex":"Female","tobacco":"None","term":"20","age":40,"face":50000},{"sex":"Female","tobacco":"None","term":"20","age":40,"face":100000},{"sex":"Female","tobacco":"None","term":"20","age":40,"face":250000},{"sex":"Female","tobacco":"None","term":"20","age":40,"face":500000},{"sex":"Female","tobacco":"None","term":"20","age":40,"face":1000000},{"sex":"Female","tobacco":"None","term":"20","age":45,"face":50000},{"sex":"Female","tobacco":"None","term":"20","age":45,"face":100000},{"sex":"Female","tobacco":"None","term":"20","age":45,"face":250000},{"sex":"Female","tobacco":"None","term":"20","age":45,"face":500000},{"sex":"Female","tobacco":"None","term":"20","age":45,"face":1000000},{"sex":"Female","tobacco":"None","term":"20","age":50,"face":50000},{"sex":"Female","tobacco":"None","term":"20","age":50,"face":100000},{"sex":"Male","tobacco":"None","term":"25","age":25,"face":50000},{"sex":"Male","tobacco":"None","term":"25","age":25,"face":100000},{"sex":"Male","tobacco":"None","term":"25","age":25,"face":250000},{"sex":"Male","tobacco":"None","term":"25","age":40,"face":100000},{"sex":"Male","tobacco":"None","term":"25","age":40,"face":250000},{"sex":"Male","tobacco":"None","term":"25","age":40,"face":500000},{"sex":"Male","tobacco":"None","term":"25","age":40,"face":1000000},{"sex":"Female","tobacco":"None","term":"25","age":50,"face":250000},{"sex":"Female","tobacco":"None","term":"25","age":50,"face":500000},{"sex":"Female","tobacco":"None","term":"25","age":50,"face":1000000},{"sex":"Female","tobacco":"None","term":"25","age":55,"face":50000},{"sex":"Female","tobacco":"None","term":"25","age":55,"face":100000},{"sex":"Female","tobacco":"None","term":"25","age":55,"face":250000},{"sex":"Female","tobacco":"None","term":"25","age":55,"face":500000},{"sex":"Female","tobacco":"None","term":"25","age":55,"face":1000000},{"sex":"Female","tobacco":"None","term":"25","age":60,"face":50000},{"sex":"Female","tobacco":"None","term":"25","age":60,"face":100000},{"sex":"Female","tobacco":"None","term":"25","age":60,"face":250000},{"sex":"Female","tobacco":"None","term":"25","age":65,"face":1000000},{"sex":"Female","tobacco":"None","term":"30","age":35,"face":250000},{"sex":"Female","tobacco":"None","term":"30","age":35,"face":500000},{"sex":"Female","tobacco":"None","term":"30","age":35,"face":1000000},{"sex":"Female","tobacco":"None","term":"30","age":45,"face":50000},{"sex":"Female","tobacco":"None","term":"30","age":45,"face":100000},{"sex":"Female","tobacco":"None","term":"30","age":45,"face":250000},{"sex":"Female","tobacco":"None","term":"30","age":45,"face":500000},{"sex":"Female","tobacco":"None","term":"30","age":45,"face":1000000},{"sex":"Female","tobacco":"None","term":"30","age":50,"face":50000},{"sex":"Female","tobacco":"None","term":"30","age":50,"face":100000},{"sex":"Female","tobacco":"None","term":"30","age":50,"face":250000},{"sex":"Female","tobacco":"None","term":"30","age":50,"face":500000},{"sex":"Male","tobacco":"None","term":"35","age":35,"face":50000},{"sex":"Male","tobacco":"None","term":"35","age":35,"face":100000},{"sex":"Male","tobacco":"None","term":"35","age":35,"face":250000},{"sex":"Male","tobacco":"None","term":"35","age":40,"face":50000},{"sex":"Male","tobacco":"None","term":"35","age":40,"face":100000},{"sex":"Male","tobacco":"None","term":"35","age":40,"face":250000},{"sex":"Female","tobacco":"None","term":"40","age":25,"face":50000},{"sex":"Female","tobacco":"None","term":"40","age":25,"face":100000},{"sex":"Female","tobacco":"None","term":"40","age":45,"face":50000},{"sex":"Female","tobacco":"None","term":"40","age":45,"face":100000},{"sex":"Female","tobacco":"None","term":"40","age":45,"face":250000},{"sex":"Female","tobacco":"Cigarettes","term":"10","age":30,"face":50000},{"sex":"Female","tobacco":"Cigarettes","term":"10","age":30,"face":100000},{"sex":"Female","tobacco":"Cigarettes","term":"10","age":30,"face":250000},{"sex":"Female","tobacco":"Cigarettes","term":"10","age":30,"face":500000},{"sex":"Female","tobacco":"Cigarettes","term":"10","age":30,"face":1000000},{"sex":"Female","tobacco":"Cigarettes","term":"10","age":35,"face":50000},{"sex":"Female","tobacco":"Cigarettes","term":"10","age":35,"face":100000},{"sex":"Female","tobacco":"Cigarettes","term":"10","age":35,"face":250000},{"sex":"Female","tobacco":"Cigarettes","term":"10","age":35,"face":500000},{"sex":"Female","tobacco":"Cigarettes","term":"10","age":35,"face":1000000},{"sex":"Female","tobacco":"Cigarettes","term":"10","age":40,"face":50000},{"sex":"Female","tobacco":"Cigarettes","term":"10","age":40,"face":100000},{"sex":"Female","tobacco":"Cigarettes","term":"10","age":40,"face":250000},{"sex":"Female","tobacco":"Cigarettes","term":"10","age":40,"face":500000},{"sex":"Female","tobacco":"Cigarettes","term":"10","age":40,"face":1000000},{"sex":"Female","tobacco":"Cigarettes","term":"10","age":45,"face":50000},{"sex":"Female","tobacco":"Cigarettes","term":"10","age":45,"face":100000},{"sex":"Female","tobacco":"Cigarettes","term":"10","age":45,"face":250000},{"sex":"Female","tobacco":"Cigarettes","term":"10","age":45,"face":500000},{"sex":"Female","tobacco":"Cigarettes","term":"10","age":45,"face":1000000},{"sex":"Male","tobacco":"Cigarettes","term":"15","age":25,"face":50000},{"sex":"Male","tobacco":"Cigarettes","term":"15","age":25,"face":100000},{"sex":"Male","tobacco":"Cigarettes","term":"15","age":25,"face":250000},{"sex":"Female","tobacco":"Cigarettes","term":"15","age":30,"face":50000},{"sex":"Female","tobacco":"Cigarettes","term":"15","age":60,"face":250000},{"sex":"Female","tobacco":"Cigarettes","term":"15","age":60,"face":500000},{"sex":"Female","tobacco":"Cigarettes","term":"15","age":60,"face":1000000},{"sex":"Female","tobacco":"Cigarettes","term":"15","age":65,"face":50000},{"sex":"Female","tobacco":"Cigarettes","term":"15","age":65,"face":100000},{"sex":"Male","tobacco":"Cigarettes","term":"20","age":30,"face":1000000},{"sex":"Male","tobacco":"Cigarettes","term":"20","age":35,"face":50000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":40,"face":100000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":40,"face":250000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":40,"face":500000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":40,"face":1000000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":45,"face":50000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":45,"face":100000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":45,"face":250000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":45,"face":500000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":45,"face":1000000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":50,"face":50000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":50,"face":100000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":50,"face":250000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":50,"face":500000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":50,"face":1000000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":55,"face":50000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":55,"face":100000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":55,"face":250000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":55,"face":500000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":55,"face":1000000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":60,"face":50000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":60,"face":100000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":60,"face":250000},{"sex":"Female","tobacco":"Cigarettes","term":"20","age":60,"face":500000},{"sex":"Male","tobacco":"Cigarettes","term":"30","age":25,"face":50000},{"sex":"Male","tobacco":"Cigarettes","term":"30","age":25,"face":100000},{"sex":"Male","tobacco":"Cigarettes","term":"30","age":25,"face":250000},{"sex":"Male","tobacco":"Cigarettes","term":"30","age":25,"face":500000},{"sex":"Female","tobacco":"Cigarettes","term":"30","age":40,"face":1000000},{"sex":"Female","tobacco":"Cigarettes","term":"30","age":45,"face":50000},{"sex":"Female","tobacco":"Cigarettes","term":"30","age":45,"face":100000},{"sex":"Female","tobacco":"Cigarettes","term":"30","age":45,"face":250000},{"sex":"Female","tobacco":"Cigarettes","term":"30","age":45,"face":500000},{"sex":"Female","tobacco":"Cigarettes","term":"30","age":45,"face":1000000},{"sex":"Female","tobacco":"Cigarettes","term":"30","age":50,"face":50000},{"sex":"Female","tobacco":"Cigarettes","term":"30","age":50,"face":100000},{"sex":"Female","tobacco":"Cigarettes","term":"30","age":50,"face":250000},{"sex":"Female","tobacco":"Cigarettes","term":"30","age":50,"face":500000},{"sex":"Female","tobacco":"Cigarettes","term":"30","age":50,"face":1000000},{"sex":"Female","tobacco":"Cigarettes","term":"30","age":55,"face":50000},{"sex":"Female","tobacco":"Cigarettes","term":"30","age":55,"face":100000},{"sex":"Female","tobacco":"Cigarettes","term":"30","age":55,"face":250000},{"sex":"Female","tobacco":"Cigarettes","term":"30","age":55,"face":500000},{"sex":"Female","tobacco":"Cigarettes","term":"30","age":60,"face":50000},{"sex":"Female","tobacco":"Cigarettes","term":"30","age":60,"face":100000},{"sex":"Female","tobacco":"Cigarettes","term":"30","age":60,"face":250000},{"sex":"Male","tobacco":"Cigarettes","term":"35","age":45,"face":50000},{"sex":"Male","tobacco":"Cigarettes","term":"35","age":45,"face":100000},{"sex":"Male","tobacco":"Cigarettes","term":"35","age":45,"face":250000},{"sex":"Male","tobacco":"Cigarettes","term":"35","age":50,"face":50000},{"sex":"Male","tobacco":"Cigarettes","term":"35","age":50,"face":100000},{"sex":"Male","tobacco":"Cigarettes","term":"35","age":50,"face":250000}];

  // ── Capture JWT via XHR hook ──
  const origOpen = XMLHttpRequest.prototype.open;
  const origSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    this.__qm_url = url;
    return origOpen.apply(this, [method, url, ...rest]);
  };
  XMLHttpRequest.prototype.setRequestHeader = (function(orig) {
    return function(name, value) {
      if (name.toLowerCase() === 'authorization' && /^Bearer /.test(value)) {
        window.__qm_token = value.replace(/^Bearer /, '');
      }
      return orig.apply(this, arguments);
    };
  })(XMLHttpRequest.prototype.setRequestHeader);

  // Bump run counter so a previous in-flight loop self-aborts
  window.__qm_run = (window.__qm_run || 0) + 1;
  const RUN = window.__qm_run;
  window.__qm_gap_results = [];
  window.__qm_gap_errors = [];

  async function callApi(combo) {
    if (!window.__qm_token) throw new Error('No JWT captured yet — trigger a normal ITK quote first');
    const body = {
      faceAmount: combo.face,
      sex: combo.sex,
      term: combo.term,
      state: 'MI',
      month: '06', day: '15',
      // Year matches age: today's year - age, roughly
      year: String(new Date().getFullYear() - combo.age),
      tobacco: combo.tobacco,
      paymentType: 'Bank Draft/EFT',
      underwritingItems: [],
      toolkit: 'TERM',
    };
    const r = await fetch('https://api.insurancetoolkits.com/quoter/', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + window.__qm_token,
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (r.status === 400) return { status: 400, quotes: [] }; // legitimate "no quote"
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  }

  async function run() {
    console.log(`[QM gap-scrape] starting run ${RUN}, ${MISSING.length} combos`);
    const start = Date.now();
    let ok = 0, gap = 0, err = 0;
    for (let i = 0; i < MISSING.length; i++) {
      if (window.__qm_run !== RUN) { console.log(`[QM] superseded by run ${window.__qm_run}, aborting`); return; }
      const c = MISSING[i];
      try {
        const res = await callApi(c);
        const quotes = res.quotes || [];
        for (const q of quotes) {
          window.__qm_gap_results.push({
            sex: c.sex, tobacco: c.tobacco, term: c.term, age: c.age, face: c.face,
            company: q.company, tier_name: q.tier_name, plan_name: q.plan_name,
            monthly: q.monthly, yearly: q.yearly, face_amount: q.face_amount,
          });
        }
        if (res.status === 400 || !quotes.length) gap++; else ok++;
      } catch (e) {
        err++;
        window.__qm_gap_errors.push({ combo: c, error: String(e) });
      }
      if (i % 25 === 0) {
        const pct = ((i / MISSING.length) * 100).toFixed(0);
        const elapsed = ((Date.now() - start) / 1000).toFixed(0);
        console.log(`[QM] ${i}/${MISSING.length} (${pct}%) · ok=${ok} gap=${gap} err=${err} · ${elapsed}s elapsed`);
      }
      // Throttle: ~500ms per call to avoid rate-limit
      await new Promise(r => setTimeout(r, 500));
    }
    const elapsed = ((Date.now() - start) / 1000).toFixed(0);
    console.log(`[QM gap-scrape] DONE · ${window.__qm_gap_results.length} quote rows captured · ${elapsed}s · ok=${ok} gap=${gap} err=${err}`);
    console.log(`[QM] Call window.__qm_gap_save() to download itk_gap_raw.json`);
  }

  window.__qm_gap_save = () => {
    const blob = new Blob([JSON.stringify(window.__qm_gap_results, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'itk_gap_raw.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    console.log(`[QM] downloaded ${window.__qm_gap_results.length} rows to itk_gap_raw.json`);
  };

  // Auto-start
  run();
})();
