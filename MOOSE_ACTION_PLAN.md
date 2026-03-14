# MOOSE — QuoteMark Expansion Action Plan
**From:** Claude (primary architect session)  
**To:** Moose (execution agent on Mac Mini)  
**Date:** March 2026

---

## Step 0 — Get the Code on Your Machine

```bash
git clone https://github.com/markduse/quotemark.git /home/claude/testbuild
cd /home/claude/testbuild
npm install
```

Then confirm you can build:
```bash
npm run build
# Should say: ✓ built in ~3s
```

Every push to `main` auto-deploys to https://quotemarko.netlify.app via Netlify.

---

## Current Inventory vs. Mark's Wishlist

### FE CARRIERS — Mark's requested list mapped to code status:

| Carrier | Code ID | Status | Action |
|---------|---------|--------|--------|
| Lifeshield | `ls` | Coded, disabled | Enable when contracting confirmed |
| Aflac | `afl` | Coded, disabled | Enable when contracting confirmed |
| Corebridge Financial | `cbg` | **LIVE — GI only** | SIWL rates needed to unlock tiers B/C |
| Royal Arcanum | `ra` | Coded, disabled | Enable when contracting confirmed |
| Transamerica (Express) | — | Not in code | Add as separate product from Immediate Solution |
| Baltimore Life | — | Not in code | Needs rate book + code |
| Elco Mutual | — | Not in code | Needs rate book + code |
| KSKJ Life | — | Not in code | Needs rate book + code |
| Senior Life Insurance Co | — | Not in code | Needs rate book + code |

### TERM CARRIERS — Mark's requested list (NONE in code yet):

| Carrier | Notes |
|---------|-------|
| American Amicable | Has term product alongside Senior Choice |
| Americo | Eagle Select term |
| John Hancock | Vitality term — exam requirements vary |
| Mutual of Omaha | Term Life Express (TLE) — **rates already in the JSON file Mark sent** |
| Royal Neighbors | Has term product |
| Transamerica | Trendsetter term series |
| United Home Life | Term product |
| Foresters | ForeCare / Advantage Plus term |
| Fidelity Life (Instabrain) | RAPIDecision term |
| Kansas City Life | Worksite term |
| SBLI (EasyTrak) | Simplified issue term, no-exam |

---

## Data Strategy — InsuranceToolkit

**Mark's login to insurancetoolkit.com is the best single source.** Here's the approach:

1. Open Chrome → navigate to insurancetoolkit.com
2. Log in with Mark's credentials (ask Mark for these — do NOT hardcode anywhere)
3. Navigate to their rate comparison / quoting tools
4. For each carrier, pull rate tables by running quotes at key age/face combos
5. Record the premiums, reverse-engineer the per-1000 rate and fee

**What to extract per carrier (minimum viable dataset):**
- Ages: 50, 55, 60, 65, 70, 75, 80 (extrapolate rest)
- Gender: Male + Female
- Tobacco: Non-tobacco + Tobacco
- Face amounts: $5k, $10k, $15k, $20k, $25k (enough to derive formula)

