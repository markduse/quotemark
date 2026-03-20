// src/utils/itk-token.js
// Manages ITK access token — fetches from profile, refreshes if expired

const ITK_BASE = 'https://api.insurancetoolkits.com';

/**
 * Returns a valid ITK access token for the given user.
 * Refreshes automatically if the current token is expired.
 * @param {object} supabase - Supabase client
 * @param {string} userId   - auth user ID
 * @returns {string|null}   - valid access token, or null if not configured
 */
export async function getValidToken(supabase, userId) {
  // 1. Fetch current tokens from profile
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('it_access_token, it_refresh_token')
    .eq('id', userId)
    .single();

  if (error || !profile?.it_access_token) {
    console.warn('[ITK] No access token stored for user');
    return null;
  }

  const { it_access_token, it_refresh_token } = profile;

  // 2. Test the token with a lightweight request
  const testOk = await testToken(it_access_token);
  if (testOk) return it_access_token;

  // 3. Token expired — try refresh
  if (!it_refresh_token) {
    console.warn('[ITK] Token expired and no refresh token available');
    return null;
  }

  try {
    const res = await fetch(`${ITK_BASE}/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: it_refresh_token }),
    });

    if (!res.ok) {
      console.warn('[ITK] Refresh failed:', res.status);
      return null;
    }

    const data = await res.json();
    const newToken = data.access;
    if (!newToken) return null;

    // 4. Save new access token to Supabase
    await supabase
      .from('profiles')
      .update({ it_access_token: newToken })
      .eq('id', userId);

    return newToken;
  } catch (err) {
    console.error('[ITK] Refresh error:', err);
    return null;
  }
}

/**
 * Test whether an access token is still valid
 */
async function testToken(token) {
  try {
    const res = await fetch(`${ITK_BASE}/quoter/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        faceAmount: 10000,
        coverageType: 'Level',
        sex: 'Male',
        state: 'IL',
        age: 65,
        tobacco: 'None',
        paymentType: 'Bank Draft/EFT',
        underwritingItems: [],
        toolkit: 'FEX',
      }),
    });
    return res.ok; // 200 = valid, 401/403 = expired
  } catch {
    return false;
  }
}
