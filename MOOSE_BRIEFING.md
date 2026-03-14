# MOOSE — QuoteMark Agent Briefing
**Last updated:** March 2026  
**Your handler:** Mark (MPD Investment Group / Pinnacle Life Agency)  
**Your job on this project:** Continuously improve QuoteMark — a telesales final expense quoting SaaS.

---

## What Is QuoteMark?

A React/Vite web app that lets insurance agents instantly quote multiple final expense carriers side-by-side. Agents enter client info (age, gender, state, tobacco, health), select a face amount or budget, and get sorted real-time quotes with e-App links.

**Live URL:** https://quotemarko.netlify.app  
**GitHub:** https://github.com/markduse/quotemark  
**Stack:** React + Vite → Netlify (auto-deploy on push to `main`)  
**Auth/Payments:** Supabase + Stripe ($5/mo subscription)  
**Main file:** `/home/claude/testbuild/src/App.jsx` (~2,550 lines)

---

## Your Workflow

```
1. Pull latest code → git pull origin main
2. Read App.jsx to understand current state
3. Make targeted edits (Python string replacement scripts work best)
4. npm run build — must succeed with zero errors
5. git add -A && git commit -m "..." && git push origin main
6. Netlify auto-deploys in ~60 seconds
```

**Working directory:** `/home/claude/testbuild/`

---

## Current Carrier Status

### ✅ LIVE (enabled: true) — 10 carriers
| ID | Name | Product | Age Range | Face Cap |
|----|------|---------|-----------|----------|
| acc | Accendo / CVS Health | Final Expense | 50–89 | $40k |
| ahl | American Home Life | Patriot Series Tiered FE | 50–89 | $35k |
| cont | Continental Life (Aetna) | Protection Series FE | 50–89 | $40k |
| rn | Royal Neighbors | Ensure Legacy FE (Standard) | 50–85 | $40k |
| moo | Mutual of Omaha | Living Promise | 45–85 | $50k level / $25k graded |
| ta | Transamerica | Immediate Solution | 45–85 | $100k |
| for | Foresters Financial | PlanRight Whole Life | 50–85 | $35k preferred / $20k standard |
| fid | Fidelity Life | RAPIDecision FE / GI | 45–85 | $40k |
| cbg | Corebridge Financial | SIWL / GIWL | 50–80 | $25k |
| amam | American Amicable | Senior Choice | 50–85 | $50k |

### 🔴 IN CODE, DISABLED (rate tables exist, need contracting to enable)
- `laf` — Lafayette Life
- `afl` — Aflac  
- `amr` — Americo (Eagle Select)
- `uhl` — United Home Life
- `lb` — Liberty Bankers (SIMPL Whole Life)
- `ra` — Royal Arcanum
- `ls` — Lifeshield
- `pf` — Polish Falcons
- `bl` — Better Life

### ⬜ NOT IN CODE YET (priority additions)
- Settlers Life
- Security Plan Life (SPLIC)
- Columbian Life
- Baltimore Life
- Great Western Life
- Gerber Life GI
- TruStage / CUNA Mutual GI

---

## Rate Formula Reference

**Per-1000 carriers (csvLookup):**
```
Monthly = (rate_per_1000 × face/1000 + fee) × modal_factor
```
- Foresters: `(rate × face/1000 + 36) × 0.0875`
- Fidelity: `(rate × face/1000 + 85) × 0.087`
- Transamerica: `(rate × face/1000 + 42) × 0.086`
- Corebridge: `(rate × face/1000 + 24) × 0.0834`
- American Amicable: `(rate × face/1000 + 30) × 0.088`

**Direct lookup carriers (mooLookup — interpolate between face breakpoints):**
- Mutual of Omaha: premiums published at $2k/$5k/$10k/$15k... intervals, linear interpolation

**Original 4 carriers** (acc, ahl, cont, rn) have their own hardcoded rate logic in App.jsx.

---

## UW Tier Mapping

| QuoteMark Tier | Label | Meaning |
|---|---|---|
| B | Level — Preferred | Clean health, day-1 benefit |
| C | Level — Standard | Minor conditions, day-1 benefit |
| D | Modified / Graded | 2-3yr waiting period |
| E | GI Only | Knockout conditions, guaranteed issue |

Each carrier's `fn()` maps these tiers to appropriate rate tables or returns `null` if unavailable.

---

## How to Add a New Carrier (Step-by-Step)

1. **Find the rate book** — search `"[carrier name] final expense rate book" filetype:pdf` or check their agent portal. You want a PDF or spreadsheet with per-$1,000 rates by age/gender/tobacco.

