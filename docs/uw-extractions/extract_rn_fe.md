# Royal Neighbors of America — UW Extraction (2 PDFs)

**Extraction date:** 2026-08-08
**Sources:**
1. `~/Downloads/royal uw guide.pdf` — "Simplified Issue Whole Life and Graded Death Benefit Whole Life — Agent Training Guide" (Form 2996-B; Rev. 12-2014), 16 PDF pages (printed pages 1–13 + covers)
2. `~/Downloads/RNA Field UW.pdf` — "Field Underwriting Guide — Jet Term Life, Jet Whole Life, Juvenile Jet Whole Life, Single Premium Whole Life" (Form 2980-B; Rev. 3-2020), 22 pages

> **CRITICAL FIT-TO-APP WARNING:** **Neither PDF covers "Ensured Legacy FE."** The app quotes Ensured Legacy FE with Preferred / Standard / Graded / GI tiers. PDF 1 covers RNA's *older* simplified-issue final expense pair — **SIWL (Form Series 1311)** and **Graded Death Benefit WL (Form Series 1312)** — which have **NO Preferred, NO substandard, NO GI** (p.1: "Underwriting Classes … No Substandard · No Preferred"). PDF 2 covers **fully underwritten** products (Jet Term/Jet WL/Juvenile Jet WL/SPWL), not SIWL final expense — "Jet Whole Life" here is NOT a simplified-issue product. Neither document contains condition-specific time windows (e.g., "heart attack within 2 years → Graded") and neither contains the verbatim health-question text or the Rx knockout list (both live in separate forms: application Form 141720 and Prescription Indicator List Form 200). **The Ensured Legacy UW doc gap remains open.** Do not wire these rules into the Ensured Legacy tier logic as-is.

---

# PDF 1 — SIWL + Graded Death Benefit WL Agent Training Guide (2996-B, Rev. 12-2014)

## Products covered
- **Simplified Issue Whole Life (SIWL)** — Form Series 1311 (p.1 / PDF pg 3)
- **Graded Death Benefit Whole Life (GDB)** — Form Series 1312 (p.1)
- These are the predecessors of the app's "Ensured Legacy FE" level/graded structure. SIWL ≈ level benefit tier; GDB ≈ graded tier. There is no Preferred and no GI in this generation of product.

## Issue ages / face amounts / classes (p.1)
| Item | SIWL | GDB |
|---|---|---|
| Issue ages (age **last** birthday) | 50–85 | 50–85 |
| Face amounts | $5,000–$25,000 | $5,000–$10,000 |
| Max stacking | "Maximum new SIWL insurance an insured can have is $25,000 **less existing insurance at Royal Neighbors that has been issued on a simplified issue basis** (including Simple Solution, SPWL, Sr. Whole Life, Graded Death Benefit, and products issued through any not fully underwritten program)" | Same structure, $10,000 cap (less existing SI-basis insurance incl. Simple Solution, SPWL, Sr. Whole Life, SIWL) |
| UW classes | Male/Female; **Tobacco/Non-Tobacco; No Substandard; No Preferred** (Montana: male rates for all) | Same |
| Death benefit | Full face from day 1 | **Graded: 30% of face in year 1, 70% in year 2**, 100% year 3+; **100% if death is accidental** (accidental provision not approved in AR) |
| Certificate fee | $30/yr (commissionable) | $30/yr |
| Free look | 20 days (or longer if state requires) | Same |

Modal factors (p.8/p.11): Monthly EFT 0.087 (+$2.61 fee), Quarterly 0.265 (+$7.95), Semi-Annual 0.52 (+$15.60), Annual 1.0 (+$30.00). Formula: `[(Rate × Modal Factor) rounded to 2 places × Units] rounded to 2 places + Modal Certificate Fee = Modal Premium`.

