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
          font-family: -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Display", "Helvetica Neue", sans-serif;
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
          
          <h2 className="font-bold tracking-tighter text-zinc-900 dark:text-white">{t.heroTitle} <br/>for {typeName}</h2>
          <p>{t.heroSubtitle}</p>
        </div>

        <div className="hq-ig-feed">
          <div className="hq-ig-post" style={{ background: 'var(--hq-card)', border: 'none', borderRadius: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: '1px solid var(--hq-border)' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(45deg, #f09433, #dc2743)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><ShieldCheck size={16} /></div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{translate('featTools.instagram.t1') || t.comp1Title}</div>
            </div>
            <div style={{ padding: 20 }}>
              <p style={{ margin: 0, fontSize: 14 }}>{translate('featTools.instagram.d1') || t.comp1Desc}</p>
            </div>
          </div>
          <div className="hq-ig-post" style={{ background: 'var(--hq-card)', border: 'none', borderRadius: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: '1px solid var(--hq-border)' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(45deg, #e6683c, #cc2366)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><Zap size={16} /></div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{translate('featTools.instagram.t2') || t.comp2Title}</div>
            </div>
            <div style={{ padding: 20 }}>
              <p style={{ margin: 0, fontSize: 14 }}>{translate('featTools.instagram.d2') || t.comp2Desc}</p>
            </div>
          </div>
          <div className="hq-ig-post" style={{ background: 'var(--hq-card)', border: 'none', borderRadius: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', borderBottom: '1px solid var(--hq-border)' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(45deg, #cc2366, #bc1888)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><Lock size={16} /></div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{translate('featTools.instagram.t3') || t.comp3Title}</div>
            </div>
            <div style={{ padding: 20 }}>
              <p style={{ margin: 0, fontSize: 14 }}>{translate('featTools.instagram.d3') || t.comp3Desc}</p>
            </div>
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
          <h2 className="font-bold tracking-tighter text-zinc-900 dark:text-white" style={{ paddingTop: 120, fontSize: 36,  textAlign: 'center', margin: '0 0 40px 0' }}>{t.faqTitle}</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = translate(`faqTools.instagram.q${num}`);
              const a = translate(`faqTools.instagram.a${num}`);
              if (!q || q === `faqTools.instagram.q${num}`) return null;
              return (
              <div key={i} style={{ background: 'var(--hq-bg)', borderRadius: 24, padding: '2px', backgroundClip: 'padding-box', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: openFaq === i ? 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' : 'var(--hq-border)', zIndex: 0, transition: 'background 0.5s' }} />
                <div style={{ position: 'relative', zIndex: 1, background: 'var(--hq-bg)', borderRadius: 22, height: '100%' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <Camera size={20} style={{ color: openFaq === i ? '#dc2743' : 'var(--hq-text-muted)', transition: 'color 0.3s' }} />
                      <span style={{ fontSize: 18, fontWeight: 700 }}>{q}</span>
                    </div>
                    <ChevronDown size={20} style={{ color: 'var(--hq-text-muted)', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </button>
                  <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                    <p style={{ padding: '0 32px 32px 68px', color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{a}</p>
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

export default LayoutInstagram;
