import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, ShieldCheck, Zap, Lock, ChevronDown, ArrowRight } from 'lucide-react';

function LayoutPhone({ qrType = 'phone' }) {
  const { t: translate } = useTranslation();
  const typeName = translate(`types.${qrType}`);
  const tObj = translate('landing', { returnObjects: true });
  const t = typeof tObj === 'object' && tObj !== null ? tObj : {};
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="hq-layout-phone">
      <style>{`
        .hq-layout-phone {
          --hq-bg: #f8fafc;
          --hq-text: #0a1930;
          --hq-text-muted: #475569;
          --hq-card: #ffffff;
          --hq-border: #e2e8f0;
          --hq-accent: #2563eb;
          --hq-accent-glow: rgba(37, 99, 235, 0.1);
          font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial, sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 160px; /* REQUIRED MASSIVE SPACING */
        }
        html.dark .hq-layout-phone {
          --hq-bg: #040a18;
          --hq-text: #f1f5f9;
          --hq-text-muted: #94a3b8;
          --hq-card: #081226;
          --hq-border: #1e293b;
          --hq-accent: #3b82f6;
          --hq-accent-glow: rgba(59, 130, 246, 0.15);
        }
        
        .hq-container { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
        
        .hq-swiss-hero { margin-bottom: 120px; border-bottom: 2px solid var(--hq-text); padding-bottom: 40px; }
        .hq-swiss-hero h2 {
          font-size: clamp(60px, 10vw, 140px);
          font-weight: 900;
          letter-spacing: -0.06em;
          line-height: 0.9;
          text-transform: uppercase;
          margin-bottom: 40px;
        }
        .hq-swiss-hero p {
          font-size: clamp(20px, 3vw, 32px); font-weight: 500; color: var(--hq-text-muted); max-width: 800px;
        }
        
        .hq-swiss-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 80px; margin-bottom: 120px;
        }
        .hq-swiss-card { border-top: 4px solid var(--hq-accent); padding-top: 24px; }
        .hq-swiss-card h3 { font-size: 32px; font-weight: 800; margin-bottom: 16px; letter-spacing: -0.04em; }
        .hq-swiss-card p { font-size: 18px; color: var(--hq-text-muted); line-height: 1.6; }
        
        .hq-swiss-steps { margin-bottom: 120px; }
        .hq-swiss-step {
          display: flex; align-items: center; justify-content: space-between;
          padding: 40px 0; border-bottom: 1px solid var(--hq-border);
        }
        .hq-swiss-step:first-child { border-top: 1px solid var(--hq-border); }
        .hq-swiss-step-num { font-size: 24px; font-weight: 700; color: var(--hq-accent); flex: 0 0 100px; }
        .hq-swiss-step-title { font-size: clamp(24px, 4vw, 40px); font-weight: 800; letter-spacing: -0.04em; flex: 1; }
        .hq-swiss-step-desc { flex: 1; font-size: 18px; color: var(--hq-text-muted); text-align: right; }
        
        @media (max-width: 992px) {
          .hq-swiss-grid { grid-template-columns: 1fr; gap: 40px; }
          .hq-swiss-step { flex-direction: column; align-items: flex-start; gap: 16px; }
          .hq-swiss-step-desc { text-align: left; }
        }
      `}</style>

      <div className="hq-container">
        <div className="hq-swiss-hero">
          <h2>{typeName} <br/>{t.heroTitle}</h2>
          <p>{t.heroSubtitle}</p>
        </div>

        <div className="hq-swiss-grid">
          <div className="hq-swiss-card">
            <ShieldCheck size={40} color="var(--hq-accent)" style={{ marginBottom: 20 }} />
            <h3>{t.comp1Title}</h3>
            <p>{t.comp1Desc}</p>
          </div>
          <div className="hq-swiss-card">
            <Zap size={40} color="var(--hq-accent)" style={{ marginBottom: 20 }} />
            <h3>{t.comp2Title}</h3>
            <p>{t.comp2Desc}</p>
          </div>
          <div className="hq-swiss-card">
            <Lock size={40} color="var(--hq-accent)" style={{ marginBottom: 20 }} />
            <h3>{t.comp3Title}</h3>
            <p>{t.comp3Desc}</p>
          </div>
        </div>

        <div className="hq-swiss-steps">
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 40 }}>
            <h2 style={{ fontSize: 40, fontWeight: 900 }}>{t.stepsTitle}</h2>
            <ArrowRight size={40} />
          </div>
          {[
            { n: '01', t: t.step1Title, d: `${t.step1Desc} (${typeName})` },
            { n: '02', t: t.step2Title, d: t.step2Desc },
            { n: '03', t: t.step3Title, d: t.step3Desc }
          ].map(step => (
            <div key={step.n} className="hq-swiss-step">
              <div className="hq-swiss-step-num">{step.n}</div>
              <div className="hq-swiss-step-title">{step.t}</div>
              <div className="hq-swiss-step-desc">{step.d}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'var(--hq-text)', color: 'var(--hq-bg)', padding: '100px 0' }}>
        <div className="hq-container" style={{ maxWidth: 1000 }}>
          <h2 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 900, marginBottom: 60, letterSpacing: '-0.04em' }}>
            {t.faqTitle}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { q: t.faq1Q, a: t.faq1A },
              { q: t.faq2Q, a: t.faq2A },
              { q: t.faq3Q, a: t.faq3A },
              { q: t.faq4Q, a: t.faq4A }
            ].map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', padding: '32px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'inherit' }}
                >
                  <span style={{ fontSize: 24, fontWeight: 700 }}>{faq.q}</span>
                  <span style={{ opacity: 0.5 }}><ChevronDown open={openFaq === i} /></span>
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0, transition: 'all 0.3s' }}>
                  <div style={{ paddingBottom: 32, fontSize: 18, lineHeight: 1.6, opacity: 0.8 }}>
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

export default LayoutPhone;
