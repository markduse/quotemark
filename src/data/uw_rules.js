// ── PER-CARRIER UNDERWRITING RULES — COPD / Heart / Cancer ──
// Built 8/2026 from Mark's carrier UW guides + FE underwriting grids.
// Sources + verbatim extractions: docs/uw-extractions/*.md (page-cited).
//
// Outcome codes (per FEX carrier product ladder):
//   'ok' — condition allowed at the carrier's best tier (no effect)
//   'C'  — capped at Standard / middle tier
//   'D'  — capped at Graded / Modified / Basic / ROP (waiting-period tier)
//   'GI' — only the carrier's guaranteed-issue product (if any)
//   'X'  — decline / not available at this carrier
// Entries may be a string (code) or {o, note} — note is shown to the agent.
// A carrier with no entry for a condition falls back to the global tier
// engine (underwriting silence ≠ approval; Rx screens may still catch it).
//
// Keyed by the app's FEX carrier ids (see FE_CARRIERS in App.jsx).

export const FEX_UW = {
  // ── Mutual of Omaha — Living Promise (Level → Graded → Decline) ──
  moo: {
    copd_no_o2:    {o:'D',  note:'COPD/emphysema/chronic bronchitis → Graded'},
    copd_o2:       {o:'X',  note:'Oxygen use → decline'},
    home_o2_24hr:  'X',
    mi_1yr:        {o:'X',  note:'Heart attack within 1 yr → decline'},
    mi_1to2:       {o:'D',  note:'Heart attack within 2 yrs → Graded'},
    mi_2to3:       {o:'ok', note:'Heart attack >2 yrs → Level OK'},
    mi_3plus:      'ok',
    stent_1yr:     {o:'X',  note:'Stent/heart surgery within 1 yr → decline'},
    stent_1to2:    {o:'D',  note:'Stent/heart surgery within 2 yrs → Graded'},
    stent_2plus:   'ok',
    angina_1yr:    {o:'X',  note:'Angina within 1 yr → decline'},
    angina_1to2:   {o:'D',  note:'Angina within 2 yrs → Graded'},
    angina_2plus:  'ok',
    cad:           {o:'D',  note:'CAD within 2 yrs → Graded; older → Level (check meds)'},
    chf:           {o:'X',  note:'CHF/heart failure → decline (any)'},
    cardiomyo_old: 'ok',
    cardiomyo_new: {o:'D',  note:'Cardiomyopathy within 2 yrs → Graded (within 1 yr decline)'},
    afib_ctrl:     {o:'D',  note:'AFib within 2 yrs → Graded; stable/older often Level — check meds (amiodarone → Graded)'},
    pacemaker_new: {o:'D',  note:'Pacemaker: treated as heart surgery → Graded within 2 yrs'},
    pacemaker_old: 'ok',
    stroke_1yr:    {o:'D',  note:'Stroke/TIA within 2 yrs → Graded'},
    stroke_1to2:   'D',
    stroke_2to3:   'ok',
    stroke_3plus:  'ok',
    aneurysm_old:  'ok',
    cancer_lt2:    {o:'X',  note:'Cancer <2 yrs, metastatic, or recurring → decline'},
    cancer_2to3:   {o:'D',  note:'Cancer within 2–4 yrs → Graded'},
    cancer_3to4:   'D',
    cancer_4to5:   {o:'ok', note:'Cancer >4 yrs → Level OK'},
    cancer_5plus:  'ok',
    melanoma_lt2:  {o:'X',  note:'Melanoma within 2 yrs → decline'},
    melanoma_2to4: {o:'D',  note:'Melanoma within 4 yrs → Graded'},
    basal_cell:    'ok',
    chemo_active:  'X',
  },

  // ── Transamerica — Immediate Solution / Easy Solution ──
  // OFFICIAL FE Rate & UW Guide 12/23 (extract_ta_official.md) — supersedes
  // IMO grid sheets. Heart events carry NO lookback windows: all Preferred
  // ON THE CHART — but the no-touch engine pulls Milliman Rx data and the
  // combination rules bite hard (2 Standard conditions → Graded, 4+ →
  // decline). Field reality per Mark: Immediate declines/downgrades far more
  // than the chart implies — FE EXPRESS (ta_exp) is the stronger TA product.
  ta: {
    copd_no_o2:    {o:'C',  note:'COPD/emphysema/bronchitis → Standard (Activity Credit can lift to Preferred)'},
    copd_o2:       {o:'C',  note:'Oxygen use → Standard (official guide; better than Graded per old grids)'},
    home_o2_24hr:  {o:'C',  note:'Oxygen → Standard'},
    mi_1yr:        {o:'ok', note:'Heart attack → Preferred on chart — but no-touch engine + Rx pull; combos drop to Graded. FE Express is the safer TA placement'},
    mi_1to2:       'ok',
    mi_2to3:       'ok',
    mi_3plus:      'ok',
    stent_1yr:     {o:'ok', note:'Stent/bypass → Preferred, no lookback'},
    stent_1to2:    'ok',
    stent_2plus:   'ok',
    angina_1yr:    {o:'ok', note:'Angina → Preferred'},
    angina_1to2:   'ok',
    angina_2plus:  'ok',
    cad:           {o:'ok', note:'CAD → Preferred'},
    chf:           {o:'C',  note:'CHF → Standard on chart — combos with build/second condition drop to Graded; FE Express (Select) is the safer TA placement'},
    cardiomyo_new: {o:'ok', note:'Cardiomyopathy → Preferred'},
    cardiomyo_old: 'ok',
    afib_ctrl:     {o:'ok', note:'AFib → Preferred'},
    pacemaker_new: {o:'ok', note:'Pacemaker/ICD → Preferred'},
    pacemaker_old: 'ok',
    stroke_1yr:    {o:'C',  note:'Stroke/TIA → Standard'},
    stroke_1to2:   'C',
    stroke_2to3:   'C',
    stroke_3plus:  'C',
    aneurysm_new:  {o:'ok', note:'Aneurysm → Preferred'},
    aneurysm_old:  'ok',
    cancer_lt2:    {o:'X',  note:'Cancer within 2 yrs / metastatic / recurrent / multiple → decline'},
    cancer_2to3:   {o:'C',  note:'Cancer 2+ yrs clean → Standard'},
    cancer_3to4:   'C',
    cancer_4to5:   'C',
    cancer_5plus:  'C',
    melanoma_lt2:  {o:'X',  note:'Cancer within 2 yrs → decline'},
    melanoma_2to4: {o:'C',  note:'2+ yrs clean → Standard'},
    basal_cell:    'ok',
    chemo_active:  'X',
    sleep_apnea:   'ok',
  },

  // ── Foresters — PlanRight (Preferred → Standard → Basic ROP → Decline) ──
  for: {
    copd_no_o2:    {o:'C',  note:'COPD/emphysema → Standard'},
    copd_o2:       {o:'X',  note:'Oxygen within 1 yr → decline'},
    home_o2_24hr:  'X',
    mi_1yr:        {o:'D',  note:'Heart attack within 1 yr → Basic (ROP)'},
    mi_1to2:       {o:'C',  note:'Heart attack within 2 yrs → Standard'},
    mi_2to3:       'ok',
    mi_3plus:      'ok',
    stent_1yr:     {o:'D',  note:'Stent/heart surgery within 1 yr → Basic'},
    stent_1to2:    {o:'C',  note:'Stent/heart surgery within 2 yrs → Standard'},
    stent_2plus:   'ok',
    angina_1yr:    {o:'D',  note:'Angina treated within 1 yr → Basic'},
    angina_1to2:   {o:'C',  note:'Angina within 2 yrs → Standard'},
    angina_2plus:  'ok',
    cad:           {o:'C',  note:'CAD → per heart-event windows'},
    chf:           {o:'X',  note:'CHF → decline'},
    cardiomyo_old: {o:'X',  note:'Cardiomyopathy → decline'},
    cardiomyo_new: 'X',
    afib_ctrl:     'ok',
    pacemaker_new: {o:'D',  note:'Pacemaker implanted within 1 yr → Basic; 1–2 yrs → Standard'},
    pacemaker_old: {o:'ok', note:'Pacemaker >2 yrs → Preferred'},
    stroke_1yr:    {o:'D',  note:'Stroke/TIA within 1 yr → Basic'},
    stroke_1to2:   {o:'C',  note:'Stroke/TIA within 2 yrs → Standard'},
    stroke_2to3:   'ok',
    stroke_3plus:  'ok',
    aneurysm_new:  {o:'D',  note:'Aneurysm within 2 yrs → Basic'},
    cancer_lt2:    {o:'D',  note:'Cancer current → decline; treated within 3 yrs → Basic'},
    cancer_2to3:   {o:'D',  note:'Cancer within 3 yrs → Basic'},
    cancer_3to4:   'ok',
    cancer_4to5:   'ok',
    cancer_5plus:  'ok',
    chemo_active:  'X',
    basal_cell:    {o:'ok', note:'Basal cell → Preferred'},
  },

  // ── Aetna / Accendo (CVS) — Protection Series (Preferred → Standard → Modified → Decline) ──
  acc: {
    copd_no_o2:    {o:'C',  note:'COPD/emphysema/bronchitis → Standard'},
    copd_o2:       {o:'X',  note:'Oxygen (any condition, any duration) → decline per Rx guide (CPAP OK)'},
    home_o2_24hr:  'X',
    mi_1yr:        {o:'D',  note:'Heart attack within 1 yr → Modified'},
    mi_1to2:       {o:'C',  note:'Heart attack 1–2 yrs → Standard'},
    mi_2to3:       {o:'ok', note:'Heart attack >2 yrs → Preferred'},
    mi_3plus:      'ok',
    stent_1yr:     {o:'D',  note:'Heart surgery within 1 yr → Modified'},
    stent_1to2:    {o:'C',  note:'Heart surgery 1–2 yrs → Standard'},
    stent_2plus:   'ok',
    angina_1yr:    {o:'D',  note:'Angina treated within 1 yr → Modified'},
    angina_1to2:   {o:'C',  note:'Angina 1–2 yrs → Standard'},
    angina_2plus:  'ok',
    cad:           {o:'C',  note:'CAD → per heart-event windows'},
    chf:           {o:'X',  note:'CHF → decline'},
    cardiomyo_old: {o:'ok', note:'Cardiomyopathy >2 yrs → Preferred'},
    cardiomyo_new: {o:'D',  note:'Cardiomyopathy within 1 yr → Modified; 1–2 yrs → Standard'},
    afib_ctrl:     'ok',
    pacemaker_new: {o:'D',  note:'Pacemaker within 1 yr → Modified; 1–2 yrs → Standard'},
    pacemaker_old: 'ok',
    stroke_1yr:    {o:'D',  note:'Stroke/TIA within 1 yr → Modified'},
    stroke_1to2:   {o:'C',  note:'Stroke/TIA 1–2 yrs → Standard'},
    stroke_2to3:   'ok',
    stroke_3plus:  'ok',
    aneurysm_new:  {o:'D',  note:'Aneurysm within 1 yr → Modified'},
    cancer_lt2:    {o:'X',  note:'Cancer current/within 2 yrs/recurring → decline'},
    cancer_2to3:   {o:'ok', note:'Cancer >2 yrs → Preferred — ONLY if off ALL cancer meds; maintenance hormone therapy (anastrozole/letrozole/Lupron/tamoxifen/Ibrance) = decline per Rx guide'},
    cancer_3to4:   {o:'ok', note:'OK only if off all cancer meds incl. hormone therapy'},
    cancer_4to5:   {o:'ok', note:'OK only if off all cancer meds incl. hormone therapy'},
    cancer_5plus:  {o:'ok', note:'OK only if off all cancer meds incl. hormone therapy'},
    melanoma_lt2:  {o:'D',  note:'Melanoma within 3 yrs → Modified (basal/squamous exempt)'},
    melanoma_2to4: {o:'D',  note:'Melanoma within 3 yrs → Modified'},
    basal_cell:    {o:'ok', note:'Basal/squamous → Preferred'},
    chemo_active:  'X',
  },
  cont: 'acc',   // Continental (Aetna) — same Protection Series rules

  // ── American Amicable — Senior Choice / Family Choice ──
  // (Immediate → Graded → ROP → Decline). Grid sheets: ROP@2yrs / Graded@3yrs.
  amam: {
    copd_no_o2:    {o:'D',  note:'COPD treated within 2 yrs → ROP; within 3 yrs → Graded; >3 yrs → Immediate (official SC guide)'},
    copd_o2:       {o:'X',  note:'Current oxygen → decline; oxygen stopped within 2 yrs → ROP'},
    home_o2_24hr:  'X',
    mi_1yr:        {o:'D',  note:'Heart attack within 2 yrs → ROP'},
    mi_1to2:       'D',
    mi_2to3:       {o:'D',  note:'Heart attack within 3 yrs → Graded'},
    mi_3plus:      {o:'ok', note:'>3 yrs → Immediate'},
    stent_1yr:     {o:'D',  note:'Stent/heart surgery within 2 yrs → ROP'},
    stent_1to2:    'D',
    stent_2plus:   {o:'D',  note:'Within 3 yrs → Graded; >3 yrs → Immediate'},
    angina_1yr:    {o:'D',  note:'Angina within 2 yrs → ROP'},
    angina_1to2:   'D',
    angina_2plus:  'ok',
    cad:           {o:'D',  note:'CAD → ROP (any duration)'},
    chf:           {o:'X',  note:'CHF → decline'},
    cardiomyo_new: {o:'D',  note:'Cardiomyopathy within 2 yrs → ROP'},
    cardiomyo_old: 'ok',
    afib_ctrl:     'ok',
    pacemaker_new: {o:'D',  note:'Pacemaker within 2 yrs → ROP; within 3 yrs → Graded'},
    pacemaker_old: 'ok',
    stroke_1yr:    {o:'D',  note:'Stroke/TIA within 2 yrs → ROP'},
    stroke_1to2:   'D',
    stroke_2to3:   {o:'D',  note:'Stroke within 3 yrs → Graded'},
    stroke_3plus:  'ok',
    aneurysm_new:  {o:'D',  note:'Aneurysm within 2 yrs → ROP'},
    cancer_lt2:    {o:'D',  note:'Current → decline; recurring/within 2 yrs → ROP'},
    cancer_2to3:   {o:'D',  note:'Within 3 yrs → Graded'},
    cancer_3to4:   'ok',
    cancer_4to5:   'ok',
    cancer_5plus:  'ok',
    melanoma_lt2:  {o:'D',  note:'Melanoma follows cancer windows'},
    melanoma_2to4: 'D',
    basal_cell:    'ok',
    chemo_active:  'X',
  },

  // ── Americo — Eagle Premier / Eagle Guaranteed ──
  // Nearly everything inside 1 yr routes to Eagle Guaranteed (GI, graded ROP benefit).
  amr: {
    copd_no_o2:    {o:'GI', note:'COPD/emphysema → Eagle Guaranteed (GI) only'},
    copd_o2:       {o:'GI', note:'Oxygen within 6 mos → Eagle Guaranteed (GI) — rare acceptance'},
    home_o2_24hr:  'GI',
    mi_1yr:        {o:'GI', note:'Heart attack within 1 yr → Eagle Guaranteed'},
    mi_1to2:       'ok',
    mi_2to3:       'ok',
    mi_3plus:      'ok',
    stent_1yr:     {o:'GI', note:'Stent within 1 yr → Eagle Guaranteed'},
    stent_1to2:    'ok',
    stent_2plus:   'ok',
    angina_1yr:    {o:'GI', note:'Angina within 1 yr → Eagle Guaranteed'},
    angina_1to2:   'ok',
    angina_2plus:  'ok',
    cad:           {o:'GI', note:'CAD within 1 yr → Eagle Guaranteed'},
    chf:           {o:'GI', note:'CHF → Eagle Guaranteed only'},
    cardiomyo_new: {o:'GI', note:'Cardiomyopathy → Eagle Guaranteed only'},
    cardiomyo_old: 'GI',
    afib_ctrl:     'ok',
    pacemaker_new: {o:'GI', note:'Pacemaker within 1 yr → Eagle Guaranteed'},
    pacemaker_old: 'ok',
    stroke_1yr:    {o:'GI', note:'Stroke within 1 yr → Eagle Guaranteed'},
    stroke_1to2:   'ok',
    stroke_2to3:   'ok',
    stroke_3plus:  'ok',
    cancer_lt2:    {o:'GI', note:'Cancer within 2 yrs → Eagle Guaranteed; metastatic/recurring → decline'},
    cancer_2to3:   'ok',
    cancer_3to4:   'ok',
    cancer_4to5:   'ok',
    cancer_5plus:  'ok',
    melanoma_lt2:  {o:'GI', note:'Malignant melanoma → Eagle Guaranteed (true GI — every client qualifies)'},
    melanoma_2to4: {o:'GI', note:'Malignant melanoma → Eagle Guaranteed'},
    basal_cell:    'ok',
    chemo_active:  'X',
  },

  // ── American Home Life — GuideStar (Level → Graded → Decline) ──
  // Disease guide: cardiac events Graded 0–24 mos, Level 25+; CHF/ICD decline.
  ahl: {
    copd_no_o2:    {o:'D',  note:'COPD → Graded first 24 mos, Level after (Rx: inhalers OK)'},
    copd_o2:       {o:'X',  note:'Oxygen use → decline (ever)'},
    home_o2_24hr:  'X',
    mi_1yr:        {o:'D',  note:'Heart attack ≤24 mos → Graded'},
    mi_1to2:       'D',
    mi_2to3:       {o:'ok', note:'25+ mos → Level'},
    mi_3plus:      'ok',
    stent_1yr:     {o:'D',  note:'Stent/bypass ≤24 mos → Graded'},
    stent_1to2:    'D',
    stent_2plus:   'ok',
    angina_1yr:    {o:'D',  note:'Angina ≤24 mos → Graded'},
    angina_1to2:   'D',
    angina_2plus:  'ok',
    cad:           {o:'D',  note:'Follows cardiac-event windows (≤24 mos → Graded)'},
    chf:           {o:'X',  note:'CHF → decline (unconditional)'},
    cardiomyo_new: 'X',
    cardiomyo_old: 'X',
    afib_ctrl:     {o:'ok', note:'AFib/arrhythmia → Level'},
    pacemaker_new: {o:'ok', note:'Pacemaker → Level (defibrillator/ICD → decline)'},
    pacemaker_old: 'ok',
    stroke_1yr:    {o:'D',  note:'Stroke ≤24 mos → Graded'},
    stroke_1to2:   'D',
    stroke_2to3:   'ok',
    stroke_3plus:  'ok',
    cancer_lt2:    {o:'D',  note:'Cancer cured <37 mos → Graded; active/recurrent/metastatic → decline'},
    cancer_2to3:   'D',
    cancer_3to4:   {o:'ok', note:'37+ mos → Level'},
    cancer_4to5:   'ok',
    cancer_5plus:  'ok',
    melanoma_lt2:  {o:'D',  note:'Follows general cancer windows'},
    melanoma_2to4: 'D',
    basal_cell:    'ok',
    chemo_active:  'X',
  },
  ahl_gs: 'ahl',

  // ── Royal Neighbors — Jet WL (SIWL) — from IMO cheat sheet (verify w/ 2996-B guide) ──
  rn: {
    copd_no_o2:    {o:'D',  note:'COPD no oxygen → Graded (cheat-sheet sourced)'},
    copd_o2:       {o:'X',  note:'Oxygen → decline'},
    home_o2_24hr:  'X',
    mi_1yr:        {o:'D',  note:'Heart surgery ≤2 yrs → Graded'},
    mi_1to2:       'D',
    mi_2to3:       'ok',
    mi_3plus:      'ok',
    stent_1yr:     'D',
    stent_1to2:    'D',
    stent_2plus:   'ok',
    angina_1yr:    {o:'D',  note:'Angina → Graded'},
    angina_1to2:   'D',
    angina_2plus:  'D',
    chf:           {o:'X',  note:'CHF → decline'},
    cardiomyo_new: {o:'X',  note:'Cardiomyopathy → decline (per RN WL guide)'},
    cardiomyo_old: 'X',
    afib_ctrl:     'ok',
    stroke_1yr:    {o:'D',  note:'Stroke/TIA ≤2 yrs → Graded; Level >2 yrs'},
    stroke_1to2:   'D',
    stroke_2to3:   'ok',
    stroke_3plus:  'ok',
    cancer_lt2:    {o:'D',  note:'Cancer ≤2 yrs → Graded; Level >2 yrs'},
    cancer_2to3:   'ok',
    cancer_3to4:   'ok',
    cancer_4to5:   'ok',
    cancer_5plus:  'ok',
    basal_cell:    'ok',
    chemo_active:  'X',
  },

  // ── KSKJ — Precision Plan ──
  kskj: {
    copd_no_o2:    {o:'C',  note:'COPD → mid-high substandard; decline if on oxygen OR currently smoking'},
    copd_o2:       {o:'X',  note:'COPD on oxygen → decline'},
    home_o2_24hr:  'X',
    mi_1yr:        {o:'C',  note:'MI <3 yrs → higher substandard'},
    mi_1to2:       'C',
    mi_2to3:       'C',
    mi_3plus:      {o:'ok', note:'MI >3 yrs → low substandard'},
    chf:           {o:'X',  note:'Chronic CHF → decline'},
    stroke_1yr:    {o:'X',  note:'3+ strokes ever or 2 within 1 yr → decline; single older stroke rated'},
    cancer_lt2:    {o:'X',  note:'Cancer treatment within 2 yrs (non-basal) → decline'},
    cancer_2to3:   'C',
    cancer_3to4:   'ok',
    cancer_4to5:   'ok',
    cancer_5plus:  'ok',
    basal_cell:    'ok',
    chemo_active:  'X',
  },

  // ── Transamerica — FE EXPRESS Solution (Premier → Select → Graded → Decline) ──
  // From the Express Solution Agent Guide (docs/uw-extractions/extract_ta_express.md).
  // Notably liberal: CHF/cardiomyopathy EVER = Select; O2 >1 yr = Premier.
  ta_exp: {
    copd_no_o2:    {o:'C',  note:'COPD/emphysema/bronchitis ever → Select'},
    copd_o2:       {o:'D',  note:'Oxygen <1 yr → Graded; >1 yr → Premier'},
    home_o2_24hr:  {o:'D',  note:'Oxygen <1 yr → Graded; >1 yr → Premier (tobacco + O2 = decline)'},
    mi_1yr:        {o:'C',  note:'Heart attack <1 yr → Select'},
    mi_1to2:       'ok',
    mi_2to3:       'ok',
    mi_3plus:      'ok',
    stent_1yr:     {o:'C',  note:'Stent/bypass <1 yr → Select'},
    stent_1to2:    'ok',
    stent_2plus:   'ok',
    angina_1yr:    {o:'ok', note:'Angina → Premier'},
    angina_1to2:   'ok',
    angina_2plus:  'ok',
    cad:           {o:'ok', note:'CAD → Premier'},
    chf:           {o:'C',  note:'CHF ever → Select — best CHF placement on the shelf'},
    cardiomyo_new: {o:'C',  note:'Cardiomyopathy ever → Select'},
    cardiomyo_old: 'C',
    afib_ctrl:     {o:'ok', note:'AFib → Premier'},
    pacemaker_new: {o:'C',  note:'Pacemaker <1 yr → Select (defibrillator/ICD = decline)'},
    pacemaker_old: 'ok',
    stroke_1yr:    {o:'C',  note:'Stroke/TIA <5 yrs → Select; 5+ → Premier'},
    stroke_1to2:   'C',
    stroke_2to3:   'C',
    stroke_3plus:  {o:'C',  note:'Stroke/TIA <5 yrs → Select; 5+ yrs → Premier'},
    cancer_lt2:    {o:'X',  note:'Cancer <2 yrs since last treatment → decline'},
    cancer_2to3:   {o:'D',  note:'Cancer 2–4 yrs → Graded/Select by type (breast/testicular Select; bladder/kidney/colorectal Graded)'},
    cancer_3to4:   'D',
    cancer_4to5:   {o:'C',  note:'Cancer 4+ yrs → Select/Premier by type'},
    cancer_5plus:  {o:'C',  note:'Type-based: breast/prostate/melanoma 5+ → Premier; other → Select'},
    melanoma_lt2:  {o:'X',  note:'Melanoma <2 yrs → decline'},
    melanoma_2to4: {o:'C',  note:'Melanoma 2–5 yrs → Select; 5+ → Premier'},
    basal_cell:    'ok',
    chemo_active:  'X',
  },

  // ── Baltimore Life — iProvide/Silver Guard (from dusefg.com/uw curated data) ──
  bl_sg: {
    copd_no_o2:    {o:'D',  note:'COPD → graded-tier placement (dusefg.com/uw)'},
    copd_o2:       'X',
    home_o2_24hr:  'X',
    chf:           'X',
    chemo_active:  'X',
    cancer_lt2:    'X',
  },

  // ── Liberty Bankers — SIMPL (from dusefg.com/uw curated data) ──
  lb: {
    copd_o2:       'X',
    home_o2_24hr:  'X',
    chf:           'X',
    chemo_active:  'X',
    cancer_lt2:    'X',
  },

  // ── New Bridge — FE (Level/Modified only; underwritten by Continental General) ──
  // Unusually liberal: COPD ever = Standard; not available CA/FL/NY/SC.
  newbridge: {
    copd_no_o2:    {o:'C',  note:'COPD ever → Standard'},
    copd_o2:       {o:'X',  note:'Current oxygen use → decline'},
    home_o2_24hr:  'X',
    mi_1yr:        {o:'D',  note:'Heart event <2 yrs → Modified'},
    mi_1to2:       'D',
    mi_2to3:       {o:'C',  note:'2–5 yrs → Standard; 5+ → Preferred'},
    mi_3plus:      'C',
    stent_1yr:     'D',
    stent_1to2:    'D',
    stent_2plus:   'C',
    chf:           {o:'X',  note:'CHF ever → decline'},
    cardiomyo_new: 'X',
    cardiomyo_old: 'X',
    pacemaker_new: {o:'D',  note:'Pacemaker <2 yrs → Modified (defibrillator ever = decline)'},
    pacemaker_old: 'C',
    stroke_1yr:    'D',
    stroke_1to2:   'D',
    stroke_2to3:   'C',
    stroke_3plus:  'C',
    cancer_lt2:    {o:'X',  note:'Cancer <2 yrs → decline'},
    cancer_2to3:   {o:'C',  note:'Clean >2 yrs → Standard (melanoma treated as full cancer)'},
    cancer_3to4:   'C',
    cancer_4to5:   'C',
    cancer_5plus:  'C',
    melanoma_lt2:  'X',
    melanoma_2to4: 'C',
    basal_cell:    'ok',
    chemo_active:  'X',
  },
};

