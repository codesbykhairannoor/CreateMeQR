import React from 'react';
import { useTranslation } from 'react-i18next';
import { Ghost, ShieldCheck, Zap, Lock, ChevronDown, Camera, Search, UserPlus } from 'lucide-react';

function LayoutSnapchat({ qrType = 'snapchat' }) {
  const { t: translate } = useTranslation();
  const typeName = translate(`types.${qrType}`);
  const tObj = translate('landing', { returnObjects: true });
  const t = typeof tObj === 'object' && tObj !== null ? tObj : {};
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div className="hq-layout-snapchat">
      <style>{`
        .hq-layout-snapchat {
          --hq-bg: #000000;
          --hq-text: #ffffff;
          --hq-text-muted: #888888;
          --hq-card: #111111;
          --hq-border: #222222;
          --hq-accent: #fffc00; /* snapchat yellow */
          --hq-accent-glow: rgba(255, 252, 0, 0.1);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
        }
        
        .hq-container { max-width: 1000px; margin: 0 auto; padding: 0 24px; }
        
        .hq-sc-hero { min-height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; position: relative; overflow: hidden; padding-top: 80px; }
        
        .hq-sc-ghost-bg { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0.03; z-index: 1; pointer-events: none; }
        .hq-sc-content { position: relative; z-index: 2; }
        
        .hq-sc-hero h1 { font-size: clamp(48px, 8vw, 80px); font-weight: 900; margin-bottom: 24px; letter-spacing: -0.05em; line-height: 1; color: var(--hq-accent); }
        .hq-sc-hero p { font-size: clamp(18px, 3vw, 24px); max-width: 600px; margin: 0 auto 40px auto; color: rgba(255,255,255,0.9); }
        
        .hq-sc-camera-btn { display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; border-radius: 50%; border: 4px solid var(--hq-accent); background: transparent; cursor: pointer; transition: transform 0.2s; }
        .hq-sc-camera-btn:hover { transform: scale(1.05); background: var(--hq-accent-glow); }
        .hq-sc-camera-btn-inner { width: 60px; height: 60px; border-radius: 50%; border: 2px solid var(--hq-accent); }
        
        .hq-sc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding: 80px 0; }
        .hq-sc-card { background: var(--hq-card); padding: 40px; border-radius: 24px; text-align: center; border: 1px solid var(--hq-border); transition: transform 0.3s, border-color 0.3s; }
        .hq-sc-card:hover { transform: translateY(-8px); border-color: var(--hq-accent); }
        .hq-sc-icon { width: 64px; height: 64px; background: #222; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto; color: var(--hq-accent); }
        .hq-sc-card h3 { font-size: 20px; font-weight: 800; margin-bottom: 16px; }
        
        .hq-sc-toolbar { position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%); background: rgba(30,30,30,0.8); backdrop-filter: blur(12px); padding: 12px 24px; border-radius: 40px; display: flex; gap: 40px; z-index: 100; border: 1px solid rgba(255,255,255,0.1); }
        .hq-sc-tool { color: white; display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 10px; font-weight: 700; opacity: 0.5; transition: opacity 0.2s; cursor: pointer; }
        .hq-sc-tool:hover, .hq-sc-tool.active { opacity: 1; }
        .hq-sc-tool.active { color: var(--hq-accent); }
        
        @media (max-width: 768px) {
          .hq-sc-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="hq-sc-hero">
        <div className="hq-sc-ghost-bg"><Ghost size={600} /></div>
        <div className="hq-sc-content hq-container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--hq-card)', padding: '8px 16px', borderRadius: 100, marginBottom: 24, fontSize: 14, fontWeight: 700, border: '1px solid var(--hq-border)' }}>
            <Ghost size={16} color="var(--hq-accent)" /> @createmyqr
          </div>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroSubtitle}</p>
          <div className="hq-sc-camera-btn">
            <div className="hq-sc-camera-btn-inner"></div>
          </div>
        </div>
      </div>

      <div className="hq-container hq-sc-grid">
        <div className="hq-sc-card">
          <div className="hq-sc-icon"><ShieldCheck size={32} /></div>
          <h3>{t.comp1Title}</h3>
          <p style={{ color: 'var(--hq-text-muted)', lineHeight: 1.6 }}>{t.comp1Desc}</p>
        </div>
        <div className="hq-sc-card">
          <div className="hq-sc-icon"><Zap size={32} /></div>
          <h3>{t.comp2Title}</h3>
          <p style={{ color: 'var(--hq-text-muted)', lineHeight: 1.6 }}>{t.comp2Desc}</p>
        </div>
        <div className="hq-sc-card">
          <div className="hq-sc-icon"><Lock size={32} /></div>
          <h3>{t.comp3Title}</h3>
          <p style={{ color: 'var(--hq-text-muted)', lineHeight: 1.6 }}>{t.comp3Desc}</p>
        </div>
      </div>
      
      <div style={{ background: '#111', padding: '100px 0', paddingBottom: 160 }}>
        <div className="hq-container" style={{ maxWidth: 800 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 40, color: 'white' }}>{t.faqTitle}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { q: t.faq1Q, a: t.faq1A }, { q: t.faq2Q, a: t.faq2A }, { q: t.faq3Q, a: t.faq3A }
            ].map((faq, i) => (
              <div key={i} style={{ background: 'var(--hq-bg)', borderRadius: 16, border: '1px solid var(--hq-border)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{faq.q}</span>
                  <ChevronDown size={20} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                  <p style={{ padding: '0 24px 24px 24px', color: 'var(--hq-text-muted)' }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hq-sc-toolbar">
        <div className="hq-sc-tool"><Search size={24} /></div>
        <div className="hq-sc-tool active"><Camera size={24} /></div>
        <div className="hq-sc-tool"><UserPlus size={24} /></div>
      </div>
    </div>
  );
}

export default LayoutSnapchat;
