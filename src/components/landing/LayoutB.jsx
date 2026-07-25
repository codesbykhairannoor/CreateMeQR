import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Zap, Lock, Map, Wifi, CheckCircle2, ChevronDown } from 'lucide-react';

function LayoutB({ qrType = 'wifi' }) {
  const { t: translate } = useTranslation();
  const typeName = translate(`types.${qrType}`);
  const tObj = translate('landing', { returnObjects: true });
  const t = typeof tObj === 'object' && tObj !== null ? tObj : {};
  const [openFaq, setOpenFaq] = useState(null);

  // Determine main icon based on tool
  const MainIcon = qrType === 'wifi' ? Wifi : Map;

  return (
    <div className="hq-layout-b">
      <style>{`
        .hq-layout-b {
          --hq-bg: #f8fafc;
          --hq-text: #0a1930;
          --hq-text-muted: #475569;
          --hq-card: #ffffff;
          --hq-border: #e2e8f0;
          --hq-accent: #10b981;
          --hq-accent-glow: rgba(16, 185, 129, 0.1);
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
          --hq-accent: #10b981;
          --hq-accent-glow: rgba(16, 185, 129, 0.15);
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
        .hq-feature-list { display: flex; flex-direction: column; gap: 20px; }
        .hq-feature-item { display: flex; alignItems: center; gap: 16px; font-size: 18px; font-weight: 600; }
        .hq-feature-icon {
          width: 48px; height: 48px; border-radius: 16px;
          background: var(--hq-accent-glow); color: var(--hq-accent);
          display: flex; align-items: center; justify-content: center;
        }

        .hq-split-right { display: flex; justify-content: center; }
        .hq-glow-orb {
          position: relative; width: 340px; height: 340px;
        }
        .hq-glow-orb-inner {
          position: absolute; inset: 0; border-radius: 50%;
          border: 2px solid rgba(16,185,129,0.2);
        }
        .hq-glow-orb-mid {
          position: absolute; inset: 40px; border-radius: 50%;
          border: 2px dashed rgba(16,185,129,0.3);
          animation: spin 30s linear infinite;
        }
        .hq-glow-orb-core {
          position: absolute; inset: 80px; border-radius: 50%;
          background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.2));
          display: flex; alignItems: center; justify-content: center;
          box-shadow: 0 0 80px rgba(16,185,129,0.3);
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }

        .hq-step-cards {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-bottom: 120px;
        }
        .hq-step-card {
          background: var(--hq-bg); border-top: 4px solid var(--hq-border); padding: 40px 0;
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
            <div style={{ display: 'inline-flex', padding: '10px 20px', background: 'var(--hq-accent-glow)', borderRadius: 100, color: 'var(--hq-accent)', fontWeight: 700, fontSize: '14px', marginBottom: 24, gap: 8, alignItems: 'center' }}>
              <ShieldCheck size={16} /> 100% Client-Side Processing
            </div>
            <h2>{t.heroTitle} <br/><span style={{ color: 'var(--hq-accent)' }}>{typeName}</span></h2>
            <p>{t.heroSubtitle}</p>
            <div className="hq-feature-list">
              <div className="hq-feature-item">
                <div className="hq-feature-icon"><CheckCircle2 /></div>
                <span>{t.comp1Title}</span>
              </div>
              <div className="hq-feature-item">
                <div className="hq-feature-icon"><Zap /></div>
                <span>{t.comp2Title}</span>
              </div>
              <div className="hq-feature-item">
                <div className="hq-feature-icon"><Lock /></div>
                <span>{t.comp3Title}</span>
              </div>
            </div>
          </div>
          <div className="hq-split-right">
            <div className="hq-glow-orb">
              <div className="hq-glow-orb-inner" />
              <div className="hq-glow-orb-mid" />
              <div className="hq-glow-orb-core">
                <MainIcon size={80} color="#10b981" />
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

export default LayoutB;
