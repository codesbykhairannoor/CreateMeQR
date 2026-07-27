import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link2, Smartphone, ChevronDown, UserCircle, Layers, Palette } from 'lucide-react';

function LayoutLinkInBio({ qrType = 'linkinbio' }) {
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
    <div className="hq-layout-linkinbio">
      <style>{`
        .hq-layout-linkinbio {
          --hq-bg: #fafafa;
          --hq-text: #000000;
          --hq-text-muted: #666666;
          --hq-border: #eaeaea;
          --hq-accent: #000000;
          font-family: -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Display", "Helvetica Neue", sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          min-height: 100vh;
          padding: 80px 24px;
        }

        :global(.dark) .hq-layout-linkinbio {
          --hq-bg: #000000;
          --hq-text: #ffffff;
          --hq-text-muted: #999999;
          --hq-border: #222222;
          --hq-accent: #ffffff;
        }

        .hq-lib-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .hq-lib-hero {
          margin-bottom: 40px;
        }

        .hq-lib-mockup-wrap {
          display: flex;
          justify-content: center;
        }

        .hq-lib-mockup {
          width: 320px;
          height: 650px;
          border-radius: 40px;
          background: #f0f0f0;
          border: 12px solid #222;
          box-shadow: 0 24px 60px rgba(0,0,0,0.1);
          padding: 32px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        :global(.dark) .hq-lib-mockup { background: #111; border-color: #333; }

        .hq-lib-mock-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #ccc;
          margin-bottom: 8px;
        }
        
        .hq-lib-mock-title { width: 120px; height: 16px; background: #ddd; border-radius: 8px; }
        .hq-lib-mock-btn { width: 100%; height: 50px; background: #fff; border-radius: 25px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        :global(.dark) .hq-lib-mock-btn { background: #222; }
        
        .hq-lib-features {
          display: flex;
          flex-direction: column;
          gap: 32px;
          margin-top: 48px;
        }

        .hq-lib-feat {
          display: flex;
          gap: 16px;
        }
        
        .hq-lib-feat svg { color: var(--hq-text); }
      `}</style>

      <div className="hq-lib-wrapper">
        <div>
          <div className="hq-lib-hero">
            <Link2 size={48} style={{ marginBottom: 24 }} />
            <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 800, marginBottom: 24, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              {t('landing.heroTitle', { type: t(`types.${qrType}`) })}
            </h1>
            <p style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--hq-text-muted)' }}>
              {t('landing.heroSubtitle')}
            </p>
          </div>
          
          <div className="hq-lib-features">
            <div className="hq-lib-feat">
              <Layers size={32} />
              <div>
                <h3 className="font-bold tracking-tighter " style={{ fontSize: 24,  margin: '0 0 8px 0' }}>{getTranslation('featTools', 't', 1)}</h3>
                <p style={{ margin: 0, color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{getTranslation('featTools', 'd', 1)}</p>
              </div>
            </div>
            <div className="hq-lib-feat">
              <Palette size={32} />
              <div>
                <h3 className="font-bold tracking-tighter " style={{ fontSize: 24,  margin: '0 0 8px 0' }}>{getTranslation('featTools', 't', 2)}</h3>
                <p style={{ margin: 0, color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{getTranslation('featTools', 'd', 2)}</p>
              </div>
            </div>
            <div className="hq-lib-feat">
              <UserCircle size={32} />
              <div>
                <h3 className="font-bold tracking-tighter " style={{ fontSize: 24,  margin: '0 0 8px 0' }}>{getTranslation('featTools', 't', 3)}</h3>
                <p style={{ margin: 0, color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{getTranslation('featTools', 'd', 3)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hq-lib-mockup-wrap">
          <div className="hq-lib-mockup">
            <div className="hq-lib-mock-avatar"></div>
            <div className="hq-lib-mock-title"></div>
            <div className="hq-lib-mock-title" style={{ width: 180, height: 12, marginBottom: 24 }}></div>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="hq-lib-mock-btn"></div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 120, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
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

export default LayoutLinkInBio;
