import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession]       = useState(undefined); // undefined = loading
  const [profile, setProfile]       = useState(null);
  const [loading, setLoading]       = useState(true);

  async function fetchProfile(userId) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    setProfile(data);
  }

  useEffect(() => {
    // Check for Stripe redirect params
    const params = new URLSearchParams(window.location.search);
    if (params.get('activated') === 'true') {
      // Give webhook ~2s to process then refresh profile
      setTimeout(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session) fetchProfile(session.user.id);
        });
      }, 2500);
      window.history.replaceState({}, '', '/');
    }
    if (params.get('canceled') === 'true') {
      window.history.replaceState({}, '', '/');
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isSubscribed = profile?.subscription_status === 'active' ||
                       profile?.subscription_status === 'trialing';

  async function signOut() {
    await supabase.auth.signOut();
    setProfile(null);
  }

  return (
    <AuthContext.Provider value={{ session, profile, loading, isSubscribed, signOut, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
