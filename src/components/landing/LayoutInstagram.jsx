import React from 'react';
import { useTranslation } from 'react-i18next';
import { Camera, ShieldCheck, Zap, Lock, ChevronDown, Heart, MessageCircle, Send } from 'lucide-react';

function LayoutInstagram({ qrType = 'instagram' }) {
  const { t: translate } = useTranslation();
  const typeName = translate(`types.${qrType}`);
  const tObj = translate('landing', { returnObjects: true });
  const t = typeof tObj === 'object' && tObj !== null ? tObj : {};
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div className="hq-layout-instagram">
      <style>{`
        .hq-layout-instagram {
          --hq-bg: #f8fafc;
          --hq-text: #0f172a;
          --hq-text-muted: #64748b;
          --hq-card: #ffffff;
          --hq-border: #e2e8f0;
          --hq-accent: #2563eb;
          --hq-accent-glow: rgba(37, 99, 235, 0.1);
          --ig-ring: conic-gradient(from 45deg, #2563eb, #60a5fa, #2563eb);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 160px; /* REQUIRED MASSIVE SPACING */
        }
        html.dark .hq-layout-instagram {
          --hq-bg: #020617;
          --hq-text: #f8fafc;
          --hq-text-muted: #94a3b8;
          --hq-card: #0f172a;
          --hq-border: #1e293b;
          --hq-accent: #3b82f6;
          --hq-accent-glow: rgba(59, 130, 246, 0.15);
          --ig-ring: conic-gradient(from 45deg, #3b82f6, #93c5fd, #3b82f6);
        }
        
        .hq-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        .hq-ig-hero {
          display: flex; flex-direction: column; align-items: center; text-align: center;
          margin-bottom: 120px;
        }
        
        .hq-ig-stories {
          display: flex; gap: 24px; margin-bottom: 60px; justify-content: center; flex-wrap: wrap;
        }
        
        .hq-ig-story {
          width: 120px; height: 120px;
          border-radius: 50%;
          padding: 4px;
          background: var(--ig-ring);
          position: relative;
        }
        .hq-ig-story-inner {
          width: 100%; height: 100%;
          background: var(--hq-bg);
          border-radius: 50%;
          border: 4px solid var(--hq-bg);
          display: flex; align-items: center; justify-content: center;
          color: var(--hq-accent);
        }
        .hq-ig-story-label { position: absolute; bottom: -30px; left: 50%; transform: translateX(-50%); font-weight: 600; font-size: 14px; white-space: nowrap; }
        
        .hq-ig-hero h2 { font-size: clamp(36px, 5vw, 64px); font-weight: 900; margin-bottom: 24px; letter-spacing: -0.04em; }
        .hq-ig-hero p { font-size: 20px; color: var(--hq-text-muted); max-width: 600px; line-height: 1.6; }
        
        .hq-ig-feed { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: var(--hq-border); margin-bottom: 120px; border: 1px solid var(--hq-border); }
        .hq-ig-post { aspect-ratio: 1; background: var(--hq-card); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 24px; text-align: center; transition: background 0.3s; }
        .hq-ig-post:hover { background: var(--hq-accent-glow); }
        .hq-ig-post-icon { margin-bottom: 16px; color: var(--hq-accent); }
        .hq-ig-post h3 { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
        .hq-ig-post p { font-size: 14px; color: var(--hq-text-muted); }
        
        @media (max-width: 768px) {
          .hq-ig-feed { grid-template-columns: 1fr; gap: 16px; background: transparent; border: none; }
          .hq-ig-post { border: 1px solid var(--hq-border); border-radius: 16px; }
        }
      `}</style>

      <div className="hq-container">
        <div className="hq-ig-hero">
          <div className="hq-ig-stories">
            <div className="hq-ig-story">
              <div className="hq-ig-story-inner"><ShieldCheck size={40} /></div>
              <div className="hq-ig-story-label">Privacy</div>
            </div>
            <div className="hq-ig-story">
              <div className="hq-ig-story-inner"><Zap size={40} /></div>
              <div className="hq-ig-story-label">Speed</div>
            </div>
            <div className="hq-ig-story">
              <div className="hq-ig-story-inner"><Camera size={40} /></div>
              <div className="hq-ig-story-label">{typeName}</div>
            </div>
          </div>
          
          <h2>{t.heroTitle} <br/>for {typeName}</h2>
          <p>{t.heroSubtitle}</p>
        </div>

        <div className="hq-ig-feed">
          <div className="hq-ig-post">
            <div className="hq-ig-post-icon"><ShieldCheck size={32} /></div>
            <h3>{t.comp1Title}</h3>
            <p>{t.comp1Desc}</p>
          </div>
          <div className="hq-ig-post">
            <div className="hq-ig-post-icon"><Zap size={32} /></div>
            <h3>{t.comp2Title}</h3>
            <p>{t.comp2Desc}</p>
          </div>
          <div className="hq-ig-post">
            <div className="hq-ig-post-icon"><Lock size={32} /></div>
            <h3>{t.comp3Title}</h3>
            <p>{t.comp3Desc}</p>
          </div>
        </div>
      </div>
      
      <div style={{ background: 'var(--hq-card)', borderTop: '1px solid var(--hq-border)', padding: '100px 0' }}>
        <div className="hq-container" style={{ maxWidth: 800 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40, justifyContent: 'center' }}>
            <Heart size={24} color="var(--hq-accent)" fill="var(--hq-accent)" />
            <MessageCircle size={24} />
            <Send size={24} />
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 800, textAlign: 'center', margin: '0 0 40px 0' }}>{t.faqTitle}</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { q: t.faq1Q, a: t.faq1A },
              { q: t.faq2Q, a: t.faq2A },
              { q: t.faq3Q, a: t.faq3A }
            ].map((faq, i) => (
              <div key={i} style={{ border: '1px solid var(--hq-border)', borderRadius: 16, overflow: 'hidden' }}>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}
                >
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{faq.q}</span>
                  <ChevronDown size={20} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0, transition: 'all 0.3s' }}>
                  <p style={{ padding: '0 24px 24px 24px', color: 'var(--hq-text-muted)', lineHeight: 1.6, fontSize: 15 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutInstagram;
