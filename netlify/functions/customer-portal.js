const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

// Returns a Stripe Customer Portal session URL where the user can:
//   - View / update payment method
//   - Cancel the subscription (or schedule cancellation at period end)
//   - Download invoices
//
// Stripe ToS requires a self-service cancel path before live mode — this
// is the simplest way to satisfy that.
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Verify the caller via Supabase JWT — the client sends its session token
    // as Authorization: Bearer <jwt>. This prevents anyone with a userId from
    // hitting the portal for an arbitrary user.
    const auth = event.headers.authorization || event.headers.Authorization;
    if (!auth?.startsWith('Bearer ')) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: 'Missing auth token' }) };
    }
    const jwt = auth.slice(7);
    const { data: userResult, error: userErr } = await supabase.auth.getUser(jwt);
    if (userErr || !userResult?.user) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: 'Invalid auth token' }) };
    }
    const userId = userResult.user.id;

    // Look up the user's Stripe customer ID
    const { data: profile, error: profErr } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();
    if (profErr || !profile?.stripe_customer_id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'No active subscription found for this account.' }),
      };
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: process.env.SITE_URL || 'https://quotemarko.netlify.app',
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error('Portal error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
