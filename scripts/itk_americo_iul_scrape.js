// ── ITK AMERICO IUL FULL-GRID SCRAPER (browser console) ──
//
// WHY THIS EXISTS: driving the ITK SPA via automation kept bouncing to the
// marketing domain. This runs in YOUR logged-in browser console instead.
//
// HOW TO RUN:
//   1. Log into insurancetoolkits.com and open ANY working quoter (FEX is fine —
//      the JWT is shared across toolkits).
//   2. Run ONE normal quote so an auth'd /quoter/ request fires.
//   3. Open DevTools (Cmd+Option+I) → Console tab.
//   4. Paste this ENTIRE file, hit Enter.
//   5. It captures the JWT, fires the Americo IUL grid (~336 calls, ~3 min),
//      then auto-downloads "itk_americo_iul_raw.json".
//   6. Drop that file into quotemark/scripts/ and tell Claude to merge it.
//
// SAFETY: this only READS quotes. No data is changed on ITK. Placeholder
// detection ($50k-for-every-premium junk) is handled at merge time in node.

(() => {
  // 5-year age anchors across Americo Instant Decision IUL's 18–80 window.
  // The app interpolates between anchors, so we don't need every integer age.
  const AGES = [18, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];
  const PREMIUMS = [50, 100, 150, 200, 300, 500];
  const CLASSES = [
    { sex: 'Male',   tobacco: 'None' },
    { sex: 'Male',   tobacco: 'Cigarettes' },
    { sex: 'Female', tobacco: 'None' },
    { sex: 'Female', tobacco: 'Cigarettes' },
  ];

  // ── Capture JWT from any in-flight /quoter/ request ──
  let JWT = window.__qm_jwt || null;
  const grab = (auth) => { const m = String(auth || '').match(/^Bearer\s+(.+)$/); if (m) JWT = m[1]; };
  const of = window.fetch.bind(window);
  window.fetch = function (i, init) {
    try { const h = (init && init.headers) || {}; grab(h.Authorization || h.authorization || (h.get && h.get('authorization'))); } catch (e) {}
    return of(i, init);
  };
  const osrh = XMLHttpRequest.prototype.setRequestHeader;
  XMLHttpRequest.prototype.setRequestHeader = function (n, v) { if (String(n).toLowerCase() === 'authorization') grab(v); return osrh.apply(this, arguments); };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  async function call(combo) {
    const body = {
      faceAmount: 0,
      premium: combo.premium,
      monthlyPremium: combo.premium,
      sex: combo.sex,
      tobacco: combo.tobacco,
      state: 'MI',
      month: '06', day: '15',
      year: String(new Date().getFullYear() - combo.age),
      paymentType: 'Bank Draft/EFT',
      underwritingItems: [],
      toolkit: 'IUL',
    };
    const r = await fetch('https://api.insurancetoolkits.com/quoter/', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + JWT, 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (r.status === 400) return { quotes: [] };
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  }

  async function run() {
    if (!JWT) {
      console.error('[QM] No JWT captured yet. Run one normal quote in the ITK quoter first, then re-paste this script.');
      return;
    }
    const combos = [];
    for (const c of CLASSES) for (const age of AGES) for (const premium of PREMIUMS) combos.push({ ...c, age, premium });
    console.log(`[QM] Firing ${combos.length} Americo IUL combos…`);
    const rows = [];
    const start = Date.now();
    let ok = 0, gap = 0, err = 0;
    for (let i = 0; i < combos.length; i++) {
      const c = combos[i];
      try {
        const res = await call(c);
        const amer = (res.quotes || []).filter((q) => /americo/i.test(q.company || ''));
        for (const q of amer) {
          rows.push({ sex: c.sex, tobacco: c.tobacco, age: c.age, premium: c.premium, company: q.company, plan_name: q.plan_name, face_amount: q.face_amount, monthly: q.monthly });
        }
        if (amer.length) ok++; else gap++;
      } catch (e) { err++; }
      if (i % 30 === 0) console.log(`[QM] ${i}/${combos.length} · ok=${ok} gap=${gap} err=${err} · ${((Date.now()-start)/1000|0)}s`);
      await sleep(350);
    }
    console.log(`[QM] DONE · ${rows.length} Americo rows · ok=${ok} gap=${gap} err=${err}`);
    const blob = new Blob([JSON.stringify(rows, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'itk_americo_iul_raw.json';
    document.body.appendChild(a); a.click(); a.remove();
    console.log('[QM] Downloaded itk_americo_iul_raw.json — drop it in quotemark/scripts/ for Claude to merge.');
  }

  run();
})();
