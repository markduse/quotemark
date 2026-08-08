# Transamerica FE Express Solution — Underwriting Extraction

**Sources:**
- `Transamerica_FE_Express_Solution_Agent_Guide.pdf` (28 pp, marked 07/26, doc # 3247945R11) — cited below as **AG p.X**
- `Transamerica_FE_Expr….pdf` (3 pp, agent flyer + competitive comparison, marked 04/26, doc # 3541066BKGR2) — cited as **Flyer p.X**
- `Transamerica_FE_Express_Solution_Consumer_Brochure 2.pdf` (8 pp, 07/26, doc # 3247964R6) — cited as **CB p.X**

All docs "For Agent Use Only" except CB. Product **not available in New York** (also excluded: GU, PR, VI) (AG p.4, p.28).

---

## 1. Product / tier structure

Two policies, one platform (AG p.4):

| | **Transamerica FE Express Solution** (immediate DB) | **Transamerica Graded FE Express Solution** |
|---|---|---|
| Policy form | ICC23 TPWL14IC-0123 | ICC23 TPWL15IC-0123 |
| Type | Nonparticipating whole life, matures age 121, level premiums to 121 | Same |
| Risk classes | **Select Nontobacco, Select Tobacco, Premier** (Premier NOT available in California) | **Nontobacco, Tobacco** |
| Issue ages (age last birthday) | **18–85** | **18–80** |
| Face min | **$5,000** ($10,000 minimum for Premier) | **$5,000** |
| Face max | Ages 18–75: **$100,000**; Ages 76–85: **$25,000** | All ages: **$25,000** |
| Death benefit | Guaranteed, first-day full coverage | **Graded first 2 policy years**: non-accidental death in yrs 1–2 pays **110% of premiums received** minus loan balance; accidental death and any death after yr 2 pays full face (AG p.4; CB p.5) |
| Policy fee | $42/yr | $42/yr |
| Modal factors | Annual 1.000, Monthly 0.0860 | Same |
| Payment | ACH, credit card, debit card, Social Security Direct Express Debit MasterCard | Same |
| Conversion | Not allowed | Not allowed |
| Citizenship | U.S. citizens, or green card valid ≥90 days | Same |

**Underwriting decision outcomes map to product/class:** decision chart outcomes are **Premier → Select → Graded → Decline**. "Graded" = falls to the Graded FE Express Solution product (2-yr graded DB, $25k cap). Accelerated Death Benefit Riders are NOT available on the Graded product (AG p.6).

**Rate bands** (AG pp.19–26): Band 1 $5,000–$9,999 (Select NS/Smoker only — no Premier under $10k); Band 2 $10,000–$24,999; Band 3 $25,000–$49,999 (ages 76–85 rows footnoted "Maximum face amount is $25,000"); Band 4 $50,000–$100,000 (rates end at age 75). Rate calc (AG p.27): (rate/unit × units) + $42 fee, × modal factor (monthly 0.0860). Example: Male 55, $15,000, Select NS: $57.63 × 15 = $864.45 + $42 = $906.45 × 0.0860 = **$77.95/mo**. *(Full rate tables on AG pp.19–26 — a few Band 1 male-smoker cells at ages 80/82 print as 24.34/15.64 and are obvious typos in the source; re-verify before loading rates.)*

### Underwriting process (AG pp.7–8)
- 100% instant decision; app is **never referred to an underwriter**; no invasive requirements. Personal history/lifestyle questions + **diagnostic and prescription data direct from healthcare providers** (electronic medical data ordered through Transamerica; Milliman is the data vendor — FCRAReport@milliman.com, 877-211-4816).
- Pre-qualification tool available. Application valid 60 days. Not guaranteed issue; underwriter reserves right to request additional exams/data (AG p.28).
- No tele-interview (Flyer p.2). Instant eDelivery. If approved, system tells the agent whether the insured **qualifies for MORE coverage** (upsell prompt, Flyer p.1).

### How Express differs from Immediate/Easy Solution (Flyer p.2 comparison chart)
| | FE Express | Immediate/10-Pay/Easy Solution (legacy) |
|---|---|---|
| Issue ages | 18–85 | 0–85 |
| Risk classes | Select (+Premier per AG) | Preferred, Standard |
| Min face | $5,000 | $1,000 |
| Max immediate face | $100k to 75; $25k 76–85 | $50k to 55 / $40k 56–65 / $30k 66–75 / $25k 76–85 |
| Graded max | $25,000 (GDB 2 yrs) | $25,000 (Easy: GDB 2 yrs) |
| Instant decision + instant eDelivery | Yes + Yes | Yes + No |
| Concierge funeral benefit | Yes | No |
| ADBR w/ Nursing Home | Yes (immediate DB only) | Yes (Immediate & 10-Pay) |

---

## 2. Rate-class assignment logic ("Adult personal history," AG p.9 — verbatim rules)

"Transamerica uses new underwriting rules to offer the best rate possible and **does not stack nonrelated medical conditions**."

- **PREMIER** if: favorable health characteristics, meet Premier build guidelines, and no medical, prescription, or lifestyle factors that would result in a Select, Graded, or Decline.
- **SELECT** if: medical conditions, lifestyle factors, and height/weight are ALL (rated Select) **or** they have multiple nonrelated medical conditions that are each independently (rated Select).
- **GRADED** if: one medical condition (rated Graded), height/weight are Select, and ALL lifestyle factors are Select **OR** more than one medical condition (rated Graded) that is not considered a comorbidity, or multiple nonrelated medical conditions each independently (rated Graded).
- **DECLINE** if: one medical condition or one lifestyle factor rated Decline **OR** height/weight rated Decline **OR** **more than one comorbidity**.
- Lifestyle factors = alcohol/drug use, driving record, felonies.
- Comorbidity = one or more additional co-occurring diseases/disorders complicating management. **Printed example of a comorbidity: tobacco use in combination with supplemental oxygen use.**
- Diabetes footnote (AG p.11): "Comorbidities may include heart disease, stroke, TIA, vascular disease, kidney disease, and liver disease."

---

## 3. A) COPD / emphysema / chronic bronchitis / respiratory (Adult single-condition decision chart, AG pp.10–14)

| Condition (verbatim) | Timeframe | Decision |
|---|---|---|
| COPD, emphysema, chronic bronchitis (AG p.11; duplicate row "Emphysema, COPD, chronic bronchitis" p.11) | Ever | **Select** |
| Bronchitis, chronic (AG p.10) | Ever | **Select** |
| Black lung disease (AG p.10) | Ever | **Select** |
| Oxygen, supplemental (except for temporary condition immediately following injury or medical treatment/not exceeding 3 months) (AG p.13) | <1 year | **Graded** |
| | >1 year | **Premier** |
| Sleep apnea (CPAP/treatment **without** supplemental oxygen/oxygen concentrator use) (AG p.14) | Ever | **Premier** |
| Tobacco use (AG p.14) | <1 year | **Select Tobacco** |
| | >1 year | **Premier** (i.e., nontobacco after 12 months) |
| Tracheostomy (AG p.14) | Ever | Select |
| Pulmonary fibrosis (AG p.14) | Ever | **Decline** |
| Pulmonary hypertension (AG p.14) | Ever | Select |
| Pulmonary embolism (AG p.13) | Ever | Premier |
| Sarcoidosis (AG p.14) | Ever | Premier |
| Cystic fibrosis (AG p.11) | Ever | Decline |
| Tuberculosis (AG p.14) | <1 yr Select / >1 yr Premier | |

**Key interactions:** COPD alone (any duration, any inhaler use) = Select. COPD + current supplemental O2 (O2 <1 yr) = Graded territory. **Tobacco + supplemental oxygen is the book's named comorbidity example** — more than one comorbidity = Decline (AG p.9). No inhaler-specific or nebulizer-specific rule is printed anywhere in the guide; no COPD+tobacco explicit combo row exists — combos resolve through the p.9 stacking/comorbidity logic.

---

## 4. B) Heart / cardiovascular / stroke (AG pp.10–14)

| Condition (verbatim) | Timeframe | Decision |
|---|---|---|
| Angina (heart-related chest pain) (AG p.10) | 5 years | **Premier** |
| Chest pain (AG p.10) | 5 years | Premier |
| Coronary artery disease (no heart attack, no surgery) (AG p.11) | 5 year | **Premier** |
| Heart attack, single (AG p.11) | <1 year | **Select** |
| | >1 year | **Premier** |
| Heart attacks, multiple (AG p.12) | Ever | **Select** |
| Cardiac surgery (pacemaker, stent, valvular, bypass, angioplasty, etc.) (AG p.10; duplicate row "Heart surgery (…)" p.12) | <1 year | **Select** |
| | 1–2 years | **Premier** |
| | >2 years | **Premier** |
| Pacemaker (standalone row, AG p.13) | <1 yr Select / 1–2 yrs Premier / >2 yrs Premier | |
| Defibrillator, cardiac (ICD) (AG p.11) | Ever | **Decline** |
| Congestive heart failure (CHF) (AG p.11) | Ever | **Select** |
| Cardiomyopathy (AG p.10) | Ever | **Select** |
| Atrial fibrillation (AG p.10) | 5 years | **Premier** |
| Arrhythmia, heart (AG p.10) | 5 years | Premier |
| Irregular heartbeat (AG p.12) | 5 years | Premier |
| Heart murmur (AG p.12) | Ever | Premier |
| Aortic aneurysm (AG p.10) | Ever | **Select** |
| Brain aneurysm (AG p.10) | <5 years Select / >5 years **Premier** | |
| Stroke or cerebrovascular attack (AG p.14) | <5 years | **Select** |
| | >5 years | **Premier** |
| Transient ischemic attack (TIA) or mini-stroke, single episode (AG p.14) | <5 years Select / >5 years Premier | |
| Blood clots (DVT), no complications (AG p.10) | Ever | Premier |
| Peripheral vascular/arterial disease (no amputation) (AG p.13) | Ever | **Select** |
| Peripheral vascular/arterial disease (with amputation) (AG p.13) | Ever | **Decline** |
| Hypertension, controlled (AG p.12) | Ever | Premier |
| Amputation, not due to trauma (AG p.10) | Ever | Decline |

*Chart formatting note: rows like "Angina — 5 years — Premier" print a single timeframe with a single outcome; read as history within the stated lookback still qualifying for the shown class (best-possible class for that condition). Where the source distinguishes windows it prints multiple rows (e.g., heart attack, surgery, stroke).*

Notably generous vs. competitors: CHF ever = Select (not decline); bypass/stent >1 yr = Premier; defibrillator is the only hard cardiac decline.

---

## 5. C) Cancer

### Gate rule (single-condition chart, AG p.10 — verbatim)
"Cancer (recommended course of treatment completed, no spread to lymph nodes or other organs, and no recurrence)":
- "With spread to lymph nodes or other organs, or recurrence, or cancer of multiple sites" → **Decline**
- "<2 years" → **Decline**
- ">2 years" → **See Cancer Decision chart on page 15**

### Cancer decision chart (AG p.15) — timeframe is **since last treatment**; header condition: "Recommended course of treatment completed, no spread to lymph nodes or other organs, and no recurrence"

| Cancer type | Timeframe since last treatment | Decision |
|---|---|---|
| **Breast or testicular¹ cancer** | <2 yrs | Decline |
| | 2–4 yrs ago | **Select** |
| | 4 or more years ago | **Premier** |
| **Cervical¹ or prostate cancer, or melanoma¹** | <2 yrs | Decline |
| | 2–5 yrs ago | **Select** |
| | 5 or more yrs ago | **Premier** |
| **Thyroid cancer** | <2 yrs | Decline |
| | 2 or more yrs ago | **Premier** |
| **Bladder, kidney, or colorectal cancer** | <2 yrs | Decline |
| | 2–4 yrs ago | **Graded** |
| | 4–10 yrs ago | **Select** |
| | 10 or more yrs ago | **Premier** |
| **Other types of cancer** | <2 yrs | Decline |
| | 2–4 yrs ago | **Graded** |
| | 4 or more yrs ago | **Select** (never better than Select) |

Footnote ¹ (applies to testicular, cervical, melanoma): "**Acceptable if only type of treatment was surgery (no chemotherapy, radiation, or other types of treatment)**."

Skin cancer: only **melanoma** is addressed by name (surgery-only, 2–5 yr Select / 5+ Premier). Basal/squamous non-melanoma skin cancer is not listed — treat via "Other types" or field-underwrite. Blood-cancer adjacent rows elsewhere in chart: Myelodysplastic syndrome <2 yrs Decline / 2–4 yrs Graded / >4 yrs Select (AG p.13); Myeloproliferative disorder Ever Select; Monoclonal gammopathy Ever Select (AG p.12); Amyloidosis Ever Select (AG p.10).

---

## 6. Prescription drugs that preclude coverage (AG p.17 — verbatim list)

"Proposed insureds **currently taking** any of the medications below will not be eligible for coverage with Transamerica FE Express Solution or Transamerica Graded FE Express Solution. Note: This list is not exhaustive and is subject to change at any time."

Abacavir, Acamprosate, Adlarity, Adrucil, Alimta, Antabuse, Aricept, Atazanavir, Atripla, Azathioprine, Belbuca, Bicalutamide, Biktarvy, Brixadi, Bunavail, Buprenorphine HCl, Buprenorphine HCl–Naloxone, Cabanuva, Campral, Casodex, Cellcept, Cyclosporine, Cytoxan, Disulfiram, Dolutegravir, Donepazil, Dovato, Eligard, Eloxatin, Emtriva, Envarsus, Epzicom, Erleada, Etravirine, Evotaz, Exelon, Gengraf, Genvoya, Gleevec, Imbruvica, Imnovid, Imuran, Intelence, Isentress, Juluca, Kaletra, Keytruda, Lexiva, Lupron, Lynparza, Memantine, Mycophenolate mofetil, Myfortic, Mytesi, Naltrexone, Namenda, Neoral, Neosar, Norvir, Nubeqa, Odefsey, Orgovyx, Paraplatin, Pifeltro, Pomalyst, Prezcobix, Prograf, Raltegravir, Rapamune, Revlimid, Reyataz, Rivastigmine, Rukobia, Sandimmune, Sirolimus, Sublocade, Suboxone, Subutex, Symtuza, Tabrecta, Tacrolimus, Tasigna, Thalomid, Tivicay, Triumeq, Vidaza, Vivitrol, Xtandi, Ziagen, Zubsolv, Zytiga.

**Family relevance for the quoting app:**
- **Cancer knockouts (active treatment):** chemo/targeted/immunotherapy — Adrucil, Alimta, Cytoxan, Eloxatin, Gleevec, Imbruvica, Imnovid, Keytruda, Lynparza, Neosar, Paraplatin, Pomalyst, Revlimid, Tabrecta, Tasigna, Thalomid, Vidaza; **prostate hormone therapy** — Bicalutamide, Casodex, Eligard, Erleada, Lupron, Nubeqa, Orgovyx, Xtandi, Zytiga. Current use = decline even where the chart window would otherwise pass (consistent with "last treatment" clock).
- **No COPD/respiratory meds on the list** — inhalers (Advair, Symbicort, Trelogy, Spiriva, albuterol etc.) do NOT knock out; COPD resolves through the condition chart (Select). Oxygen is the escalator, not meds.
- **No cardiac meds on the list** (no Plavix/Eliquis/Entresto etc.) — heart conditions resolve through the condition chart.
- Other families represented (for completeness): HIV antiretrovirals, Alzheimer's/dementia drugs, transplant immunosuppressants, alcohol/opioid dependence treatments.

---

## 7. Build chart (AG p.18)

BMI bands: **15.000–16.499 Graded · 16.500–18.499 Select · 18.500–42.000 Premier · 42.001–46.000 Select · 46.001–48.000 Graded · beyond Graded max weight = no coverage** ("If the build for the insured exceeds the maximum weight listed for graded, no coverage will be available"). Rate classes shown are "best possible decision for the height/weight without taking into consideration any additional medical conditions or lifestyle factors."

Weight ranges by height (lbs) — Graded-low / Select-low / Premier / Select-high / Graded-high:

| Ht | Graded lo | Select lo | Premier | Select hi | Graded hi |
|---|---|---|---|---|---|
| 4'8" | 67–75 | 76–82 | 83–187 | 188–205 | 206–214 |
| 4'9" | 70–76 | 77–85 | 86–194 | 195–212 | 213–221 |
| 4'10" | 72–78 | 79–88 | 89–201 | 202–220 | 221–229 |
| 4'11" | 75–81 | 82–91 | 92–207 | 208–227 | 228–237 |
| 5'0" | 77–84 | 85–94 | 95–215 | 216–235 | 236–245 |
| 5'1" | 80–87 | 88–97 | 98–222 | 223–243 | 244–254 |
| 5'2" | 83–90 | 91–101 | 102–229 | 230–251 | 252–262 |
| 5'3" | 85–93 | 94–104 | 105–237 | 238–259 | 260–270 |
| 5'4" | 88–96 | 97–107 | 108–244 | 245–268 | 269–279 |
| 5'5" | 91–99 | 100–111 | 112–252 | 253–276 | 277–288 |
| 5'6" | 93–102 | 103–114 | 115–260 | 261–285 | 286–297 |
| 5'7" | 96–105 | 106–118 | 119–268 | 269–293 | 294–306 |
| 5'8" | 99–108 | 109–121 | 122–276 | 277–302 | 303–315 |
| 5'9" | 102–111 | 112–125 | 126–284 | 285–311 | 312–325 |
| 5'10" | 105–114 | 115–128 | 129–292 | 293–320 | 321–334 |
| 5'11" | 108–118 | 119–132 | 133–301 | 302–329 | 330–344 |
| 6'0" | 111–121 | 122–136 | 137–309 | 310–339 | 340–353 |
| 6'1" | 114–125 | 126–140 | 141–318 | 319–348 | 349–363 |
| 6'2" | 117–128 | 129–144 | 145–327 | 328–358 | 359–373 |
| 6'3" | 121–131 | 132–148 | 149–336 | 337–368 | 369–384 |
| 6'4" | 124–135 | 136–151 | 152–345 | 346–377 | 378–394 |
| 6'5" | 127–139 | 140–156 | 157–354 | 355–387 | 388–404 |
| 6'6" | 130–142 | 143–160 | 161–363 | 364–398 | 399–415 |
| 6'7" | 134–146 | 147–164 | 165–372 | 373–408 | 409–426 |
| 6'8" | 137–150 | 151–168 | 169–382 | 383–418 | 419–436 |
| 6'9" | 140–154 | 155–172 | 173–392 | 393–429 | 430–447 |
| 6'10" | 144–157 | 158–176 | 177–401 | 402–439 | 440–459 |
| 6'11" | 147–161 | 162–181 | 182–411 | 412–450 | 451–470 |
| 7'0" | 151–165 | 166–185 | 186–421 | 422–461 | 462–481 |

---

## 8. Other decision-chart rules useful for cross-sell logic (AG pp.10–14, selected)

- Alcohol treatment: <2 yrs Decline / 2–5 yrs Select / >5 yrs Premier. Drug use: same windows.
- DWI/OWI/DUI: <2 yrs **Graded** / >2 yrs Premier. Reckless driving: <2 yrs Graded / >2 yrs Premier. Felony charges (incl. pending): <2 yrs Decline / 2–10 yrs Premier / >10 yrs Premier. Incarceration/probation/parole: currently = Decline.
- Diabetes: insulin in past 12 mo → Select; diagnosed before age 40 → Select; diagnosed >40, no insulin, no complications/comorbidities → Premier. Diabetes with complications (eye, kidney, nerve, etc.): Ever → Select.
- Chronic kidney failure or recurrent dialysis: <1 yr Graded / 1–5 yrs Select / >5 yrs Premier. Dialysis, kidney: same. (Mild-moderate insufficiency: Premier.)
- Hard declines (Ever): Alzheimer's, dementia, cognitive disorder, ALS, HIV/AIDS, Huntington's, organ transplant recipient/recommendation, sickle cell anemia, motor neuron disease, cystic fibrosis, cerebral palsy, Down syndrome, defibrillator, PVD w/ amputation, pulmonary fibrosis, Creutzfeldt-Jakob.
- Situational declines (Currently): bedridden; hospice/palliative/home healthcare/adult day care; nursing home/assisted living/LTC facility; terminal illness (≤12 mo life expectancy); memory loss <2 yrs; hospitalization 2+ times in 1 yr; pending tests/surgery/hospitalization/diagnosis/test results within 6 months.
- Wheelchair confinement (except temporary ≤3 mo): Graded. Electric scooter/cart 1 yr: Select. Cirrhosis Ever: Graded. Liver failure Ever: Graded. Hepatitis B/C: <2 yrs Select / 2–5 Premier / >5 Premier. Suicide attempt: <2 Decline / 2–5 Select / >5 Premier. Paraplegia Graded / Quadriplegia Graded. Bariatric surgery Ever: Premier. Marijuana use Ever: Premier.

---

## 9. Application knockout questions

**Not printed in any of the three PDFs.** No application-question text appears; the guide sells the decision charts + electronic Rx/diagnosis data pull as the underwriting mechanism (AG p.8). Source the actual e-app or paper app for verbatim knockout questions.

## 10. Commission notes

**No commission-reduction-by-age schedule appears in any of the three PDFs.** Only statements: "Competitive commissions are scheduled to be paid out via EFT" (Flyer p.1) and "Commission Payments: Daily, Depending on Channel" (Flyer p.2). No percentages, no age-banded reductions.

## 11. Riders & misc. (for product completeness)

- **Concierge Planning Rider / Additional Services Rider** (funeral concierge via third party — Empathy, per CB p.8): all policies, no cost, requires signed Consent to Share Information; cannot add post-issue. Not available AK, MI, OR, VA; in CA/FL/MD offered as non-rider "Concierge Planning Benefit" (AG p.5; CB p.6).
- **Accelerated Death Benefit Rider with Nursing Home Benefit** (not CA/FL); **ADBR** (FL only); **Terminal Illness ADBR** (CA only, up to 100% face if death expected within 12 months). None on Graded product. Not available if applicant needs ADL assistance at application (AG p.6).
- Expedited claims: up to $100,000 (AG p.6) / consumer brochure says up to $25,000 (CB p.7) in as fast as 72 hours — discrepancy between docs, AG is newer-audience; verify before quoting.
- Death benefit not guaranteed during contestability and suicide exclusion periods (AG p.4).
