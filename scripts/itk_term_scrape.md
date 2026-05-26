# ITK Term Rate Scrape — Methodology

> How we pulled rates for all 13 carriers / 27 products from Insurance Toolkits
> on 2026-05-26. Re-runnable when rates need refreshing.

## Source

Mark's authenticated session at https://app.insurancetoolkits.com/term

## API endpoint discovered

```
POST https://api.insurancetoolkits.com/quoter/
Authorization: Bearer <JWT from Mark's session>
Accept: application/json, text/plain, */*
Content-Type: application/json
```

Request body shape:

```json
{
  "faceAmount": 250000,
  "sex": "Male" | "Female",
  "term": "10" | "15" | "20" | "25" | "30" | "35" | "40",
  "state": "MI",
  "month": "06",
  "day": "15",
  "year": "1991",
  "tobacco": "None" | "Cigarettes" | "Cigarettes + Other Nicotine Products" | "Occasional pipe/cigar use only" | "Other Nicotine Products",
  "paymentType": "Bank Draft/EFT",
  "underwritingItems": [],
  "toolkit": "TERM"
}
```

Returns `{ quotes: [ {company, monthly, yearly, tier_name, plan_name, ...} ] }`.
One call typically returns 30-80 quote rows across all carriers + their tiers.

## Scrape parameters used (2026-05-26)

- **Sex**: Male, Female
- **Term**: 10, 15, 20, 25, 30, 35, 40 years
- **Tobacco**: None, Cigarettes
- **Ages (anchor)**: 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75
- **Face amounts**: $50k, $100k, $250k, $500k, $1M
- **State**: MI (rates roughly state-independent for term; state checks are separate)
- **Payment**: Bank Draft/EFT

Total combinations: 2 × 7 × 2 × 11 × 5 = **1,540 API calls**, ~20,269 rate rows captured.

## How to re-run

1. Log into https://app.insurancetoolkits.com/term
2. Open browser DevTools console
3. Capture JWT from any request's Authorization header (or paste your token directly)
4. Paste the scraper code (see `scripts/itk_scrape_browser.js` for the full block) into the console
5. Wait ~25 min for completion
6. Trigger the download (`window.__qm_results` → JSON file)
7. Reshape with the Python script in this folder

## 400 errors

ITK returns HTTP 400 when no carrier in the agent's portfolio quotes a specific
combination (e.g. 25-year term, which most carriers don't offer). Treat these as
"no data available" — don't retry.

## Reshape

Raw scrape → nested JSON keyed by `product → term → tier → class → age → face → monthly`:

```python
# See scripts/reshape_term.py
```

Final output: `src/data/term_rates.json` (262KB, 14,752 face-cells across 27 products).
