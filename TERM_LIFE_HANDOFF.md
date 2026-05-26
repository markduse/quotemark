# Term Life — Handoff Brief (2026-05-26, DATA SHIPPED)

> **Data foundation is live.** `src/data/term_rates.json` has rates for all 13
> carriers / 27 products (14,752 face-cells, ~20k raw quotes from ITK).
> **Next session's job: build the UI** to consume this data + ship live.
> Estimated time: 2-3 focused hours.

---

## ✅ What's done

- **Scraped ITK rates** for all 13 carriers via authenticated API
  (`POST https://api.insurancetoolkits.com/quoter/`). Methodology preserved
  in `scripts/itk_term_scrape.md` — re-runnable when rates need refresh.
- **`src/data/term_rates.json`** populated with the nested shape:
  ```
  product → term → tier → class → age → face → monthly_premium
  ```
  Example: `data["Mutual of Omaha (Term Life Express)"]["20"]["Approved"]["MNS"]["55"]["250000"]` → monthly rate.
- **All 27 products captured** (13 carriers, multiple products each):

  | Carrier | Products | Tiers |
  |---|---|---|
  | American Amicable | 7 (Easy/Home Certainty/Home Protector/Pioneer Security/Safecare/Survivor Protector/Term Made Simple) | 1-2 each |
  | Americo | 5 (Continuation 10, 25, HMS, Payment Protector, Payment Protector Continuation) | 1 each |
  | Foresters | 3 (Strong Foundation, Your Term, Your Term Medical) | "Approved" |
  | InstaBrain | 2 (IB Term, PureTerm) | 4 tiers: Pref+/Pref/Std/Std Extra |
  | John Hancock | 1 (Simple Term with Vitality 2023) | Pref/Std/Select |
  | Kansas City Life | 1 | "Approved" |
  | Mutual of Omaha | 1 (Term Life Express) | "Approved" |
  | National Life Group | 1 (LSW Level Term) | Standard |
  | Protective | 1 (Classic Choice Term) | Ultimate Pref/Super Pref/Level/Std |
  | Royal Neighbors | 1 (Jet Term) | Pref/Std |
  | SBLI | 1 (EasyTrak) | Pref+/Select/Std |
  | Transamerica | 2 (Trendsetter LB 2017, Trendsetter Super 2021) | 1 each |
  | UHL | 1 (Simple Term) | Simple Term / Simple Term Deluxe |

  Banner Life is the only carrier from Mark's list that didn't appear — not in
  his current ITK portfolio. Skip for v1.

- **Data dimensions captured:**
  - Sexes: Male, Female (2)
  - Tobaccos: None, Cigarettes (2)
  - Terms: 10, 15, 20, 25, 30, 35, 40 (7 — not every carrier offers all)
  - Ages: 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75 (11 anchor ages — interpolate between)
  - Faces: $50k, $100k, $250k, $500k, $1M (5 anchor faces — interpolate between)
  - State: MI baseline (state-availability is separate from rates for term)

## 🔲 What's NOT done — for the next session

### 1. Lookup function

Add a helper near `src/data/term_rates.json` or inline in App.jsx:

```js
import TERM_RATES from './data/term_rates.json';

function termPrem(product, term, tier, classKey, age, face) {
  const tbl = TERM_RATES?.[product]?.[String(term)]?.[tier]?.[classKey];
  if (!tbl) return null;
  const ages = Object.keys(tbl).map(Number).sort((a,b)=>a-b);
  const faces = (a) => Object.keys(tbl[String(a)] || {}).map(Number).sort((a,b)=>a-b);
  // Bilinear interpolation between bracketing (age, face) anchors
  // ... (write it, ~30 lines)
}
```

### 2. Replace inline TERM_RATES constants

In `src/App.jsx` lines 839-845, delete these 7 constants:
- `AMERICAN_AMICABLE_TERM_RATES`, `INSTABRAIN_TERM_RATES`, `JOHN_HANCOCK_TERM_RATES`,
  `MUTUAL_OF_OMAHA_TERM_RATES`, `SBLI_TERM_RATES`, `ROYAL_NEIGHBORS_TERM_RATES`,
  `TRANSAMERICA_TERM_RATES`

