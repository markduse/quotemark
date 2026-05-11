# Term Life — Handoff Brief (2026-05-11)

> **Goal of next session: ship the Term Life tab live within 2 hours.**
> Mark's target: 10 specific carriers, accurate rates, working UI.
> Tab currently shows "Coming Soon" in 4 places — backend scaffolding
> exists but the UI was never built and only 4 of the 10 target carriers
> have any rate data wired.

---

## Final carrier list — 10 carriers

| # | Carrier | Status today | What's needed |
|---|---|---|---|
| 1 | **SBLI** | ✅ wired, sparse data | Verify rates → possibly rebuild from PDF |
| 2 | **Instabrain** | ✅ wired, sparse data | Verify rates → possibly rebuild from PDF |
| 3 | **Mutual of Omaha (TLE)** | ✅ wired, sparse data | Verify rates → possibly rebuild from PDF |
| 4 | **American Amicable** | ✅ wired, sparse data | Verify rates → possibly rebuild from PDF |
| 5 | **Foresters** | ❌ not coded | Need ratebook PDF + carrier definition |
| 6 | **Kansas City Life** | ❌ not coded | Need ratebook PDF + carrier definition |
| 7 | **Americo** | ❌ not coded | Need ratebook PDF + carrier definition |
| 8 | **Protective** | ❌ not coded | Need ratebook PDF + carrier definition |
| 9 | **National Life Group** | ❌ not coded | Need ratebook PDF + carrier definition |
| 10 | **United Home Life** | ❌ not coded | Need ratebook PDF + carrier definition |

## Drop list (currently coded, Mark doesn't sell)

- **John Hancock** — currently wired (`TERM_CARRIERS` index 2). Remove the carrier entry + the `JOHN_HANCOCK_TERM_RATES` constant.
- **Royal Neighbors term** — currently wired. Remove.
- **Transamerica term** — currently wired. Remove. (Note: Trans **FE** Express Solution stays — different product, separate carrier ID `ta_exp`.)

---

## Current scaffolding state in code

### What exists (don't re-build)

