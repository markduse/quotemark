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
- **Smoking cessation**: Chantix "D/T 0-12 Mos/Smoker R…" → GS Level (p. 25); Nicorette/nicotine products → Level (see table).

**Full table:**

