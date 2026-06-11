// ── ITK FEX MULTI-CARRIER SCRAPER (resumable, localStorage-backed) ──
//
// Scrapes 8 FEX carriers (Occidental Golden Solution, Polish Falcons, Royal
// Arcanum, Gerber, Elco, Ethos, Combined, Aflac) in ONE sweep — the FEX quoter
// returns every carrier per call, so we filter to the wanted ones.
//
// RESUMABLE: every captured row is written to localStorage immediately, and
// completed (class,age,face) combos are remembered. If the tab closes or the
// extension disconnects mid-run, just re-paste this — it skips finished combos
// and continues. Nothing is lost.
//
// HOW TO RUN:
//   1. On app.insurancetoolkits.com/fex/quoter (logged in), run ONE quote so a
//      token is in memory, then open DevTools → Console.
//   2. Paste this whole file. It auto-finds the token (or says "click Get Quote
//      once"). It runs to completion, then auto-downloads fex_carriers_raw.json.
//   3. Re-paste any time to resume / fill gaps. Call window.__qm_dump() to
//      download the current accumulated rows on demand.

(() => {
  const FACES = [2000, 5000, 10000, 15000, 20000, 25000, 30000, 50000];
  const AGES = [0, 1, 5, 10, 15, 18, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85];
  const CLASSES = [
    { sex: 'Male', tobacco: 'None' }, { sex: 'Male', tobacco: 'Cigarettes' },
    { sex: 'Female', tobacco: 'None' }, { sex: 'Female', tobacco: 'Cigarettes' },
  ];
  const WANT = /^(Occidental Life \(Golden Solution\)|Polish Falcons|Royal Arcanum|Gerber|Elco|Ethos|Combined \(Final Expense|Aflac \(Final Expense)/i;

  const ROWS_KEY = 'qm_fex_rows', DONE_KEY = 'qm_fex_done';
  const loadRows = () => { try { return JSON.parse(localStorage.getItem(ROWS_KEY) || '[]'); } catch (e) { return []; } };
  const loadDone = () => { try { return new Set(JSON.parse(localStorage.getItem(DONE_KEY) || '[]')); } catch (e) { return new Set(); } };
  let rows = loadRows(); const done = loadDone();
  const saveRows = () => localStorage.setItem(ROWS_KEY, JSON.stringify(rows));
  const saveDone = () => localStorage.setItem(DONE_KEY, JSON.stringify([...done]));

  // token capture + auto-find
  let JWT = window.__qm_jwt || null;
  const grab = a => { const m = String(a || '').match(/Bearer\s+(.+)/); if (m) JWT = m[1]; };
  if (!window.__qm_fex_hook) {
    const of = window.fetch.bind(window);
    window.fetch = function (i, init) { try { const h = (init && init.headers) || {}; grab(h.Authorization || h.authorization || (h.get && h.get('authorization'))); } catch (e) {} return of(i, init); };
    const os = XMLHttpRequest.prototype.setRequestHeader;
    XMLHttpRequest.prototype.setRequestHeader = function (n, v) { if (String(n).toLowerCase() === 'authorization') grab(v); return os.apply(this, arguments); };
    window.__qm_fex_hook = true;
  }
  const findToken = () => { try { const a = window.axios?.defaults?.headers?.common?.Authorization; const m = String(a || '').match(/Bearer\s+(.+)/); if (m) return m[1]; } catch (e) {} return null; };

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  window.__qm_dump = () => {
    const blob = new Blob([JSON.stringify(loadRows(), null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'fex_carriers_raw.json';
    document.body.appendChild(a); a.click(); a.remove();
    console.log('[QM] downloaded', loadRows().length, 'rows');
  };

  async function call(c) {
    for (let a = 0; a < 3; a++) {
      try {
        const r = await fetch('https://api.insurancetoolkits.com/quoter/', {
          method: 'POST', headers: { 'Authorization': 'Bearer ' + JWT, 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' },
          body: JSON.stringify({ faceAmount: c.faceAmount, coverageType: 'Level', sex: c.sex, state: 'MI', age: c.age, feet: '', inches: '', weight: '', tobacco: c.tobacco, paymentType: 'Bank Draft/EFT', underwritingItems: [], toolkit: 'FEX' }),
        });
        if (r.ok) return await r.json();
        if (r.status === 429 || r.status >= 500) { await sleep(2500); continue; }
        return null;
      } catch (e) { await sleep(2000); }
    }
    return null;
  }

  async function run() {
    if (!JWT) JWT = findToken();
    if (!JWT) {
      console.log('%c[QM] Hook armed — click "Get Quote" ONCE, then re-paste this script.', 'color:#C5A059;font-weight:bold');
      return;
    }
    const combos = [];
    for (const c of CLASSES) for (const age of AGES) for (const f of FACES) {
      const key = c.sex + '|' + c.tobacco + '|' + age + '|' + f;
      if (!done.has(key)) combos.push({ ...c, faceAmount: f, __key: key });
    }
    console.log(`[QM] ${done.size} combos already done, ${combos.length} remaining. Rows so far: ${rows.length}`);
    let ok = 0, gap = 0, err = 0, since = 0;
    for (let i = 0; i < combos.length; i++) {
      const c = combos[i];
      const j = await call(c);
      if (j === null) err++;
      else {
        const qs = (j.quotes || []).filter(q => WANT.test(q.company || ''));
        for (const q of qs) rows.push({ company: q.company, plan_name: q.plan_name, tier_name: q.tier_name, sex: c.sex, tobacco: c.tobacco, age: c.age, face_req: c.faceAmount, face_amount: q.face_amount, monthly: q.monthly });
        if (qs.length) ok++; else gap++;
        done.add(c.__key);
      }
      if (++since >= 10) { saveRows(); saveDone(); since = 0; }
      if (i % 40 === 0) console.log(`[QM] ${i}/${combos.length} · ok=${ok} gap=${gap} err=${err} · rows=${rows.length}`);
      await sleep(900);
    }
    saveRows(); saveDone();
    console.log(`[QM] DONE · ${rows.length} rows · ok=${ok} gap=${gap} err=${err}. Downloading…`);
    window.__qm_dump();
  }
  run();
})();
