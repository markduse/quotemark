# Americo Eagle Select FE — Handoff Brief (2026-05-11)

> **Goal: enable Americo Eagle Select as a live FE carrier.**
> Already coded but disabled — just needs ratebook data + a flip to enable.
> This is the smallest of the three pending handoffs (~30-60 min once you have the PDF).

---

## Current state in code

The Americo carrier is already defined at [src/App.jsx:1400-1408](src/App.jsx#L1400):

```js
{id:'amr', name:'Americo', sub:'Eagle Select', abbr:'AM', enabled:false,
 product:{B:'Plan 1', C:'Plan 2', D:'Plan 3', E:null},
 stateCheck:(s)=>(fexStateOK('Americo',s)),
 fn:(age,male,smoker,tier,face)=>{
   if(tier==='B') return fexPrem('Americo','Eagle Select Plan 1',age,male,smoker,face);
   if(tier==='C') return fexPrem('Americo','Eagle Select Plan 2',age,male,smoker,face);
   if(tier==='D') return fexPrem('Americo','Eagle Select Plan 3',age,male,smoker,face);
   return null;
 }}
```

And `amr` is in the `FORCE_DISABLED` set at [src/App.jsx:71](src/App.jsx#L71) so it never appears in results.

The carrier expects rate data at three keys in `src/data/fex_rates.json`:

- `Americo||Eagle Select Plan 1` (tier B — Preferred / clean health)
- `Americo||Eagle Select Plan 2` (tier C — Standard / mild conditions)
- `Americo||Eagle Select Plan 3` (tier D — Modified / graded benefit)

**Currently those keys don't exist in fex_rates.json.** That's why this carrier
is disabled.

`AGE_MAX['amr'] = 85` is already set ([App.jsx:82](src/App.jsx#L82)).
`CARRIER_META['amr']` is already set with brand color `#60A5FA` and logo path.

---

## What Mark needs to gather

**One PDF: the Americo Eagle Select Final Expense ratebook.**

Sources:
- Americo agent portal: https://www.americo.com/agent-access → Final Expense → Eagle Select rate sheet
- Mark's FFL or upline portal may have it cached

The ratebook should contain:
- Rate per $1k (annual) for each age × gender × tobacco × plan (3 plans)
- Annual policy fee
- Modal factor for monthly EFT (typically 0.0875 or 0.0833 for FE)
- Age range supported per plan

Americo Eagle Select typically supports:
- Issue ages: 50-85 (varies by plan)
- Face amounts: $2,000 – $30,000 (per the existing AGE_FACE_BANDS in code — currently `amr` uses flat 30000 from `FACE_CAPS`)
- Plan 1 (Preferred): level death benefit
- Plan 2 (Standard): level death benefit
- Plan 3 (Modified): graded 2-year ROP rider, then full

---

## Execution plan (~30-60 min after PDF is on disk)

1. **(5 min) Inspect the PDF.** `pdftotext -layout` to dump text. Confirm:
   - Page count, rate table location
   - Number of plans (should be 3)
   - Number of rate classes (should be 4: MNS, MS, FNS, FS)
   - Annual policy fee + modal factor

2. **(15-30 min) Parse + extract.** Reuse the proven pattern from the Continental/Accendo/Fidelity rebuilds in this repo's recent history. The script `/tmp/audit_fe_rates.py` (if still present) or just write a new ad-hoc parser. Output format for each plan:
   ```python
   {
     "MNS": {"50": rate_per_1k, "51": ..., ...},
     "MS":  {...},
     "FNS": {...},
     "FS":  {...}
   }
   ```

3. **(10 min) Decide storage: factor-table or fexPrem JSON.**
   - **Factor-table** (preferred if Americo uses simple `(rate × units + fee) × modal`): add `americo` entry to `src/data/rate_factors.json` with the per-tier rate tables, then change the carrier's `fn` to use `factorCalc('americo', 'plan1', ...)` etc.
   - **fexPrem JSON** (if Americo has banded face-amount tables with non-linear pricing): generate every-$1k entries for each (age, face, class) combo and add to `src/data/fex_rates.json` under the three keys above. This is what the carrier currently expects per the existing `fn` code.

4. **(5 min) Enable the carrier:**
   - Remove `'amr'` from `FORCE_DISABLED` at [App.jsx:71](src/App.jsx#L71)
   - Change `enabled:false` to `enabled:true` at [App.jsx:1400](src/App.jsx#L1400)

5. **(10 min) Spot-check.** Quote (50 M NS MI $10k Preferred), compare to a quote run in Americo's agent portal. Should match within $0.05.

6. **(2 min) Push.** Commit + push. Netlify auto-deploys.

---

## Pattern to follow

Mirror the recent FE rebuilds. Look at git log for context:
- `feat: rebuild Fidelity Level + Guaranteed Issue rates from PDF` — most recent example
- `fix: rebuild Continental + Accendo (Preferred/Standard/Modified) from PDF`
- `feat: enable Transamerica Express Solution as a separate carrier` — same pattern of "data exists, just enable" if Americo data already happens to be in fex_rates.json (unlikely but worth checking before parsing)

The Fidelity work in particular ([m3300_rdfinalexpense_gigdb.pdf on Desktop](../Desktop/aa33d399-m3300_rdfinalexpense_gigdb.pdf)) is the closest parallel — same kind of 3-plan structure.

---

## Verification — Americo vs ITK

The ITK 2026-03-19 scrape at `~/Downloads/quotemark-files/Downloads/Data & Spreadsheets/Ultimate Spread Sheets/` does **NOT** include Americo coverage (we checked during the recent audit — Americo isn't in any of the FEX_*.csv files for this IMO).

Verification options:
- **A**: Run a manual quote in Americo's agent portal and compare. 5 sample quotes = sufficient.
- **B**: If you have an Americo-savvy upline, ask them to verify the rebuilt rates against their illustration software.
- **C**: For high confidence, do **A** at 3 ages × 3 face amounts = 9 quotes, ~15 min total.

---

## Starter prompt for a fresh Claude Code session

```
Picking up the Americo Eagle Select FE carrier build for QuoteMark.
Read AMERICO_FE_HANDOFF.md in the repo root — that's your full brief.

I have the Americo ratebook PDF on disk (I'll tell you where it is
when we start). Job: extract rates, populate the carrier data,
enable the carrier, push live.

This should be the easiest of the pending handoffs — the carrier is
already coded and scaffolded, we just need the rate data and to flip
the enable switch. Follow the exact pattern from the recent Fidelity /
Continental / Accendo rebuilds.
```

---

## Done state

When this session is complete:
- `src/data/fex_rates.json` (or `rate_factors.json`) has Americo Eagle Select data populated
- `amr` is removed from `FORCE_DISABLED`
- `enabled: true` on the carrier definition
- A spot-check quote matches Americo's agent portal within $0.05
- App now shows **16 enabled FE carriers** (was 15 after Trans Express Solution enable)
- One git commit, one push
