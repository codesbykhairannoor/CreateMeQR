import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, MapPin, ChevronDown, MessageSquareHeart, TrendingUp } from 'lucide-react';

function LayoutGoogleReview({ qrType = 'greview' }) {
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
    <div className="hq-layout-greview">
      <style>{`
        .hq-layout-greview {
          --hq-bg: #f3f4f6;
          --hq-text: #1f2937;
          --hq-text-muted: #6b7280;
          --hq-border: #e5e7eb;
          --hq-accent: #f59e0b; /* Star Yellow */
          --hq-blue: #3b82f6;
          font-family: -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Display", "Helvetica Neue", sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          min-height: 100vh;
          padding: 80px 24px;
        }

        :global(.dark) .hq-layout-greview {
          --hq-bg: #111827;
          --hq-text: #f9fafb;
          --hq-text-muted: #9ca3af;
          --hq-border: #374151;
        }

        .hq-gr-wrapper {
          max-width: 1000px;
          margin: 0 auto;
        }

        .hq-gr-hero {
          text-align: center;
          margin-bottom: 40px;
        }

        .hq-gr-stars {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-bottom: 24px;
        }
        
        .hq-gr-star {
          color: var(--hq-accent);
          fill: var(--hq-accent);
          animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) backwards;
        }

        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .hq-gr-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin-bottom: 40px;
        }

        .hq-gr-card {
          background: white;
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.05);
          position: relative;
          overflow: hidden;
        }
        :global(.dark) .hq-gr-card { background: #1f2937; box-shadow: 0 10px 40px rgba(0,0,0,0.2); }

        .hq-gr-card-accent {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 8px;
          background: linear-gradient(90deg, #4285F4, #EA4335, #FBBC05, #34A853);
        }

        .hq-gr-review-mock {
          background: var(--hq-bg);
          border-radius: 12px;
          padding: 20px;
          margin-top: 32px;
        }

        .hq-gr-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--hq-blue);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 18px;
        }
      `}</style>

      <div className="hq-gr-wrapper">
        <div className="hq-gr-hero">
          <div className="hq-gr-stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={48} className="hq-gr-star" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, marginBottom: 24, letterSpacing: '-0.02em' }}>
            {t('landing.heroTitle', { type: t(`types.${qrType}`) })}
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--hq-text-muted)', maxWidth: 600, margin: '0 auto' }}>
            {t('landing.heroSubtitle')}
          </p>
        </div>

        <div className="hq-gr-grid">
          <div className="hq-gr-card">
            <div className="hq-gr-card-accent"></div>
            <MessageSquareHeart size={32} color="var(--hq-blue)" style={{ marginBottom: 24 }} />
            <h2 className="font-bold tracking-tighter " style={{ fontSize: 28,  marginBottom: 16 }}>{getTranslation('featTools', 't', 1)}</h2>
            <p style={{ fontSize: 16, color: 'var(--hq-text-muted)', lineHeight: 1.6 }}>{getTranslation('featTools', 'd', 1)}</p>
            
            <div className="hq-gr-review-mock">
              <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                <div className="hq-gr-avatar">J</div>
                <div>
                  <div style={{ fontWeight: 600 }}>John Doe</div>
                  <div style={{ display: 'flex', gap: 2, marginTop: 4 }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} color="var(--hq-accent)" fill="var(--hq-accent)" />)}
                  </div>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 14, color: 'var(--hq-text-muted)', fontStyle: 'italic' }}>
                "Amazing service! The QR code made it so easy to leave this review before I even left the store."
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div className="hq-gr-card" style={{ padding: 32 }}>
              <TrendingUp size={32} color="#10b981" style={{ marginBottom: 16 }} />
              <h3 className="font-bold tracking-tighter " style={{ fontSize: 22,  marginBottom: 12 }}>{getTranslation('featTools', 't', 2)}</h3>
              <p style={{ margin: 0, color: 'var(--hq-text-muted)', lineHeight: 1.5 }}>{getTranslation('featTools', 'd', 2)}</p>
            </div>
            <div className="hq-gr-card" style={{ padding: 32 }}>
              <MapPin size={32} color="#ef4444" style={{ marginBottom: 16 }} />
              <h3 className="font-bold tracking-tighter " style={{ fontSize: 22,  marginBottom: 12 }}>{getTranslation('featTools', 't', 3)}</h3>
              <p style={{ margin: 0, color: 'var(--hq-text-muted)', lineHeight: 1.5 }}>{getTranslation('featTools', 'd', 3)}</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 80, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
          <h2 className="font-bold tracking-tighter " style={{ paddingTop: 60, fontSize: 32,  textAlign: 'center', marginBottom: 48 }}>{t('landing.faqTitle')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = getTranslation('faqTools', 'q', num);
              const a = getTranslation('faqTools', 'a', num);
              if (!q) return null;
              return (
                <div key={i} style={{ background: 'var(--hq-bg)', borderRadius: 16, overflow: 'hidden' }}>
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}
                  >
                    <span style={{ fontSize: 18, fontWeight: 600 }}>{q}</span>
                    <ChevronDown size={20} style={{ color: 'var(--hq-text-muted)', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </button>
                  <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                    <p style={{ padding: '0 32px 32px 32px', margin: 0, color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{a}</p>
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

export default LayoutGoogleReview;
