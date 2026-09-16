#!/usr/bin/env python3
"""Rebuild per-carrier state availability from an ITK per-state sweep.

Input (qm_state_sweep.json, produced in-browser):
  { "fex":  { "AL": { "quoted": ["Company", ...], "excluded": [{"co": "...", "reason": [..]}] }, ... },
    "iul":  { same shape },
    "term": { same shape } }

Rules:
  * A company is AVAILABLE in a state if it appears in `quoted`, or is excluded
    for a non-state reason ("No rate available...", underwriting text, etc.).
  * A company is BLOCKED in a state only when excluded with "Not offered in XX".
  * A company never seen in either list for a state is treated as blocked.

Outputs:
  src/data/restrictions.json           — availableStates/blockedStates per FEX company (minFace/maxFace kept)
  src/data/iul_state_availability.json — product -> [states]
  src/data/term_state_availability.json — product -> [states]
"""
import json, sys, collections

SRC = sys.argv[1] if len(sys.argv) > 1 else 'scratch_state_sweep.json'
d = json.load(open(SRC))

def availability(toolkit):
    per = d.get(toolkit, {})
    states = sorted(per.keys())
    seen = set()
    avail = collections.defaultdict(set)
    for st, res in per.items():
        for co in res.get('quoted', []):
            seen.add(co); avail[co].add(st)
        for e in res.get('excluded', []):
            co = e.get('co'); seen.add(co)
            reasons = e.get('reason') or []
            if isinstance(reasons, str): reasons = [reasons]
            if not any('Not offered in' in r for r in reasons):
                avail[co].add(st)
    return states, sorted(seen), avail

# ── FEX → restrictions.json ──
states, companies, avail = availability('fex')
if not states:
    sys.exit('no FEX data in sweep')
r = json.load(open('src/data/restrictions.json'))
changed = 0
for co in companies:
    ok = sorted(avail[co])
    blocked = sorted(set(states) - set(ok))
    entry = r.get(co, {})
    before = (entry.get('availableStates'), entry.get('blockedStates'))
    entry['availableStates'] = ok
    entry['blockedStates'] = blocked
    if before != (ok, blocked): changed += 1
    r[co] = entry
json.dump(r, open('src/data/restrictions.json', 'w'), indent=1)
print(f'FEX: {len(states)} states swept, {len(companies)} companies, {changed} entries changed')
for co in companies:
    blocked = sorted(set(states) - avail[co])
    if blocked and len(blocked) < len(states):
        print(f'   {co}: blocked in {", ".join(blocked)}')
    elif len(blocked) == len(states):
        print(f'   {co}: NOT QUOTING ANYWHERE (check)')

# ── IUL / TERM → product -> [states] ──
for toolkit, out in (('iul', 'src/data/iul_state_availability.json'), ('term', 'src/data/term_state_availability.json')):
    states, companies, avail = availability(toolkit)
    if not states:
        print(f'{toolkit.upper()}: no data — skipped'); continue
    existing = {}
    try: existing = json.load(open(out))
    except Exception: pass
    for co in companies:
        existing[co] = sorted(avail[co])
    json.dump(existing, open(out, 'w'), indent=1)
    print(f'{toolkit.upper()}: {len(states)} states, {len(companies)} products written to {out}')
    for co in companies:
        blocked = sorted(set(states) - avail[co])
        if blocked and len(blocked) < len(states):
            print(f'   {co}: blocked in {", ".join(blocked)}')
