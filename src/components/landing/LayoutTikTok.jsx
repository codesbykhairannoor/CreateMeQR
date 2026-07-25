import React from 'react';
import { useTranslation } from 'react-i18next';
import { Music2, ShieldCheck, Zap, Lock, ChevronDown, Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';

function LayoutTikTok({ qrType = 'tiktok' }) {
  const { t: translate } = useTranslation();
  const typeName = translate(`types.${qrType}`);
  const tObj = translate('landing', { returnObjects: true });
  const t = typeof tObj === 'object' && tObj !== null ? tObj : {};
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div className="hq-layout-tiktok">
      <style>{`
        .hq-layout-tiktok {
          --hq-bg: #000000;
          --hq-text: #ffffff;
          --hq-text-muted: rgba(255,255,255,0.7);
          --hq-card: #121212;
          --hq-border: #222222;
          --hq-accent: #ff0050;
          --hq-accent-secondary: #00f2fe;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 100px;
        }
        
        .hq-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; gap: 40px; justify-content: center; }
        
        .hq-tk-player {
          width: 360px; height: 640px; background: #1a1a1a; border-radius: 16px; position: relative; overflow: hidden;
          box-shadow: 0 0 40px rgba(0, 242, 254, 0.1), 0 0 40px rgba(255, 0, 80, 0.1); flex-shrink: 0;
        }
        
        .hq-tk-video {
          position: absolute; inset: 0; background: linear-gradient(135deg, var(--hq-accent), var(--hq-accent-secondary));
          opacity: 0.15;
        }
        
        .hq-tk-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 24px 80px 24px 16px; background: linear-gradient(transparent, rgba(0,0,0,0.8)); }
        .hq-tk-title { font-size: 24px; font-weight: 800; margin-bottom: 8px; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
        .hq-tk-desc { font-size: 15px; line-height: 1.4; text-shadow: 0 1px 2px rgba(0,0,0,0.5); }
        
        .hq-tk-actions { position: absolute; right: 16px; bottom: 24px; display: flex; flex-direction: column; gap: 24px; align-items: center; }
        .hq-tk-action { display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); }
        .hq-tk-action-icon { width: 48px; height: 48px; border-radius: 50%; background: rgba(255,255,255,0.1); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; }
        
        .hq-tk-content { flex: 1; max-width: 600px; padding: 40px 0; }
        .hq-tk-content h2 { font-size: clamp(32px, 4vw, 48px); font-weight: 900; margin-bottom: 24px; }
        
        .hq-tk-features { display: flex; flex-direction: column; gap: 24px; margin-top: 40px; }
        .hq-tk-feature { background: var(--hq-card); padding: 24px; border-radius: 12px; border-left: 4px solid var(--hq-accent-secondary); }
        .hq-tk-feature h3 { font-size: 18px; font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; gap: 12px; }
        
        @media (max-width: 992px) {
          .hq-container { flex-direction: column; align-items: center; }
          .hq-tk-content { text-align: center; }
          .hq-tk-feature { text-align: left; }
        }
      `}</style>

      <div className="hq-container">
        <div className="hq-tk-player">
          <div className="hq-tk-video"></div>
          <div className="hq-tk-overlay">
            <div style={{ fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}><Music2 size={16} /> @createmyqr</div>
            <div className="hq-tk-title">{t.heroTitle}</div>
            <div className="hq-tk-desc">{t.heroSubtitle} #qrcode #foryou #{typeName}</div>
          </div>
          <div className="hq-tk-actions">
            <div className="hq-tk-action">
              <div className="hq-tk-action-icon"><Heart size={24} fill="white" /></div>
              1.2M
            </div>
            <div className="hq-tk-action">
              <div className="hq-tk-action-icon"><MessageCircle size={24} fill="white" /></div>
              45K
            </div>
            <div className="hq-tk-action">
              <div className="hq-tk-action-icon"><Bookmark size={24} fill="white" /></div>
              89K
            </div>
            <div className="hq-tk-action">
              <div className="hq-tk-action-icon"><Share2 size={24} fill="white" /></div>
              Share
            </div>
          </div>
        </div>

        <div className="hq-tk-content">
          <h2>Swipe Up for {typeName} QR Code</h2>
          <p style={{ color: 'var(--hq-text-muted)', fontSize: 18, lineHeight: 1.6 }}>
            {t.heroSubtitle} Generate codes instantly without any tracking or subscription fees.
          </p>
          
          <div className="hq-tk-features">
            <div className="hq-tk-feature">
              <h3><ShieldCheck color="var(--hq-accent)" /> {t.comp1Title}</h3>
              <p style={{ color: 'var(--hq-text-muted)', fontSize: 15 }}>{t.comp1Desc}</p>
            </div>
            <div className="hq-tk-feature">
              <h3><Zap color="var(--hq-accent-secondary)" /> {t.comp2Title}</h3>
              <p style={{ color: 'var(--hq-text-muted)', fontSize: 15 }}>{t.comp2Desc}</p>
            </div>
            <div className="hq-tk-feature">
              <h3><Lock color="var(--hq-text)" /> {t.comp3Title}</h3>
              <p style={{ color: 'var(--hq-text-muted)', fontSize: 15 }}>{t.comp3Desc}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ background: '#0a0a0a', padding: '100px 0', marginTop: 80, borderTop: '1px solid var(--hq-border)' }}>
        <div className="hq-container" style={{ maxWidth: 800, flexDirection: 'column' }}>
          <h2 style={{ fontSize: 32, fontWeight: 900, textAlign: 'center', marginBottom: 40 }}>{t.faqTitle}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
            {[
              { q: t.faq1Q, a: t.faq1A }, { q: t.faq2Q, a: t.faq2A }, { q: t.faq3Q, a: t.faq3A }
            ].map((faq, i) => (
              <div key={i} style={{ background: 'var(--hq-card)', borderRadius: 12, padding: 8 }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}>
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
    </div>
  );
}

export default LayoutTikTok;