- `TERM_CARRIERS` array at [src/App.jsx:982](src/App.jsx#L982) — array of carrier objects with `termOnly:true` flag
- Inline rate tables at [src/App.jsx:839-845](src/App.jsx#L839) for the 7 currently-wired term carriers, format:
  ```js
  const SBLI_TERM_RATES = {
    "10": {                  // term length (years)
      "mn": { "18": 7.81, "19": 7.81, ..., "75": 151.26 },  // male non-tobacco
      "mt": { ... },         // male tobacco
      "fn": { ... },         // female non-tobacco
      "ft": { ... }          // female tobacco
    },
    "15": {...}, "20": {...}, "30": {...}
  };
  ```
- **Sparse age coverage**: 18, 19, 20, 21, 22, 23, 24, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75 (18 ages, gaps of 5 years above age 25)
- `termLookup()` and `termResults` useMemo at [src/App.jsx:2199](src/App.jsx#L2199) — quoter engine
- `MOO_TERM_FACES` constant at [src/App.jsx:238](src/App.jsx#L238) — face brackets for MOO
- `activeCarriers` filter at [src/App.jsx:2163](src/App.jsx#L2163) — correctly excludes term carriers in FE mode and vice versa
- Tab switch wired ([src/App.jsx](src/App.jsx) — `setQuoteMode('term')`) — clicking the **Term Life** tab in the header sets the mode

### What does NOT exist yet (must be built)

- **UI for the Term tab.** Look for `quoteMode === 'term'` checks — currently 4 places render `"Coming Soon"`:
  - [App.jsx:2575](src/App.jsx#L2575) — desktop empty state
  - [App.jsx:2671](src/App.jsx#L2671) — mobile term results section
  - [App.jsx:3453](src/App.jsx#L3453) — desktop empty (second branch?)
  - [App.jsx:3557](src/App.jsx#L3557) — desktop large empty
- **Term-specific form fields.** FE form has age/gender/state/tobacco/face/UW. Term needs:
  - Age
  - Gender
  - Tobacco
  - State
  - **Face amount** ($25k–$1M+ typically — current slider is $2k–$100k, needs new range when term tab active)
  - **Term length** (10 / 15 / 20 / 30 — pill selector)
  - **Health class** (Pref Plus / Pref / Std Plus / Std — different from FE's B/C/D/E tier model)
- **Per-carrier max-age × term-length matrix.** Carriers commonly disallow 30-year term above age 55. Need a `TERM_MAX_AGE_BY_LENGTH[carrierId]` map.
- **Result rendering for term.** The existing list-row card in App.jsx renders FE-shaped results. Term needs a parallel render branch (or a generalized renderer) that shows term-specific metadata.

---

## Health class mapping — critical design decision

FE tiers (B/C/D/E) don't map 1:1 to term health classes. Term standard categories:

| Term class | Approximate FE-equivalent | Notes |
|---|---|---|
| Preferred Plus | Better than FE Preferred | Clean health, ideal weight, no tobacco |
| Preferred | FE Preferred | Mild controlled conditions |
| Standard Plus | FE Standard | Average health |
| Standard | FE Standard | Below average but insurable |
| Tobacco (Pref) | n/a — separate class | |
| Tobacco (Std) | n/a — separate class | |

**Recommendation**: keep term's health class separate from FE's UW tier in the UI. Don't try to share state. When the agent clicks the Term tab, show a fresh "Health class" pill selector.

---

## Where to source ratebooks for the 6 new carriers

Term ratebooks usually live on each carrier's agent portal. Mark needs to gather these BEFORE the next session starts:

| Carrier | Likely portal / source |
|---|---|
| Foresters | forestersfinancial.com → agent portal → **PlanRight Term** or **Advantage Plus** rate sheet |
| Kansas City Life | kclife.com → producer portal → term life rate book |
| Americo | americo.com/agent-access → **Continuous Renewable Term (CRT)** or **HMS Term** rate sheet |
| Protective | protective.com → producer portal → **Classic Choice** or **Custom Choice** rate sheet |
| National Life Group | nlgroup.com → agent portal → **Trendsetter** or term rate sheet |
| United Home Life | agentportal.unitedhomelife.com → **Term Deluxe** or **Term** rate sheet (per UHL's Whole_Life_-_Agent_Guide.pdf — UHL has both Term and Term Deluxe products) |

**Mark's pre-session prep**: AirDrop these PDFs to this Mac mini's Downloads before kicking off the term session. Each PDF should be the **rates** sheet specifically (not the UW guide or marketing material).

## Existing data quality — should we trust the 4 already-wired carriers?

The inline rates in `App.jsx:839-845` were "Scraped from InsuranceToolkits" per the source comment. From the FE-side audit pattern, ITK scrapes tend to be **mostly accurate but with edge-case bugs** (Accendo had 200/200 cells wrong in one tier; UHL had silent drift at older ages). Verification options:

- **Path A (fastest):** trust ITK, ship as-is, fix issues as they appear via support requests
- **Path B (safest):** for each of the 4 already-wired carriers, get the carrier's published rate sheet, run a 5-quote spot-check, only rebuild if drift > $1
- **Path C (best long-term):** rebuild ALL 10 carriers from PDF using the proven UHL/Continental/Accendo/Fidelity pattern. Total work: ~3-4 hours but you sleep easy.

**Recommendation for the 2-hour push**: Path B. Spot-check the 4 existing carriers (10 minutes each = 40 min), rebuild only if needed. Then add the 6 new ones from PDFs (10 min each = 60 min). Then build UI (40 min).

---

## Term ≠ FE — designed differences to handle

1. **Face amount range** — typical term is $100k–$1M. Slider needs different range when term tab is active.
2. **Underwriting exam requirement** — most fully-underwritten term needs labs/paramed. Mark's actual sales are likely all SI/no-exam (Instabrain, MOO TLE, Trans Express, Foresters PlanRight Term). Filter / sort by no-exam where possible.
3. **Conversion rider** — some carriers allow term-to-permanent conversion. Could surface as a small badge.
4. **Term length × max age**: A 30-year term at age 65 may not be issued. Need per-carrier matrix.
5. **Living Benefits / Accelerated Death Benefit** — increasingly common rider. Instabrain leads here. Worth showing.

---

## Suggested execution order for the next session

1. **(15 min) Inventory PDFs Mark gathered.** Confirm presence of all 6 needed ratebooks. If any missing, decide: skip that carrier for v1 OR delay launch.
2. **(40 min) Spot-check the 4 already-wired carriers.** For each (SBLI/Instabrain/MOO/AmAm), run a 35yr M NS $250k 20yr quote in the carrier's portal, compare to what `termLookup()` returns. Document discrepancies.
3. **(60 min) Add the 6 new carriers.** For each: extract Annual Rate Per $1k from PDF, define carrier in `TERM_CARRIERS` array, add `XXX_TERM_RATES` constant inline (or move all to `src/data/term_rates.json` — that file already exists at 368KB and may be a more scalable target).
4. **(40 min) Build the UI.** Replace all 4 "Coming Soon" branches with real form + result rendering. Add health class pills + term length pills.
5. **(15 min) Drop John Hancock, RN, Transamerica from `TERM_CARRIERS`.** Delete their rate constants.
6. **(10 min) Smoke test + push.**

---

## Open product questions for Mark to think about before next session

- **No-exam only or fully-underwritten too?** For Mark's telesales agents, no-exam is likely the only product mix that matters. If yes, set this as a hard filter and skip building Pref Plus / Std Plus UI complexity.
- **Term + FE combined quote?** Some clients buy a permanent floor + term layer. A "combined" view shows both. Out of scope for v1?
- **Living benefits as a column?** Worth surfacing if Instabrain (and any others) include them — it's a sales differentiator.
- **Face-amount band on the slider** — what's the actual range agents quote? $50k? $250k? $500k? Adjust slider range and step accordingly.

---

## Files to read first in the next session

1. This doc.
2. [src/App.jsx](src/App.jsx) around line 800-1050 — TERM_CARRIERS scaffolding + inline rate tables.
3. [src/App.jsx](src/App.jsx) around line 2160-2210 — `termResults` quoter logic.
4. [src/data/term_rates.json](src/data/term_rates.json) — 368KB file that may already have term rates the inline tables don't.
5. [src/data/fex_rates.json](src/data/fex_rates.json) — final-expense rate format reference (term should probably mirror this shape).

---

## Starter prompt to paste into a fresh Claude Code session

```
I'm picking up the Term Life build for QuoteMark. Read TERM_LIFE_HANDOFF.md
in the repo root — that's your full brief, written for you to land cold.

My goal: ship the Term Life tab live with 10 carriers within 2 hours.
The 10 carriers are listed in the doc; 4 already have rates wired, 6 are
new. The UI shows "Coming Soon" in 4 places that need to be replaced.

Before you write any code: confirm with me which ratebook PDFs I have on
disk (check ~/Downloads/ for files matching the 6 new carriers). Then
propose an execution order and we'll roll.

Don't trust the inline rate tables blindly — the FE audit found one carrier
where 200/200 cells were wrong because of a bad ITK scrape. Spot-check
before shipping.
```
