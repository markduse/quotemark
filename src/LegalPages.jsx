import React from 'react';

const C = {
  bg0: '#060E1A', bg1: '#0B1525', bg2: '#0F1D30',
  gold: '#C5A059',
  t0: '#FAF9F6', t1: '#E2E8F0', t2: '#CBD5E1', t3: '#94A3B8', t4: '#64748B',
  bd: '#1A3050', bd2: '#243D5C',
};

const SHELL_STYLE = {
  minHeight: '100vh',
  background: C.bg0,
  color: C.t1,
  fontFamily: "'DM Sans', sans-serif",
  padding: '40px 24px 80px',
  lineHeight: 1.7,
};

const INNER_STYLE = {
  maxWidth: 760,
  margin: '0 auto',
  background: C.bg1,
  border: `1px solid ${C.bd2}`,
  borderRadius: 16,
  padding: '40px 44px',
};

const H1 = { fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: '-0.5px', color: C.t0, marginBottom: 6 };
const H2 = { fontSize: 18, fontWeight: 700, color: C.t0, marginTop: 32, marginBottom: 10, letterSpacing: '-0.2px' };
const PARA = { fontSize: 14, color: C.t2, marginBottom: 12 };
const META = { fontSize: 12, color: C.t4, marginBottom: 28 };
const BACK = { display: 'inline-block', marginBottom: 28, color: C.gold, fontSize: 13, fontWeight: 600, textDecoration: 'none', letterSpacing: 0.3 };

const COMPANY = 'Duse Financial Group';
const APP_NAME = 'QuoteMark';
const SUPPORT_EMAIL = 'support@quotemarko.com';

