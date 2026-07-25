import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserCircle2, ShieldCheck, Zap, CheckCircle2, ChevronDown } from 'lucide-react';

function LayoutVCard({ qrType = 'vcard' }) {
  const { t: translate } = useTranslation();
  const typeName = translate(`types.${qrType}`);
  const tObj = translate('landing', { returnObjects: true });
  const t = typeof tObj === 'object' && tObj !== null ? tObj : {};
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="hq-layout-vcard">
      <style>{`
        .hq-layout-vcard {
          --hq-bg: #f8fafc;
          --hq-text: #0a1930;
          --hq-text-muted: #475569;
          --hq-card: #ffffff;
          --hq-border: #e2e8f0;
          /* LOCKED TO BASE PALETTE */
          --hq-accent: #2563eb;
          --hq-accent-glow: rgba(37, 99, 235, 0.1);
          --hq-grad: linear-gradient(135deg, var(--hq-accent), #60a5fa);
          font-family: -apple-system, BlinkMacSystemFont, "Inter", sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 160px; /* REQUIRED MASSIVE SPACING */
        }
        html.dark .hq-layout-vcard {
          --hq-bg: #040a18;
          --hq-text: #f1f5f9;
          --hq-text-muted: #94a3b8;
          --hq-card: #081226;
          --hq-border: #1e293b;
          --hq-accent: #3b82f6;
          --hq-accent-glow: rgba(59, 130, 246, 0.15);
          --hq-grad: linear-gradient(135deg, #1d4ed8, var(--hq-accent));
        }
        
        .hq-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        .hq-profile-hero {
          background: var(--hq-card);
          border: 1px solid var(--hq-border);
          border-radius: 40px;
          padding: 80px 40px;
          text-align: center;
          margin-bottom: 80px;
          box-shadow: 0 20px 80px -20px rgba(37, 99, 235, 0.05);
          position: relative;
          overflow: hidden;
        }
        html.dark .hq-profile-hero { box-shadow: none; }
        
        .hq-hero-bg {
          position: absolute; top: 0; left: 0; right: 0; height: 160px;
          background: var(--hq-grad); opacity: 0.1;
        }
        
        .hq-avatar-wrap {
          width: 120px; height: 120px;
          border-radius: 50%;
          background: var(--hq-card);
          border: 4px solid var(--hq-bg);
          color: var(--hq-accent);
          display: flex; align-items: center; justify-content: center;
          margin: -20px auto 32px auto;
          position: relative;
          z-index: 2;
          box-shadow: 0 10px 30px -10px var(--hq-accent-glow);
        }
        
        .hq-profile-hero h2 {
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 900;
          letter-spacing: -0.04em;
          margin-bottom: 24px;
          position: relative; z-index: 2;
        }
        .hq-profile-hero p {
          font-size: 20px;
          color: var(--hq-text-muted);
          max-width: 600px; margin: 0 auto 40px auto;
          line-height: 1.6;
          position: relative; z-index: 2;
        }
        
        .hq-badge-strip {
          display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; position: relative; z-index: 2;
        }
        .hq-badge {
          background: var(--hq-bg); border: 1px solid var(--hq-border);
          padding: 8px 16px; border-radius: 999px;
          font-size: 14px; font-weight: 600;
          display: flex; align-items: center; gap: 8px;
        }
        
        .hq-horizontal-cards {
          display: flex; gap: 24px; overflow-x: auto; padding-bottom: 40px;
          scroll-snap-type: x mandatory;
          -ms-overflow-style: none; scrollbar-width: none;
        }
        .hq-horizontal-cards::-webkit-scrollbar { display: none; }
        .hq-h-card {
          min-width: 340px; flex: 1;
          background: var(--hq-card); border: 1px solid var(--hq-border);
          border-radius: 24px; padding: 40px;
          scroll-snap-align: start;
        }
        .hq-h-card h3 { font-size: 24px; font-weight: 800; margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
        .hq-h-card p { color: var(--hq-text-muted); line-height: 1.6; }
        
        .hq-timeline {
          max-width: 600px; margin: 0 auto 100px auto;
        }
        .hq-t-item { display: flex; gap: 24px; margin-bottom: 40px; }
        .hq-t-num { width: 48px; height: 48px; border-radius: 50%; background: var(--hq-grad); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 20px; flex-shrink: 0; }
        .hq-t-content h4 { font-size: 20px; font-weight: 700; margin-bottom: 8px; margin-top: 8px; }
        .hq-t-content p { color: var(--hq-text-muted); line-height: 1.6; }
      `}</style>

      <div className="hq-container">
        <div className="hq-profile-hero">
          <div className="hq-hero-bg"></div>
          <div className="hq-avatar-wrap"><UserCircle2 size={64} strokeWidth={1.5} /></div>
          <h2>{t.heroTitle} <br/><span style={{ color: 'var(--hq-accent)' }}>{typeName}</span></h2>
          <p>{t.heroSubtitle}</p>
          <div className="hq-badge-strip">
            <div className="hq-badge"><span style={{ color: 'var(--hq-accent)' }}><ShieldCheck size={16}/></span> {t.badgePrivate || 'Private'}</div>
            <div className="hq-badge"><span style={{ color: 'var(--hq-accent)' }}><CheckCircle2 size={16}/></span> {t.badgeZeroAds || 'No Ads'}</div>
            <div className="hq-badge"><span style={{ color: 'var(--hq-accent)' }}><Zap size={16}/></span> {t.badgeFree || 'Free'}</div>
          </div>
        </div>
        
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, textAlign: 'center' }}>
            {t.badgeLeadMarket || 'Why We Lead'}
          </h2>
        </div>
        
        <div className="hq-horizontal-cards">
          <div className="hq-h-card">
            <h3><ShieldCheck size={28} color="var(--hq-accent)" /> {t.comp1Title}</h3>
            <p>{t.comp1Desc}</p>
          </div>
          <div className="hq-h-card">
            <h3><Zap size={28} color="var(--hq-accent)" /> {t.comp2Title}</h3>
            <p>{t.comp2Desc}</p>
          </div>
          <div className="hq-h-card">
            <h3><CheckCircle2 size={28} color="var(--hq-accent)" /> {t.comp3Title}</h3>
            <p>{t.comp3Desc}</p>
          </div>
        </div>

        <div style={{ marginBottom: 60, marginTop: 40 }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, textAlign: 'center' }}>
            {t.stepsTitle} {typeName}
          </h2>
        </div>

        <div className="hq-timeline">
          {[
            { n: '1', t: t.step1Title, d: `${t.step1Desc} (${typeName})` },
            { n: '2', t: t.step2Title, d: t.step2Desc },
            { n: '3', t: t.step3Title, d: t.step3Desc }
          ].map(step => (
            <div key={step.n} className="hq-t-item">
              <div className="hq-t-num">{step.n}</div>
              <div className="hq-t-content">
                <h4>{step.t}</h4>
                <p>{step.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: 'var(--hq-card)', borderTop: '1px solid var(--hq-border)', padding: '100px 0' }}>
        <div className="hq-container" style={{ maxWidth: 800 }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, textAlign: 'center', marginBottom: 60 }}>
            {t.faqTitle} {typeName}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { q: t.faq1Q, a: t.faq1A },
              { q: t.faq2Q, a: t.faq2A },
              { q: t.faq3Q, a: t.faq3A },
              { q: t.faq4Q, a: t.faq4A }
            ].map((faq, i) => (
              <div key={i} style={{ border: '1px solid var(--hq-border)', borderRadius: 24, overflow: 'hidden', background: 'var(--hq-bg)' }}>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--hq-text)' }}>{faq.q}</span>
                  <span style={{ color: 'var(--hq-accent)' }}><ChevronDown open={openFaq === i} /></span>
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0, transition: 'all 0.3s' }}>
                  <div style={{ padding: '0 32px 32px 32px', color: 'var(--hq-text-muted)', lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutVCard;
