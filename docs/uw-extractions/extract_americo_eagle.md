# Americo — Eagle Premier Series (Eagle Premier / Eagle Guaranteed) — Official Agent Guide Extraction

**Source:** "Eagle Premier Series Agent Guide," Americo Financial Life and Annuity Insurance Company, Policy Series 311/312/313, form 13-178-7 (10/18). 16 pages. Extracted 2026-08-08 from `/Users/marksmacmini/Downloads/Eagle Premier UW.pdf`.
**For agent use only. Not for public use.**

---

## CRITICAL STRUCTURAL FINDING (read first)

This official guide contains **NO condition-by-condition underwriting rules**. There are no COPD, heart/cardiovascular, cancer, stroke, or any diagnosis-specific windows anywhere in the document, and the application health questions are **not reproduced** in this guide — per p.13, "Health Questions – All Health Questions will be asked from the state specific application."

The entire underwriting model is a **binary Accept/Reject** (p.14):

> "The products are issued on an Accept/Reject basis according to health questions on the application. A Prescription Drug Check and Medical Information Bureau (MIB) review is required." (p.14)

**Eagle Premier will be issued if:** (p.14, verbatim checklist)
- "All health questions (except for the smoker question) on the application are answered 'no'."
- "Height and weight are within guidelines."
- "MIB records are clear or provide no information that is inconsistent with health history given on the application."
- "Prescription database history is clear or provides no information that is inconsistent with the health history provided on the application."

**Eagle Guaranteed will be issued if:** (p.14, verbatim checklist)
- "No health questions are answered on the application," OR
- "Any health questions (except for the smoker question) on the application are answered 'yes'," OR
- "Height and weight are outside guidelines."

