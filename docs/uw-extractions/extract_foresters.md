# Foresters Financial — Underwriting Rule Extraction (COPD / Cardiovascular / Cancer)

Extracted 2026-08-07 for the quoting-app health-assessment engine.

## Source documents (all read in full)

| # | File | Form # / date | Pages | Scope |
|---|------|--------------|-------|-------|
| 1 | `/Users/marksmacmini/Desktop/Business/Underwriting_Guides/505049-us-0724-type-2-underwriting-field-guide-non-med.pdf` | 505049 US 07/24 | 1 | **Diabetes-only rating worksheet** for Non-Med Your Term, Advantage Plus II, SMART UL. Despite the filename, this is NOT a PlanRight guide and contains NO COPD/heart/cancer rules. |
| 2 | `/Users/marksmacmini/Desktop/Business/Underwriting_Guides/506305-us-0426-foresters-underwriting-guide-yt-sf-term-adv-plus-smart-ul.pdf` | 506305 US (04/26) | 23 (cover + printed pp. 1–22) | **CURRENT guide**: Advantage Plus II, Strong Foundation, Your Term, SMART UL. Impairment guide = printed pp. 17–20 (PDF pp. 18–21). |
| 3 | `/Users/marksmacmini/Downloads/Foresters underwriting guidelines.pdf` | 503316 US (8/17) | 24 (cover + printed pp. 1–23) | **OLDER guide** (Advantage Plus [I], Your Term, SMART UL). Superseded by #2 for impairments, but it is the ONLY document with the **Medications knock-out list** (printed p. 20). |

> **CRITICAL GAP — products NOT covered by these files:** There is **no PlanRight guide** (no Preferred/Standard/Modified tier rules) and **no BrightFuture rules** anywhere in these three PDFs. File #1's filename suggests PlanRight/non-med field guide but it is only the Type-2 diabetes rating sheet. Also **no Strong Foundation-specific impairment table exists** except where the 04/26 guide explicitly splits a row by product (COPD is the only such split in scope). PlanRight and BrightFuture rules must come from a separate document.

## How the impairment tables apply (scope rules)

- 506305 printed p. 17 (PDF p. 18): "Although clients may qualify for Non-Medical products, **if ratable up to 200% mortality (+100, or 4 tables or table D), the impairments listed below as 'decline' should not be submitted for Non-Medical.**" So a table "Decline" = decline for the NON-MEDICAL path; a fully underwritten (Medical) application MAY still be possible at substandard rates if ratable ≤ Table D — individual consideration, not guaranteed.
- 506305 printed p. 17: "The following guide applies to **single impairments**. Individuals with **multiple impairments may not qualify**."
- Outcome column in both guides is labeled **"Life (Non-Medical)"** — decisions below are the non-med accept/decline screen unless noted "Fully Underwritten."
- 506305 printed p. 15 (PDF p. 16) — combinations "often uninsurable" (any path): **Chronic kidney disease + high blood pressure**; **Depression/anxiety + alcohol abuse**; **Diabetes + CAD, CVD, or kidney disease**.
- Non-med underwriting runs a **Milliman IntelliScript pharmacy/medical-data/credit check + MIB on every proposed insured** (506305 printed p. 6). Rx history contradicting answers triggers questionnaires or decline.
- Non-med issue limits (506305 printed p. 6): Strong Foundation 18–55 $500K std / $300K substd, 56–80 $250K/$150K. Your Term 18–55 $400K, 56–80 $150K. SMART UL & Advantage Plus II: 0–15 $150K, 16–55 $400K, 56–75 $150K.

---

# A) COPD / EMPHYSEMA / CHRONIC BRONCHITIS

## A1. Current guide — 506305 US (04/26), printed pp. 18–20 (PDF pp. 19–21)

### COPD — Strong Foundation (printed p. 18; Respiratory Questionnaire "Q" available)
| Qualifier (verbatim) | Outcome (Life, Non-Medical) |
|---|---|
| "Smoker" | **DECLINE** |
| "Non Smoker, mild COPD, no oxygen, no steroids or serious COPD medications. Little to no shortness of breath (SOB) on exertion; able to climb at least 1 flight of stairs with little to no SOB" | **ACCEPT** |

→ **Tobacco interaction rule:** COPD + current smoker = automatic decline even for Strong Foundation. Only a NON-smoking, mild, oxygen-free, steroid-free, minimally symptomatic COPD case passes, and only on Strong Foundation.

