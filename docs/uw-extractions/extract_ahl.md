# AHL (American Home Life) — Underwriting Extraction: GuideStar (GS) + Patriot Series FE (PSFE)

**Sources** (both in `Carrier UW_ Brochures/`, source workbook "UW - Diseases+RX - AHL GS+PSFE Comparison - 6.20.23.xlsx", distilled 9/10/2023):
1. `AHL - Underwriting-GSPSFE_Disease_Guide.pdf` — 29 PDF pages; **content on pages 1–5 only** (6–29 are blank grid).
2. `AHL - Underwriting-GSPSFE_RX_Guide.pdf` — 260 PDF pages; **content on pages 1–127 only** (A–Z medication list; 128–260 blank grid).

**Extraction method:** word-coordinate parsing (pdftotext -bbox) — every "X" mark was assigned to its column by x-position against the header positions (GS: L / G / Dec; PSFE: Pref / Std / Mod / Dec), cross-checked against page images. Marks are verbatim; nothing inferred.

**Tier legend**
- **AHL GS (GuideStar):** `L` = Level (immediate full benefit) | `G` = Graded | `Dec` = Decline
- **AHL PSFE (Patriot Series FE):** `Pref` = Preferred | `Std` = Standard | `Mod` = Modified | `Dec` = Decline
- `—` = **no mark present in the source row** (source sheet left the cell blank; treat as "not specified", verify with carrier)
- `Pref/Std/Mod` (multiple marks, no Dec) = accepted at all PSFE tiers / medication does not by itself knock the tier down
- `"` in Medication column = same medication as row above
- `D/T` = "diagnosed or treated" (verbatim criteria abbreviation). Some Use/Criteria text is clipped in the source PDF cells (e.g. "CHF (Congestive Heart Failu", "Heart/Stroke/TIA/Heart Atta") — clipping preserved verbatim.

---

# PART 1 — DISEASE GUIDE (Disease_Guide.pdf, content pp. 1–5)

## A) COPD / Emphysema / Chronic Bronchitis / Oxygen

| Condition | Criteria (verbatim) | GS | PSFE | Pg |
|---|---|---|---|---|
| Chronic Bronchitis | Medically diagnosed or treated within 0‐24 months | Graded | Std | 2 |
| " | Medically diagnosed or treated within 24‐36 months | Level | Std | 2 |
| " | Medically diagnosed or treated 37+ months ago | Level | Std | 2 |
| Chronic Obstructive Pulmonary Disease (COPD) | Medically diagnosed or treated within 0‐24 months | Graded | Std | 2 |
| " | Medically diagnosed or treated within 24‐36 months | Level | Std | 2 |
| " | Medically diagnosed or treated 37+ months | Level | Std | 2 |
| Emphysema | Medically diagnosed or treated within 0‐24 months | Graded | Std | 3 |
| " | Medically diagnosed or treated within 24‐36 months | Level | Std | 3 |
| " | Medically diagnosed or treated 37+ months ago | Level | Std | 3 |
| Oxygen | Ever | DECLINE | Pref ⚠ | 4 |
| " | Current Use (24 Hours/day) | DECLINE | DECLINE | 4 |
| " | Current Non 24 Hour Use ‐ Daily | DECLINE | DECLINE | 4 |
| " | Used w/in Last 6 Months (not now) | DECLINE | DECLINE | 4 |
| " | Used w/in last 12 months (not now) | DECLINE | DECLINE | 4 |
| " | Used within the past 13‐24 Mos (not now) | DECLINE | Pref | 4 |

**Reading:** GS declines oxygen use **ever**. PSFE declines current use or use within past 12 months; use that stopped 13–24 months ago (and, per the "Ever" row ⚠, presumably >24 months ago) is marked Pref. ⚠ The "Ever → PSFE Pref" mark contradicts the more specific rows below it; the specific rows should control — verify with carrier.
- The Disease Guide has **no tobacco-interaction row for COPD** (no "COPD + smoker" rule in either PDF). Tobacco appears in the RX guide only via smoking-cessation meds (Chantix, Nicorette, etc. — see Part 2). Inhaler/nebulizer impact is handled per-medication in Part 2 (e.g., albuterol for COPD 0–24 mos = Graded/—; maintenance inhalers Spiriva/Symbicort/Trelegy/Advair for COPD 0–24 mos = Graded + PSFE Std/Mod).
- Related: Asthma-only medication use is consistently **GS Level / PSFE no knock-down** in the RX guide.

## B) Heart / Cardiovascular

| Condition | Criteria (verbatim) | GS | PSFE | Pg |
|---|---|---|---|---|
| Aneurysm | Medically diagnosed or treated within 0‐12 months | Graded | Mod | 1 |
| " | Medically diagnosed or treated within 13‐24 months | Graded | Std | 1 |
| " | Medically diagnosed or treated within 25‐36 months | Level | Pref | 1 |
| " | Medically diagnosed or treated 37+ months ago | Level | Pref | 1 |
| Angina (Chest Pain) | Medically diagnosed or treated within 0‐12 months | Graded | Mod | 1 |
| " | Medically diagnosed or treated within 13‐24 months | Graded | Std | 1 |
| " | Medically diagnosed or treated within 24‐36 months | Level | Pref | 1 |
| " | Medically diagnosed or treated 37+ months ago | Level | Pref | 1 |
| Angioplasty (Stent) | Medically diagnosed or treated within 0‐12 months | Graded | Mod | 1 |
| " | Medically diagnosed or treated within 13‐24 months | Graded | Std | 1 |
| " | Medically diagnosed or treated within 24‐36 months | Level | Pref | 1 |
| " | Medically diagnosed or treated 37+ months ago | Level | Pref | 1 |
| Arrhythmia | Been medically treated or diagnosed | Level | Pref | 1 |
| Atrial Fibrillation | Been medically treated or diagnosed | Level | Pref | 1 |
| Cardiomyopathy | With Coronary Artery Disease | Graded | Mod | 2 |
| " | Medically diagnosed or treated within 0‐12 months | Graded | Mod | 2 |
| " | Medically diagnosed or treated within 13‐24 months | Graded | Std | 2 |
| " | Medically diagnosed or treated 25+ months ago | Level | Pref | 2 |
| Catheterization (Heart) | Within the past 0‐12 Mos (AS LONG AS RESULTS ARE KNOWN) | Level | — | 2 |
| " | Within the past 13‐24 Mos | Level | — | 2 |
| " | More Than 25+ Mos | Level | — | 2 |
| Circulatory Surgery | Within the past 0‐12 months | Graded | Mod | 2 |
| " | Within the past 13‐24 months | Graded | Std | 2 |
| " | Within the past 24‐36 months | Level | Pref | 2 |
| " | 37+ Months | Level | Pref | 2 |
| Congestive Heart Failure | CAD Accompanied by CHF ‐ Ever | DECLINE | DECLINE | 2 |
| " | Medically diagnosed or treated within 0‐24 months | DECLINE | DECLINE | 2 |
| " | Medically diagnosed or treated within 25+ months | DECLINE | DECLINE | 2 |
| Defibrillator | Inserted within the past 0‐12 months | DECLINE | DECLINE | 2 |
| " | Inserted within the past 13‐24 months | DECLINE | DECLINE | 2 |
| " | Inserted within the past 25‐36 months | DECLINE | DECLINE | 2 |
| " | Inserted 37+ months ago | DECLINE | DECLINE | 3 |
| Heart Attack | Within the past 0‐12 months | Graded | Mod | 3 |
| " | Within the past 13‐24 months | Graded | Std | 3 |
| " | Within the past 25‐36 months | Level | Pref | 3 |
| Heart Surgery | Within the past 0‐12 months | Graded | Mod | 3 |
| " | Within the past 13‐24 months | Graded | Std | 3 |
| " | Within the past 25‐36 months | Level | Pref | 3 |
| Pacemaker | Inserted within the past 0‐12 Mos | Level | Mod | 4 |
| " | Inserted within the past 13‐24 Mos | Level | Std | 4 |
| " | Inserted within the past 25‐36 Mos | Level | Pref | 4 |
| " | Inserted 37+ Mos Ago | Level | Pref | 4 |
| Stroke/TIA | Medically diagnosed or treated within 0‐12 months | Graded | Mod | 4 |
| " | Medically diagnosed or treated within 13‐24 months | Graded | Std | 5 |
| " | Medically diagnosed or treated within 25‐36 months | Level | Pref | 5 |
| " | Medically diagnosed or treated 37+ months | Level | Pref | 5 |

**Notes (heart):**
- No 37+-month row exists for Heart Attack or Heart Surgery (chart stops at 25–36 = Level/Pref; 37+ implicitly at least as good).
- Heart valve replacement has no dedicated disease row — it falls under Heart Surgery / Circulatory Surgery; RX guide confirms: warfarin for "Cardiac Valve Replacement" D/T 0–24 mos = GS **Level** (p.122), Coumadin same (p.29).
- Catheterization rows carry **no PSFE marks** in the source (blank) — verify.
- Related combo rule (Diabetes section, p.5): "Meds For Diabetes + Stroke, Heart attack/stent/cad or Kidney disease/PAD" → GS **DECLINE** / PSFE **Pref** ⚠ (PSFE "Pref" mark looks anomalous next to a GS decline — verify with carrier).
- CHF is an unconditional decline on both products regardless of age of diagnosis; this matches the RX guide where any med whose use is CHF (Entresto, Lasix/furosemide for CHF, digoxin for CHF, etc.) is GS Dec (PSFE usually Dec, sometimes unmarked).

## C) Cancer

| Condition | Criteria (verbatim) | GS | PSFE | Pg |
|---|---|---|---|---|
| Basal Cell Skin Cancer | Been medically treated or diagnosed | Level | Pref | 1 |
| Cancer | Recurrent Cancer ‐ Ever, Cured | DECLINE | DECLINE | 1 |
| " | Currently have cancer | DECLINE | DECLINE ⚠ | 1 |
| " | Metastatic Cancer Ever | DECLINE | DECLINE ⚠ | 1 |
| " | Medically diagnosed or treated within 0‐24 months (and cured) | Graded | DECLINE | 2 |
| " | Medically diagnosed or treated within 24‐36 months (and cured) | Graded | DECLINE | 2 |
| " | Medically diagnosed or treated 37+ months ago (and cured) | Level | Pref | 2 |
| Bone Marrow Transplant | Been medically treated | DECLINE | DECLINE | 1 |

⚠ On "Currently have cancer" and "Metastatic Cancer Ever" the source sheet has an X in **every** PSFE column (Pref, Std, Mod AND Dec) plus GS Dec — clearly a decline; recorded as DECLINE.
**Notes (cancer):**
- **Remission windows (GS):** cured <37 months = Graded; cured 37+ months = Level. **PSFE:** cured <37 months = DECLINE; 37+ months = Pref. Recurrent or metastatic ever = decline both products; currently active = decline both.
- **Skin cancer:** only **basal cell** gets the automatic Level/Pref carve-out. There is **no melanoma or squamous-cell row anywhere in either PDF** — melanoma therefore falls under the general "Cancer" rules above.
- RX guide cancer-drug pattern (see Part 2): most chemo/oncology drugs = GS "D/T 0–36 Mos = Graded, 37+ = Level"; PSFE column is either DECLINE at all durations or left unmarked, varying drug-to-drug — where unmarked, apply the disease-chart PSFE cancer rule.

## Disease-guide rows adjacent to these families (context)

| Condition | Criteria (verbatim) | GS | PSFE | Pg |
|---|---|---|---|---|
| Amputation | Amputation caused by disease W/IN 24 MONTHS | Level ⚠ | DECLINE | 1 |
| " | Amputation caused by Diabetes | DECLINE | DECLINE | 1 |
| " | Amputation caused by Accident | Level | Pref | 1 |
| Chronic Kidney Disease/Nephropathy | Medically diagnosed or treated within 0‐24 months | Graded | Mod | 2 |
| " | Medically diagnosed or treated within 25+ months | Level | Mod | 2 |
| Diabetes complications (p.5) | Nephropathy within 24 Months | DECLINE | Mod ⚠ | 5 |
| " | Nephropathy 24+ Months | DECLINE | Pref ⚠ | 5 |
| Diagnostic Testing, Surgery, Hospitalization | Recommended within the past 0‐12 Mos; has not been completed | DECLINE | DECLINE | 3 |
| " | Recommended within the past 13‐24 Moss; has not been | Level | Pref | 3 |
| " | 25+ Mo | Level | Pref | 3 |

⚠ = mark pattern looks internally inconsistent in the source sheet (GS Level for disease-caused amputation vs PSFE decline; GS decline for diabetic nephropathy vs the CKD rows above; PSFE Pref/Mod against a GS decline). Extracted verbatim — confirm with AHL before hard-coding.

---

# PART 2 — RX GUIDE (RX_Guide.pdf, content pp. 1–127)

Medication → underwriting outcome, filtered to every med whose "Common Uses" touches the three families (all rows of each matching med kept, including its benign uses, since the outcome depends on the use/condition, not the drug alone). 1,015 medications, 2,956 rows. Fam column: **R** = respiratory (COPD/emphysema/chronic bronchitis/asthma/pulmonary), **H** = heart/cardiovascular/stroke, **C** = cancer, **·** = other use of the same med (context).

**Quick reference — frequently seen meds:**
- **Nitrates** (Nitrostat, Nitro-bid, Nitro-dur, NitroMist, GoNitro, Imdur, isosorbide): Angina/CAD D/T 0–24 mos → GS Graded (PSFE Mod on "Angina (Chest Pain)" rows); 24–36 mos → GS Level; CHF use → GS DECLINE. (pp. 52, 56, 79–80)
- **Entresto** (CHF): GS DECLINE / PSFE DECLINE; "Any Condition" row: GS Dec, PSFE Std/Mod ⚠ (p. 43)
- **Furosemide/Lasix**: CHF use → GS DECLINE / PSFE DECLINE; Kidney Disease D/T 0–24 → Graded/Mod; Hypertension → Level (pp. 49–50, 64)
- **Eliquis**: Afib → Level + Pref/Std/Mod; Blood Clot/Heart Attack/Stroke D/T 0–24 → Graded, 25–36 → Level; Circulatory Disease w/Diabetes → PSFE Pref/Std/Mod/Dec ⚠all-marked (p. 41). Same shape for Coumadin/Warfarin (pp. 29, 122), Xarelto (p. 123), Plavix/Brilinta (pp. 19, 90).
- **Home oxygen** is not an RX-guide entry — use the Disease Guide "Oxygen" rules (Part 1A).
- **Tamoxifen**: Breast Cancer D/T 24–36 mos → GS Level (0–24 row unmarked); Cancer D/T 37+ → Level (p. 107)
- **Chemo drugs** (typical pattern): GS: D/T 0–36 Mos → Graded, D/T 37+ Mos → Level; PSFE: DECLINE at all durations **or** unmarked, drug-by-drug.
- **Smoking cessation** (all "D/T 0-12 Mos/Smoker R…" — clipped, likely "Smoker Rates"): Chantix (p.25), Habitrol patch (p.52), "Nicodern, Nicontine Lozenge/Gum" [sic] (p.78), Varenicline (p.118), Zyban (p.126) → all GS Level, no PSFE mark. Cessation meds within 12 months = smoker rates, not a decline.

**Full table:**

