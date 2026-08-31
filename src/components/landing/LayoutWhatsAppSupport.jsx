import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, HeartHandshake, Zap, ChevronDown, CheckCircle2 } from 'lucide-react';

function LayoutWhatsAppSupport({ qrType = 'whatsappsupport', pseoUseCase = null }) {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);

  const translate = (key) => {
    const translation = t(key);
    return translation === key ? null : translation;
  };
  const getTranslation = (type, key, suffix) => translate(`pseo.${qrType}.${type}${key}${suffix}`);
  const getUcText = (field) => pseoUseCase ? pseoUseCase[field] : null;

  return (
    <div className="hq-layout-wa">
      <style>{`
        .hq-layout-wa { background-color: var(--hq-bg); color: var(--hq-text); font-family: 'Inter', system-ui, sans-serif; min-height: 100vh; }
        .hq-wa-hero { padding: 120px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; max-width: 1200px; margin: 0 auto; }
        .hq-wa-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: #25D366; color: #fff; border-radius: 100px; font-weight: 700; font-size: 14px; margin-bottom: 24px; }
        .hq-chat-bubble { background: #25D366; color: #fff; border-radius: 24px 24px 24px 4px; padding: 24px; font-size: 18px; line-height: 1.5; margin-bottom: 16px; width: fit-content; max-width: 80%; }
        .hq-chat-bubble.hq-reply { background: var(--hq-border); color: var(--hq-text); border-radius: 24px 24px 4px 24px; margin-left: auto; }
        .hq-wa-features { max-width: 1200px; margin: 0 auto 120px auto; padding: 0 24px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .hq-wa-feat-card { background: var(--hq-bg); border: 1px solid var(--hq-border); border-radius: 24px; padding: 32px; }
        @media (max-width: 992px) { .hq-wa-hero { grid-template-columns: 1fr; } .hq-wa-features { grid-template-columns: 1fr; } }
      `}</style>
      <div className="hq-wa-hero">
        <div>
          <div className="hq-wa-badge"><MessageCircle size={16} /> {getTranslation('badge', '', '') || 'For Support Teams'}</div>
          <h1 className="font-bold tracking-tighter" style={{ fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 1.1, marginBottom: 24 }}>
            {getUcText('h1Title') || getTranslation('hero', 'Title', '') || 'WhatsApp QR Code for Customer Support'}
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2.5vw, 20px)', color: 'var(--hq-text-muted)', lineHeight: 1.6 }}>
            {getUcText('seoDesc') || getTranslation('hero', 'Subtitle', '') || 'Generate a WhatsApp QR code that opens a direct chat with your support team.'}
          </p>
        </div>
        <div style={{ background: 'var(--hq-bg)', border: '1px solid var(--hq-border)', borderRadius: 32, padding: 32, paddingBottom: 48, boxShadow: '0 32px 64px -16px rgba(0,0,0,0.1)' }}>
          <div className="hq-chat-bubble">Hello, I need help with my recent order!</div>
          <div className="hq-chat-bubble hq-reply">Hi there! I'd be happy to help. What's your order number?</div>
        </div>
      </div>
      <div className="hq-wa-features">
        {[
          { icon: <HeartHandshake size={32} />, id: 1, fbT: 'Instant Support', fbD: 'Customers scan and chat immediately, no need to save your number.' },
          { icon: <Zap size={32} />, id: 2, fbT: 'Pre-filled Messages', fbD: 'Set a default message to reduce friction for the user.' },
          { icon: <CheckCircle2 size={32} />, id: 3, fbT: 'Universal', fbD: 'Works perfectly on standard WhatsApp and WhatsApp Business.' }
        ].map(feat => (
          <div key={feat.id} className="hq-wa-feat-card">
            <div style={{ color: '#25D366', marginBottom: 24 }}>{feat.icon}</div>
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
export default LayoutWhatsAppSupport;
