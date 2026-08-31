import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Send, AtSign, ChevronDown, CheckCircle2 } from 'lucide-react';

function LayoutEmailSignup({ qrType = 'emailsignup', pseoUseCase = null }) {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);

  const translate = (key) => {
    const translation = t(key);
    return translation === key ? null : translation;
  };
  const getTranslation = (type, key, suffix) => translate(`pseo.${qrType}.${type}${key}${suffix}`);
  const getUcText = (field) => pseoUseCase ? pseoUseCase[field] : null;

  return (
    <div className="hq-layout-email">
      <style>{`
        .hq-layout-email { background-color: var(--hq-bg); color: var(--hq-text); font-family: 'Inter', system-ui, sans-serif; min-height: 100vh; }
        .hq-email-hero { padding: 120px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; max-width: 1200px; margin: 0 auto; }
        .hq-email-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: #ea4335; color: #fff; border-radius: 100px; font-weight: 700; font-size: 14px; margin-bottom: 24px; }
        .hq-email-app { background: var(--hq-bg); border: 1px solid var(--hq-border); border-radius: 24px; overflow: hidden; box-shadow: 0 32px 64px -16px rgba(0,0,0,0.1); }
        .hq-email-app-header { background: var(--hq-border); padding: 16px 24px; display: flex; gap: 8px; }
        .hq-email-app-dot { width: 12px; height: 12px; border-radius: 50%; background: #ff5f56; }
        .hq-email-app-dot:nth-child(2) { background: #ffbd2e; }
        .hq-email-app-dot:nth-child(3) { background: #27c93f; }
        .hq-email-app-body { padding: 32px; display: flex; flexDirection: column; gap: 16px; }
        .hq-email-input { width: 100%; border-bottom: 1px solid var(--hq-border); padding-bottom: 8px; color: var(--hq-text-muted); }
        .hq-email-features { max-width: 1200px; margin: 0 auto 120px auto; padding: 0 24px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .hq-email-feat-card { background: var(--hq-bg); border: 1px solid var(--hq-border); border-radius: 24px; padding: 32px; }
        @media (max-width: 992px) { .hq-email-hero { grid-template-columns: 1fr; } .hq-email-features { grid-template-columns: 1fr; } }
      `}</style>
      <div className="hq-email-hero">
        <div>
          <div className="hq-email-badge"><Mail size={16} /> {getTranslation('badge', '', '') || 'For Marketing'}</div>
          <h1 className="font-bold tracking-tighter" style={{ fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 1.1, marginBottom: 24 }}>
            {getUcText('h1Title') || getTranslation('hero', 'Title', '') || 'Email QR Code for Newsletter Signups'}
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2.5vw, 20px)', color: 'var(--hq-text-muted)', lineHeight: 1.6 }}>
            {getUcText('seoDesc') || getTranslation('hero', 'Subtitle', '') || 'Grow your email list from physical locations. Generate an Email QR code that pre-fills a subscription request.'}
          </p>
        </div>
        <div className="hq-email-app">
          <div className="hq-email-app-header">
            <div className="hq-email-app-dot"></div><div className="hq-email-app-dot"></div><div className="hq-email-app-dot"></div>
          </div>
          <div className="hq-email-app-body">
            <div className="hq-email-input">To: subscribe@yourbrand.com</div>
            <div className="hq-email-input">Subject: Subscribe me to the Newsletter!</div>
            <div style={{ marginTop: 16, color: 'var(--hq-text)', lineHeight: 1.5 }}>
              Hello, please add me to your weekly newsletter. I want to stay updated on your latest offers.
            </div>
            <div style={{ background: '#ea4335', color: '#fff', padding: '12px 24px', borderRadius: 8, display: 'inline-flex', alignItems: 'center', gap: 8, width: 'fit-content', marginTop: 16 }}>
              <Send size={16} /> Send Email
            </div>
          </div>
        </div>
      </div>
      <div className="hq-email-features">
        {[
          { icon: <AtSign size={32} />, id: 1, fbT: 'Pre-filled Content', fbD: 'Automatically drafts an email with your chosen subject and body text.' },
          { icon: <Mail size={32} />, id: 2, fbT: 'Native Apps', fbD: 'Opens the user\'s default mail client like Apple Mail or Gmail automatically.' },
          { icon: <CheckCircle2 size={32} />, id: 3, fbT: 'Capture Leads', fbD: 'Perfect for retail checkout counters or trade show booths.' }
        ].map(feat => (
          <div key={feat.id} className="hq-email-feat-card">
            <div style={{ color: '#ea4335', marginBottom: 24 }}>{feat.icon}</div>
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
export default LayoutEmailSignup;
