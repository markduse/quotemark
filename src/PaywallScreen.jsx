import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const C = {
  bg0: '#060E1A', bg1: '#0B1525', bg2: '#0F1D30', bg3: '#152239',
  gold: '#F59E0B', goldBg: 'rgba(245,158,11,0.08)', goldBd: 'rgba(245,158,11,0.25)',
  t0: '#F1F5F9', t2: '#94A3B8', t3: '#64748B', t4: '#475569',
  bd: '#1A3050', bd2: '#243D5C', green: '#10B981',
};

const FEATURES = [
  { icon: '⚡', text: 'Real-time quotes from 7+ carriers' },
  { icon: '🏆', text: 'Gold / Silver / Bronze tiered view' },
  { icon: '🏥', text: 'Health condition underwriting engine' },
  { icon: '📊', text: 'Budget mode — solve for face amount' },
  { icon: '📋', text: 'Direct carrier e-App links' },
  { icon: '🔄', text: 'New carriers added regularly' },
];

export default function PaywallScreen() {
  const { session, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session.user.id,
          email: session.user.email,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      window.location.href = data.url; // redirect to Stripe Checkout
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: C.bg0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif", padding: 20,
    }}>
      {/* Background grid */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(${C.bd}22 1px, transparent 1px), linear-gradient(90deg, ${C.bd}22 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }}/>

      {/* Glow */}
      <div style={{
        position: 'fixed', top: '25%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 350, borderRadius: '50%',
        background: `radial-gradient(ellipse, ${C.gold}0D 0%, transparent 70%)`,
        pointerEvents: 'none',
      }}/>

      <div style={{ width: '100%', maxWidth: 480, position: 'relative', zIndex: 1 }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 34, fontWeight: 800, color: C.t0 }}>
            Quote<span style={{ color: C.gold }}>Mark</span>
          </div>
        </div>

        {/* Pricing card */}
        <div style={{
          background: C.bg1, border: `1px solid ${C.goldBd}`,
          borderTop: `2px solid ${C.gold}`,
          borderRadius: 16, padding: '36px 32px',
          boxShadow: `0 0 60px ${C.gold}10, 0 24px 64px rgba(0,0,0,0.5)`,
        }}>
          {/* Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <span style={{
              background: C.goldBg, border: `1px solid ${C.goldBd}`,
              borderRadius: 20, padding: '4px 14px',
              fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: 1, textTransform: 'uppercase',
            }}>
              Agent Access
            </span>
          </div>

          {/* Price */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 2 }}>
              <span style={{ fontSize: 22, color: C.t2, fontWeight: 500, marginTop: 8 }}>$</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 64, fontWeight: 600, color: C.t0, letterSpacing: '-3px', lineHeight: 1 }}>5</span>
              <span style={{ fontSize: 16, color: C.t3, fontWeight: 400, marginTop: 18 }}>/mo</span>
            </div>
            <div style={{ fontSize: 13, color: C.t3, marginTop: 4 }}>
              Cancel anytime &nbsp;·&nbsp; 14-day free trial
            </div>
          </div>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <span style={{
                  width: 26, height: 26, borderRadius: 6,
                  background: `${C.green}18`, border: `1px solid ${C.green}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, flexShrink: 0,
                }}>
                  {f.icon}
                </span>
                <span style={{ fontSize: 14, color: C.t2 }}>{f.text}</span>
              </div>
            ))}
          </div>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 7, padding: '10px 13px', fontSize: 13, color: '#FCA5A5',
              marginBottom: 14, lineHeight: 1.5,
            }}>
              {error}
            </div>
          )}

          <button
            onClick={handleCheckout} disabled={loading}
            style={{
              width: '100%', padding: '15px 0', borderRadius: 10, border: 'none',
              background: loading ? C.bd2 : C.gold,
              color: loading ? C.t4 : C.bg0,
              fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: 0.3, fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.15s',
              boxShadow: loading ? 'none' : `0 4px 20px ${C.gold}40`,
            }}
          >
            {loading ? 'Redirecting to Stripe…' : '⚡ Start Free Trial — $5/mo'}
          </button>

          <div style={{ textAlign: 'center', marginTop: 14, fontSize: 12, color: C.t4 }}>
            🔒 Secure checkout via Stripe
          </div>
        </div>

        {/* Signed in as + sign out */}
        <div style={{ textAlign: 'center', marginTop: 18, fontSize: 12, color: C.t4, lineHeight: 2 }}>
          Signed in as <span style={{ color: C.t2 }}>{session?.user?.email}</span>
          <br />
          <button onClick={signOut} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: C.t3, fontSize: 12, fontFamily: "'DM Sans', sans-serif",
            textDecoration: 'underline', textUnderlineOffset: 3,
          }}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
