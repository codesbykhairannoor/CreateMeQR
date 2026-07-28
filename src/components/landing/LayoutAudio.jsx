import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Headphones, Play, FastForward, SkipBack, Volume2, ChevronDown, Radio } from 'lucide-react';

function LayoutAudio({ qrType = 'audio' }) {
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
    <div className="hq-layout-audio">
      <style>{`
        .hq-layout-audio {
          --hq-bg: #121212;
          --hq-text: #ffffff;
          --hq-text-muted: #b3b3b3;
          --hq-border: #282828;
          --hq-accent: #1db954; /* Spotify-ish green/neon */
          font-family: var(--font-main);
          background: var(--hq-bg);
          color: var(--hq-text);
          min-height: 100vh;
          padding: 80px 24px;
        }

        :global(.light) .hq-layout-audio {
          --hq-bg: #f5f5f5;
          --hq-text: #121212;
          --hq-text-muted: #555555;
          --hq-border: #e0e0e0;
          --hq-accent: #1ed760;
        }

        .hq-aud-wrapper {
          max-width: 1000px;
          margin: 0 auto;
        }

        .hq-aud-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          margin-bottom: 100px;
        }

        .hq-aud-player {
          background: #181818;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
          border: 1px solid var(--hq-border);
        }
        :global(.light) .hq-aud-player { background: #ffffff; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }

        .hq-aud-cover {
          width: 100%;
          aspect-ratio: 1/1;
          background: linear-gradient(135deg, #450af5, #c4efd9);
          border-radius: 16px;
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .hq-aud-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .hq-aud-play-btn {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--hq-accent);
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .hq-aud-play-btn:hover { transform: scale(1.05); }

        .hq-aud-bar {
          height: 4px;
          background: var(--hq-border);
          border-radius: 2px;
          position: relative;
        }
        .hq-aud-progress {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 35%;
          background: var(--hq-text);
          border-radius: 2px;
        }

        .hq-aud-features {
          display: flex;
          flex-direction: column;
          gap: 40px;
          margin-bottom: 100px;
        }

        .hq-aud-feat {
          display: flex;
          gap: 24px;
          align-items: flex-start;
        }

        .hq-aud-feat svg {
          color: var(--hq-accent);
          flex-shrink: 0;
        }
      
        
        
              
        /* STRICTLY SCOPED MOBILE FIXES (Phase 4) */
        @media (max-width: 768px) {
          /* General Container fixes */
          .hq-layout-audio .hq-container { padding: 0 16px !important; gap: 24px !important; }
          
          /* Phone/Player Mockups scaling */
          .hq-layout-audio div[class*="-phone"], .hq-layout-audio div[class*="-player"], .hq-layout-audio div[class*="-mockup"], .hq-layout-audio div[class*="-mock"] {
            width: 100% !important;
            max-width: 320px !important;
            height: auto !important;
            min-height: 400px !important;
            margin: 0 auto !important;
            flex: 1 1 auto !important;
          }
          
          /* Ensure tall mockups stay in ratio */
          .hq-layout-audio div[class*="-phone"] { aspect-ratio: 9/18 !important; }
          
          /* Specific fix for YouTube player which should be 16:9 */
          .hq-layout-audio div.hq-yt-player { aspect-ratio: 16/9 !important; min-height: auto !important; }
          
          /* Fix Hero Padding */
          .hq-layout-audio div[class*="-hero"] {
            padding: 40px 0 !important;
            gap: 32px !important;
            display: flex !important;
            flex-direction: column !important;
          }
          
          /* Fix LinkedIn & Profile Avatars Overlap */
          .hq-layout-audio div.hq-li-avatar, .hq-layout-audio div[class*="-avatar"] {
            width: 80px !important;
            height: 80px !important;
            top: -40px !important;
          }
          .hq-layout-audio div.hq-li-profile-info, .hq-layout-audio div[class*="-profile-info"] {
            margin-top: 50px !important;
          }
          .hq-layout-audio div.hq-li-cover { height: 100px !important; }
          
          /* Fix Inline Grids (URL, WiFi, etc) that don't use CSS classes */
          .hq-layout-audio div[style*="gridTemplateColumns"] {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
          }
          .hq-layout-audio div[style*="gridColumn:"] {
            width: 100% !important;
            grid-column: span 1 !important;
          }
          
          /* Fix Inline Flex Rows (URL steps) */
          .hq-layout-audio div[style*="flexDirection: 'row'"], .hq-layout-audio div[style*="flex-direction: row"] {
            flex-direction: column !important;
          }

          /* Fix grid column squeezing for ALL bento, features, and grid classes */
          .hq-layout-audio div[class*="-bento"], .hq-layout-audio div[class*="-features"], .hq-layout-audio div[class*="-grid"], .hq-layout-audio div[class*="-row"], .hq-layout-audio div[class*="bento"], .hq-layout-audio div[class*="features"] {
            display: flex !important;
            flex-direction: column !important;
          }
          
          /* Ensure ALL Main and Wrapper containers stack vertically */
          .hq-layout-audio div[class*="-main"], .hq-layout-audio div[class*="-wrapper"], .hq-layout-audio div[class*="main"] {
            display: flex !important;
            flex-direction: column !important;
          }

          /* Ensure text wraps nicely */
          .hq-layout-audio h1, .hq-layout-audio h2, .hq-layout-audio h3 { line-height: 1.2 !important; word-wrap: break-word; }
        }
    
      `}</style>

      <div className="hq-aud-wrapper">
        <div className="hq-aud-hero">
          <div>
            <Headphones size={48} color="var(--hq-accent)" style={{ marginBottom: 24 }} />
            <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 800, marginBottom: 24, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              {t('landing.heroTitle', { type: t(`types.${qrType}`) })}
            </h1>
            <p style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--hq-text-muted)' }}>
              {t('landing.heroSubtitle')}
            </p>
          </div>

          <div className="hq-aud-player">
            <div className="hq-aud-cover">
              <Radio size={80} color="rgba(255,255,255,0.8)" />
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>{getTranslation('featTools', 't', 1)}</div>
              <div style={{ fontSize: 16, color: 'var(--hq-text-muted)' }}>Podcast Episode</div>
            </div>
            <div className="hq-aud-bar" style={{ marginBottom: 12 }}>
              <div className="hq-aud-progress"></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--hq-text-muted)', marginBottom: 24 }}>
              <span>12:45</span>
              <span>45:30</span>
            </div>
            <div className="hq-aud-controls">
              <SkipBack size={24} color="var(--hq-text-muted)" />
              <div className="hq-aud-play-btn"><Play size={32} fill="#000" /></div>
              <FastForward size={24} color="var(--hq-text-muted)" />
            </div>
          </div>
        </div>

        <div className="hq-aud-features">
          <div className="hq-aud-feat">
            <Headphones size={40} />
            <div>
              <h3 className="font-bold tracking-tighter " style={{ fontSize: 28,  marginBottom: 12 }}>{getTranslation('featTools', 't', 1)}</h3>
              <p style={{ margin: 0, color: 'var(--hq-text-muted)', fontSize: 18, lineHeight: 1.6 }}>{getTranslation('featTools', 'd', 1)}</p>
            </div>
          </div>
          <div className="hq-aud-feat">
            <Radio size={40} />
            <div>
              <h3 className="font-bold tracking-tighter " style={{ fontSize: 28,  marginBottom: 12 }}>{getTranslation('featTools', 't', 2)}</h3>
              <p style={{ margin: 0, color: 'var(--hq-text-muted)', fontSize: 18, lineHeight: 1.6 }}>{getTranslation('featTools', 'd', 2)}</p>
            </div>
          </div>
          <div className="hq-aud-feat">
            <Volume2 size={40} />
            <div>
              <h3 className="font-bold tracking-tighter " style={{ fontSize: 28,  marginBottom: 12 }}>{getTranslation('featTools', 't', 3)}</h3>
              <p style={{ margin: 0, color: 'var(--hq-text-muted)', fontSize: 18, lineHeight: 1.6 }}>{getTranslation('featTools', 'd', 3)}</p>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 800, margin: '0 auto', paddingBottom: 120 }}>
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
    </div>
  );
}

export default LayoutAudio;