**Implications for the quoting app:**
1. Any single "yes" health answer (whatever the state application's lookback window is) → falls to Eagle Guaranteed (guaranteed issue, 3-year graded). There is no intermediate/graded Premier tier.
2. Eagle Guaranteed is **true guaranteed issue** — it is issued even if the client answers nothing, answers "yes" to everything, or fails build. Within issue ages 50–80 and face $2,000–$10,000, **there is no health-based decline path documented in this guide.** (A "decline" outcome for any condition, e.g. malignant melanoma, is NOT supported by this document.)
3. The specific condition windows (e.g., "COPD ever," "heart attack within 2 years," etc.) live on the **state-specific application**, not in this guide. To encode condition→tier routing for Eagle Premier, the app needs the application's health questions — this guide cannot supply them.
4. Rx and MIB are used only as **consistency checks** against the answers, not as independent knockout tables. No named medication list appears in this guide.

---

## Products at a Glance (p.5)

| | Eagle Premier | Eagle Guaranteed |
|---|---|---|
| **Issue Ages (Age Last Birthday)** | 50–85 Nonsmoker; 50–80 Smoker | 50–80 |
| **Face Amounts** | Minimum: $2,000 ($5,000 in Washington); Maximum: $30,000 | Minimum: $2,000; Maximum: $10,000 |
| **Death Benefit** | "Full death benefit day one" | "3-year graded death benefit — Year 1: return of premium plus 5%; Year 2: return of premium plus 10%; Year 3: 75% of the face amount; Year 4+: 100% of the face amount" |
| **Annual Policy Fee** | $40 (commissionable) | $40 (non-commissionable) |
| **Riders/Features** | Accidental Death Benefit Rider included (Series 2172); Accelerated Benefit Payment Rider included at no additional cost (Series 2146); Child and Grandchild Term Rider available for an additional cost (Series 2194) | Accidental Death Benefit provision included during the graded period at no additional cost; **No riders available.** |
| **Modal Factors** | Monthly PAC: 0.095 | Monthly PAC: 0.095 |
| **Underwriting Classes** | Nonsmoker; Smoker | Nonsmoker; Smoker |
| **Competitive features** | Two instant-decision processes (eApplication, TeleApplication); Simplified issue; Quit Smoking Advantage — smokers qualify for Nonsmoker rates | Two instant-decision processes; Simple application process; **Guaranteed issue**; Guaranteed level premiums for the life of the policy; Accidental Death Benefit provision included during the graded period at no additional cost |

- Underwriting product type: whole life final expense; no medical exams — "product is issued based on answers to health questions" (p.4). "Simple to explain and every client can qualify for coverage" (p.4).
- Payment on TeleApplication: "only a pre-authorized monthly withdrawal from a checking or savings account is available for payment" (p.12).
- Montana: "In MT use Male rates for Unisex rates." (p.15)

---

## Tobacco / Nicotine Rules (p.5, p.6–7)

**Nonsmoker Classification (p.5, verbatim):**
> "A Nonsmoker is defined as anyone who has not used Nicotine products (including, but not limited to, cigarettes, cigars, pipes, chewing tobacco, snuff, alternative nicotine delivery devices such as nicotine chewing gum or lozenges, nicotine patches or e-cigarettes, or any device used for the vaporization of liquid nicotine) for at least 12 months prior to the completion date of the application."

**Quit Smoking Advantage (Eagle Premier only; NOT available on Eagle Guaranteed) (p.6–7):**
- "Smokers receive Nonsmoker rates in the first three years." (p.6)
- "If they provide satisfactory evidence that they have quit smoking for at least 12 months during those first three years, they will continue to receive Nonsmoker rates for the life of the policy, without any additional underwriting." (p.6)
- "If after the 3rd policy year the Insured has not quit smoking, the policy will automatically decrease the Death Benefit amount in year 4, the premiums will remain level. The Accidental Death Benefit amounts will decrease in year 4 to be equal to the base policy face amount. To keep the same face amount, the Insured must proactively call in to the home office and request to keep the level Death Benefit and pay a higher premium for the remainder of the policy." (p.7)
- "The earliest an Insured can verify they have stopped smoking is after the first policy year, provided that the Insured has ceased the use of nicotine for 12 consecutive months." (p.7)
- "Product quotes should be run for Smoker rates." / "The policy will be issued as a Smoker, but the Insured will receive Nonsmoker rates." (p.7)
- Quit Smoking Advantage issue ages 50–80 (p.7).
- Example (p.6): Male 65, $10,000 DB, $62.92/mo first 3 years; year 4+ if never quits: default = $62.92 with $5,420.30 DB, or $112.87 for full $10,000 DB.
- **No COPD/emphysema/bronchitis, oxygen, or inhaler rules exist anywhere in this guide.** Tobacco affects rate class only, never eligibility (smoker issue age caps at 80 vs 85 nonsmoker on Premier).

---

## Condition-Specific Rules: COPD / Heart / Cancer

**None present in this document.** Verbatim search of all 16 pages: the guide never mentions COPD, emphysema, bronchitis, oxygen, heart attack, MI, stent, bypass, CHF, cardiomyopathy, angina, CAD, atrial fibrillation, pacemaker, valve, aneurysm, stroke, TIA, cancer, melanoma, or any other diagnosis. All health-based routing is the accept/reject logic on p.14 (quoted above), driven by the **state-specific application's** health questions, which are not included here.

## Application Knockout Questions

**Not reproduced in this guide.** The TeleApplication section states only: "Health Questions – All Health Questions will be asked from the state specific application." (p.13) and "Ask the correct state approved health questions to pre-qualify the proposed insured." (p.12). To get verbatim knockouts, source the state application form (Policy Series 311/312/313), not this agent guide.

## Rx / Medication Rules

No drug list in this guide. Rules that do exist:
- "A Prescription Drug Check and Medical Information Bureau (MIB) review is required." (p.14)
- Premier issuance requires: "Prescription database history is clear or provides no information that is inconsistent with the health history provided on the application." (p.14)
- TeleApp Verbal Authorization: "Allows Americo to access MIB records and Prescription Drug check. Disclosures will be read to Insured." (p.13)
- "Rx and MIB results returned quickly" (point-of-sale decisions, p.10).

---

## Underwriting Build Chart (p.14) — applies to Eagle Premier; outside = Eagle Guaranteed

| Height | Weight (lbs) | Height | Weight (lbs) |
|---|---|---|---|
| 4'8" | 79–189 | 5'8" | 116–279 |
| 4'9" | 81–196 | 5'9" | 119–287 |
| 4'10" | 84–203 | 5'10" | 122–296 |
| 4'11" | 87–210 | 5'11" | 126–304 |
| 5'0" | 90–217 | 6'0" | 130–313 |
| 5'1" | 93–224 | 6'1" | 133–322 |
| 5'2" | 96–232 | 6'2" | 137–331 |
| 5'3" | 99–239 | 6'3" | 141–340 |
| 5'4" | 102–247 | 6'4" | 144–349 |
| 5'5" | 106–255 | 6'5" | 148–358 |
| 5'6" | 109–263 | 6'6" | 152–367 |
| 5'7" | 112–271 | 6'7" | 156–377 |

---

## Riders (p.8–9)

**Accelerated Benefit Payment Rider — Series 2146 (Eagle Premier only, included at no additional cost) (p.8):**
- Qualified terminal illness with life expectancy of 12 months or less (24 months or less in IL, MA, and TX) → advance up to 50% of the death benefit payable; reduced by any outstanding policy loans; will not exceed $15,000; minimum accelerated benefit $1,000 (state variations apply).
- No premium; admin fee up to $250 at time of payment; lien plus fee imposed on policy; only one acceleration per policy; interest charged on the lien.

**Accidental Death Benefit Rider — Series 2172 (Eagle Premier only) (p.8):**
- "An Accidental Death Benefit rider equal to the policy face amount will be added automatically to the policy." Pays if death from bodily injury directly resulting from an accident; additional amount if accidental death as fare-paying passenger on a common carrier.

**Accidental Death Provision (Eagle Guaranteed only) (p.9):**
- "If death occurs as the result of an accident during the graded death benefit period, the full death benefit is payable." Included at no additional cost.

**Child and Grandchild Term Rider — Series 2194 (Eagle Premier only, additional cost) (p.9):**
- Level term on an insured child to age 25; units of $1,000, same for all insured children; max per child = lesser of $5,000 or base policy face amount; $2.10 per $1,000 per child annually; expires at child's 25th birthday.
- Eligible child: natural child, stepchild, or legally adopted child of the base insured, or of the base insured's natural/step/adopted child (i.e., grandchild, dependent or not); at least 15 days old and under age 17 at application; cannot be added after issue except an eligible child acquired after issue may be added within 60 days of first becoming eligible; limited to 10 insured children.
- Conversion: available after the earlier of the insured child's 18th birthday or the base insured's death, and no later than the child's 22nd birthday; conversion amount cannot exceed the child's coverage.

---

## Policy Mechanics (p.5)

- **Policy loans:** loan interest charged in advance at fixed 7.4%/yr compounded annually (effective 8.0% in arrears); if loans + interest exceed cash value the policy terminates; state variations apply.
- **Nonforfeiture options:** reduced paid-up insurance, ETI, and cash surrender; automatic option is reduced paid-up.

---

## Submission Processes & State Availability (p.10–13)

- Two instant-decision processes: **eApplication** (24/7, on-screen decision) and **TeleApplication** (855.248.8327; 8am–7pm CT Mon–Thu, 8am–5pm CT Fri; decision in minutes; verbal signature). Policy number provided immediately; policy typically mailed within one business day; no amendments, no paperwork (p.10).
- **eApp availability:** Eagle Premier — all states except MS, NY, VT. Eagle Guaranteed — all states except MS, NY, VT, and WA. (p.11)
- **TeleApp availability:** Eagle Premier — all states except CA, CT, NY, PA, VT. Eagle Guaranteed — all states except CA, CT, NY, PA, VT, and WA. (p.13)
- "Replacements are allowed using the eApplication process only." (p.11) / "Replacements are not available on TeleApplications." (p.13)
- Americo is authorized in DC and all states except NY (p.16).
- Signing for a client is fraud; full signatures required on eApplication (p.10).

---

## Rate Charts (p.15) — Annual Premium per $1,000 of Face Amount

Add $40 annual policy fee. Monthly PAC modal factor: 0.095. In MT use Male rates for Unisex.
Premium calc: (rate × thousands) + $40 fee = annual; annual × 0.095 = monthly PAC.

### Eagle Premier

Smoker Yrs 4+ note (p.15, verbatim): "After year 3, the default option is a decrease in the death benefit, which will keep the policy premium level. These premiums apply when the insured continues to smoke and wants to keep the same death benefit amount as in years 1-3."

| Age | M Non-Smoker | M Smoker Yrs 1–3 | M Smoker Yrs 4+ | F Non-Smoker | F Smoker Yrs 1–3 | F Smoker Yrs 4+ |
|---|---|---|---|---|---|---|
| 50 | 36.34 | 36.34 | 56.33 | 30.34 | 30.34 | 42.05 |
| 51 | 37.60 | 37.60 | 58.09 | 31.08 | 31.08 | 43.35 |
| 52 | 38.97 | 38.97 | 59.88 | 31.92 | 31.92 | 44.70 |
| 53 | 40.34 | 40.34 | 62.87 | 32.65 | 32.65 | 46.93 |
| 54 | 41.71 | 41.71 | 65.39 | 33.39 | 33.39 | 48.81 |
| 55 | 42.97 | 42.97 | 68.01 | 34.23 | 34.23 | 50.76 |
| 56 | 43.81 | 43.81 | 70.74 | 34.34 | 34.34 | 52.79 |
| 57 | 44.55 | 44.55 | 76.71 | 34.44 | 34.44 | 55.19 |
| 58 | 45.29 | 45.29 | 80.55 | 34.65 | 34.65 | 57.40 |
| 59 | 46.13 | 46.13 | 84.58 | 35.41 | 35.41 | 59.69 |
| 60 | 48.28 | 48.28 | 88.81 | 36.48 | 36.48 | 62.08 |
| 61 | 50.42 | 50.42 | 93.24 | 38.62 | 38.62 | 64.57 |
| 62 | 53.65 | 53.65 | 99.17 | 40.77 | 40.77 | 65.92 |
| 63 | 55.79 | 55.79 | 104.14 | 42.92 | 42.92 | 69.22 |
| 64 | 59.01 | 59.01 | 109.34 | 45.07 | 45.07 | 72.68 |
| 65 | 62.23 | 62.23 | 114.81 | 47.21 | 47.21 | 76.32 |
| 66 | 65.45 | 65.45 | 120.55 | 49.36 | 49.36 | 80.13 |
| 67 | 69.74 | 69.74 | 130.44 | 51.50 | 51.50 | 84.05 |
| 68 | 74.03 | 74.03 | 135.66 | 54.71 | 54.71 | 88.24 |
| 69 | 78.32 | 78.32 | 141.08 | 56.86 | 56.86 | 92.66 |
| 70 | 83.69 | 83.69 | 150.95 | 60.08 | 60.08 | 97.29 |
| 71 | 89.04 | 89.04 | 161.53 | 64.37 | 64.37 | 104.10 |
| 72 | 95.48 | 95.48 | 174.31 | 67.59 | 67.59 | 115.42 |
| 73 | 101.91 | 101.91 | 183.02 | 72.96 | 72.96 | 121.20 |
| 74 | 108.35 | 108.35 | 192.17 | 77.25 | 77.25 | 129.67 |
| 75 | 115.86 | 115.86 | 201.78 | 83.69 | 83.69 | 138.75 |
| 76 | 127.04 | 127.04 | 213.88 | 93.32 | 93.32 | 147.08 |
| 77 | 138.20 | 138.20 | 231.44 | 102.97 | 102.97 | 159.89 |
| 78 | 149.37 | 149.37 | 247.64 | 112.62 | 112.62 | 174.28 |
| 79 | 160.54 | 160.54 | 264.97 | 122.27 | 122.27 | 188.21 |
| 80 | 171.72 | 171.72 | 283.52 | 131.92 | 131.92 | 203.27 |
| 81 | 183.09 | n/a | n/a | 143.28 | n/a | n/a |
| 82 | 195.60 | n/a | n/a | 154.66 | n/a | n/a |
| 83 | 209.24 | n/a | n/a | 168.30 | n/a | n/a |
| 84 | 222.89 | n/a | n/a | 181.95 | n/a | n/a |
| 85 | 237.67 | n/a | n/a | 196.73 | n/a | n/a |

### Eagle Guaranteed

| Age | Male | Female |
|---|---|---|
| 50 | 95.76 | 73.42 |
| 51 | 99.25 | 76.08 |
| 52 | 103.61 | 79.43 |
| 53 | 107.11 | 82.11 |
| 54 | 110.89 | 85.02 |
| 55 | 115.26 | 88.37 |
| 56 | 119.63 | 91.71 |
| 57 | 122.54 | 93.94 |
| 58 | 126.90 | 97.28 |
| 59 | 131.26 | 100.63 |
| 60 | 134.76 | 103.32 |
| 61 | 139.71 | 107.11 |
| 62 | 144.66 | 110.91 |
| 63 | 149.61 | 114.70 |
| 64 | 156.01 | 119.60 |
| 65 | 162.41 | 124.52 |
| 66 | 170.50 | 130.73 |
| 67 | 179.61 | 137.72 |
| 68 | 189.46 | 145.27 |
| 69 | 200.09 | 153.41 |
| 70 | 228.45 | 161.67 |
| 71 | 242.67 | 171.73 |
| 72 | 258.78 | 183.14 |
| 73 | 275.85 | 195.21 |
| 74 | 294.55 | 208.45 |
| 75 | 314.59 | 222.64 |
| 76 | 316.59 | 224.64 |
| 77 | 318.59 | 226.64 |
| 78 | 320.59 | 228.64 |
| 79 | 322.59 | 230.64 |
| 80 | 324.59 | 232.64 |

---

## Cheat-Sheet Reconciliation (app's current Americo rules vs this official guide)

| Cheat-sheet assumption | Verdict per this guide |
|---|---|
| "Most conditions within 1 yr route to Eagle Guaranteed" | **Structure confirmed, window unverifiable.** ANY "yes" health answer routes to Eagle Guaranteed (p.14) — but the lookback windows are on the state application, which this guide does not reproduce. "1 yr" cannot be confirmed or refuted from this document. |
| "CHF/cardiomyopathy GI-only" | **Not in this guide.** No conditions are named. Consistent with the structure only if the state application asks about CHF/cardiomyopathy (likely, but unverified here). |
| "Malignant melanoma decline" | **Contradicted in spirit.** Eagle Guaranteed is guaranteed issue with no documented health decline path ("every client can qualify for coverage," p.4; issued even if questions unanswered or all "yes," p.14). Within ages 50–80 / $2k–$10k, a melanoma history would get Eagle Guaranteed, not a decline. A hard decline is not supported by this document. |

**Gap to close:** obtain the state-specific application (Policy Series 311/312/313) for the verbatim health questions and their windows — that is the missing source of truth for Premier-vs-Guaranteed condition routing.
