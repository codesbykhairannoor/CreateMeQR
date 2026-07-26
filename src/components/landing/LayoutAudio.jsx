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
          font-family: -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Display", "Helvetica Neue", sans-serif;
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
              <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>{getTranslation('featTools', 't', 1)}</h3>
              <p style={{ margin: 0, color: 'var(--hq-text-muted)', fontSize: 18, lineHeight: 1.6 }}>{getTranslation('featTools', 'd', 1)}</p>
            </div>
          </div>
          <div className="hq-aud-feat">
            <Radio size={40} />
            <div>
              <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>{getTranslation('featTools', 't', 2)}</h3>
              <p style={{ margin: 0, color: 'var(--hq-text-muted)', fontSize: 18, lineHeight: 1.6 }}>{getTranslation('featTools', 'd', 2)}</p>
            </div>
          </div>
          <div className="hq-aud-feat">
            <Volume2 size={40} />
            <div>
              <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>{getTranslation('featTools', 't', 3)}</h3>
              <p style={{ margin: 0, color: 'var(--hq-text-muted)', fontSize: 18, lineHeight: 1.6 }}>{getTranslation('featTools', 'd', 3)}</p>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 800, margin: '0 auto', paddingBottom: 120 }}>
          <h2 style={{ paddingTop: 120, fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 48 }}>{t('landing.faqTitle')}</h2>
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
