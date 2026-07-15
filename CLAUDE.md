# CLAUDE.md — QuoteMark Project

> This file is read by Claude Code at the start of every session.
> It contains full project context, goals, stack, and known issues.
> Do not delete or move this file.

---

## WHO THIS IS FOR

**QuoteMark** — a multi-product life insurance quoting tool built by:
- **MPD Investment Group LLC** d/b/a QuoteMark
- Owner / lead: Mark Dusevic
- Primary user: telesales agents working final expense + adjacent life products

**Sister agency (separate project)**: Duse Financial Group (DFG) — a final
expense telesales agency in Troy, MI that Mark runs. DFG agents use QuoteMark
as their daily quoting tool. DFG's exam prep app is a *different* repo
(`dfg-exam-prep`, deployed at `studyduse.netlify.app`) — don't confuse them.

The goal: an agent on a live call types client age + a few details and gets
real-time, multi-carrier quotes in under 3 seconds so they can quote, pivot
between products (FE → Term → IUL → CV exit), and close.

---

## WHAT THIS APP IS

**quotemarko.netlify.app** — Currently 4 product tabs sharing one Client Info intake:

| Tab | Products | Ages | What it does |
|---|---|---|---|
| 🏛️ FEX / WL | 73 final expense + whole life products across ~30 carriers | 1–89 | Juvenile WL → young adult WL → senior FE, all one flow. Age-aware UX hides tobacco/health for kids. |
| ⏱️ Term | 28 term life products | 18+ | Term length + face slider; UW class auto-recommended from age/BMI/conditions |
| 📈 IUL | 2 IUL products + spec snapshot for 4 carriers | 18+ | Solve for face *or* premium; cap/par/floor reference cards |
| 💰 Cash Value | CV corridor estimator | 1–89 | Existing policy → estimated current cash value (low/high band) |

Shared concepts across all 4 tabs:
- **Unified ClientInfo block** — DOB-or-age, gender, tobacco (when relevant), US state
- **DOB ↔ age sync** — type DOB, age auto-fills; type age, DOB clears
- **Age-bracket awareness** — juvenile (1–17), young adult (18–49), senior (50–89) drive
  banner copy, default face amounts, and which form fields are visible

---

## TECH STACK

- **React 18 + Vite** — SPA, no SSR
- **Single-file architecture** — `src/App.jsx` is ~5600 lines (entire UI, state,
  rate engine, carrier configs). Will split when complexity demands it; don't
  prematurely refactor.
- **Auth**: Supabase (email/password). Agents sign in at the gate; no anon mode.
- **Hosting**: Netlify, GitHub auto-deploy (`git push origin main` → live in ~20s)
- **Analytics**: PostHog with `autocapture:false` (only explicit `track()` calls fire)
- **No backend** — all rates are baked into JSON data files at build time
- **No database** — Supabase auth only; no profile storage yet
- **Domain**: `quotemarko.com` (primary, custom domain). Brand: **Quotemarko** (rebranded 7/2026).

**Repo**: `github.com/markduse/quotemark` (private)
**Live**: `https://quotemarko.com/` (netlify.app URL 301s here)

---

## DATA STRUCTURE — `src/data/`

| File | Size | What it holds |
|---|---|---|
| `fex_rates.json` | ~400 KB | 86k+ cells. Shape: `{"Company||Plan": {tier: {age: {face: monthlyPremium}}}}`. Tiers = MNS/MS/FNS/FS. Ages 1–89. Faces $2k–$100k (sparse anchors per product). |
| `term_rates.json` | ~400 KB | 23k cells, 28 products. 100% match to ITK as of May 2026 scrape. |
| `iul_rates.json` | ~30 KB | 201 cells, 2 products (MOO IUL Express + 1 other). |
| `rate_factors.json` | small | Formula-based carriers: `(rate/1000 × units + policyFee) × modalFactor`. Used for Accendo, Lifeshield, Aetna Protection Series. |
| `restrictions.json` | small | Per-carrier state availability + min/max face caps. |

**Rate lookup** (`fexLookup` in App.jsx ~line 1439):
1. Snap age to exact match in tier table
2. From available face anchors ≤ requested face, pick the largest (never overshoot)
3. If requested face < all anchors (juvenile case), use the smallest anchor
4. Return `{prem, face: effectiveFace}` — UI labels it as "for $X face" if capped

`buildResult` (~line 2644) wraps `fexLookup` and applies: state checks, age max
per tier, GI fallback to Modified, capped-face display flag, and per-carrier
disability or knockout rules. It also respects optional `sub`/`productName`
overrides returned by carrier `fn()` — used for age-dependent product variants
(e.g., MOO switches to "Children's Whole Life" sub-label when age < 18).

---

## KEY CONCEPTS

