# New Session Kickoff — Term + IUL build

> **One handoff for the entire scope.** Read this first, then the two
> referenced docs. This is the brief for a fresh Claude Code session
> picking up Mark's next major milestone: shipping the Term and IUL
> quoters inside QuoteMark.

---

## What QuoteMark is today (context for cold start)

- Production FE (Final Expense) quoting tool at https://quotemarko.netlify.app
- Built by MPD Investment Group LLC — Mark's company. Public name: QuoteMark.
- Stack: Vite + React 18, Supabase auth, Stripe billing ($5/mo subscription with 1-day trial), Netlify hosting, PostHog analytics
- 15 FE carriers live and rate-accurate (UHL, Continental, Accendo, AHL, MOO, Trans Imm + Express, Foresters, RN, Fidelity, Lifeshield, Baltimore, AmAm, Elco, Liberty Bankers — last two unverified vs ITK)
- Recent FE rate audit found and fixed major data corruption in Continental ($91/mo off at age 83), Accendo (200/200 cells wrong in one tier), Fidelity ($11 off at age 80), UHL ($23 off at age 80)

## What this session adds

Two product lines currently hidden behind "Coming Soon" placeholders:

1. **Term Life tab** — 13 carriers, ~28 products, target 99% rate accuracy
2. **Cash Value (IUL) tab** — 4 carriers, scope to be decided in-session

## Read these in order

1. **This doc** — high-level scope and execution order
2. **[TERM_LIFE_HANDOFF.md](TERM_LIFE_HANDOFF.md)** — detailed term plan (carrier list, ITK strategy, UI build, quality bar, open questions)
3. **[IUL_HANDOFF.md](IUL_HANDOFF.md)** — IUL scope conversation (Scope A vs B), carrier list, why IUL ≠ flat-rate quote

## Suggested order of work

| Phase | Time | What |
|---|---|---|
| **Term — Discovery** | 30 min | Read both handoffs, confirm Mark's ITK access level, answer open questions |
| **Term — Data** | 90 min | Pull rates for 13 carriers / 28 products from ITK |
| **Term — Schema + Wire** | 45 min | Reshape into JSON, update carrier definitions, build `termPrem()` lookup |
| **Term — UI** | 90 min | Replace 4 "Coming Soon" branches, add term form, build result rendering |
| **Term — Verify** | 60 min | 5-quote spot-check per carrier vs ITK (~65 quotes total) |
| **Term — Ship** | 15 min | Commit + push, verify on quotemarko.netlify.app |
| **IUL — Scope** | 20 min | Walk Mark through Scope A vs B vs C, lock decision |
| **IUL — Build** | 60–180 min | Scope-dependent (B = 1-2h, A = 4-6h) |
| **IUL — Verify + Ship** | 30 min | Spot-check, commit + push |

**Realistic total: 7-10 hours of focused work.** Probably two sessions, not one. Frame this with Mark before starting.

## Key strategic decision: ITK is the source of truth

Mark has a paid subscription to **Insurance Toolkits** (https://app.insurancetoolkits.com).
ITK aggregates rates from all 13 term carriers continuously and is the live tool he uses today.
**Use ITK as the source-of-truth for term rates**, not carrier PDFs.

Three paths, prefer in order:

1. **CSV/API export from ITK** if Mark's plan includes it — fastest
2. **Authenticated scrape** via Claude in Chrome MCP using Mark's ITK login — fallback
3. **Per-carrier PDF rebuild** — last resort, only for carriers where ITK fails

PDFs are point-in-time and inconsistent; ITK is current and standardized.

## Carrier scope (don't get this wrong)

**Term — 13 carriers:**
American Amicable (7 products), Americo (5 products), Banner (1), Foresters (3), Instabrain (2), John Hancock (1), Kansas City Life (1), Mutual of Omaha (1 — Term Life Express), National Life Group (1 — LSW Level Term), Protective (1 — Classic Choice Term), Royal Neighbors (1 — Jet Term), SBLI (1 — EasyTrak), Transamerica (2 — Trendsetter LB 2017 + Trendsetter Super 2021)

**IUL — 4 carriers:**
Americo, Mutual of Omaha (IUL Express), American Amicable, Foresters

## Quality bar: 99% accuracy

For term, sample 5 quotes per (carrier × product) against ITK before shipping that carrier.
If any of the 5 fail, investigate (likely health-class mapping or column misalignment),
rebuild, re-verify. Match must be within $0.10.

For IUL — there's no real "rate accuracy" since it's a projection. Instead: confirm the
**cap / par / floor / face limits / issue ages** match the carrier's published spec sheets.

## Files to read in order

1. NEW_SESSION_KICKOFF.md (this file)
2. TERM_LIFE_HANDOFF.md
3. IUL_HANDOFF.md
4. src/App.jsx — focus on lines 800-1050 (TERM_CARRIERS), 2160-2210 (termResults), and search for `'cv'` for the Cash Value scaffolding
5. src/data/term_rates.json — may already be partially populated
6. src/data/fex_rates.json — shape reference

## Starter prompt for the fresh session

```
I'm starting Mark's biggest QuoteMark milestone — building the Term Life
quoter (13 carriers, ~28 products) AND the IUL quoter (4 carriers).

Read NEW_SESSION_KICKOFF.md in the repo root first, then TERM_LIFE_HANDOFF.md
and IUL_HANDOFF.md as referenced.

My target: 99% rate accuracy on term, shipped to production in one focused
push. IUL likely a separate scope conversation depending on how deep you
want to go (A/B/C explained in the doc).

I have ITK at app.insurancetoolkits.com — that's my source of truth.
Start by confirming what ITK access level I have (export? API? scrape?)
and we'll execute from there.

Realistic timeline is 7-10 hours of focused work, probably two sessions.
Frame the scope with me up front so we don't ship something rushed.
```
