import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Star, Package, TrendingUp, ChevronDown, CheckCircle2 } from 'lucide-react';

function LayoutAmazon({ qrType = 'amazon' }) {
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
    <div className="hq-layout-amazon">
      <style>{`
        .hq-layout-amazon {
          --hq-bg: #f8f9fa;
          --hq-text: #0f1111;
          --hq-text-muted: #565959;
          --hq-border: #d5d9d9;
          --hq-accent: #ff9900; /* Amazon Orange */
          --hq-blue: #007185;
          font-family: var(--font-main);
          background: var(--hq-bg);
          color: var(--hq-text);
          min-height: 100vh;
          padding: 80px 24px;
        }

        :global(.dark) .hq-layout-amazon {
          --hq-bg: #131921; /* Amazon Dark Nav */
          --hq-text: #ffffff;
          --hq-text-muted: #cccccc;
          --hq-border: #3a4553;
          --hq-blue: #48a3c6;
        }

        .hq-amz-wrapper {
          max-width: 1100px;
          margin: 0 auto;
        }

        .hq-amz-hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 64px;
        }

        .hq-amz-icon {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          background: white;
          border: 2px solid var(--hq-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          box-shadow: 0 10px 30px rgba(255, 153, 0, 0.2);
        }
        :global(.dark) .hq-amz-icon { background: #232f3e; }

        .hq-amz-bento {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 64px;
        }

        .hq-amz-card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          border: 1px solid var(--hq-border);
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          transition: transform 0.2s;
        }
        :global(.dark) .hq-amz-card { background: #232f3e; border-color: #3a4553; }
        
        .hq-amz-card:hover { transform: translateY(-4px); }

        .hq-amz-product-mock {
          display: flex;
          gap: 16px;
          align-items: center;
          padding: 16px;
          background: var(--hq-bg);
          border-radius: 8px;
          margin-top: 24px;
        }

        .hq-amz-prod-img {
          width: 64px;
          height: 64px;
          background: #e7e9ec;
          border-radius: 8px;
        }
        :global(.dark) .hq-amz-prod-img { background: #131921; }

        .hq-amz-btn {
          width: 100%;
          padding: 12px;
          background: #ffd814;
          border-radius: 100px;
          text-align: center;
          font-weight: 500;
          color: #0f1111;
          margin-top: 16px;
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
          
          /* Ensure text wraps nicely */
          h1, h2, h3 { line-height: 1.2 !important; word-wrap: break-word; }
        }
    
      `}</style>

      <div className="hq-amz-wrapper">
        <div className="hq-amz-hero">
          <div className="hq-amz-icon">
            <ShoppingCart size={40} color="var(--hq-text)" />
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: 20 }}>
            {t('landing.heroTitle', { type: t(`types.${qrType}`) })}
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2.5vw, 20px)', color: 'var(--hq-text-muted)', maxWidth: 600 }}>
            {t('landing.heroSubtitle')}
          </p>
        </div>

        <div className="hq-amz-bento">
          <div className="hq-amz-card" style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <TrendingUp size={28} color="var(--hq-accent)" />
              <h2 className="font-bold tracking-tighter " style={{ fontSize: 24,  margin: 0 }}>{getTranslation('featTools', 't', 1)}</h2>
            </div>
            <p style={{ fontSize: 16, color: 'var(--hq-text-muted)', lineHeight: 1.6 }}>{getTranslation('featTools', 'd', 1)}</p>
            
            <div className="hq-amz-product-mock">
              <div className="hq-amz-prod-img"></div>
              <div style={{ flex: 1 }}>
                <div style={{ height: 16, width: '80%', background: 'var(--hq-blue)', borderRadius: 4, marginBottom: 8 }}></div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
                  {[1,2,3,4,5].map(i => <Star key={i} size={14} color="var(--hq-accent)" fill="var(--hq-accent)" />)}
                  <span style={{ fontSize: 12, color: 'var(--hq-blue)', marginLeft: 8 }}>4,281</span>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>$29.99</div>
              </div>
            </div>
            <div className="hq-amz-btn">Buy Now on Amazon</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="hq-amz-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Package size={28} color="var(--hq-blue)" style={{ marginBottom: 12 }} />
              <h3 className="font-bold tracking-tighter " style={{ fontSize: 18,  marginBottom: 8 }}>{getTranslation('featTools', 't', 2)}</h3>
              <p style={{ fontSize: 14, color: 'var(--hq-text-muted)', lineHeight: 1.5, margin: 0 }}>{getTranslation('featTools', 'd', 2)}</p>
            </div>
            <div className="hq-amz-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <CheckCircle2 size={28} color="#059669" style={{ marginBottom: 12 }} />
              <h3 className="font-bold tracking-tighter " style={{ fontSize: 18,  marginBottom: 8 }}>{getTranslation('featTools', 't', 3)}</h3>
              <p style={{ fontSize: 14, color: 'var(--hq-text-muted)', lineHeight: 1.5, margin: 0 }}>{getTranslation('featTools', 'd', 3)}</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 80, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
          <h2 className="font-bold tracking-tighter " style={{ paddingTop: 60, fontSize: 28,  textAlign: 'center', marginBottom: 40 }}>{t('landing.faqTitle')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = getTranslation('faqTools', 'q', num);
              const a = getTranslation('faqTools', 'a', num);
              if (!q) return null;
              return (
                <div key={i} style={{ background: 'transparent', borderBottom: '1px solid var(--hq-border)' }}>
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}
                  >
                    <span style={{ fontSize: 16, fontWeight: 600 }}>{q}</span>
                    <ChevronDown size={20} style={{ color: 'var(--hq-text-muted)', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </button>
                  <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                    <p style={{ padding: '0 0 20px 0', margin: 0, color: 'var(--hq-text-muted)', fontSize: 15, lineHeight: 1.6 }}>{a}</p>
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

export default LayoutAmazon;
