import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bitcoin, ShieldCheck, Zap, Lock, ChevronDown, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

function LayoutCrypto({ qrType = 'crypto' }) {
  const { t: translate } = useTranslation();
  const typeName = translate(`types.${qrType}`);
  const tObj = translate('landing', { returnObjects: true });
  const t = typeof tObj === 'object' && tObj !== null ? tObj : {};
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div className="hq-layout-crypto">
      <style>{`
        .hq-layout-crypto {
          --hq-bg: #0a0e17;
          --hq-text: #f8fafc;
          --hq-text-muted: #94a3b8;
          --hq-card: #111827;
          --hq-border: #1e293b;
          --hq-accent: #3b82f6;
          --hq-accent-glow: rgba(59, 130, 246, 0.15);
          --cryp-green: #10b981;
          --cryp-red: #ef4444;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 160px; /* REQUIRED MASSIVE SPACING */
        }
        
        .hq-container { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
        
        .hq-cryp-hero { margin-bottom: 80px; text-align: center; }
        .hq-cryp-hero h2 { font-size: clamp(32px, 4vw, 56px); font-weight: 800; margin-bottom: 24px; letter-spacing: -0.05em; font-family: -apple-system, sans-serif; }
        .hq-cryp-hero p { font-size: 18px; color: var(--hq-text-muted); max-width: 600px; margin: 0 auto; line-height: 1.6; font-family: -apple-system, sans-serif; }
        
        .hq-cryp-dashboard {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 120px;
        }
        
        .hq-cryp-ticker {
          background: var(--hq-card); border: 1px solid var(--hq-border); border-radius: 12px; padding: 24px;
          display: flex; flex-direction: column; gap: 8px; position: relative; overflow: hidden;
        }
        .hq-cryp-ticker::before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: var(--hq-accent); }
        .hq-cryp-ticker.positive::before { background: var(--cryp-green); }
        .hq-cryp-ticker.negative::before { background: var(--cryp-red); }
        
        .hq-cryp-pair { font-size: 14px; font-weight: 700; color: var(--hq-text-muted); }
        .hq-cryp-price { font-size: 24px; font-weight: 800; }
        .hq-cryp-change { font-size: 12px; display: flex; align-items: center; gap: 4px; }
        .positive .hq-cryp-change { color: var(--cryp-green); }
        .negative .hq-cryp-change { color: var(--cryp-red); }
        
        .hq-cryp-chart {
          margin-top: 16px; height: 40px; border-bottom: 1px solid rgba(255,255,255,0.05); position: relative;
        }
        .hq-cryp-chart svg { width: 100%; height: 100%; overflow: visible; stroke: var(--hq-accent); fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
        .positive .hq-cryp-chart svg { stroke: var(--cryp-green); }
        .negative .hq-cryp-chart svg { stroke: var(--cryp-red); }
        
        .hq-cryp-features {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--hq-border); border: 1px solid var(--hq-border); border-radius: 16px; overflow: hidden; margin-bottom: 120px;
        }
        .hq-cryp-feature {
          background: var(--hq-card); padding: 40px; font-family: -apple-system, sans-serif;
        }
        .hq-cryp-icon { width: 48px; height: 48px; border: 1px solid var(--hq-border); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; color: var(--hq-accent); }
        .hq-cryp-feature h3 { font-size: 20px; font-weight: 700; margin-bottom: 12px; }
        .hq-cryp-feature p { color: var(--hq-text-muted); line-height: 1.6; }
        
        @media (max-width: 1200px) {
          .hq-cryp-dashboard { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .hq-cryp-dashboard { grid-template-columns: 1fr; }
          .hq-cryp-features { grid-template-columns: 1fr; gap: 16px; background: transparent; border: none; }
          .hq-cryp-feature { border: 1px solid var(--hq-border); border-radius: 16px; }
        }
      `}</style>

      <div className="hq-container">
        <div className="hq-cryp-hero">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '8px 16px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 100, marginBottom: 24, fontSize: 14, color: 'var(--hq-accent)' }}>
            <Activity size={16} /> Secure Payment Gateway
          </div>
          <h2>{t.heroTitle} <br/>for {typeName}</h2>
          <p>{t.heroSubtitle}</p>
        </div>

        <div className="hq-cryp-dashboard">
          <div className="hq-cryp-ticker positive">
            <div className="hq-cryp-pair">BTC/USD</div>
            <div className="hq-cryp-price">$94,230.50</div>
            <div className="hq-cryp-change"><ArrowUpRight size={14} /> +2.4%</div>
            <div className="hq-cryp-chart">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,20 L10,15 L20,18 L30,5 L40,8 L50,12 L60,2 L70,4 L80,10 L90,2 L100,0" />
              </svg>
            </div>
          </div>
          <div className="hq-cryp-ticker negative">
            <div className="hq-cryp-pair">ETH/USD</div>
            <div className="hq-cryp-price">$3,420.10</div>
            <div className="hq-cryp-change"><ArrowDownRight size={14} /> -1.2%</div>
            <div className="hq-cryp-chart">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,0 L10,5 L20,2 L30,12 L40,8 L50,15 L60,10 L70,18 L80,14 L90,19 L100,20" />
              </svg>
            </div>
          </div>
          <div className="hq-cryp-ticker positive">
            <div className="hq-cryp-pair">SOL/USD</div>
            <div className="hq-cryp-price">$142.80</div>
            <div className="hq-cryp-change"><ArrowUpRight size={14} /> +5.8%</div>
            <div className="hq-cryp-chart">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,20 L20,15 L40,18 L60,8 L80,12 L100,0" />
              </svg>
            </div>
          </div>
          <div className="hq-cryp-ticker">
            <div className="hq-cryp-pair">QR/CODE</div>
            <div className="hq-cryp-price">12ms</div>
            <div className="hq-cryp-change" style={{ color: 'var(--hq-accent)' }}><Zap size={14} /> Instant</div>
            <div className="hq-cryp-chart">
              <svg viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,10 L20,10 L40,10 L60,10 L80,10 L100,10" />
              </svg>
            </div>
          </div>
        </div>

        <div className="hq-cryp-features">
          <div className="hq-cryp-feature">
            <div className="hq-cryp-icon"><ShieldCheck /></div>
            <h3>{t.comp1Title}</h3>
            <p>{t.comp1Desc}</p>
          </div>
          <div className="hq-cryp-feature">
            <div className="hq-cryp-icon"><Zap /></div>
            <h3>{t.comp2Title}</h3>
            <p>{t.comp2Desc}</p>
          </div>
          <div className="hq-cryp-feature">
            <div className="hq-cryp-icon"><Lock /></div>
            <h3>{t.comp3Title}</h3>
            <p>{t.comp3Desc}</p>
          </div>
        </div>
      </div>
      
      <div style={{ borderTop: '1px solid var(--hq-border)', padding: '100px 0' }}>
        <div className="hq-container" style={{ maxWidth: 800, fontFamily: '-apple-system, sans-serif' }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, textAlign: 'center', marginBottom: 40 }}>{t.faqTitle}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { q: t.faq1Q, a: t.faq1A },
              { q: t.faq2Q, a: t.faq2A },
              { q: t.faq3Q, a: t.faq3A }
            ].map((faq, i) => (
              <div key={i} style={{ border: '1px solid var(--hq-border)', borderRadius: 8, background: 'var(--hq-card)' }}>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}
                >
                  <span style={{ fontSize: 16, fontWeight: 600 }}>{faq.q}</span>
                  <ChevronDown size={20} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0, transition: 'all 0.3s' }}>
                  <p style={{ padding: '0 24px 24px 24px', color: 'var(--hq-text-muted)', lineHeight: 1.6 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutCrypto;
