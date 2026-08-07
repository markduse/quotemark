# Mutual of Omaha (United of Omaha) — Underwriting Rule Extraction
## COPD / Cardiovascular / Cancer condition families

**Sources:**
- **[SI]** = `618352-SI+Underwriting_0124.pdf` — "Simplified Issue Life Insurance Underwriting Guide, Term and Permanent Products," **Updated April 2026** (form 618352_0426). Covers Term Life Express (TLE), IUL Express (IULE), Living Promise Level & Graded, Children's Whole Life. 24 pages. **This is the newer, authoritative document for SI products.**
- **[UW]** = `MOO UW Guide.pdf` — "Underwriting Guidelines, Life Insurance, Brokerage," **As of January 2021** (form 417212_0121). Covers fully underwritten products (Term Life Answers, AccumUL Answers, Income Advantage IUL, Life Protection Advantage IUL), Accelerated UW program, Fit credit program, plus an older snapshot of Express products (TLE, GUL Express, IULE) and Living Promise. 52 pages.

Page numbers below are the **printed page numbers** (which match PDF page order in [UW]; in [SI], printed page N = PDF page N+3).

**Conflict note:** where [SI] (2026) and [UW] (2021) disagree on Express/Living Promise rules (face bands, diabetes age threshold, GUL Express existence), **[SI] wins** — it is 5 years newer. [UW] remains the only source for fully underwritten impairment tables.

**Important gap:** neither PDF reprints the actual application health questions. [SI] p.9 and [UW] p.6-7 only describe the *structure* (Living Promise Part One = knockout for all coverage; Part Two = Graded-only trigger; all "NO" = Level). Verbatim knockout question text must come from the state application forms themselves (e.g., ICC form for Living Promise), not these guides.

---

# 1. PRODUCT / DECISION FRAMEWORK (context for the engine)

## Living Promise (Final Expense) — [SI] p.3, p.9
- **Level Benefit:** issue ages 45–85*, $2,000–$50,000* (*may vary by state).
- **Graded Benefit:** issue ages 45–80*, $2,000–$20,000*; max combined graded coverage $25,000 ([SI] p.13).
- Decision logic ([SI] p.9, verbatim):
  - "Part One of the Underwriting section – If the proposed insured answers 'YES' to any questions in Part One, that person may not be eligible for any coverage under this application" → **DECLINE both plans**.
  - "Part Two of the Underwriting section – If proposed insured answers 'YES' to any questions in Part Two, that person is eligible only for the Graded Benefit Product" → **GRADED**.
  - "If the proposed insured answers all underwriting questions 'NO,' that person is eligible for the Level Benefit Product" → **LEVEL**.
- Underwriting tools: Simplified UW, Build Chart, MIB, Pharmaceutical Check, Medical Data Check, Random Phone Interview ([SI] p.3).

## Term Life Express / IUL Express — [SI] p.3, p.5
- Issue ages/amounts (2026): 18–50 → $25,000–$550,000; 51–60 → $25,000–$450,000; 61–75 → $25,000–$350,000. (2021 [UW] p.26 showed $300k/$250k/$150k and included GUL Express — superseded.)
- Express products are essentially **Standard-through-Table-4** shelf: "Multiple impairments resulting in a rating greater than Table 4 will be declined for our Express products" ([SI] p.5; [UW] p.30).
- **Prior-offer knockout ([SI] p.3, verbatim):** "If an individual has a previous offer from United of Omaha Life Insurance Company with a risk class greater than Table 4 or has been declined, they will not qualify for Express products."
- Tools: Simplified UW, Build Chart, MIB, Pharmaceutical Check, Medical Data Check, MVR (mandatory 18–35), phone interview as needed.