export function PrivacyPage() {
  return (
    <div style={SHELL_STYLE}>
      <div style={INNER_STYLE}>
        <a href="/" style={BACK}>← Back to {APP_NAME}</a>
        <div style={H1}>Privacy <span style={{ color: C.gold }}>Policy</span></div>
        <div style={META}>Last updated: May 8, 2026</div>

        <p style={PARA}>
          {APP_NAME} is operated by {COMPANY} (“we,” “us,” “our”). This policy explains
          what information we collect from licensed insurance agents who use {APP_NAME},
          how we use it, and the choices you have.
        </p>

        <div style={H2}>Information we collect</div>
        <p style={PARA}>
          <strong>Account information.</strong> When you create an account we collect
          your email address and a password (stored as a one-way hash by Supabase Auth).
        </p>
        <p style={PARA}>
          <strong>Profile preferences.</strong> Your selected carrier preferences, dark
          mode setting, and display name (if you provide one).
        </p>
        <p style={PARA}>
          <strong>Billing information.</strong> When you subscribe, payment is processed
          by Stripe. We never see or store your card number — we only receive a Stripe
          customer ID and your subscription status.
        </p>
        <p style={PARA}>
          <strong>Quote inputs.</strong> Client demographics you enter (age, gender,
          tobacco use, state, face amount, health conditions) are processed in your
          browser to produce quotes. We do not transmit or store these inputs on our
          servers. Your last quote may be persisted in your browser's session storage
          for convenience.
        </p>

        <div style={H2}>How we use information</div>
        <p style={PARA}>
          To authenticate your account, deliver the quoting service, manage your
          subscription, communicate with you about the service, and improve {APP_NAME}.
          We do not sell your information.
        </p>

        <div style={H2}>Third-party services</div>
        <p style={PARA}>
          We use the following providers to operate {APP_NAME}:
        </p>
        <p style={PARA}>
          • <strong>Supabase</strong> — authentication and profile storage.<br/>
          • <strong>Stripe</strong> — payment processing and subscription billing.<br/>
          • <strong>Netlify</strong> — application hosting and serverless functions.
        </p>
        <p style={PARA}>
          Each is bound by its own privacy and security commitments. When you click an
          “e-App” link to a carrier portal, you leave {APP_NAME} and that carrier's
          privacy policy applies.
        </p>

        <div style={H2}>Data retention</div>
        <p style={PARA}>
          We retain your account information for as long as your account is active.
          You can request deletion at any time by emailing {SUPPORT_EMAIL}; we will
          remove your profile and ask Stripe and Supabase to delete associated records,
          subject to legal and accounting retention requirements.
        </p>

        <div style={H2}>Security</div>
        <p style={PARA}>
          Connections to {APP_NAME} are encrypted via TLS. Authentication tokens are
          managed by Supabase. We restrict employee access to production systems on a
          need-to-know basis. No system is perfectly secure; if you suspect a security
          issue, email us at {SUPPORT_EMAIL}.
        </p>

        <div style={H2}>Children</div>
        <p style={PARA}>
          {APP_NAME} is intended for licensed insurance agents and is not directed to
          children under 18.
        </p>

        <div style={H2}>Changes to this policy</div>
        <p style={PARA}>
          We may update this policy. The “Last updated” date above will reflect material
          changes. Continued use of {APP_NAME} after a change indicates acceptance.
        </p>

        <div style={H2}>Contact</div>
        <p style={PARA}>
          {COMPANY} · <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: C.gold }}>{SUPPORT_EMAIL}</a>
        </p>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div style={SHELL_STYLE}>
      <div style={INNER_STYLE}>
        <a href="/" style={BACK}>← Back to {APP_NAME}</a>
        <div style={H1}>Terms of <span style={{ color: C.gold }}>Service</span></div>
        <div style={META}>Last updated: May 8, 2026</div>

        <p style={PARA}>
          These Terms govern your access to and use of {APP_NAME}, a quoting tool
          operated by {COMPANY} (“we,” “us”). By creating an account or using the
          service you agree to these Terms.
        </p>

        <div style={H2}>Eligibility</div>
        <p style={PARA}>
          {APP_NAME} is provided exclusively to licensed insurance agents for use in
          the ordinary course of agent business. You represent that you are 18 or
          older and authorized to bind your agency.
        </p>

        <div style={H2}>Subscription &amp; billing</div>
        <p style={PARA}>
          {APP_NAME} is offered on a recurring monthly subscription billed at the
          rate displayed at checkout. New accounts may include a 1-day free trial,
          after which the recurring charge begins automatically. Subscriptions
          continue until canceled.
        </p>
        <p style={PARA}>
          You can cancel at any time via the in-app “Manage subscription” link, which
          opens the Stripe-hosted billing portal. Cancellations take effect at the end
          of the current billing period; you retain access until that date.
        </p>
        <p style={PARA}>
          Refunds are not provided for partial months. If you believe you were charged
          in error, email {SUPPORT_EMAIL} within 30 days.
        </p>

        <div style={H2}>Use of the service</div>
        <p style={PARA}>
          You agree to use {APP_NAME} only for legitimate quoting in connection with
          your insurance business. You will not:
        </p>
        <p style={PARA}>
          • share your account credentials with unauthorized users;<br/>
          • scrape, copy, or redistribute carrier rate data outside of normal quoting;<br/>
          • use {APP_NAME} to produce illustrations represented as official carrier quotes;<br/>
          • interfere with the integrity or performance of the service.
        </p>

        <div style={H2}>Quote accuracy</div>
        <p style={PARA}>
          Premiums shown in {APP_NAME} are estimates for illustration only based on
          rate data published or scraped from carriers. Actual premiums are subject to
          underwriting, state availability, and carrier face-amount limits. You are
          responsible for confirming each quote with the carrier before binding
          coverage. {COMPANY} does not warrant that displayed rates are current at the
          moment of any specific carrier transaction.
        </p>

        <div style={H2}>Carrier handoff</div>
        <p style={PARA}>
          “e-App” buttons link to third-party carrier portals. Your interactions there
          are governed solely by that carrier's terms and privacy policies.
        </p>

        <div style={H2}>Intellectual property</div>
        <p style={PARA}>
          The {APP_NAME} application, including its UI, design, and aggregated rate
          data, is owned by {COMPANY}. We grant you a limited, non-exclusive,
          non-transferable right to use the service while your subscription is in
          good standing. Carrier names and logos are property of their respective
          owners and are used here for identification.
        </p>

        <div style={H2}>Disclaimer</div>
        <p style={PARA}>
          {APP_NAME} is provided “as is” without warranty of any kind, express or
          implied. We disclaim all warranties of merchantability, fitness for a
          particular purpose, and non-infringement.
        </p>

        <div style={H2}>Limitation of liability</div>
        <p style={PARA}>
          To the maximum extent permitted by law, {COMPANY}'s total aggregate
          liability arising from or related to {APP_NAME} will not exceed the amount
          you paid us in the 12 months preceding the event giving rise to the claim.
          We are not liable for indirect, incidental, special, or consequential
          damages, including lost commissions or business opportunity.
        </p>

        <div style={H2}>Termination</div>
        <p style={PARA}>
          We may suspend or terminate access for breach of these Terms or for misuse of
          the service. You may terminate at any time by canceling your subscription.
        </p>

        <div style={H2}>Governing law</div>
        <p style={PARA}>
          These Terms are governed by the laws of the State of Michigan, without
          regard to conflict of laws principles. Any dispute will be brought in the
          state or federal courts located in Oakland County, Michigan.
        </p>

        <div style={H2}>Contact</div>
        <p style={PARA}>
          {COMPANY} · <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: C.gold }}>{SUPPORT_EMAIL}</a>
        </p>
      </div>
    </div>
  );
}
