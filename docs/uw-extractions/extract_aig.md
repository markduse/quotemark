# AIG / Corebridge — Underwriting Rule Extraction (COPD, Cardiac, Cancer)

Sources read in full:
1. `AIG-Underwriting-Guide-12.4.2021.pdf` — "Life Insurance Field Underwriting Guide," dated **January 22, 2022** (replaces Dec 4, 2021 version). Covers **fully underwritten Term/UL/IUL/WL** (AGL + US Life). 16 pp.
2. `AIG-SIWL-Final-Expense-61e89521b9ba3.pdf` — **SimpliNow Legacy** SIWL final expense product training deck (AGL, ©2021). 14 slides.
3. `Corebridge-UW-Guide.pdf` — "Life Insurance Field Underwriting Guide," dated **March 10, 2025** (replaces Aug 5, 2024). Rebranded successor to #1; medical content is essentially identical. 16 pp.

## IMPORTANT SCOPE CAVEATS (for the quoting app)

- **No GIWL guide is present in these PDFs.** AIG/Corebridge GIWL (Guaranteed Issue Whole Life) has **no health questions by definition** — the SIWL deck references GIWL only for combined-coverage caps (slide 8). Health rules below do NOT apply to GIWL; everyone in the issue-age range qualifies (with graded death benefit).
- **The SimpliNow Legacy deck does NOT print the knockout/underwriting application questions verbatim.** It describes the question structure and gives condition→product scenarios only (slides 12–13). It explicitly says: "Additional UW information and reference materials will be provided via the AIG TMG Producer Microsite" (slide 13). Any app logic for AIG SIWL knockouts beyond what's below must come from the actual eApp/paper app, not these PDFs.
- The two Field Underwriting Guides (#1, #3) are for **fully underwritten products**, not final expense — but their "automatically declined" list is the closest AIG/Corebridge publishes to hard knockouts and is included below because the parent task asked for every rule.

---

# PRODUCT 1: AIG SimpliNow Legacy (SIWL Final Expense) — from PDF #2

## Product/tier structure (slides 2, 6, 12)
- Simplified issue final expense whole life, **issue ages 50–80**, NOT available in NY (pending CA at time of deck).
- Two tiers decided instantly by the eApp (Connext platform):
  - **SimpliNow Legacy Max (Level)** — full face amount day 1. Face $5,000–$35,000.
  - **SimpliNow Legacy (Graded)** — Face $5,000–$25,000. Within first 2 years: 110% of premiums paid; accidental death within first 2 years: full face; start of 3rd year: full face.
- Face caps by age (slide 6): 50–60 Level $5k–$25k / Graded $5k–$25k; 61–70 Level $5k–$30k / Graded $5k–$25k; 71–80 Standard Non-Tobacco Level $5k–$35k / Graded $5k–$25k; **71–80 Standard Tobacco: Level NOT available**, Graded $5k–$25k only.
- Rate classes: Non-Tobacco, Tobacco only (slide 2). No medical tests; health questionnaire only; instant decision 100% of the time, "No additional underwriting ever" (slides 2, 4, 12).
- Combined SIWL+GIWL in-force cap per insured (slide 8): **$35,000 if applicant qualifies level; $25,000 if applicant qualifies graded.**

## Decision engine (slide 12) — verbatim structure
- **Knockout Questions:** "Any 'Yes' answer will result in a decline of both coverage options for the applicant."
- **Underwriting Questions:** "Used to determine which product offering the applicant qualifies for: SimpliNow Legacy Max (Level) or SimpliNow Legacy (Graded)."
  - "Applicant answering 'No' to all questions, may qualify for level coverage with SimpliNow Legacy Max."
  - "If Applicant's answers are eligible for graded coverage – they will be offered SimpliNow Legacy."
  - "If Applicant's answers determine they are not eligible for either product offering, they will be declined."
- The individual question texts are NOT reproduced in the deck (see caveat above).

## Condition → outcome scenarios (slide 13, verbatim; header: "Scenarios for Common Health Conditions — Eligibility is dependent upon an applicant's responses to all application questions. Please use the below information as a guideline.")

### Eligible for SimpliNow Legacy Max (LEVEL coverage)
| Condition + qualifier (verbatim) | Outcome |
|---|---|
| "DIABETES: With stable A1c less than or equal to 8.6%" | LEVEL |
| "RHEUMATOID ARTHRITIS or PSORIATIC ARTHRITIS" | LEVEL |
| "CANCER: Stage 1 diagnosed and/or treated in last 48 months: Melanoma, Breast, Colon, Thyroid, Kidney/Ureter, Prostate, Testicular, Cervical, Endometrial (Uterine)" | LEVEL |
| "SOME STABLE CORONARY CONDITIONS: Treated with stents or by-pass surgery." | LEVEL |

### Eligible for SimpliNow Legacy (GRADED coverage)
| Condition + qualifier (verbatim) | Outcome |
|---|---|
| "DIABETES: With below average control of A1c, without major complications" | GRADED |
| "HEPATITIS B" | GRADED |
| "PARKINSON'S DISEASE" | GRADED |
| "CANCER: Stage II cancers treated in the last 48 months" | GRADED |
| "SOME CARDIAC CONDITIONS like Cardiomyopathy" | GRADED |

### Category readouts for the app (SIWL)
- **A) COPD:** Not mentioned anywhere in the SimpliNow deck — no COPD/oxygen/inhaler rule published in this document. (Fully-UW guide treats severe COPD on oxygen as auto-decline; see below. For SIWL the app question set would govern — unknown from these PDFs.)
- **B) Heart:** Stable CAD treated with **stent or bypass** → can still get **LEVEL** (notably liberal vs most FE carriers — no lookback window stated). **Cardiomyopathy** → GRADED. No stated windows for MI/CHF/afib/pacemaker/valve/aneurysm/stroke in this deck.
- **C) Cancer:** **Stage 1** of listed types dx/treated **within last 48 months** → LEVEL. **Stage II treated within last 48 months** → GRADED. Implication: cancers >48 months out and/or lower severity are at least as good; Stage III/IV or current treatment presumably knockout (not stated — decision engine governs).
- **Tobacco:** Tobacco class exists at all ages, but **age 71–80 Tobacco cannot get Level** — Graded only, $25k max (slide 6).

