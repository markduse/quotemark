// ── ITK AMERICO IUL FULL-GRID SCRAPER (browser console) ──
//
// WHY THIS EXISTS: driving the ITK SPA via automation kept bouncing to the
// marketing domain. This runs in YOUR logged-in browser console instead.
//
// HOW TO RUN (hands-off):
//   1. On app.insurancetoolkits.com IUL/SIUL quoter (where you're logged in),
//      open DevTools (Cmd+Option+I) → Console tab.
//   2. Paste this ENTIRE file, hit Enter.  → "Hook armed" prints.
//   3. Click "Get Quote" ONCE. The script grabs your token from that request
//      and auto-starts the Americo grid (~336 calls, ~2-3 min).
//   4. It auto-downloads "itk_americo_iul_raw.json" when done.
//   5. Drop that file into quotemark/scripts/ and tell Claude to merge it.
//
// (The token lives in your tab's memory, not a cookie — that's why it must run
//  here in your logged-in tab, and why one Get Quote click is needed to catch it.)
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
  // Also capture the EXACT request body of your Get Quote so we replay ITK's
  // expected shape (toolkit code, field names) instead of guessing.
  window.__qm_sample = window.__qm_sample || null;
  const grabBody = (url, b) => {
    if (!b || !/\/quoter\/?$/.test(String(url))) return;
    try { const j = typeof b === 'string' ? JSON.parse(b) : b; if (j && typeof j === 'object') window.__qm_sample = j; } catch (e) {}
  };
  const of = window.fetch.bind(window);
  window.fetch = function (i, init) {
    try {
      const h = (init && init.headers) || {}; grab(h.Authorization || h.authorization || (h.get && h.get('authorization')));
      grabBody(typeof i === 'string' ? i : (i && i.url), init && init.body);
    } catch (e) {}
    return of(i, init);
  };
  const oopen = XMLHttpRequest.prototype.open, osrh = XMLHttpRequest.prototype.setRequestHeader, osend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function (m, u) { this.__qm_url = u; return oopen.apply(this, arguments); };
  XMLHttpRequest.prototype.setRequestHeader = function (n, v) { if (String(n).toLowerCase() === 'authorization') grab(v); return osrh.apply(this, arguments); };
  XMLHttpRequest.prototype.send = function (b) { try { grabBody(this.__qm_url, b); } catch (e) {} return osend.apply(this, arguments); };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  // Build a request body for one combo by spreading your captured sample and
  // overriding only the fields we vary. Falls back to a sensible default shape
  // if no sample was captured.
  function buildBody(combo) {
    const yr = String(new Date().getFullYear() - combo.age);
    const base = window.__qm_sample ? JSON.parse(JSON.stringify(window.__qm_sample)) : { state: 'MI', month: '06', day: '15', paymentType: 'Bank Draft/EFT', underwritingItems: [], toolkit: 'IUL' };
    // Override the dimensions we sweep. Cover common field-name variants.
    base.sex = combo.sex;
    base.tobacco = combo.tobacco;
    if ('nicotine' in base) base.nicotine = combo.tobacco === 'Cigarettes' ? 'Cigarettes' : 'None';
    base.year = yr;
    if ('birthYear' in base) base.birthYear = yr;
    // Solve-for-premium: enter premium, leave face blank so ITK returns face.
    base.premium = combo.premium; base.monthlyPremium = combo.premium;
    if ('faceAmount' in base) base.faceAmount = '';
    if ('coverage' in base) base.coverage = '';
    return base;
  }

  async function call(combo) {
    const r = await fetch('https://api.insurancetoolkits.com/quoter/', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + JWT, 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' },
      body: JSON.stringify(buildBody(combo)),
    });
    if (r.status === 400) return { quotes: [] };
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  }

  // Try to find an already-set token in the live tab (it ran a quote before
  // this script loaded, so the hook didn't see it — but it may be cached on
  // axios defaults, a global, or storage). Lets you just paste & walk away.
  function findToken() {
    try { const a = window.axios && window.axios.defaults && window.axios.defaults.headers && window.axios.defaults.headers.common && (window.axios.defaults.headers.common.Authorization || window.axios.defaults.headers.common.authorization); const m = String(a||'').match(/Bearer\s+(.+)/); if (m) return m[1]; } catch (e) {}
    const scan = (store) => { try { for (let i=0;i<store.length;i++){ const v=store.getItem(store.key(i))||''; const m=v.match(/eyJ[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]+/); if (m) return m[0]; } } catch(e){} return null; };
    return scan(localStorage) || scan(sessionStorage) || null;
  }

  async function run() {
    if (!JWT) JWT = findToken();
    // Arm and wait: if we still don't have a token, poll until a Get Quote
    // click fires a request the hook can read (up to ~3 min).
    if (!JWT) {
      console.log('%c[QM] Hook armed — now click "Get Quote" ONCE to capture your token. The scrape starts automatically.', 'color:#C5A059;font-weight:bold');
      const waitStart = Date.now();
      while (!JWT) {
        if (Date.now() - waitStart > 180000) { console.error('[QM] Timed out waiting for a quote. Re-paste and click Get Quote.'); return; }
        await sleep(500);
      }
      console.log('[QM] Token captured — starting scrape.');
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
