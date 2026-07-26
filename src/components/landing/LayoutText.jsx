import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Terminal, ShieldCheck, Zap, Lock, ChevronDown, CheckCircle2 } from 'lucide-react';

function LayoutText({ qrType = 'text' }) {
  const { t: translate } = useTranslation();
  const typeName = translate(`types.${qrType}`);
  const tObj = translate('landing', { returnObjects: true });
  const t = typeof tObj === 'object' && tObj !== null ? tObj : {};
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="hq-layout-text">
      <style>{`
        .hq-layout-text {
          --hq-bg: #f8fafc;
          --hq-text: #0a1930;
          --hq-text-muted: #475569;
          --hq-card: #ffffff;
          --hq-border: #e2e8f0;
          --hq-accent: #2563eb;
          --hq-accent-glow: rgba(37, 99, 235, 0.1);
          font-family: -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Display", "Helvetica Neue", sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 160px; /* REQUIRED MASSIVE SPACING */
          background-image: linear-gradient(var(--hq-border) 1px, transparent 1px), linear-gradient(90deg, var(--hq-border) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center top;
        }
        html.dark .hq-layout-text {
          --hq-bg: #020617;
          --hq-text: #f1f5f9;
          --hq-text-muted: #94a3b8;
          --hq-card: #0f172a;
          --hq-border: #1e293b;
          --hq-accent: #3b82f6;
          --hq-accent-glow: rgba(59, 130, 246, 0.15);
        }
        .hq-container { max-width: 1000px; margin: 0 auto; padding: 0 24px; }
        
        .hq-terminal-hero {
          background: var(--hq-card);
          border: 1px solid var(--hq-border);
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 80px;
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
        }
        html.dark .hq-terminal-hero { box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5); }
        .hq-terminal-header {
          background: var(--hq-bg);
          border-bottom: 1px solid var(--hq-border);
          padding: 12px 20px;
          display: flex; align-items: center; gap: 8px;
        }
        .hq-dot { width: 12px; height: 12px; border-radius: 50%; }
        
        .hq-terminal-body { padding: 60px 40px; }
        .hq-terminal-body h2 {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin-bottom: 24px;
        }
        .hq-terminal-body p {
          font-size: 18px; color: var(--hq-text-muted); line-height: 1.6;
        }
        
        .hq-feature-row {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 80px;
        }
        .hq-f-card {
          background: var(--hq-card); border: 1px dashed var(--hq-border);
          padding: 32px; border-radius: 8px;
        }
        .hq-f-card h3 { font-size: 16px; margin-bottom: 12px; color: var(--hq-accent); display: flex; align-items: center; gap: 8px; }
        .hq-f-card p { font-size: 14px; color: var(--hq-text-muted); line-height: 1.6; }
        
        .hq-code-block {
          background: var(--hq-card); border: 1px solid var(--hq-border); padding: 40px; border-radius: 8px; margin-bottom: 100px;
        }
        .hq-code-line { display: flex; gap: 24px; margin-bottom: 32px; }
        .hq-code-num { color: var(--hq-accent); font-weight: 700; }
        
        @media (max-width: 768px) {
          .hq-feature-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="hq-container">
        <div className="hq-terminal-hero">
          <div className="hq-terminal-header">
            <div className="hq-dot" style={{ background: '#ff5f56' }} />
            <div className="hq-dot" style={{ background: '#ffbd2e' }} />
            <div className="hq-dot" style={{ background: '#27c93f' }} />
            <div style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--hq-text-muted)' }}>bash - {typeName}</div>
          </div>
          <div className="hq-terminal-body">
            <div style={{ color: 'var(--hq-accent)', marginBottom: 16 }}><Terminal size={40} /></div>
            <h2><span style={{ color: 'var(--hq-accent)' }}>&gt;</span> {t.heroTitle} <br/> {typeName}</h2>
            <p>{t.heroSubtitle}</p>
          </div>
        </div>

        <div className="hq-feature-row">
          <div className="hq-f-card" style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: 8, padding: 32 }}>
            <h3 style={{ color: '#58a6ff', fontFamily: 'monospace' }}><ShieldCheck size={20} style={{ verticalAlign: 'middle', marginRight: 8 }}/> {translate('featTools.text.t1') || t.comp1Title}</h3>
            <p style={{ color: '#8b949e', marginTop: 16 }}>{translate('featTools.text.d1') || t.comp1Desc}</p>
          </div>
          <div className="hq-f-card" style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: 8, padding: 32 }}>
            <h3 style={{ color: '#58a6ff', fontFamily: 'monospace' }}><Zap size={20} style={{ verticalAlign: 'middle', marginRight: 8 }}/> {translate('featTools.text.t2') || t.comp2Title}</h3>
            <p style={{ color: '#8b949e', marginTop: 16 }}>{translate('featTools.text.d2') || t.comp2Desc}</p>
          </div>
          <div className="hq-f-card" style={{ background: '#0d1117', border: '1px solid #30363d', borderRadius: 8, padding: 32 }}>
            <h3 style={{ color: '#58a6ff', fontFamily: 'monospace' }}><Lock size={20} style={{ verticalAlign: 'middle', marginRight: 8 }}/> {translate('featTools.text.t3') || t.comp3Title}</h3>
            <p style={{ color: '#8b949e', marginTop: 16 }}>{translate('featTools.text.d3') || t.comp3Desc}</p>
          </div>
        </div>

        <div className="hq-code-block">
          <h2 style={{ fontSize: 24, marginBottom: 40, borderBottom: '1px dashed var(--hq-border)', paddingBottom: 20 }}>
            <span style={{ color: 'var(--hq-accent)' }}>$</span> {t.stepsTitle} {typeName}
          </h2>
          {[
            { n: '01', t: t.step1Title, d: `${t.step1Desc} (${typeName})` },
            { n: '02', t: t.step2Title, d: t.step2Desc },
            { n: '03', t: t.step3Title, d: t.step3Desc }
          ].map(step => (
            <div key={step.n} className="hq-code-line">
              <div className="hq-code-num">{step.n}</div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>{step.t}</div>
                <div style={{ color: 'var(--hq-text-muted)' }}>{step.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'var(--hq-card)', borderTop: '1px solid var(--hq-border)', padding: '100px 0' }}>
        <div className="hq-container" style={{ maxWidth: 800 }}>
          <h2 style={{ paddingTop: 120, fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, textAlign: 'center', marginBottom: 60 }}>
            {t.faqTitle} {typeName}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = translate(`faqTools.text.q${num}`);
              const a = translate(`faqTools.text.a${num}`);
              if (!q || q === `faqTools.text.q${num}`) return null;
              return (
              <div key={i} style={{ border: '1px dashed', borderColor: openFaq === i ? 'var(--hq-accent)' : 'var(--hq-border)', borderRadius: 8, overflow: 'hidden', background: openFaq === i ? 'rgba(0,0,0,0.02)' : 'transparent', transition: 'all 0.3s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ color: 'var(--hq-accent)', fontWeight: 700 }}>&gt;</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--hq-text)' }}>{q}</span>
                  </div>
                  <ChevronDown size={20} style={{ color: openFaq === i ? 'var(--hq-accent)' : 'var(--hq-text-muted)', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                  <div style={{ padding: '0 24px 24px 44px', color: 'var(--hq-text-muted)', lineHeight: 1.7, fontSize: 14 }}>
                    <span style={{ opacity: 0.5 }}># </span>{a}
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutText;
