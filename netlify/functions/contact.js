exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: 'Method Not Allowed' };

  let body;
  try { body = JSON.parse(event.body); }
  catch { return { statusCode: 400, headers, body: 'Invalid JSON' }; }

  const { type, name, email, company, message } = body;

  const SUBJECT_MAP = {
    carrier:     '📋 New Carrier Submission — QuoteMark',
    suggestion:  '💡 General Suggestion — QuoteMark',
    partnership: '🤝 Partnership / Whitelabel Inquiry — QuoteMark',
  };

  const subject = SUBJECT_MAP[type] || '📬 QuoteMark Contact Form';

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;padding:32px;border-radius:12px;">
      <div style="background:#0F172A;padding:20px 24px;border-radius:8px;margin-bottom:24px;">
        <span style="font-family:'Arial Black',sans-serif;font-size:22px;font-weight:900;color:#fff;">Quote</span><span style="font-family:'Arial Black',sans-serif;font-size:22px;font-weight:900;color:#F59E0B;">Mark</span>
        <span style="display:block;font-size:12px;color:#94A3B8;margin-top:4px;">Contact Form Submission</span>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;font-size:13px;color:#64748B;font-weight:600;width:120px;">Type</td><td style="padding:8px 0;font-size:14px;color:#0F172A;">${subject}</td></tr>
        <tr><td style="padding:8px 0;font-size:13px;color:#64748B;font-weight:600;">Name</td><td style="padding:8px 0;font-size:14px;color:#0F172A;">${name||'—'}</td></tr>
        <tr><td style="padding:8px 0;font-size:13px;color:#64748B;font-weight:600;">Email</td><td style="padding:8px 0;font-size:14px;color:#0F172A;">${email||'—'}</td></tr>
        <tr><td style="padding:8px 0;font-size:13px;color:#64748B;font-weight:600;">Company</td><td style="padding:8px 0;font-size:14px;color:#0F172A;">${company||'—'}</td></tr>
      </table>
      <div style="margin-top:20px;padding:16px;background:#fff;border-radius:8px;border:1px solid #E2E8F0;">
        <div style="font-size:12px;color:#64748B;font-weight:600;margin-bottom:8px;text-transform:uppercase;letter-spacing:1px;">Message</div>
        <div style="font-size:14px;color:#1E293B;line-height:1.6;">${(message||'').replace(/\n/g,'<br/>')}</div>
      </div>
      <div style="margin-top:16px;font-size:11px;color:#94A3B8;text-align:center;">Sent from quotemarko.netlify.app</div>
    </div>
  `;

  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) {
    console.error('RESEND_API_KEY not set');
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Email service not configured' }) };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'QuoteMark <onboarding@resend.dev>',
      to: ['mark@pinnaclepl.com'],
      reply_to: email || undefined,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Resend error:', err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Failed to send' }) };
  }

  return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
};
