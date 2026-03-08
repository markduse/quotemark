import React, { useState } from 'react';
import { supabase } from './supabase';

const C = {
  bg0: '#060E1A', bg1: '#0B1525', bg2: '#0F1D30',
  gold: '#F59E0B', t0: '#F1F5F9', t2: '#94A3B8', t4: '#475569',
  bd: '#1A3050', bd2: '#243D5C', green: '#10B981', red: '#EF4444',
};

const inp = {
  width: '100%', padding: '12px 14px', borderRadius: 8,
  border: `1px solid ${C.bd2}`, background: C.bg1,
  color: C.t0, fontSize: 14, outline: 'none',
  fontFamily: "'DM Sans', sans-serif",
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
};

export default function AuthScreen() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'reset'
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [loading, setLoading]   = useState(false);
  const [msg, setMsg]           = useState(null); // { type: 'ok'|'err', text }
  const [focusedInput, setFocusedInput] = useState(null);

  const focusStyle = { borderColor: C.gold };

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    try {
      if (mode === 'reset') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });
        if (error) throw error;
        setMsg({ type: 'ok', text: 'Check your email for a password reset link.' });

      } else if (mode === 'signup') {
        if (password !== confirm) throw new Error("Passwords don't match.");
        if (password.length < 8) throw new Error('Password must be at least 8 characters.');

        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        // Create initial profile row
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await supabase.from('profiles').upsert({
            id: session.user.id,
            email: session.user.email,
            subscription_status: 'inactive',
            created_at: new Date().toISOString(),
          });
        }
        setMsg({ type: 'ok', text: 'Account created! Check your email to confirm, then log in.' });

      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // AuthContext handles the session change
      }
    } catch (err) {
      setMsg({ type: 'err', text: err.message });
    } finally {
      setLoading(false);
    }
  }

  const titles = { login: 'Sign in', signup: 'Create account', reset: 'Reset password' };
  const btns   = { login: 'Sign in', signup: 'Create account', reset: 'Send reset link' };

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
        position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 500, height: 300, borderRadius: '50%',
        background: `radial-gradient(ellipse, ${C.gold}10 0%, transparent 70%)`,
        pointerEvents: 'none',
      }}/>

      <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}>

        {/* Logo / brand */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 36, fontWeight: 800, letterSpacing: '-0.5px',
            color: C.t0,
          }}>
            Quote<span style={{ color: C.gold }}>Mark</span>
          </div>
          <div style={{ fontSize: 12, color: C.t4, marginTop: 4, letterSpacing: 1, textTransform: 'uppercase' }}>
            Final Expense Quoting Platform
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: C.bg1, border: `1px solid ${C.bd2}`,
          borderTop: `2px solid ${C.gold}`,
          borderRadius: 14, padding: '32px 28px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.t0, marginBottom: 6 }}>
            {titles[mode]}
          </div>
          <div style={{ fontSize: 13, color: C.t4, marginBottom: 24 }}>
            {mode === 'signup' && 'Start your 14-day free trial — no card required.'}
            {mode === 'login'  && 'Welcome back. Enter your credentials to continue.'}
            {mode === 'reset'  && "We'll send a link to reset your password."}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 600, color: C.t4, letterSpacing: 0.8, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                onFocus={() => setFocusedInput('email')} onBlur={() => setFocusedInput(null)}
                placeholder="you@example.com"
                style={{ ...inp, ...(focusedInput === 'email' ? focusStyle : {}) }}
              />
            </div>

            {mode !== 'reset' && (
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: C.t4, letterSpacing: 0.8, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                  Password
                </label>
                <input
                  type="password" required value={password} onChange={e => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput('pw')} onBlur={() => setFocusedInput(null)}
                  placeholder="••••••••"
                  style={{ ...inp, ...(focusedInput === 'pw' ? focusStyle : {}) }}
                />
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, color: C.t4, letterSpacing: 0.8, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                  Confirm Password
                </label>
                <input
                  type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
                  onFocus={() => setFocusedInput('cf')} onBlur={() => setFocusedInput(null)}
                  placeholder="••••••••"
                  style={{ ...inp, ...(focusedInput === 'cf' ? focusStyle : {}) }}
                />
              </div>
            )}

            {msg && (
              <div style={{
                background: msg.type === 'ok' ? `${C.green}15` : `${C.red}15`,
                border: `1px solid ${msg.type === 'ok' ? C.green + '44' : C.red + '44'}`,
                borderRadius: 7, padding: '10px 13px',
                fontSize: 13, color: msg.type === 'ok' ? C.green : C.red,
                lineHeight: 1.5,
              }}>
                {msg.text}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              style={{
                width: '100%', padding: '13px 0', borderRadius: 8, border: 'none',
                background: loading ? C.bd2 : C.gold,
                color: loading ? C.t4 : C.bg0,
                fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: 0.3, transition: 'all 0.15s',
                fontFamily: "'DM Sans', sans-serif",
                marginTop: 4,
              }}
            >
              {loading ? '...' : btns[mode]}
            </button>
          </form>

          {/* Footer links */}
          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
            {mode === 'login' && (
              <>
                <button onClick={() => { setMode('signup'); setMsg(null); }} style={linkBtn}>
                  Create account
                </button>
                <span style={{ color: C.bd2 }}>·</span>
                <button onClick={() => { setMode('reset'); setMsg(null); }} style={linkBtn}>
                  Forgot password?
                </button>
              </>
            )}
            {mode === 'signup' && (
              <button onClick={() => { setMode('login'); setMsg(null); }} style={linkBtn}>
                Already have an account? Sign in
              </button>
            )}
            {mode === 'reset' && (
              <button onClick={() => { setMode('login'); setMsg(null); }} style={linkBtn}>
                Back to sign in
              </button>
            )}
          </div>
        </div>

        {/* Trust bar */}
        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 11, color: C.t4, lineHeight: 1.8 }}>
          🔒 Secured by Supabase Auth &nbsp;·&nbsp; Agent use only
        </div>
      </div>
    </div>
  );
}

const linkBtn = {
  background: 'none', border: 'none', cursor: 'pointer',
  color: '#64748B', fontSize: 12, fontFamily: "'DM Sans', sans-serif",
  padding: 0, textDecoration: 'underline', textUnderlineOffset: 3,
};
