import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileUp, CloudDownload, ShieldCheck, Lock, ChevronDown, CheckCircle2 } from 'lucide-react';

function LayoutFile({ qrType = 'file' }) {
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
    <div className="hq-layout-file">
      <style>{`
        .hq-layout-file {
          --hq-bg: #f0f4f8; /* Soft slate/blue background */
          --hq-text: #1e293b;
          --hq-text-muted: #64748b;
          --hq-border: #cbd5e1;
          --hq-accent: #2563eb; /* Primary Blue */
          font-family: var(--font-main);
          background: var(--hq-bg);
          color: var(--hq-text);
          min-height: 100vh;
          padding: 80px 24px;
        }

        :global(.dark) .hq-layout-file {
          --hq-bg: #0f172a;
          --hq-text: #f8fafc;
          --hq-text-muted: #94a3b8;
          --hq-border: #334155;
          --hq-accent: #3b82f6;
        }

        .hq-file-wrapper {
          max-width: 900px;
          margin: 0 auto;
        }

        .hq-file-hero {
          text-align: center;
          margin-bottom: 64px;
        }
        
        .hq-file-icon {
          width: 88px;
          height: 88px;
          background: var(--hq-accent);
          color: white;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px auto;
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
        }

        .hq-file-box {
          background: white;
          border-radius: 24px;
          padding: 48px;
          border: 1px solid var(--hq-border);
          box-shadow: 0 4px 24px rgba(0,0,0,0.03);
          margin-bottom: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }
        :global(.dark) .hq-file-box { background: #1e293b; }

        .hq-file-mock {
          flex: 1;
          background: var(--hq-bg);
          border-radius: 16px;
          padding: 24px;
          border: 1px dashed var(--hq-border);
          text-align: center;
        }

        .hq-file-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: var(--hq-accent);
          color: white;
          border-radius: 8px;
          font-weight: 500;
          margin-top: 16px;
        }

        .hq-file-features {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        
        .hq-file-feat {
          display: flex;
          gap: 16px;
          padding: 32px;
          background: white;
          border-radius: 16px;
          border: 1px solid var(--hq-border);
        }
        :global(.dark) .hq-file-feat { background: #1e293b; }

        .hq-file-feat svg { color: var(--hq-accent); flex-shrink: 0; }
      
        
        
              
        /* STRICTLY SCOPED MOBILE FIXES (Phase 4) */
        @media (max-width: 768px) {
          /* General Container fixes */
          .hq-layout-file .hq-container { padding: 0 16px !important; gap: 24px !important; }
          
          /* Phone/Player Mockups scaling */
          .hq-layout-file div[class*="-phone"], .hq-layout-file div[class*="-player"], .hq-layout-file div[class*="-mockup"], .hq-layout-file div[class*="-mock"] {
            width: 100% !important;
            max-width: 320px !important;
            height: auto !important;
            min-height: 400px !important;
            margin: 0 auto !important;
            flex: 1 1 auto !important;
          }
          
          /* Ensure tall mockups stay in ratio */
          .hq-layout-file div[class*="-phone"] { aspect-ratio: 9/18 !important; }
          
          /* Specific fix for YouTube player which should be 16:9 */
          .hq-layout-file div.hq-yt-player { aspect-ratio: 16/9 !important; min-height: auto !important; }
          
          /* Fix Hero Padding */
          .hq-layout-file div[class*="-hero"] {
            padding: 40px 0 !important;
            gap: 32px !important;
            display: flex !important;
            flex-direction: column !important;
          }
          
          /* Fix LinkedIn & Profile Avatars Overlap */
          .hq-layout-file div.hq-li-avatar, .hq-layout-file div[class*="-avatar"] {
            width: 80px !important;
            height: 80px !important;
            top: -40px !important;
          }
          .hq-layout-file div.hq-li-profile-info, .hq-layout-file div[class*="-profile-info"] {
            margin-top: 50px !important;
          }
          .hq-layout-file div.hq-li-cover { height: 100px !important; }
          
          /* Fix Inline Grids (URL, WiFi, etc) that don't use CSS classes */
          .hq-layout-file div[style*="gridTemplateColumns"] {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
          }
          .hq-layout-file div[style*="gridColumn:"] {
            width: 100% !important;
            grid-column: span 1 !important;
          }
          
          /* Fix Inline Flex Rows (URL steps) */
          .hq-layout-file div[style*="flexDirection: 'row'"], .hq-layout-file div[style*="flex-direction: row"] {
            flex-direction: column !important;
          }

          /* Fix grid column squeezing for ALL bento, features, and grid classes */
          .hq-layout-file div[class*="-bento"], .hq-layout-file div[class*="-features"], .hq-layout-file div[class*="-grid"], .hq-layout-file div[class*="-row"], .hq-layout-file div[class*="bento"], .hq-layout-file div[class*="features"] {
            display: flex !important;
            flex-direction: column !important;
          }
          
          /* Ensure ALL Main and Wrapper containers stack vertically */
          .hq-layout-file div[class*="-main"], .hq-layout-file div[class*="-wrapper"], .hq-layout-file div[class*="main"] {
            display: flex !important;
            flex-direction: column !important;
          }

          /* Ensure text wraps nicely */
          .hq-layout-file h1, .hq-layout-file h2, .hq-layout-file h3 { line-height: 1.2 !important; word-wrap: break-word; }
        }
    
      `}</style>

      <div className="hq-file-wrapper">
        <div className="hq-file-hero">
          <div className="hq-file-icon">
            <FileUp size={40} />
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: 16 }}>
            {t('landing.heroTitle', { type: t(`types.${qrType}`) })}
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--hq-text-muted)', maxWidth: 600, margin: '0 auto' }}>
            {t('landing.heroSubtitle')}
          </p>
        </div>

        <div className="hq-file-box">
          <div style={{ flex: 1 }}>
            <h2 className="font-bold tracking-tighter " style={{ fontSize: 28,  marginBottom: 16 }}>{getTranslation('featTools', 't', 1)}</h2>
            <p style={{ color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{getTranslation('featTools', 'd', 1)}</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24, color: 'var(--hq-text-muted)', fontSize: 14 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Lock size={16} /> Secure connection</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><ShieldCheck size={16} /> 256-bit encryption</span>
            </div>
          </div>
          <div className="hq-file-mock">
            <FileUp size={48} color="var(--hq-text-muted)" style={{ margin: '0 auto 16px auto' }} />
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 4 }}>Q3_Financial_Report.xlsx</div>
            <div style={{ color: 'var(--hq-text-muted)', fontSize: 14 }}>2.4 MB</div>
            <div className="hq-file-btn"><CloudDownload size={20} /> Download File</div>
          </div>
        </div>

        <div className="hq-file-features">
          <div className="hq-file-feat">
            <CheckCircle2 size={32} />
            <div>
              <h3 className="font-bold tracking-tighter " style={{ fontSize: 20,  marginBottom: 8 }}>{getTranslation('featTools', 't', 2)}</h3>
              <p style={{ margin: 0, color: 'var(--hq-text-muted)', fontSize: 15, lineHeight: 1.5 }}>{getTranslation('featTools', 'd', 2)}</p>
            </div>
          </div>
          <div className="hq-file-feat">
            <ShieldCheck size={32} />
            <div>
              <h3 className="font-bold tracking-tighter " style={{ fontSize: 20,  marginBottom: 8 }}>{getTranslation('featTools', 't', 3)}</h3>
              <p style={{ margin: 0, color: 'var(--hq-text-muted)', fontSize: 15, lineHeight: 1.5 }}>{getTranslation('featTools', 'd', 3)}</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 80, paddingBottom: 80 }}>
          <h2 className="font-bold tracking-tighter " style={{ paddingTop: 60, fontSize: 28,  textAlign: 'center', marginBottom: 40 }}>{t('landing.faqTitle')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = getTranslation('faqTools', 'q', num);
              const a = getTranslation('faqTools', 'a', num);
              if (!q) return null;
              return (
                <div key={i} style={{ background: 'white', borderRadius: 12, border: '1px solid var(--hq-border)' }}>
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}
                  >
                    <span style={{ fontSize: 16, fontWeight: 600 }}>{q}</span>
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

export default LayoutFile;
