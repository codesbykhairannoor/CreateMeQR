import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, ShieldCheck, Zap, Lock, ChevronDown, CheckCircle2 } from 'lucide-react';

function LayoutLocation({ qrType = 'location' }) {
  const { t: translate } = useTranslation();
  const typeName = translate(`types.${qrType}`);
  const tObj = translate('landing', { returnObjects: true });
  const t = typeof tObj === 'object' && tObj !== null ? tObj : {};
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="hq-layout-loc">
      <style>{`
        .hq-layout-loc {
          --hq-bg: #f8fafc;
          --hq-text: #0a1930;
          --hq-text-muted: #475569;
          --hq-card: #ffffff;
          --hq-border: #e2e8f0;
          --hq-accent: #2563eb;
          --hq-accent-glow: rgba(37, 99, 235, 0.1);
          font-family: -apple-system, BlinkMacSystemFont, "Inter", sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 160px; /* REQUIRED MASSIVE SPACING */
          position: relative;
        }
        html.dark .hq-layout-loc {
          --hq-bg: #040a18;
          --hq-text: #f1f5f9;
          --hq-text-muted: #94a3b8;
          --hq-card: #081226;
          --hq-border: #1e293b;
          --hq-accent: #3b82f6;
          --hq-accent-glow: rgba(59, 130, 246, 0.15);
        }
        
        .hq-radar-bg {
          position: absolute; top: 0; left: 0; right: 0; height: 600px;
          background-image: 
            radial-gradient(circle at 50% 50%, var(--hq-accent-glow) 0%, transparent 60%),
            linear-gradient(var(--hq-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--hq-border) 1px, transparent 1px);
          background-size: 100% 100%, 50px 50px, 50px 50px;
          background-position: center;
          opacity: 0.5; z-index: 0;
          mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
        }
        
        .hq-container { max-width: 1000px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2; }
        
        .hq-radar-hero { text-align: center; margin-bottom: 120px; }
        .hq-radar-icon {
          position: relative; width: 120px; height: 120px; margin: 0 auto 40px auto;
        }
        .hq-radar-circle {
          position: absolute; inset: 0; border-radius: 50%;
          border: 2px solid var(--hq-accent); opacity: 0;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .hq-radar-circle:nth-child(2) { animation-delay: 0.5s; }
        .hq-radar-circle:nth-child(3) { animation-delay: 1s; }
        .hq-radar-pin {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
          color: var(--hq-accent);
        }
        @keyframes pulse { 0% { transform: scale(0.5); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
        
        .hq-radar-hero h2 { font-size: clamp(40px, 6vw, 64px); font-weight: 900; margin-bottom: 24px; letter-spacing: -0.04em; }
        .hq-radar-hero p { font-size: 20px; color: var(--hq-text-muted); max-width: 600px; margin: 0 auto; line-height: 1.6; }
        
        .hq-map-cards {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 120px;
        }
        .hq-map-card {
          background: var(--hq-bg); border: 2px solid var(--hq-border);
          border-radius: 24px; padding: 32px;
          display: flex; flex-direction: column; align-items: center; text-align: center;
        }
        .hq-map-card h3 { font-size: 20px; font-weight: 700; margin: 20px 0 12px 0; }
        .hq-map-card p { color: var(--hq-text-muted); line-height: 1.6; }
        
        .hq-step-list { max-width: 700px; margin: 0 auto 120px auto; }
        .hq-step-loc {
          display: flex; gap: 24px; padding-bottom: 40px; border-left: 2px dashed var(--hq-border);
          padding-left: 40px; position: relative; margin-left: 24px;
        }
        .hq-step-loc::before {
          content: ''; position: absolute; left: -13px; top: 0;
          width: 24px; height: 24px; border-radius: 50%; background: var(--hq-accent);
          border: 4px solid var(--hq-bg);
        }
        .hq-step-loc h4 { font-size: 24px; font-weight: 800; margin-bottom: 8px; margin-top: -4px; }
        .hq-step-loc p { color: var(--hq-text-muted); font-size: 18px; line-height: 1.6; }
        
        @media (max-width: 768px) {
          .hq-map-cards { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="hq-radar-bg" />

      <div className="hq-container">
        <div className="hq-radar-hero">
          <div className="hq-radar-icon">
            <div className="hq-radar-circle" />
            <div className="hq-radar-circle" />
            <div className="hq-radar-circle" />
            <div className="hq-radar-pin"><MapPin size={48} /></div>
          </div>
          <h2>{t.heroTitle} <br/>{typeName}</h2>
          <p>{t.heroSubtitle}</p>
        </div>

        <div className="hq-map-cards">
          <div className="hq-map-card">
            <div style={{ color: 'var(--hq-accent)' }}><ShieldCheck size={32} /></div>
            <h3>{t.comp1Title}</h3>
            <p>{t.comp1Desc}</p>
          </div>
          <div className="hq-map-card">
            <div style={{ color: 'var(--hq-accent)' }}><Zap size={32} /></div>
            <h3>{t.comp2Title}</h3>
            <p>{t.comp2Desc}</p>
          </div>
          <div className="hq-map-card">
            <div style={{ color: 'var(--hq-accent)' }}><Lock size={32} /></div>
            <h3>{t.comp3Title}</h3>
            <p>{t.comp3Desc}</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900 }}>{t.stepsTitle} {typeName}</h2>
        </div>

        <div className="hq-step-list">
          {[
            { n: '1', t: t.step1Title, d: `${t.step1Desc} (${typeName})` },
            { n: '2', t: t.step2Title, d: t.step2Desc },
            { n: '3', t: t.step3Title, d: t.step3Desc }
          ].map((step, idx, arr) => (
            <div key={step.n} className="hq-step-loc" style={{ borderLeftColor: idx === arr.length - 1 ? 'transparent' : 'var(--hq-border)' }}>
              <div>
                <h4>{step.t}</h4>
                <p>{step.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'var(--hq-card)', borderTop: '1px solid var(--hq-border)', padding: '100px 0' }}>
        <div className="hq-container" style={{ maxWidth: 800 }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, textAlign: 'center', marginBottom: 60 }}>
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

export default LayoutLocation;
