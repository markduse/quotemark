// netlify/functions/itk-quote.js
// Proxies FEX quote requests to InsuranceToolkits API
// Keeps the IT access token server-side — never exposed to the browser

const ITK_BASE = 'https://api.insurancetoolkits.com';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers: CORS, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers: CORS, body: 'Method Not Allowed' };

  let body;
  try { body = JSON.parse(event.body); }
  catch { return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Invalid JSON' }) }; }

  const { age, sex, tobacco, state, faceAmount, accessToken } = body;

  if (!accessToken) {
    return { statusCode: 401, headers: CORS, body: JSON.stringify({ error: 'No access token provided' }) };
  }
  if (!age || !sex || !state || !faceAmount) {
    return { statusCode: 400, headers: CORS, body: JSON.stringify({ error: 'Missing required fields: age, sex, state, faceAmount' }) };
  }

  const makeRequest = (coverageType) =>
    fetch(`${ITK_BASE}/quoter/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
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
        throw { status: r.status, message: 'Token expired or invalid' };
      }
      if (!r.ok) {
        const text = await r.text();
        throw { status: r.status, message: text };
      }
      return r.json();
    });

  try {
    // Fire all 3 coverage types in parallel
    const [levelData, gradedData, giData] = await Promise.all([
      makeRequest('Level').catch(e => { console.warn('Level failed:', e); return null; }),
      makeRequest('Graded/Modified').catch(e => { console.warn('Graded failed:', e); return null; }),
      makeRequest('Guaranteed').catch(e => { console.warn('GI failed:', e); return null; }),
    ]);

    // Merge all quotes, deduplicate by company+plan_name
    const seen = new Set();
    const quotes = [];

    for (const dataset of [levelData, gradedData, giData]) {
      if (!dataset?.quotes) continue;
      for (const q of dataset.quotes) {
        const key = `${q.company}||${q.plan_name}`;
        if (seen.has(key)) continue;
        seen.add(key);
        quotes.push({
          company:    q.company,
          plan_name:  q.plan_name,
          tier_name:  q.tier_name || q.coverage_type || '',
          monthly:    q.monthly,
        });
      }
    }

    // Sort low to high
    quotes.sort((a, b) => parseFloat(a.monthly) - parseFloat(b.monthly));

    return {
      statusCode: 200,
      headers: CORS,
      body: JSON.stringify({ quotes }),
    };

  } catch (err) {
    console.error('[itk-quote] Error:', err);
    const status = err.status === 401 || err.status === 403 ? 401 : 500;
    return {
      statusCode: status,
      headers: CORS,
      body: JSON.stringify({ error: err.message || 'ITK API error' }),
    };
  }
};
