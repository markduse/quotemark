#!/usr/bin/env python3
"""Merge the ITK Americo scrape (qm_americo_scrape.json) into the app.

Input: {"am_rows": [{age, sex, tobacco, ct, face, plan, monthly, face_echo}]}
  - ct 'Level'  -> Eagle Select Plan 1 (Preferred row) + Plan 2 (Standard row)
  - ct 'Graded' -> Eagle Select Plan 3

Strategy: Americo prices linearly (rate/1000 + policy fee, verified via
two-face pairs).  We solve rate+fee per (plan, class, age) and REPLACE the
sparse legacy tables in fex_rates.json with dense anchor grids computed from
the exact formula, so every face from $2k-$35k quotes exactly like ITK.
"""
import json, sys, collections

SRC = sys.argv[1] if len(sys.argv) > 1 else 'scratch_americo.json'
d = json.load(open(SRC))
rows = d['am_rows']

key = lambda r: (r['plan'], r['sex'], r['tobacco'], r['age'])
by = collections.defaultdict(dict)
for r in rows:
    # face_echo tells us the face ITK actually priced (cap detection)
    echo = float(str(r['face_echo']).replace(',', '')) if r.get('face_echo') else r['face']
    if abs(echo - r['face']) > 1:      # capped/adjusted -> skip pair member
        continue
    by[key(r)][r['face']] = float(r['monthly'])

fees = collections.Counter()
derived = {}
for k, faces in by.items():
    fs = sorted(faces)
    if len(fs) < 2:
        continue
    f1, f2 = fs[0], fs[-1]
    rate = (faces[f2] - faces[f1]) / ((f2 - f1) / 1000.0)
    fee = round(faces[f1] - rate * f1 / 1000.0, 2)
    fees[fee] += 1
    derived[k] = (rate, fee)

print('fee distribution:', fees.most_common(5))

# Re-solve with the modal fee for stability
FEE = fees.most_common(1)[0][0]
tables = collections.defaultdict(lambda: collections.defaultdict(dict))
for k, faces in by.items():
    plan, sex, tob, age = k
    fs = sorted(faces)
    big = fs[-1]
    rate = (faces[big] - FEE) / (big / 1000.0)
    small_err = abs(rate * fs[0] / 1000.0 + FEE - faces[fs[0]]) if len(fs) > 1 else 0.0
    combo = ('M' if sex == 'Male' else 'F') + ('S' if tob == 'Cigarettes' else 'NS')
    tables[plan][combo][age] = (round(rate, 4), round(small_err, 3))

FACE_ANCHORS = [2000, 3000, 5000, 7500, 10000, 15000, 20000, 25000, 30000, 35000]
PLAN_KEY = {
    'Eagle Select Plan 1': 'Americo||Eagle Select Plan 1',
    'Eagle Select Plan 2': 'Americo||Eagle Select Plan 2',
    'Eagle Select Plan 3': 'Americo||Eagle Select Plan 3',
}
app = json.load(open('src/data/fex_rates.json'))
maxerr = 0.0
for plan, combos in tables.items():
    out = {}
    for combo, ages in combos.items():
        tbl = {}
        for age, (rate, err) in sorted(ages.items()):
            maxerr = max(maxerr, err)
            tbl[str(age)] = {str(f): round(rate * f / 1000.0 + FEE, 2) for f in FACE_ANCHORS}
        out[combo] = tbl
    app[PLAN_KEY[plan]] = out
    ages_all = sorted({a for c in combos.values() for a in c})
    print(plan, 'classes', sorted(combos), 'ages', ages_all[0], '-', ages_all[-1])

print('max linearity error at verification face: $%.3f' % maxerr)
if maxerr > 0.05:
    sys.exit('LINEARITY CHECK FAILED - do not merge')
json.dump(app, open('src/data/fex_rates.json', 'w'), separators=(',', ':'))
print('merged into fex_rates.json')