| Medication | Use (verbatim) | Criteria (verbatim) | GS | PSFE | Fam | Pg |
|---|---|---|---|---|---|---|
| Abarelix | Cancer | D/T 0‐24 Mos | — | — | C | 1 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 1 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 1 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 1 |
| Abciximab | Heart/Stroke/TIA/Heart Atta | D/T 0‐24 Mos | Graded | — | H | 1 |
| " | Heart/Stroke/TIA/Heart Atta | D/T 25‐36 Mos | Level | — | H | 1 |
| Abemaciclib | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 1 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 1 |
| " | Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 1 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 1 |
| Abiraterone | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 1 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 1 |
| " | Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 1 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 1 |
| Abitrexate/Methotrexate | Cancer | D/T 0‐24 Mos | — | — | C | 1 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 1 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 1 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 1 |
| " | Rheumatoid Arthritis |  | Level | — | · | 1 |
| Abraxane/Paclitaxel | Cancer | D/T 0‐24 Mos | — | — | C | 1 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 1 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 1 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 1 |
| Abstral | Cancer/Pain | D/T 0‐24 Mos | Graded | DECLINE | C | 1 |
| " | Cancer/Pain | D/T 25‐36 Mos | Level | DECLINE | C | 1 |
| " | Cancer/Pain | D/T 37+ Mos | Level | DECLINE | C | 1 |
| " | Any Condition |  | Level | Pref/Std/Mod | · | 1 |
| Acalabrutinib | non‐Hodgkin lymphoma | D/T 0‐24 Mos | DECLINE | — | C | 1 |
| " | non‐Hodgkin lymphoma | D/T 25‐36 Mos | DECLINE | — | C | 1 |
| " | non‐Hodgkin lymphoma | D/T 37+ Mos | DECLINE | — | C | 2 |
| Accuneb/Albuterol | Asthma |  | Level | — | R | 2 |
| " | COPD/Emphysema/Chronic | D/T 0‐12 Mos | Graded | — | R | 2 |
| " | COPD/Emphysema/Chronic | D/T 13‐24 Mos | Graded | — | R | 2 |
| " | COPD/Emphysema/Chronic | D/T 25‐36 Mos | Level | — | R | 2 |
| " | COPD/Emphysema/Chronic | D/T 37+ Mos | Level | — | R | 2 |
| Accupril | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 2 |
| " | Hypertension |  | Level | — | · | 2 |
| Accuretic | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 2 |
| " | Hypertension |  | Level | — | · | 2 |
| Acebutolol | Congestive Heart Failure/An | D/T 0‐24 Mos | DECLINE | — | H | 2 |
| " | Hypertension |  | Level | — | · | 2 |
| Aceon | Heart/Stroke/TIA/Heart Att | D/T 0‐24 Mos | Graded | — | H | 2 |
| " | Heart/Stroke/TIA/Heart Att | D/T 25‐36 Mos | Level | — | H | 2 |
| " | CHF (Congestive Heart Failure) |  | DECLINE | DECLINE | H | 2 |
| " | Hypertension |  | Level | — | · | 2 |
| Acetyl L‐Carnitine | Alzheimer's/Dementia |  | DECLINE | — | H | 2 |
| Acetylcysteine | Asthma |  | Level | — | R | 2 |
| " | COPD/Emphysema/Chronic | D/T 0‐12 Mos | Graded | — | R | 2 |
| " | COPD/Emphysema/Chronic | D/T 13‐24 Mos | Graded | — | R | 2 |
| " | COPD/Emphysema/Chronic | D/T 25+ Mos | Graded | — | R | 2 |
| Aclasta | Internal Cancer | D/T 0‐36 Mos | Graded | Pref/Std/Mod | C | 2 |
| " | Multiple Myeloma |  | DECLINE | Pref/Std/Mod | C | 2 |
| " | Paget's Disease |  | — | Pref/Std/Mod | · | 2 |
| Aclidinium | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | Std/Mod | R | 2 |
| " | COPD/Emphysema/Chronic | D/T 25‐36 Mos | Level | — | R | 2 |
| " | COPD/Emphysema/Chronic | D/T 37+ Mos | Level | — | R | 2 |
| Acova/Argatroban | Circulatory Surgery | With in 24 mos concurre | Level | — | H | 2 |
| " | Circulatory Surgery | 24 mos Not Concurent | Graded | — | H | 2 |
| " | Circulatory Surgery | With in 24mos | Graded | — | H | 2 |
| " | Circulatory Surgery | 24 mos + | Graded | — | H | 3 |
| Actiq | Cancer Pain |  | Level | DECLINE | C | 3 |
| " | Cancer Pain | D/T 25‐36 Mos | Level | DECLINE | C | 3 |
| " | Cancer Pain | D/T 37+ Mos | Level | DECLINE | C | 3 |
| Activase | Heart/Stroke/TIA/Heart Atta | D/T 0‐12 Mos | Graded | — | H | 3 |
| " | Heart/Stroke/TIA/Heart Atta | D/T 13‐24 Mos | Graded | — | H | 3 |
| " | Heart/Stroke/TIA/Heart Atta | D/T 25‐36 Mos | Level | — | H | 3 |
| " | Heart/Stroke/TIA/Heart Atta | D/T 37+ Mos | Level | — | H | 3 |
| Adalat | Congestive Heart Failure/An | D/T 0‐24 Mos | DECLINE | Mod | H | 3 |
| " | Hypertension |  | Level | — | · | 3 |
| Adcetris | Hodgkin Lymphoma | D/T 0‐24 Mos | — | DECLINE | C | 3 |
| " | Hodgkin Lymphoma | D/T 0‐36 Mos ‐ (AHL ‐ APS) | Graded | DECLINE | C | 3 |
| " | Hodgkin Lymphoma | D/T 25‐36 Mos | — | DECLINE | C | 3 |
| " | Hodgkin Lymphoma | D/T 37+ Mos | — | DECLINE | C | 3 |
| Ado‐Trastuzumab Emtansine | Cancer | D/T 0‐24 Mos | — | — | C | 3 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 3 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 3 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 4 |
| Adriamycin;Adriamycin PFS;Adriamy | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 4 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 4 |
| " | Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 4 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 4 |
| Adrucil | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 4 |
| " | Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 4 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 4 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 4 |
| " | Skin Cancer, Basal Cell |  | Level | DECLINE | C | 4 |
| Advair | Asthma |  | Level | Std/Mod | R | 4 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | Std/Mod | R | 4 |
| " | COPD/Emphysema/Chronic | D/T 25‐36 Mos | Level | — | R | 4 |
| " | COPD/Emphysema/Chronic | D/T 37+ Mos | Level | — | R | 4 |
| Aerolate | Asthma |  | Level | — | R | 4 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 4 |
| " | COPD/Emphysema/Chronic | D/T 25‐36 Mos | Level | — | R | 4 |
| " | COPD/Emphysema/Chronic | D/T 25+ Mos | Graded | — | R | 4 |
| Afatinib ;Afatinib Dimaleate | Cancer | D/T 0‐24 Mos | — | — | C | 4 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 4 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 4 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 4 |
| Afeditab;Afeditab CR | Heart Condition | D/T 0‐12 Mos | Graded | — | H | 4 |
| " | Heart Condition | D/T 13‐24 Mos | Graded | — | H | 4 |
| " | Heart Condition | D/T 25‐36 Mos | Level | — | H | 4 |
| " | Heart Condition | D/T 37+ Mos | Level | — | H | 4 |
| " | Hypertension |  | Level | — | · | 4 |
| Afinitor | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 4 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 4 |
| " | Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 4 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 4 |
| " | Organ Transplant | Has or has been advised to have | DECLINE | DECLINE | · | 4 |
| Aggrastat | Heart Condition | D/T 0‐12 Mos | Graded | — | H | 5 |
| " | Heart Condition | D/T 13‐24 Mos | Graded | — | H | 5 |
| " | Heart Condition | D/T 25‐36 Mos | Level | — | H | 5 |
| " | Heart Condition | D/T 37+ Mos | Level | — | H | 5 |
| Aggrenox | Blood Clot/Heart Attack/Str | D/T 0‐24 Mos | Graded | — | H | 5 |
| " | Blood Clot/Heart Attack/Str | D/T 25‐36 Mos | Level | — | H | 5 |
| " | Blood Clot/Heart Attack/Str | D/T 37+ Mos | Level | — | H | 5 |
| " | Generic Surgery |  | Level | — | · | 5 |
| Airet | Asthma |  | Level | — | R | 5 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 5 |
| Airmir | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | Std/Mod | R | 5 |
| Akynzeo | Cancer | D/T 0‐24 Mos | — | — | C | 5 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 5 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 5 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 5 |
| " | Chemo induced nausea | D/T 0‐36 Mos | DECLINE | — | C | 5 |
| Albuterol | Asthma |  | Level | Std/Mod | R | 5 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | Std/Mod | R | 5 |
| " | COPD/Emphysema/Chronic | D/T 25‐36 Mos | Level | — | R | 5 |
| " | COPD/Emphysema/Chronic | D/T 37+ Mos | Level | — | R | 5 |
| Albuterol & Ipratropium |  | D/T 0‐24 Mos | Graded | Std/Mod | · | 5 |
| " |  | D/T 25‐36 Mos | Level | — | · | 5 |
| " | COPD, Chronic Bronchitis, | D/T 37+ Mos | Level | — | R | 5 |
| Aldactazide | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 5 |
| " | Hypertension |  | Level | — | · | 5 |
| Aldactone | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 5 |
| " | Cardiomyopathy | Medically diagnosed/treated w | Graded | — | H | 5 |
| " | Cardiomyopathy | Medically diagnosed or treated w/ in 0‐12 mos | — | — | H | 5 |
| " | Cardiomyopathy | Medically diagnosed or treated w/in 13‐24 mos | — | — | H | 5 |
| " | Hypertension |  | Level | — | · | 5 |
| " | CHF (Congestive Heart Failu | D/T 0‐24 Mos | DECLINE | DECLINE | H | 5 |
| " | Edema |  | Level | — | · | 5 |
| " | Hypertension |  | Level | — | · | 6 |
| Aldesleukin | Cancer | D/T 0‐24 Mos | — | — | C | 6 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 6 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 6 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 6 |
| Alecensa | Cancer | D/T 0‐24 Mos | — | — | C | 6 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 6 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 6 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 6 |
| Alectinib | Cancer | D/T 0‐24 Mos | — | — | C | 6 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 6 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 6 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 6 |
| Alefacept | Chronic plaque psoriasis |  | Level | Pref/Std/Mod | · | 6 |
| " | Lymphatic cancer |  | DECLINE | DECLINE | C | 6 |
| Alemtuzumab | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 6 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 6 |
| " | Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 6 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 6 |
| " | Multiple Sclerosis (MS) | D/T 0‐24 Mos | Graded | Std/Mod | · | 6 |
| " | Chronic lymphocytic | leukemMedically diagnosed/treated | DECLINE | DECLINE | · | 6 |
| Alferon N | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 6 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 6 |
| " | Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 6 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 6 |
| " | Chronic HepB and HepC | D/T 0‐24 Mos | Graded | Mod | · | 6 |
| Alimta | Cancer | D/T 0‐24 Mos | — | — | C | 6 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 6 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 6 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 6 |
| Aliqopa | Cancer | D/T 0‐24 Mos | — | — | C | 6 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 6 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 6 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 6 |
| Alkeran | Multiple Myeloma | D/T 0‐24 Mos | DECLINE | DECLINE | C | 7 |
| " | Multiple Myeloma | D/T 25‐36 Mos | DECLINE | DECLINE | C | 7 |
| " | Multiple Myeloma | D/T 37+ Mos | DECLINE | DECLINE | C | 7 |
| Aloxi | Chemo induced nausea | D/T 0‐24 Mos | Graded+DECLINE | — | C | 7 |
| " | Chemo induced nausea | D/T 25‐36 Mos | Graded+DECLINE | — | C | 7 |
| " | Chemo induced nausea | D/T 37+ Mos | Level | — | C | 7 |
| Alpelisib | Cancer | D/T 0‐24 Mos | — | — | C | 7 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 7 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 7 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 7 |
| Alpha 1‐Proteinase Inhibitor | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 7 |
| Altace | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 7 |
| " | Hypertension |  | Level | — | · | 7 |
| Alteplase | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 7 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | Graded | — | H | 7 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | Level | — | H | 7 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 7 |
| Altretamine | Cancer | D/T 0‐24 Mos | — | — | C | 7 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 7 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 7 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 7 |
| Alunbrig | Cancer | D/T 0‐24 Mos | — | — | C | 7 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 7 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 7 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 7 |
| Alupent;Alupent Inhaler | Asthma |  | Level | — | R | 7 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 7 |
| Alvesco | Asthma |  | Level | — | R | 7 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 7 |
| Amevive | Severe plaque psoriasis |  | Level | Pref/Std/Mod | · | 8 |
| " | Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 8 |
| Amicar | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 8 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | Graded | — | H | 8 |
| " | Heart Condition(Stroke, TIA, | D/T 0‐24 Mos | Graded | — | H | 8 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | Level | — | H | 8 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 8 |
| Amiloride | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 8 |
| " | Hypertension |  | Level | — | · | 8 |
| Aminocaproic Acid | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 8 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | Graded | — | H | 8 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | Level | — | H | 8 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 8 |
| " | Any Condition |  | — | — | · | 8 |
| Aminophyline; Aminophyline Anhyd | Asthma |  | Level | — | R | 8 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 8 |
| Amiodarone | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 8 |
| Amlodipine | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 8 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 8 |
| " | Hypertension |  | Level | — | · | 8 |
| Amyl Nitrate | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | — | H | 9 |
| " | Angina (Chest Pain) | D/T 25‐36 Mos | Level | — | H | 9 |
| " | Angina (Chest Pain) | D/T 37+ Mos | Level | — | H | 9 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 9 |
| Anagrelide | Blood thinner | D/T 0‐24 Mos | Graded | Pref/Std/Mod | H | 9 |
| Anandron | Prostate Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 9 |
| Anastrazole | Breast Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 9 |
| " | Breast Cancer | D/T 0‐24 Mos | — | DECLINE | C | 9 |
| " | Breast Cancer | D/T 25‐36 Mos | — | DECLINE | C | 9 |
| " | Breast Cancer | D/T 36+ Mos | Level | DECLINE | C | 9 |
| Angiomax | Heart Condition(Stroke, TIA, | With in 24 mos concurrent for o | Graded | — | H | 9 |
| " | Heart Condition(Stroke, TIA, | 24 mos Not Concurent | Graded | — | H | 9 |
| " | Heart Condition(Stroke, TIA, | With in 24mos | Graded | — | H | 9 |
| " | Heart Condition(Stroke, TIA, | 24 mos + | — | — | H | 9 |
| Anoro Ellipta | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | Std/Mod | R | 9 |
| " | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | Std/Mod | R | 9 |
| Anzemet | Chemo induced nausea | D/T 0‐24 Mos | — | — | C | 9 |
| " | Chemo induced nausea | D/T 25‐36 Mos | — | — | C | 9 |
| " | Chemo induced nausea | D/T 0‐36 Mos | Graded | — | C | 9 |
| " | Chemo induced nausea | D/T 37+ Mos | Graded | — | C | 9 |
| Apalutamide | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 9 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 9 |
| " | Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 9 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 9 |
| Apixaban | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 9 |
| Aprepitant | Chemo induced nausea | D/T 0‐24 Mos | — | — | C | 9 |
| " | Chemo induced nausea | D/T 25‐36 Mos | — | — | C | 9 |
| " | Chemo induced nausea | D/T 0‐36 Mos | Graded | — | C | 9 |
| " | Chemo induced nausea | D/T 37+ Mos | Level | — | C | 9 |
| " | Other Use |  | — | — | · | 10 |
| Apresoline | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 10 |
| " | Hypertension |  | Level | — | · | 10 |
| Aquazide H | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 10 |
| " | Hypertension |  | Level | — | · | 10 |
| Aralast; Aralast NP | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 10 |
| Aranesp | Kidney Dialysis | Had or been advised to have | DECLINE | DECLINE | · | 10 |
| " | Anemia caused by renal | failure or chemotherapy | Graded+DECLINE | DECLINE | · | 10 |
| " | Renal Insufficiency/Failure | D/T 0‐24 Mos | Graded+DECLINE | DECLINE | · | 10 |
| " | Diabetic Nephropathy |  | DECLINE | DECLINE | · | 10 |
| " | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 10 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 10 |
| " | Cancer |  | — | DECLINE | C | 10 |
| " | Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 10 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 10 |
| Arcapta; Arcapta Neohaler | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 10 |
| Aredia | Cancer | D/T 0‐24 Mos | — | Pref/Std/Mod | C | 10 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 10 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 10 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 10 |
| Arformoterol | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 10 |
| Argatroban | Circulatory Surgery | With in 24 mos concurre | Level | — | H | 10 |
| " | Circulatory Surgery | 24 mos Not Concurent | Graded | — | H | 10 |
| " | Circulatory Surgery | With in 24mos | — | — | H | 10 |
| " | Circulatory Surgery | 24 mos + | Graded | — | H | 10 |
| Aricept; Aricept ODT | Alzheimer's/Dementia |  | DECLINE | DECLINE | H | 10 |
| Arimidex | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 10 |
| " | Cancer | D/T 24‐36 Mos | — | DECLINE | C | 10 |
| " | Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 11 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 11 |
| Aromasin | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 11 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 11 |
| " | Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 11 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 11 |
| Arranon | Cancer | D/T 0‐24 Mos | — | — | C | 11 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 11 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 11 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 11 |
| Arsenic Trioxide | Cancer | D/T 0‐24 Mos | — | — | C | 11 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 11 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 11 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 11 |
| Arzerra | Cancer | D/T 0‐24 Mos | — | — | C | 11 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 11 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 11 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 11 |
| Asmanex | Asthma |  | Level | — | R | 11 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 11 |
| Asparaginase | Cancer | D/T 0‐24 Mos | — | — | C | 11 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 11 |
| " | Cancer | D/T 0‐36 MoS | Graded | — | C | 11 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 11 |
| Aspirin & Dipyridmole | Pain |  | Level | — | · | 11 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 11 |
| " | Heart Condition(Stroke, TIA, | With in 24 mos concurrent for o | Graded | — | H | 11 |
| " | Heart Condition(Stroke, TIA, | 24 mos Not Concurent | Graded | — | H | 11 |
| " | Heart Condition(Stroke, TIA, | With in 24mos | — | — | H | 12 |
| " | Heart Condition(Stroke, TIA, | 24 mos + | — | — | H | 12 |
| Atacand | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 12 |
| " | Hypertension |  | Level | — | · | 12 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 12 |
| Atenolol | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 12 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 12 |
| " | Hypertension |  | Level | — | · | 12 |
| Atenolol + Blood Thinner | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 12 |
| Atezolizumab | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 12 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 12 |
| " | Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 12 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 12 |
| Atrovent | Allergies/Asthma |  | Level | — | R | 12 |
| " | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | Std/Mod | R | 12 |
| " | COPD, Chronic Bronchitis, E | D/T 25‐36 Mos | Level | — | R | 12 |
| Avalide | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 12 |
| " | Hypertension |  | Level | — | · | 13 |
| Avapro | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 13 |
| " | Hypertension |  | Level | — | · | 13 |
| " | Diabetic Nephropathy |  | DECLINE | — | · | 13 |
| " | Other Use |  | — | — | · | 13 |
| Avastin | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 13 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 13 |
| " | Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 13 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 13 |
| Avelumab | Cancer | D/T 0‐24 Mos | — | — | C | 13 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 13 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 13 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 13 |
| Axicabtagene Ciloleucel | Cancer | D/T 0‐24 Mos | — | — | C | 13 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 13 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 13 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 13 |
| Axitinib | Cancer | D/T 0‐24 Mos | — | — | C | 13 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 13 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 13 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 13 |
| Axona | Alzheimer's/Dementia |  | DECLINE | Mod | H | 13 |
| Azacitidine | Cancer | D/T 0‐24 Mos | — | — | C | 13 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 13 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 13 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 13 |
| Azedra | Cancer | D/T 0‐24 Mos | — | — | C | 14 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 14 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 14 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 14 |
| Azidothymidine | Alzheimer's/Dementia |  | DECLINE | DECLINE | H | 14 |
| Azmacort | Asthma |  | Level | — | R | 14 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 14 |
| " | COPD/Emphysema/Chronic | D/T 24‐36 Mos | Level | — | R | 14 |
| Azor | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 14 |
| " | Hypertension |  | Level | — | · | 14 |
| AZT | Alzheimer's/Dementia |  | DECLINE | — | H | 14 |
| Balversa | Bladder cancer | D/T 0‐24 Mos | — | DECLINE | C | 14 |
| " | Bladder cancer | D/T 25‐36 Mos | — | DECLINE | C | 14 |
| " | Bladder cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 14 |
| " | Bladder cancer | D/T 37+ Mos | Level | DECLINE | C | 14 |
| Bavencio | Cancer | D/T 0‐24 Mos | — | — | C | 14 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 14 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 14 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 15 |
| Baycadron | Any Condition |  | — | Pref/Std/Mod | · | 15 |
| " | Arthritis |  | Level | Pref/Std/Mod | · | 15 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 15 |
| BCG (bacillus calmette‐guerin) | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 15 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 15 |
| " | Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 15 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 15 |
| " | Tuberculosis (TB) vaccine | D/T 0‐24 Mos | Level | — | · | 15 |
| Beclovent |  |  | — | — | · | 15 |
| " | Asthma |  | Level | — | R | 15 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 15 |
| Beleodaq | Cancer | D/T 0‐24 Mos | — | — | C | 15 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 15 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 15 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 15 |
| Belinostat | Cancer | D/T 0‐24 Mos | — | — | C | 15 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 15 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 15 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 15 |
| Benazepril | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 15 |
| " | Hypertension |  | Level | — | · | 15 |
| Bendamustine & Bendamustine | HCLCancer | D/T 0‐24 Mos | — | — | C | 15 |
| " | HCLCancer | D/T 25‐36 Mos | — | — | C | 15 |
| " | HCLCancer | D/T 0‐36 Mos | Graded | — | C | 15 |
| " | HCLCancer | D/T 37+ Mos | Level | — | C | 15 |
| Bendeka | Cancer | D/T 0‐24 Mos | — | — | C | 15 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 15 |
| " | Cancer | D/T 0‐36 Mos | Level+Graded | — | C | 15 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 16 |
| Benicar | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 16 |
| " | Hypertension |  | Level | — | · | 16 |
| Besponsa | Cancer | D/T 0‐24 Mos | — | — | C | 16 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 16 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 16 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 16 |
| " | Cancer | D/T 0‐24 Mos | — | — | C | 16 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 16 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 16 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 16 |
| Betapace | Arrhythmia | Medically diagnosed/tre | Level | — | H | 16 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 16 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 16 |
| Betaxolol | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 16 |
| " | Hypertension |  | Level | — | · | 16 |
| " | Glaucoma |  | Level | — | · | 16 |
| Bevacizumab | Cancer |  | — | — | C | 16 |
| " | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 16 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 16 |
| " | Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 16 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 16 |
| Bexarotene | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 16 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 16 |
| " | Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 16 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 17 |
| Bexxar; Bexxar 131 Iodine | Cancer |  | — | — | C | 17 |
| " | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 17 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 17 |
| " | Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 17 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 17 |
| Bicalutamide | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 17 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 17 |
| " | Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 17 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 17 |
| BiDNU | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 17 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 17 |
| " | Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 17 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 17 |
| BiDil | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 17 |
| Binimetinib | Cancer | D/T 0‐24 Mos | — | — | C | 17 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 17 |
| " | Cancer | D/T 0‐36 Mos | Graded | — | C | 17 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 17 |
| Bisoprolol | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 17 |
| Bisoprolol Fumarate | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 17 |
| " | Hypertension |  | Level | — | · | 17 |
| Bivalirudin | Heart Condition(Stroke, TIA, | With in 24 mos concurrent for o | Graded | — | H | 17 |
| " | Heart Condition(Stroke, TIA, | 24 mos Not Concurent | Graded | — | H | 17 |
| " | Heart Condition(Stroke, TIA, | With in 24mos | — | — | H | 17 |
| " | Heart Condition(Stroke, TIA, | 24 mos + | Graded | — | H | 17 |
| Blenoxane | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 17 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 17 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 17 |
| Bleomycin | Cancer |  | Level+Graded+DECLINE | DECLINE | C | 17 |
| Bleomycin Sulfate | Cancer | D/T 0‐24 Mos | — | — | C | 18 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 18 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 18 |
| Blinatumomab | Cancer | D/T 0‐24 Mos | — | — | C | 18 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 18 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 18 |
| Blincyto | Cancer | D/T 0‐24 Mos | — | — | C | 18 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 18 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 18 |
| Bortezomib | Cancer | D/T 0‐24 Mos | — | — | C | 18 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 18 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 18 |
| Bosulif | Cancer | D/T 0‐24 Mos | — | — | C | 18 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 18 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 18 |
| Bosutinib | Cancer | D/T 0‐24 Mos | — | — | C | 18 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 18 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 18 |
| Braftovi | Cancer | D/T 0‐24 Mos | — | — | C | 18 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 18 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 18 |
| Braftovi + Mektovi | Cancer | D/T 0‐24 Mos | — | — | C | 18 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 18 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 18 |
| Brentuximab Vedotin | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 18 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 18 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 18 |
| Breo Ellipta | Asthma |  | Level | — | R | 18 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | — | Std/Mod | R | 18 |
| " | COPD/Emphysema/Chronic | D/T 24‐36 Mos | Level | — | R | 18 |
| Breo Ellipta 100/25 | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 18 |
| Brethine | Asthma |  | Level | — | R | 18 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 19 |
| Bricanyl | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | Std/Mod | R | 19 |
| Brigatinib | Cancer | D/T 0‐24 Mos | — | — | C | 19 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 19 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 19 |
| Brilinta | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 19 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | Graded | — | H | 19 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | — | — | H | 19 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 19 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 19 |
| " | Heart or Artery Disease | D/T 0‐24 Mos | Graded | Pref/Std/Mod | H | 19 |
| Bromocriptine | Parkinson's Disease |  | Graded | Pref/Std/Mod | · | 19 |
| " | Pituitary Tumor |  | — | — | C | 19 |
| Broncodur | Asthma |  | Level | — | R | 19 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 19 |
| Broncomar | Asthma |  | Level | — | R | 19 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 19 |
| Brodelate | Asthma |  | Level | — | R | 19 |
| " | COPD/Emphysema/Chronic |  | — | — | R | 19 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 19 |
| Bronkosol | Asthma |  | Level | — | R | 19 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 19 |
| Brovana | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 19 |
| Budesonide | Asthma |  | Level | — | R | 19 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 19 |
| Budesonide & Formotreol | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | Std/Mod | R | 19 |
| Bumel | Cancer | D/T 0‐24 Mos | — | — | C | 19 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 19 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 19 |
| Bumetanide | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 19 |
| " | Hypertension |  | Level | — | · | 19 |
| " | Edema | More than 1 mg | — | — | · | 19 |
| " | Liver Disease |  | Graded | Mod | · | 20 |
| " | Kidney Failure, Cirrhosis, | Been treated or diagnosed | DECLINE | DECLINE | · | 20 |
| " | Kidney Disease | D/T 0‐24 Mos | Graded | Mod | · | 20 |
| Bumex | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 20 |
| " | Kidney Disease | D/T 0‐24 Mos | Graded | Mod | · | 20 |
| " | Kidney Disease | D/T 25‐36 Mos | Level | — | · | 20 |
| " | Kidney Disease | D/T 37+ Mos | Level | — | · | 20 |
| " | Hypertension |  | Level | Pref/Std/Mod | · | 20 |
| Busulfan | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 20 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 20 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 20 |
| Busulfex | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 20 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 20 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 20 |
| Bystolic | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 20 |
| " | Hypertension |  | Level | — | · | 20 |
| Cabazitaxel | Cancer | D/T 0‐24 Mos | — | — | C | 20 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 20 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 20 |
| Cabometyx | Cancer | D/T 0‐24 Mos | — | — | C | 20 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 20 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 20 |
| Cabozantinib | Cancer | D/T 0‐24 Mos | — | — | C | 20 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 20 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 20 |
| Caduet | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | — | H | 20 |
| " | g ( ) |  | — | — | · | 21 |
| " | g ( ) | D/T 24‐36 Mos | Graded | — | · | 21 |
| " | High Cholesterol |  | Level | — | · | 21 |
| " | Hypertension |  | Level | — | · | 21 |
| Calan | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 21 |
| " | Cardiomyopathy | D/T 0‐24 Mos | Graded | Mod | H | 21 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 21 |
| Calan + Blood Thinner | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 21 |
| Calcium Folinate | Cancer | D/T 0‐24 Mos | — | — | C | 21 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 21 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 21 |
| Calquence | Cancer | D/T 0‐24 Mos | — | — | C | 21 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 21 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 21 |
| Campath | Leukemia | D/T 0‐24 Mos AHL ‐ Ever | DECLINE | DECLINE | C | 21 |
| " | Leukemia | D/T 25‐36 Mos | DECLINE | DECLINE | C | 21 |
| " | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 21 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 21 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 21 |
| " | Multiple Sclerosis (MS) |  | — | Pref/Std/Mod | · | 21 |
| Camptosar | Cancer | D/T 0‐24 Mos | — | — | C | 22 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 22 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 22 |
| Candesartan; Candesartan Cilexetil | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 22 |
| " | Hypertension |  | Level | — | · | 22 |
| Capecitabine | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 22 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 22 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 22 |
| Capoten | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 22 |
| " | Kidney Disease | D/T 0‐24 Mos | Graded | Pref/Std/Mod | · | 22 |
| " | Hypertension |  | Level | — | · | 22 |
| Capozide | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 22 |
| " | Hypertension |  | Level | — | · | 22 |
| Caprelsa | Cancer | D/T 0‐24 Mos | — | — | C | 22 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 22 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 22 |
| Caprylidene | Alzheimer's/Dementia |  | DECLINE | DECLINE | H | 22 |
| Captopril | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 22 |
| " | Kidney Disease | D/T 0‐24 Mos | Graded | Pref/Std/Mod | · | 22 |
| " | Hypertension |  | Level | — | · | 22 |
| Carboplatin | Cancer | D/T 0‐24 Mos | — | — | C | 23 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 23 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 23 |
| Cardioplegic | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 23 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | Graded | — | H | 23 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | Level | — | H | 23 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 23 |
| Cardioquin + Blood Thinner | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 23 |
| Cardizem | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 23 |
| " | Angina (Chest Pain) | D/T 24‐36 Mos | Level | — | H | 23 |
| " | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | — | H | 23 |
| " | Hypertension |  | Level | — | · | 23 |
| Cardoxin | Hypertension |  | Level | — | · | 23 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 23 |
| Carfilzomib | Cancer | D/T 0‐24 Mos | — | — | C | 23 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 23 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 23 |
| Carimune; Carimune Nanofiltered | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 23 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 23 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 23 |
| Carmustine | Cancer | D/T 0‐24 Mos | — | — | C | 23 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 23 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 23 |
| CaroSpir | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 23 |
| " | Liver/Kidney Disease |  | Graded | Mod | · | 23 |
| Cartia |  |  | — | — | · | 23 |
| " | Heart Condition | D/T 0‐24 Mos | Graded | — | H | 23 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 23 |
| " | Hypertension |  | Level | — | · | 23 |
| Carvedilol | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 24 |
| " | Cardiomyopathy | D/T 0‐24 Mos | Graded | Pref/Std/Mod | H | 24 |
| " | Heart Disorder |  | Graded | Pref/Std/Mod | H | 24 |
| " | Hypertension |  | Level | — | · | 24 |
| Casodex | Prostate Cancer | D/T 0‐24 Mos | — | DECLINE | C | 24 |
| " | Prostate Cancer | D/T 24‐36 Mos | — | DECLINE | C | 24 |
| " | Prostate Cancer | D/T 37+ Mos | Level | DECLINE | C | 24 |
| Ceenu | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 24 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 24 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 24 |
| Cellcept | Organ/Tissue Transplant | Has or has been advised to have | DECLINE | DECLINE | · | 24 |
| " | Lupus | D/T 0‐24 Mos | Graded | Std/Mod | · | 24 |
| " | Heart Surgery | D/T 0‐24 Mos | Graded | Pref/Std/Mod | H | 24 |
| " | Kidney/Liver Disorder |  | Graded | Pref/Std/Mod | · | 24 |
| Cerespan | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 24 |
| " | Parkinson's Disease |  | Graded | Std/Mod | · | 24 |
| Ceritinib | Cancer | D/T 0‐24 Mos | — | — | C | 24 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 24 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 24 |
| Cerubidine | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 24 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 24 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 24 |
| Cetuximab | Cancer | D/T 0‐24 Mos | — | — | C | 24 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 24 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 24 |
| Chantix | Smoking cessation | D/T 0‐12 Mos/Smoker R | Level | — | R | 25 |
| Chlorambucil | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 25 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 25 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 25 |
| Chlorothiazide | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 25 |
| " | Hypertension |  | Level | — | · | 25 |
| Chlorthalidone | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 25 |
| " | Hypertension |  | Level | — | · | 25 |
| Choledyl | Asthma |  | Level | — | R | 25 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 25 |
| Ciclesonide | Asthma |  | Level | — | R | 25 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 25 |
| Cilostazol | Circulatory Disease w/Diabetes |  | DECLINE | Std/Mod | H | 25 |
| " | Vasodilator |  | Graded | Std/Mod | · | 25 |
| CIS‐DDP | Cancer | D/T 0‐24 Mos | — | — | C | 25 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 25 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 25 |
| Cisplatin | Cancer |  | — | — | C | 25 |
| " | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 25 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 25 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 25 |
| Citicoline | Alzheimer's/Dementia |  | DECLINE | — | H | 26 |
| Cladribine | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 26 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 26 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 26 |
| " | Any Condition |  | — | Std/Mod | · | 26 |
| Clenbuterol | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 26 |
| Clofarabine | Cancer | D/T 0‐24 Mos | — | — | C | 26 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 26 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 26 |
| Clolar | Cancer | D/T 0‐24 Mos | — | — | C | 26 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 26 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 26 |
| Clonidine | Cancer Pain | D/T 0‐24 Mos | Graded | — | C | 26 |
| " | Cancer Pain | D/T 25‐36 Mos | Graded | — | C | 26 |
| " | Cancer Pain | D/T 37+ Mos | Level | — | C | 26 |
| " | Other Use |  | Level | — | · | 26 |
| Clopidogrel | Blood Clot/Heart Attack/Str | D/T 0‐24 Mos | Graded | — | H | 26 |
| " | Blood Clot/Heart Attack/Str | D/T 25‐36 Mos | Level | — | H | 26 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 26 |
| " | Heart/Artery Disease | D/T 0‐24 Mos | Graded | Pref/Std/Mod | H | 26 |
| " | PVD/PAD | D/T 0‐24 Mos | Graded | Pref/Std/Mod | H | 26 |
| " | Generic Surgery |  | Level | — | · | 26 |
| Clopidogrel (300 mg) | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 26 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | Graded | — | H | 26 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | Level | — | H | 26 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 26 |
| Cobimetinib | Cancer | D/T 0‐24 Mos | — | — | C | 27 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 27 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 27 |
| Cognex | Alzheimer's/Dementia |  | DECLINE | DECLINE | H | 27 |
| " | Any Condition |  | DECLINE | DECLINE | · | 27 |
| Cognizin | Alzheimer's/Dementia |  | DECLINE | DECLINE | H | 27 |
| Combivent; Combivent Respimat | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | Std/Mod | R | 27 |
| Combivent | Asthma |  | Level | — | R | 27 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | Std/Mod | R | 27 |
| " | COPD/Emphysema/Chronic | D/T 24‐36 Mos | Graded | — | R | 27 |
| " | COPD/Emphysema/Chronic | D/T 37+ Mos | Level | — | R | 27 |
| Cometriq | Cancer | D/T 0‐24 Mos | — | — | C | 27 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 27 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 27 |
| Copanlisib | Cancer | D/T 0‐24 Mos | — | — | C | 27 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 27 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 27 |
| Copiktra | Cancer | D/T 0‐24 Mos | — | — | C | 28 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 28 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 28 |
| Cordarone | Arrhythmia | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 28 |
| " | Any Condition |  | Level | Pref/Std/Mod | · | 28 |
| Coreg; Coreg CR | Atrial Fibrillation |  | — | Pref/Std/Mod | H | 28 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Pref/Std/Mod | H | 28 |
| " | Hypertension |  | Level | Pref/Std/Mod | · | 28 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 28 |
| " | Heart Disorder | D/T 0‐24 Mos | Graded | Pref/Std/Mod | H | 28 |
| Corgard | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 28 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | — | H | 28 |
| " | Hypertension |  | Level | — | · | 28 |
| Corlanor | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 28 |
| " | Any Condition |  | — | DECLINE | · | 28 |
| Corzide | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 28 |
| " | Hypertension |  | Level | — | · | 28 |
| Cosmegen | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 28 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 28 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 28 |
| Cotazym | Any Condition |  | — | Pref/Std/Mod | · | 28 |
| " | Cystic Fibrosis | Medically diagnosed/treated | DECLINE | DECLINE | R | 28 |
| Cotellic | Cancer | D/T 0‐24 Mos | — | — | C | 28 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 28 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 28 |
| Coumadin | Atrial Fibrillation | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 29 |
| " | Blood Clot/Heart Attack/Str | D/T 0‐24 Mos | Graded | — | H | 29 |
| " | Blood Clot/Heart Attack/Str | D/T 25‐36 Mos | Level | — | H | 29 |
| " | Cardiac Valve Replacement | D/T 0‐24 Mos | Level | — | H | 29 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 29 |
| " | Pulmonary Embolism | D/T 0‐24 Mos | Graded | — | R | 29 |
| " | Thrombosis | D/T 0‐24 Mos | Graded | — | · | 29 |
| " | Generic Surgery |  | Level | — | · | 29 |
| Covera | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 29 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 29 |
| Covera + Blood Thinner | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 29 |
| Cozaar | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 29 |
| " | Kidney Disease | D/T 0‐24 Mos | Graded | Mod | · | 29 |
| " | Hypertension |  | Level | — | · | 29 |
| Creon | Any Condition |  | — | Pref/Std/Mod | · | 29 |
| " | Cystic Fibrosis | Medically diagnosed/treated | DECLINE | DECLINE | R | 29 |
| Crizotinib | Cancer | D/T 0‐24 Mos | — | — | C | 29 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 29 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 29 |
| Cromolyn Sodium | Asthma |  | Level | — | R | 29 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 29 |
| Cyclophosphamide | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 29 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 29 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 29 |
| Cyclosporine | Heart Surgery | D/T 0‐24 Mos | Graded | DECLINE | H | 29 |
| " | Kidney/Liver Disorder |  | Graded | DECLINE | · | 29 |
| " | Any Condition |  | DECLINE | DECLINE | · | 29 |
| Cyfos | Cancer | D/T 0‐24 Mos | — | — | C | 30 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 30 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 30 |
| Cyramza | Cancer | D/T 0‐24 Mos | — | — | C | 30 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 30 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 30 |
| Cytarabine; Cytarabind Liposomal | Cancer | D/T 0‐24 Mos | — | — | C | 30 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 30 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 30 |
| Cytogam | Heart Surgery | D/T 0‐24 Mos | Graded | — | H | 30 |
| " | Kidney/Liver Disorder |  | Graded | — | · | 30 |
| Cytosar | Cancer | D/T 24‐36 Mos | — | DECLINE | C | 30 |
| Cytosar‐U | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 30 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 30 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 30 |
| Cytoxan | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 30 |
| " | Cancer | D/T 24‐36 Mos | Graded | DECLINE | C | 30 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 30 |
| " | Any Condition |  | Graded | DECLINE | · | 30 |
| " | Leukemia/Multiple Myelom | D/T 0‐24 Mos AHL ‐ Ever | DECLINE | — | C | 30 |
| " | Leukemia/Multiple Myelom | D/T 24‐36 Mos | DECLINE | — | C | 30 |
| Dabrafenib | Cancer | D/T 0‐24 Mos | — | — | C | 30 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 30 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 31 |
| Dacarbazine | Cancer | D/T 0‐24 Mos | — | — | C | 31 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 31 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 31 |
| Dacogen | Cancer | D/T 0‐24 Mos | — | — | C | 31 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 31 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 31 |
| Dacomitinib | Cancer | D/T 0‐24 Mos | — | — | C | 31 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 31 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 31 |
| Dactinomycin | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 31 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 31 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 31 |
| Daliresp | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 31 |
| Dalteparin | Heart Condition(Stroke, TIA, | With in 24 mos concurrent for o | Graded | — | H | 31 |
| " | Heart Condition(Stroke, TIA, | 24 mos Not Concurent | Graded | — | H | 31 |
| " | Heart Condition(Stroke, TIA, | With in 24mos | Graded | — | H | 31 |
| " | Heart Condition(Stroke, TIA, | 24 mos + | Level | — | H | 31 |
| Daratumumab | Cancer | D/T 0‐24 Mos | — | — | C | 31 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 31 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 31 |
| Darbepoetin Alfa | Cancer | D/T 0‐24 Mos | — | Mod | C | 32 |
| " | Cancer | D/T 25‐36 Mos | Graded | Mod | C | 32 |
| " | Cancer | D/T 37+ Mos | Level | Mod | C | 32 |
| " | Kidney Disorder | D/T 0‐24 Mos | Graded | Mod | · | 32 |
| Darolutamide | Cancer | D/T 0‐24 Mos | — | — | C | 32 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 32 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 32 |
| Darzalex | Cancer | D/T 0‐24 Mos | — | — | C | 32 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 32 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 32 |
| Dasatinib | Cancer | D/T 0‐24 Mos | — | — | C | 32 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 32 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 32 |
| Daunorubicin | Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 32 |
| Daunorubicin;Daunorubicin HCL; Da | Cancer | D/T 0‐24 Mos | — | — | C | 32 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 32 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 32 |
| Daunoxome | Cancer | D/T 0‐24 Mos | — | — | C | 32 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 32 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 32 |
| Daurismo | Cancer | D/T 0‐24 Mos | — | — | C | 32 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 32 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 32 |
| Decadron | Inflammation |  | Level | Std/Mod | · | 32 |
| " | Leukemia/Multiple Myelom | D/T 0‐24 Mos AHL ‐ Ever | DECLINE | — | C | 32 |
| " | Leukemia/Multiple Myelom | D/T 24‐36 Mos | DECLINE | — | C | 32 |
| " | Any Condition |  | Level | — | · | 32 |
| Decitabine | Cancer | D/T 0‐24 Mos | — | — | C | 32 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 33 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 33 |
| Defibrotide; Defibrotide Sodium | Cancer | D/T 0‐24 Mos | — | — | C | 33 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 33 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 33 |
| Defitelio | Cancer | D/T 0‐24 Mos | — | — | C | 33 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 33 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 33 |
| Degarelix, Degarelix Acetate | Cancer | D/T 0‐24 Mos | — | — | C | 33 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 33 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 33 |
| Demadex | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 33 |
| " | Kidney Disease | D/T 0‐24 Mos | Graded | Mod | · | 33 |
| " | Liver Disease |  | Graded | DECLINE | · | 33 |
| " | Kidney Failure, Cirrhosis, Co | Been treated or diagnosed | DECLINE | DECLINE | · | 33 |
| " | Hypertension |  | Level | — | · | 33 |
| Denileukin Diftitox | Cancer | D/T 0‐24 Mos | — | — | C | 33 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 33 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 33 |
| Denosumab | Cancer | D/T 0‐24 Mos | — | — | C | 33 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 33 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 33 |
| " | Other Use |  | — | — | · | 33 |
| Depocyt | Cancer | D/T 0‐24 Mos | — | — | C | 34 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 34 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 34 |
| Depo‐Provera | Cancer | D/T 0‐24 Mos | — | — | C | 34 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 34 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 34 |
| Dexrazoxane | Cancer | D/T 0‐24 Mos | — | — | C | 34 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 34 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 34 |
| Dexamethasone | Inflammation |  | Level | — | · | 34 |
| " | Leukemia/Multiple Myelom | D/T 0‐24 Mos AHL ‐ Ever | DECLINE | — | C | 34 |
| " | Leukemia/Multiple Myelom | D/T 24‐36 Mos | DECLINE | — | C | 34 |
| Digitalis | Atrial Fibrillation | Medically diagnosed/tre | Level | — | H | 35 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 35 |
| Digitek | Atrial Fibrillation | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 35 |
| " | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 35 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 35 |
| " | Cardiomyopathy | D/T 0‐24 Mos | Graded | Mod | H | 35 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 35 |
| Digitoxin | Atrial Fibrillation | Medically diagnosed/tre | Level | — | H | 35 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 35 |
| Digox | Atrial Fibrillation, Arrhythm |  | — | — | H | 35 |
| " | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 35 |
| " | Any Condition |  | Level+Graded | Pref/Std/Mod | · | 35 |
| " | Cardiomyopathy | D/T 0‐24 Mos | Graded | Mod | H | 35 |
| " | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 35 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 35 |
| Digoxin | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | — | H | 35 |
| " | Any Condition |  | Level+Graded | Pref/Std/Mod | · | 35 |
| " | Cardiomyopathy | D/T 0‐24 Mos | Graded | Mod | H | 35 |
| " | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | — | H | 35 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 35 |
| Dilacor | Heart Condition | D/T 0‐24 Mos | Graded | — | H | 35 |
| " | Hypertension |  | Level | — | · | 35 |
| Dilatrate Sr | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 35 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | Graded | — | H | 35 |
| " | Heart Condition(Stroke, TIA, | D/T 25+ Mos | Level | — | H | 35 |
| Dilatrate | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | — | H | 36 |
| " | Angina (Chest Pain) | D/T 24‐36 Mos | Level | — | H | 36 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 36 |
| Dilor | Asthma |  | Level | — | R | 36 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 36 |
| " | COPD/Emphysema/Chronic | D/T 24‐36 Mos | Level | — | R | 36 |
| " | COPD/Emphysema/Chronic | D/T 37+ Mos | Level | — | R | 36 |
| Diltiazem | Angina (Chest Pain) | D/T 0‐24 Mos ‐ Ever Accendo | Graded | Mod | H | 36 |
| " | Angina (Chest Pain) | D/T 24‐36 Mos ‐ Ever Ac | Level | — | H | 36 |
| " | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | — | H | 36 |
| " | Hypertension |  | Level | — | · | 36 |
| Dinutuximab | Cancer | D/T 0‐24 Mos | — | — | C | 36 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 36 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 36 |
| Diovan | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 36 |
| " | Hypertension |  | Level | — | · | 36 |
| " | Any Condition |  | Level+Graded | Pref/Std/Mod | · | 36 |
| Dipyridamole | Heart Condition(Stroke, TIA, | With in 24 mos concurrent for o | Graded | — | H | 36 |
| " | Heart Condition(Stroke, TIA, | 24 mos Not Concurent | Graded | — | H | 36 |
| " | Heart Condition(Stroke, TIA, | With in 24mos | — | — | H | 36 |
| " | Heart Condition(Stroke, TIA, | 24 mos + | Level | — | H | 36 |
| Disophyramide | Cardiomyopathy | D/T 0‐24 Mos | Graded | Mod | H | 36 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 36 |
| Diuril | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 37 |
| " | Hypertension |  | Level | — | · | 37 |
| Dobutamine HCL;Dobutamine HCL/D | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 37 |
| Dobutrex | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 37 |
| Docefrez | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 37 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 37 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 37 |
| Docetaxel | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 37 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 37 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 37 |
| Dofetilide | Any Condition |  | — | Pref/Std/Mod | · | 37 |
| " | Heart or Artery Disease |  | — | Pref/Std/Mod | H | 37 |
| " | Drug Addiction | D/T 0‐24 Mos | Graded | — | · | 37 |
| Domamiodarone | Heart or Artery Disease |  | — | Pref/Std/Mod | H | 37 |
| Donepezil | Alzheimer's/Dementia |  | DECLINE | DECLINE | H | 37 |
| Dopamine | Blood Pressure Support |  | Level | — | · | 37 |
| " | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 37 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | — | — | H | 37 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | Level | — | H | 37 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 37 |
| Doxercalciferol | Kidney Dialysis | Had or been advised to have | DECLINE | — | · | 38 |
| " | CKD, Kidney Failure requiring | Dialysis, Kidney Failure Kidney Disease | DECLINE | Pref/Std/Mod | · | 38 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 38 |
| " | Liver or Kidney Disease |  | — | Mod | · | 38 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 38 |
| Doxil | Cancer | D/T 0‐24 Mos | — | — | C | 38 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 38 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 38 |
| Doxorubicin HCL; Doxorubicin | LiposoCancer | D/T 0‐24 Mos | — | DECLINE | C | 38 |
| " | LiposoCancer | D/T 25‐36 Mos | Graded | DECLINE | C | 38 |
| " | LiposoCancer | D/T 37+ Mos | Level | DECLINE | C | 38 |
| Dronabinol (Marinol, Syndros) | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 38 |
| " | Cancer | D/T 24‐36 Mos | Graded+DECLINE | DECLINE | C | 38 |
| " | Any Condition |  | Level+Graded+DECLINE | Pref/Std/Mod | · | 38 |
| Dronedarone | Any Condition |  | — | Pref/Std/Mod | · | 38 |
| " | Heart or Artery Disease |  | — | Pref/Std/Mod | H | 38 |
| Droxia | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 38 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 38 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 38 |
| " | Sickle Cell Anemia | D/T 0‐24 Mos | Graded | DECLINE | · | 38 |
| DTIC‐Come | Cancer | D/T 0‐24 Mos | — | — | C | 38 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 38 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 38 |
| Dulera | Asthma |  | Level | — | R | 38 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 38 |
| Duoneb | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 39 |
| " | COPD/Emphysema/Chronic | D/T 25‐36 Mos | Level | — | R | 39 |
| " | COPD/Emphysema/Chronic | D/T 37+ Mos | Level | — | R | 39 |
| Duraclon | Cancer | D/T 0‐24 Mos | — | — | C | 39 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 39 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 39 |
| " | Other Use |  | — | — | · | 39 |
| Durvalumab | Cancer | D/T 0‐24 Mos | — | — | C | 39 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 39 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 39 |
| Dutoprol + Blood Thinner | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 39 |
| Duvelisib | Cancer | D/T 0‐24 Mos | — | — | C | 39 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 39 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 39 |
| Dyazide | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 39 |
| " | Hypertension |  | Level | — | · | 39 |
| Dygase | Cystic Fibrosis | Medically diagnosed/treated | DECLINE | DECLINE | R | 39 |
| " | Any Condition |  | Level | Pref/Std/Mod | · | 39 |
| Dylix | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 39 |
| Dyphyline | Asthma |  | Level | — | R | 39 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 39 |
| Dyphysin | Asthma |  | Level | — | R | 39 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 39 |
| Dyrenium | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 39 |
| " | Hypertension |  | Level | — | · | 39 |
| ED‐Bron G | Asthma |  | Level | — | R | 39 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 39 |
| Edecrin | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 39 |
| " | Kidney Disease | D/T 0‐24 Mos | Graded | Mod | · | 39 |
| " | Kidney Failure, Cirrhosis | Been treated or diagnosed | DECLINE | DECLINE | · | 40 |
| " | Liver Disease |  | — | Mod | · | 40 |
| " | Hypertension |  | Level | — | · | 40 |
| Edoxaban | Any Condition |  | — | — | · | 40 |
| " | Heart or Artery Disease |  | — | Pref/Std/Mod | H | 40 |
| " | Atrial Fibrillation | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 40 |
| Effient | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | Pref/Std/Mod | H | 40 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | — | — | H | 40 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | Level | — | H | 40 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 40 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 40 |
| " | PVD/PAD | D/T 0‐24 Mos | Graded | Pref/Std/Mod | H | 40 |
| " | Stroke | D/T 0‐24 Mos | Graded | Pref/Std/Mod | H | 40 |
| Egard | Cancer | D/T 0‐24 Mos | — | — | C | 40 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 40 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 40 |
| Eliquis | Atrial Fibrillation | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 41 |
| " | Blood Clot/Heart Attack/Str | D/T 0‐24 Mos | Graded | — | H | 41 |
| " | Blood Clot/Heart Attack/Str | D/T 25‐36 Mos | Level | — | H | 41 |
| " | Generic Surgery |  | Level | — | · | 41 |
| " | Any Condition |  | Level+Graded | Pref/Std/Mod | · | 41 |
| " | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 41 |
| " | Circulatory Disease w/Diabetes |  | DECLINE | Pref/Std/Mod | H | 41 |
| Elitek | Cancer | D/T 0‐24 Mos | — | — | C | 41 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 41 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 41 |
| Elixophyllin | Asthma |  | Level | — | R | 41 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 41 |
| Ellence | Cancer | D/T 0‐24 Mos | — | — | C | 41 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 41 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 41 |
| Elotuzumab | Cancer | D/T 0‐24 Mos | — | — | C | 41 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 41 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 41 |
| Eloxatin | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 41 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 41 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 41 |
| Elspar | Cancer | D/T 0‐24 Mos | — | — | C | 41 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 41 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 41 |
| Emend | Cancer | D/T 0‐24 Mos | — | — | C | 41 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 41 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 42 |
| " | Other Use |  | — | — | · | 42 |
| Empliciti | Cancer | D/T 0‐24 Mos | — | — | C | 42 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 42 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 42 |
| Enalapril; Enalapril Maleage | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 42 |
| " | Hypertension |  | Level | — | · | 42 |
| Enalaprilat | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 42 |
| " | Hypertension |  | Level | — | · | 42 |
| Enasidenib; Enasidenib Mesylate | Cancer | D/T 0‐24 Mos | — | — | C | 42 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 42 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 42 |
| Encorafenib | Cancer | D/T 0‐24 Mos | — | — | C | 42 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 42 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 42 |
| Encorafenib + Binimetinib | Cancer | D/T 0‐24 Mos | — | — | C | 42 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 42 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 42 |
| Encron‐10 | Cystic Fibrosis | Medically diagnosed/treated | DECLINE | DECLINE | R | 42 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 42 |
| Enoxaparin | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 42 |
| Enoxaparin Sodium | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 42 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | — | — | H | 42 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | Level | — | H | 42 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 42 |
| Entrectinib | Cancer | D/T 0‐24 Mos | — | — | C | 43 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 43 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 43 |
| Entresto | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 43 |
| " | Any Condition |  | Graded | Pref/Std/Mod | · | 43 |
| Enzalutamide | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 43 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 43 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 43 |
| Epirubicin | Cancer | D/T 0‐24 Mos | — | — | C | 43 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 43 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 43 |
| Eplerenone | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 43 |
| " | Cardiomyopathy | D/T 0‐24 Mos | Graded | Mod | H | 43 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 43 |
| " | Hypertension |  | Level | — | · | 43 |
| Erbitux | Cancer | D/T 0‐24 Mos | — | — | C | 44 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 44 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 44 |
| Erdafitinib | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 44 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 44 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 44 |
| Ergamisol | Cancer | D/T 0‐24 Mos | — | — | C | 44 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 44 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 44 |
| Ergoloid Mesylates | Alzheimer's/Dementia |  | DECLINE | DECLINE | H | 44 |
| " | Any Condition |  | — | DECLINE | · | 44 |
| Eribulin | Cancer | D/T 0‐24 Mos | — | — | C | 44 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 44 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 44 |
| Erleada | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 44 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 44 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 44 |
| Erlotinib | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 44 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 44 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 44 |
| Erwinaze | Cancer | D/T 0‐24 Mos | — | — | C | 44 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 44 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 44 |
| Esidrix | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 44 |
| " | Hypertension |  | Level | — | · | 44 |
| Esmolol | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 45 |
| " | Hypertension |  | Level | — | · | 45 |
| Estramustine; Estramustine | PhosphaCancer | D/T 0‐24 Mos | — | DECLINE | C | 45 |
| " | PhosphaCancer | D/T 25‐36 Mos | Graded | DECLINE | C | 45 |
| " | PhosphaCancer | D/T 37+ Mos | Level | DECLINE | C | 45 |
| Ethacrynic Acid (Any amount) | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 45 |
| " | Kidney Disease | D/T 0‐24 Mos | Graded | Mod | · | 45 |
| " | Kidney Failure, Cirrhosis | Been treated or diagnosed | DECLINE | DECLINE | · | 45 |
| " | Liver Disease |  | — | Mod | · | 45 |
| Ethyol | Cancer | D/T 0‐24 Mos | — | — | C | 45 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 45 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 45 |
| Etopophos | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 45 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 45 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 45 |
| Etoposide | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 45 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 45 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 45 |
| Eulexin | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 45 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 45 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 46 |
| Everolimus (Afinitor) | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 46 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 46 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 46 |
| Exelon | Alzheimer's/Dementia |  | DECLINE | DECLINE | H | 46 |
| " | Any Condition |  | DECLINE | DECLINE | · | 46 |
| Exemestane | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 46 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 46 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 46 |
| Exforge | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 46 |
| " | Hypertension |  | Level | — | · | 46 |
| Fareston | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 46 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 46 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 46 |
| Farydak | Cancer | D/T 0‐24 Mos | — | — | C | 46 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 46 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 46 |
| Faslodex | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 46 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 46 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 46 |
| Femara | Breast Cancer | D/T 0‐24 Mos | — | DECLINE | C | 47 |
| " | Breast Cancer | D/T 24‐36 Mos | Level+Graded | DECLINE | C | 47 |
| " | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 47 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 47 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 47 |
| Fentanyl |  |  | — | — | · | 47 |
| " | Chronic Pain |  | Level | Pref/Std/Mod | · | 47 |
| " | Cancer | D/T 0‐36 Mos | Graded | DECLINE | C | 47 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 47 |
| Fentanyl Citrate | Cancer Pain | D/T 0‐24 Mos | Graded | — | C | 47 |
| " | Cancer Pain | D/T 25‐36 Mos | — | — | C | 47 |
| " | Cancer Pain | D/T 37+ Mos | Level | — | C | 47 |
| Fentora | Cancer Pain | D/T 0‐24 Mos | Graded | DECLINE | C | 47 |
| " | Cancer Pain | D/T 25‐36 Mos | — | DECLINE | C | 47 |
| " | Cancer Pain | D/T 37+ Mos | Level | DECLINE | C | 47 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 47 |
| Firmagon | Cancer | D/T 0‐24 Mos | — | — | C | 47 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 47 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 47 |
| Flebogamma; Flebogamma DIF | Cancer | D/T 0‐24 Mos | — | — | C | 47 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 47 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 47 |
| Flecainide | Any Condition |  | — | Pref/Std/Mod | · | 47 |
| " | Heart or Artery Disease |  | — | Pref/Std/Mod | H | 47 |
| Flonase | Allergies/Asthma |  | Level | — | R | 47 |
| Flovent; Flovent Diskus; Flovent Rota | Asthma |  | Level | — | R | 48 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 48 |
| Floxuridine | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 48 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 48 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 48 |
| fludara | Cancer | D/T 0‐24 Mos | — | — | C | 48 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 48 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 48 |
| Fludarabine Phosphate | Cancer | D/T 0‐24 Mos | — | — | C | 48 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 48 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 48 |
| Fluorouracil | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 48 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 48 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 48 |
| Fluoxymesterone | Cancer | D/T 0‐24 Mos | — | — | C | 48 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 48 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 48 |
| Flutamide | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 48 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 48 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 48 |
| Fluticasone | Allergies/Asthma |  | Level | — | R | 48 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 48 |
| Fluticasone Furoate | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 48 |
| Fluticasone & Salmeterol | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | Std/Mod | R | 48 |
| Fluticasone & Vilanterol | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | Std/Mod | R | 48 |
| Fluticasone, Umeclidiniium & | VilanteCOPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | Std/Mod | R | 48 |
| Folex PFS | Any Condition |  | — | Pref/Std/Mod | · | 48 |
| " | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 48 |
| Folotyn | Cancer | D/T 0‐24 Mos | — | — | C | 48 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 48 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 49 |
| Foradil | Asthma |  | Level | — | R | 49 |
| " | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | Std/Mod | R | 49 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | Std/Mod | R | 49 |
| Formoterol | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | Std/Mod | R | 49 |
| Fosinopril; Fosinopril Sodium | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 49 |
| " | Hypertension |  | Level | — | · | 49 |
| Fragmin | Heart Condition(Stroke, TIA, | With in 24 mos concurrent for o | Graded | — | H | 49 |
| " | Heart Condition(Stroke, TIA, | 24 mos Not Concurent | Graded | — | H | 49 |
| " | Heart Condition(Stroke, TIA, | With in 24mos | — | — | H | 49 |
| " | Heart Condition(Stroke, TIA, | 24 mos + | Level | — | H | 49 |
| FUDR | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 49 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 49 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 49 |
| Fulvestrant | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 49 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 49 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 49 |
| Furosemide | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 49 |
| " | Kidney Disease | D/T 0‐24 Mos | Graded | Mod | · | 50 |
| " | Kidney Failure, Cirrhosis | Been treated or diagnosed | DECLINE | DECLINE | · | 50 |
| " | Liver Disease |  | — | Mod | · | 50 |
| " | Hypertension |  | Level | — | · | 50 |
| Fusiley | Cancer | D/T 0‐24 Mos | — | — | C | 50 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 50 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 50 |
| Galantamine; Galantamine | HydrobroAlzheimer's/Dementia |  | DECLINE | — | H | 50 |
| Gazyva | Cancer | D/T 0‐24 Mos | — | — | C | 50 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 50 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 50 |
| Gefitinib | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 50 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 50 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 50 |
| Gemcitabine; Gemcitabine HCL | Cancer | D/T 0‐24 Mos | — | — | C | 50 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 50 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 51 |
| Gemtuzumab | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 51 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 51 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 51 |
| Gemzar | Cancer | D/T 0‐24 Mos | — | — | C | 51 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 51 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 51 |
| Gen‐Amiodarone | Heart or Artery Disease |  | — | Pref/Std/Mod | H | 51 |
| Gengraf | Heart Surgery | D/T 0‐24 Mos | — | — | H | 51 |
| " | Kidney/Liver Disorder |  | — | — | · | 51 |
| " | Any Condition |  | — | DECLINE | · | 51 |
| Gilotrif | Cancer | D/T 0‐24 Mos | — | — | C | 51 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 51 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 51 |
| Gilteritinib | Cancer | D/T 0‐24 Mos | — | — | C | 51 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 51 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 51 |
| Glasdegib | Cancer | D/T 0‐24 Mos | — | — | C | 51 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 51 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 51 |
| Glassia | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 51 |
| Gleevec | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 52 |
| " | Cancer | D/T 24‐36 Mos | Graded | DECLINE | C | 52 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 52 |
| " | Leukemia | D/T 0‐24 Mos AHL ‐ Ever | DECLINE | DECLINE | C | 52 |
| " | Leukemia | D/T 24‐36 Mos | DECLINE | DECLINE | C | 52 |
| Gliadel Wafer | Cancer | D/T 0‐24 Mos | — | — | C | 52 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 52 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 52 |
| Glycopyrrolate | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | Std/Mod | R | 52 |
| " | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | — | R | 52 |
| GoNitro | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 52 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 52 |
| Goserelin | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 52 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 52 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 52 |
| Guaifenesin; Guaifenesin‐Theophylli | Asthma |  | Level | — | R | 52 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 52 |
| Habitrol | Smoking Cessation | D/T 0‐12 Mos/Smoker R | Level | — | R | 52 |
| Halaven | Cancer | D/T 0‐24 Mos | — | — | C | 52 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 52 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 52 |
| Halotestin | Cancer | D/T 0‐24 Mos | — | — | C | 53 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 53 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 53 |
| Hemangeol | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | — | H | 53 |
| " | Hypertension |  | Level | — | · | 53 |
| Heparin | Blood Clot | D/T 0‐24 Mos | Graded | — | H | 53 |
| " | Blood Clot | D/T 25‐36 Mos | Level | — | H | 53 |
| " | Generic Surgery |  | Level | — | · | 53 |
| Herceptin | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 53 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 53 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 53 |
| Hexalen | Cancer | D/T 0‐24 Mos | — | — | C | 53 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 53 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 53 |
| Hycamtin | Cancer | D/T 0‐24 Mos | — | — | C | 54 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 54 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 54 |
| Hydergine | Alzheimer's/Dementia |  | DECLINE | — | H | 54 |
| " | Any Condition |  | — | DECLINE | · | 54 |
| Hydralazine HCL | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 54 |
| " | Hypertension |  | Level | — | · | 54 |
| Hydrea | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 54 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 54 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 54 |
| Hydrochlorothiazide | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 54 |
| " | Edema |  | Level | — | · | 54 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 54 |
| Hydrochlorothiazide & Losartan | Heart Disease | D/T 0‐24 Mos | — | — | H | 54 |
| " | Hypertension |  | Level | — | · | 54 |
| HydroDIURIL | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 54 |
| " | Hypertension |  | Level | — | · | 54 |
| Hydroflumethiazide | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 54 |
| " | Hypertension |  | Level | — | · | 54 |
| Hydroxyurea | Leukemia | D/T 0‐24 Mos AHL ‐ Ever | DECLINE | DECLINE | C | 54 |
| " | Leukemia | D/T 24‐36 Mos | DECLINE | DECLINE | C | 54 |
| " | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 55 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 55 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 55 |
| " | Sickle Cell Anemia | D/T 0‐36 Mos | Level+Graded | DECLINE | · | 55 |
| " | Sickle Cell Anemia | D/T 37+ Mos | Level | DECLINE | · | 55 |
| " | Sickle Cell Anemia |  | Graded | DECLINE | · | 55 |
| Hygroton | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 55 |
| " | Hypertension |  | Level | — | · | 55 |
| Hyzaar | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 55 |
| " | Hypertension |  | Level | — | · | 55 |
| Ibrance | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 55 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 55 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 55 |
| Ibritumomab | Cancer | D/T 0‐24 Mos | — | — | C | 55 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 55 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 55 |
| Ibrutinib | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 55 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 55 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 55 |
| Iclusig | Cancer | D/T 0‐24 Mos | — | — | C | 55 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 55 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 55 |
| Idamycin PFS | Cancer | D/T 0‐24 Mos | — | — | C | 55 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 55 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 55 |
| Idarubicin; Idarubicin HCL | Cancer | D/T 0‐24 Mos | — | — | C | 55 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 55 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 55 |
| Idelalisib | Cancer | D/T 0‐24 Mos | — | — | C | 56 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 56 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 56 |
| Idhifa | Cancer | D/T 0‐24 Mos | — | — | C | 56 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 56 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 56 |
| Ifex; Ifex Mesnex Combo Pack | Cancer | D/T 0‐24 Mos | — | — | C | 56 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 56 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 56 |
| Ifosfamide; Ifosfamide‐Mesna; | IfosfaCancer | D/T 0‐24 Mos | — | — | C | 56 |
| " | IfosfaCancer | D/T 25‐36 Mos | Graded | — | C | 56 |
| " | IfosfaCancer | D/T 37+ Mos | Level | — | C | 56 |
| Iiozyme | Cystic Fibrosis | Medically diagnosed/treated | DECLINE | DECLINE | R | 56 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 56 |
| Imatinib Mesylate | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 56 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 56 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 56 |
| Imbruvica | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 56 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 56 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 56 |
| Imdur | Angina/Coronary Artery Dis | D/T 0‐24 Mos | Graded | — | H | 56 |
| " | Angina/Coronary Artery Dis | D/T 24‐36 Mos | Level | — | H | 56 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 56 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 56 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 56 |
| Imfinzi | Cancer | D/T 0‐24 Mos | — | — | C | 56 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 56 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 56 |
| Imlygic | Cancer | D/T 0‐24 Mos | — | — | C | 56 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 56 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 57 |
| Immune Globulin | Cancer | D/T 0‐24 Mos | — | — | C | 57 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 57 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 57 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 57 |
| Inamrinone | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 57 |
| Incruse | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | Std/Mod | R | 57 |
| Incruse Ellipta | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 57 |
| " | COPD/Emphysema/Chronic | D/T 25‐36 Mos | Graded | — | R | 57 |
| " | COPD/Emphysema/Chronic | D/T 37+ Mos | Level | — | R | 57 |
| Indacaterol | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | Std/Mod | R | 57 |
| " | COPD/Emphysema/Chronic | D/T 25‐36 Mos | Graded | — | R | 57 |
| Indapamide | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 57 |
| " | Hypertension |  | Level | — | · | 57 |
| Inderal | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 57 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 57 |
| " | Cardiomyopathy | D/T 0‐24 Mos | Graded | Pref/Std/Mod | H | 57 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 57 |
| " | Heart or Artery Disease |  | — | Pref/Std/Mod | H | 57 |
| " | Hypertension |  | Level | — | · | 57 |
| Inderal + Blood Thinner | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 57 |
| Inderal; Inderal LA; Inderal XL | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | — | H | 57 |
| " | Hypertension |  | Level | — | · | 57 |
| Inderide | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 57 |
| " | Hypertension |  | Level | — | · | 58 |
| Inlyta | Cancer | D/T 0‐24 Mos | — | — | C | 58 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 58 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 58 |
| Innopran XL | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | — | H | 58 |
| " | Hypertension |  | Level | — | · | 58 |
| Innopran | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 58 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Pref/Std/Mod | H | 58 |
| " | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 58 |
| " | Cardiomyopathy | D/T 0‐24 Mos | Graded | Pref/Std/Mod | H | 58 |
| " | Hypertension |  | Level | — | · | 58 |
| Innopran + Blood Thinner | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 58 |
| Inotuzumab Ozogamicin | Cancer | D/T 0‐24 Mos | — | — | C | 58 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 58 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 58 |
| Inspra | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 58 |
| " | Hypertension |  | Level | — | · | 58 |
| " | Cardiomyopathy | D/T 0‐24 Mos | Graded | Mod | H | 58 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 58 |
| Integrilin | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 58 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | — | — | H | 58 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | Graded | — | H | 58 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 59 |
| Interferon | Liver Disorder/Hepatitis | D/T 0‐24 Mos | Graded | — | · | 59 |
| " | Liver Disorder/Hepatitis | D/T 24‐36 Mos | Level+Graded | — | · | 59 |
| " | Leukemia | D/T 0‐24 Mos AHL ‐ Ever | DECLINE | — | C | 59 |
| " | Leukemia | D/T 24‐36 Mos | DECLINE | — | C | 59 |
| Interferon Alfa ‐ 2a | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 59 |
| " | Hepatitis | D/T 0‐24 Mos | Graded | Pref/Std/Mod | · | 59 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 59 |
| Interferon Alfa ‐ 2b | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 59 |
| " | Hepatitis | D/T 0‐24 Mos | Graded | Mod | · | 59 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 59 |
| Intron‐A | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 59 |
| " | Cancer | D/T 24‐36 Mos | Graded | — | C | 59 |
| " | Hepatitis C | D/T 0‐24 Mos ‐ Ever Accendo | Graded | DECLINE | · | 59 |
| " | Hepatitis C | D/T 24‐36 Mos | Level | — | · | 59 |
| " | Leukemia | D/T 0‐24 Mos AHL ‐ Ever | DECLINE | DECLINE | C | 59 |
| " | Leukemia | D/T 24‐36 Mos | DECLINE | — | C | 59 |
| Iobenguane I 131 | Cancer | D/T 0‐24 Mos | — | — | C | 59 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 59 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 59 |
| Ipilimumab | Cancer | D/T 0‐24 Mos | — | — | C | 59 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 59 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 59 |
| Ipratropium | Allergies |  | Level | — | · | 59 |
| " | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | Std/Mod | R | 59 |
| " | COPD, Chronic Bronchitis, E | D/T 25‐36 Mos | Graded | — | R | 60 |
| " | COPD, Chronic Bronchitis, E | D/T 37+ Mos | Level | — | R | 60 |
| Ipratropium Bromide | Asthma |  | Level | — | R | 60 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 60 |
| Iressa | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 60 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 60 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 60 |
| Irinotecan | Cancer | D/T 0‐24 Mos | — | — | C | 60 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 60 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 60 |
| Ismo | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | — | H | 60 |
| Isochron | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | — | H | 60 |
| Isoditrate | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | — | H | 60 |
| Isoproterenol | Asthma |  | Level | — | R | 60 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 60 |
| Isoptin | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 60 |
| " | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 60 |
| Isoptin + Blood Thinner | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 60 |
| Isordil | Angina/Coronary Artery Dis | D/T 0‐24 Mos | Graded | — | H | 60 |
| " | Angina/Coronary Artery Dis | D/T 24‐36 Mos | Level | — | H | 60 |
| " | Heart Condition (Stroke, | TIAD/T 0‐24 Mos | Graded | — | H | 60 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 60 |
| Isosorbide | Angina/Coronary Artery Dis | D/T 0‐24 Mos | Graded | — | H | 60 |
| " | Angina/Coronary Artery Dis | D/T 24‐36 Mos | Level | Mod | H | 60 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 60 |
| " | Any Condition |  | Graded | Pref/Std/Mod | · | 60 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 60 |
| Isosorbide; Isosorbide Dinitrate; | IsosHeart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 61 |
| " | IsosHeart Condition(Stroke, TIA, | D/T 13‐24 Mos | — | — | H | 61 |
| " | IsosHeart Condition(Stroke, TIA, | D/T 25‐36 Mos | Level | — | H | 61 |
| " | IsosHeart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 61 |
| Istodax | Cancer | D/T 0‐24 Mos | — | — | C | 61 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 61 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 61 |
| Isuprel | Asthma |  | Level | — | R | 61 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 61 |
| Ivarbradine | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 61 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 61 |
| IVIG | Cancer | D/T 0‐24 Mos | — | — | C | 61 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 61 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 61 |
| Ivosidenib | Cancer | D/T 0‐24 Mos | — | — | C | 61 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 61 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 61 |
| Ixabepilone | Cancer | D/T 0‐24 Mos | — | — | C | 61 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 61 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 61 |
| Ixazomib | Cancer | D/T 0‐24 Mos | — | — | C | 61 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 61 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 61 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 61 |
| Ixempra | Cancer | D/T 0‐24 Mos | — | — | C | 61 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 61 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 61 |
| Jakafi | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 61 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 61 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 61 |
| Jantoven | Atrial Fibrillation | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 61 |
| " | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 61 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 62 |
| " | Blood Clot/Heart Attack/Str | D/T 0‐24 Mos | Graded | — | H | 62 |
| " | Blood Clot/Heart Attack/Str | D/T 25‐36 Mos | Level | — | H | 62 |
| " | Cardiac Valve Replacement | D/T 0‐24 Mos | Level | — | H | 62 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | Graded | DECLINE | H | 62 |
| " | Generic Surgery |  | Level | — | · | 62 |
| " | Pulmonary Embolism |  | Graded | — | R | 62 |
| " | Thrombosis | D/T 0‐24 Mos | Graded | — | · | 62 |
| Jevtana | Cancer | D/T 0‐24 Mos | — | — | C | 62 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 62 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 62 |
| Kadcyla | Cancer | D/T 0‐24 Mos | — | — | C | 62 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 62 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 62 |
| Kepivance | Cancer | D/T 0‐24 Mos | — | — | C | 62 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 62 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 62 |
| Katerizia | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 62 |
| Kerlone | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 62 |
| " | Hypertension |  | Level | — | · | 62 |
| Keytruda | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 62 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 62 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 62 |
| Kisqali | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 63 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 63 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 63 |
| Kprolis | Cancer | D/T 0‐24 Mos | — | — | C | 63 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 63 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 63 |
| Ku‐Zyme | Cystic Fibrosis | Medically diagnosed/treated | DECLINE | DECLINE | R | 63 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 63 |
| Kutrase | Cystic Fibrosis | Medically diagnosed/treated | DECLINE | — | R | 63 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 63 |
| Labetalol | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | — | H | 63 |
| " | Arrhythmia | Medically diagnosed/tre | Level | — | H | 63 |
| " | Hypertension |  | Level | — | · | 63 |
| Lanoxicaps | Atrial Fibrillation | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 63 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 63 |
| " | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 63 |
| " | Cardiomyopathy | D/T 0‐24 Mos | Graded | Mod | H | 64 |
| " | Heart or Artery Disease |  | — | Pref/Std/Mod | H | 64 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 64 |
| Lanoxin | Atrial Fibrillation | Medically diagnosed/tre | Level | — | H | 64 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 64 |
| " | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 64 |
| " | Cardiomyopathy | D/T 0‐24 Mos | Graded | Mod | H | 64 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 64 |
| Lanoxin; Lanoxicaps | Atrial Fibrillation | Medically diagnosed/tre | Level | — | H | 64 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 64 |
| Lanreotide; Lanreotide Acetate | Cancer | D/T 0‐24 Mos | — | — | C | 64 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 64 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 64 |
| Lapase | Cystic Fibrosis | Medically diagnosed/treated | DECLINE | DECLINE | R | 64 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 64 |
| Lapatinib | Cancer | D/T 0‐24 Mos | — | — | C | 64 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 64 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 64 |
| Larotrectinib | Cancer | D/T 0‐24 Mos | — | — | C | 64 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 64 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 64 |
| Lasix | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 64 |
| " | Edema |  | Level | — | · | 64 |
| " | Kidney Disease | D/T 0‐24 Mos | Graded | Mod | · | 64 |
| " | Kidney Dialysis | Had or been advised to have | DECLINE | — | · | 64 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 65 |
| " | Liver Disease |  | Graded | Mod | · | 65 |
| Lemtrada | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 65 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 65 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 65 |
| " | Multiple Sclerosis (MS) | D/T 0‐24 Mos | Graded | — | · | 65 |
| Lenvatinib; Lenvatinib Mesylate | Cancer | D/T 0‐24 Mos | — | — | C | 65 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 65 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 65 |
| Lenvima | Cancer | D/T 0‐24 Mos | — | — | C | 65 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 65 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 65 |
| Letrozole | Breast Cancer | D/T 0‐24 Mos | — | DECLINE | C | 65 |
| " | Breast Cancer | D/T 24‐36 Mos | Level | DECLINE | C | 65 |
| " | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 65 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 65 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 65 |
| Leucovorin Calcium | Cancer | D/T 0‐24 Mos | — | — | C | 65 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 65 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 65 |
| Leukeran | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 65 |
| " | Cancer | D/T 24‐36 Mos | Graded | DECLINE | C | 65 |
| " | Leukemia | D/T 0‐24 Mos AHL ‐ Ever | DECLINE | DECLINE | C | 65 |
| " | Leukemia | D/T 24‐36 Mos | DECLINE | DECLINE | C | 65 |
| Leukine | Cancer | D/T 0‐24 Mos | — | — | C | 65 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 66 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 66 |
| Leuprolide | Cancer | D/T 0‐24 Mos | — | — | C | 66 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 66 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 66 |
| Leustatin | Cancer | D/T 0‐24 Mos | — | — | C | 66 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 66 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 66 |
| Levalbuterol | Asthma |  | Level | — | R | 66 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 66 |
| Levamisole HCL | Cancer | D/T 0‐24 Mos | — | — | C | 66 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 66 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 66 |
| Levatol | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 66 |
| " | Hypertension |  | Level | — | · | 66 |
| Lexxel | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 66 |
| " | Hypertension |  | Level | — | · | 66 |
| Lipodox | Cancer | D/T 0‐24 Mos | — | — | C | 66 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 66 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 67 |
| Lipram | Any Condition |  | — | Pref/Std/Mod | · | 67 |
| " | Cystic Fibrosis | Medically diagnosed/treated | DECLINE | DECLINE | R | 67 |
| Lisinopril | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 67 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 67 |
| " | Kidney Disease | D/T 0‐24 Mos | Graded | — | · | 67 |
| Lomustine | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 67 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 67 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 67 |
| Lonhala Magnair | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 67 |
| Lonsurf | Cancer | D/T 0‐24 Mos | — | — | C | 67 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 67 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 67 |
| Lopressor | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | Pref/Std/Mod | H | 67 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 67 |
| " | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 67 |
| " | Hypertension |  | Level | — | · | 67 |
| Lopressor + Blood Thinner | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 67 |
| Lorbrena | Cancer | D/T 0‐24 Mos | — | — | C | 67 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 67 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 67 |
| Lorlatrinib | Cancer | D/T 0‐24 Mos | — | — | C | 67 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 67 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 67 |
| Losartan | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 68 |
| " | Kidney Disease | D/T 0‐24 Mos | Graded | Mod | · | 68 |
| " | Hypertension |  | Level | — | · | 68 |
| Losartan; Losartan Potassium | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 68 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 68 |
| Lotensin | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 68 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 68 |
| Lovenox | Blood Clot/Heart Attack/Str | D/T 0‐24 Mos | Graded | — | H | 68 |
| " | Blood Clot/Heart Attack/Str | D/T 25‐36 Mos | Level | — | H | 68 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 68 |
| " | Generic Surgery |  | Level | — | · | 68 |
| " | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 68 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | — | — | H | 68 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | — | — | H | 68 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 68 |
| Lozol | CHF (Congestive Heart Failu | Medically diagnosed/treated | Graded | DECLINE | H | 68 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 68 |
| Lufyllin | Asthma |  | Level | — | R | 68 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 68 |
| Lumoxiti | Cancer | D/T 0‐24 Mos | — | — | C | 68 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 68 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 68 |
| Lupron | Prostate Cancer | D/T 0‐24 Mos | — | DECLINE | C | 68 |
| " | Prostate Cancer | D/T 24‐36 Mos | Graded | DECLINE | C | 68 |
| Lupron; Lupron Depot | Cancer | D/T 0‐24 Mos | — | — | C | 68 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 68 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 68 |
| Lynparza | Cancer | D/T 0‐24 Mos | — | — | C | 68 |
| Lysodren | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 69 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 69 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 69 |
| Matulane | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 69 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 69 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 69 |
| Matzim LA | Heart Condition | D/T 0‐24 Mos | Graded | — | H | 69 |
| " | Hypertension |  | Level | — | · | 69 |
| Mavenclad | Any Condition |  | — | Std/Mod | · | 69 |
| " | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 69 |
| Mavik | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 69 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 69 |
| Maxair | Asthma |  | Level | — | R | 69 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 69 |
| Maxzide | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 69 |
| " | Hypertension |  | Level | — | · | 69 |
| Mechlorethamine | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 69 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 69 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 69 |
| Medrol | Allergies/Asthma |  | Level | — | R | 69 |
| " | Inflammation |  | Level | — | · | 70 |
| " | Lupus | D/T 0‐24 Mos | Graded | — | · | 70 |
| " | Multiple Sclerosis (MS) | D/T 0‐24 Mos | Graded | — | · | 70 |
| " | Rheumatoid Arthritis |  | Level | — | · | 70 |
| Megace (Megestrol) | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 70 |
| " | Cancer | D/T 24‐36 Mos | Graded+DECLINE | DECLINE | C | 70 |
| " | Any Condition |  | — | — | · | 70 |
| Megestrol, Megestrol Acetate | AIDS |  | DECLINE | DECLINE | · | 70 |
| " | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 70 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 70 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 70 |
| " | Any Condition |  | — | — | · | 70 |
| Mekinist | Cancer | D/T 0‐24 Mos | — | — | C | 70 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 70 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 70 |
| Mektovi | Cancer | D/T 0‐24 Mos | — | — | C | 70 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 70 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 70 |
| Melphalan; Melphalan HydrochloridCancer |  | D/T 0‐24 Mos | — | DECLINE | · | 70 |
| " |  | D/T 25‐36 Mos | Graded | DECLINE | · | 70 |
| " |  | D/T 37+ Mos | Level | DECLINE | · | 70 |
| " | Any Condition |  | — | DECLINE | · | 70 |
| " | Multiple Myeloma |  | DECLINE | DECLINE | C | 70 |
| Memantine; Memantine HCL | Alzheimer's/Dementia |  | DECLINE | DECLINE | H | 70 |
| Mercaptopurine | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 70 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 70 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 71 |
| Mesna | Cancer | D/T 0‐24 Mos | — | — | C | 71 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 71 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 71 |
| Mesnex | Cancer | D/T 0‐24 Mos | — | — | C | 71 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 71 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 71 |
| Metaproterenol | Asthma |  | Level | — | R | 71 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 71 |
| Metastron | Cancer | D/T 0‐24 Mos | — | — | C | 71 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 71 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 71 |
| Methotrexate | Leukemia | D/T 0‐24 Mos AHL ‐ Ever | DECLINE | DECLINE | C | 71 |
| " | Leukemia | D/T 24‐36 Mos | DECLINE | DECLINE | C | 71 |
| " | Lupus | D/T 0‐24 Mos | Graded | DECLINE | · | 71 |
| " | Rheumatoid Arthritis | D/T 0‐36 Mos/ Proseper | Level | — | · | 71 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 71 |
| " | Organ Transplant | Has or has been advised to have | DECLINE | DECLINE | · | 71 |
| " | Sarcoidosis | Lungs | Graded | — | · | 71 |
| " | Sarcoidosis | Other Location | Level | — | · | 71 |
| " | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 71 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 71 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 71 |
| Methyclothiazide | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 72 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 72 |
| Methylprednisolone | Allergies/Asthma |  | Level | — | R | 72 |
| " | Inflammation |  | Level | — | · | 72 |
| " | Lupus | D/T 0‐24 Mos | Graded | — | · | 72 |
| " | Multiple Sclerosis (MS) | D/T 0‐24 Mos | Graded | — | · | 72 |
| " | Rheumatoid Arthritis |  | Level | — | · | 72 |
| Metolazone | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 72 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 72 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 72 |
| Metoprolol; Metoprolol Tartrate | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 72 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 72 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 72 |
| Metoprolol | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 72 |
| " | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 72 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 72 |
| Metoprolol + Blood Thinner | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 72 |
| Micardis | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 72 |
| " | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 72 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | — | — | H | 72 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | Level | — | H | 72 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 72 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 72 |
| Microzide | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 72 |
| " | Hypertension |  | Level | — | · | 72 |
| Midamor | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 72 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 72 |
| Midostaurin | Cancer | D/T 0‐24 Mos | — | — | C | 72 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 72 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 72 |
| Milrinone | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 72 |
| Minitran | Angina/Coronary Artery Dis | D/T 0‐24 Mos | Graded | — | H | 73 |
| " | Angina/Coronary Artery Dis | D/T 24‐36 Mos | Level | — | H | 73 |
| " | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 73 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | — | — | H | 73 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | Level | — | H | 73 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 73 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 73 |
| Mitomycin | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 73 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 73 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 73 |
| Mitotane | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 73 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 73 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 73 |
| Mitoxantrone HCL | Cancer | D/T 0‐24 Mos | — | — | C | 73 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 73 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 73 |
| " | Multiple Sclerosis (MS) | D/T 0‐24 Mos | Graded | — | · | 73 |
| Moduretic | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 73 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 73 |
| Moexipril | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 73 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 73 |
| Mogamulizumab‐kpkc | Cancer | D/T 0‐24 Mos | — | — | C | 73 |
| Monoket | Angina/Coronary Artery Dis | D/T 0‐24 Mos | Graded | — | H | 74 |
| " | Angina/Coronary Artery Dis | D/T 24‐36 Mos | Level | — | H | 74 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 74 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 74 |
| Monopril | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 74 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 74 |
| Montelukast | Allergies/Asthma |  | Level | — | R | 74 |
| Montelukast Sodium | Asthma |  | Level | — | R | 74 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 74 |
| Moxetumomab Pasudotox‐tdfk | Cancer | D/T 0‐24 Mos | — | — | C | 74 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 74 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 74 |
| Mozobil | Cancer | D/T 0‐24 Mos | — | — | C | 74 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 74 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 74 |
| Mucomyst | Asthma |  | Level | — | R | 74 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 74 |
| Multaq | Heart Rhythm Disorder |  | — | Pref/Std/Mod | H | 74 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 74 |
| Muromonab ‐ CD3 | Heart Surgery | D/T 0‐24 Mos | — | — | H | 74 |
| " | Kidney/Liver Disorder |  | — | — | · | 74 |
| Mustargen | Cancer | D/T 0‐24 Mos | — | — | C | 74 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 74 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 74 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 74 |
| Mutamycin | Cancer | D/T 0‐24 Mos | — | — | C | 74 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 74 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 75 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 75 |
| Mycophenolate Mofetil | Heart Surgery | D/T 0‐24 Mos | — | — | H | 75 |
| " | Kidney/Liver Disorder |  | — | — | · | 75 |
| " | Organ Transplant | Has or has been advised to have | DECLINE | DECLINE | · | 75 |
| " | Systemic Lupus (SLE) | D/T 0‐24 Mos Accendo ‐ Ever | Graded | Std/Mod | · | 75 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 75 |
| Mykrok | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 75 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 75 |
| " | Hypertension |  | Level | — | · | 75 |
| Myleran | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 75 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 75 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 75 |
| Mylocel | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 75 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 75 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 75 |
| Mylotarg | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 75 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 75 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 75 |
| Nabilone | Cancer | D/T 0‐24 Mos | — | — | C | 75 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 75 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 75 |
| Nadolol | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 75 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | — | H | 75 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 75 |
| Namenda; Namenda XR; Namenda | TAlzheimer's/Dementia |  | DECLINE | DECLINE | H | 76 |
| Namzaric | Alzheimer's/Dementia |  | DECLINE | DECLINE | H | 76 |
| " | Any Condition |  | — | DECLINE | · | 76 |
| Natrecor | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 76 |
| Natulane | Cancer | D/T 0‐24 Mos | — | — | C | 76 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 76 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 76 |
| Navelbine | Cancer | D/T 0‐24 Mos | — | — | C | 76 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 76 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 76 |
| Nebivolol | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 76 |
| " | Hypertension |  | Level | — | · | 76 |
| Necitumumab | Cancer | D/T 0‐24 Mos | — | — | C | 76 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 76 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 76 |
| Nelarabine | Cancer | D/T 0‐24 Mos | — | — | C | 76 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 76 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 77 |
| Neoral | Heart Surgery | D/T 0‐24 Mos | — | — | H | 77 |
| " | Kidney/Liver Disorder |  | — | — | · | 77 |
| " | Any Condition |  | — | DECLINE | · | 77 |
| Neosar | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 77 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 77 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 77 |
| Neratinib; Neratinib Maleate | Cancer | D/T 0‐24 Mos | — | — | C | 77 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 77 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 77 |
| Nerlynx | Cancer | D/T 0‐24 Mos | — | — | C | 77 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 77 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 77 |
| Nesiritide | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 77 |
| Netupitant | Cancer | D/T 0‐24 Mos | — | — | C | 77 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 77 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 77 |
| Neulasta | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 77 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 77 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 77 |
| Neumega | Cancer | D/T 0‐24 Mos | — | — | C | 77 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 77 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 77 |
| Neupogen | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 77 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 77 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 77 |
| Nexavar | Cancer | D/T 0‐24 Mos | — | — | C | 78 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 78 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 78 |
| Nexterone | Heart Rhythm Disorder |  | — | Pref/Std/Mod | H | 78 |
| Nicodern, Nicontine Lozenge/Gum, | Smoking Cessation | D/T 0‐12 Mos/Smoker R | Level | — | R | 78 |
| Nifediac | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 78 |
| Nifediac CC; Nifediac XL | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | — | H | 78 |
| " | Hypertension |  | Level | — | · | 78 |
| Nifedical | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 78 |
| Nifedical XL | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | — | H | 78 |
| " | Hypertension |  | Level | — | · | 78 |
| Nifedipine | Angina (Chest Pain) | D/T 0‐24 Mos ‐ Ever Accendo | Graded | Mod | H | 78 |
| " | Angina (Chest Pain) | D/T 24‐36 Mos ‐ Ever Ac | Level | — | H | 78 |
| " | Hypertension |  | Level | — | · | 78 |
| Nilandron | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 78 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 78 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 78 |
| Nilotinib | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 78 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 78 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 78 |
| Nimodipine | Blood Clot/Heart Attack/Str | D/T 0‐24 Mos | Graded | — | H | 78 |
| " | Blood Clot/Heart Attack/Str | D/T 25‐36 Mos | Level | — | H | 78 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 78 |
| " | Stroke | D/T 0‐24 Mos | Graded | Pref/Std/Mod | H | 78 |
| " | Heart Condition(Stroke, TIA, | With in 24 mos concurrent for o | Graded | — | H | 78 |
| " | Heart Condition(Stroke, TIA, | 24 mos Not Concurent | Graded | — | H | 78 |
| " | Heart Condition(Stroke, TIA, | With in 24mos | — | — | H | 78 |
| " | Heart Condition(Stroke, TIA, | 24 mos + | Level | — | H | 78 |
| Nimotop | Blood Clot/Heart Attack/Str | D/T 0‐24 Mos | Graded | — | H | 78 |
| " | Blood Clot/Heart Attack/Str | D/T 25‐36 Mos | Level | — | H | 78 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 78 |
| " | Stroke | D/T 0‐24 Mos | Graded | Pref/Std/Mod | H | 79 |
| " | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 79 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | — | — | H | 79 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | Level | — | H | 79 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 79 |
| Ninlaro | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 79 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 79 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 79 |
| Nipent | Cancer | D/T 0‐24 Mos | — | — | C | 79 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 79 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 79 |
| Niraparib | Cancer | D/T 0‐24 Mos | — | — | C | 79 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 79 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 79 |
| Nitrek | Angina/Coronary Artery Dis | D/T 0‐24 Mos | Graded | — | H | 79 |
| " | Angina/Coronary Artery Dis | D/T 24‐36 Mos | Level | — | H | 79 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 79 |
| Nitro‐bid | Angina/Coronary Artery Dis | D/T 0‐24 Mos | Graded | — | H | 79 |
| " | Angina/Coronary Artery Dis | D/T 24‐36 Mos | Level | — | H | 79 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 79 |
| Nitro‐dur | Angina/Coronary Artery Dis | D/T 0‐24 Mos | Graded | — | H | 79 |
| " | Angina/Coronary Artery Dis | D/T 24‐36 Mos | Level | — | H | 79 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 79 |
| Nitro‐Time | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 79 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 79 |
| Nitroglycerine | Angina/Coronary Artery Dis | D/T 0‐24 Mos | Graded | — | H | 79 |
| " | Angina/Coronary Artery Dis | D/T 24‐36 Mos | Level | — | H | 79 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 79 |
| " | Any Condition |  | Graded | Pref/Std/Mod | · | 79 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 79 |
| Nitroglycerine; Nitrotab; Nitrogard; | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | — | H | 79 |
| Nitrol | Angina/Coronary Artery Dis | D/T 0‐24 Mos | Graded | — | H | 79 |
| " | Angina/Coronary Artery Dis | D/T 24‐36 Mos | Level | — | H | 79 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 79 |
| Nitrolingual | Angina/Coronary Artery Dis | D/T 0‐24 Mos | Graded | — | H | 79 |
| g | g y y |  | — | — | · | 80 |
| " | g y y | D/T 24‐36 Mos | Level | — | · | 80 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 80 |
| " | Any Condition |  | Graded | Pref/Std/Mod | · | 80 |
| Nitromist | Angina/Coronary Artery Dis | D/T 0‐24 Mos | Graded | — | H | 80 |
| " | Angina/Coronary Artery Dis | D/T 24‐36 Mos | Level | — | H | 80 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 80 |
| Nitroquick | Angina/Coronary Artery Dis | D/T 0‐24 Mos | Graded | — | H | 80 |
| " | Angina/Coronary Artery Dis | D/T 24‐36 Mos | Level | — | H | 80 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 80 |
| Nitrostat | Angina/Coronary Artery Dis | D/T 0‐24 Mos | Graded | — | H | 80 |
| " | Angina/Coronary Artery Dis | D/T 24‐36 Mos | Level | — | H | 80 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 80 |
| " | Any Condition |  | Graded | Pref/Std/Mod | · | 80 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 80 |
| Nivolumab | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 80 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 80 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 80 |
| Nolvadex | Cancer | D/T 0‐24 Mos | — | — | C | 80 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 80 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 80 |
| Normodyne | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 80 |
| " | Hypertension |  | Level | — | · | 80 |
| Norvasc | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | — | H | 80 |
| " | Angina (Chest Pain) | D/T 24‐36 Mos | Level | — | H | 80 |
| " | Hypertension |  | Level | — | · | 80 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 80 |
| Norpace | Arrhythmia | Medically diagnosed/tre | Level | — | H | 80 |
| " | Cardiomyopathy | D/T 0‐24 Mos | Graded | Mod | H | 80 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 80 |
| Novantrone | Cancer | D/T 0‐24 Mos | — | — | C | 81 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 81 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 81 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 81 |
| " | Multiple Sclerosis (MS) | D/T 0‐24 Mos | Graded | — | · | 81 |
| Novoamiodarone | Heart Rhythm Disorder |  | — | Pref/Std/Mod | H | 81 |
| Nubeqa | Cancer | D/T 0‐24 Mos | — | — | C | 81 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 81 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 81 |
| Nymalize | Heart Condition(Stroke, TIA, | With in 24 mos concurrent for o | Graded | — | H | 81 |
| " | Heart Condition(Stroke, TIA, | 24 mos Not Concurent | Graded | — | H | 81 |
| " | Heart Condition(Stroke, TIA, | With in 24mos | — | — | H | 81 |
| " | Heart Condition(Stroke, TIA, | 24 mos + | Level | — | H | 81 |
| " | Stroke | D/T 0‐24 Mos | Graded | Pref/Std/Mod | H | 81 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 81 |
| Obinutuzumab | Cancer | D/T 0‐24 Mos | — | — | C | 81 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 81 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 81 |
| ( ) |  |  | — | — | · | 82 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 82 |
| " |  |  | — | — | · | 115 |
| " | Cancer, Organ Transplant |  | — | — | C | 115 |
| " | Cancer, Organ Transplant | Has or has been advised to have | DECLINE | DECLINE | C | 115 |
| Octagam | Cancer | D/T 0‐24 Mos | — | — | C | 82 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 82 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 82 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 82 |
| Ofatumumab | Cancer | D/T 0‐24 Mos | — | — | C | 82 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 82 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 82 |
| Oforta | Cancer | D/T 0‐24 Mos | — | — | C | 82 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 82 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 82 |
| Olaparib | Cancer | D/T 0‐24 Mos | — | — | C | 82 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 82 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 82 |
| Olodaterol | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | Std/Mod | R | 82 |
| Omacetaxine | Cancer | D/T 0‐24 Mos | — | — | C | 82 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 82 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 82 |
| Onbrez | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | Std/Mod | R | 82 |
| Oncaspar | Cancer | D/T 0‐24 Mos | — | — | C | 82 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 82 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 82 |
| Oncovin | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 82 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 83 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 83 |
| Ondanstron | Cancer | D/T 0‐24 Mos | — | — | C | 83 |
| " | Cancer | D/T 25‐36 Mos | Level+Graded | — | C | 83 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 83 |
| " | Other Use | D/T 0‐36 Mos | — | — | · | 83 |
| Onsolis | Cancer Pain | D/T 0‐24 Mos | Graded | — | C | 83 |
| " | Cancer Pain | D/T 25‐36 Mos | Level+Graded | — | C | 83 |
| " | Cancer Pain | D/T 37+ Mos | Level | — | C | 83 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 83 |
| Ontak | Cancer | D/T 0‐24 Mos | — | — | C | 83 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 83 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 83 |
| Onxol | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 83 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 83 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 83 |
| Opdivo | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 83 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 83 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 83 |
| Orthoclone OKT3 | Heart Surgery | D/T 0‐24 Mos | — | — | H | 83 |
| " | Kidney/Liver Disorder |  | — | — | · | 83 |
| Osimertinib | Cancer | D/T 0‐24 Mos | — | — | C | 83 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 83 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 83 |
| Oxaliplatin | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 83 |
| Oxtriphylline | Asthma |  | Level | — | R | 84 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 84 |
| Pacerone | Arrhythmia | Medically diagnosed/tre | Level | — | H | 84 |
| " | Heart Rhythm Disorder |  | Level | Pref/Std/Mod | H | 84 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 84 |
| Paclitaxel | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 84 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 84 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 84 |
| Palbociclib | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 84 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 84 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 84 |
| Palcaps | Cystic Fibrosis | Been treated or diagnosed | DECLINE | — | R | 84 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 84 |
| Palifermin/Kepivance | Cancer | D/T 0‐24 Mos | — | — | C | 84 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 84 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 85 |
| Palonosetron; Palonosetron | HydrochCancer | D/T 0‐24 Mos | — | — | C | 85 |
| " | HydrochCancer | D/T 25‐36 Mos | Graded | — | C | 85 |
| " | HydrochCancer | D/T 37+ Mos | Level | — | C | 85 |
| Pamidronate Disodium | Cancer | D/T 0‐24 Mos | — | — | C | 85 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 85 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 85 |
| Panase | Cystic Fibrosis | Been treated or diagnosed | DECLINE | DECLINE | R | 85 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 85 |
| Pancrease | Cystic Fibrosis | Been treated or diagnosed | DECLINE | DECLINE | R | 85 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 85 |
| Pancrecarb | Cystic Fibrosis | Been treated or diagnosed | DECLINE | DECLINE | R | 85 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 85 |
| Pancrelipase | Cystic Fibrosis | Been treated or diagnosed | DECLINE | DECLINE | R | 85 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 85 |
| Pancron D/R | Cystic Fibrosis | Been treated or diagnosed | DECLINE | DECLINE | R | 85 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 85 |
| Pangestyme | Cystic Fibrosis | Been treated or diagnosed | DECLINE | DECLINE | R | 85 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 85 |
| Panglobulin | Cancer | D/T 0‐24 Mos | — | — | C | 85 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 85 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 85 |
| Panitumumab | Cancer | D/T 0‐24 Mos | — | — | C | 85 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 85 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 85 |
| Panobinostat | Cancer | D/T 0‐24 Mos | — | — | C | 85 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 85 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 85 |
| Panocaps | Cystic Fibrosis | Been treated or diagnosed | DECLINE | DECLINE | R | 85 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 85 |
| Panokase | Cystic Fibrosis | Been treated or diagnosed | DECLINE | DECLINE | R | 86 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 86 |
| Papacon | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 86 |
| " | Circulatory Disease w/Diabetes |  | DECLINE | Pref/Std/Mod | H | 86 |
| Papaverine | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 86 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 86 |
| " | Circulatory Disease w/Diabetes |  | DECLINE | Pref/Std/Mod | H | 86 |
| Paraplatin | Cancer | D/T 0‐24 Mos | — | — | C | 86 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 86 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 86 |
| Paopanib | Cancer | D/T 0‐24 Mos | — | — | C | 86 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 86 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 86 |
| Pavabid | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 87 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 87 |
| " | Circulatory Disease w/Diabetes |  | DECLINE | Pref/Std/Mod | H | 87 |
| Pavacot | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 87 |
| " | Circulatory Disease w/Diabetes |  | DECLINE | Pref/Std/Mod | H | 87 |
| Pavagen | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 87 |
| " | Circulatory Disease w/Diabetes |  | DECLINE | Pref/Std/Mod | H | 87 |
| Pegaspargase | Cancer | D/T 0‐24 Mos | — | — | C | 87 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 87 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 87 |
| Peginterferon Alfa‐2b | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 87 |
| " | Any Condition |  | — | Mod | · | 87 |
| Pembrolizumab | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 87 |
| " | Cancer | D/T 25‐36 Mos | Graded | DECLINE | C | 87 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 87 |
| Pemetrexed | Cancer | D/T 0‐24 Mos | — | — | C | 87 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 87 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 87 |
| Pentopak | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 88 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 88 |
| " | Circulatory Disease w/Diabetes |  | DECLINE | Pref/Std/Mod | H | 88 |
| Pentostatin | Cancer | D/T 0‐24 Mos | — | — | C | 88 |
| " | Cancer | D/T 25‐36 Mos | Graded | — | C | 88 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 88 |
| Pentoxifylline | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 88 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 88 |
| " | Circulatory Disease w/Diabetes. | Peripheral Vascular, Peripheral Arte | DECLINE | Pref/Std/Mod | H | 88 |
| Pentoxil | Any Condition |  | — | Pref/Std/Mod | · | 88 |
| " | Circulatory Disease w/Diabetes |  | DECLINE | Pref/Std/Mod | H | 88 |
| Perforomist | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 88 |
| Perindopril | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 88 |
| " | Hypertension |  | Level | — | · | 88 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 89 |
| Perindopril; Perindopril Erbumine | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 88 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | — | — | H | 88 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | Level | — | H | 88 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 88 |
| " | Hypertension |  | Level | — | · | 88 |
| Perjeta | Cancer | D/T 0‐24 Mos | — | — | C | 88 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 88 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 88 |
| Persantine | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 89 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | — | — | H | 89 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | — | — | H | 89 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 89 |
| Pertuzumab | Cancer | D/T 0‐24 Mos | — | — | C | 89 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 89 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 89 |
| Pertzye | Cystic Fibrosis |  | DECLINE | DECLINE | R | 89 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 89 |
| Phlamiodarone | Heart Rhythm Disorder |  | — | Pref/Std/Mod | H | 89 |
| Photofrin | Cancer | D/T 0‐24 Mos | — | — | C | 89 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 89 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 89 |
| Pindolol | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 90 |
| " | Hypertension |  | Level | — | · | 90 |
| Piqray | Cancer | D/T 0‐24 Mos | — | — | C | 90 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 90 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 90 |
| Plaretase | Cystic Fibrosis |  | DECLINE | DECLINE | R | 90 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 90 |
| Platinol AQ | Cancer | D/T 0‐24 Mos | — | — | C | 90 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 90 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 90 |
| Plavix | Heart Condition(Stroke, TIA, | D/T 0‐24 Mos | Graded | — | H | 90 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | Level | — | H | 90 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 90 |
| " | Heart or Artery Disease |  | — | Pref/Std/Mod | H | 90 |
| " | PVD/PAD | D/T 0‐24 Mos | Graded | Pref/Std/Mod | H | 90 |
| " | Generic Surgery |  | Level | — | · | 90 |
| Plavix (300 mg) | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 90 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | — | — | H | 90 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | — | — | H | 90 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 90 |
| Plavix (75 mg) | Heart Condition(Stroke, TIA, | With in 24 mos concurrent for o | Graded | — | H | 90 |
| " | Heart Condition(Stroke, TIA, | 24 mos Not Concurent | Graded | — | H | 90 |
| " | Heart Condition(Stroke, TIA, | With in 24mos | — | — | H | 90 |
| " | Heart Condition(Stroke, TIA, | 24 mos + | Level | — | H | 90 |
| Plegisol | Circulatory Surgery | D/T 0‐24 Mos | Graded | — | H | 90 |
| Plenaxix | Cancer | D/T 0‐24 Mos | — | — | C | 90 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 90 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 91 |
| Plerixafor | Cancer | D/T 0‐24 Mos | — | — | C | 91 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 91 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 91 |
| Pletal | Circulatory Disease W/Diabetes |  | DECLINE | Pref/Std/Mod | H | 91 |
| Plicamycin | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 91 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 91 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 91 |
| Polatuzumab Vedotin‐PIIQ | Cancer | D/T 0‐24 Mos | — | — | C | 91 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 91 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 91 |
| Polivy | Cancer | D/T 0‐24 Mos | — | — | C | 91 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 91 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 91 |
| Ponatinib | Cancer | D/T 0‐24 Mos | — | — | C | 91 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 91 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 91 |
| Portrazza | Cancer | D/T 0‐24 Mos | — | — | C | 91 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 91 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 91 |
| Poteligeo | Cancer | D/T 0‐24 Mos | — | — | C | 91 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 91 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 91 |
| Pralatrexate | Cancer | D/T 0‐24 Mos | — | — | C | 91 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 91 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 91 |
| Prasugrel | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 91 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | — | — | H | 91 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | — | — | H | 91 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 92 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 92 |
| " | PVD/PAD | D/T 0‐24 Mos | Graded | Pref/Std/Mod | H | 92 |
| " | Stroke | D/T 0‐24 Mos | Graded | Pref/Std/Mod | H | 92 |
| Prednisone | Allergies/Asthma |  | Level | — | R | 92 |
| " | Inflammation |  | Level | — | · | 92 |
| " | Lupus | D/T 0‐24 Mos | Graded | Pref/Std/Mod | · | 92 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 92 |
| " | Lupus, Kidney Disese, Cancers, | Brain Tumor | Graded+DECLINE | — | C | 92 |
| " | Systemic Lupus (SLE) | D/T 0‐24 Mos Accendo ‐ Ever | Graded | Std/Mod | · | 92 |
| " | Rheumatoid Arthritis |  | Level | — | · | 92 |
| " | Sarcoidosis | Lungs | Graded | — | · | 92 |
| " | Sarcoidosis | Other Location | Level | — | · | 92 |
| Primacor | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 92 |
| Prinivil | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 92 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 92 |
| Prinzide | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 92 |
| " | Hypertension |  | Level | — | · | 93 |
| Privigen | Cancer | D/T 0‐24 Mos | — | — | C | 93 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 93 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 93 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 93 |
| Proair | Asthma |  | Level | — | R | 93 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 93 |
| " | COPD/Emphysema/Chronic | D/T 24‐36 Mos | Level | — | R | 93 |
| Procarbazine | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 93 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 93 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 93 |
| Procardia | Angina (Chest Pain) | D/T 0‐24 Mos ‐ Ever Accendo | Graded | Mod | H | 93 |
| " | Hypertension |  | Level | — | · | 93 |
| Prograf | Organ/Tissue Transplant | Has or has been advised to have | DECLINE | — | · | 93 |
| " | Any Condition |  | — | DECLINE | · | 93 |
| " | Heart Surgery | D/T 0‐24 Mos | — | — | H | 93 |
| " | Kidney/Liver Disorder |  | — | — | · | 93 |
| Prolastin | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 93 |
| Proleukin | Metastatic Cancer | D/T 0‐24 Mos | DECLINE | — | C | 93 |
| " | Metastatic Cancer | D/T 24‐36 Mos | DECLINE | — | C | 93 |
| " | Cancer | D/T 0‐24 Mos | — | — | C | 93 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 93 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 93 |
| Prolia | Cancer | D/T 0‐24 Mos | — | — | C | 93 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 94 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 94 |
| Promethazine HCI (Hydrochloride) | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 94 |
| Propafenone | Any Condition |  | — | Std/Mod | · | 94 |
| " | Heart Rhythm Disorder |  | — | — | H | 94 |
| Propranolol; Propranolol HCL | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 94 |
| " | Irregular Heartbeat |  | Level | Pref/Std/Mod | H | 94 |
| " | Cardiomyopathy | D/T 0‐24 Mos | Graded | — | H | 94 |
| " | Periphral Vascular Disease |  | — | — | · | 94 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 94 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos ‐ Ever Accendo | Graded | Mod | H | 94 |
| " | Hypertension |  | Level | — | · | 94 |
| Propranolol + Blood Thinner | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | — | H | 94 |
| Protilase | Any Condition |  | — | Pref/Std/Mod | · | 94 |
| " | Cystic Fibrosis |  | DECLINE | — | R | 94 |
| " | Pancreatitis, Cystic Fibrosis |  | Level+Graded+DECLINE | — | R | 94 |
| Provenge | Cancer | D/T 0‐24 Mos | — | — | C | 94 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 94 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 94 |
| Proventil; Proventil HFA | Asthma |  | Level | — | R | 94 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 94 |
| " | COPD/Emphysema/Chronic | D/T 25‐36 Mos | Level | — | R | 94 |
| " | COPD/Emphysema/Chronic | D/T 37+ Mos | Level | — | R | 94 |
| Pulmicort | Asthma |  | Level | — | R | 94 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 94 |
| Pulmophylline | Asthma |  | Level | — | R | 94 |
| p y |  |  | — | — | · | 95 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 95 |
| " |  |  | — | — | · | 100 |
| " |  | D/T 25‐36 Mos | — | — | · | 100 |
| " |  | D/T 37+ Mos | Level | — | · | 100 |
| Purinethol | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 95 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 95 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 95 |
| Qbrelis | Cardiomyopathy | D/T 0‐24 Mos | Graded | Pref/Std/Mod | H | 95 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 95 |
| Quadramet | Cancer | D/T 0‐24 Mos | — | — | C | 95 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 95 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 95 |
| Quin‐G; Guin‐G Blood Thinner | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 95 |
| Quibron | Asthma |  | Level | — | R | 95 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 95 |
| Quinapril | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 95 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 95 |
| Quinaretic | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 95 |
| " | Hypertension |  | Level | — | · | 95 |
| Quinidex; Quinidex + Blood Thinner | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 95 |
| Quinidine; Quinidine + Blood | ThinneAtrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 95 |
| Quinora; Quinora + Blood Thinner | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 95 |
| Qvar | Asthma |  | Level | — | R | 95 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 95 |
| Radium Ra 223 Dichloride | Cancer | D/T 0‐24 Mos | — | — | C | 95 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 95 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 95 |
| Ramipril | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 96 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 96 |
| Ramucirumab | Cancer | D/T 0‐24 Mos | — | — | C | 96 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 96 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 96 |
| Ranexa | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 96 |
| " | Angina (Chest Pain) | D/T 24‐36 Mos ‐ Ever Ac | Level | — | H | 96 |
| " | Any Condition |  | Graded | Pref/Std/Mod | · | 96 |
| Ranolazine | Angina (Chest Pain) | D/T 0‐24 Mos ‐ Ever Accendo | Graded | Mod | H | 96 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 96 |
| Razadyne | Alzheimer's/Dementia |  | DECLINE | — | H | 96 |
| " | Alzheimer's/Dementia |  | — | DECLINE | H | 96 |
| Reclast | Any Condition |  | — | Pref/Std/Mod | · | 97 |
| " | Internal Cancer, Paget's | Disease, Multiple Myeloma | Graded+DECLINE | — | C | 97 |
| Regorafenib | Cancer | D/T 0‐24 Mos | — | — | C | 97 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 97 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 97 |
| Reminyl | Alzheimer's/Dementia |  | DECLINE | — | H | 97 |
| " | Any Condition |  | — | DECLINE | · | 97 |
| Reopro | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 97 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | — | — | H | 97 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | — | — | H | 97 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 97 |
| Retavase | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 97 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | — | — | H | 97 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | — | — | H | 97 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 97 |
| Revefenacin | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 97 |
| Revlimid | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 98 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 98 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 98 |
| Ribociclib | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 98 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 98 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 98 |
| Rituxan | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 99 |
| " | Cancer | D/T 24‐36 Mos | Graded | DECLINE | C | 99 |
| " | Leukemia | D/T 0‐24 Mos AHL ‐ Ever | DECLINE | DECLINE | C | 99 |
| " | Leukemia | D/T 24‐36 Mos | DECLINE | DECLINE | C | 99 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 99 |
| " | Rheumatoid Arthritis |  | Level | — | · | 99 |
| Rituximab | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 99 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 99 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 99 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 99 |
| " | Rheumatoid Arthritis |  | Level | — | · | 99 |
| Rivastigmine | Alzheimer's/Dementia |  | DECLINE | — | H | 99 |
| " | Any Condition |  | — | DECLINE | · | 99 |
| Roferon‐A | Any Condition |  | — | Mod | · | 99 |
| " | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 99 |
| Roflumilast | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 99 |
| Rolapitant Hydrochloride | Cancer | D/T 0‐24 Mos | — | — | C | 99 |
| Romidepsin | Cancer | D/T 0‐24 Mos | — | — | C | 100 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 100 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 100 |
| Rozlytrek | Cancer | D/T 0‐24 Mos | — | — | C | 100 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 100 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 100 |
| Rubex | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 100 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 100 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 100 |
| Rubraca | Cancer | D/T 0‐24 Mos | — | — | C | 100 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 100 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 100 |
| Ruxolitinib | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 100 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 100 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 100 |
| Rydapt | Cancer | D/T 0‐24 Mos | — | — | C | 100 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 100 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 101 |
| Rythmol | Arrhythmia | Medically diagnosed/tre | Level | — | H | 101 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 101 |
| Sacubitril/Valsartan | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 101 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 101 |
| Salmeterol | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | Std/Mod | R | 101 |
| Saluron | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 101 |
| " | Hypertension |  | Level | — | · | 101 |
| Samsca | Any Condition |  | — | Pref/Std/Mod | · | 101 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 101 |
| Sancuso | Cancer | D/T 0‐24 Mos | — | — | C | 101 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 101 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 101 |
| Sandimmune | Heart Surgery | D/T 0‐24 Mos | — | — | H | 101 |
| " | Kidney/Liver Disorder |  | — | — | · | 101 |
| " | Any Condition |  | — | DECLINE | · | 101 |
| Sandoglobutin | Cancer | D/T 0‐24 Mos | — | — | C | 101 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 101 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 101 |
| Sandostatin | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 101 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 101 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 101 |
| Savaysa | Atrial Fibrillation, Arrhythmia, | Irregular Heartbeat; H | Level+Graded | Pref/Std/Mod | H | 101 |
| Sclerosol | Asthma |  | Level | — | R | 101 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 101 |
| Sectral | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | — | H | 101 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | Graded | — | H | 102 |
| " | Hypertension |  | Level | — | · | 102 |
| Seebri | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | Std/Mod | R | 102 |
| Selinexor | Cancer | D/T 0‐24 Mos | — | — | C | 102 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 102 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 102 |
| Serevent | Asthma |  | Level | — | R | 102 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 102 |
| " | COPD/Emphysema/Chronic | D/T 25‐36 Mos | Graded | — | R | 102 |
| " | COPD/Emphysema/Chronic | D/T 37+ Mos | Level | — | R | 102 |
| Singulair | Allergies/Asthma |  | Level | — | R | 103 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 103 |
| Sodium Edecrin | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 103 |
| " | Hypertension |  | Level | — | · | 103 |
| Soltamox | Cancer | D/T 0‐24 Mos | — | — | C | 103 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 103 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 103 |
| Somatuline Depot | Cancer | D/T 0‐24 Mos | — | — | C | 103 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 103 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 103 |
| Sorafenib | Cancer | D/T 0‐24 Mos | — | — | C | 103 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 103 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 103 |
| Sotalol | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 103 |
| " | Hypertension |  | Level | — | · | 103 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 103 |
| Spiriva; Spiriva Respimat | Asthma |  | Level | — | R | 104 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | Std/Mod | R | 104 |
| " | COPD/Emphysema/Chronic | D/T 25‐36 Mos | Level | — | R | 104 |
| " | COPD/Emphysema/Chronic | D/T 37+ Mos | Level | — | R | 104 |
| Spironolactone | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 104 |
| " | Cardiomyopathy | D/T 0‐24 Mos | Graded | — | H | 104 |
| " | Kidney Disease, Cirrhosis |  | DECLINE | Pref/Std/Mod | · | 104 |
| " | Hypertension |  | Level | — | · | 104 |
| Sprycel | Leukemia | D/T 0‐24 Mos AHL ‐ Ever | DECLINE | — | C | 104 |
| " | Leukemia | D/T 24‐36 Mos | DECLINE | — | C | 104 |
| " | Cancer | D/T 0‐24 Mos | — | — | C | 104 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 104 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 104 |
| Stiolto Respimat | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 104 |
| Stivarga | Cancer Pain | D/T 0‐24 Mos | Graded | — | C | 104 |
| " | Cancer Pain | D/T 25‐36 Mos | — | — | C | 104 |
| " | Cancer Pain | D/T 37+ Mos | Level | — | C | 104 |
| " | Other Use | D/T 0‐36 Mos | — | — | · | 104 |
| Streptase | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 104 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | — | — | H | 104 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | — | — | H | 104 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 104 |
| Striverdi | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | Std/Mod | R | 105 |
| Subsys | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 105 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 105 |
| Sunitinib | Cancer Pain | D/T 0‐24 Mos | Graded | DECLINE | C | 105 |
| " | Cancer Pain | D/T 25‐36 Mos | Graded | DECLINE | C | 105 |
| " | Cancer Pain | D/T 37+ Mos | Level | DECLINE | C | 105 |
| Sutent | Cancer Pain | D/T 0‐24 Mos | Graded | DECLINE | C | 105 |
| " | Cancer Pain | D/T 25‐36 Mos | Graded | DECLINE | C | 105 |
| " | Cancer Pain | D/T 37+ Mos | Level | DECLINE | C | 105 |
| Sylatron | Cancer Pain | D/T 0‐24 Mos | Graded | — | C | 105 |
| " | Cancer Pain | D/T 25‐36 Mos | Graded | — | C | 105 |
| " | Cancer Pain | D/T 37+ Mos | Level | — | C | 105 |
| " | Any Condition |  | — | Mod | · | 105 |
| Symbicort | Asthma |  | Level | — | R | 105 |
| " | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | Std/Mod | R | 105 |
| " | COPD, Chronic Bronchitis, E | D/T 25‐36 Mos | Graded | — | R | 105 |
| " | COPD, Chronic Bronchitis, E | D/T 37+ Mos | Level | — | R | 105 |
| Synribo | Cancer Pain | D/T 0‐24 Mos | Graded | — | C | 106 |
| " | Cancer Pain | D/T 25‐36 Mos | Graded | — | C | 106 |
| " | Cancer Pain | D/T 37+ Mos | Level | — | C | 106 |
| Tabloid | Cancer Pain | D/T 0‐24 Mos | Graded | DECLINE | C | 106 |
| " | Cancer Pain | D/T 25‐36 Mos | Graded | DECLINE | C | 106 |
| " | Cancer Pain | D/T 37+ Mos | Level | DECLINE | C | 106 |
| Tacrine Hydrochloride | Alzheimer's/Dementia |  | DECLINE | — | H | 106 |
| Tacrolimus | Heart Surgery | D/T 0‐24 Mos | Graded | DECLINE | H | 106 |
| " | Kidney/Liver Disorder |  | — | DECLINE | · | 106 |
| " | Any Condition |  | — | DECLINE | · | 106 |
| Tafamidis Meglumine | Cardiomyopathy | D/T 0‐24 Mos | Graded | — | H | 106 |
| Tafinlar | Cancer | D/T 0‐24 Mos | — | — | C | 106 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 106 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 106 |
| Tagrisso | Cancer | D/T 0‐24 Mos | — | — | C | 106 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 106 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 106 |
| Talazoparib | Cancer | D/T 0‐24 Mos | — | — | C | 106 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 106 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 106 |
| Talimogene Laherparepvec | Cancer | D/T 0‐24 Mos | — | — | C | 106 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 106 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 106 |
| Talzenna | Cancer | D/T 0‐24 Mos | — | — | C | 106 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 107 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 107 |
| Tambocor | Arrhythmia | Medically diagnosed/tre | Level | — | H | 107 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 107 |
| Tamoxifen | Breast Cancer | D/T 0‐24 Mos | — | — | C | 107 |
| " | Breast Cancer | D/T 24‐36 Mos | Level | — | C | 107 |
| Tamoxifen; Tamoxifen Citrate | Cancer | D/T 0‐24 Mos | — | — | C | 107 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 107 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 107 |
| Tarceva | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 107 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 107 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 107 |
| Targretin | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 107 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 107 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 107 |
| Tarka | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 107 |
| " | Hypertension |  | Level | — | · | 107 |
| Tasigna | Cancer | D/T 0‐24 Mos | — | — | C | 107 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 107 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 107 |
| Taxol | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 107 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 107 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 107 |
| Taxotere | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 107 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 107 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 107 |
| Taztia | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 107 |
| " | Hypertension |  | Level | — | · | 107 |
| Tecetriq | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 108 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 108 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 108 |
| Telmisartan | Heart Condition(Stroke, TIA | D/T 0‐12 Mos | Graded | — | H | 108 |
| " | Heart Condition(Stroke, TIA | D/T 13‐24 Mos | — | — | H | 108 |
| " | Heart Condition(Stroke, TIA | D/T 25‐36 Mos | — | — | H | 108 |
| " | Heart Condition(Stroke, TIA | D/T 37+ Mos | Level | — | H | 108 |
| " | Hypertension |  | Level | — | · | 108 |
| Temodar | Cancer | D/T 0‐24 Mos | — | — | C | 108 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 108 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 108 |
| Temozolomide | Cancer | D/T 0‐24 Mos | — | — | C | 108 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 108 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 108 |
| Temsirolimus | Cancer | D/T 0‐24 Mos | — | — | C | 109 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 109 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 109 |
| Teniposide | Cancer | D/T 0‐24 Mos | — | — | C | 109 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 109 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 109 |
| Tenoretic | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 109 |
| " | Hypertension |  | Level | — | · | 109 |
| Tenormin | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 109 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos/Prosperity ‐ Ever | Graded | Mod | H | 109 |
| " | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 109 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 109 |
| Tenormin + Blood Thinner | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 109 |
| Terbutaline; Terbutaline Sulfate | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 109 |
| " | Asthma |  | Level | — | R | 109 |
| Teslac | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 109 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 109 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 109 |
| Testolactone | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 109 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 109 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 109 |
| Teveten | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 109 |
| " | Hypertension |  | Level | — | · | 109 |
| Thalidomide | Multiple Myeloma |  | DECLINE | DECLINE | C | 109 |
| Thalidomide; Thalomid | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 109 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 109 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 110 |
| Thalitone | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 110 |
| " | Hypertension |  | Level | — | · | 110 |
| Thalomid |  |  | — | — | · | 110 |
| " | Any Condition |  | — | DECLINE | · | 110 |
| " | Multiple Myeloma |  | DECLINE | DECLINE | C | 110 |
| Theochron |  |  | — | — | · | 110 |
| " | Asthma |  | Level | — | R | 110 |
| Theodur | Asthma |  | Level | — | R | 110 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 110 |
| " | COPD/Emphysema/Chronic | D/T 25‐36 Mos | Graded | — | R | 110 |
| " | COPD/Emphysema/Chronic | D/T 37+ Mos | Level | — | R | 110 |
| Theolair | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 110 |
| " | Asthma |  | Level | — | R | 110 |
| Theolate | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 110 |
| " | Asthma |  | Level | — | R | 110 |
| Theomar GG | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 110 |
| " | Asthma |  | Level | — | R | 110 |
| Theophylline | Asthma |  | Level | — | R | 110 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 110 |
| " | COPD/Emphysema/Chronic | D/T 25‐36 Mos | Graded | — | R | 110 |
| " | COPD/Emphysema/Chronic | D/T 37+ Mos | Level | — | R | 110 |
| Theracys | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 110 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 110 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 110 |
| Thioplex | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 110 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 110 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 110 |
| Thioquanine | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 110 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 110 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 110 |
| Thiotepa; Thioplex | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 110 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 110 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 111 |
| Tiazac | Angina (Chest Pain) | D/T 0‐24 Mos ‐ Ever Accendo | Graded | Mod | H | 111 |
| " | Hypertension |  | Level | — | · | 111 |
| Tibsovo | Cancer | D/T 0‐24 Mos | — | — | C | 111 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 111 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 111 |
| Ticagrelor | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 111 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | — | — | H | 111 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | — | — | H | 111 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 111 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | Mod | H | 111 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 111 |
| Tice BCG | Cancer | D/T 0‐24 Mos | — | — | C | 111 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 111 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 111 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 111 |
| Ticlid | PVD/PAD | D/T 0‐24 Mos | Graded | Pref/Std/Mod | H | 111 |
| Ticlid; Ticlopidine HCL | Heart Condition(Stroke, TIA, | With in 24 mos concurrent for o | Graded | — | H | 111 |
| " | Heart Condition(Stroke, TIA, | 24 mos Not Concurent | Graded | — | H | 111 |
| " | Heart Condition(Stroke, TIA, | With in 24mos | — | — | H | 111 |
| " | Heart Condition(Stroke, TIA, | 24 mos + | Level | — | H | 111 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 111 |
| Ticlopidine | PVD/PAD | D/T 0‐24 Mos | Graded | Pref/Std/Mod | H | 111 |
| Tiotropium | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | Std/Mod | R | 111 |
| " | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | — | R | 111 |
| Tiotropium Bromide & Olodaterol | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 111 |
| Tipiracil & Trifluridine | Cancer | D/T 0‐24 Mos | — | — | C | 112 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 112 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 112 |
| TNKASE | Heart Condition(Stroke, TIA, | D/T 0‐12 Mos | Graded | — | H | 112 |
| " | Heart Condition(Stroke, TIA, | D/T 13‐24 Mos | — | — | H | 112 |
| " | Heart Condition(Stroke, TIA, | D/T 25‐36 Mos | — | — | H | 112 |
| " | Heart Condition(Stroke, TIA, | D/T 37+ Mos | Level | — | H | 112 |
| Tolvaptan | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 112 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 112 |
| Tomoxafin | Cancer | D/T 0‐24 Mos | — | — | C | 112 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 112 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 112 |
| Toposar | Cancer | D/T 0‐24 Mos | — | — | C | 113 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 113 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 113 |
| Topotecan HCL | Cancer | D/T 0‐24 Mos | — | — | C | 113 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 113 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 113 |
| Toprol | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 113 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos ‐ Ever Accendo | Graded | Mod | H | 113 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 113 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 113 |
| Toprol; Toprol Blood Thinner | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | — | H | 113 |
| Toremifene | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 113 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 113 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 113 |
| Torisel | Cancer | D/T 0‐24 Mos | — | — | C | 113 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 113 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 113 |
| Torsemide | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 113 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 113 |
| " | Kidney Disease, Liver Diseas | D/T 0‐24 Mos | Graded | — | · | 113 |
| " | Kidney Failure, Cirrhosis, Co | Been treated or diagnosed | DECLINE | Pref/Std/Mod | · | 113 |
| Tositumomab | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 113 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 113 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 113 |
| Totect | Cancer | D/T 0‐24 Mos | — | — | C | 113 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 113 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 113 |
| Trabectedin | Cancer | D/T 0‐24 Mos | — | — | C | 113 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 113 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 113 |
| Trametinib | Cancer | D/T 0‐24 Mos | — | — | C | 114 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 114 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 114 |
| Trandate | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 114 |
| " | Hypertension |  | Level | — | · | 114 |
| Trandolapril | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 114 |
| " | Heart Attack | D/T 0‐12 Mos ‐ Prosperity | Graded | — | H | 114 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 114 |
| Trastuzumab | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 114 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 114 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 114 |
| Treanda | Cancer | D/T 0‐24 Mos | — | — | C | 114 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 114 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 114 |
| Trelegy Ellipta | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | Std/Mod | R | 114 |
| " | COPD, Chronic Bronchitis, E | D/T 25‐36 Mos | — | — | R | 114 |
| " | COPD, Chronic Bronchitis, E | D/T 37+ Mos | Level | — | R | 114 |
| Trelstar; Trelstar LA | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 114 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 114 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 114 |
| Trental | Peripheral Vascular, Peripheral | Artery Disease | — | Pref/Std/Mod | H | 114 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 114 |
| Tretinoin | Cancer | D/T 0‐24 Mos | — | — | C | 114 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 114 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 114 |
| Triamterene; Trimterene HCTZ | Edema |  | Level | — | · | 115 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 115 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 115 |
| Tribenzor | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 115 |
| " | Hypertension |  | Level | — | · | 115 |
| Trisenox | Cancer | D/T 0‐24 Mos | — | — | C | 115 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 115 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 115 |
| Tudorza | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | Std/Mod | R | 116 |
| Tudorza Pressair | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 116 |
| Twynsta | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 116 |
| " | Hypertension |  | Level | — | · | 116 |
| Tykerb | Cancer | D/T 0‐24 Mos | — | — | C | 116 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 116 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 116 |
| Ultrase | Cystic Fibrosis |  | DECLINE | DECLINE | R | 116 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 116 |
| Ultresa | Cystic Fibrosis |  | DECLINE | DECLINE | R | 116 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 116 |
| Umeclidinium | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | Std/Mod | R | 116 |
| " | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | — | R | 116 |
| Umeclidinium & Vilanterol | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | Std/Mod | R | 116 |
| " | COPD, Chronic Bronchitis, E | D/T 0‐24 Mos | Graded | — | R | 116 |
| Uniretic | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 116 |
| " | Hypertension |  | Level | — | · | 116 |
| Unituxin | Cancer | D/T 0‐24 Mos | — | — | C | 117 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 117 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 117 |
| Univasc | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 117 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 117 |
| Uridine Triacetate | Cancer | D/T 0‐24 Mos | — | — | C | 117 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 117 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 117 |
| Uromitexan | Cancer | D/T 0‐24 Mos | — | — | C | 117 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 117 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 117 |
| Utibron | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 117 |
| Uvadex | Cancer | D/T 0‐24 Mos | — | — | C | 117 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 117 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 117 |
| Valsartan | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 118 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 118 |
| Valsartan + Sacubitril | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 118 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 118 |
| Valstar | Bladder Cancer | D/T 0‐24 Mos | DECLINE | — | C | 118 |
| " | Bladder Cancer | D/T 24‐36 Mos | DECLINE | — | C | 118 |
| " | Cancer | D/T 0‐24 Mos | — | — | C | 118 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 118 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 118 |
| Valturna | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 118 |
| " | Hypertension |  | Level | — | · | 118 |
| Vandetanib | Cancer | D/T 0‐24 Mos | — | — | C | 118 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 118 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 118 |
| Vantas | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 118 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 118 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 118 |
| Varenicline | Smoking Cessation | D/T 0‐12 Mos/Smoker R | Level | — | R | 118 |
| Varubi | Cancer | D/T 0‐24 Mos | — | — | C | 118 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 118 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 118 |
| Vascor | Angina (Chest Pain) | D/T 0‐24 Mos | Graded | — | H | 118 |
| " | Angina (Chest Pain) | D/T 24‐36 Mos | Level | — | H | 118 |
| Vaseretic | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 118 |
| " | Hypertension |  | Level | — | · | 118 |
| Vasotec | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 118 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 118 |
| Vectibix | Cancer | D/T 0‐24 Mos | — | — | C | 118 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 118 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 118 |
| Velban | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 118 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 118 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 118 |
| Velcade | Cancer | D/T 0‐24 Mos | — | — | C | 118 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 119 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 119 |
| Vemurafenib | Cancer | D/T 0‐24 Mos | — | — | C | 119 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 119 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 119 |
| Venclexta | Cancer | D/T 0‐24 Mos | — | — | C | 119 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 119 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 119 |
| Venetoclax | Cancer | D/T 0‐24 Mos | — | — | C | 119 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 119 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 119 |
| Venoglobulin‐S | Cancer | D/T 0‐24 Mos | — | — | C | 119 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 119 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 119 |
| Ventolin; Ventolin HFA | Asthma |  | Graded | — | R | 119 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | Std/Mod | R | 119 |
| " | COPD/Emphysema/Chronic | D/T 25‐36 Mos | Graded | — | R | 119 |
| " | COPD/Emphysema/Chronic | D/T 37+ Mos | Level | — | R | 119 |
| Vepesid | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 119 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 119 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 119 |
| Verapamil | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | — | H | 119 |
| " | Angina (Chest Pain) | D/T 0‐24 Mos/Prosperity ‐ Ever | Graded | Mod | H | 119 |
| " | Irregular Heartbeat |  | Level | Pref/Std/Mod | H | 119 |
| " | Cardiomyopathy | D/T 0‐24 Mos | Graded | Mod | H | 119 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 119 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 119 |
| Verapamil + Blood Thinner | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 119 |
| Verelan | Angina (Chest Pain) |  | Graded | Mod | H | 119 |
| " | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 120 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 120 |
| " | Cardiomyopathy | D/T 0‐24 Mos | Graded | — | H | 120 |
| Verelan + Blood Thinner | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 120 |
| Verzenio | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 120 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 120 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 120 |
| Vesanoid | Cancer | D/T 0‐24 Mos | — | — | C | 120 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 120 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 120 |
| Viadur | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 120 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 120 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 120 |
| Vidaza | Cancer | D/T 0‐24 Mos | — | — | C | 120 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 120 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 120 |
| Vinblastine, Vinblastine Sulfate | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 120 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 120 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 120 |
| Vincasar, Vincasar PFS | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 120 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 121 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 121 |
| Vincristine, Vincristine Sulfate | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 121 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 121 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 121 |
| Vio‐Moore | Cystic Fibrosis, Cancer |  | Level+Graded+DECLINE | DECLINE | R+C | 121 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 121 |
| Viokace | Cystic Fibrosis, Cancer |  | Level+Graded+DECLINE | DECLINE | R+C | 121 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 121 |
| Viokase | Cystic Fibrosis, Cancer |  | Level+Graded+DECLINE | DECLINE | R+C | 121 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 121 |
| Vinorelbine Tartrate | Cancer | D/T 0‐24 Mos | — | — | C | 121 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 121 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 121 |
| Visken | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 121 |
| " | Hypertension |  | Level | — | · | 121 |
| Vistogard | Cancer | D/T 0‐24 Mos | — | — | C | 121 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 121 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 121 |
| Vitrakvi | Cancer | D/T 0‐24 Mos | — | — | C | 121 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 121 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 121 |
| Vizimpro | Cancer | D/T 0‐24 Mos | — | — | C | 121 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 121 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 121 |
| Vorinostat | Cancer | D/T 0‐24 Mos | — | — | C | 121 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 122 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 122 |
| VoSpire ER | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 122 |
| " | Asthma |  | Level | — | R | 122 |
| Votrient | Cancer | D/T 0‐24 Mos | — | — | C | 122 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 122 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 122 |
| Vumon | Cancer | D/T 0‐24 Mos | — | — | C | 122 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 122 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 122 |
| Vyndagel | Cardiomyopathy | D/T 0‐24 Mos | Graded | — | H | 122 |
| Vyxeos | Cancer | D/T 0‐24 Mos | — | — | C | 122 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 122 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 122 |
| Warfarin; Warfarin Sodium | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 122 |
| " | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 122 |
| " | Stroke/Heart Attack/TIA | D/T 0‐24 Mos | Graded | — | H | 122 |
| " | Stroke/Heart Attack/TIA | D/T 25‐36 Mos | Level | — | H | 122 |
| " | Cardiac Valve Replacement | D/T 0‐24 Mos | Level | — | H | 122 |
| " | Cardiac Valve Replacement | D/T 25‐36 Mos | Level | — | H | 122 |
| " | Pulmonary Embolism | D/T 0‐24 Mos | Graded | — | R | 122 |
| " | Thrombosis | D/T 0‐24 Mos | Graded | — | · | 122 |
| " | Generic Surgery |  | Level | — | · | 122 |
| Wellferon | Any Condition |  | — | Pref/Std/Mod | · | 122 |
| " | Cancer | D/T 0‐36 Mos ‐ (AHL ‐ APS) | Graded | DECLINE | C | 122 |
| " | Liver Disease | D/T 0‐24 Mos | Graded | Mod | · | 122 |
| Xalkori | Cancer | D/T 0‐24 Mos | — | — | C | 122 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 123 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 123 |
| Xarelto | Atrial Fibrillation, Arrhythm | Medically diagnosed/tre | Level | Pref/Std/Mod | H | 123 |
| Xatmep | Any Condition |  | — | Pref/Std/Mod | · | 123 |
| " | Cancer | D/T 0‐36 Mos ‐ (AHL ‐ APS) | Graded | DECLINE | C | 123 |
| " | Organ Transplant | Has or has been advised to have | DECLINE | DECLINE | · | 123 |
| Xeloda | Metastatic Cancer | D/T 0‐24 Mos | DECLINE | DECLINE | C | 123 |
| " | Metastatic Cancer | D/T 24‐36 Mos | DECLINE | DECLINE | C | 123 |
| " | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 123 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 123 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 123 |
| Xgeva | Cancer | D/T 0‐24 Mos | — | — | C | 123 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 123 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 123 |
| Xofigo | Cancer | D/T 0‐24 Mos | — | — | C | 123 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 123 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 123 |
| Xolair | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 123 |
| " | Asthma |  | Level | — | R | 123 |
| Xopenex; Xopenex HFA | Asthma |  | Level | — | R | 123 |
| " | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 123 |
| " | COPD/Emphysema/Chronic | D/T 25‐36 Mos | Graded | — | R | 123 |
| " | COPD/Emphysema/Chronic | D/T 37+ Mos | Level | — | R | 123 |
| Xospata | Cancer | D/T 0‐24 Mos | — | — | C | 123 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 123 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 123 |
| Xpovio | Cancer | D/T 0‐24 Mos | — | — | C | 123 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 123 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 123 |
| Xtandi | Metastatic Cancer | D/T 0‐24 Mos | DECLINE | DECLINE | C | 123 |
| " | Metastatic Cancer | D/T 24‐36 Mos | DECLINE | DECLINE | C | 124 |
| " | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 124 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 124 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 124 |
| Yervoy | Cancer | D/T 0‐24 Mos | — | — | C | 124 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 124 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 124 |
| Yescarta | Cancer | D/T 0‐24 Mos | — | — | C | 124 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 124 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 124 |
| Yondelis | Cancer | D/T 0‐24 Mos | — | — | C | 124 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 124 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 124 |
| Yupelri | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 124 |
| Zaltrap | Cancer | D/T 0‐24 Mos | — | — | C | 124 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 124 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 124 |
| Zanosar | Cancer | D/T 0‐24 Mos | — | — | C | 124 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 124 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 124 |
| Zaroxolyn | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 124 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 124 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 124 |
| Zebeta | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 124 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 124 |
| Zejula | Cancer | D/T 0‐24 Mos | — | — | C | 124 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 124 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 124 |
| Zelborat | Cancer | D/T 0‐24 Mos | — | — | C | 124 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 125 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 125 |
| Zemaira | COPD/Emphysema/Chronic | D/T 0‐24 Mos | Graded | — | R | 125 |
| Zenpep | Cystic Fibrosis |  | DECLINE | DECLINE | R | 125 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 125 |
| Zestoretic | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 125 |
| " | Hypertension |  | Level | — | · | 125 |
| Zestril | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | DECLINE | H | 125 |
| " | Hypertension | D/T 0‐12 Mos ‐ Prosperi | Level | — | · | 125 |
| Zevalin | Cancer | D/T 0‐24 Mos | — | — | C | 125 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 125 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 125 |
| Ziac | CHF (Congestive Heart Failu | Medically diagnosed/treated | DECLINE | — | H | 125 |
| " | Hypertension |  | Level | — | · | 125 |
| Zinecard | Cancer | D/T 0‐24 Mos | — | — | C | 125 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 125 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 125 |
| Ziv‐Afibercept | Cancer | D/T 0‐24 Mos | — | — | C | 125 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 125 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 126 |
| Zofran; Zofran ODT | Cancer | D/T 0‐24 Mos | — | — | C | 126 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 126 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 126 |
| " | Other Use | D/T 0‐36 Mos | — | — | · | 126 |
| Zoladex | Breast Cancer/Prostate Can | D/T 0‐24 Mos | — | DECLINE | C | 126 |
| " | Breast Cancer/Prostate Can | D/T 24‐36 Mos | Graded | DECLINE | C | 126 |
| " | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 126 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 126 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 126 |
| Zoledronic Acid | Any Condition |  | — | Pref/Std/Mod | · | 126 |
| " | Internal Cancer, Multiple | Myeloma, Paget's Disease | Graded+DECLINE | Pref/Std/Mod | C | 126 |
| Zolinza | Cancer | D/T 0‐24 Mos | — | — | C | 126 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 126 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 126 |
| Zometa | Cancer | D/T 0‐24 Mos | — | — | C | 126 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 126 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 126 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 126 |
| " | Internal Cancer, Multiple | Myeloma, Paget's Disease | Graded+DECLINE | — | C | 126 |
| Zuplenz | Cancer | D/T 0‐24 Mos | — | — | C | 126 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 126 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 126 |
| " | Other Use | D/T 0‐36 Mos | — | — | · | 126 |
| Zyban | Smoking Cessation | D/T 0‐12 Mos/Smoker R | Level | — | R | 126 |
| Zydelig | Cancer | D/T 0‐24 Mos | — | — | C | 126 |
| " | Cancer | D/T 25‐36 Mos | — | — | C | 126 |
| " | Cancer | D/T 37+ Mos | Level | — | C | 126 |
| Zykadia | Cancer | D/T 0‐24 Mos | — | — | C | 126 |
| Zymase | Cystic Fibrosis |  | DECLINE | DECLINE | R | 127 |
| " | Any Condition |  | — | Pref/Std/Mod | · | 127 |
| Zytiga | Metastatic Cancer | D/T 0‐24 Mos | DECLINE | DECLINE | C | 127 |
| " | Metastatic Cancer | D/T 24‐36 Mos | DECLINE | DECLINE | C | 127 |
| " | Cancer | D/T 0‐24 Mos | — | DECLINE | C | 127 |
| " | Cancer | D/T 25‐36 Mos | — | DECLINE | C | 127 |
| " | Cancer | D/T 37+ Mos | Level | DECLINE | C | 127 |

---
*Extraction generated 2026-08-07 from word-coordinate parse; ⚠ rows flagged above should be confirmed with AHL underwriting before being hard-coded into the quoting app.*