**UW Tiers** (`B/C/D/E`):
- **B** — Preferred (clean health, full benefit day 1)
- **C** — Standard (moderate history, full benefit day 1)
- **D** — Modified / Graded (2–3yr waiting period, scaled payout)
- **E** — Guaranteed Issue (no health questions, knockout conditions present)

**Smoker × Gender combos** in rate tables: `MNS / MS / FNS / FS`

**Age brackets** (`isJuvenile / isYoungAdult / isSenior` in App.jsx ~line 2581):
- 1–17: Juvenile WL — guaranteed issue, no tobacco/health UI
- 18–49: Adult WL — standard UW; banner reminds agent term is usually cheaper
- 50–89: Senior FE — full UW flow with health conditions search

**GSB toggle** (Guaranteed Self-Build): when ON, computes modal premium from a
target face. When OFF, agent picks face directly.

**Auto-tier recommendation**: `termRec` / FEX `autoTier` look at age + BMI +
selected health conditions + family history and pick the most-likely class.
Agent can override.

---

## SCRAPING / DATA SOURCING

**Primary source**: ITK (Insurance Toolkits) — `api.insurancetoolkits.com/quoter/`
- JWT auth (extracted from browser session)
- Toolkit param: `TERM` / `FEX` / `IUL`
- Two scrape patterns in `scripts/`:
  - `scrape_itk_rates.js` — Playwright UI automation (older, fragile, has Mark's
    password in plaintext — **rotate when convenient**)
  - `itk_gap_scrape.js` — JWT-based, paste into ITK browser console, auto-
    captures token. Faster + more reliable.

**Secondary source**: InstaBrain portal — used for accurate IB Term + PureTerm
direct quotes when ITK has gaps. Requires Mark's logged-in browser session
(captured via Chrome MCP in past sessions).

**Manual research**: Carrier portals (Foresters, MOO, Royal Neighbors) for
juvenile + IUL spec sheets.

**Analysis scripts** (added Phase D recent session):
- `analyze_fex_coverage.mjs` — cells/products per age bracket, gap density
- `test_age_spectrum.mjs` — smoke test across 10 profiles (5yo daughter,
  22yo male, 65yo female, etc.)
- `merge_gap.mjs` — merges scraped JSON into `fex_rates.json` with dedupe

---

## CARRIER LANDSCAPE (FEX/WL, in App.jsx ~line 1488)

~30 carriers configured. Major ones:
- **Mutual of Omaha** (`moo`) — Living Promise (45+), Children's WL (1–17,
  added recently)
- **Transamerica** (`ta`, `ta_exp`) — Immediate Solution, Express, Easy Solution
- **Foresters** (`for`) — PlanRight + BrightFuture juvenile
- **Royal Neighbors** (`rn`, `rna_gi`) — Jet WL + GI
- **American Amicable** (`amam`, `amam_gs`) — Family Choice + Golden Solution
- **Liberty Bankers** (`lb`) — SIMPL WL + Home Service
- **Accendo / Aetna CVS** (`acc`, `cont`) — Protection Series FE
- **AIG / Corebridge** (`cbg`) — SIWL + GIWL
- **United Home Life** (`uhl`) — Premier / Deluxe / EIWL
- **Baltimore Life** (`bl_sg`) — iProvide + aPriority
- **Senior Life** (`sl_pp`, `sl`) — Platinum Protection
- **Americo** (`amr`) — Eagle Select
- **Lifeshield** (`ls`) — Survivor Level/Graded
- **AHL** (`ahl`, `ahl_gs`) — Patriot + GuideStar
- **Occidental** — Family Choice + Family Legacy
- **Bankers Fidelity / Aetna** — Protection Series

Some are `enabled: false` (Aflac, Lafayette Life, Polish Falcons, Better Life,
Royal Arcanum) — kept for future activation.

---

## DESIGN RULES (don't break these)

**Redesigned 7/2026 to a light "fintech" system (Stripe/Mercury-like) — single
light theme, dark mode removed. Source of truth: the July 2026 design handoff
(`design_handoff_quotemarko_redesign`). Brand is now "Quotemarko" with the
wordmark `Quotemarko.` (trailing period in accent indigo).**

- **Mobile-first.** Always test 390px viewport first.
- **Colors** (single light palette, in `C_TOKENS` in App.jsx):
  - Page bg: `#f8f8f7` (warm off-white) · Card: `#fff`, border `#eae9e6`
  - Ink: `#191817` · Secondary: `#78746e` · Muted: `#a09c94` · Placeholder: `#b5b1a8`
  - Accent indigo: `#4a45d1` (hover `#403bbd`, active `#3b37ad`); tint `#eef0fe`/text `#4740c8`
  - Status only: green `#177452`/bg `#e8f6ef` · amber `#96660f`/bg `#fdf3e0` · red `#b42318`/bg `#fdecec`
  - Selected segmented/chips: solid `#191817` with white text (NOT indigo)
