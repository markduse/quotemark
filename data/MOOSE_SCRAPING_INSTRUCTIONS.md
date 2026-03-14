# MOOSE — InsuranceTookit Rate Scraping Instructions
## Goal: Replace incorrect term rate tables with accurate multi-health-class data

---

## Why the Current Rates Are Wrong

The existing rates have three critical errors:
1. **Linear face scaling from $100k** — term rates do NOT scale linearly. There are policy fees that don't move with face amount. You must scrape at multiple face amounts.
2. **Only tobacco/non-tobacco** — ITK has Preferred Plus, Preferred, Standard Plus, Standard, Table 2, Table 4, and Tobacco. Agents need all of these.
3. **Flat rates across age bands** — the scraper got stuck. SBLI NT male at $7.81 from age 18–35 is not real. Pull every single age 18–75.

---

## Scraping Protocol

### For EACH carrier below, run quotes at this exact grid:

**Ages:** 18, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75 (every age if possible, minimum these)
**Term lengths:** 10yr, 15yr, 20yr, 30yr
**Gender:** Male, Female
**Tobacco:** Yes, No
**Health classes:** ALL available in ITK for that carrier — typically:
  - Preferred Plus (or Super Preferred)
  - Preferred
  - Standard Plus
  - Standard
  - Table 2 / Substandard (if available)
  - Tobacco / Smoker

**Face amounts — MUST run at ALL THREE:**
- $100,000
- $250,000
- $500,000

Running at 3 face amounts lets us detect whether the rate structure is:
- Pure per-$1,000 (ratio should be exact: 2.5× and 5×)
- Per-$1,000 + flat policy fee (ratio will be close but not exact)
- Banded (different per-$1,000 rate above certain face amounts)

---

## Output Format

Save as `data/term_rates_raw/[carrier_id]_raw.json`

```json
{
  "carrier": "sbli",
  "scraped_date": "2026-03-14",
  "source": "insurancetoolkit.com",
  "data": [
    {
      "term": 10,
      "age": 35,
      "gender": "male",
      "tobacco": false,
      "health_class": "Preferred Plus",
      "face_100k": 7.98,
      "face_250k": 17.91,
      "face_500k": 34.82
    },
    {
      "term": 10,
      "age": 35,
      "gender": "male",
      "tobacco": false,
      "health_class": "Preferred",
      "face_100k": 8.64,
      "face_250k": 19.44,
      "face_500k": 37.88
    }
    // ... all combinations
  ]
}
```

Push each file to `data/term_rates_raw/` in the GitHub repo as you finish each carrier.

---

## Carriers to Scrape (Priority Order)

### Batch 1 — Already in code, just wrong rates
1. **SBLI** (EasyTrak) — `sbli`
2. **Transamerica** (Trendsetter) — `transamerica`  
3. **Instabrain / Fidelity Life** — `instabrain`
4. **Mutual of Omaha** (Term Life Express) — `mutual_of_omaha`
5. **Royal Neighbors** — `royal_neighbors`
6. **American Amicable** — `american_amicable`
7. **John Hancock** — `john_hancock`

### Batch 2 — New carriers to add
8. **Americo** (Eagle Select term) — `americo`
9. **Foresters** (PlanRight term / ForeCare) — `foresters_term`
10. **United Home Life** (term product) — `uhl_term`
11. **Kansas City Life** — `kcl`

---

## What ITK Will Show

In ITK's term quoting tool you'll see health classes labeled something like:
- "Preferred Best" or "Preferred Plus" or "Super Preferred"
- "Preferred"
- "Standard Plus" or "Select"
- "Standard"
- "Non-Med Standard" (some carriers)
- "Smoker Preferred" / "Smoker Standard"

Capture ALL of them. The label names vary by carrier — just record exactly what ITK shows.

---

## Verification Check

For each carrier, verify at least one data point against a known source:

| Carrier | Known Rate | Source |
|---------|-----------|--------|
| SBLI | Male, NT, 35, 10yr, $500k ≈ $16.50/mo | SBLI published rates |
| Transamerica | Male, NT, 35, 20yr, $250k ≈ $15–18/mo | TA Trendsetter |
| MOO | Male, NT, 55, 20yr, $100k ≈ $47–52/mo | MOO TLE |

If ITK shows significantly different numbers, flag it in a `notes` field in the JSON.

---

## What Claude Will Do With the Data

Once you push the raw JSON files, I (Claude) will:
1. Detect the rate structure (per-$1,000 + fee, banded, or pure linear)
2. Convert to the correct JS rate table format with health class breakdown
3. Update App.jsx to add health class selector and correct rates
4. Build and push to Netlify

Your job is pure data collection. Don't touch App.jsx.

---

## FE Carriers to Scrape Too (While You're In There)

Run these same face amounts for FE carriers — ITK has them too:

| Carrier | Product | Face Amounts to Pull |
|---------|---------|---------------------|
| Baltimore Life | Golden Goal FE | $2k, $5k, $10k, $15k, $20k, $25k |
| Senior Life | FE whole life | $2k, $5k, $10k, $15k, $20k |
| Elco Mutual | FE | $2k, $5k, $10k, $15k, $20k, $25k |
| KSKJ Life | FE | $2k, $5k, $10k, $15k, $20k, $25k |
| Corebridge SIWL | Simplified Issue WL (Level/Standard tiers) | $5k, $10k, $15k, $20k, $25k |
| Transamerica Express | Express Whole Life (different from Immediate Solution) | $2k, $5k, $10k, $15k, $20k, $25k |

For FE, only two health classes needed: Non-Tobacco and Tobacco.

FE ages: 45, 50, 55, 60, 65, 70, 75, 80, 85

Output format same as term but simpler:
```json
{
  "carrier": "baltimore_life",
  "product": "Golden Goal FE",
  "type": "fe",
  "data": [
    {
      "age": 65,
      "gender": "male",
      "tobacco": false,
      "health_class": "Level",
      "face_10k": 44.20,
      "face_15k": 62.80,
      "face_20k": 81.40,
      "face_25k": 100.00
    }
  ]
}
```

---

## Session Notes

- ITK may time out — save progress as you go, push to GitHub after each carrier
- If a carrier isn't in ITK, note it in a `data/term_rates_raw/NOT_IN_ITK.md` file
- Some carriers require you to enter a state — use **Michigan (MI)** as default
- If ITK shows a "Best" class that seems too cheap, cross-reference with the carrier's published rate sheet
- Log any carriers where ITK rates look suspiciously different from published rates
