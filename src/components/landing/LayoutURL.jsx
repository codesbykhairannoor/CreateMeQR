import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Zap, Lock, QrCode, Smartphone, ChevronDown, Globe, Sparkles } from 'lucide-react';

function LayoutURL({ qrType = 'url' }) {
  const { t: translate } = useTranslation();
  const typeName = translate(`types.${qrType}`);
  const tObj = translate('landing', { returnObjects: true });
  const t = typeof tObj === 'object' && tObj !== null ? tObj : {};
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="hq-layout-url">
      <style>{`
        .hq-layout-url {
          --hq-bg: #f8fafc;
          --hq-text: #0f172a;
          --hq-text-muted: #475569;
          --hq-card: #ffffff;
          --hq-border: #e2e8f0;
          /* LOCKED TO BASE PALETTE */
          --hq-accent: #2563eb;
          --hq-accent-glow: rgba(37, 99, 235, 0.1);
          font-family: -apple-system, BlinkMacSystemFont, "Inter", sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 160px; /* REQUIRED MASSIVE SPACING */
        }
        html.dark .hq-layout-url {
          --hq-bg: #040a18;
          --hq-text: #f1f5f9;
          --hq-text-muted: #94a3b8;
          --hq-card: #081226;
          --hq-border: #1e293b;
          --hq-accent: #3b82f6;
          --hq-accent-glow: rgba(59, 130, 246, 0.15);
        }
        .hq-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        .hq-bento {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 24px;
          margin-bottom: 80px;
        }
        .hq-card {
          background: var(--hq-card);
          border: 1px solid var(--hq-border);
          border-radius: 24px;
          padding: 32px;
          transition: transform 0.3s, border-color 0.3s;
          display: flex; flexDirection: column;
        }
        .hq-card:hover { border-color: var(--hq-accent); transform: translateY(-2px); }
        .hq-icon-box {
          width: 56px; height: 56px;
          border-radius: 16px;
          background: var(--hq-accent-glow);
          color: var(--hq-accent);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 24px;
        }
        .hq-card-title { font-size: 20px; font-weight: 700; margin-bottom: 12px; }
        .hq-card-desc { color: var(--hq-text-muted); line-height: 1.6; }
        
        @media (max-width: 992px) {
          .hq-bento > div { grid-column: span 12 !important; }
        }
      `}</style>

      <div className="hq-container">
        <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 80px auto' }}>
          <div style={{ display: 'inline-flex', padding: '8px 16px', background: 'var(--hq-accent-glow)', borderRadius: 100, color: 'var(--hq-accent)', fontWeight: 700, fontSize: '14px', marginBottom: 24, alignItems: 'center', gap: 8 }}>
            <Sparkles size={16} /> {t.badgeLeadMarket || 'The Engineering Standard'}
          </div>
          <h2 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 24 }}>
            {t.heroTitle} <span style={{ color: 'var(--hq-accent)' }}>{typeName}</span>
          </h2>
          <p style={{ fontSize: 20, color: 'var(--hq-text-muted)', lineHeight: 1.6 }}>{t.heroSubtitle}</p>
        </div>

        <div className="hq-bento">
          {/* Large Hero Card */}
          <div className="hq-card" style={{ gridColumn: 'span 8', minHeight: 320, background: 'linear-gradient(135deg, var(--hq-accent-glow), transparent)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '60%' }}>
              <div className="hq-icon-box"><ShieldCheck size={28} /></div>
              <h3 className="hq-card-title" style={{ fontSize: 28 }}>{t.comp1Title}</h3>
              <p className="hq-card-desc" style={{ fontSize: 18 }}>{t.comp1Desc}</p>
            </div>
            <div style={{ position: 'absolute', right: -40, bottom: -40, opacity: 0.1 }}>
              <QrCode size={300} />
            </div>
          </div>
          
          <div className="hq-card" style={{ gridColumn: 'span 4' }}>
            <div className="hq-icon-box"><Zap size={28} /></div>
            <h3 className="hq-card-title">{t.comp2Title}</h3>
            <p className="hq-card-desc">{t.comp2Desc}</p>
          </div>

          <div className="hq-card" style={{ gridColumn: 'span 4' }}>
            <div className="hq-icon-box"><Lock size={28} /></div>
            <h3 className="hq-card-title">{t.comp3Title}</h3>
            <p className="hq-card-desc">{t.comp3Desc}</p>
          </div>

          <div className="hq-card" style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 32 }}>
            <div style={{ flex: 1 }}>
              <h3 className="hq-card-title" style={{ fontSize: 28 }}>{t.stepsTitle} {typeName}</h3>
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { n: '1', t: t.step1Title, d: `${t.step1Desc} (${typeName})` },
                  { n: '2', t: t.step2Title, d: t.step2Desc },
                  { n: '3', t: t.step3Title, d: t.step3Desc }
                ].map(step => (
                  <div key={step.n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--hq-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                      {step.n}
                    </div>
                    <div>
                      <h4 style={{ fontWeight: 700, marginBottom: 4 }}>{step.t}</h4>
                      <p style={{ color: 'var(--hq-text-muted)', fontSize: 14 }}>{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
               <Smartphone size={200} color="var(--hq-border)" />
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--hq-card)', borderTop: '1px solid var(--hq-border)', padding: '100px 0' }}>
        <div className="hq-container" style={{ maxWidth: 800 }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'inline-flex', padding: '8px 16px', background: 'var(--hq-accent-glow)', borderRadius: 100, color: 'var(--hq-accent)', fontWeight: 700, fontSize: '14px', marginBottom: 24, alignItems: 'center', gap: 8 }}>
              <Globe size={16} /> {t.badgeFaq || 'Knowledge Base'}
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900 }}>{t.faqTitle} {typeName}</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { q: t.faq1Q, a: t.faq1A },
              { q: t.faq2Q, a: t.faq2A },
              { q: t.faq3Q, a: t.faq3A },
              { q: t.faq4Q, a: t.faq4A }
            ].map((faq, i) => (
              <div key={i} style={{ border: '1px solid var(--hq-border)', borderRadius: 16, overflow: 'hidden' }}>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--hq-text)' }}>{faq.q}</span>
                  <span style={{ color: 'var(--hq-accent)' }}><ChevronDown open={openFaq === i} /></span>
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0, transition: 'all 0.3s' }}>
                  <div style={{ padding: '0 24px 24px 24px', color: 'var(--hq-text-muted)', lineHeight: 1.7 }}>
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

export default LayoutURL;
