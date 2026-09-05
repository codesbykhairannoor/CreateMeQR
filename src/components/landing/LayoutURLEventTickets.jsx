import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Ticket, Users, TrendingUp, ChevronDown, CheckCircle2 } from 'lucide-react';

function LayoutURLEventTickets({ qrType = 'urleventtickets', pseoUseCase = null }) {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);

  const translate = (key) => {
    const translation = t(key);
    return translation === key ? null : translation;
  };
  const getTranslation = (type, key, suffix) => translate(`pseo.${qrType}.${type}${key}${suffix}`);
  const getUcText = (field) => pseoUseCase ? pseoUseCase[field] : null;

  return (
    <div className="hq-layout-event">
      <style>{`
        .hq-layout-event { background-color: var(--hq-bg); color: var(--hq-text); font-family: 'Inter', system-ui, sans-serif; min-height: 100vh; }
        .hq-evt-hero { padding: 120px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; max-width: 1200px; margin: 0 auto; }
        .hq-evt-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: #e91e63; color: #fff; border-radius: 100px; font-weight: 700; font-size: 14px; margin-bottom: 24px; }
        .hq-ticket { background: var(--hq-accent); color: #fff; border-radius: 24px; padding: 40px; position: relative; box-shadow: 0 32px 64px -16px rgba(233,30,99,0.4); }
        .hq-ticket::before, .hq-ticket::after { content: ''; position: absolute; top: 50%; width: 40px; height: 40px; background: var(--hq-bg); border-radius: 50%; transform: translateY(-50%); }
        .hq-ticket::before { left: -20px; } .hq-ticket::after { right: -20px; }
        .hq-evt-features { max-width: 1200px; margin: 0 auto 120px auto; padding: 0 24px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .hq-evt-feat-card { background: var(--hq-bg); border: 1px solid var(--hq-border); border-radius: 24px; padding: 32px; }
        @media (max-width: 992px) { .hq-evt-hero { grid-template-columns: 1fr; text-align: center; } .hq-evt-features { grid-template-columns: 1fr; } }
      `}</style>
      <div className="hq-evt-hero">
        <div>
          <div className="hq-evt-badge"><Ticket size={16} /> {getTranslation('badge', '', '') || 'For Events'}</div>
          <h2 className="font-bold tracking-tighter" style={{ fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 1.1, marginBottom: 24 }}>
            {getUcText('h1Title') || getTranslation('hero', 'Title', '') || 'URL QR Code for Event Tickets & Registration'}
          </h2>
          <p style={{ fontSize: 'clamp(18px, 2.5vw, 20px)', color: 'var(--hq-text-muted)', lineHeight: 1.6 }}>
            {getUcText('seoDesc') || getTranslation('hero', 'Subtitle', '') || 'Boost event attendance by linking physical flyers to your digital ticketing page.'}
          </p>
        </div>
        <div>
          <div className="hq-ticket">
            <div style={{ borderBottom: '2px dashed rgba(255,255,255,0.3)', paddingBottom: 24, marginBottom: 24 }}>
              <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 2, opacity: 0.8 }}>Admit One</div>
              <div style={{ fontSize: 32, fontWeight: 'bold', marginTop: 8 }}>Summer Music Fest</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, opacity: 0.8 }}>Date</div>
                <div style={{ fontSize: 18, fontWeight: 'bold' }}>Aug 20, 2026</div>
              </div>
              <div style={{ width: 80, height: 80, background: '#fff', borderRadius: 8 }}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="hq-evt-features">
        {[
          { icon: <TrendingUp size={32} />, id: 1, fbT: 'Boost Sales', fbD: 'Turn offline flyers into instant online sales.' },
          { icon: <Users size={32} />, id: 2, fbT: 'Track Attendance', fbD: 'Use UTM tags to track which posters generate the most scans.' },
          { icon: <CheckCircle2 size={32} />, id: 3, fbT: 'No Limits', fbD: 'Unlimited scans, completely free, no expiration dates.' }
        ].map(feat => (
          <div key={feat.id} className="hq-evt-feat-card">
            <div style={{ color: '#e91e63', marginBottom: 24 }}>{feat.icon}</div>
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
export default LayoutURLEventTickets;