Rate tables in the PDF (full grids present, per $1,000 annual + monthly EFT grids by face):
- p.8 SIWL annual rates per $1,000 (M/F, NT/T, ages 50–85). Sample anchors: M NT age 50 = 40.55; F NT 50 = 34.00; M T 50 = 53.85; F T 50 = 47.95; M NT 85 = 230.00; F NT 85 = 160.00; M T 85 = 311.00; F T 85 = 208.00.
- p.9 SIWL non-tobacco monthly EFT grid ($5k–$25k); p.10 tobacco grid.
- p.11 GDB annual rates per $1,000. Anchors: M NT 50 = 60.85; F NT 50 = 47.70; M T 50 = 72.30; F T 50 = 53.60; M NT 85 = 350.00; F NT 85 = 252.00; M T 85 = 387.00; F T 85 = 285.00.
- p.12 GDB non-tobacco monthly EFT ($5k–$10k); p.13 tobacco grid.

## Application knockouts — verbatim (p.4, Voice Signature Step 1; repeated with minor differences p.5 Paper Step 1)
"Individuals **not eligible** to apply for Simplified Issue Whole Life (SIWL) and Graded Death Benefit Whole Life (GDB) products:
- Anyone without a Social Security number
- Anyone who is not a U.S. citizen or current Green Card holder
- Anyone mentally incompetent or otherwise unable to make a valid contract
- Anyone who refuses or is unable to complete a telephone interview
- Anyone previously declined for another Royal Neighbors product
- Anyone who is currently being prescribed a medication on the Prescription Indicator List (Form 200)
- Anyone who already has $25,000 SIWL or $10,000 GDB with Royal Neighbors
- Anyone who has three lapsed certificates with Royal Neighbors"

(Paper version p.5 omits the Form 200/existing-coverage/3-lapse bullets from the numbered list but adds them in steps 3–4; it also notes "interpreter and TTY services are available" for the phone-interview bullet.)

## Health question gating — verbatim structure (p.5, Paper Step 1, item 3)
"Review Section 2 questions on application (Form 141720 with ICC and state specific versions)
- Has the applicant used tobacco in the past 12 months? If *yes*, then make sure to quote tobacco rates.
- **SIWL — questions 2–9 in Part 2 of the application must be *no*. If the answer to any of questions 2–9 is *yes*, then the applicant is not eligible for coverage.**
- **GDB — questions 2–7 in Part 2 must be *no*. Questions 8 and/or 9 can be *yes*.**"

> **GAP:** The actual text of application questions 2–9 is NOT in this guide — it lives on application Form 141720. So the SIWL-vs-GDB split (the exact conditions that push someone from level to graded, i.e., which health events are Q8/Q9) cannot be extracted from this PDF. Need Form 141720 (or the current Ensured Legacy app) for the verbatim knockout questions.

## Rx / medication rules (p.4, p.5)
- "Review all medications and consult the **Prescription Indicator List (Form 200)** for any automatic declines. If the Proposed Insured has been prescribed any of the automatic decline medications, she/he is not eligible for the product, **regardless of how the health questions were answered**." (p.4 item 4; p.5 item 4 nearly identical)
- Interview process (p.4): MRS reviews the **Prescription Profile and MIB Report; "additional questions may be asked based on these findings."**
- **GAP:** Form 200 itself (the actual drug list) is not included in this PDF.

## COPD / heart / cancer condition windows
- **None present.** This guide contains no condition-level rules (no COPD/oxygen, no MI/stent/bypass/CHF, no cancer windows). All medical screening is delegated to: (a) app Form 141720 Part 2 questions, (b) Form 200 Rx list, (c) MRS phone interview + Rx profile + MIB. Tobacco is the only health factor with an explicit rule (12-month lookback → tobacco rates, p.5).