// ── SIMPLIFIED-ISSUE TERM + IUL PRODUCT DECLINES ──
// These instant/SI products decline outright on the listed conditions.
// Keyed by term product name prefix (matched against TERM product names)
// or IUL product key. 'X' entries exclude the product with the note shown.
export const SI_TERM_UW = {
  // InstaBrain / IB Term / Pure Term — 10-year lookback, all majors decline
  instabrain: {
    lookbackNote: '10-yr lookback',
    declines: ['copd_no_o2','copd_o2','home_o2_24hr','bronchitis_chr','mi_1yr','mi_1to2','mi_2to3','mi_3plus','stent_1yr','stent_1to2','stent_2plus','angina_1yr','angina_1to2','angina_2plus','cad','chf','cardiomyo_new','cardiomyo_old','afib_ctrl','pacemaker_new','pacemaker_old','aneurysm_new','aneurysm_old','stroke_1yr','stroke_1to2','stroke_2to3','stroke_3plus','cancer_lt2','cancer_2to3','cancer_3to4','cancer_4to5','cancer_5plus','melanoma_lt2','melanoma_2to4','chemo_active'],
    note: 'Instant-decision: declines all major cardiac, COPD, and malignant cancer within 10 yrs (basal/squamous OK)',
  },
  // MOO Term Life Express — SI; Rx screens decline anticoagulants/digoxin etc.
  'term life express': {
    declines: ['copd_no_o2','copd_o2','home_o2_24hr','bronchitis_chr','mi_1yr','mi_1to2','stent_1yr','stent_1to2','angina_1yr','angina_1to2','cad','chf','cardiomyo_new','cardiomyo_old','afib_ctrl','pacemaker_new','pacemaker_old','stroke_1yr','stroke_1to2','cancer_lt2','cancer_2to3','melanoma_lt2','chemo_active'],
    note: 'SI product: declines COPD, recent cardiac, AFib on blood thinners (Eliquis/Xarelto), pacemaker, recent cancer',
  },
  // American Amicable / Occidental Easy Term — flat declines for the three families
  'easy term': {
    declines: ['copd_no_o2','copd_o2','home_o2_24hr','bronchitis_chr','mi_1yr','mi_1to2','mi_2to3','mi_3plus','stent_1yr','stent_1to2','stent_2plus','angina_1yr','angina_1to2','angina_2plus','cad','chf','cardiomyo_new','cardiomyo_old','afib_ctrl','pacemaker_new','pacemaker_old','stroke_1yr','stroke_1to2','stroke_2to3','stroke_3plus','cancer_lt2','cancer_2to3','cancer_3to4','cancer_4to5','melanoma_lt2','melanoma_2to4','chemo_active'],
    note: 'Declines COPD, all heart disease, AFib, pacemaker, stent/bypass, stroke; cancer needs 8 yrs treatment-free',
  },
  // AmAm/Occidental Home Protector — mirrors Easy Term declines; 7-yr cancer window
  'home protector': {
    declines: ['copd_no_o2','copd_o2','home_o2_24hr','bronchitis_chr','mi_1yr','mi_1to2','mi_2to3','mi_3plus','stent_1yr','stent_1to2','stent_2plus','angina_1yr','angina_1to2','angina_2plus','cad','chf','cardiomyo_new','cardiomyo_old','afib_ctrl','pacemaker_new','pacemaker_old','aneurysm_new','aneurysm_old','stroke_1yr','stroke_1to2','stroke_2to3','stroke_3plus','cancer_lt2','cancer_2to3','cancer_3to4','cancer_4to5','melanoma_lt2','melanoma_2to4','chemo_active'],
    note: 'Declines COPD, all heart disease, AFib, pacemaker, stroke; cancer needs 7 yrs treatment-free; asthma + tobacco = decline',
  },
  // Foresters Your Term (non-med) — cardiac/cancer/COPD declines; smoker COPD auto-decline
  'your term': {
    declines: ['copd_o2','home_o2_24hr','mi_1yr','mi_1to2','mi_2to3','mi_3plus','stent_1yr','stent_1to2','stent_2plus','angina_1yr','angina_1to2','angina_2plus','cad','chf','cardiomyo_new','cardiomyo_old','afib_ctrl','pacemaker_new','pacemaker_old','aneurysm_new','aneurysm_old','stroke_1yr','stroke_1to2','stroke_2to3','stroke_3plus','cancer_lt2','cancer_2to3','cancer_3to4','cancer_4to5','melanoma_lt2','melanoma_2to4','chemo_active'],
    note: 'Non-med decline for all named cardiac conditions; cancer needs 10+ yrs treatment-free; COPD declines for smokers / needs mild non-smoker profile',
  },
};

