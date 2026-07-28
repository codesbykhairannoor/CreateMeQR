import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardList, ChevronDown, CheckCircle2, ListTodo, Share2 } from 'lucide-react';

function LayoutGoogleForms({ qrType = 'gforms' }) {
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
    <div className="hq-layout-gforms">
      <style>{`
        .hq-layout-gforms {
          --hq-bg: #f8f9fa;
          --hq-text: #202124;
          --hq-text-muted: #5f6368;
          --hq-border: #dadce0;
          --hq-accent: #673ab7; /* Google Forms Purple */
          --hq-accent-glow: rgba(103, 58, 183, 0.1);
          font-family: var(--font-main);
          background: var(--hq-bg);
          color: var(--hq-text);
          min-height: 100vh;
          padding: 80px 24px;
        }

        :global(.dark) .hq-layout-gforms {
          --hq-bg: #1f1f1f;
          --hq-text: #e8eaed;
          --hq-text-muted: #9aa0a6;
          --hq-border: #3c4043;
          --hq-accent: #b39ddb;
          --hq-accent-glow: rgba(179, 157, 219, 0.1);
        }

        .hq-gf-wrapper {
          max-width: 800px;
          margin: 0 auto;
        }

        .hq-gf-header {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .hq-gf-icon-box {
          width: 88px;
          height: 88px;
          background: white;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px auto;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          color: var(--hq-accent);
          border: 1px solid var(--hq-border);
        }
        :global(.dark) .hq-gf-icon-box { background: #2d2d2d; }

        .hq-gf-form-preview {
          background: white;
          border-radius: 12px;
          border: 1px solid var(--hq-border);
          border-top: 10px solid var(--hq-accent);
          padding: 32px;
          margin-bottom: 60px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
        }
        :global(.dark) .hq-gf-form-preview { background: #282828; }

        .hq-gf-features {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 60px;
        }

        .hq-gf-feat-row {
          display: flex;
          gap: 24px;
          align-items: center;
          padding: 24px;
          background: white;
          border: 1px solid var(--hq-border);
          border-radius: 12px;
        }
        :global(.dark) .hq-gf-feat-row { background: #282828; }

        .hq-gf-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--hq-accent-glow);
          color: var(--hq-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
      
        
        /* GLOBAL MOBILE FIXES */
        @media (max-width: 768px) {
          /* General Container fixes */
          .hq-container { padding: 0 16px !important; gap: 24px !important; }
          
          /* Phone/Player Mockups scaling (TikTok, Snapchat, WhatsApp, YouTube, etc.) */
          [class*="-phone"], [class*="-player"] {
            width: 100% !important;
            max-width: 320px !important;
            height: auto !important;
            min-height: 480px !important;
            aspect-ratio: 9/18 !important;
            margin: 0 auto !important;
            flex: 1 1 auto !important;
          }
          
          /* Specific fix for YouTube player which should be 16:9 */
          .hq-yt-player { aspect-ratio: 16/9 !important; min-height: auto !important; }
          
          /* Fix Hero Padding */
          [class*="-hero"] {
            padding: 40px 0 !important;
            gap: 32px !important;
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

          /* Phase 2: PDF, App Store, WiFi, Link In Bio fixes */
          /* Fix grid column squeezing */
          [class*="bento"], [class*="features"], [class*="grid"] {
            grid-template-columns: 1fr !important;
          }
          
          /* Ensure Main containers stack vertically */
          [class*="main"], .hq-li-main {
            flex-direction: column !important;
          }

          /* Ensure text wraps nicely */
          h1, h2, h3 { line-height: 1.2 !important; word-wrap: break-word; }
        }
    
      `}</style>

      <div className="hq-gf-wrapper">
        <div className="hq-gf-header">
          <div className="hq-gf-icon-box">
            <ClipboardList size={48} />
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 500, marginBottom: 16 }}>
            {t('landing.heroTitle', { type: t(`types.${qrType}`) })}
          </h1>
          <p style={{ fontSize: 18, color: 'var(--hq-text-muted)' }}>
            {t('landing.heroSubtitle')}
          </p>
        </div>

        <div className="hq-gf-form-preview">
          <h2 className="font-bold tracking-tighter " style={{ fontSize: 32, margin: '0 0 16px 0' }}>{getTranslation('featTools', 't', 1)}</h2>
          <p style={{ color: 'var(--hq-text-muted)', marginBottom: 32, fontSize: 16, lineHeight: 1.6 }}>{getTranslation('featTools', 'd', 1)}</p>
          
          <div style={{ marginBottom: 24 }}>
            <div style={{ height: 16, width: '40%', background: 'var(--hq-border)', borderRadius: 4, marginBottom: 12 }}></div>
            <div style={{ height: 48, width: '100%', border: '1px solid var(--hq-border)', borderRadius: 4 }}></div>
          </div>
          <div style={{ marginBottom: 32 }}>
            <div style={{ height: 16, width: '60%', background: 'var(--hq-border)', borderRadius: 4, marginBottom: 12 }}></div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid var(--hq-border)' }}></div>
              <div style={{ height: 12, width: '30%', background: 'var(--hq-border)', borderRadius: 4 }}></div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid var(--hq-border)' }}></div>
              <div style={{ height: 12, width: '40%', background: 'var(--hq-border)', borderRadius: 4 }}></div>
            </div>
          </div>
        </div>

        <div className="hq-gf-features">
          <div className="hq-gf-feat-row">
            <div className="hq-gf-circle"><CheckCircle2 size={24} /></div>
            <div>
              <h3 className="font-bold tracking-tighter " style={{ fontSize: 20,  margin: '0 0 8px 0' }}>{getTranslation('featTools', 't', 2)}</h3>
              <p style={{ margin: 0, color: 'var(--hq-text-muted)', lineHeight: 1.5 }}>{getTranslation('featTools', 'd', 2)}</p>
            </div>
          </div>
          <div className="hq-gf-feat-row">
            <div className="hq-gf-circle"><Share2 size={24} /></div>
            <div>
              <h3 className="font-bold tracking-tighter " style={{ fontSize: 20,  margin: '0 0 8px 0' }}>{getTranslation('featTools', 't', 3)}</h3>
              <p style={{ margin: 0, color: 'var(--hq-text-muted)', lineHeight: 1.5 }}>{getTranslation('featTools', 'd', 3)}</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 80 }}>
          <h2 className="font-bold tracking-tighter " style={{ paddingTop: 60, fontSize: 28,  textAlign: 'center', marginBottom: 40 }}>{t('landing.faqTitle')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = getTranslation('faqTools', 'q', num);
              const a = getTranslation('faqTools', 'a', num);
              if (!q) return null;
              return (
                <div key={i} style={{ background: 'white', border: '1px solid var(--hq-border)', borderRadius: 8, overflow: 'hidden' }}>
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}
                  >
                    <span style={{ fontSize: 16, fontWeight: 500 }}>{q}</span>
                    <ChevronDown size={20} style={{ color: 'var(--hq-text-muted)', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </button>
                  <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                    <p style={{ padding: '0 24px 24px 24px', margin: 0, color: 'var(--hq-text-muted)', fontSize: 15, lineHeight: 1.6 }}>{a}</p>
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

export default LayoutGoogleForms;
