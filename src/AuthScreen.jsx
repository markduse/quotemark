import React, { useState } from 'react';
import { supabase } from './supabase';
import { track } from './analytics';

// Light fintech palette — matches the app redesign (design_handoff_quotemarko_redesign)
const C = {
  bg0: '#f8f8f7', bg1: '#ffffff', bg2: '#ffffff',
  gold: '#4a45d1', goldBg: '#eef0fe', goldBd: '#dbd9f4',
  t0: '#191817', t2: '#78746e', t4: '#a09c94',
  bd: '#eae9e6', bd2: '#dedcd7', green: '#177452', red: '#b42318',
};

const inp = {
  width: '100%', padding: '11px 12px', borderRadius: 7,
  border: `1px solid ${C.bd2}`, background: '#fff',
  color: C.t0, fontSize: 14, outline: 'none',
  fontFamily: "'Instrument Sans', sans-serif",
  boxSizing: 'border-box',
  transition: 'border-color 0.12s',
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

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        track('Sign Up');

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
      const raw = err?.message || 'Something went wrong.';
      // Supabase's built-in email sender is hard rate-limited; surface a clear
      // message instead of the raw "429: email rate limit exceeded".
      const text = /rate limit/i.test(raw)
        ? 'Too many sign-ups from this app right now. Wait a few minutes and try again — or ask Mark to add you directly.'
        : /email not confirmed/i.test(raw)
        ? "Your email isn't confirmed yet. Check your inbox (and spam) for the confirmation link."
        : raw;
      setMsg({ type: 'err', text });
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
      fontFamily: "'Instrument Sans', sans-serif", padding: 20,
    }}>
      <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}>

        {/* Logo / brand */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em',
            color: C.t0,
          }}>
            Quotemarko<span style={{ color: '#4a45d1' }}>.</span>
          </div>
          <div style={{ fontSize: 11, color: C.t4, marginTop: 4, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>
            Life Insurance Quoting Platform
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: '#fff', border: '1px solid #eae9e6',
          borderRadius: 12, padding: '32px 28px',
          boxShadow: '0 1px 2px rgba(25,24,23,0.04)',
        }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.t0, marginBottom: 6 }}>
            {titles[mode]}
          </div>
          <div style={{ fontSize: 13, color: C.t4, marginBottom: 24 }}>
            {mode === 'signup' && 'Start your 1-day free trial.'}
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
                background: msg.type === 'ok' ? '#e8f6ef' : '#fdecec',
                border: `1px solid ${msg.type === 'ok' ? '#c4e8d6' : '#f5c6c2'}`,
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
                width: '100%', minHeight: 44, borderRadius: 9, border: 'none',
                background: loading ? '#dedcd7' : '#4a45d1',
                color: '#fff',
                fontSize: 14, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.12s',
                boxShadow: loading ? 'none' : '0 1px 2px rgba(74,69,209,.3)',
                fontFamily: "'Instrument Sans', sans-serif",
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
          Secured by Supabase Auth &nbsp;·&nbsp; Agent use only
          <br />
          <a href="/terms" style={{ color: C.t4, textDecoration: 'underline', textUnderlineOffset: 3 }}>Terms</a>
          {' · '}
          <a href="/privacy" style={{ color: C.t4, textDecoration: 'underline', textUnderlineOffset: 3 }}>Privacy</a>
        </div>
      </div>
    </div>
  );
}

const linkBtn = {
  background: 'none', border: 'none', cursor: 'pointer',
  color: '#4a45d1', fontSize: 12.5, fontWeight: 600, fontFamily: "'Instrument Sans', sans-serif",
  padding: 0,
};
