import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Video, PlayCircle, Maximize, Smartphone, ChevronDown } from 'lucide-react';

function LayoutVideo({ qrType = 'video' }) {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);

  const translate = (key) => {
    const translation = t(key);
    return translation === key ? null : translation;
  };

  const getTranslation = (type, key, suffix) => {
    return translate(`${type}.${qrType}.${key}${suffix}`);
  };

  return (
    <div className="hq-layout-video">
      <style>{`
        .hq-layout-video {
          --hq-bg: #09090b;
          --hq-text: #ffffff;
          --hq-text-muted: #a1a1aa;
          --hq-border: #27272a;
          --hq-accent: #ef4444; /* Cinematic Red */
          font-family: var(--font-main);
          background: var(--hq-bg);
          color: var(--hq-text);
          min-height: 100vh;
          padding: 0;
        }

        :global(.light) .hq-layout-video {
          --hq-bg: #f4f4f5;
          --hq-text: #18181b;
          --hq-text-muted: #71717a;
          --hq-border: #e4e4e7;
        }

        .hq-vid-hero {
          background: #000;
          padding: 120px 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hq-vid-hero-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(239, 68, 68, 0.15) 0%, transparent 70%);
          z-index: 0;
        }

        .hq-vid-hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }

        .hq-vid-player-mock {
          max-width: 1000px;
          margin: -60px auto 80px auto;
          aspect-ratio: 16/9;
          background: #18181b;
          border-radius: 24px;
          border: 1px solid var(--hq-border);
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 10;
        }
        :global(.light) .hq-vid-player-mock { background: #e4e4e7; }

        .hq-vid-play-btn {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--hq-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 0 40px rgba(239, 68, 68, 0.5);
          cursor: pointer;
          transition: transform 0.2s;
        }
        .hq-vid-play-btn:hover { transform: scale(1.1); }

        .hq-vid-features {
          max-width: 1200px;
          margin: 0 auto 80px auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          padding: 0 24px;
        }

        .hq-vid-feat {
          padding: 40px;
          background: #18181b;
          border-radius: 16px;
          border: 1px solid var(--hq-border);
          text-align: center;
        }
        :global(.light) .hq-vid-feat { background: #ffffff; }

        .hq-vid-feat svg {
          margin: 0 auto 24px auto;
          color: var(--hq-accent);
        }
      
        
        
        /* GLOBAL MOBILE FIXES (Phase 3) */
        @media (max-width: 768px) {
          /* General Container fixes */
          .hq-container { padding: 0 16px !important; gap: 24px !important; }
          
          /* Phone/Player Mockups scaling (TikTok, Snapchat, WhatsApp, YouTube, etc.) */
          [class*="-phone"], [class*="-player"], [class*="-mockup"], [class*="-mock"] {
            width: 100% !important;
            max-width: 320px !important;
            height: auto !important;
            min-height: 400px !important;
            margin: 0 auto !important;
            flex: 1 1 auto !important;
          }
          
          /* Ensure tall mockups stay in ratio */
          [class*="-phone"] { aspect-ratio: 9/18 !important; }
          
          /* Specific fix for YouTube player which should be 16:9 */
          .hq-yt-player { aspect-ratio: 16/9 !important; min-height: auto !important; }
          
          /* Fix Hero Padding */
          [class*="-hero"] {
            padding: 40px 0 !important;
            gap: 32px !important;
            display: flex !important;
            flex-direction: column !important;
          }
          
          /* Fix LinkedIn & Profile Avatars Overlap */
          .hq-li-avatar, [class*="-avatar"] {
            width: 80px !important;
            height: 80px !important;
            top: -40px !important;
          }
          .hq-li-profile-info, [class*="-profile-info"] {
            margin-top: 50px !important;
          }
          .hq-li-cover { height: 100px !important; }
          
          /* Fix Inline Grids (URL, WiFi, etc) that don't use CSS classes */
          div[style*="gridTemplateColumns"] {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
          }
          div[style*="gridColumn:"] {
            width: 100% !important;
            grid-column: span 1 !important;
          }
          
          /* Fix Inline Flex Rows (URL steps) */
          div[style*="flexDirection: 'row'"], div[style*="flex-direction: row"] {
            flex-direction: column !important;
          }

          /* Phase 2 & 3: PDF, App Store, WiFi, Link In Bio, Video, Audio, File fixes */
          /* Fix grid column squeezing for ALL bento, features, and grid classes */
          [class*="-bento"], [class*="-features"], [class*="-grid"], [class*="-row"], [class*="bento"], [class*="features"] {
            display: flex !important;
            flex-direction: column !important;
          }
          
          /* Ensure ALL Main and Wrapper containers stack vertically */
          [class*="-main"], [class*="-wrapper"], [class*="main"] {
            display: flex !important;
            flex-direction: column !important;
          }

          /* Ensure text wraps nicely */
          h1, h2, h3 { line-height: 1.2 !important; word-wrap: break-word; }
        }
    
      `}</style>

      <div className="hq-vid-hero">
        <div className="hq-vid-hero-bg"></div>
        <div className="hq-vid-hero-content">
          <Video size={48} color="var(--hq-accent)" style={{ margin: '0 auto 24px auto' }} />
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, marginBottom: 24, letterSpacing: '-0.04em', color: 'white' }}>
            {t('landing.heroTitle', { type: t(`types.${qrType}`) })}
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', color: '#a1a1aa', maxWidth: 600, margin: '0 auto' }}>
            {t('landing.heroSubtitle')}
          </p>
        </div>
      </div>

      <div className="hq-vid-player-mock">
        <div className="hq-vid-play-btn">
          <PlayCircle size={40} />
        </div>
      </div>

      <div className="hq-vid-features">
        <div className="hq-vid-feat">
          <PlayCircle size={40} />
          <h3 className="font-bold tracking-tighter " style={{ fontSize: 24,  marginBottom: 16 }}>{getTranslation('featTools', 't', 1)}</h3>
          <p style={{ color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{getTranslation('featTools', 'd', 1)}</p>
        </div>
        <div className="hq-vid-feat">
          <Maximize size={40} />
          <h3 className="font-bold tracking-tighter " style={{ fontSize: 24,  marginBottom: 16 }}>{getTranslation('featTools', 't', 2)}</h3>
          <p style={{ color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{getTranslation('featTools', 'd', 2)}</p>
        </div>
        <div className="hq-vid-feat">
          <Smartphone size={40} />
          <h3 className="font-bold tracking-tighter " style={{ fontSize: 24,  marginBottom: 16 }}>{getTranslation('featTools', 't', 3)}</h3>
          <p style={{ color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{getTranslation('featTools', 'd', 3)}</p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 120px 24px' }}>
        <h2 className="font-bold tracking-tighter " style={{ paddingTop: 60, fontSize: 32,  textAlign: 'center', marginBottom: 48 }}>{t('landing.faqTitle')}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[1, 2, 3, 4, 5].map((num, i) => {
            const q = getTranslation('faqTools', 'q', num);
            const a = getTranslation('faqTools', 'a', num);
            if (!q) return null;
            return (
              <div key={i} style={{ borderBottom: '1px solid var(--hq-border)' }}>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}
                >
                  <span style={{ fontSize: 20, fontWeight: 600 }}>{q}</span>
                  <ChevronDown size={24} style={{ color: 'var(--hq-text-muted)', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                  <p style={{ padding: '0 0 24px 0', margin: 0, color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LayoutVideo;