### COPD — Advantage Plus II and Smart UL (printed p. 18)
| Qualifier | Outcome |
|---|---|
| (no qualifier — any COPD) | **DECLINE** |

### Your Term — COPD
The 04/26 table splits the COPD row only into "(Strong Foundation)" and "(Advantage Plus II and Smart UL)"; **Your Term is not named in either row**. The older 8/17 guide (which covered Your Term) declined all COPD. Engine recommendation: treat Your Term non-med COPD as **DECLINE** (consistent with the 8/17 rule and with the Advantage Plus II/Smart UL row; only Strong Foundation gets the mild-COPD carve-out).

### Related respiratory rows (printed pp. 18–19)
| Impairment | Qualifier | Outcome |
|---|---|---|
| Bronchitis | "Acute" | **ACCEPT** |
| Bronchitis | "Chronic" | **DECLINE** |
| Chronic Bronchitis | "See COPD" | **DECLINE** (listed with its own Decline) |
| Emphysema | "See COPD" | **DECLINE** (listed with its own Decline) |
| **Oxygen Use** | (any) | **DECLINE** (printed p. 20) |
| Asthma (Ages 3+, Respiratory Q) | "Mild/Moderate" | **ACCEPT** |
| Asthma | "Severe-Hospitalization" | **DECLINE** |

### Inhaler / medication rules for COPD
- The 04/26 guide has **no medications list**; med knock-outs come from the 8/17 guide (see A2) plus the Strong Foundation COPD row's own wording: "**no steroids or serious COPD medications**" required for the Accept.
- Practical engine mapping: any COPD-maintenance inhaler/drug below → fails non-med.

## A2. Medications not eligible for non-medical coverage — 503316 US (8/17), printed p. 20 (PDF p. 21). "This list is not exhaustive but includes medications that are not eligible for non-medical coverage."
| Medication | Listed indication |
|---|---|
| Atrovent | COPD |
| Combivent | COPD |
| Daliresp | COPD |
| Ipratropium Bromide | COPD |
| Spiriva | "Severe asthma or COPD" |

## A3. Older guide cross-check — 503316 US (8/17), printed p. 18 (PDF p. 19)
| Impairment | Qualifier | Outcome |
|---|---|---|
| Chronic Obstructive Lung Disease | "Emphysema or Chronic Bronchitis" | **DECLINE** (all products, no carve-out) |
| Bronchitis | "Acute" / "Chronic" | Accept / **DECLINE** |
| Oxygen Use | (any) | **DECLINE** (printed p. 19) |

→ The mild-COPD/Strong-Foundation Accept is NEW in the 04/26 guide; the 8/17 guide declined everything COPD.

