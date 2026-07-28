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
          font-family: var(--font-main);
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
          margin-bottom: 40px;
          position: relative;
        }

        .hq-img-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 16px;
          margin-bottom: 40px;
        }

        @media (min-width: 768px) {
          .hq-img-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 40px;
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
      
        
        
              
              
        /* DEEP MOBILE FIXES (Phase 5) */
        @media (max-width: 768px) {
          /* General Container fixes */
          .hq-layout-image .hq-container { padding: 0 16px !important; gap: 24px !important; }
          
          /* NATIVE MOCKUP SCALING:
             Instead of crushing the height (which destroys internal CSS), 
             we use native transform scale to shrink the mockups proportionally! */
          .hq-layout-image div[class*="-phone"], .hq-layout-image div[class*="-player"], .hq-layout-image div[class*="-mockup"], .hq-layout-image div[class*="-mock"] {
            transform: scale(0.85) !important;
            transform-origin: top center !important;
            margin: 0 auto !important;
            /* Negative margin to eat up the empty space left by scaling */
            margin-bottom: -60px !important;
            /* Do not override height or aspect-ratio so internal CSS stays intact! */
          }
          
          /* Fix Hero Stacking safely */
          .hq-layout-image div[class*="-hero"], .hq-layout-image div[class*="-main"], .hq-layout-image div[class*="-wrapper"], .hq-layout-image div[class*="main"] {
            display: flex !important;
            flex-direction: column !important;
            padding: 32px 0 !important;
            gap: 24px !important;
          }
          
          /* Fix Grid Squeezing (Video, Image, PDF features) */
          .hq-layout-image div[class*="-bento"], .hq-layout-image div[class*="-features"], .hq-layout-image div[class*="-grid"], .hq-layout-image div[class*="-row"], .hq-layout-image div[class*="bento"], .hq-layout-image div[class*="features"] {
            display: flex !important;
            flex-direction: column !important;
          }

          /* LinkedIn specific avatar overlaps */
          .hq-layout-image div.hq-li-avatar, .hq-layout-image div[class*="-avatar"] {
            width: 80px !important;
            height: 80px !important;
            top: -40px !important;
          }
          .hq-layout-image div.hq-li-profile-info, .hq-layout-image div[class*="-profile-info"] {
            margin-top: 50px !important;
          }
          .hq-layout-image div.hq-li-cover { height: 100px !important; }

          /* Ensure text wraps correctly without horizontal scroll */
          .hq-layout-image h1, .hq-layout-image h2, .hq-layout-image h3, .hq-layout-image p {
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            max-width: 100% !important;
          }
        }
    
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
            <h2 className="font-bold tracking-tighter " style={{ fontSize: 32,  marginBottom: 16 }}>{translate('landing.comp1Title') || 'High Quality Rendering'}</h2>
            <p style={{ fontSize: 18, color: 'var(--hq-text-muted)', maxWidth: 400 }}>{translate('landing.comp1Desc') || 'Get pristine quality images with zero compression artifacts.'}</p>
          </div>
          <div className="hq-img-card" style={{ padding: 32, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end', textAlign: 'left' }}>
            <ZoomIn size={48} color="var(--hq-text-muted)" style={{ marginBottom: 24 }} />
            <h3 className="font-bold tracking-tighter" style={{ fontSize: 24, marginBottom: 12, color: 'var(--hq-text)' }}>{translate('landing.comp2Title') || 'Fast & Reliable'}</h3>
            <p style={{ color: 'var(--hq-text-muted)', fontSize: 16 }}>{translate('landing.comp2Desc') || 'Instant processing and generation right in your browser.'}</p>
          </div>
          <div className="hq-img-card" style={{ padding: 32, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end', textAlign: 'left' }}>
            <ImagePlus size={48} color="var(--hq-text-muted)" style={{ marginBottom: 24 }} />
            <h3 className="font-bold tracking-tighter" style={{ fontSize: 24, marginBottom: 12, color: 'var(--hq-text)' }}>{translate('landing.comp3Title') || 'Fully Customizable'}</h3>
            <p style={{ color: 'var(--hq-text-muted)', fontSize: 16 }}>{translate('landing.comp3Desc') || 'Personalize colors, frames, and branding to fit your needs.'}</p>
          </div>
        </div>

        <div style={{ marginTop: 100, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
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

export default LayoutImage;