## Underwriting process (p.3–7)
- Telephone interview by **MRS** for all SIWL/GDB. Two paths: Voice Signature (POS decision; approved apps issued in 1–2 business days) or paper app + later interview (p.3).
- Interview line (866) 281-9228; hours 8a–9p CT M–F, 8a–2p CT Sat (p.4). Underwriting questions: (800) 627-4762 option 1.
- "The interviewer will advise you if the application is approved, declined, or needs to be referred to the Home Office for additional review." (p.4)
- Not guaranteed issue: "Are either the SIWL or GDB a guaranteed issue product? **No.** The decision is based on Royal Neighbors underwriting guidelines." (p.7 FAQ)
- All MRS decisions final; if declined for SIWL/GDB, client may NOT apply for another RNA life plan, and vice versa (p.7 FAQs).
- Re-date: one per applicant within first 60 days. Re-apply: one rewrite per applicant within 12 months of issue; two lapsed certs need cover letter + financial-improvement explanation; **three or more lapsed certificates = unable to consider** (p.7).
- Payor must be a natural person; "An agent may not pay the initial or future premiums for an Insured." (p.7)
- ALB Rider (Form 1766): terminal condition (12-month life expectancy) or 90-day permanent nursing-home confinement; ages 50–85, elect at app, min face $7,000, accelerate up to 75% (min $5,000 / max $250,000 aggregate) (p.2).

---

# PDF 2 — Field Underwriting Guide (2980-B, Rev. 3-2020)

## Products covered (cover, p.1)
- **Jet Term Life** (fully underwritten / accelerated UW — NOT simplified issue)
- **Jet Whole Life** (same)
- **Juvenile Jet Whole Life**
- **Single Premium Whole Life (Royal Legacy SPWL)** — simplified-ish (phone interview/MIB/Rx, APS at higher ages/amounts)
- **Does NOT cover Ensured Legacy FE, SIWL, or GDB.** Per Mark's product policy (SI products only), Jet Term/Jet WL are out of app scope; this doc is background reference only.

