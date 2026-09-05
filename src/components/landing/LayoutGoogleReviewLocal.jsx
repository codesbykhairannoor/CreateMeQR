import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, MapPin, ThumbsUp, ChevronDown, CheckCircle2 } from 'lucide-react';

function LayoutGoogleReviewLocal({ qrType = 'googlereviewlocal', pseoUseCase = null }) {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);

  const translate = (key) => {
    const translation = t(key);
    return translation === key ? null : translation;
  };

  const getTranslation = (type, key, suffix) => {
    return translate(`pseo.${qrType}.${type}${key}${suffix}`);
  };

  // Safe getter from pseoUseCase
  const getUcText = (field) => pseoUseCase ? pseoUseCase[field] : null;

  return (
    <div className="hq-layout-review">
      <style>{`
        .hq-layout-review {
          background-color: var(--hq-bg);
          color: var(--hq-text);
          font-family: 'Inter', system-ui, sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .hq-review-hero {
          max-width: 1200px;
          margin: 0 auto;
          padding: 120px 24px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }

        .hq-review-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #fbbc04; /* Google Yellow */
          color: #000;
          border-radius: 100px;
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .hq-review-visual {
          position: relative;
        }

        .hq-review-card {
          background: var(--hq-bg);
          border: 1px solid var(--hq-border);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 32px 64px -16px rgba(0,0,0,0.1);
          transform: rotate(2deg);
        }

        .hq-stars {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          justify-content: center;
        }

        .hq-star {
          color: #fbbc04;
          fill: #fbbc04;
        }

        .hq-review-features {
          max-width: 1000px;
          margin: 0 auto 120px auto;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .hq-review-feat-row {
          display: flex;
          align-items: center;
          gap: 32px;
          background: var(--hq-bg);
          border: 1px solid var(--hq-border);
          border-radius: 24px;
          padding: 32px;
          transition: transform 0.3s ease;
        }

        .hq-review-feat-row:hover {
          transform: scale(1.02);
          border-color: var(--hq-accent);
        }

        @media (max-width: 992px) {
          .hq-review-hero {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hq-review-card {
            transform: none;
            max-width: 400px;
            margin: 0 auto;
          }
          .hq-review-feat-row {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      <div className="hq-review-hero">
        <div>
          <div className="hq-review-badge">
            <Star size={16} className="hq-star" style={{ color: '#000', fill: '#000' }} /> {getTranslation('badge', '', '') || 'For Local Businesses'}
          </div>
          <h2 className="font-bold tracking-tighter" style={{ fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 1.1, marginBottom: 24 }}>
            {getUcText('h1Title') || getTranslation('hero', 'Title', '') || 'Google Review QR Code for Local Business'}
          </h2>
          <p style={{ fontSize: 'clamp(18px, 2.5vw, 20px)', color: 'var(--hq-text-muted)', lineHeight: 1.6, marginBottom: 32 }}>
            {getUcText('seoDesc') || getTranslation('hero', 'Subtitle', '') || 'Boost your local SEO by collecting 5-star Google Reviews effortlessly. Generate a QR code that sends customers straight to your review page.'}
          </p>
        </div>

        <div className="hq-review-visual">
          <div className="hq-review-card">
            <div className="hq-stars">
              <Star size={48} className="hq-star" />
              <Star size={48} className="hq-star" />
              <Star size={48} className="hq-star" />
              <Star size={48} className="hq-star" />
              <Star size={48} className="hq-star" />
            </div>
            <div style={{ height: 16, background: 'var(--hq-border)', borderRadius: 8, marginBottom: 16, width: '100%' }}></div>
            <div style={{ height: 16, background: 'var(--hq-border)', borderRadius: 8, marginBottom: 16, width: '80%', margin: '0 auto' }}></div>
            <div style={{ height: 16, background: 'var(--hq-border)', borderRadius: 8, width: '60%', margin: '0 auto' }}></div>
          </div>
        </div>
      </div>

      <div className="hq-review-features">
        {[
          { icon: <MapPin size={40} />, id: 1, fbT: 'Local SEO Boost', fbD: 'More 5-star reviews directly improve your ranking on Google Maps and Local Pack search results.' },
          { icon: <ThumbsUp size={40} />, id: 2, fbT: 'Frictionless Experience', fbD: 'Customers don\'t have to search for your business manually. The QR code opens your Google Review modal instantly.' },
          { icon: <CheckCircle2 size={40} />, id: 3, fbT: 'Print Anywhere', fbD: 'Export in high-resolution vector SVG to print on receipts, table tents, business cards, or storefront windows.' }
        ].map((feat, index) => {
          const tTitle = getTranslation('feat', 'Title', feat.id) || feat.fbT;
          const tDesc = getTranslation('feat', 'Desc', feat.id) || feat.fbD;
          
          return (
            <div key={feat.id} className="hq-review-feat-row" style={{ flexDirection: index % 2 !== 0 ? 'row-reverse' : 'row' }}>
              <div style={{ width: 96, height: 96, minWidth: 96, borderRadius: 24, background: 'var(--hq-accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--hq-accent)' }}>
                {feat.icon}
              </div>
              <div>
                <h3 className="font-bold tracking-tighter" style={{ fontSize: 24, marginBottom: 12 }}>{tTitle}</h3>
                <p style={{ color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{tDesc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto 120px auto', padding: '0 24px' }}>
        <h2 className="font-bold tracking-tighter" style={{ fontSize: 'clamp(32px, 5vw, 48px)', textAlign: 'center', marginBottom: 48 }}>
          {getTranslation('faq', 'Title', '') || 'Common Questions'}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {pseoUseCase && pseoUseCase.faqs ? (
            pseoUseCase.faqs.map((faq, i) => (
              <div key={i} style={{ background: 'var(--hq-bg)', border: '1px solid var(--hq-border)', borderRadius: 16, overflow: 'hidden' }}>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}
                >
                  <span className="font-bold tracking-tighter" style={{ fontSize: 20 }}>{faq.q}</span>
                  <ChevronDown size={24} style={{ color: 'var(--hq-text-muted)', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                  <p style={{ padding: '0 24px 24px 24px', margin: 0, color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{faq.a}</p>
                </div>
              </div>
            ))
          ) : (
            [1, 2, 3, 4, 5].map((num, i) => {
              const q = getTranslation('faq', 'Q', num);
              const a = getTranslation('faq', 'A', num);
              if (!q) return null;
              return (
                <div key={i} style={{ background: 'var(--hq-bg)', border: '1px solid var(--hq-border)', borderRadius: 16, overflow: 'hidden' }}>
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}
                  >
                    <span className="font-bold tracking-tighter" style={{ fontSize: 20 }}>{q}</span>
                    <ChevronDown size={24} style={{ color: 'var(--hq-text-muted)', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </button>
                  <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                    <p style={{ padding: '0 24px 24px 24px', margin: 0, color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{a}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default LayoutGoogleReviewLocal;
