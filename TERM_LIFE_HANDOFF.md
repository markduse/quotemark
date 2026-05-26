# Term Life — Handoff Brief (2026-05-11, updated)

> **Goal: ship a production Term Life quoter inside QuoteMark with 99% rate accuracy.**
> 13 carriers, ~28 products. Mark uses Insurance Toolkits (ITK) as his live tool today —
> ITK is the authoritative source of truth and the strategy below leans on it.

---

## Final carrier + product list (13 carriers, 28 products)

Mirroring Mark's ITK configuration (screenshot 2026-05-11):

| # | Carrier | Products (separate rate tables per product) |
|---|---|---|
| 1 | **American Amicable** | Easy Term, Home Certainty, Home Protector, Pioneer Security, Safecare Term, Survivor Protector, Term Made Simple (**7 products**) |
| 2 | **Americo** | Continuation 10, Continuation 25, HMS, Payment Protector, Payment Protector Continuation (**5 products**) |
| 3 | **Banner Life** | Banner OPTerm — **not yet in ITK screenshot, Mark added it to the list** |
| 4 | **Foresters** | Strong Foundation, Your Term, Your Term Medical (**3 products**) |
| 5 | **Instabrain (Fidelity)** | IB Term, PureTerm (**2 products**) |
| 6 | **John Hancock** | Simple Term with Vitality 2023 |
| 7 | **Kansas City Life** | (single product, name TBD) |
| 8 | **Mutual of Omaha** | Term Life Express |
| 9 | **National Life Group** | LSW Level Term |
| 10 | **Protective** | Classic Choice Term |
| 11 | **Royal Neighbors** | Jet Term |
| 12 | **SBLI** | EasyTrak |
| 13 | **Transamerica** | Trendsetter LB 2017, Trendsetter Super 2021 (**2 products**) |
| ( ) | UHL (Simple Term) | Visible in ITK but Mark's 13-list doesn't include it — confirm before adding |

**~28 distinct rate tables** to source and maintain. Each table is age × gender × tobacco × term length × face × health class.

## Carriers to DROP from current code