**Secondary sources** (if InsuranceTookit doesn't have it):
- Carrier agent portals (many have public rate calculators pre-login)
- Agent-facing PDFs on carrier websites: search `site:[carrier].com "rate table" filetype:pdf`
- NAIC filings (public record): search `NAIC "[carrier name]" rate filing`

---

## Term Quoter Architecture (New Feature)

The term quoter is a **separate tab/mode** within QuoteMark — not a new app.

### UI concept:
- Add "TERM" toggle next to "FINAL EXPENSE" at the top of the sidebar
- Term-specific inputs: coverage amount ($25k–$500k), term length (10/15/20/25/30yr), health class
- Term has different UW classes: Preferred Plus / Preferred / Standard Plus / Standard / Table ratings
- Results show: monthly premium, annual premium, coverage expires date

### Key difference from FE:
- FE = simplified issue, 2-3 health questions max
- Term = full underwriting with health classes
- No-exam limit varies by carrier (typically $100k–$500k depending on age/carrier)

### Medical Exam Requirements by Carrier (for briefing doc):

| Carrier | No-Exam Limit | Blood/Urine Required | Notes |
|---------|--------------|---------------------|-------|
| Mutual of Omaha TLE | $300k | No | Express underwriting, no fluids |
| SBLI EasyTrak | $500k (age ≤50) / $350k (51-60) | No | Simplified issue |
| Foresters | $400k (age ≤50) / $250k (51+) | No | No-exam up to these limits |
| Fidelity/Instabrain | $150k | No | RAPIDecision — quick approval |
| Transamerica | $1M (age ≤40) / $500k (41-50) / $250k (51+) | No exam under limits | Blood/urine required above limits |
| John Hancock | $500k (Vitality Plus) | No (under limit) | Blood/urine above $1M |
| Americo | $100k simplified / full UW above | No (simplified tier) | |
| American Amicable | $100k | No | |
| Kansas City Life | $250k (age ≤45) | No | EKG required at 51+ |
| Royal Neighbors | $150k | No | |
| UHL | $100k | No | |

**General rule of thumb to display in app:**
- Under $100k, age ≤55: Almost always no-exam across carriers
- $100k–$500k: Carrier-dependent, typically accelerated underwriting (APS review, no fluids)
- Over $500k: Paramed exam (height/weight, blood, urine) typically required
- Over $1M: Full paramed + EKG, sometimes treadmill

---

## Execution Order (Recommended)

### Phase 1 — Quick Wins (1-2 days)
1. **Mutual of Omaha Term** — Mark is sending you the MOO JSON directly. It includes full TLE term data (`term.10_year`, `term.15_year`, `term.20_year`, `term.30_year`). Extract it and build the term tab. This is the fastest path to a working term quoter since the data is already structured.
2. **Corebridge SIWL** — Corebridge is live but ONLY has GI (Tier E). Tiers B/C return null because the SIWL rate table is missing. Pull SIWL rates from InsuranceTookit or the AIG/Corebridge agent portal and add them. This unlocks Corebridge for the majority of healthy clients who currently see nothing from them.
3. **Enable ls, afl, ra** — One-line change each once Mark confirms contracting. Just flip `enabled: false` → `enabled: true` and build.

### Phase 2 — FE Rate Books (2-4 days)
For each: scrape InsuranceTookit or agent portal → extract → code → verify → push.
Priority order: Baltimore Life → Senior Life → Elco Mutual → KSKJ → TA Express

### Phase 3 — Term Quoter Build (1 week)
1. Build term tab UI (sidebar toggle FE/TERM)
2. Add MOO TLE rates (already have data)
3. Add SBLI EasyTrak rates
4. Add Foresters term rates
5. Add Fidelity term rates
6. Continue adding carriers

### Phase 4 — UX (ongoing)
- PDF export button on results
- Exam requirements info tooltip per carrier
- Admin dashboard

---

## How to Code a Term Carrier

Term rates are per-$1,000 per month for a given term length, age, health class, and gender.

Example structure to add to App.jsx:
```js
// MOO Term Life Express — 20yr — Non-Tobacco Male
// Rate per $1,000/month
const MOO_TERM_20_MN = {
  18: 0.065, 19: 0.065, 20: 0.066, 25: 0.070, 30: 0.082,
  35: 0.105, 40: 0.152, 45: 0.226, 50: 0.361, 55: 0.540,
  60: 0.855, 65: 1.392, 70: 2.285,
};

// Monthly = rate * face/1000 + flat_fee (if any)
```

Health class mapping to QuoteMark tiers for term:
- B (Preferred) → Preferred or Preferred Plus rates
- C (Standard) → Standard rates  
- D → Table 2-4 / Substandard (apply multiplier)
- E → Decline / GI only (very few term carriers)

---

## Git Discipline

Always branch for big features:
```bash
git checkout -b feature/term-quoter
# ... build ...
git push origin feature/term-quoter
# Then tell Mark to review before merging to main
```

For carrier additions, push directly to main:
```bash
git add -A && git commit -m "feat: Add Baltimore Life FE — ages 50-80, 4 combos"
git push origin main
```

---

## What to Tell Mark When Each Phase Is Done

After each carrier addition:
> "✅ [Carrier] added. Ages [X-Y], [Level/Graded/Both]. Sample check: Male NT 65 $10k = $[amount] (matches rate book)."

After term tab is live:
> "✅ Term quoter live at quotemarko.netlify.app. Currently showing MOO TLE [10/15/20yr]. Toggle between FE and TERM at top of sidebar."

---

## Message for Moose (copy-paste this)

> "Clone from github.com/markduse/quotemark. Here's your Phase 1 order:
> 1. **MOO Term tab** — I'm sending you the MOO JSON. Term data is under `term.10_year`, `term.20_year`, `term.30_year`. Extract it and build a term tab in the sidebar.
> 2. **Corebridge SIWL** — Corebridge is live but ONLY shows GI quotes right now (Tier E only, healthy clients see nothing from it). Pull the SIWL rates from InsuranceTookit and add them so tiers B/C work.
> 3. **Flip disabled carriers** — ls, afl, ra just need `enabled: true` once I confirm contracting.
> Then use my InsuranceTookit login for FE rate scraping: Baltimore Life, Senior Life, Elco Mutual, KSKJ."