---

# PRODUCT 2: AIG / Corebridge Fully Underwritten (Term, UL, IUL, WL) — from PDFs #1 and #3
(Identical medical rules in both; AIG guide page numbers first, Corebridge in parentheses when they match — they do, page-for-page.)

## A) COPD / Emphysema / Chronic Bronchitis / Tobacco

| Rule (verbatim where quoted) | Outcome | Page |
|---|---|---|
| "COPD/Emphysema, severe (on oxygen or disabling)" | **AUTOMATIC DECLINE** ("Impairments that are automatically declined – do not routinely order an APS") | AIG p10; Corebridge p10 |
| "Respiratory Disorder (significant) – includes COPD, Pulmonary Embolism and Pulmonary Nodules" | APS required (non-severe COPD is underwritten, not auto-declined) | AIG p9; Corebridge p9 |
| Tobacco user = "anyone who has used tobacco in any form in the last 12 months": cigarettes, cigars (limited cigar exception), pipes, smokeless, chewing/snuff, nicotine substitutes incl. patches & gum, electronic (smokeless) cigarettes, vaping | Tobacco rates | AIG p15; Corebridge p15 |
| Cigar exception: non-factor if admitted at app, ≤1 cigar/week, no cotinine in urinalysis within past 12 months, and no other tobacco use for at least 5 years | Non-tobacco possible | AIG p15; Corebridge p15 |
| Tobacco-free years for class: Preferred Plus 5 yrs; Preferred 3 yrs; Standard Plus 1 yr; Preferred Tobacco N/A | Class gate | AIG p6; Corebridge p6 |
| Marijuana: 18+, ≤8 days/month may qualify best class; vaping = Standard Tobacco at best; 9–16 days/month = Table B tobacco at best; ">16 days/month or 4 days/week: Decline"; medicinal use = APS required, decision based on underlying disorder | See each | AIG p15; Corebridge p15 |
| No inhaler-specific rule is published in any of the three PDFs. | — | — |

## B) Heart / Cardiovascular / Stroke

### Automatic declines (AIG p10; Corebridge p10 — "Impairments that are automatically declined")
| Condition + verbatim window | Outcome |
|---|---|
| "MI/heart attack in the last 6 months" | DECLINE |
| "Valve replacement within 6 months" | DECLINE |
| "Abdominal Aortic Aneurysm surgically corrected in the last 6 months" | DECLINE |
| "Automatic Defibrillator (ACID) implanted with history of Cardiac Arrest" | DECLINE |
| "CVA (stroke) within 1 year" | DECLINE |
| "Blood Pressure exceeding 185/100" | DECLINE |
| "Kidney Dialysis" | DECLINE |
| (Also: "Surgery (major) advised but not yet completed"; "Medical testing advised but not yet completed" — catches pending caths/bypass) | DECLINE |

Implication for quoting: MI/valve replacement/AAA repair **>6 months** ago and stroke **>1 year** ago are underwritable (rated), with APS.

### APS-required cardiovascular impairments (underwritten individually; AIG p9; Corebridge p9)
- "Abnormal cardiac test (or other abnormal testing)"
- "Cardiomyopathy (Congestive Heart Failure)"
- "Carotid Artery Disease/Stenosis"
- "Cerebrovascular Disease"
- "Cerebral Aneurysm"
- "Congenital Heart Disease"
- "Coronary Artery Disease"
- "Stroke or TIA"
- "Valvular Heart Disease – includes Mitral Regurgitation, Mitral Stenosis, Aortic Regurgitation, Aortic Stenosis, Pulmonary Insufficiency, Pulmonary Stenosis, Tricuspid Insufficiency and Tricuspid Stenosis"
- "Vasculitis"
- No specific rule published for atrial fibrillation, pacemaker, or angina by name; they fall under abnormal cardiac test/CAD/individual consideration. No stent/bypass lookback published for fully-UW (contrast: SIWL slide 13 allows stent/bypass at Level).