## A4. Tobacco definitions that interact with COPD screening (506305 printed p. 6)
- **Strong Foundation Non-Med Non-Tobacco:** "no smoked cigarettes within the past 12 months. Allows use of cigar, pipe, chewing tobacco, nicotine patches, vape pens, marijuana and other substitutes." (So a cigar/vape user can be SF "non-tobacco" — but the COPD row's "Smoker" decline is its own gate.)
- **SMART UL, Your Term & Advantage Plus II Non-Med Non-Tobacco:** "not used any tobacco or product containing nicotine within the past 12 months. Allows use of marijuana but no vape pens (nicotine and non-nicotine vaping included)."
- Respiratory Questionnaire required for any respiratory "Yes" (printed p. 16).

---

# B) HEART / CARDIOVASCULAR

## B1. Current guide — 506305 US (04/26), printed pp. 18–20 (PDF pp. 19–21). All outcomes = Life (Non-Medical).

| Impairment | Qualifier (verbatim where given) | Outcome |
|---|---|---|
| **Heart Disease** | "Heart Attack, Myocardial Infarction, Coronary Artery Disease and Angina Pectoris" | **DECLINE** |
| Angina | "See Heart Disease" | **DECLINE** |
| Angioplasty (stent) | "See Heart Disease" | **DECLINE** |
| By-Pass Surgery | "See Heart Disease" | **DECLINE** |
| Heart Blockage | (any) | **DECLINE** |
| Artery Blockage | (any) | **DECLINE** |
| **Congestive Heart Failure** | (any) | **DECLINE** |
| Arrhythmia | (any) | **DECLINE** (covers atrial fibrillation — see B4) |
| **Pacemaker** | (any) | **DECLINE** |
| Heart Surgery/Procedure | (any) | **DECLINE** |
| Heart Valve Disease/Surgery | (any) | **DECLINE** |
| Aortic Insufficiency | (any) | **DECLINE** |
| Aortic Stenosis | (any) | **DECLINE** |
| Mitral Insufficiency | (any) | **DECLINE** |
| Mitral Stenosis | (any) | **DECLINE** |
| **Aneurysm** | (any) | **DECLINE** |
| **Stroke / CVA / TIA** (listed twice: "CVA/Stroke/TIA" p. 19 and "Stroke/CVA/TIA" p. 20) | (any) | **DECLINE** |
| Transient Ischemic Attack (TIA) | (any) | **DECLINE** |
| Peripheral Vascular or Arterial Disease (PVD, PAD) | (any) | **DECLINE** |
| Circulatory Surgery | (any) | **DECLINE** |
| Heart Murmur (Heart Murmur or Irregular Heartbeat Q) | "'innocent', no symptoms, no treatment" | **ACCEPT** |
| Other Heart Murmur | (any) | **DECLINE** |
| Blood Pressure (High Blood Pressure Q) | "Controlled" | **ACCEPT** |
| Hypertension (High Blood Pressure Q) | "Controlled" | **ACCEPT** |

Not listed by name anywhere in these documents: **cardiomyopathy** and **ICD/defibrillator**. Engine recommendation: map cardiomyopathy → decline (falls under heart disease/CHF pattern; also not an enumerated Accept), ICD → decline (pacemaker analog). Flag for underwriter call: Risk Assessment Line 1-877-622-4249 option 2 (printed p. 20).

## B2. Waiting periods / postponement — fully underwritten path (506305 printed p. 15, PDF p. 16)
Verbatim: "Some impairments will require a waiting period before being considered for life insurance. This is not a complete list:
- Cancer: one or more years.
- **Coronary Artery Disease (includes angina, heart attack, bypass surgery and angioplasty): minimum 6 months.**
- Uninvestigated symptoms, symptoms currently under investigation, until investigation is complete."
→ For MEDICAL (fully underwritten) Your Term / Advantage Plus II / SMART UL: CAD event < 6 months ago = POSTPONE; ≥ 6 months = individual consideration substandard (never non-med).

## B3. Preferred-class knockouts, fully underwritten (506305 printed pp. 7–8, PDF pp. 8–9)
Applies to Your Term, Advantage Plus II, SMART UL Medical classes:
- All of Preferred Plus NT / Preferred NT / Standard Plus NT / Tobacco Plus require **"No history of Cancer or significant health impairment"** — any cardiac history above = no preferred/standard-plus class; best case Standard or Substandard.
- Family history: "NO Death of a parent < AGE 65 due to CAD, CVD or Cancer" (Preferred Plus, Preferred, Tobacco Plus); "< AGE 60" for Standard Plus. (8/17 Your Term variant, printed p. 8: Preferred Plus & Tobacco Plus also counted **siblings**: "No Death or diagnosis of a parent or sibling < AGE 65 due to CAD, CVD or Cancer".)
- Blood pressure limits by class & age (04/26, printed pp. 7–8): Pref Plus 135/85 (18–59), 145/85 (60–69), 150/90 (70+); Preferred 140/85, 140/90, 155/90; Std Plus 145/90, 150/90, 160/90; Tobacco Plus 145/90, 150/90, 155/90. Cholesterol: Pref Plus ≤230/240/250 by age band (HDL ratio ≤5.0/4.5/4.0); Preferred ≤250/280/280 (≤5.5/6.0/6.5); Std Plus & Tobacco Plus ≤300 all ages (≤6.5/7.0/7.5). Minimum untreated cholesterol 130.
- Combination rule (printed p. 15): "Diabetes in combination with coronary artery disease (CAD), cardiovascular disease (CVD), or kidney disease" = often uninsurable.

## B4. Cardiovascular medications not eligible for non-medical coverage (503316 printed p. 20)
| Medication | Listed indication |
|---|---|
| Amiodarone HCL | Arrhythmia |
| Bidil | CHF |
| Clopidogrel | Heart Disease, Stroke/TIA, PVD/PAD |
| Plavix | Heart Disease, Stroke/TIA, PVD/PAD |
| Effient | Heart Disease, Stroke/TIA, PVD/PAD |
| Pletal | Heart Disease, Stroke/TIA, PVD/PAD |
| Digoxin | Heart Failure/Arrhythmias |
| Lanoxin | Heart Failure/Arrhythmias |
| Lasix | Heart/Liver/Kidney Disorder |
| Isosorbide | Angina |
| Nitrostat | Angina/Chest pain |
| Ranexa | Angina/Chest pain |
| Hydralazine | Severe Hypertension |
| Methyldopa | Severe Hypertension |

Atrial fibrillation: not a named row; South Carolina questionnaire is titled "Arrythmia/Atrial Fibrillation/Irregular Heartbeat Questionnaire" (506305 printed p. 17, PDF p. 18) confirming afib is handled under **Arrhythmia → DECLINE** (non-med). Chest Pain Questionnaire required for chest-pain "Yes" (printed p. 16).

## B5. Older guide cross-check (503316 printed pp. 17–19)
Identical decline set: Aneurysm, Angina, Angioplasty, Aortic Insufficiency/Stenosis, Arrhythmia, Artery Blockage, By-Pass, CHF, CVA/Stroke/TIA, Heart Blockage, Heart Disease (MI/CAD/Angina), Other Heart Murmur, Heart Surgery/Procedure, Heart Valve, Mitral Insufficiency/Stenosis, Pacemaker, PVD/PAD, TIA — all **DECLINE**; innocent murmur Accept; controlled hypertension Accept. CAD 6-month postponement identical (printed p. 15).

---

# C) CANCER

## C1. Current guide — 506305 US (04/26), printed p. 18 (PDF p. 19). Row: "Cancer — Tumor, Cyst or Cancer Q"
| Qualifier (verbatim) | Outcome (Life, Non-Medical) |
|---|---|
| "Basal Cell Carcinoma (Skin)" | **ACCEPT** |
| "Cancer with treatment completed over 10 years ago, with no recurrence, or recommended treatment" | **ACCEPT** |
| "All other cancers including Hodgkin's Lymphoma" | **DECLINE** |

Additional named rows (printed pp. 19–20):
| Impairment | Qualifier | Outcome |
|---|---|---|
| Hodgkin's Disease | (any) | **DECLINE** |
| Leukemia | (any) | **DECLINE** |
| Hysterectomy | "Non cancer" | **ACCEPT** |
| Prostate Disorder (Benign Prostate Q) | "Infection, inflammation" | **ACCEPT** |

### Skin cancer / melanoma mapping
- **Basal cell carcinoma = the ONLY skin cancer carve-out → ACCEPT** regardless of date.
- **Melanoma is not named** → falls under "All other cancers" → **DECLINE for non-med** unless treatment completed **> 10 years ago with no recurrence and no recommended treatment** (then Accept under the 10-year rule).
- **Squamous cell carcinoma is not named** → same treatment as melanoma: decline inside 10 years, accept only via the >10-year rule. (Conservative reading; only basal cell is exempted verbatim.)

### Remission window (the ONE bright-line number)
- Non-med (all four products): cancer treatment completed **> 10 years** ago + no recurrence + no recommended treatment = **ACCEPT**. Anything ≤ 10 years (or any recurrence/pending treatment) = **DECLINE** for non-med.

## C2. Fully underwritten path
- Postponement (506305 printed p. 15): "**Cancer: one or more years**" — no fully-underwritten consideration until at least 1 year post-treatment; after that, individual consideration (substandard possible if ratable ≤ Table D on the medical version).
- Preferred criteria (printed pp. 7–8): every class above Standard requires "**No history of Cancer** or significant health impairment" — any cancer history (except presumably basal cell per the impairment table) locks out Preferred Plus/Preferred/Standard Plus/Tobacco Plus for life.
- Family history: parent death < 65 (or < 60 for Std Plus) due to Cancer also breaks preferred classes (see B3).
- Tumor, Cyst or Cancer Questionnaire required for any tumor/cyst/cancer "Yes" (printed p. 16); Prostate Cancer Questionnaire exists (printed p. 17).

## C3. Cancer medications not eligible for non-medical coverage (503316 printed p. 20)
Anastrozole, Arimidex, Casodex, Femara, Hydrea, Lupron, Tamoxifen — all listed indication "Cancer." (Note: Tamoxifen/anastrozole are often taken 5–10 yrs post-remission as adjuvant therapy — active use = "recommended treatment," fails both the Accept qualifier and the Rx screen.)

## C4. Older guide cross-check (503316 printed p. 17)
Identical: Basal Cell Carcinoma (Skin) Accept; "Cancer with treatment completed over 10 years ago, with no recurrence, or recommended treatment" Accept; "All other cancers including Hodgkin's Lymphoma" Decline; Hodgkin's Disease Decline; Leukemia Decline; Hysterectomy non-cancer Accept. Cancer 1-year postponement identical (printed p. 15).

---

# Per-product outcome matrix (engine-ready summary)

Products in these docs: **Your Term (non-med & Medical), Strong Foundation (non-med only product), Advantage Plus II, SMART UL**. PlanRight (Pref/Std/Modified) and BrightFuture: **NOT COVERED — need separate source.**

| Condition | SF non-med | YT non-med | AP II / SMART UL non-med | YT / AP II / SMART UL Medical (fully UW) |
|---|---|---|---|---|
| COPD, non-smoker, mild, no O2/steroids/serious meds, ≤ minimal SOB, can climb 1 flight | ACCEPT | Decline (not carved out; conservative) | DECLINE | Individual consideration |
| COPD — smoker, or moderate/severe, or on O2/steroids/COPD meds | DECLINE | DECLINE | DECLINE | IC / likely rated-decline |
| Emphysema / Chronic bronchitis | DECLINE | DECLINE | DECLINE | IC |
| Acute bronchitis | ACCEPT | ACCEPT | ACCEPT | OK |
| Home oxygen use (any reason) | DECLINE | DECLINE | DECLINE | Decline |
| MI / CAD / angina / stent (angioplasty) / bypass | DECLINE | DECLINE | DECLINE | Postpone < 6 mo; then substandard IC; no preferred ever |
| CHF | DECLINE | DECLINE | DECLINE | IC (severe = decline) |
| Cardiomyopathy (unlisted) | treat DECLINE | treat DECLINE | treat DECLINE | IC — call Risk Assessment Line |
| Arrhythmia / Afib | DECLINE | DECLINE | DECLINE | IC (questionnaire) |
| Pacemaker (ICD: unlisted, treat same) | DECLINE | DECLINE | DECLINE | IC |
| Valve disease/surgery, aortic/mitral stenosis or insufficiency | DECLINE | DECLINE | DECLINE | IC |
| Aneurysm | DECLINE | DECLINE | DECLINE | IC |
| Stroke / CVA / TIA | DECLINE | DECLINE | DECLINE | IC |
| PVD / PAD | DECLINE | DECLINE | DECLINE | IC |
| Innocent heart murmur, no symptoms/treatment | ACCEPT | ACCEPT | ACCEPT | OK (preferred possible if all criteria met) |
| Controlled hypertension | ACCEPT | ACCEPT | ACCEPT | OK; class BP limits apply (B3) |
| Basal cell skin cancer | ACCEPT | ACCEPT | ACCEPT | OK (cancer-history preferred knockout may still apply — UW discretion) |
| Melanoma / squamous / any other cancer, treatment done > 10 yrs, no recurrence/treatment | ACCEPT | ACCEPT | ACCEPT | IC; no preferred class |
| Any other cancer ≤ 10 yrs since treatment (incl. Hodgkin's lymphoma), leukemia | DECLINE | DECLINE | DECLINE | Postpone < 1 yr; then substandard IC |
| On any listed knockout Rx (A2/B4/C3) | DECLINE (non-med) | DECLINE | DECLINE | Underlying condition governs |

Rating-worksheet note (file #1, 505049 US 07/24, p. 1 — diabetes only, kept for context): Type 2 non-med accepts oral-med/diet control only; any insulin = not eligible non-med; diabetics under 20 not eligible non-med; A1C > 8.9% or vision/nerve/kidney complications → do not proceed non-med, write fully underwritten; duration+build points total ≤ 6 may qualify for non-med. Interacts with B (diabetes + CAD/CVD = often uninsurable, 506305 printed p. 15).

Escalation: Foresters Risk Assessment Line **1-877-622-4249 option 2** (506305 printed pp. 10, 20).