## Issue ages / face amounts
**SPWL (p.4):** MIB and Rx profile ordered on all applicants.
| Issue age | Net amount at risk | Requirements |
|---|---|---|
| 45–80 | $5,000–$49,999 | Telephone Interview, MIB, Rx Profile |
| 45–65 | $50,000–$99,999 | Telephone Interview, MIB, Rx Profile |
| 66–80 | $50,000–$100,000 | + APS (if no doctor visit in past 12 mo: abbreviated paramed + blood/UA) |
| 45–80 | $100,000+ | + APS (same paramed fallback) |
- SPWL minimum premium **$5,000, no exceptions**; pre-authorization required for premium ≥ $200,000; source-of-funds documentation tiers at $5k–$24,999 (indicate origin), $25k–$49,999 (Declaration of Source of Funds), $50k+ (bank statements/proof) (p.4).
- SPWL build chart p.5 (M&F, standard/substandard/decline by height 58"–78"; e.g., 58" standard ≤203, substandard 204–222, decline 223+).

**Jet Term / Jet WL (p.6):** MIB, MVR and Rx profile on all applicants.
| Issue age | $10,000–49,999 | $25,000–250,000 | $250,001–500,000 | $500,001–2,000,000 | $2,000,001–5,000,000 |
|---|---|---|---|---|---|
| 0–17 (Jet WL only) | Accelerated UW | NA | NA | NA | NA |
| 18–50 | NA | Accelerated UW | Accelerated UW | PM, IR | PM, IR, FINC |
| 51–60 | NA | Accelerated UW | PM | PM, IR, SB | PM, IR, SB, APS, FINC |
| 61–65 | NA | PM | MA, SB, APS | PM, MA, EKG, APS, IR, FINC | PM, MA, EKG, APS, IR, FINC |
| 66–80 (Jet WL only) | NA | PM | MA, SB, APS | PM, MA, EKG, APS, IR, FINC | PM, MA, EKG, APS, IR, FINC |
(PM=Paramed/Blood/UA, SB=NT-proBNP, APS=medical records, MA=Mature Assessment, IR=Electronic Inspection Report, FINC=Financials)
- "**There is no knock-out medication list for Jet Term Life and Jet Whole Life.**" (p.6)
- Accelerated UW "optimized for customers under age 50 who are in relatively good health"; system matches medications, driving record and MIB against app answers; must be face-to-face (p.6).
- Risk classes (p.6): Accelerated UW — Preferred NT, Standard NT, Standard T, Substandard 1 NT/T (includes up to Table 4), Substandard 2 NT/T. Traditional UW — Super Preferred NT, Preferred NT, Preferred T, Standard NT, Standard T, multiple substandard classes up to Table 16.
- Build charts: accelerated UW p.7 (58" std ≤160 / decline 204+ … 78" std ≤289 / decline 368+); fully UW preferred build p.8 (M/F by height, Super Preferred/Preferred/Standard maxima).

## Preferred guidelines (fully UW only; Jet Term/Jet WL) — p.9, verbatim highlights
| Factor | Super Preferred | Preferred | Preferred Tobacco | Standard NT/T |
|---|---|---|---|---|
| **Tobacco** | "No tobacco use in past 5 years" | "No tobacco use in past 3 years" | "Current use, or use within past 3 years" | "No tobacco use within last 12 months/current use" |
| Family history | No coronary/CV disease or cancer in parent or sibling prior to 60 | No **death** from coronary/CV disease or cancer in parent or siblings prior to 60 | same as Preferred | N/A |
| Chol/HDL ratio | No treatment hx; ≤5.0 | ≤6.0 | ≤6.0 | 6.1–8.5 |
| Cholesterol | No treatment hx; ≤220 | ≤240 | ≤240 | 241–299 |
| Blood pressure | No treatment hx; ≤130/80 | Controlled w/ treatment; ≤135/85 | ≤135/85 | Controlled w/ treatment; ≤150/90 |
| Alcohol/substance abuse | No history | None past 10 yrs | None past 10 yrs | None past 5 yrs |
| Driving | No DUI/DWI/reckless past 5 yrs; ≤1 moving violation in 3 yrs | No DUI 5 yrs; ≤2 violations 3 yrs | No DUI 3 yrs; ≤3 violations 3 yrs | No DUI 2 yrs; ≤3 violations 3 yrs |
- Tobacco definition footnote (p.9, verbatim): "Tobacco classification includes any use of tobacco products, use of nicotine replacement therapy (gum, patch, eCig, etc.), cigar use, chewing tobacco or snuff, pipe, etc. Rate reclassification is available once client has stopped using tobacco for one year."

## Medical Conditions / Impairment Guide (pp.10–12)
Icon chart only — **✔ = generally acceptable, ⚠(!) = individual consideration/call for risk assessment, ✖ = decline. NO time windows or tier outcomes are given for any condition.** "All cases are subject to individual assessment… We reserve the right to order an APS in all instances." (p.10, p.12)

### COPD / respiratory
| Condition | Jet Term | Jet WL | Juvenile WL | SPWL |
|---|---|---|---|---|
| COPD (including emphysema) | ⚠ | ⚠ | ✖ | ⚠ |
| Asthma | ✔ | ✔ | ⚠ | ✔ |
| Pulmonary Fibrosis | ⚠ | ⚠ | ✖ | ⚠ |
| Tuberculosis | ⚠ | ⚠ | ✖ | ⚠ |
- No oxygen/inhaler/bronchitis-specific rules anywhere in either PDF. Tobacco rules: see Preferred table above (only tobacco windows in the doc).

### Heart / cardiovascular
| Condition | Jet Term | Jet WL | Juvenile WL | SPWL |
|---|---|---|---|---|
| **Congestive Heart Failure (CHF)** | ✖ | ✖ | ✖ | ✖ (decline all products) |
| **Defibrillator** | ✖ | ✖ | ✖ | ✖ |
| Coronary Artery Disease (heart attack, bypass, stent) | ⚠ | ⚠ | ✖ | ⚠ |
| Angina | ⚠ | ⚠ | ✖ | ⚠ |
| Aneurysm | ⚠ | ⚠ | ✖ | ⚠ |
| Arrhythmia (a-fib, palpitations) | ⚠ | ⚠ | ✖ | ⚠ |
| Pacemaker | ⚠ | ⚠ | ✖ | ⚠ |
| Heart Murmur | ⚠ | ⚠ | ✖ | ⚠ |
| Mitral Valve Prolapse | ⚠ | ⚠ | ✖ | ⚠ |
| Stroke: Cerebral Vascular Accident (CVA), Transient Ischemic Attack (TIA) | ⚠ | ⚠ | ✖ | ⚠ |
| Vascular Disease | ⚠ | ⚠ | ✖ | ⚠ |
| High Blood Pressure | ✔ | ✔ | ✖ | ✔ |
| Cholesterol | ✔ | ✔ | ✖ | ✔ |
(No cardiomyopathy row in the chart — would fall under "call for risk assessment.")

### Cancer
| Condition | Jet Term | Jet WL | Juvenile WL | SPWL |
|---|---|---|---|---|
| Cancer | ⚠ | ⚠ | ✖ | ⚠ |
| Skin Cancer (basal cell, squamous cell, malignant melanoma) | ⚠ | ⚠ | ✖ | ⚠ |
- No cancer-type distinctions, treatment-free windows, or metastasis rules given.

### Other notable auto-declines (all four products, pp.10–12)
AIDS/HIV · Alzheimer's/Dementia · Cognitive Impairment · Down's Syndrome · Felony History · Kidney Dialysis · Lou Gehrig's Disease (ALS) · Muscular Dystrophy · **Post Traumatic Stress Disorder (PTSD)** · Suicide Attempt · Transplant-pending (major organ) · Citizenship (non-resident aliens).
Individual-consideration (⚠) for adults: Amputation, Blood Clotting Disorders, Chronic Pain, Crohn's, Diabetes, Disability, Driving Violations, DUI/OWI, Epilepsy, Gastric Bypass, Kidney Disease, Liver Disease (incl. hepatitis, cirrhosis), Lupus, Multiple Sclerosis, Obstructive Sleep Apnea, Pancreatitis, Paralysis, Parkinson's, Rheumatoid Arthritis, Sarcoidosis, Substance Abuse/Misuse, Ulcer, Ulcerative Colitis.
Acceptable (✔) for adults: Acid Reflux (GERD), Anxiety/Depression/Psychological Conditions, ADD/ADHD, Barrett's Esophagus, Osteoarthritis, Osteoporosis, Pregnancy (⚠ SPWL).

## Financial / other guidelines (pp.13–17)
- Income multiples (p.13): 18–40 → 20x; 41–50 → 15x; 51–69 → 10x; over 69 → 5x; under 18 individual consideration. Premium >6% of annual household income requires explanation. Tax returns required over $1,000,000 face.
- Certificate dating (p.14): issue age = age last birthday; backdate up to 90 days to save age; cannot backdate to gain product/rider eligibility.
- Conditional receipt (p.15): none if face >$1M or heart trouble/stroke/cancer treated or known within past 12 months.
- Foreign travel/residency (p.15): Level-4/armed-conflict travel may not be accepted; must be U.S. citizen or legal resident; no SSN = not eligible.
- Lapses (p.16): 1 lapsed cert in 12 mo → reapply with new app; 2 lapsed (any timeframe) → cover letter + new app + first premium; **3+ lapsed = unable to consider** (matches PDF 1).
- Mature assessment (p.16): ages 66+ get "get up and go test" + ADL questions at paramed.
- Military (p.16): alerted/on orders/deployed = unacceptable, postponed.
- Non-resident states (p.17): cannot accept applications on residents of AK, HI, AL, LA, NH, NY, MA.
- Owner/beneficiary matrix pp.18–21 (funeral home OK as bene except ID, IL, MA, MI, NY, NV, OK; MN required wording).

---

# Bottom line for QuoteMark
1. **No Ensured Legacy FE UW data was obtained.** These two PDFs cannot populate the app's RN Preferred/Standard/Graded/GI tier logic or COPD/heart/cancer window rules.
2. Best-available RN FE mapping from PDF 1: level tier = SIWL 50–85 / $5k–$25k, graded tier = GDB 50–85 / $5k–$10k (30%/70%/100%, accidental 100%); tobacco = 12-month lookback; all health knockouts live on app Form 141720 Q2–9 and Rx Form 200, neither of which is in hand.
3. **Still needed:** RN Ensured Legacy consumer/agent UW guide (current product), application Form 141720 (or current equivalent) Part 2 question text, and Prescription Indicator List Form 200 (or current Rx guide).