## Fully Underwritten (Term Life Answers, AccumUL Answers, Income Advantage IUL, Life Protection Advantage IUL) — [UW]
- Classes: Preferred Plus, Preferred, Standard Plus, Standard, then Table ratings (Table 1 = +25% ... Table 12 = +300%; build chart [UW] p.22-23).
- Impairment A–Z table ([UW] p.32-41) gives "general ranges for best case scenarios; final offers are dependent upon the merits of the case."
- **Fit credit program** ([UW] p.21): up to 2 table credits, ages 18–75, $100k–$5M, nontobacco, base rating Table 4 or less. **"Does not apply to 'flat extra' ratings or those with current rateable substance abuse histories, CAD prior to age 50, stroke or rateable cancers or Type 1 diabetes."** Credit factors include "Negative cardiac testing: GXT, non-imaged or imaged (stress echo, perfusion study), echocardiogram, EBCT or angiography within the past two years."
- **Accelerated UW program** ([UW] p.24): ages 18–60, $100k–$2M — the following are **"Unacceptable Medical Conditions"** (kick out of accelerated path to full UW): Atrial Fibrillation; Cancer (Except Basal Cell and Squamous Cell Carcinoma); **Chronic Obstructive Pulmonary Disease**; Heart Disease or Surgery: All Types; Melanoma; Peripheral Arterial Disease; Peripheral Vascular Disease; Stroke/TIA (also: alcohol/drug abuse, Barret's esophagus, bipolar, Crohn's, diabetes, epilepsy, gastric bypass, hepatitis, kidney disease, lupus, MS, Parkinson's, RA, sleep apnea, ulcerative colitis).

---

# 2. CONDITION FAMILY A — COPD / EMPHYSEMA / CHRONIC BRONCHITIS

## A1. Express products (TLE, IULE) — Simplified Issue
- **COPD including Chronic Bronchitis, Emphysema, or Cystic Fibrosis** is on the "Common Impairments for All Products" list — "may result in an adjusted benefit or decline of coverage" ([SI] p.6). In practice, because Express requires ≤ Table 4 best case and COPD ranges Standard–Table 8 ([UW] p.34), **anything beyond mild COPD is a likely decline; mild/well-controlled may pass at Standard Express rates**.
- **Chronic Severe Asthma = automatic decline** for Express ([UW] p.30 "Automatic Declined Impairments"). Asthma (Chronic or Severe) also on [SI] p.6 common-impairment list.
- **Tobacco interaction (knockout combo, verbatim [SI] p.5):** "Table 2 or higher build, with asthma and tobacco or nicotine use → Decline." (Same rule [UW] p.30 as "asthma and tobacco risk.")
- **Rx knockouts — TLE/IULE ([SI] p.15):** proposed insureds *currently taking* any listed med "are not eligible for Term Life Express or IUL Express coverage." COPD-relevant drugs on the list:
  - **Spiriva** (tiotropium — COPD maintenance)
  - **Daliresp** (roflumilast — severe COPD)
  - **Anoro Ellipta** (umeclidinium/vilanterol — COPD)
  - **Tudorza** (aclidinium — COPD)
  - (Adcirca — pulmonary hypertension — also listed.)
  - Implication for the engine: **any current COPD maintenance inhaler of these brands = Express decline**, even if the client calls it "just an inhaler." Ordinary asthma rescue/ICS inhalers (albuterol, Advair, Symbicort etc.) are NOT on the exclusion list.
- The list "is not an all-inclusive drug list. Additional medications or combinations of medications may be added... at the discretion of United of Omaha at any time" ([SI] p.15).

## A2. Living Promise
- COPD family is on the same all-products common-impairments list ([SI] p.6).
- **Rx rules ([SI] p.16):** proposed insureds currently taking listed meds "are not eligible for Living Promise coverage," **but meds marked with an asterisk (*) may qualify for the Graded Benefit product**:
  - **Spiriva\*** → Graded possible, Level no
  - **Daliresp\*** → Graded possible, Level no
  - **Anoro Ellipta\*** → Graded possible, Level no
  - **Tudorza\*** → Graded possible, Level no
  - Engine translation: **current COPD-maintenance therapy (these agents) = Graded at best on Living Promise; never Level.**
- Oxygen use: not explicitly addressed in either PDF (no oxygen rule text found). Standard Living Promise applications ask about oxygen use in Part One (knockout → decline), but **the verbatim question is not in these two documents** — flag as needing the state app form. Practical proxy: chronic COPD needing oxygen would rate far beyond Table 8 → decline everywhere.

## A3. Fully underwritten (Term Life Answers, AccumUL, IULs) — [UW] p.32-41 impairment table (best-case ranges)
| Condition | Qualifier | Outcome | Page |
|---|---|---|---|
| **COPD** | (no severity split given) | **Standard – Table 8** | [UW] p.34 |
| **Emphysema** | — | **Standard – Table 8** | [UW] p.35 |
| **Bronchitis** | Chronic, mild – moderate | Standard – Table 3 | [UW] p.33 |
| **Bronchitis** | Severe | Table 4 – Decline | [UW] p.33 |
| **Bronchiectasis** | Mild – moderate, no surgery | Standard – Table 6 | [UW] p.33 |
| **Bronchiectasis** | Severe – extreme, no surgery | Table 8 – Decline | [UW] p.33 |
| **Asthma** | Mild intermittent | Standard (Preferred possible per p.4: "Mild Asthma clients may be eligible for Preferred") | [UW] p.33, p.4 |
| **Asthma** | Persistent, depends on severity | (Ta)ble 2 – Decline | [UW] p.33 |
| **Asbestosis** | Mild degree of respiratory impairment | Standard – Table 4 | [UW] p.33 |
| **Asbestosis** | Severe impairment | Decline | [UW] p.33 |
| **Cor Pulmonale** | Chronic | **Decline** (COPD end-stage right-heart failure) | [UW] p.35 |
| **Pulmonary Hypertension** | — | **Decline** | [UW] p.40 |
| **Cystic Fibrosis** | — | Decline | [UW] p.35 |
| **Sarcoidosis** | Confined to lungs or skin, in remission 6 months | Standard; Other → Decline | [UW] p.40 |
| **Pulmonary Embolism** | Over 6 months | Standard – Table 4 | [UW] p.40 |
| **Pulmonary Infarction** | 6 months after single episode, full recovery | Standard – Table 4 | [UW] p.40 |
- **APS always required** for "COPD including Chronic Bronchitis or Emphysema," asthma-adjacent cystic fibrosis, etc. ([UW] p.12).
- **Accelerated UW:** COPD = unacceptable, routes to full traditional UW ([UW] p.24).
- Tobacco+COPD (fully UW): no explicit combined rule printed, but note the smoker analog under PVD (smoker = Decline) and Fit credits require nontobacco; COPD + current smoking should be modeled as at least several tables worse / frequent decline (underwriter discretion).

---

# 3. CONDITION FAMILY B — HEART & CARDIOVASCULAR

## B1. Express products (TLE, IULE)
- On the "Common Impairments for All Products" adjusted-benefit-or-decline list ([SI] p.6): **Abnormal/Irregular Heart Rhythm; Cardiomyopathy; Congestive Heart Failure (CHF); Coronary disease including heart attack or heart surgery; Defibrillator; Heart disease or surgery; Pacemaker; Peripheral Vascular Disease (PVD or PAD); Stroke or mini stroke (TIA)**.
- **Pacemaker = automatic decline** for Express ([UW] p.30 "Automatic Declined Impairments": "Pacemaker — Decline"). ([SI] 2026 lists pacemaker only among common impairments; safest engine rule for Express: decline.)
- Since best-case fully-UW ranges are: MI = Table 4+, cardiomyopathy = Table 4+, CHF = decline, and Express cuts off above Table 4 → **engine rule: any history of MI, stent, bypass, CHF, cardiomyopathy, or defibrillator ⇒ not Express-eligible (decline / route to Living Promise Graded or GI elsewhere)**. Milder findings (controlled hypertension, functional murmur, infrequent PVCs) can pass Express.
- **Hypertension combos ([SI] p.5, verbatim):** "Table 2 or higher build, with hypertension → Decline"; "Diabetes > age 45* with Peripheral Vascular Disease (PVD) → Decline" (*age 50 in CA and VI); "Table 2 or higher build, with Peripheral Vascular Disease (PVD) → Decline."
- Non-nicotine class criterion ([SI] p.4): "Blood Pressure: Treatment allowable. No hospitalization for high blood pressure in the past five (5) years."
- **Rx knockouts — TLE/IULE ([SI] p.15).** Cardiovascular drugs whose current use = not eligible:
  - **Amiodarone** (serious arrhythmia/afib)
  - **Digoxin / Digitek / Lanoxin** (CHF, afib rate control)
  - **Dobutamine Hcl** (IV inotrope — decompensated CHF)
  - **Eliquis** (apixaban), **Xarelto** (rivaroxaban) — anticoagulants (afib/DVT)
  - **Aggrenox** (aspirin/dipyridamole — stroke prevention)
  - **Ranexa** (ranolazine — chronic angina)
  - Engine translation: **current afib on amiodarone/digoxin, CHF on digoxin/inotropes, angina on Ranexa, or stroke-prevention/anticoagulant therapy with Eliquis/Xarelto/Aggrenox ⇒ Express decline.** (Plavix/warfarin are NOT on the TLE/IULE list — pharmacy check may still develop the underlying condition.)

## B2. Living Promise
- Same common-impairments list applies ([SI] p.6).
- **Rx rules ([SI] p.16)** — not eligible, except (*) = Graded possible:
  - **Amiodarone\*** → Graded at best (Level no)
  - **Ranexa\*** → Graded at best
  - **Calcium Acetate\*** (renal) → Graded at best
  - (Dobutamine not on LP list; Digoxin family moved to "additional info" — see below.)
- **"Additional Information Required" meds ([SI] p.17)** — current use does NOT auto-decline Living Promise, but reason for use must be given (underlying condition drives the health-question outcome). Cardiovascular entries: **Aggrenox, Carvedilol, Clopidogrel, Coreg, Coumadin, Digitek, Digoxin, Eliquis, Enoxaparin Sodium, Lanoxin, Lovenox, Plavix, Pradaxa, Warfarin, Xarelto** (plus Truvada, Seroquel, etc. non-cardiac).
  - Engine translation: **blood thinners and beta-blocker/CHF meds are compatible with Living Promise** (Level or Graded depends on the app's health questions, e.g. time since heart attack/stroke), whereas the same anticoagulants are outright TLE/IULE knockouts. This asymmetry matters for product routing.

## B3. Fully underwritten — impairment table ([UW] p.32-41, best-case ranges)

### Coronary / ischemic
| Condition | Qualifier | Outcome | Page |
|---|---|---|---|
| **Myocardial Infarction (Heart Attack)** | Over age 40 | **Table 4 – Decline** | p.38 (Heart Attack → "See Myocardial Infarction," p.36) |
| **Myocardial Infarction** | Age ≤ 40 (implied by "over age 40" qualifier) | Decline | p.38 |
| **Angina Pectoris** | Angina (general) | Table 2 – 8 | p.32 |
| **Angina** | Unstable, under age 40 | **Decline** | p.32 |
| **Angina** | Stable, over age 40 "(dependent on age and cath. report)" | Table 4 – 8 | p.32 |
| **Chest Pain** | Non-cardiac | Standard; Cardiac → Indiv. Consideration | p.34 |
| **CAD generally** | Class criteria: "No history of CAD" required for Preferred Plus / Preferred / Standard Plus | Best class with any CAD = **Standard with table rating** | p.18-20 |
| Fit program | "CAD prior to age 50" | **Fit credits not applicable** | p.21 |
| Quick Quote | "not recommended for clients who experience onset of coronary artery disease in their 30s" | — | p.48 |
- Stent/bypass are not separate line items; they fall under "Coronary disease including heart attack or heart surgery" (APS-always list, p.12) and the Accelerated-UW knockout "Heart Disease or Surgery: All Types" (p.24). Model as CAD/MI: Table 4 best case, ≥1 table worse typical, decline if recent/unstable.

### Heart failure / muscle
| Condition | Qualifier | Outcome | Page |
|---|---|---|---|
| **Chronic Heart Failure** | — | **Decline** | p.34 |
| **Congestive Heart Failure (Chronic)** | — | **Decline** | p.34 |
| **Heart Failure (Chronic)** | — | **Decline** | p.36 |
| **Cardiomyopathy** | — | **Table 4 – Decline** | p.34 |
| **IHSS** (hypertrophic sub-aortic stenosis) | Under age 40 → Decline; Over age 40 → Table 4 – Decline | p.37 |
| **Myocarditis** | Single attack, no complication, 2 years since resolution → Standard – Table 2; With complications → Decline | p.38 |

### Rhythm / devices
| Condition | Qualifier | Outcome | Page |
|---|---|---|---|
| **Atrial Fibrillation** | — | **Standard – Decline** (wide discretion) | p.32, p.33 |
| **Atrial Flutter** | — | Standard – Decline | p.32, p.33 |
| **PVCs** | Infrequent → Standard; Multiple → Standard – Table 8 | p.32 |
| **Tachycardia** | No other heart disease | Standard – Table 2 | p.41 |
| **Palpitations** | — | Standard – Table 3 | p.39 |
| **Wolff-Parkinson-White** | No complications | Standard | p.41 |
| **Atrioventricular Block** | 1st – 2nd degree → Standard – Table 2; 3rd degree/complete → Table 2 – Decline | p.33 |
| **Bundle Branch Block** | Hemiblock → Standard; Right → Standard – Table 4 (p.34) / Right complete → Standard – Table 2 (p.40); Left, >1 yr from onset → Table 4 (p.34, p.37) | p.34/37/40 |
| **Cardiac Pacemaker (Artificial)** | General entry: Standard – Decline (p.34). Specific: "No other heart disease after 3 months, over age 40 → Table 2 – 4" (p.39) | p.34, p.39 |
| **Defibrillator (ICD)** | Not in FU impairment list; on SI common-impairment list ([SI] p.6). Underlying cardiomyopathy/arrest history ⇒ model as Table 4 – Decline at best, Express decline | — |
| **Bigeminy** | — | Standard – Table 8 | p.33 |
| **Accelerated UW** | Atrial Fibrillation | Unacceptable (route to full UW) | p.24 |

### Valve / structural
| Condition | Qualifier | Outcome | Page |
|---|---|---|---|
| **Heart valve disease or surgery** | APS always required | (see murmur entries) | p.12 |
| **Aortic Murmurs/Insufficiency** | — | Standard – Table 8 | p.32 |
| **Mitral Valve Murmurs** | Functional → Standard; Otherwise → Standard – Table 8 | p.38 |
| **Barlow's Syndrome** (mitral prolapse) | — | Standard – Table 3 | p.33 |
| **Bicuspid Aortic Valve** | — | Standard – Table 8 | p.33 |
| **Bacterial Endocarditis** | Normal heart & valves, recovered after 1 year | Table 2 – 4 | p.33 |
| **Endocarditis** | Normal heart & valves → Table 2; Structurally abnormal heart → Table 2 – Decline | p.35 |
| **Atrial Septal Defect** | No surgery → Standard – Decline; No residuals 6 months after surgery → Standard | p.33 |
| **Ventricular Septal Defect** | Trivial or slight, without surgery → Standard to Table 4; 3 months since surgery → Standard; With complications → Decline | p.41 |
| **Patent Ductus Arteriosus** | Unoperated → Decline; 6 months after surgery, full recovery → Standard | p.39 |
| **Pericarditis** | Single episode, full recovery | Standard | p.39 |

### Aneurysm / vascular
| Condition | Qualifier | Outcome | Page |
|---|---|---|---|
| **Aortic Aneurysm** | Unoperated → **Table 6 – Decline**; Surgery, stable 6 months → **Table 2 – 6** | p.32 |
| **Peripheral Vascular Disease** | **Nonsmoker → Standard – Table 4; Smoker → Decline** (explicit tobacco interaction) | p.39 |
| **Arteriosclerosis Obliterans** | — | Table 4 – Decline | p.32 |
| **Intermittent Claudication** | — | Table 2 – Decline | p.37 |
| **Carotid Bruits** | Asymptomatic & no other related history | Standard – Table 2 | p.34 |
| **Phlebitis** | Single episode, full recovery | Standard | p.39 |
| **Renal Artery Stenosis** | No hypertension, over 6 months | Standard – Table 3 | p.40 |

### Stroke / TIA
| Condition | Qualifier | Outcome | Page |
|---|---|---|---|
| **Stroke** | 1 year since event | **Table 4 plus flat (extra) – Decline** | p.41 |
| **Cerebrovascular Accident** | Single episode, no complications, stable 1 year → Standard – Table 8; Multiple episodes → Decline | p.34 |
| **Cerebral Embolism/Thrombosis** | Single episode, no complications, stable 1 year → Table 2 – Table 8; Multiple episodes → Decline | p.34 |
| **Transient Ischemic Attack** | Single event, over 6 months → **Table 2 – 4**; Multiple events, over 1 year → **Table 4 – 8** | p.41 |
| **AV Malformation (cerebral)** | Unoperated → Decline; Surgery, stable 6 months → Table 4 – 8 | p.32 |
| Fit program | "stroke" | Fit credits not applicable | p.21 |
| Accelerated UW | Stroke/TIA | Unacceptable (route to full UW) | p.24 |

### Blood pressure (for completeness)
- "Blood Pressure — Controlled with medication → Standard" ([UW] p.33). "Hypertension — Controlled → Standard" (p.36). Treatment allowed within Preferred classes with control: ≤140/85 Pref Plus, ≤145/90 Preferred, ≤150/90 Standard Plus (p.18-20).
- Class criteria (p.18-20): family history — Pref Plus: "No death of a parent prior to age 60 due to Cancer or Heart Disease"; Preferred: one cardiac death allowed "with good risk factors and negative cardiac work up appropriate for age group"; Standard Plus: "One death of a parent prior to age 60 due to Heart Disease" allowed. (Does not apply if insured is age 60+.)

---

# 4. CONDITION FAMILY C — CANCER

## C1. Express products (TLE, IULE)
- On the common adjusted-benefit-or-decline list ([SI] p.6): **Cancer; Melanoma; Hodgkin's Disease; Leukemia; Lymphoma; Metastatic Cancer, or recurrent cancer**.
- **Hodgkin's Disease = automatic decline for Express** ([UW] p.30).
- Since fully-UW treats "most malignancies, postponed 2–5 years → Individual Consideration" ([UW] p.34), and Express tolerates nothing above Table 4 with no postpone mechanism: **engine rule — internal cancer history inside ~2–5 years of treatment = Express decline; older, cured, low-grade history = case-by-case (risk assessment recommended); metastatic/recurrent = decline.** Basal/squamous skin cancer is benign for underwriting (see C3) and should pass Express.
- **Rx knockouts — TLE/IULE ([SI] p.15).** Oncology/chemo/adjuvant drugs whose current use = not eligible:
  - Chemo/immunotherapy: **Alkeran, Campath, Caprelsa, Casodex, Cytoxan, Droxia, Eligard, Femara, Floxuridine, Fluorouracil, Gengraf(?)**, **Hydrea, Hydroxyurea, Keytruda, Leucovorin Calcium, Methotrexate, Mitomycin, Neupogen, Opdivo, Panretin, Revlimid, Rituxan, Targretin, Teslac, Zoladex, Megestrol Acetate (Megace)**
  - Hormonal adjuvant (breast/prostate maintenance): **Arimidex, Femara, Tamoxifen, Casodex, Eligard, Zoladex**
  - Engine translation: **any current cancer treatment — including "just a pill" adjuvant hormone therapy like tamoxifen/anastrozole — is a TLE/IULE decline.**
- Multiple occurrences: "Metastatic Cancer, or recurrent cancer" explicitly listed ([SI] p.6) — treat as decline for all SI products (Level & Express); Graded per app Part One/Two timing.

## C2. Living Promise
- **Rx rules ([SI] p.16):** cancer drugs on the not-eligible list have **NO asterisk** — i.e., current use of Alkeran, Campath, Casodex, Cytoxan, Droxia, Eligard, Epivir Hbv, Femara(→ see nuance below), Floxuridine, Fluorouracil, Hydrea, Hydroxyurea, Keytruda, Leucovorin Calcium, Megace/Megestrol, Mitomycin, Neupogen, Opdivo, Panretin, Revlimid, Rituxan, Targretin, Teslac, Zoladex etc. = **not eligible for Living Promise at all (not even Graded)**.
- **BUT ([SI] p.17 "Additional Information Required"):** **Arimidex, Femara, Tamoxifen** appear on the *information-only* list for Living Promise — current use does not auto-decline; the reason/history drives the health-question outcome. (Femara appears on the p.16 exclusion list AND p.17 info list — the guide is internally inconsistent; safest engine treatment: Arimidex/Tamoxifen = answerable by health questions (typically Graded if cancer within lookback, Level if outside), Femara = flag for risk assessment.)
  - This is a meaningful routing insight: **a breast-cancer survivor on adjuvant tamoxifen/anastrozole is dead on arrival for TLE/IULE but potentially insurable on Living Promise**, with Level vs Graded decided by the application's cancer lookback questions (question text not in these PDFs).
- Metastatic/recurrent cancer ([SI] p.6 list) → decline.

## C3. Fully underwritten — impairment table ([UW] p.32-41)
| Condition | Qualifier | Outcome | Page |
|---|---|---|---|
| **Cancer (most malignancies)** | "Most malignancies, postponed 2 – 5 years" | **Individual Consideration** (i.e., postpone window of 2–5 years from treatment before any offer; then case-by-case) | p.34 |
| **Basal Cell Carcinoma** | "Maximum 4 excisions, complete resolution" | **Standard** | p.33 |
| **Basal cell & superficial squamous cell** | Allowed within Preferred classes: "No history of CAD, DM or Cancer (Basal Cell skin cancer and superficial squamous cell allowed)" | Can still make **Preferred Plus / Preferred / Standard Plus** | p.18-20 |
| **Melanoma** | "Surgery & confirmed pathology" | **Standard – Decline** (driven by depth/stage; APS mandatory) | p.38 |
| **Hodgkin's Disease** | — | Indiv. Consideration | p.36 |
| **Leukemia** | — | Indiv. Consideration | p.37 |
| **Lymphoma** | — | Indiv. Consideration | p.37 |
| **Kaposi's Sarcoma** | — | **Decline** | p.37 |
| **Seminoma** (testicular) | Over 8 years since treatment | **Standard** | p.40 |
| **Colon Polyps** | Benign → Standard; **Malignant → Indiv. Consideration** | p.34 |
| **Fibrocystic Breast Disease** | Benign | Standard | p.35 |
| **Polyps (general)** | Excised, pathology benign | Standard | p.39 |
| **Hysterectomy** | Not due to malignancy | Standard | p.37 |
| **Xeroderma Pigmentosum** | (cancer-prone genetic condition) | Usually Decline | p.41 |
- **Family history of cancer** (class criteria, p.18-20): parent death before 60 from cancer blocks Preferred Plus (and counts for Preferred unless cardiac-only allowance); "Family history qualifications do not apply... for gender specific cancers for opposite sex persons" and not at all if insured is age 60+ ([UW] p.4, p.18-20).
- **Fit program:** "rateable cancers" excluded from credits (p.21). **Accelerated UW:** Cancer (except basal/squamous) and Melanoma both unacceptable (p.24).
- **APS always required** for Cancer, Hodgkin's/Non-Hodgkin's Lymphoma, Melanoma-type histories (p.12).

---

# 5. CROSS-CUTTING RULES THE ENGINE NEEDS

1. **Express hard gate:** cumulative rating > Table 4 ⇒ decline ([SI] p.5). Any single condition whose best case is Table 4+ (MI, cardiomyopathy, stroke <1 yr, angina stable >40, aortic aneurysm unoperated, LBBB, severe bronchitis) is effectively un-writable on TLE/IULE.
2. **Prior UofO offer > Table 4 or prior decline ⇒ no Express** ([SI] p.3) — ask this in intake.
3. **Multiple-impairment combos (verbatim, [SI] p.5):** Diabetes > age 45 (50 in CA/VI) + Table 2 build → Decline; + tobacco/nicotine → Decline; + PVD → Decline; Diabetes with any complications → Decline; Table 2+ build + hypertension → Decline; Table 2+ build + asthma + tobacco → Decline; Table 2+ build + PVD → Decline. "This is not a complete list."
4. **Rx check is a real underwriting tool** on every SI product (Pharmaceutical Check listed for all, [SI] p.3): the engine should treat current meds as first-class inputs. Key asymmetries:
   - Anticoagulants (Eliquis/Xarelto) & digoxin: **decline TLE/IULE; info-only for Living Promise**.
   - COPD maintenance inhalers (Spiriva/Anoro/Tudorza/Daliresp): **decline TLE/IULE; Graded-only for Living Promise**.
   - Amiodarone, Ranexa: **decline TLE/IULE; Graded-only for Living Promise**.
   - Active chemo/adjuvant hormones: **decline TLE/IULE; decline Living Promise (both plans)** except Arimidex/Tamoxifen (info-only per p.17).
5. **Living Promise decision tree** is entirely question-driven: Part One YES → no coverage; Part Two YES → Graded; all NO → Level ([SI] p.9). Verbatim question text (time windows for heart attack/stroke/cancer, oxygen use, etc.) is **NOT in either PDF** — pull from the state application (e.g., form L5654/ICC series) before hard-coding lookback windows.
6. **No GI product exists in these guides** — Graded Benefit is the deepest safety net; Graded still has knockouts (Part One).
7. **Build interacts with impairments:** Express "Table 2 Maximum Weight (Multiple Impairments)" column ([SI] p.2 / [UW] p.28-29) — a client over the Table 2 weight cannot carry any second impairment (hypertension, PVD, asthma+tobacco, diabetes past age threshold) without decline.
8. **Fully underwritten class ceilings:** any CAD/cancer history (beyond basal/superficial squamous) caps the class at Standard (with tables); controlled BP/cholesterol alone does not ([UW] p.18-20).
9. All impairment-table outcomes are "general ranges for best case scenarios and final offers are dependent upon the merits of the case" ([UW] p.32) — surface as "likely outcome," not a guarantee.

---

# 6. VERSION / SCOPE CAVEATS
- [UW] is January 2021: its Express face bands ($300k max), GUL Express product, diabetes-age-50 combo rule, and Living Promise $40k level cap are **superseded** by [SI] April 2026 ($550k, no GULE, age 45 (50 CA/VI), $50k level cap).
- [UW] impairment tables are the only fully-underwritten condition guide available here, but are 5+ years old — fine for engine defaults, flag as "verify with current UW guide / risk assessment (ExpressRiskAssessment@mutualofomaha.com, 888-624-1173)."
- Neither document contains the application knockout questions verbatim, oxygen-use rules, nebulizer rules, or explicit remission-window numbers for Living Promise Level vs Graded (e.g., "cancer in past 2/3/4 years") — those live on the state-specific applications.
