# QuoteMark — Session Handoff Summary
**Paste this at the start of a new Claude chat to resume where we left off.**

---

## What Is QuoteMark
React/Vite insurance quoting SaaS for final expense telesales agents.
- **Live:** https://quotemarko.netlify.app
- **GitHub:** https://github.com/markduse/quotemark
- **Stack:** React + Vite → Netlify auto-deploy on push to `main`
- **Auth:** Supabase | **Payments:** Stripe $5/mo
- **Main file:** `src/App.jsx` (~3,600 lines)
- **Build:** `cd /home/claude/testbuild && npm run build && git add -A && git commit -m "..." && git push origin main`

---

## Active Carriers (enabled: true) — 11 Total
| ID | Name | Product | Ages | Face Cap | Tiers |
|----|------|---------|------|----------|-------|
| acc | Accendo/CVS | Final Expense | 50–89 | $40k | B/C/D/E |
| ahl | American Home Life | Patriot Series | 50–89 | $35k | B/C/D/E |
| cont | Continental Life (Aetna) | Protection Series FE | 50–89 | $40k | B/C/D/E |
| rn | Royal Neighbors | Ensure Legacy FE | 50–85 | $40k | B/C/D/E |
| moo | Mutual of Omaha | Living Promise | 45–85 | $50k level / $25k graded | B/C=Level, D=Graded |
| ta | Transamerica | Immediate Solution | 45–85 | $100k | B/C |
| for | Foresters | PlanRight WL | 50–85 | $35k pref / $20k std | B/C/D |
| fid | Fidelity Life | RAPIDecision FE/GI | 45–85 | $40k | B/C/D/E |
| cbg | Corebridge Financial | GIWL only | 50–80 | $25k | E only ← SIWL still missing |
| amam | American Amicable | Senior Choice | 50–85 | $50k | B/C/D |
| bl_sg | Baltimore Life | Silver Guard | 50–80 | $25k level / $15k graded | B/C=SGI, D=SGII |

---

## UW Tier System
| Tier | Label | Meaning |
|------|-------|---------|
| B | Level — Preferred | Clean health, day-1 full benefit |
| C | Level — Standard | Minor conditions, day-1 full benefit |
| D | Modified/Graded | 2–3yr waiting period |
| E | GI Only | Guaranteed issue, knockout conditions |

---

## Rate Formula Reference
- **Per-1000 carriers:** `monthly = (rate_per_1000 × face/1000 + fee) × modal_factor`
- **Baltimore Life:** `(rate × face/1000 + 60) × 0.09`
- **MOO:** direct premium lookup table with linear interpolation between face breakpoints

---

## Disabled Carriers (coded, not live)
`laf`, `afl`, `amr`, `uhl`, `lb`, `ra`, `ls`, `pf`, `bl` — flip `enabled:true` when contracting confirmed

---

## Term Quoter (Moose built, rates need correction)
- FEX/Term toggle exists in UI (`quoteMode` state: `'fe'` | `'term'`)
- 7 term carriers in code: SBLI, Transamerica, Instabrain, MOO, Royal Neighbors, American Amicable, John Hancock
- **Problem:** rates were scraped at $100k then linearly scaled — term doesn't scale linearly
- **Problem:** only tobacco/non-tobacco, missing Preferred Plus / Preferred / Standard health classes
- **Status:** deprioritized — focus on FE additions first

---

## What We Were Just Doing
**Adding Senior Life Insurance Company** to the FE quoter.

### Senior Life product structure:
- **Payment types:** EI (Entire Issue / Life Pay) ✅ USE THIS | 20-Pay ❌ Skip
- **Health classes to include:**
  - ~~Ultra Preferred~~ — Skip
  - **Super Preferred → Tier B**
  - ~~Preferred~~ — Skip (use S Pref as Tier B)
  - **Standard → Tier C**
  - **Modified → Tier D** (graded benefit)
  - **GI → Tier E** (guaranteed issue)
- **Rate format:** Direct monthly premiums, policy fee already included, face amounts in $500–$1k increments
- **Extraction plan:** Pull breakpoints at $2k, $5k, $10k, $15k, $20k, $25k, $30k per age — interpolate between them
- **Age range:** Confirm from PDF (likely 0–85, we only need ~45–85)

### Action: Attach the Senior Life rate PDF and extract:
1. For each age 45–85: pull Super Preferred, Standard, Modified, GI rates at $2k/$5k/$10k/$15k/$20k/$25k/$30k face
2. Male + Female separately
3. Tobacco + Non-tobacco (if Senior Life has separate tobacco rates)
4. Build lookup tables + carrier entry in App.jsx
5. Build and push

---

## Next Priority After Senior Life
1. Corebridge SIWL — healthy clients see blank card, need Level/Standard rate tables
2. Elco Mutual FE
3. KSKJ Life FE
4. Fix term rate data (needs proper health classes + multi-face scrape from ITK)

---

## Moose (Mac Mini Agent) Status
- Has the repo cloned
- Has scraping instructions in `data/MOOSE_SCRAPING_INSTRUCTIONS.md`
- Node.js permission issues on Mac — **do not use for builds**
- Best used for: rate book PDF hunting, ITK data scraping (not builds)
- ITK scraping was taking too long — paused

---

## Key Files in Repo
```
src/App.jsx                          ← everything
data/moo_rates.json                  ← MOO full rate JSON
data/MOOSE_SCRAPING_INSTRUCTIONS.md  ← ITK scraping guide for Moose
data/term_rates_raw/                 ← where Moose drops scraped JSON
MOOSE_BRIEFING.md                    ← full codebase context for Moose
MOOSE_ACTION_PLAN.md                 ← execution order
```
