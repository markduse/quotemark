# CLAUDE.md — DFG Exam Prep Project

> This file is read by Claude Code at the start of every session.
> It contains full project context, goals, stack, and known issues.
> Do not delete or move this file.

---

## WHO THIS IS FOR

**Duse Financial Group (DFG)** — a final expense telesales agency based in Troy, MI.
- Managing Partner: Mark Dusevic
- Brand: Duse Financial Group / Pinnacle Life Agency / Pinnacle Life Solutions
- This app is an internal training tool for new agent recruits who need to pass the
  **Michigan Life Producer state licensing exam** (PSI) before they can sell.

The goal: any 18-year-old with zero insurance background studies this app and passes
the exam with 85%+.

---

## WHAT THIS APP IS

**studyduse.netlify.app** — A mobile-first, gamified quiz app for Michigan Life Producer
exam prep.

- 151 PSI-aligned multiple choice questions across all exam topic areas
- Instant ✅/❌ feedback with explanation after every answer
- Streak counter, per-question timer, progress bar, score/pass-fail at end
- "Weak Spots" mode that retries previously missed questions (localStorage)
- 4 quiz modes: Mixed, Weak Spots, Regulation-only, Policies-only
- 4 session lengths: 25 / 50 / 75 / 100 questions
- DFG branding: deep navy (#1B2A4A), champagne gold (#C8A84B), cream (#F8F4EE)
- Fonts: Syne (headings/UI), DM Sans (body)

---

## TECH STACK

Currently a **single-file static app**:
- Pure HTML / CSS / Vanilla JS — no framework, no build step
- All 151 questions are hardcoded in a `QB` array inside `index.html`
- `netlify.toml` for redirect config
- Deployed on Netlify via GitHub auto-deploy (push to `main` = live in ~30 seconds)
- No backend. No auth. No database.
- localStorage used for persisting missed question IDs between sessions (`dfg_missed`)

**Repo:** github.com/markduse/dfg-exam-prep (private)
**Live URL:** https://studyduse.netlify.app/

---

## QUESTION BANK STRUCTURE

Each question object in the `QB` array:
```js
{
  cat: "Regulation",           // Topic category (see below)
  q:   "Question text here?",  // The question
  o:   ["A","B","C","D"],      // 4 answer options (always 4)
  a:   1,                      // Index of correct answer (0-based)
  e:   "Explanation text."     // Why the answer is correct
}
```

**Current categories and question counts:**
| Category | Questions | PSI Exam Weight |
|---|---|---|
| Regulation | 30 | 20% (20 items) |
| General Insurance | 20 | 10% (10 items) |
| Policies | 30 | 20% (20 items) |
| Provisions & Riders | 30 | 20% (20 items) |
| Underwriting & Basics | 20 | 15% (15 items) |
| Annuities | 10 | 5% (5 items) |
| Federal Taxes | 10 | 5% (5 items) |

**Target:** Expand to 300+ questions total, maintaining category ratios.
All questions must match PSI Michigan Life Producer exam style and difficulty.
Every question needs a solid `e` explanation — not just "the answer is B."

---

## PSI EXAM FACTS (hardcode these into any new content)

- **Exam:** Michigan Life Producer (Series 16-65)
- **Questions:** 100 (plus 5-10 unscored experimental)
- **Pass score:** 72% (72 correct)
- **Time:** 120 minutes
- **Fee:** $41 (non-refundable, valid 1 year)
- **Administered by:** PSI Exams
- **Regulator:** DIFS (Michigan Dept of Insurance and Financial Services)
- **Prelicensing:** 20 hours required before sitting for exam
- **CE requirement:** 24 hours per 2-year cycle (3 hours must be ethics)
- **License application:** Filed through NIPR
- **Grace period (life):** 31 days
- **Incontestability:** 2 years
- **Free look:** 10 days minimum
- **Group conversion:** 31 days

---

## KNOWN ISSUES / BUGS (fix these first)

1. **Timer resets don't feel smooth** — there's a visible jump when moving to next question
2. **Weak Spots mode on first use** — if no questions have been missed yet, it falls back
   to the full QB silently. Should show a message: "No missed questions yet. Try Mixed mode first."
3. **Score ring animation** — the SVG stroke animation on the results screen sometimes
   doesn't trigger on iOS Safari. Needs a requestAnimationFrame fix.
4. **Font loading flash** — Syne/DM Sans load async from Google Fonts causing FOUT
   (flash of unstyled text). Add `font-display: swap` or preload headers.
5. **Results screen topic breakdown bars** — bars don't animate in on iOS.
   CSS transition on `width` from 0 needs to be triggered after paint, not on render.
6. **No visual confirmation that localStorage saved** — user doesn't know their missed
   questions are being tracked. Add a subtle toast.
7. **"Weak Spots" mode doesn't clear after a retry session** — missed IDs accumulate
   forever. Need a "Clear history" button or auto-clear on perfect retry.

---

## PLANNED FEATURES (priority order)

### HIGH PRIORITY
- [ ] **Expand question bank to 300+** — add ~150 more questions, especially:
  - More Regulation edge cases (Michigan-specific statutes)
  - More Provisions & Riders variations
  - Add missing categories: Group Health, Disability Income, Medicare/Medicaid basics
    (these appear on the Life+Health combined exam which some agents take)
- [ ] **Topic filter on splash screen** — let user pick ANY single category, not just
  Regulation and Policies. Dropdown or scrollable chip list.
- [ ] **Study Mode** — separate from quiz mode. Shows question → answer → explanation
  without timing pressure. Tap to advance. Good for first-pass reading.
- [ ] **Score history** — last 5 quiz scores stored in localStorage, shown on splash.
  Simple bar chart. Shows trend over time.

### MEDIUM PRIORITY
- [ ] **Definitions/Glossary tab** — key insurance terms with definitions. Searchable.
  ~100 terms. No navigation overhaul needed — just a bottom tab or swipe.
- [ ] **Agent leaderboard** — if multiple agents use the same device or share a code,
  show a simple leaderboard. Could be as simple as entering your name before quiz.
- [ ] **Cheat sheet quick-reference** — a swipeable "cheat sheet" screen with the
  key numbers (31-day grace, 24 CE hours, 72% pass score, etc.) formatted like
  flash reference cards. Based on the study guide cheat sheets.
- [ ] **Share score card** — after results, generate a shareable image (canvas-based)
  so agents can post their score to the DFG group chat.

### LOW PRIORITY / FUTURE
- [ ] Dark/light mode toggle
- [ ] Haptic feedback on mobile (Vibration API)
- [ ] PWA manifest so it installs to home screen like a native app
- [ ] Backend sync so scores persist across devices (Supabase would work well here)
- [ ] Admin view for Mark to see which questions agents are missing most

---

## FILE STRUCTURE (current)

```
dfg-exam-prep/
├── index.html        ← entire app (HTML + CSS + JS + question bank)
├── netlify.toml      ← Netlify redirect config
└── CLAUDE.md         ← this file
```

**Refactor target** (do when adding Study Mode or Glossary):
```
dfg-exam-prep/
├── index.html
├── netlify.toml
├── CLAUDE.md
├── css/
│   └── styles.css
├── js/
│   ├── app.js        ← state machine, routing
│   ├── quiz.js       ← quiz logic
│   └── results.js    ← results logic
└── data/
    ├── questions.js  ← QB array (all questions)
    └── glossary.js   ← definitions
```
Don't refactor until the feature set justifies it. Single-file is fine for now.

---

## DESIGN RULES (do not break these)

- **Mobile-first always.** Max content width ~420px. Test everything on 375px viewport.
- **DFG color palette:**
  - Navy: `#1B2A4A` (primary bg, headers)
  - Navy dark: `#0f1e36` (page bg)
  - Gold: `#C8A84B` (accent, CTAs, highlights)
  - Gold light: `#e2c46e` (hover states)
  - Card bg: `#1e3153`
  - Green: `#22c55e` (correct answers, pass)
  - Red: `#ef4444` (wrong answers, fail)
  - Gray: `#94a3b8` (secondary text)
- **Fonts:** Syne (700/800 for headings, labels, UI text), DM Sans (body, options)
- **No purple gradients.** No Inter. No generic AI design.
- **Tap targets:** minimum 48px height on all interactive elements.
- **Animations:** subtle and fast. Nothing over 400ms. No bouncy animations on results.
- **Tone:** confident, direct, no fluff. This is for people who want to pass and start
  earning. Not a fun learning game — a serious prep tool with good UX.

---

## BRANDING CONTEXT

- App name on screen: "DFG · Exam Prep" or "Duse Financial Group"
- Tagline: "Pass the Exam. Get Licensed. Start Earning."
- Do NOT use "Pinnacle" branding in this app — it's DFG-branded.
- The study guide PDF this was built from is titled:
  "DFG Licensing System — Michigan Life Producer State Licensing Exam Study Guide"

---

## HOW TO RUN LOCALLY

```bash
# No build step needed. Just open the file.
open index.html

# Or use a local server (avoids any CORS issues with future features):
npx serve .
# → http://localhost:3000
```

---

## DEPLOY

Push to `main` branch → Netlify auto-deploys in ~20 seconds.

```bash
git add .
git commit -m "your message"
git push origin main
```

Check deploy status: https://app.netlify.com/sites/studyduse/deploys

---

## QUESTIONS / CONTENT ACCURACY

All questions are aligned to the **official PSI Michigan Life Producer content outline
(Series 16-65)**. The source of truth is:
`https://proctor2.psionline.com/programs/MIINS/`

When adding questions, always:
1. Map to a specific PSI content outline section
2. Write the explanation as if teaching someone who has never heard of insurance
3. Bold the key fact in the explanation using `<strong>` tags
4. Make distractors (wrong answers) plausible — real exam traps, not obviously wrong

---

*Last updated by Claude · March 2026*
*Built for Duse Financial Group · studyduse.netlify.app*
