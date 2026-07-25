import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Mail, MessageSquare, Calendar, ShieldCheck, Zap, Lock } from 'lucide-react';

function LayoutD({ qrType = 'email' }) {
  const { t: translate } = useTranslation();
  const typeName = translate(`types.${qrType}`);
  const tObj = translate('landing', { returnObjects: true });
  const t = typeof tObj === 'object' && tObj !== null ? tObj : {};
  const [openFaq, setOpenFaq] = useState(null);

  // Determine main icon based on tool
  const MainIcon = qrType === 'email' ? Mail : qrType === 'sms' ? MessageSquare : Calendar;

  return (
    <div className="hq-layout-d">
      <style>{`
        .hq-layout-d {
          --hq-bg: #ffffff;
          --hq-text: #0a1930;
          --hq-text-muted: #64748b;
          --hq-card: #f8fafc;
          --hq-border: #e2e8f0;
          --hq-accent: #0f172a;
          --hq-accent-glow: rgba(15, 23, 42, 0.05);
          font-family: -apple-system, BlinkMacSystemFont, "Inter", sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 100px;
        }
        html.dark .hq-layout-d {
          --hq-bg: #020617;
          --hq-text: #f8fafc;
          --hq-text-muted: #94a3b8;
          --hq-card: #0f172a;
          --hq-border: #1e293b;
          --hq-accent: #ffffff;
          --hq-accent-glow: rgba(255, 255, 255, 0.1);
        }
        
        .hq-container { max-width: 900px; margin: 0 auto; padding: 0 24px; }
        
        .hq-minimal-hero {
          text-align: center;
          margin-bottom: 120px;
        }
        .hq-minimal-icon {
          width: 80px; height: 80px; margin: 0 auto 32px auto;
          display: flex; align-items: center; justify-content: center;
          background: var(--hq-accent-glow); color: var(--hq-accent);
          border-radius: 24px;
        }
        .hq-minimal-hero h2 {
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 1.1;
          margin-bottom: 32px;
          color: var(--hq-accent);
        }
        .hq-minimal-hero p {
          font-size: 24px;
          color: var(--hq-text-muted);
          line-height: 1.5;
          font-weight: 300;
          max-width: 700px;
          margin: 0 auto;
        }

        .hq-clean-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          margin-bottom: 120px;
          border-top: 1px solid var(--hq-border);
          border-bottom: 1px solid var(--hq-border);
          padding: 60px 0;
        }
        .hq-clean-card { text-align: center; }
        .hq-clean-icon {
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px auto;
          color: var(--hq-accent);
        }
        .hq-clean-card h3 { font-size: 20px; font-weight: 700; margin-bottom: 16px; color: var(--hq-accent); }
        .hq-clean-card p { font-size: 16px; color: var(--hq-text-muted); line-height: 1.6; }

        .hq-huge-step {
          margin-bottom: 80px;
          display: flex;
          gap: 40px;
          align-items: center;
        }
        .hq-huge-num {
          font-size: 120px;
          font-weight: 900;
          color: var(--hq-accent-glow);
          line-height: 0.8;
          letter-spacing: -0.08em;
        }
        .hq-huge-content h4 { font-size: 28px; font-weight: 800; margin-bottom: 16px; color: var(--hq-accent); }
        .hq-huge-content p { font-size: 18px; color: var(--hq-text-muted); line-height: 1.6; }

        @media (max-width: 768px) {
          .hq-clean-grid { grid-template-columns: 1fr; gap: 60px; }
          .hq-huge-step { flex-direction: column; text-align: center; gap: 24px; }
          .hq-huge-num { font-size: 80px; }
        }
      `}</style>

      <div className="hq-container">
        <div className="hq-minimal-hero">
          <div className="hq-minimal-icon"><MainIcon size={40} /></div>
          <h2>{t.heroTitle} <br/>{typeName}</h2>
          <p>{t.heroSubtitle}</p>
        </div>

        <div className="hq-clean-grid">
          <div className="hq-clean-card">
            <div className="hq-clean-icon"><ShieldCheck size={32} /></div>
            <h3>{t.comp1Title}</h3>
            <p>{t.comp1Desc}</p>
          </div>
          <div className="hq-clean-card">
            <div className="hq-clean-icon"><Zap size={32} /></div>
            <h3>{t.comp2Title}</h3>
            <p>{t.comp2Desc}</p>
          </div>
          <div className="hq-clean-card">
            <div className="hq-clean-icon"><Lock size={32} /></div>
            <h3>{t.comp3Title}</h3>
            <p>{t.comp3Desc}</p>
          </div>
        </div>

        <div style={{ marginBottom: 60, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-0.04em', color: 'var(--hq-accent)' }}>
            {t.stepsTitle} {typeName}
          </h2>
        </div>

        <div style={{ marginBottom: 120 }}>
          {[
            { n: '1', t: t.step1Title, d: `${t.step1Desc} (${typeName})` },
            { n: '2', t: t.step2Title, d: t.step2Desc },
            { n: '3', t: t.step3Title, d: t.step3Desc }
          ].map(step => (
            <div key={step.n} className="hq-huge-step">
              <div className="hq-huge-num">{step.n}</div>
              <div className="hq-huge-content">
                <h4>{step.t}</h4>
                <p>{step.d}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ - Minimal Accordion */}
        <div style={{ paddingBottom: 120 }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, textAlign: 'center', margin: '0 auto 60px auto', letterSpacing: '-0.04em', color: 'var(--hq-accent)' }}>
            {t.faqTitle} {typeName}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { q: t.faq1Q, a: t.faq1A },
              { q: t.faq2Q, a: t.faq2A },
              { q: t.faq3Q, a: t.faq3A },
              { q: t.faq4Q, a: t.faq4A }
            ].map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid var(--hq-border)' }}>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', padding: '32px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--hq-accent)' }}>{faq.q}</span>
                  <span style={{ color: 'var(--hq-text-muted)' }}><ChevronDown open={openFaq === i} /></span>
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0, transition: 'all 0.3s' }}>
                  <div style={{ paddingBottom: 32, color: 'var(--hq-text-muted)', lineHeight: 1.8, fontSize: 18 }}>
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

export default LayoutD;