They're sparse ITK scrapes from March that the new term_rates.json replaces.

### 3. Rebuild `TERM_CARRIERS` array

Auto-generate from `Object.keys(TERM_RATES)` so we get all 27 products without
hand-coding each one. Each entry should expose:
- `id` (slug from product key)
- `name` (display name)
- `sub` (term-specific subtitle, e.g. "Express Issue")
- `fn(age, male, smoker, term, face)` → calls termPrem with mapped tier(s)

For carriers with multiple tiers per product (InstaBrain, Protective, etc),
return the BEST-tier rate the client qualifies for. v1 doesn't need a tier
selector — just show what ITK's default underwriting returns.

### 4. Replace 4 "Coming Soon" branches in App.jsx

Search for `Coming Soon` — there are 4 places:
- App.jsx:2575 (desktop empty state)
- App.jsx:2671 (mobile term results)
- App.jsx:3453 (desktop empty alt)
- App.jsx:3557 (desktop large empty)

Replace with the term results view. Reuse the FE list-row layout pattern (it's
already battle-tested with hover states, brand colors, e-App buttons).

### 5. Build the term form

Term tab needs a slightly different form than FE:
- Reuse: age, gender, tobacco, state
- New: **face slider $50k–$1M** with $25k step (different range from FE's $2k-$100k)
- New: **term length pills** (10/15/20/25/30/35/40)

State variables already exist at App.jsx:1932-1935:
```js
const [termLength,setTermLength] = useState('10');
const [termFace,setTermFace] = useState(100000);
const [termHealth,setTermHealth] = useState('pp');
const [termAge,setTermAge] = useState('');
```

Just wire to UI.

### 6. Verify quality bar (5-quote sanity check per product)

Pick 5 random quotes from `term_rates.json`. Compare app's `termPrem()` result
to the JSON value. Must match exactly (no interpolation gaps since these are
anchor points).

Then pick 5 OFF-anchor points (e.g. age 33, face $175k) and verify the
interpolated value is reasonable (between bracketing anchors).

## Suggested next-session order (2-3 hours)

1. **(20 min)** Read this doc + skim `term_rates.json` to see the data shape
2. **(30 min)** Write `termPrem()` with bilinear interpolation
3. **(15 min)** Delete inline constants, regenerate TERM_CARRIERS
4. **(60 min)** Replace Coming Soon with actual rendering — reuse FE list-row component
5. **(30 min)** Wire term-specific form fields (face slider range, term length pills)
6. **(15 min)** Spot-check 5 quotes vs ITK
7. **(10 min)** Commit + push, watch Netlify deploy

## Starter prompt for next session

```
Picking up the Term Life UI build for QuoteMark. Read TERM_LIFE_HANDOFF.md
in the repo root — the data foundation is shipped (src/data/term_rates.json,
27 products, 14,752 face-cells from ITK).

My job this session: build the UI that consumes that data. Specifically:

1. Write termPrem() bilinear interpolation helper
2. Auto-generate TERM_CARRIERS array from term_rates.json keys
3. Delete the 7 inline TERM_RATES constants from App.jsx (lines 839-845)
4. Replace the 4 "Coming Soon" branches with actual term result rendering
   (reuse the FE list-row component pattern)
5. Wire the term form: term length pills, face slider $50k-$1M
6. Spot-check 5 quotes against the raw scrape, commit + push

The FE side already has the polished list-row layout I want to mirror.
Reuse don't rebuild.

Realistic estimate: 2-3 focused hours.
```

## Files added this session

- `src/data/term_rates.json` (262KB, the rates)
- `scripts/itk_term_scrape.md` (methodology + how to re-run)
- `scripts/itk_term_raw.json` (5MB raw scrape; gitignored)
- `.gitignore` updated to exclude scripts/itk_term_raw.json

## Files unchanged (intentional)

- `src/App.jsx` — UI work deferred to focused next session
- `IUL_HANDOFF.md` — separate carrier scope, separate session
- `AMERICO_FE_HANDOFF.md` — separate (Americo FE, not term)
