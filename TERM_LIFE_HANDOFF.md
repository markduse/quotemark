# Term Life — Handoff Brief

> Goal of next session: ship the Term Life tab. Scaffolding + scraped rates already
> exist; the tab is currently hidden behind "Coming Soon" placeholders. Decide on
> ratebook strategy, then either polish the existing scrape or rebuild from PDFs.

## Current state in code

### What's already built (don't redo)

- **`TERM_CARRIERS` array** ([src/App.jsx:982](src/App.jsx#L982)) — 7 carriers wired:
  - American Amicable
  - Instabrain
  - John Hancock
  - Mutual of Omaha
  - SBLI
  - Royal Neighbors
  - Transamerica
- **Inline rate tables** for each ([src/App.jsx:839-845](src/App.jsx#L839)) — sparse anchor format:
  - Term lengths: 10 / 15 / 20 / 30 years
  - Ages sampled: 18, 19, 20, 21, 22, 23, 24, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75
  - Classes: mn (male NT), mt (male tobacco), fn, ft
  - **Source:** "Scraped from InsuranceToolkits" per the comment
- **`termLookup()` and `termResults` useMemo** ([src/App.jsx:2199](src/App.jsx#L2199)) — quote engine wired
- **`activeCarriers` filter** properly excludes term carriers in FE mode and vice versa
  ([src/App.jsx:2163](src/App.jsx#L2163))
- **`MOO_TERM_FACES` constant** at line 238 — face-amount band

### What's NOT built yet

- **UI tab content** — the `quoteMode === 'term'` branch shows "Coming Soon" in
  4 places ([App.jsx:2575, 2671, 3453, 3557](src/App.jsx#L2575)). Mobile + desktop
  views, both empty state and results pane. These need actual term-quoting forms +
  result rendering.
- **Term-specific form fields** — current FE form has age/gender/state/tobacco/face/UW.
  Term needs: age, gender, tobacco, state, face, **term length (10/15/20/30)**,
  **health class (Pref Plus / Pref / Std Plus / Std)**. UW tier is different —
  for term it's a health class lookup, not the FE B/C/D/E mapping.
- **Carrier face caps for term** — different from FE. Term often $50k–$1M+.
- **Term landing page / education** — agents may not know term flow without help.

## Ratebook strategy decision (for next session)

Three paths to choose from:

### Path A: Trust the existing ITK scrape (fastest)
The rates inline in `src/App.jsx:839-845` are already there. Just build the UI
on top. Risk: ITK scrapes go stale; sparse anchor ages need interpolation between
20/25/30 etc.

### Path B: Rebuild from carrier PDFs (slowest, most trustworthy)
Same approach we used for UHL final-expense:
- Get authoritative ratebook PDF per carrier
- Extract Annual Rate Per $1k for each (term length × age × class)
- Apply each carrier's modal-factor formula
- Generate every-$1k face values 

This is what the FE side ended up doing. ITK rates were wrong by 20%+ for some
ages on UHL Premier — same risk applies here.

### Path C: Hybrid (probably right answer)
Trust ITK for low-volume / stable carriers (SBLI, John Hancock — bigger names,
ITK probably accurate). Rebuild from PDFs for the carriers Mark sells most
(MOO, Transamerica, Royal Neighbors term).

## Where to source authoritative term ratebooks

Term ratebooks are usually downloadable from each carrier's agent portal:

| Carrier | Agent portal | Typical PDF location |
|---|---|---|
| American Amicable | insuranceapplication.com | "Express Term" or "Term Made Simple" rate sheet |
| Instabrain | portal.instabrain.io | RAPIDecision Term rate sheet |
| John Hancock | jhsalesnet.com or jhfunds-related portals | Vitality Term rate sheets (vary by exam reqs) |
| Mutual of Omaha | mutualofomaha.com/agent-login | Term Life Express (TLE) rate book — Mark already had this once |
| SBLI | sbli.com → agent portal | EasyTrak rate sheet |
| Royal Neighbors | agent.royalneighbors.org | Term rate sheet |
| Transamerica | transamerica.com/financial-professionals | Trendsetter LB (Express) rate sheet |

Mark mentioned earlier:
- "Mutual of Omaha — Term Life Express (TLE) — rates already in the JSON file Mark sent"

Check `~/Downloads/quotemark-files/` and `~/Desktop/Business/MPD_Investment_Group_LLC/...`
for any term-specific rate files he transferred. The folder structure already has
the FE ratebooks; term may be filed alongside.

## Term ≠ FE in important ways

Things to design for that the FE engine doesn't handle:

1. **Health class instead of UW tier.** Term uses Preferred Plus / Preferred /
   Standard Plus / Standard (no Modified, no GI typically). Some carriers split
   tobacco into Preferred Tobacco vs Standard Tobacco.
2. **Underwriting requires exam.** Most term needs labs, paramed, MIB. Some
   express/no-exam products exist (Instabrain RAPIDecision, Trans Trendsetter LB,
   MOO TLE) — those are what FE telesales agents actually sell.
3. **Term length × age combinations create gaps.** A 30-year term at age 65 may
   not be issued. Need per-carrier max-age × term-length matrix.
4. **Face amounts much higher.** Often $100k–$1M. Slider needs different range.
5. **Conversion riders.** Some agents care which carriers allow term-to-permanent
   conversion. Could surface this as a filter.

## Where to start in the next session

1. Open this doc + `src/App.jsx` line 982 (TERM_CARRIERS array) to see existing scaffold.
2. Decide ratebook strategy with Mark: A / B / C above.
3. If C (most likely), inventory which term ratebook PDFs are available locally.
4. Sketch the term form UI: face slider + term length pills + health class pills + state/age/tobacco.
5. Wire `quoteMode === 'term'` branches to actual rendering instead of "Coming Soon".
6. Replace inline rate tables with `data/term_rates.json` (Mark already has the file
   per the file listing — `src/data/term_rates.json` exists, 368KB).

## Open questions for Mark

- **Which term carriers do you actually sell?** Some of the 7 in code may be aspirational.
  Disable any that aren't currently contracted.
- **No-exam term only?** Or do you sell fully-underwritten term too? Affects which
  health classes the form needs to expose.
- **Children / juvenile rider?** UHL Provider has a 0–17 product. Out of scope?
- **Term + Final Expense combined illustration?** Some clients buy both — worth a
  combined view?

---

*Last updated: May 8, 2026*
*Scope: capture state of term scaffolding so a fresh session can pick this up cold.*
