// Lightweight wrapper around Plausible's window.plausible.
// Goals:
//   1. Never break the app if the analytics script fails to load (ad-blocker, network).
//   2. Never accidentally ship PII. Properties must be opt-in scalars (carrier id, tier
//      letter, etc) — no client demographics, no email, no full state name even.
//   3. Keep the surface area tiny so call sites are obvious in code review.
//
// Usage:
//   import { track } from './analytics';
//   track('Quote Requested', { tier: 'B', mode: 'face', gsb: false });
//
// Standard event names we use today (keep this list short — adding events is fine
// but each one becomes a goal in the Plausible dashboard, so don't add throwaways):
//
//   - 'Sign Up'              — new account created (email confirmed)
//   - 'Checkout Started'     — Start Free Trial clicked
//   - 'Quote Requested'      — Get Quotes button → results render
//   - 'e-App Click'          — agent handed off to a carrier portal
//   - 'Tier Override'        — agent manually overrode the auto-detected UW tier
//   - 'GSB Toggle'           — Gold/Silver/Bronze mode toggled on
//   - 'Tab Switch'           — switched between FE / Term Life / Cash Value
//   - 'Manage Subscription'  — opened Stripe billing portal
//
// Property conventions:
//   - Use lowercase scalar values (strings, numbers, booleans).
//   - For face amounts, use coarse bands ('5k', '10k', '25k+') not exact dollars,
//     so the dashboard stays readable.
//   - Carrier ids match the app's CARRIER_META keys (e.g. 'cont', 'moo', 'uhl').

export function track(eventName, props) {
  try {
    if (typeof window === 'undefined' || typeof window.plausible !== 'function') return;
    if (props && typeof props === 'object') {
      window.plausible(eventName, { props });
    } else {
      window.plausible(eventName);
    }
  } catch (e) {
    // Never let analytics break the user flow. Swallow.
    if (typeof console !== 'undefined') console.warn('[analytics]', e.message);
  }
}

// Convert a face amount in dollars to a coarse band string for grouping.
export function faceBand(face) {
  if (face == null) return 'unknown';
  if (face <= 5000)   return '0-5k';
  if (face <= 10000)  return '5-10k';
  if (face <= 25000)  return '10-25k';
  if (face <= 50000)  return '25-50k';
  return '50k+';
}