### Preferred-class cardiac gates (AIG p6; Corebridge p6)
- Blood pressure limits: Preferred Plus ≤135/85 (age ≤59), ≤140/85 (60–69), ≤150/90 (≥70); Preferred ≤140/85 (<45), ≤140/90 (45–69), ≤155/90 (≥70); Standard Plus ≤145/90 (<45), ≤150/90 (45–69), ≤160/90 (≥70); Preferred Tobacco ≤145/90 (≤59), ≤150/90 (60–69), ≤155/90 (≥70).
- Personal Health History (all preferred classes): "No medical flat extra premium. No debits for build, cholesterol or blood pressure or other medical impairment."
- Family history: Preferred Plus/Preferred — "No death from cardiovascular disease or cancer (colon, lung, melanoma, pancreatic) in either parent prior to age 60." Standard Plus — 1 such death in either parent <60 acceptable. (Ignore family history for proposed insured age ≥65.)
- Age/amount extras relevant to cardiac: resting EKG required at older ages/large amounts; **NT pro-BNP included in labs** starting at $100,000 for ages per footnote (AIG p4–5; Corebridge p4–5); Flex Points credits for normal stress EKG/perfusion imaging within 2 yrs, normal cardiac cath or CT angiogram (age 40–70) within 3 yrs, NT Pro-BNP ≤100 (age 60–70), untreated BP 120/80 (40–70) — AIG p7; Corebridge p7.

## C) Cancer

| Rule (verbatim where quoted) | Outcome | Page |
|---|---|---|
| "Cancer treatment (current)" | **AUTOMATIC DECLINE** | AIG p10; Corebridge p10 |
| "Medical testing advised but not yet completed" (pending biopsy etc.) | AUTOMATIC DECLINE | AIG p10; Corebridge p10 |
| "Cancer or Malignant Tumor (not Basal Cell or Squamous Cell)" | APS required — history of cancer underwritten individually; basal/squamous cell skin cancer exempt from APS | AIG p9; Corebridge p9 |
| "Myelodysplastic Syndrome" | AUTOMATIC DECLINE | AIG p10; Corebridge p10 |
| Preferred classes: "No personal history of cancer." BUT "May disregard non-rated history of non-melanoma skin cancer, cervical cancer, Stage 1 Seminoma, papillary thyroid cancer and remote history of melanoma in situ." | Cancer history bars preferred except listed exceptions | AIG p6; Corebridge p6 |
| Family history (see cardiac section above): parental cancer deaths (colon, lung, melanoma, pancreatic) before 60, and breast/ovarian/prostate in same-sex parent before 60, gate preferred classes; "Disregard cervical cancer and non-melanoma skin cancer." | Class gate | AIG p6; Corebridge p6 |
| Flex Points credits: normal mammogram within 2 yrs; normal colonoscopy within 3 yrs; normal prostate exam within 2 yrs | Rating credit | AIG p7; Corebridge p7 |

## Other auto-declines on the same list (context for knockout logic; AIG p10 / Corebridge p10)
Alcohol treatment in last 2 years; Alzheimer's/Dementia; Cirrhosis of Liver; Diabetes significantly complicated (amputation etc.) or very poor control; Juvenile onset diabetes <age 20; Drug use (other than marijuana) in last 3 years; Gastric/Intestinal bypass within 6 months; Grand mal seizures within 1 year of diagnosis; HIV positive (Corebridge adds "*Subject to individual state regulation"); Mental disorder incl. anxiety/depression requiring hospitalization or disability in last year; Organ transplant awaiting or recipient (except kidney — contact underwriter); Pregnant (current) with toxemia/eclampsia/pre-eclampsia (2022 AIG version also lists gestational diabetes; 2025 Corebridge dropped gestational diabetes); Quadriplegia; Suicide attempt in last year; >1 suicide attempt if last within 2 years; Term insurance age >70 rated over Table D or with flat extra.

## AIG 2022 vs Corebridge 2025 differences worth noting
- Content is otherwise page-for-page identical for sections A/B/C.
- Corebridge p10 pregnancy decline no longer lists gestational diabetes; adds state-regulation footnote to HIV.
- Corebridge p4: credit report required at age 18+ (AIG: age 25+). AU+ limits unchanged ($1M term / $2M perm).
- Final expense note (both guides, p13): "Final Expense coverage will be considered for a maximum of $50,000 when limited financial justification is demonstrated. This amount includes total line with all carriers. If no financial justification is demonstrated, no coverage will be issued."
