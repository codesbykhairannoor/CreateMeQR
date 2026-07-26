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
          font-family: -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Display", "Helvetica Neue", sans-serif;
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
          <div className="hq-swiss-card" style={{ borderTop: '4px solid var(--hq-text)', borderRadius: 0, background: 'transparent' }}>
            <div style={{ fontSize: 48, fontWeight: 900, marginBottom: 24, opacity: 0.1 }}>01</div>
            <h3 style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 16 }}>{translate('featTools.phone.t1') || t.comp1Title}</h3>
            <p style={{ fontSize: 16, lineHeight: 1.6 }}>{translate('featTools.phone.d1') || t.comp1Desc}</p>
          </div>
          <div className="hq-swiss-card" style={{ borderTop: '4px solid var(--hq-text)', borderRadius: 0, background: 'transparent' }}>
            <div style={{ fontSize: 48, fontWeight: 900, marginBottom: 24, opacity: 0.1 }}>02</div>
            <h3 style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 16 }}>{translate('featTools.phone.t2') || t.comp2Title}</h3>
            <p style={{ fontSize: 16, lineHeight: 1.6 }}>{translate('featTools.phone.d2') || t.comp2Desc}</p>
          </div>
          <div className="hq-swiss-card" style={{ borderTop: '4px solid var(--hq-text)', borderRadius: 0, background: 'transparent' }}>
            <div style={{ fontSize: 48, fontWeight: 900, marginBottom: 24, opacity: 0.1 }}>03</div>
            <h3 style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 16 }}>{translate('featTools.phone.t3') || t.comp3Title}</h3>
            <p style={{ fontSize: 16, lineHeight: 1.6 }}>{translate('featTools.phone.d3') || t.comp3Desc}</p>
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
          <h2 style={{ paddingTop: 120, fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 900, marginBottom: 60, letterSpacing: '-0.04em' }}>
            {t.faqTitle}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = translate(`faqTools.phone.q${num}`);
              const a = translate(`faqTools.phone.a${num}`);
              if (!q || q === `faqTools.phone.q${num}`) return null;
              return (
              <div key={i} style={{ background: openFaq === i ? 'var(--hq-accent)' : 'var(--hq-card)', borderRadius: 24, overflow: 'hidden', transition: 'all 0.3s', boxShadow: '0 4px 12px var(--hq-shadow)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: openFaq === i ? '#fff' : 'var(--hq-text)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: openFaq === i ? 'rgba(255,255,255,0.2)' : 'var(--hq-accent-glow)', color: openFaq === i ? '#fff' : 'var(--hq-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18 }}>{num}</div>
                    <span style={{ fontSize: 18, fontWeight: 700 }}>{q}</span>
                  </div>
                  <ChevronDown size={20} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                  <p style={{ padding: '0 24px 24px 80px', color: openFaq === i ? 'rgba(255,255,255,0.9)' : 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{a}</p>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutPhone;