export const IUL_UW = {
  // MOO IUL Express (SI) — same screens as TLE
  'Mutual of Omaha (Indexed Universal Life Express)': {
    declines: ['copd_no_o2','copd_o2','home_o2_24hr','bronchitis_chr','mi_1yr','mi_1to2','stent_1yr','stent_1to2','angina_1yr','angina_1to2','cad','chf','cardiomyo_new','cardiomyo_old','afib_ctrl','pacemaker_new','pacemaker_old','stroke_1yr','stroke_1to2','cancer_lt2','cancer_2to3','melanoma_lt2','chemo_active'],
    note: 'SI screens: COPD, recent cardiac, AFib on anticoagulants, pacemaker, recent cancer → decline',
  },
  // Americo Instant Decision IUL — instant decision, conservative screens
  'Americo (Instant Decision IUL)': {
    declines: ['copd_no_o2','copd_o2','home_o2_24hr','mi_1yr','mi_1to2','stent_1yr','stent_1to2','angina_1yr','angina_1to2','cad','chf','cardiomyo_new','cardiomyo_old','pacemaker_new','pacemaker_old','stroke_1yr','stroke_1to2','cancer_lt2','cancer_2to3','melanoma_lt2','melanoma_2to4','chemo_active'],
    note: 'Instant decision: recent cardiac, COPD, pacemaker, recent cancer → decline',
  },
  // American Amicable Intelligent Choice IUL — non-med screens
  'American Amicable (Intelligent Choice IUL)': {
    declines: ['copd_o2','home_o2_24hr','mi_1yr','mi_1to2','stent_1yr','stent_1to2','angina_1yr','chf','cardiomyo_new','pacemaker_new','stroke_1yr','stroke_1to2','cancer_lt2','cancer_2to3','chemo_active'],
    note: 'Non-med screens: oxygen, cardiac within 2 yrs, CHF, recent cancer → decline',
  },
};

// Resolve carrier aliases ('cont' → 'acc', 'ahl_gs' → 'ahl').
export function fexUwRules(carrierId) {
  let r = FEX_UW[carrierId];
  if (typeof r === 'string') r = FEX_UW[r];
  return r || null;
}
