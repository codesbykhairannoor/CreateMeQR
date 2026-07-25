import React from 'react';
import { useTranslation } from 'react-i18next';
import { Smartphone, ShieldCheck, Zap, Lock, ChevronDown, Download, Star } from 'lucide-react';

function LayoutAppStore({ qrType = 'appstore' }) {
  const { t: translate } = useTranslation();
  const typeName = translate(`types.${qrType}`);
  const tObj = translate('landing', { returnObjects: true });
  const t = typeof tObj === 'object' && tObj !== null ? tObj : {};
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div className="hq-layout-appstore">
      <style>{`
        .hq-layout-appstore {
          --hq-bg: #f1f5f9;
          --hq-text: #0f172a;
          --hq-text-muted: #64748b;
          --hq-card: #ffffff;
          --hq-border: #e2e8f0;
          --hq-accent: #2563eb;
          --hq-accent-glow: rgba(37, 99, 235, 0.1);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 160px; /* REQUIRED MASSIVE SPACING */
        }
        html.dark .hq-layout-appstore {
          --hq-bg: #020617;
          --hq-text: #f8fafc;
          --hq-text-muted: #94a3b8;
          --hq-card: #0f172a;
          --hq-border: #1e293b;
          --hq-accent: #3b82f6;
          --hq-accent-glow: rgba(59, 130, 246, 0.15);
        }
        
        .hq-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        .hq-app-hero {
          background: var(--hq-card); border-radius: 40px; padding: 80px; margin-bottom: 80px;
          display: flex; gap: 80px; align-items: center; box-shadow: 0 20px 60px -15px rgba(0,0,0,0.05);
          position: relative; overflow: hidden;
        }
        html.dark .hq-app-hero { box-shadow: 0 20px 60px -15px rgba(0,0,0,0.3); }
        
        .hq-app-icon {
          width: 160px; height: 160px; background: linear-gradient(135deg, var(--hq-accent), #60a5fa);
          border-radius: 32px; display: flex; align-items: center; justify-content: center;
          color: white; box-shadow: 0 20px 40px var(--hq-accent-glow); flex-shrink: 0;
        }
        
        .hq-app-content { flex: 1; }
        .hq-app-content h2 { font-size: clamp(32px, 4vw, 56px); font-weight: 900; margin-bottom: 16px; letter-spacing: -0.03em; }
        .hq-app-subtitle { font-size: 20px; color: var(--hq-text-muted); margin-bottom: 24px; font-weight: 500; }
        
        .hq-app-stats { display: flex; gap: 40px; margin-bottom: 40px; padding-bottom: 40px; border-bottom: 1px solid var(--hq-border); }
        .hq-app-stat { display: flex; flex-direction: column; }
        .hq-app-stat-val { font-size: 24px; font-weight: 800; display: flex; align-items: center; gap: 4px; }
        .hq-app-stat-lbl { font-size: 13px; color: var(--hq-text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: 1px; }
        
        .hq-app-btn {
          display: inline-flex; align-items: center; gap: 12px; background: var(--hq-accent); color: white;
          padding: 16px 32px; border-radius: 100px; font-size: 18px; font-weight: 700;
          text-decoration: none; box-shadow: 0 10px 20px var(--hq-accent-glow);
        }
        
        .hq-app-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-bottom: 120px; }
        .hq-app-feature {
          background: var(--hq-card); padding: 40px; border-radius: 32px;
          display: flex; flex-direction: column; align-items: center; text-align: center;
        }
        .hq-app-f-icon { margin-bottom: 24px; color: var(--hq-accent); background: var(--hq-accent-glow); width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .hq-app-feature h3 { font-size: 20px; font-weight: 800; margin-bottom: 16px; }
        .hq-app-feature p { color: var(--hq-text-muted); line-height: 1.6; }
        
        @media (max-width: 992px) {
          .hq-app-hero { flex-direction: column; text-align: center; padding: 40px 24px; gap: 40px; }
          .hq-app-stats { justify-content: center; }
          .hq-app-features { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="hq-container">
        <div className="hq-app-hero">
          <div className="hq-app-icon">
            <Smartphone size={80} />
          </div>
          <div className="hq-app-content">
            <h2>{t.heroTitle}</h2>
            <div className="hq-app-subtitle">{t.heroSubtitle} ({typeName})</div>
            
            <div className="hq-app-stats">
              <div className="hq-app-stat">
                <div className="hq-app-stat-val">4.9 <Star size={20} fill="currentColor" color="#fbbf24" /></div>
                <div className="hq-app-stat-lbl">12.4K Ratings</div>
              </div>
              <div className="hq-app-stat">
                <div className="hq-app-stat-val">#1</div>
                <div className="hq-app-stat-lbl">Productivity</div>
              </div>
              <div className="hq-app-stat">
                <div className="hq-app-stat-val">Age 4+</div>
                <div className="hq-app-stat-lbl">Years Old</div>
              </div>
            </div>
            
            <div className="hq-app-btn">
              <Download size={24} /> Get QR Code
            </div>
          </div>
        </div>

        <div className="hq-app-features">
          <div className="hq-app-feature">
            <div className="hq-app-f-icon"><ShieldCheck size={32} /></div>
            <h3>{t.comp1Title}</h3>
            <p>{t.comp1Desc}</p>
          </div>
          <div className="hq-app-feature">
            <div className="hq-app-f-icon"><Zap size={32} /></div>
            <h3>{t.comp2Title}</h3>
            <p>{t.comp2Desc}</p>
          </div>
          <div className="hq-app-feature">
            <div className="hq-app-f-icon"><Lock size={32} /></div>
            <h3>{t.comp3Title}</h3>
            <p>{t.comp3Desc}</p>
          </div>
        </div>
      </div>
      
      <div style={{ padding: '100px 0', borderTop: '1px solid var(--hq-border)' }}>
        <div className="hq-container" style={{ maxWidth: 800 }}>
          <h2 style={{ fontSize: 36, fontWeight: 900, textAlign: 'center', marginBottom: 40 }}>{t.faqTitle}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { q: t.faq1Q, a: t.faq1A },
              { q: t.faq2Q, a: t.faq2A },
              { q: t.faq3Q, a: t.faq3A }
            ].map((faq, i) => (
              <div key={i} style={{ background: 'var(--hq-card)', borderRadius: 24, padding: '8px' }}>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)', borderRadius: 16 }}
                >
                  <span style={{ fontSize: 18, fontWeight: 700 }}>{faq.q}</span>
                  <div style={{ width: 32, height: 32, borderRadius: 16, background: 'var(--hq-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronDown size={20} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </div>
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0, transition: 'all 0.3s' }}>
                  <p style={{ padding: '0 32px 32px 32px', color: 'var(--hq-text-muted)', lineHeight: 1.6, fontSize: 16 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutAppStore;
