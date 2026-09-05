import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Utensils, Smartphone, ChevronDown, CheckCircle2, FileText, QrCode } from 'lucide-react';

function LayoutRestaurantMenu({ qrType = 'restaurantmenu', pseoUseCase = null }) {
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
    <div className="hq-layout-menu">
      <style>{`
        .hq-layout-menu {
          --hq-bg: #fffbf5;
          --hq-text: #1a1a1a;
          --hq-text-muted: #666666;
          --hq-border: #f0e6d2;
          --hq-accent: #d35400; /* Warm restaurant accent */
          --hq-accent-glow: rgba(211, 84, 0, 0.08);
          font-family: var(--font-main);
          background: var(--hq-bg);
          color: var(--hq-text);
          min-height: 100vh;
          padding: 80px 24px;
          overflow: hidden;
        }

        :global(.dark) .hq-layout-menu {
          --hq-bg: #0f0a05;
          --hq-text: #f5f5f5;
          --hq-text-muted: #a0a0a0;
          --hq-border: #2a2015;
          --hq-accent: #e67e22;
          --hq-accent-glow: rgba(230, 126, 34, 0.15);
        }

        .hq-menu-hero {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          margin-bottom: 120px;
        }

        .hq-menu-mockup-wrap {
          position: relative;
          display: flex;
          justify-content: center;
          perspective: 1000px;
        }

        .hq-menu-mockup {
          width: 380px;
          height: 520px;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.1), 0 0 0 1px var(--hq-border);
          padding: 40px;
          transform: rotateY(-10deg) rotateX(5deg);
          transition: transform 0.5s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        :global(.dark) .hq-menu-mockup {
          background: #1a1a1a;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px var(--hq-border);
        }

        .hq-menu-mockup:hover {
          transform: rotateY(0deg) rotateX(0deg);
        }

        .hq-menu-line { width: 100%; height: 8px; background: var(--hq-border); border-radius: 4px; margin-bottom: 16px; }
        .hq-menu-line.short { width: 60%; }
        .hq-menu-line.title { height: 24px; width: 80%; background: var(--hq-accent-glow); margin-bottom: 32px; }
        
        .hq-menu-qr-box {
          width: 160px;
          height: 160px;
          background: var(--hq-border);
          border-radius: 16px;
          margin: auto 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hq-menu-features {
          max-width: 1200px;
          margin: 0 auto 120px auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .hq-menu-feat-card {
          background: transparent;
          border: 1px solid var(--hq-border);
          border-radius: 24px;
          padding: 40px;
          transition: all 0.3s ease;
        }

        .hq-menu-feat-card:hover {
          background: var(--hq-accent-glow);
          border-color: var(--hq-accent);
          transform: translateY(-4px);
        }

        @media (max-width: 992px) {
          .hq-menu-hero { grid-template-columns: 1fr; text-align: center; }
          .hq-menu-features { grid-template-columns: 1fr; }
          .hq-menu-mockup { transform: none; width: 100%; max-width: 380px; }
          .hq-menu-mockup-wrap { margin-top: 40px; }
        }
      `}</style>

      <div className="hq-menu-hero">
        <div>
          <div style={{ display: 'inline-flex', padding: '8px 16px', background: 'var(--hq-accent-glow)', borderRadius: 100, color: 'var(--hq-accent)', fontWeight: 700, fontSize: '14px', marginBottom: 24, alignItems: 'center', gap: 8 }}>
            <Utensils size={16} /> {getTranslation('badge', '', '') || 'For Restaurants & Cafes'}
          </div>
          <h2 className="font-bold tracking-tighter" style={{ fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 1.1, marginBottom: 24 }}>
            {getUcText('h1Title') || getTranslation('hero', 'Title', '') || 'QR Code Generator for Restaurant Menu PDF'}
          </h2>
          <p style={{ fontSize: 'clamp(18px, 2.5vw, 20px)', color: 'var(--hq-text-muted)', lineHeight: 1.6, marginBottom: 32 }}>
            {getUcText('seoDesc') || getTranslation('hero', 'Subtitle', '') || 'Create a contactless digital menu for your restaurant instantly. Upload your PDF and generate an editable QR code that never expires.'}
          </p>
        </div>

        <div className="hq-menu-mockup-wrap">
          <div className="hq-menu-mockup">
            <div className="hq-menu-line title"></div>
            <div className="hq-menu-line"></div>
            <div className="hq-menu-line"></div>
            <div className="hq-menu-line short"></div>
            
            <div className="hq-menu-qr-box">
              <QrCode size={64} style={{ color: 'var(--hq-text-muted)', opacity: 0.5 }} />
            </div>
            
            <div className="hq-menu-line"></div>
            <div className="hq-menu-line short"></div>
          </div>
        </div>
      </div>

      <div className="hq-menu-features">
        {[
          { icon: <FileText size={32} />, id: 1, fbT: 'Contactless Menus', fbD: 'Ensure safety and convenience for your guests with touch-free digital menus.' },
          { icon: <Smartphone size={32} />, id: 2, fbT: 'Mobile Optimized', fbD: 'Your uploaded PDF is beautifully presented and easy to read on any smartphone.' },
          { icon: <CheckCircle2 size={32} />, id: 3, fbT: 'Easy to Update', fbD: 'Update your seasonal menu items without ever needing to reprint the QR codes on your tables.' }
        ].map((feat) => {
          const tTitle = getTranslation('feat', 'Title', feat.id) || feat.fbT;
          const tDesc = getTranslation('feat', 'Desc', feat.id) || feat.fbD;
          
          return (
            <div key={feat.id} className="hq-menu-feat-card">
              <div style={{ width: 64, height: 64, borderRadius: 16, background: 'var(--hq-bg)', border: '1px solid var(--hq-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, color: 'var(--hq-accent)' }}>
                {feat.icon}
              </div>
              <h3 className="font-bold tracking-tighter" style={{ fontSize: 24, marginBottom: 12 }}>{tTitle}</h3>
              <p style={{ color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{tDesc}</p>
            </div>
          );
        })}
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto' }}>
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

export default LayoutRestaurantMenu;
