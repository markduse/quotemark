// netlify/functions/itk-quote.js
// Proxies FEX quote requests to InsuranceToolkits API
// Uses a shared ITK token stored in Netlify env vars — all users share one login

const ITK_BASE = 'https://api.insurancetoolkits.com';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

// Get a fresh token using stored credentials
async function getToken() {
  // Option A: pre-fetched access token stored directly (fastest)
  if (process.env.ITK_ACCESS_TOKEN) {
    return process.env.ITK_ACCESS_TOKEN;
  }
  // Option B: login with username/password (gets fresh token each cold start)
  if (process.env.ITK_USERNAME && process.env.ITK_PASSWORD) {
    const res = await fetch(`${ITK_BASE}/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: process.env.ITK_USERNAME, password: process.env.ITK_PASSWORD }),
    });
    if (!res.ok) throw new Error(`ITK login failed: ${res.status}`);
    const data = await res.json();
    return data.access;
  }
  return null;
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers: CORS, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers: CORS, body: 'Method Not Allowed' };

  let body;
  try { body = JSON.parse(event.body); }
  catch { return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Invalid JSON' }) }; }

  const { age, sex, tobacco, state, faceAmount } = body;

  if (!age || !sex || !state || !faceAmount) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Missing required fields: age, sex, state, faceAmount' }) };
  }

  let token;
  try {
    token = await getToken();
  } catch (e) {
    return { statusCode: 500, headers: CORS, body: JSON.stringify({ error: `ITK auth failed: ${e.message}` }) };
  }

  if (!token) {
    return {
      statusCode: 503,
      headers: CORS,
      body: JSON.stringify({ error: 'ITK not configured. Add ITK_USERNAME + ITK_PASSWORD to Netlify environment variables.' }),
    };
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
      if (r.status === 401 || r.status === 403) throw { status: r.status, message: 'Token expired' };
      if (!r.ok) { const text = await r.text(); throw { status: r.status, message: text }; }
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
    console.error('[itk-quote] Error:', err);
    return { statusCode: err.status === 401 ? 401 : 500, headers: CORS, body: JSON.stringify({ error: err.message || 'ITK API error' }) };
  }
};
