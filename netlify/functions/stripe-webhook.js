const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = event.headers['stripe-signature'];

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  // Supabase admin client (service role — bypasses RLS)
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const getSupabaseUserId = (obj) =>
    obj?.metadata?.supabase_user_id || obj?.subscription_data?.metadata?.supabase_user_id;

  try {
    switch (stripeEvent.type) {

      case 'checkout.session.completed': {
        const session = stripeEvent.data.object;
        const userId = session.metadata?.supabase_user_id;
        if (!userId) break;

        await supabase.from('profiles').upsert({
          id: userId,
          stripe_customer_id: session.customer,
          subscription_status: 'active',
          subscription_id: session.subscription,
          updated_at: new Date().toISOString(),
        });
        console.log(`✓ Activated subscription for user ${userId}`);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = stripeEvent.data.object;
        const sub = await stripe.subscriptions.retrieve(invoice.subscription);
        const userId = sub.metadata?.supabase_user_id;
        if (!userId) break;

        await supabase.from('profiles').update({
          subscription_status: 'active',
          subscription_current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        }).eq('id', userId);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = stripeEvent.data.object;
        const sub = await stripe.subscriptions.retrieve(invoice.subscription);
        const userId = sub.metadata?.supabase_user_id;
        if (!userId) break;

        await supabase.from('profiles').update({
          subscription_status: 'past_due',
          updated_at: new Date().toISOString(),
        }).eq('id', userId);
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = stripeEvent.data.object;
        const userId = sub.metadata?.supabase_user_id;
        if (!userId) break;

        await supabase.from('profiles').update({
          subscription_status: 'canceled',
          updated_at: new Date().toISOString(),
        }).eq('id', userId);
        console.log(`✓ Canceled subscription for user ${userId}`);
        break;
      }

      case 'customer.subscription.updated': {
        const sub = stripeEvent.data.object;
        const userId = sub.metadata?.supabase_user_id;
        if (!userId) break;

        await supabase.from('profiles').update({
          subscription_status: sub.status,
          subscription_current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        }).eq('id', userId);
        break;
      }
    }
  } catch (err) {
    console.error('DB update error:', err);
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
