import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Download, ChevronDown, CheckCircle2, Search, Share2 } from 'lucide-react';

function LayoutPDF({ qrType = 'pdf' }) {
  const { t, i18n } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);

  const translate = (key) => {
    const translation = t(key);
    return translation === key ? null : translation;
  };

  const getTranslation = (type, key, suffix) => {
    return translate(`${type}.${qrType}.${key}${suffix}`);
  };

  return (
    <div className="hq-layout-pdf">
      <style>{`
        .hq-layout-pdf {
          --hq-bg: #fdfdfd;
          --hq-text: #1a1a1a;
          --hq-text-muted: #555555;
          --hq-border: #e0e0e0;
          --hq-accent: #E3242B; /* Adobe Red */
          --hq-accent-glow: rgba(227, 36, 43, 0.1);
          font-family: -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Display", "Helvetica Neue", sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          min-height: 100vh;
          padding: 80px 24px;
        }

        /* Dark mode overrides if implemented in parent */
        :global(.dark) .hq-layout-pdf {
          --hq-bg: #121212;
          --hq-text: #f5f5f5;
          --hq-text-muted: #a0a0a0;
          --hq-border: #2a2a2a;
        }

        .hq-pdf-wrapper {
          max-width: 900px;
          margin: 0 auto;
        }

        .hq-pdf-hero {
          text-align: center;
          margin-bottom: 64px;
        }

        .hq-pdf-icon-wrap {
          width: 80px;
          height: 80px;
          background: var(--hq-accent-glow);
          color: var(--hq-accent);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px auto;
        }

        .hq-pdf-bento {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
          margin-bottom: 64px;
        }

        .hq-pdf-card {
          background: var(--hq-bg);
          border: 1px solid var(--hq-border);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .hq-pdf-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(227, 36, 43, 0.08);
          border-color: rgba(227, 36, 43, 0.3);
        }

        .hq-pdf-doc-preview {
          background: #f0f0f0;
          border-radius: 8px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 24px;
        }
        :global(.dark) .hq-pdf-doc-preview { background: #1e1e1e; }

        .hq-pdf-line {
          height: 8px;
          background: var(--hq-border);
          border-radius: 4px;
          width: 100%;
        }
        .hq-pdf-line.short { width: 60%; }
        .hq-pdf-line.title { height: 16px; width: 80%; background: var(--hq-text-muted); margin-bottom: 8px; }

        .hq-pdf-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 64px;
        }

        .hq-pdf-feat {
          text-align: center;
          padding: 24px;
          border-radius: 12px;
          background: var(--hq-bg);
          border: 1px solid var(--hq-border);
        }

        .hq-pdf-feat svg {
          margin: 0 auto 16px auto;
          color: var(--hq-accent);
        }
      `}</style>

      <div className="hq-pdf-wrapper">
        <div className="hq-pdf-hero">
          <div className="hq-pdf-icon-wrap">
            <FileText size={40} />
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, marginBottom: 24, letterSpacing: '-0.03em' }}>
            {t('landing.heroTitle', { type: t(`types.${qrType}`) })}
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--hq-text-muted)', maxWidth: 600, margin: '0 auto' }}>
            {t('landing.heroSubtitle')}
          </p>
        </div>

        <div className="hq-pdf-bento">
          <div className="hq-pdf-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <CheckCircle2 size={24} color="var(--hq-accent)" />
              <h3 className="font-bold tracking-tighter text-zinc-900 dark:text-white" style={{ fontSize: 24,  margin: 0 }}>{getTranslation('featTools', 't', 1)}</h3>
            </div>
            <p style={{ fontSize: 16, color: 'var(--hq-text-muted)', lineHeight: 1.6, margin: 0 }}>
              {getTranslation('featTools', 'd', 1)}
            </p>
            <div className="hq-pdf-doc-preview">
              <div className="hq-pdf-line title"></div>
              <div className="hq-pdf-line"></div>
              <div className="hq-pdf-line"></div>
              <div className="hq-pdf-line short"></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                <div style={{ display: 'flex', gap: 8 }}><div className="hq-pdf-line short" style={{ width: 40 }}></div><div className="hq-pdf-line short" style={{ width: 40 }}></div></div>
                <Download size={16} color="var(--hq-text-muted)" />
              </div>
            </div>
          </div>
          <div className="hq-pdf-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--hq-accent)', color: 'white', borderColor: 'var(--hq-accent)' }}>
            <h3 className="font-bold tracking-tighter" style={{ fontSize: 24,  margin: '0 0 16px 0', color: 'white' }}>{getTranslation('featTools', 't', 2)}</h3>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, margin: 0 }}>
              {getTranslation('featTools', 'd', 2)}
            </p>
          </div>
        </div>

        <div className="hq-pdf-features">
          <div className="hq-pdf-feat">
            <Search size={32} />
            <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Searchable</h4>
            <p style={{ fontSize: 14, color: 'var(--hq-text-muted)', lineHeight: 1.5, margin: 0 }}>Documents remain fully searchable and indexable for users.</p>
          </div>
          <div className="hq-pdf-feat">
            <Download size={32} />
            <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Direct Download</h4>
            <p style={{ fontSize: 14, color: 'var(--hq-text-muted)', lineHeight: 1.5, margin: 0 }}>Option to download the PDF securely for offline reading.</p>
          </div>
          <div className="hq-pdf-feat">
            <Share2 size={32} />
            <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>{getTranslation('featTools', 't', 3)}</h4>
            <p style={{ fontSize: 14, color: 'var(--hq-text-muted)', lineHeight: 1.5, margin: 0 }}>{getTranslation('featTools', 'd', 3)}</p>
          </div>
        </div>

        <div style={{ marginTop: 80 }}>
          <h2 className="font-bold tracking-tighter text-zinc-900 dark:text-white" style={{ paddingTop: 120, fontSize: 32,  textAlign: 'center', marginBottom: 40 }}>{t('landing.faqTitle')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 700, margin: '0 auto' }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = getTranslation('faqTools', 'q', num);
              const a = getTranslation('faqTools', 'a', num);
              if (!q) return null;
              return (
                <div key={i} style={{ background: 'var(--hq-bg)', border: '1px solid var(--hq-border)', borderRadius: 12, overflow: 'hidden' }}>
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}
                  >
                    <span style={{ fontSize: 18, fontWeight: 600 }}>{q}</span>
                    <ChevronDown size={20} style={{ color: 'var(--hq-text-muted)', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </button>
                  <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                    <p style={{ padding: '0 24px 24px 24px', margin: 0, color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{a}</p>
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

export default LayoutPDF;