Current `TERM_CARRIERS` array in [src/App.jsx:982](src/App.jsx#L982) has 7 entries. Mark's new list overlaps with most of them, but inline rate constants are sparse ITK scrapes from 2026-03 — they should be REPLACED, not kept. See "Data strategy" below.

---

## The strategy: lean on ITK, don't rebuild from PDFs

### Why

PDFs are point-in-time and inconsistent (different formulas per carrier, different face brackets per product). ITK has:

- **All 13 carriers** already aggregated
- **Live, current rates** (continuously updated by ITK)
- **Standardized API/data model** across carriers
- **Multiple products per carrier** already separated and labeled
- **Mark already pays for ITK** — he has authenticated access at https://app.insurancetoolkits.com

### Strategy A — ITK CSV export (preferred if available)

ITK offers data exports for paying subscribers. Mark should check his ITK account for:
- **Term rate exports** — CSV or Excel of all enabled carrier/product rates by (age, gender, tobacco, term length, face, health class)
- **API access** — if his plan includes it, document the API key

If available: this is the fastest path. Import → reshape → ship.

### Strategy B — Authenticated scrape (fallback)

If ITK doesn't expose exports on Mark's plan:
- Use Mark's authenticated session in Chrome (Claude in Chrome MCP can drive)
- Iterate through every (carrier, product, age, gender, tobacco, term, face) combination
- Capture the rate, cache to JSON
- Run nightly or on-demand to keep current

This is the same pattern as the 2026-03-19 scrape that produced `quotemark_FEX_*.csv` files in `~/Downloads/quotemark-files/`. The script that did this is somewhere — find it via git history search.

### Strategy C — Per-carrier PDF rebuild (slowest, last resort)

Only fall back to this for carriers where ITK is unavailable or known-wrong. We used this pattern for FE (UHL/Continental/Accendo/Fidelity) — proven but slow.

---

## Data model

Each term product is a separate table. Suggested JSON structure (mirrors what fex_rates.json does for FE):

```json
{
  "American Amicable||Easy Term": {
    "10": {                              // term length in years
      "MNS_PrefPlus": {                  // class: MNS|MS|FNS|FS combined with health
        "18": { "100000": 12.34, "250000": 18.50, "500000": 30.10 },
        ...
      },
      "MNS_Pref":  { ... },
      "MNS_StdPlus": { ... },
      "MNS_Std":   { ... },
      "MS_Std":    { ... },              // smokers usually only have Pref/Std tobacco tiers
      "MS_PrefT":  { ... },
      "FNS_PrefPlus": { ... },
      ...
    },
    "15": {...},  "20": {...},  "30": {...}
  },
  ...
}
```

Store as `src/data/term_rates.json` (file already exists at 368KB — may already be partly populated).

---

## UI build plan

The Term tab currently shows "Coming Soon" in 4 places in App.jsx. Need to replace with:

### Form (left sidebar when Term tab active)

| Field | Type | Notes |
|---|---|---|
| Age (DOB or direct) | reuse FE field | |
| Gender | reuse FE field | |
| Tobacco | reuse FE field | |
| State | reuse FE field | filters carriers by license |
| **Face amount** | new slider, range $50k – $1M | step $25k or $50k |
| **Term length** | pill selector | 10 / 15 / 20 / 30 |
| **Health class** | pill selector | Pref+ / Pref / Std+ / Std (auto-detect from conditions same as FE does) |

### Results

- One row per (carrier, product) — so American Amicable shows 7 rows when all products quote
- Same list layout / hover behavior as FE
- Per-row badges: "No exam", "Living benefits", "Convertible" (if data available)
- Sort by monthly premium ascending (default) — agent's whole job is "show me the cheapest that fits"

### Filters (top of results pane)

- **No-exam only** toggle (most FE agents want this)
- **Hide non-convertible** toggle (some clients want to convert later)
- **Hide tobacco-only carriers** — automatic from gender/tobacco inputs

---

## Quality bar: 99% accuracy

For each product, sample 5 quotes vs ITK's live calculator before declaring done:
- Age 30 / NS / $250k / 20yr / Pref+
- Age 45 / NS / $250k / 20yr / Std
- Age 55 / S / $100k / 15yr / Pref Tobacco
- Age 65 / NS / $50k / 10yr / Std
- Age 35 / NS / $500k / 30yr / Pref

If 5/5 match within $0.10 across all products, ship the carrier. If any fail, investigate (likely a column misalignment or health-class mapping issue) and rebuild.

---

## Open questions for Mark before the new session starts

1. **Do you have ITK exports / API access?** Check your ITK account billing/plan page. If yes → Strategy A. If no → Strategy B (scrape via Claude in Chrome with your login).

2. **Banner Life** — which product? (Banner has Banner OPTerm + a few others; clarify in session.)

3. **Kansas City Life term product name?** ITK didn't show it expanded.

4. **All 7 American Amicable products needed, or only a subset?** Some are essentially the same product with different names (Easy Term vs Term Made Simple). Trim where possible to reduce data volume.

5. **No-exam priority** — should non-exam products appear FIRST in results regardless of price? Or is "cheapest first" always the right answer?

6. **State licensing data** — every term carrier has different state exclusions. Where does state availability per (carrier, product) come from? ITK exposes it; we'd inherit.

---

## Suggested execution order

| Phase | Time | What |
|---|---|---|
| Discovery | 30 min | Confirm Mark's ITK access level + answer open questions |
| Data | 90 min | Pull ITK data for all 13 carriers / 28 products via Strategy A or B |
| Schema | 15 min | Reshape into `term_rates.json` |
| Wire | 30 min | Update `TERM_CARRIERS` array to match 28 products, add `termPrem()` lookup function |
| UI | 90 min | Replace 4 "Coming Soon" branches, add term form, add result rendering |
| Verify | 60 min | 5-quote spot-check per carrier (13 × 5 = 65 quotes against ITK) |
| Ship | 15 min | Commit + push |

**Total realistic estimate: 5-6 hours.** This is bigger than 2 hours. Be honest with Mark about that up front.

---

## Files to read first in the next session

1. This doc.
2. [src/App.jsx](src/App.jsx) lines 800-1050 — TERM_CARRIERS scaffolding + inline rates to remove.
3. [src/App.jsx](src/App.jsx) lines 2160-2210 — `termResults` quoter logic.
4. [src/data/term_rates.json](src/data/term_rates.json) — may already be partially populated, 368KB.
5. [src/data/fex_rates.json](src/data/fex_rates.json) — shape reference for the term JSON.

---

## Starter prompt for fresh Claude Code session

```
I'm picking up the Term Life build for QuoteMark. Read TERM_LIFE_HANDOFF.md
in the repo root — full brief is there.

My target: production term quoter, 99% accuracy, 13 carriers, ~28 products,
shipped live within one focused session.

I use Insurance Toolkits (ITK) as my live tool — I have a paid subscription
at app.insurancetoolkits.com. ITK is the source of truth. Before any
coding, walk me through:
1. Confirming which ITK access level I have (export? API? scrape-only?)
2. Pulling the data for my 13 carriers
3. Sampling 5 quotes per carrier to verify accuracy

Then build the UI and ship. Don't trust the existing inline rate tables
in App.jsx — they're a sparse ITK scrape from 2 months ago and may be
wrong (the FE audit found one product with 200/200 cells incorrect from
an earlier bad scrape).

Realistic timeline is probably 5-6 hours, not 2. Confirm that with me
up front so we're on the same page.
```
