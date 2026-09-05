import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, CreditCard, ShieldCheck, ChevronDown, CheckCircle2 } from 'lucide-react';

function LayoutPayPalDonation({ qrType = 'paypaldonation', pseoUseCase = null }) {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);

  const translate = (key) => {
    const translation = t(key);
    return translation === key ? null : translation;
  };
  const getTranslation = (type, key, suffix) => translate(`pseo.${qrType}.${type}${key}${suffix}`);
  const getUcText = (field) => pseoUseCase ? pseoUseCase[field] : null;

  return (
    <div className="hq-layout-paypal">
      <style>{`
        .hq-layout-paypal { background-color: var(--hq-bg); color: var(--hq-text); font-family: 'Inter', system-ui, sans-serif; min-height: 100vh; }
        .hq-pp-hero { padding: 120px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; max-width: 1200px; margin: 0 auto; }
        .hq-pp-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: #0079C1; color: #fff; border-radius: 100px; font-weight: 700; font-size: 14px; margin-bottom: 24px; }
        .hq-pp-card { background: var(--hq-bg); border: 1px solid var(--hq-border); border-radius: 24px; padding: 48px; box-shadow: 0 32px 64px -16px rgba(0, 121, 193, 0.15); text-align: center; }
        .hq-pp-btn { display: inline-block; background: #0079C1; color: #fff; padding: 16px 32px; border-radius: 100px; font-weight: bold; font-size: 18px; margin-top: 24px; width: 100%; }
        .hq-pp-features { max-width: 1200px; margin: 0 auto 120px auto; padding: 0 24px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .hq-pp-feat-card { background: var(--hq-bg); border: 1px solid var(--hq-border); border-radius: 24px; padding: 32px; }
        @media (max-width: 992px) { .hq-pp-hero { grid-template-columns: 1fr; } .hq-pp-features { grid-template-columns: 1fr; } }
      `}</style>
      <div className="hq-pp-hero">
        <div>
          <div className="hq-pp-badge"><Heart size={16} /> {getTranslation('badge', '', '') || 'For Charities'}</div>
          <h2 className="font-bold tracking-tighter" style={{ fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 1.1, marginBottom: 24 }}>
            {getUcText('h1Title') || getTranslation('hero', 'Title', '') || 'PayPal QR Code for Non-Profits & Donations'}
          </h2>
          <p style={{ fontSize: 'clamp(18px, 2.5vw, 20px)', color: 'var(--hq-text-muted)', lineHeight: 1.6 }}>
            {getUcText('seoDesc') || getTranslation('hero', 'Subtitle', '') || 'Make fundraising frictionless. Generate a PayPal QR code to accept instant donations at charity events.'}
          </p>
        </div>
        <div className="hq-pp-card">
          <Heart size={64} style={{ color: '#0079C1', margin: '0 auto 24px auto' }} />
          <h3 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>Community Support Fund</h3>
          <p style={{ color: 'var(--hq-text-muted)', fontSize: 16, marginBottom: 24 }}>Donate to help our cause</p>
          <div style={{ fontSize: 48, fontWeight: 'bold', letterSpacing: '-2px' }}>$5.00</div>
          <div className="hq-pp-btn">Donate with PayPal</div>
        </div>
      </div>
      <div className="hq-pp-features">
        {[
          { icon: <CreditCard size={32} />, id: 1, fbT: 'Frictionless', fbD: 'Donors scan and pay immediately using their saved PayPal accounts.' },
          { icon: <ShieldCheck size={32} />, id: 2, fbT: 'Secure', fbD: 'Transactions happen inside PayPal\'s encrypted environment.' },
          { icon: <CheckCircle2 size={32} />, id: 3, fbT: 'No Hidden Fees', fbD: 'We charge zero commission. Only standard PayPal fees apply.' }
        ].map(feat => (
          <div key={feat.id} className="hq-pp-feat-card">
            <div style={{ color: '#0079C1', marginBottom: 24 }}>{feat.icon}</div>
            <h3 className="font-bold tracking-tighter" style={{ fontSize: 24, marginBottom: 12 }}>{getTranslation('feat', 'Title', feat.id) || feat.fbT}</h3>
            <p style={{ color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{getTranslation('feat', 'Desc', feat.id) || feat.fbD}</p>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto 120px auto', padding: '0 24px' }}>
        <h2 className="font-bold tracking-tighter" style={{ fontSize: 'clamp(32px, 5vw, 48px)', textAlign: 'center', marginBottom: 48 }}>{getTranslation('faq', 'Title', '') || 'Common Questions'}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(pseoUseCase?.faqs || [1,2,3]).map((faq, i) => {
            const q = faq.q || getTranslation('faq', 'Q', faq);
            const a = faq.a || getTranslation('faq', 'A', faq);
            if (!q) return null;
            return (
              <div key={i} style={{ background: 'var(--hq-bg)', border: '1px solid var(--hq-border)', borderRadius: 16, overflow: 'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}>
                  <span className="font-bold tracking-tighter" style={{ fontSize: 20 }}>{q}</span>
                  <ChevronDown size={24} style={{ color: 'var(--hq-text-muted)', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                  <p style={{ padding: '0 24px 24px 24px', margin: 0, color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default LayoutPayPalDonation;