- **Font**: **Instrument Sans** only (variable 400–700; prices at 650).
  `font-variant-numeric: tabular-nums` on body — no monospace for prices.
- **Shape**: cards r10–12, inputs r7 (36px tall), buttons r8–9, pills r99.
  Quote rows are separate cards with 8px gaps (not a divided list).
- **Interactions**: everything transitions `all .12s ease`. Row hover: bg
  `#f7f7ff`, border `#c9c6f2`, translateX(3px). e-App button: white/indigo
  bordered at rest → solid indigo on hover. CSS classes: `.qm-row`, `.qm-eapp`,
  `.qm-cta`, `.qm-seg`, `.qm-navtab` (injected in App.jsx).
- **Tone**: confident, direct. Agents use this on live calls — no jokes, no fluff,
  no fake urgency. Numbers and product names speak for themselves.
- **Tap targets**: minimum 40px on desktop, 44px on mobile.
- **Animations**: ≤200ms, no bounce, no spring physics.

---

## ENVIRONMENT

```bash
# Setup
npm install

# Dev server
npx vite                       # → http://localhost:5173

# Build
npx vite build                 # outputs to dist/

# Deploy (auto)
git push origin main           # Netlify deploys in ~20s
```

`.env` vars:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_POSTHOG_KEY`

---

## KNOWN ISSUES

1. **`scripts/scrape_itk_rates.js` line 19 has Mark's ITK password in plain
   text.** Move to `.env` + rotate the password.
2. **Build chunk size > 500 kB** — Vite warns. Single-file App.jsx is the
   reason. Refactor will help (data files into dynamic imports).
3. **`fex_rates.json` face anchors are sparse at low ages** — the lookup
   handles this via snap-to-largest-band ≤ requested, but agents may see
   "(for $X face)" disclosures more often at juvenile ages. UX is honest;
   just be aware.
4. **CLAUDE.md previously held the wrong project's content** (DFG exam prep)
   — fixed in this file. If you see `dfg-exam-prep` references anywhere in
   the QuoteMark repo, those are stale.

---

## RECENTLY SHIPPED

- **Unified ClientInfo component** across all 4 tabs × mobile+desktop
- **DOB ↔ age auto-sync** with focus auto-advance mm → dd → yyyy
- **FEX/WL age expansion** — 1–89 with age-aware UX (juvenile banner, hidden
  tobacco/health for kids, smart face defaults)
- **MOO Children's WL** wired as age-dependent product variant on the existing
  MOO carrier card
- **`buildResult` sub/productName override** — generic hook for future
  age-dependent variants (Foresters BrightFuture, Royal Neighbors Junior, etc.)
- **Coverage analysis + smoke-test scripts** — `analyze_fex_coverage.mjs`,
  `test_age_spectrum.mjs`
- **Term scrape via InstaBrain portal** — accepted 1% drift, 100% ITK match for
  primary term carriers
- **Tier-aware UW badges** (instant vs. exam) for term products

---

## SHELVED / FUTURE WORK

**Domain decision** — RESOLVED 7/2026: Option B. Rebranded to "Quotemarko"
everywhere (UI, title, auth, PDF, emails). quotemarko.com is primary;
quotemarko.netlify.app 301-redirects to it (netlify.toml).

**Gerber Grow-Up rates** (deferred): household-name juvenile WL but not on ITK.
Adding requires manual rate transcription from their PDF brochure (~30 min).
Existing 10 juvenile products cover the major bases (MOO, Foresters, Royal
Neighbors, AmAm, Trans, Baltimore, AHL, Occidental).

**Other potential adds**:
- Score / quote history per agent (would need Supabase profile table)
- Agent leaderboard / DFG-shared deals view
- Carrier comparison sheet (side-by-side spec table)
- PWA install + offline-cached rate files
- Refactor App.jsx into module structure when it crosses ~7k lines

---

## HOW TO ASK FOR HELP

When asking Claude to work on QuoteMark, useful context to include:
1. **Which tab** (FEX/WL, Term, IUL, CV) — most logic is tab-specific
2. **Mobile or desktop** layout — they're in different branches of App.jsx
3. **Carrier ID** if changing a single carrier (e.g. `moo`, `ta`, `for`)
4. **Whether this is a rate fix or UI fix** — rate issues usually need a
   scrape; UI issues are just code

Reference files for future sessions:
- `src/App.jsx` — everything
- `src/data/fex_rates.json` — FE/WL rate truth
- `src/data/term_rates.json` — Term rate truth
- `scripts/analyze_fex_coverage.mjs` — diagnose coverage gaps
- `scripts/test_age_spectrum.mjs` — verify quote engine after rate changes

---

*Last updated by Claude · 2026-05-28*
*Built for MPD Investment Group LLC d/b/a QuoteMark · quotemarko.netlify.app*
