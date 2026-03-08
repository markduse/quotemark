const Stripe = require('stripe');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { userId, email } = JSON.parse(event.body);

    // Get or create Stripe customer
    let customer;
    const existing = await stripe.customers.list({ email, limit: 1 });
    if (existing.data.length > 0) {
      customer = existing.data[0];
    } else {
      customer = await stripe.customers.create({ email, metadata: { supabase_user_id: userId } });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{
        price: process.env.STRIPE_PRICE_ID, // $5/mo price ID from Stripe dashboard
        quantity: 1,
      }],
      subscription_data: {
        metadata: { supabase_user_id: userId },
      },
      success_url: `${process.env.SITE_URL || 'https://quotemarko.netlify.app'}/?session_id={CHECKOUT_SESSION_ID}&activated=true`,
      cancel_url:  `${process.env.SITE_URL || 'https://quotemarko.netlify.app'}/?canceled=true`,
      allow_promotion_codes: true,
      metadata: { supabase_user_id: userId },
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error('Stripe error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
