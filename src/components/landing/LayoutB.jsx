import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const IconCheck = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);
const IconChevronDown = ({ open }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

function LayoutB({ qrType = 'wifi' }) {
  const { t: translate } = useTranslation();
  const typeName = translate(`types.${qrType}`);
  const tObj = translate('landing', { returnObjects: true });
  const t = typeof tObj === 'object' && tObj !== null ? tObj : {};
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="hq-layout-b">
      <style>{`
        .hq-layout-b {
          --hq-bg: #f8fafc;
          --hq-text: #0a1930;
          --hq-text-muted: #475569;
          --hq-card: #ffffff;
          --hq-border: #e2e8f0;
          --hq-accent: #1d4ed8;
          --hq-accent-glow: rgba(29, 78, 216, 0.1);
          font-family: -apple-system, BlinkMacSystemFont, "Inter", sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 80px;
        }
        html.dark .hq-layout-b {
          --hq-bg: #040a18;
          --hq-text: #f1f5f9;
          --hq-text-muted: #94a3b8;
          --hq-card: #081226;
          --hq-border: #102040;
          --hq-accent: #3b82f6;
          --hq-accent-glow: rgba(59, 130, 246, 0.15);
        }
        .hq-container { max-width: 1300px; margin: 0 auto; padding: 0 32px; }
        
        .hq-split-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          margin-bottom: 120px;
        }
        
        .hq-split-left h2 {
          font-size: clamp(48px, 6vw, 72px);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.05em;
          margin-bottom: 32px;
        }
        .hq-split-left p {
          font-size: 20px;
          color: var(--hq-text-muted);
          line-height: 1.6;
          max-width: 500px;
          margin-bottom: 40px;
        }
        .hq-feature-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .hq-feature-item {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 18px;
          font-weight: 600;
        }
        .hq-feature-icon {
          width: 48px; height: 48px; border-radius: 16px;
          background: var(--hq-accent-glow); color: var(--hq-accent);
          display: flex; align-items: center; justify-content: center;
        }

        .hq-split-right {
          position: relative;
          aspect-ratio: 1;
          background: radial-gradient(circle at center, var(--hq-accent-glow) 0%, transparent 70%);
          display: flex; align-items: center; justify-content: center;
        }
        .hq-floating-card {
          width: 80%;
          aspect-ratio: 4/3;
          background: var(--hq-card);
          border: 1px solid var(--hq-border);
          border-radius: 32px;
          box-shadow: 0 40px 100px -20px rgba(0,0,0,0.1);
          transform: rotate(-3deg) translateY(-20px);
          transition: transform 0.5s ease;
        }
        .hq-floating-card:hover {
          transform: rotate(0deg) translateY(0px);
        }
        html.dark .hq-floating-card { box-shadow: 0 40px 100px -20px rgba(0,0,0,0.5); }

        .hq-step-cards {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;
          margin-bottom: 120px;
        }
        .hq-step-card {
          background: var(--hq-bg); border-top: 4px solid var(--hq-border);
          padding: 40px 0;
        }
        .hq-step-card:hover { border-top-color: var(--hq-accent); }
        .hq-step-num { font-size: 64px; font-weight: 900; color: var(--hq-border); line-height: 1; margin-bottom: 24px; }
        
        .hq-faq-section { background: var(--hq-card); border-top: 1px solid var(--hq-border); padding: 100px 0; }
        
        @media (max-width: 992px) {
          .hq-split-hero { grid-template-columns: 1fr; text-align: center; gap: 40px; }
          .hq-split-left p { margin: 0 auto 40px auto; }
          .hq-feature-list { align-items: center; }
          .hq-step-cards { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="hq-container">
        <div className="hq-split-hero">
          <div className="hq-split-left">
            <h2>{t.heroTitle} <br/><span style={{ color: 'var(--hq-accent)' }}>{typeName}</span></h2>
            <p>{t.heroSubtitle}</p>
            <div className="hq-feature-list">
              <div className="hq-feature-item">
                <div className="hq-feature-icon"><IconCheck /></div>
                <span>{t.comp1Title}</span>
              </div>
              <div className="hq-feature-item">
                <div className="hq-feature-icon"><IconCheck /></div>
                <span>{t.comp2Title}</span>
              </div>
              <div className="hq-feature-item">
                <div className="hq-feature-icon"><IconCheck /></div>
                <span>{t.comp3Title}</span>
              </div>
            </div>
          </div>
          <div className="hq-split-right">
            <div className="hq-floating-card">
              {/* Decorative mockup pattern */}
              <div style={{ padding: 32, height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ width: '40%', height: 24, borderRadius: 8, background: 'var(--hq-border)' }}></div>
                <div style={{ width: '80%', height: 16, borderRadius: 8, background: 'var(--hq-border)', opacity: 0.5 }}></div>
                <div style={{ width: '60%', height: 16, borderRadius: 8, background: 'var(--hq-border)', opacity: 0.5 }}></div>
                <div style={{ flex: 1, border: '2px dashed var(--hq-border)', borderRadius: 16, marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 100, height: 100, background: 'var(--hq-accent-glow)', borderRadius: 12 }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800 }}>{t.stepsTitle} {typeName}</h2>
        </div>

        <div className="hq-step-cards">
          {[
            { n: '01', t: t.step1Title, d: `${t.step1Desc} (${typeName})` },
            { n: '02', t: t.step2Title, d: t.step2Desc },
            { n: '03', t: t.step3Title, d: t.step3Desc }
          ].map(step => (
            <div key={step.n} className="hq-step-card">
              <div className="hq-step-num">{step.n}</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>{step.t}</h3>
              <p style={{ color: 'var(--hq-text-muted)', lineHeight: 1.6, fontSize: 16 }}>{step.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="hq-faq-section">
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
              <div key={i} style={{ border: '1px solid var(--hq-border)', borderRadius: 24, overflow: 'hidden' }}>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--hq-text)' }}>{faq.q}</span>
                  <span style={{ color: 'var(--hq-accent)' }}><IconChevronDown open={openFaq === i} /></span>
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

export default LayoutB;
