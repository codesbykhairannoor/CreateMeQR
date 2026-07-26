import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image as ImageIcon, ZoomIn, ImagePlus, ChevronDown, Camera } from 'lucide-react';

function LayoutImage({ qrType = 'image' }) {
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
    <div className="hq-layout-image">
      <style>{`
        .hq-layout-image {
          --hq-bg: #000000;
          --hq-text: #ffffff;
          --hq-text-muted: #a1a1aa;
          --hq-border: #27272a;
          --hq-accent: #3b82f6;
          font-family: -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Display", "Helvetica Neue", sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          min-height: 100vh;
          padding: 80px 24px;
        }

        :global(.light) .hq-layout-image {
          --hq-bg: #ffffff;
          --hq-text: #18181b;
          --hq-text-muted: #71717a;
          --hq-border: #e4e4e7;
        }

        .hq-img-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }

        .hq-img-hero {
          text-align: center;
          margin-bottom: 80px;
          position: relative;
        }

        .hq-img-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 80px;
        }

        .hq-img-card {
          background: #18181b;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          aspect-ratio: 4/5;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--hq-border);
        }
        
        .hq-img-card.main {
          grid-column: span 2;
          grid-row: span 2;
          aspect-ratio: auto;
        }

        :global(.light) .hq-img-card { background: #f4f4f5; }

        .hq-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%);
          opacity: 0;
          transition: opacity 0.3s;
          display: flex;
          align-items: flex-end;
          padding: 24px;
        }
        .hq-img-card:hover .hq-img-overlay { opacity: 1; }

        .hq-img-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 40px;
          padding: 40px;
          background: #18181b;
          border-radius: 24px;
          border: 1px solid var(--hq-border);
        }
        :global(.light) .hq-img-info { background: #fafafa; }
      `}</style>

      <div className="hq-img-wrapper">
        <div className="hq-img-hero">
          <Camera size={48} color="var(--hq-text-muted)" style={{ margin: '0 auto 24px auto' }} />
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, marginBottom: 24, letterSpacing: '-0.04em' }}>
            {t('landing.heroTitle', { type: t(`types.${qrType}`) })}
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--hq-text-muted)', maxWidth: 600, margin: '0 auto' }}>
            {t('landing.heroSubtitle')}
          </p>
        </div>

        <div className="hq-img-grid">
          <div className="hq-img-card main" style={{ padding: 40, flexDirection: 'column', textAlign: 'center' }}>
            <ImageIcon size={64} color="var(--hq-text-muted)" style={{ marginBottom: 24 }} />
            <h2 className="font-bold tracking-tighter text-zinc-900 dark:text-white" style={{ fontSize: 32,  marginBottom: 16 }}>{getTranslation('featTools', 't', 1)}</h2>
            <p style={{ fontSize: 18, color: 'var(--hq-text-muted)', maxWidth: 400 }}>{getTranslation('featTools', 'd', 1)}</p>
          </div>
          <div className="hq-img-card">
            <div className="hq-img-overlay">
              <span style={{ color: 'white', fontWeight: 600 }}>{getTranslation('featTools', 't', 2)}</span>
            </div>
            <ZoomIn size={48} color="var(--hq-text-muted)" />
          </div>
          <div className="hq-img-card">
            <div className="hq-img-overlay">
              <span style={{ color: 'white', fontWeight: 600 }}>{getTranslation('featTools', 't', 3)}</span>
            </div>
            <ImagePlus size={48} color="var(--hq-text-muted)" />
          </div>
        </div>

        <div className="hq-img-info">
          <div>
            <h3 className="font-bold tracking-tighter text-zinc-900 dark:text-white" style={{ fontSize: 24,  marginBottom: 8 }}>{getTranslation('featTools', 't', 2)}</h3>
            <p style={{ color: 'var(--hq-text-muted)', fontSize: 16, maxWidth: 400 }}>{getTranslation('featTools', 'd', 2)}</p>
          </div>
          <div>
            <h3 className="font-bold tracking-tighter text-zinc-900 dark:text-white" style={{ fontSize: 24,  marginBottom: 8 }}>{getTranslation('featTools', 't', 3)}</h3>
            <p style={{ color: 'var(--hq-text-muted)', fontSize: 16, maxWidth: 400 }}>{getTranslation('featTools', 'd', 3)}</p>
          </div>
        </div>

        <div style={{ marginTop: 100, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
          <h2 className="font-bold tracking-tighter text-zinc-900 dark:text-white" style={{ paddingTop: 120, fontSize: 32,  textAlign: 'center', marginBottom: 48 }}>{t('landing.faqTitle')}</h2>
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

export default LayoutImage;
