import React from 'react';
import { useTranslation } from 'react-i18next';
import { Video, ShieldCheck, Zap, Lock, ChevronDown, Play, Maximize, Volume2 } from 'lucide-react';

function LayoutYouTube({ qrType = 'youtube' }) {
  const { t: translate } = useTranslation();
  const typeName = translate(`types.${qrType}`);
  const tObj = translate('landing', { returnObjects: true });
  const t = typeof tObj === 'object' && tObj !== null ? tObj : {};
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div className="hq-layout-youtube">
      <style>{`
        .hq-layout-youtube {
          --hq-bg: #f8fafc;
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
        html.dark .hq-layout-youtube {
          --hq-bg: #020617;
          --hq-text: #f8fafc;
          --hq-text-muted: #94a3b8;
          --hq-card: #0f172a;
          --hq-border: #1e293b;
          --hq-accent: #3b82f6;
          --hq-accent-glow: rgba(59, 130, 246, 0.15);
        }
        
        .hq-container { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
        
        .hq-yt-theater {
          background: #000;
          border-radius: 24px;
          overflow: hidden;
          margin-bottom: 80px;
          position: relative;
          aspect-ratio: 21/9;
          display: flex; flex-direction: column; justify-content: flex-end;
          box-shadow: 0 40px 100px -20px rgba(0,0,0,0.4);
        }
        
        .hq-yt-theater-content {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(45deg, rgba(37,99,235,0.2) 0%, rgba(0,0,0,0) 100%);
          display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 24px;
        }
        
        .hq-yt-theater-content h2 {
          color: white; font-size: clamp(40px, 6vw, 80px); font-weight: 900; letter-spacing: -0.04em; text-align: center;
          text-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        
        .hq-yt-controls {
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          padding: 40px 40px 20px 40px;
          color: white;
          position: relative; z-index: 10;
        }
        
        .hq-yt-timeline { height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; margin-bottom: 20px; position: relative; }
        .hq-yt-timeline-fill { position: absolute; left: 0; top: 0; bottom: 0; width: 45%; background: var(--hq-accent); border-radius: 2px; }
        .hq-yt-timeline-fill::after { content: ''; position: absolute; right: -6px; top: -4px; width: 12px; height: 12px; background: var(--hq-accent); border-radius: 50%; box-shadow: 0 0 10px var(--hq-accent); }
        
        .hq-yt-buttons { display: flex; justify-content: space-between; align-items: center; }
        .hq-yt-btn-group { display: flex; gap: 24px; align-items: center; }
        
        .hq-yt-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; margin-bottom: 120px; }
        .hq-yt-card { border-left: 4px solid var(--hq-accent); padding-left: 24px; }
        .hq-yt-card h3 { font-size: 24px; font-weight: 800; margin-bottom: 16px; }
        .hq-yt-card p { font-size: 16px; color: var(--hq-text-muted); line-height: 1.6; }
        
        @media (max-width: 992px) {
          .hq-container { padding: 0 20px; }
          .hq-yt-theater { aspect-ratio: 16/9; }
          .hq-yt-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="hq-container">
        <div className="hq-yt-theater">
          <div className="hq-yt-theater-content">
            <h2>{typeName} <br/>{t.heroTitle}</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 20 }}>{t.heroSubtitle}</p>
          </div>
          
          <div className="hq-yt-controls">
            <div className="hq-yt-timeline">
              <div className="hq-yt-timeline-fill"></div>
            </div>
            <div className="hq-yt-buttons">
              <div className="hq-yt-btn-group">
                <Play size={24} fill="currentColor" />
                <Volume2 size={24} />
                <span style={{ fontSize: 14, fontFamily: 'monospace' }}>01:23 / 04:56</span>
              </div>
              <div className="hq-yt-btn-group">
                <ShieldCheck size={24} />
                <Maximize size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="hq-yt-grid">
          <div className="hq-yt-card">
            <ShieldCheck size={32} color="var(--hq-accent)" style={{ marginBottom: 16 }} />
            <h3>{t.comp1Title}</h3>
            <p>{t.comp1Desc}</p>
          </div>
          <div className="hq-yt-card">
            <Zap size={32} color="var(--hq-accent)" style={{ marginBottom: 16 }} />
            <h3>{t.comp2Title}</h3>
            <p>{t.comp2Desc}</p>
          </div>
          <div className="hq-yt-card">
            <Lock size={32} color="var(--hq-accent)" style={{ marginBottom: 16 }} />
            <h3>{t.comp3Title}</h3>
            <p>{t.comp3Desc}</p>
          </div>
        </div>
      </div>
      
      <div style={{ background: 'var(--hq-card)', padding: '120px 0', borderTop: '1px solid var(--hq-border)' }}>
        <div className="hq-container" style={{ maxWidth: 800 }}>
          <h2 style={{ fontSize: 40, fontWeight: 900, marginBottom: 48, textAlign: 'center' }}>{t.faqTitle}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              { q: t.faq1Q, a: t.faq1A },
              { q: t.faq2Q, a: t.faq2A },
              { q: t.faq3Q, a: t.faq3A }
            ].map((faq, i) => (
              <div key={i} style={{ background: 'var(--hq-bg)', borderRadius: 16, padding: '24px 32px' }}>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}
                >
                  <span style={{ fontSize: 20, fontWeight: 700 }}>{faq.q}</span>
                  <ChevronDown size={24} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0, transition: 'all 0.3s' }}>
                  <p style={{ paddingTop: 20, color: 'var(--hq-text-muted)', lineHeight: 1.6, fontSize: 16 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutYouTube;
