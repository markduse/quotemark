# IUL (Indexed Universal Life) — Handoff Brief (2026-05-11)

> **Goal: define and build the Cash Value tab for QuoteMark.**
> Currently shows "Coming Soon". IUL is fundamentally different from FE/term
> quoting — read the "Why IUL is hard" section before writing any code.

---

## Why IUL is hard (read this first)

IUL is **not a "quote"** in the same sense as FE or term. Term/FE quotes are simple:

> "How much per month for $10k of coverage at age 65 NS male?"
> Answer: $56.48/mo. One number. Done.

IUL is a **projected savings vehicle** with multiple moving parts:

- **Premium**: agent + client decide what they want to put in monthly (e.g., $200/mo for 20 years)
- **Death benefit**: rises with cash value or stays level (Option A vs Option B)
- **Cash value accumulation**: depends on the index (S&P 500 typically), capped/floored each year
  - **Cap rate**: max annual gain credited (e.g., 9.5%)
  - **Participation rate**: % of index gain credited (e.g., 100%)
  - **Floor**: minimum credit (typically 0% — no losses but no gains either)
  - **Spread**: deduction from index gain (e.g., 1%)
- **Loads + COI (cost of insurance)**: deducted from cash value monthly
- **Surrender charges**: declining over ~10 years
- **Tax-deferred growth** + tax-free loans against cash value
- **Illustration assumptions**: industry standard is 6.0% illustrated rate (AG49 governs)

An IUL **illustration** (the carrier-produced PDF an agent shows a client) is built
from a Monte Carlo or scenario-based projection. Real illustrations require carrier
software. **QuoteMark cannot reproduce these exactly.**

---

## What QuoteMark CAN do for IUL

Three sane scopes, picked by ambition:

### Scope A — "Premium-for-target-DB" comparator (recommended for v1)

Show, for a given (age, gender, tobacco, face amount, premium duration):

| Carrier | Required Monthly Premium | Cap | Par | Floor | Illustrated Cash Value @ Age 65 / 75 / 85 |

The required premium for a target death benefit can usually be computed from
each carrier's published "minimum funding" tables. Cash value projections use
the AG49-compliant illustrated rate (6.0% currently) applied to the carrier's
index strategy parameters.

**Effort**: 3-6 hours per carrier, mostly data entry from ratebook PDFs.

### Scope B — "Carrier feature comparison" (fastest)

No quoting. Just a side-by-side table:

| Carrier | Min Premium | Issue Ages | Index | Cap | Par | Floor | Death Benefit Options | Riders |

This is informational, not transactional. Useful for agents shopping carriers but
doesn't help close a client.

**Effort**: 1-2 hours total.

### Scope C — "Full illustration engine" (don't do this)

Reproduce carrier illustration PDFs in-app. **Don't attempt this.** Compliance
risk, complexity, and zero value-add over the carrier's own illustration software.

---

## Carriers Mark sells (best guess — confirm with Mark)

Common FE-agent IUL carriers:

- **F&G Life** — Pathsetter IUL (popular with FE agents who upsell)
- **Allianz** — Allianz Life Pro+ (premier brand)
- **Athene** — Ascent or similar
- **Symetra** — Accumulator IUL
- **National Life Group** — FlexLife or PeakLife IUL
- **Mutual of Omaha** — IUL Express (already referenced in MOO's 27857_0823.pdf in `~/Downloads/Carrier Ratebooks/`)
- **AIG / Corebridge** — Max Accumulator
- **Pacific Life** — Pacific Indexed Estate Preserver

Mark will need to confirm which 3-5 carriers he actually writes for IUL. The
27857 MOO reference guide already in the ratebooks folder covers MOO IUL Express
— good starting point.

---

## Open questions for Mark to answer before starting an IUL session

1. **Which carriers do you sell IUL through?** (3-5 max for v1)
2. **What's the typical sale?** (Premium-funded for retirement supplement? Cash-value-funded for tax-free retirement income? Indexed-funded for LTC rider?)
3. **What target client demographic?** Age band, income band, premium range.
4. **What metric matters most to agents at point of sale?**
   - Lowest required premium for a target DB?
   - Highest projected cash value @ age 65?
   - Best participation rate?
   - Lowest cost of insurance?
5. **Should we even build this as a "quoter" or is it actually a "carrier comparison" tool?** (Scope B vs A above.)

---

## Pre-session prep for Mark

Gather these for each IUL carrier you sell:

- Current ratebook / "Sales Concept" PDF — usually includes minimum premium tables by issue age × face
- Illustrated rate sheet (under AG49) for the carrier's primary IUL product
- Cap / par / floor for each indexing strategy
- COI tables (often in a separate PDF or buried in the illustration tool)
- Any "premium back-of-the-envelope" cheat sheet your IMO uses

---

## Suggested execution order for the IUL session

1. **(20 min) Decide scope** with Mark — A or B. This determines everything else.
2. **(20 min) Confirm carrier list** — pick 3-5.
3. **If Scope B**: build a static comparison page. 1-2 hours total.
4. **If Scope A**:
   - (30 min) Reverse-engineer one carrier's premium formula from its illustration
   - (60 min) Build the form (age/gender/tobacco/face/premium-duration)
   - (60 min) Build the comparator with carrier-specific projections
   - (30 min) Verify against carrier's own illustration software for one test case per carrier
   - (30 min) Wire to `quoteMode === 'cv'` (the existing tab — see [src/App.jsx](src/App.jsx) where `setQuoteMode('cv')` is called)

---

## Files to read first in the IUL session

1. This doc.
2. [src/App.jsx](src/App.jsx) — search for `'cv'` to find the existing Cash Value tab scaffolding. Tab button + state already wired; render branch is the "Coming Soon" placeholder.
3. [TERM_LIFE_HANDOFF.md](TERM_LIFE_HANDOFF.md) — the term tab work probably ships before IUL, look there for the patterns established (form fields, result rendering, carrier filtering).

---

## Starter prompt for a fresh Claude Code session

```
I'm picking up the IUL (Indexed Universal Life) build for QuoteMark.
Read IUL_HANDOFF.md in the repo root first — it explains why IUL is
fundamentally different from FE/term and proposes 3 scope options.

DO NOT start coding until you've helped me pick the scope. Walk me
through the tradeoffs of Scope A vs B (definitely not C). Once we
decide, then we start the work.

The Cash Value tab currently shows "Coming Soon" in App.jsx. The
existing TERM_LIFE_HANDOFF.md may already be done by the time you
read this — check the term tab for patterns to follow.

Be honest about what's realistically buildable in a single session
vs what needs to be a multi-session project.
```

---

## Realistic timeline

| Scope | Session count | Total hours |
|---|---|---|
| B (comparison table) | 1 | 1-2 |
| A (premium-for-DB) | 3-4 | 8-12 |
| C (full illustrations) | not recommended | 40+ |

For an FE-agency-owner's tool, Scope B is probably right for v1. Agents can use carrier illustration software for actual illustrations; QuoteMark helps them pick which carrier to illustrate.
