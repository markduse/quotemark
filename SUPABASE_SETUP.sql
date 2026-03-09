-- ══════════════════════════════════════════════════════
-- QuoteMark: Supabase profiles table + RLS
-- Run this in: supabase.com → your project → SQL Editor
-- ══════════════════════════════════════════════════════

-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id                           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email                        TEXT,
  stripe_customer_id           TEXT,
  subscription_id              TEXT,
  subscription_status          TEXT DEFAULT 'inactive', -- inactive | active | past_due | canceled | trialing
  subscription_current_period_end TIMESTAMPTZ,
  created_at                   TIMESTAMPTZ DEFAULT NOW(),
  updated_at                   TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Users can only read/update their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 4. Service role (used by Netlify webhook) can do everything
-- (service role bypasses RLS by default — no extra policy needed)

-- 5. Auto-create a profile row when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, subscription_status, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    'inactive',
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. Index for Stripe customer ID lookups
CREATE INDEX IF NOT EXISTS profiles_stripe_customer_id_idx
  ON public.profiles (stripe_customer_id);

-- Verify
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = 'profiles' ORDER BY ordinal_position;

-- ── CARRIER PREFERENCES (run this in Supabase SQL editor) ──────────────
-- Add carrier_prefs column to store enabled carrier IDs as JSON array
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS carrier_prefs jsonb DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS display_name text DEFAULT NULL;

-- carrier_prefs format: ["acc","ahl","ta","fid"]  (array of enabled carrier IDs)