2. **Extract the rates** — build a JS rate table in the same format as existing ones. For per-1000 tables use `csvLookup` format: `{age:[[male_nt, modal],[male_tb, modal],[female_nt, modal],[female_tb, modal]], ...}`. For direct premium tables use `mooLookup` format.

3. **Determine the formula** — find the cert fee and modal factor from the rate book. Verify with an example calculation from the book.

4. **Add to App.jsx:**
   - Rate table constants near top (line ~200 area)
   - `FACE_CAPS` entry
   - `AGE_MAX` entry  
   - `CARRIER_META` entry with logo path, eapp URL, brand color
   - Carrier object in the `carriers` array with `fn()`

5. **Enable:** set `enabled: true`

6. **Build and verify** one sample quote matches the rate book exactly.

---

## Key Design Tokens

```js
// Dark mode (default)
bg0:'#020617'  bg3:'#1E293B'  t0:'#F8FAFC'  gold:'#F59E0B'  blue:'#38BDF8'

// Light mode
bg0:'#F8FAFC'  bg2:'#FFFFFF'  t0:'#0F172A'  gold:'#F59E0B'  blue:'#2563EB'
```

UW tier colors: B=`#A78BFA` (purple) / C=`#22C55E` (green) / D=`#EAB308` (yellow) / E=`#EF4444` (red)

---

## Supabase Info
- Project: `eovceosqjkqyklkjqqxd`
- URL: `https://eovceosqjkqyklkjqqxd.supabase.co`
- profiles table columns: `id, email, subscription_status, stripe_customer_id, carrier_prefs, display_name, dark_mode`
- Owner bypass: set `subscription_status = 'active'` manually for any user

---

## Immediate Task Queue for Moose

### Priority 1 — Rate Books (use web search + scraping)
Search for and download rate books for these carriers, extract rates, and add them to App.jsx:

1. **Settlers Life** — FE whole life, ages 0-80, search: `"Settlers Life" "final expense" "rate table" agent`
2. **Security Plan Life (SPLIC)** — Louisiana-based FE carrier
3. **Columbian Life** — FE product
4. **Baltimore Life** — Golden Goal FE
5. **Great Western Life** — FE whole life
6. **TruStage (CUNA Mutual)** — GI whole life, ages 45-80, $1k-$20k face

For each: find rate table → extract → build JS table → add to App.jsx → enable.

### Priority 2 — Enable Disabled Carriers
Once Mark confirms contracting is obtained, flip `enabled: false` → `enabled: true` for:
- `uhl` (United Home Life) — rate tables already in code
- `amr` (Americo) — rate tables already in code
- `lb` (Liberty Bankers) — rate tables already in code

### Priority 3 — UX Improvements
- Add PDF quote export (print-friendly card layout, carrier comparison table)
- Add state availability filters per carrier (some carriers exclude certain states)
- Add an admin view: see all Supabase subscribers, subscription status, last login
- Mobile PWA manifest + apple-touch-icon

### Priority 4 — Rate Accuracy Audit
For each enabled carrier, pull a sample quote from their agent portal or illustration software and verify QuoteMark matches within $0.05. Log any discrepancies.

---

## File Structure
```
/home/claude/testbuild/
├── src/
│   └── App.jsx          ← MAIN FILE (all UI + rate logic)
│   └── AuthContext.jsx  ← Supabase auth
│   └── AuthScreen.jsx   ← Login/signup UI
│   └── PaywallScreen.jsx← Stripe paywall
│   └── supabase.js      ← Supabase client
├── netlify/functions/
│   ├── create-checkout-session.js
│   ├── stripe-webhook.js
│   └── contact.js
├── public/
│   ├── logos/           ← carrier logo PNGs
│   └── favicon.svg
└── index.html
```

---

## Git Commit Style
```
feat: Add [Carrier Name] — [product], ages X-Y, [N] combos
fix: [what was wrong] for [carrier/feature]
ui: [what changed]
```

---

## Notes for Moose
- Always `npm run build` before committing. Never push broken code.
- When in doubt about a rate, be conservative — return `null` rather than guess.
- The `csvLookup` function handles the 4-combo indexing: `[male_nt, male_tb, female_nt, female_tb]`
- App.jsx is one file — no separate components. Keep it that way for now.
- Mark uses dark mode by default. Test both modes when making UI changes.
- The `openCat` state variable is unused (legacy accordion) — ignore it.
- Python string-replacement scripts are the most reliable way to edit App.jsx at scale.
