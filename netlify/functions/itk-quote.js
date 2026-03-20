// netlify/functions/itk-quote.js
// Proxies FEX quote requests to InsuranceToolkits API
// Uses ITK_REFRESH_TOKEN env var to get a fresh access token on each cold start

const ITK_BASE = 'https://api.insurancetoolkits.com';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

// Module-level token cache (persists across warm invocations within same Lambda instance)
let cachedToken = null;
let tokenExpiry = 0;

async function getFreshToken() {
  // Return cached token if still valid (with 5 min buffer)
  if (cachedToken && Date.now() < tokenExpiry - 300000) {
    return cachedToken;
  }

  const refreshToken = process.env.ITK_REFRESH_TOKEN;
  if (!refreshToken) {
    throw new Error('ITK_REFRESH_TOKEN not set in Netlify environment variables');
  }

  const res = await fetch(`${ITK_BASE}/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token refresh failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  const access = data.access;
  if (!access) throw new Error('No access token returned from refresh');

  // Decode expiry from JWT payload
  try {
    const payload = JSON.parse(Buffer.from(access.split('.')[1], 'base64').toString());
    tokenExpiry = payload.exp * 1000;
  } catch {
    tokenExpiry = Date.now() + 43200000; // 12 hours fallback
  }

  cachedToken = access;
  return access;
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers: CORS, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers: CORS, body: 'Method Not Allowed' };

  let body;
  try { body = JSON.parse(event.body); }
  catch { return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Invalid JSON' }) }; }

  const { age, sex, tobacco, state, faceAmount } = body;
  if (!age || !sex || !state || !faceAmount) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Missing required fields' }) };
  }

  let token;
  try {
    token = await getFreshToken();
  } catch (e) {
    return { statusCode: 503, headers: CORS, body: JSON.stringify({ error: e.message }) };
  }

  const makeRequest = (coverageType) =>
    fetch(`${ITK_BASE}/quoter/`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        faceAmount: Number(faceAmount),
        coverageType,
        sex,
        state,
        age: Number(age),
        tobacco: tobacco || 'None',
        paymentType: 'Bank Draft/EFT',
        underwritingItems: [],
        toolkit: 'FEX',
      }),
    }).then(async (r) => {
      if (r.status === 401 || r.status === 403) {
        cachedToken = null; // clear cache so next call re-fetches
        throw { status: r.status, message: 'Token expired' };
      }
      if (!r.ok) { const t = await r.text(); throw { status: r.status, message: t }; }
      return r.json();
    });

  try {
    const [levelData, gradedData, giData] = await Promise.all([
      makeRequest('Level').catch(e => { console.warn('Level failed:', e); return null; }),
      makeRequest('Graded/Modified').catch(e => { console.warn('Graded failed:', e); return null; }),
      makeRequest('Guaranteed').catch(e => { console.warn('GI failed:', e); return null; }),
    ]);

    const seen = new Set();
    const quotes = [];
    for (const dataset of [levelData, gradedData, giData]) {
      if (!dataset?.quotes) continue;
      for (const q of dataset.quotes) {
        const key = `${q.company}||${q.plan_name}`;
        if (seen.has(key)) continue;
        seen.add(key);
        quotes.push({ company: q.company, plan_name: q.plan_name, tier_name: q.tier_name || q.coverage_type || '', monthly: q.monthly });
      }
    }
    quotes.sort((a, b) => parseFloat(a.monthly) - parseFloat(b.monthly));

    return { statusCode: 200, headers: CORS, body: JSON.stringify({ quotes }) };
  } catch (err) {
    return { statusCode: err.status === 401 ? 401 : 500, headers: CORS, body: JSON.stringify({ error: err.message || 'ITK API error' }) };
  }
};
