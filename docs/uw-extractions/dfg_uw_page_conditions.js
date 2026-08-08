// Extracted from ~/DFG/sites/dusefg/uw/index.html (dusefg.com/uw) — Mark's curated placement data
const conditionsData = [
  {
    system: "Cardiac",
    id: "cardiac",
    icon: "♥",
    items: [
      {
        name: "CHF (Congestive Heart Failure)",
        tag: "Severe cardiac",
        placements: [
          { carrier: "Transamerica (FEX Solutions)", tier: "Level", tierClass: "tier-level", note: "Writes Level on adult applicants. Best possible placement." },
          { carrier: "Cica Life (Superior Choice)", tier: "Standard", tierClass: "tier-standard", note: "Standard day-one coverage. Solid Level-tier backup to Trans." },
          { carrier: "SBLI (Living Legacy)", tier: "Modified", tierClass: "tier-modified", note: "Modified if treated within 2 years. Last Level-adjacent option." }
        ],
        note: "If Trans or Cica won't take the case, fall back to Royal Neighbors GI. Every other carrier on your lineup DECLINES CHF — don't waste dials quoting them."
      },
      {
        name: "Heart Attack (History)",
        tag: "Cardiac event",
        placements: [
          { carrier: "Transamerica", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred on adult applicants regardless of timeline. Unmatched placement." },
          { carrier: "Cica Life", tier: "Standard", tierClass: "tier-standard", note: "Standard day-one coverage." },
          { carrier: "Foresters Plan Right", tier: "Standard", tierClass: "tier-standard", note: "Standard placement." }
        ],
        note: "Within 6 months of heart attack → AIG Corebridge SimpliNow Legacy is typically the earliest any carrier will write. After 2 years, Royal Neighbors moves to Standard."
      },
      {
        name: "AFIB / Arrhythmia",
        tag: "Cardiac rhythm",
        placements: [
          { carrier: "Transamerica", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred even with active AFIB on blood thinners." },
          { carrier: "Royal Neighbors", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred placement. Great fallback if Trans not contracted." },
          { carrier: "SBLI / Am Home Life / Foresters", tier: "Preferred", tierClass: "tier-preferred", note: "All three write AFIB at Preferred — compare on rate." }
        ],
        note: "AFIB is one of the easiest cardiac placements — you have 5+ Level-tier options. MoO writes at Standard. Only GTL declines."
      },
      {
        name: "Bypass Surgery (Coronary Artery)",
        tag: "Cardiac surgery",
        placements: [
          { carrier: "Transamerica", tier: "Level", tierClass: "tier-level", note: "Level on adult applicants any timeline past acute recovery." },
          { carrier: "Foresters Plan Right", tier: "Standard", tierClass: "tier-standard", note: "Standard day-one." },
          { carrier: "Royal Neighbors", tier: "Standard", tierClass: "tier-standard", note: "Standard after 2 years (Graded within 2)." }
        ],
        note: "Within 1 year of surgery: most carriers decline. AIG SimpliNow Legacy or Baltimore Special are the early-window options — but Trans still beats them at Level if client qualifies."
      },
      {
        name: "Defibrillator / Pacemaker",
        tag: "Implanted device",
        placements: [
          { carrier: "Transamerica", tier: "Preferred", tierClass: "tier-preferred", note: "Trans is uniquely willing to write defib at Preferred. HUGE edge." },
          { carrier: "Foresters Plan Right", tier: "Standard", tierClass: "tier-standard", note: "Standard placement." },
          { carrier: "SBLI", tier: "Modified", tierClass: "tier-modified", note: "Modified — best non-Trans option." }
        ],
        note: "This is THE condition where switching to Trans pays for itself. Most carriers flat-decline defibrillators. Quote Trans first on ANY implanted device case."
      },
      {
        name: "Heart Valve Replacement",
        tag: "Cardiac surgery",
        placements: [
          { carrier: "Transamerica", tier: "Level", tierClass: "tier-level", note: "Level on adult applicants (age 17+ decline only)." },
          { carrier: "Foresters Plan Right", tier: "Standard", tierClass: "tier-standard", note: "Standard after treatment." },
          { carrier: "Royal Neighbors", tier: "Standard", tierClass: "tier-standard", note: "Standard after 2 years; Graded within 2." }
        ],
        note: "Same rule as bypass — Trans gives you Level where everyone else drops to Modified or Graded."
      },
      {
        name: "Angioplasty / Stents",
        tag: "Cardiac procedure",
        placements: [
          { carrier: "Transamerica", tier: "Level", tierClass: "tier-level", note: "Level on adult applicants." },
          { carrier: "Foresters Plan Right", tier: "Standard", tierClass: "tier-standard", note: "Basic within 1 yr, Standard 1–2 yr." },
          { carrier: "Royal Neighbors", tier: "Standard", tierClass: "tier-standard", note: "Standard after 2 years." }
        ],
        note: "Within 6 months: decline from most. AIG SimpliNow Legacy and Baltimore Special cover the acute window."
      },
      {
        name: "Heart Blockage",
        tag: "Cardiac structural",
        placements: [
          { carrier: "Transamerica", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred placement." },
          { carrier: "American Amicable", tier: "Immediate", tierClass: "tier-preferred", note: "Immediate (Level) coverage." },
          { carrier: "Foresters Plan Right", tier: "Standard", tierClass: "tier-standard", note: "Standard placement." }
        ],
        note: "Easy placement — most carriers write blockage at Standard or better."
      }
    ]
  },
  {
    system: "Respiratory",
    id: "respiratory",
    icon: "⌁",
    items: [
      {
        name: "COPD / Emphysema",
        tag: "Chronic lung",
        placements: [
          { carrier: "American Home Life", tier: "Standard", tierClass: "tier-standard", note: "Standard UNLESS nebulizer → then Decline. Always ask." },
          { carrier: "Cica Life", tier: "Standard", tierClass: "tier-standard", note: "Standard day-one, no nebulizer gotcha." },
          { carrier: "Foresters Plan Right", tier: "Standard", tierClass: "tier-standard", note: "Standard placement." }
        ],
        note: "CRITICAL: Always ask about nebulizer use before quoting. AHL, Liberty, Am Amicable, AIG decline or tier down heavily if nebulizer. Trans and MoO are Standard for clean cases, Graded/Modified if tobacco. Cica is the cleanest COPD + tobacco option."
      },
      {
        name: "Chronic Bronchitis",
        tag: "Chronic lung",
        placements: [
          { carrier: "Foresters Plan Right", tier: "Standard", tierClass: "tier-standard", note: "Standard placement." },
          { carrier: "Cica Life", tier: "Immediate", tierClass: "tier-preferred", note: "Immediate (Level) coverage." },
          { carrier: "American Home Life", tier: "Standard", tierClass: "tier-standard", note: "Standard unless nebulizer in use." }
        ],
        note: "Same nebulizer watch-out as COPD. Trans and MoO write Standard without tobacco."
      },
      {
        name: "Asthma (Mild/Moderate)",
        tag: "Lung",
        placements: [
          { carrier: "Foresters Plan Right", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred placement." },
          { carrier: "Transamerica", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred placement." },
          { carrier: "SBLI", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred placement." }
        ],
        note: "Easy placement. Nebulizer use drops AHL to Standard but doesn't kill the case."
      }
    ]
  },
  {
    system: "Diabetes & Metabolic",
    id: "diabetes",
    icon: "✚",
    items: [
      {
        name: "Diabetes — No Complications (Controlled)",
        tag: "Diabetes",
        placements: [
          { carrier: "Transamerica", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred when A1C controlled." },
          { carrier: "Cica Life", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred placement." },
          { carrier: "Foresters Plan Right", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred placement." }
        ],
        note: "For clean diabetes with no complications, ~6 carriers give Preferred — compete on rate. Always collect A1C, insulin units/day, and age of diagnosis BEFORE quoting. AIG and MoO have A1C triggers that drop tier at >8.6%."
      },
      {
        name: "Diabetes — With Complications (Neuropathy, Retinopathy, Nephropathy)",
        tag: "Diabetes + complications",
        placements: [
          { carrier: "Baltimore Life", tier: "Standard", tierClass: "tier-standard", note: "Standard with controlled A1C. Best Level placement for complications." },
          { carrier: "Mutual of Omaha", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred after 2 years; Modified within 2." },
          { carrier: "Transamerica", tier: "Modified", tierClass: "tier-modified", note: "Modified — best Trans option but below Baltimore." }
        ],
        note: "CRITICAL UW questions: A1C level, insulin units/day, age first diagnosed, uncontrolled-in-past-2-years. Insulin alone doesn't kill the case for MoO or Baltimore. Avoid: Royal Neighbors declines within 3 yrs; SBLI grades within 10 yrs."
      },
      {
        name: "Insulin-Dependent Diabetes (No Complications)",
        tag: "Diabetes",
        placements: [
          { carrier: "Mutual of Omaha", tier: "Standard", tierClass: "tier-standard", note: "Standard with insulin use." },
          { carrier: "American Home Life", tier: "Standard", tierClass: "tier-standard", note: "Standard with A1C &lt;8% and insulin controlled." },
          { carrier: "Royal Neighbors", tier: "Standard", tierClass: "tier-standard", note: "Standard with insulin use." }
        ],
        note: "Am Amicable caps at ROP if diagnosed before age 49. Liberty grades insulin users. Always verify units/day — &gt;50 units/day triggers declines at several carriers."
      },
      {
        name: "Stage 1 Kidney Disease (GFR ≥ 90)",
        tag: "Early CKD",
        placements: [
          { carrier: "Transamerica", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred when GFR normal and no dialysis. Best Level option." },
          { carrier: "Mutual of Omaha", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred if controlled and no proteinuria concerns." },
          { carrier: "Foresters Plan Right / Cica / Royal Neighbors", tier: "Standard", tierClass: "tier-standard", note: "Standard at minimum across all three." }
        ],
        note: "Stage 1 CKD is essentially normal kidney function with some marker of damage — it's the easiest kidney placement. Watch-outs: If caused by diabetic nephropathy, use the Diabetes With Complications card instead. If caused by HBP, confirm BP is controlled. Always get recent GFR reading and cause of CKD. Note: Kidney disease isn't explicitly listed on the source cheat sheet — placements are based on general FEX UW patterns. Verify with carrier UW for Stage 2+ cases."
      }
    ]
  },
  {
    system: "Liver & Digestive",
    id: "liver",
    icon: "◆",
    items: [
      {
        name: "Hepatitis C",
        tag: "Liver",
        placements: [
          { carrier: "Transamerica", tier: "Standard", tierClass: "tier-standard", note: "Standard day-one." },
          { carrier: "Cica Life", tier: "Standard", tierClass: "tier-standard", note: "Standard placement." },
          { carrier: "Foresters Plan Right", tier: "Standard", tierClass: "tier-standard", note: "Standard placement." }
        ],
        note: "SBLI writes Standard if cured &gt;5 yrs. Royal Neighbors Standard at 10+ yrs. If cured recently, AHL is Modified within 2 yrs."
      },
      {
        name: "Hepatitis B",
        tag: "Liver",
        placements: [
          { carrier: "Transamerica", tier: "Standard", tierClass: "tier-standard", note: "Standard day-one." },
          { carrier: "Cica Life", tier: "Standard", tierClass: "tier-standard", note: "Standard placement." },
          { carrier: "Baltimore Life", tier: "Standard", tierClass: "tier-standard", note: "Standard placement." }
        ],
        note: "Hep A is even easier — almost any carrier writes Preferred once recovered."
      },
      {
        name: "Cirrhosis (Stage A or B)",
        tag: "Liver",
        placements: [
          { carrier: "Cica Life", tier: "Standard", tierClass: "tier-standard", note: "Standard placement." },
          { carrier: "Baltimore Life", tier: "Standard", tierClass: "tier-standard", note: "Standard placement." },
          { carrier: "Foresters Plan Right", tier: "Standard", tierClass: "tier-standard", note: "Standard placement." }
        ],
        note: "Trans writes Standard too. AIG, MoO, Am Home Life all decline. Stage C cirrhosis behaves the same in the matrix but call UW — in practice it's much harder."
      },
      {
        name: "Crohn's Disease / Colitis",
        tag: "Digestive",
        placements: [
          { carrier: "Foresters Plan Right", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred placement." },
          { carrier: "Cica Life", tier: "Immediate", tierClass: "tier-preferred", note: "Immediate (Level) coverage." },
          { carrier: "Transamerica", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred placement." }
        ],
        note: "Easy placement. SBLI and Am Home Life also Preferred. Most carriers write these at Level."
      }
    ]
  },
  {
    system: "Cancer",
    id: "cancer",
    icon: "⊘",
    items: [
      {
        name: "Cancer — Cured, One Type (2+ yrs remission)",
        tag: "Oncology",
        placements: [
          { carrier: "Liberty Bankers", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred after 10 yrs cured." },
          { carrier: "American Home Life", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred if cured 24+ months." },
          { carrier: "Baltimore Life", tier: "Standard", tierClass: "tier-standard", note: "Standard after 3 yrs cured." }
        ],
        note: "Always identify: cancer type, stage, date of last treatment, current remission status. AIG has cancer-type-specific logic — breast, prostate, colon get SimpliNow Legacy placement even within the 2-year window."
      },
      {
        name: "Cancer — Active / Recurring",
        tag: "Oncology",
        placements: [
          { carrier: "Royal Neighbors", tier: "GI", tierClass: "tier-gi", note: "Guaranteed Issue. Best face amount option for active cancer." },
          { carrier: "Cica Life", tier: "Guaranteed", tierClass: "tier-gi", note: "Cica GI product slot." },
          { carrier: "AIG Corebridge", tier: "SimpliNow Legacy", tierClass: "tier-modified", note: "Only for specific types: breast, cervical, colon, endometrial, kidney, melanoma, prostate, testicular, thyroid — Stage 1 only." }
        ],
        note: "Active cancer has no Level option. Focus on GI — this is a conservation and client-education conversation, not a rate conversation."
      }
    ]
  },
  {
    system: "Mental Health & Neurological",
    id: "mental",
    icon: "◎",
    items: [
      {
        name: "Depression / Anxiety (Mild)",
        tag: "Mental health",
        placements: [
          { carrier: "Transamerica", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred placement." },
          { carrier: "Foresters Plan Right", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred placement." },
          { carrier: "Cica Life", tier: "Immediate", tierClass: "tier-preferred", note: "Immediate (Level) coverage." }
        ],
        note: "Easy placement. AHL and SBLI also write Preferred. MoO asks if 'major depressive disorder' — if YES, drops to Graded."
      },
      {
        name: "Bipolar Disorder",
        tag: "Mental health",
        placements: [
          { carrier: "Cica Life", tier: "Immediate", tierClass: "tier-preferred", note: "Immediate (Level) coverage." },
          { carrier: "American Home Life", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred placement." },
          { carrier: "Foresters Plan Right", tier: "Standard", tierClass: "tier-standard", note: "Standard placement." }
        ],
        note: "MoO declines within 3 yrs; after that, Graded with major depression. SBLI writes Standard with 2+ yr history."
      },
      {
        name: "Alzheimer's / Dementia",
        tag: "Cognitive",
        placements: [
          { carrier: "Royal Neighbors", tier: "GI", tierClass: "tier-gi", note: "Guaranteed Issue. Only realistic placement." },
          { carrier: "Cica Life", tier: "Guaranteed", tierClass: "tier-gi", note: "Cica GI product." },
          { carrier: "—", tier: "No Level option", tierClass: "tier-decline", note: "Every other carrier DECLINES." }
        ],
        note: "Don't waste time quoting Level products. Go directly to RN GI or Cica. Set expectations with client/family upfront about the 2-year waiting period."
      },
      {
        name: "Epilepsy / Seizures",
        tag: "Neurological",
        placements: [
          { carrier: "American Home Life", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred placement." },
          { carrier: "Transamerica", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred placement." },
          { carrier: "SBLI", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred placement." }
        ],
        note: "Cica Immediate. Foresters Plan Right Standard. Am Amicable Graded within 3 yrs. If last seizure was within 2 years, call UW."
      },
      {
        name: "Cerebral Palsy",
        tag: "Neurological",
        placements: [
          { carrier: "American Home Life", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred placement." },
          { carrier: "Royal Neighbors", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred placement." },
          { carrier: "SBLI", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred placement." }
        ],
        note: "MoO writes Level. Trans DECLINES (surprising exception). Foresters Plan Right Standard."
      },
      {
        name: "Down Syndrome",
        tag: "Genetic",
        placements: [
          { carrier: "Royal Neighbors", tier: "GI", tierClass: "tier-gi", note: "Guaranteed Issue. Primary placement." },
          { carrier: "Cica Life", tier: "Guaranteed", tierClass: "tier-gi", note: "Cica GI product." },
          { carrier: "—", tier: "No Level option", tierClass: "tier-decline", note: "All others DECLINE." }
        ],
        note: "Straight to GI."
      }
    ]
  },
  {
    system: "Lifestyle Risk Factors",
    id: "lifestyle",
    icon: "◈",
    items: [
      {
        name: "Alcohol Abuse History (5+ years clean)",
        tag: "Substance",
        placements: [
          { carrier: "Royal Neighbors", tier: "Standard", tierClass: "tier-standard", note: "Standard 3–10 years clean." },
          { carrier: "Transamerica", tier: "Standard", tierClass: "tier-standard", note: "Standard 4–10 years clean." },
          { carrier: "SBLI", tier: "Standard", tierClass: "tier-standard", note: "Standard after 3 yrs clean." }
        ],
        note: "Within 2–3 years clean: drop to Graded/Modified at most carriers. Within 2 years: Trans declines, most others Modified."
      },
      {
        name: "DUI / DWI (2+ years past)",
        tag: "Driving",
        placements: [
          { carrier: "Royal Neighbors", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred placement." },
          { carrier: "Foresters Plan Right", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred placement." },
          { carrier: "American Amicable", tier: "Immediate", tierClass: "tier-preferred", note: "Immediate (Level) coverage." }
        ],
        note: "Within 2 yrs: Trans declines, most others Modified. Multiple DUIs in 2 yrs drops MoO to Graded."
      },
      {
        name: "Felony History (1+ year past)",
        tag: "Legal",
        placements: [
          { carrier: "Foresters Plan Right", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred placement." },
          { carrier: "Mutual of Omaha", tier: "Level", tierClass: "tier-level", note: "Level placement." },
          { carrier: "Royal Neighbors", tier: "Preferred", tierClass: "tier-preferred", note: "Preferred placement." }
        ],
        note: "SBLI declines within 5 yrs. Trans declines within 3 yrs (Graded 3–5, Standard 5–10). Am Home Life declines within 1 yr. Always ask about current parole/probation — changes UW at Liberty."
      }
    ]
  }
];
