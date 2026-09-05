import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Wifi, ShieldCheck, Zap, ChevronDown, CheckCircle2 } from 'lucide-react';

function LayoutWiFiCafe({ qrType = 'wificafe', pseoUseCase = null }) {
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
    <div className="hq-layout-wifi">
      <style>{`
        .hq-layout-wifi {
          background-color: var(--hq-bg);
          color: var(--hq-text);
          font-family: 'Inter', system-ui, sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .hq-wifi-hero-section {
          position: relative;
          padding: 120px 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 50% -20%, var(--hq-accent-glow), transparent 60%);
        }

        .hq-glass-card {
          position: relative;
          z-index: 10;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 32px;
          padding: 64px 48px;
          max-width: 800px;
          text-align: center;
          box-shadow: 0 32px 64px -16px rgba(0,0,0,0.2);
        }

        /* Adjust colors slightly if light mode to make glass work */
        @media (prefers-color-scheme: light) {
          .hq-glass-card {
            background: rgba(255, 255, 255, 0.7);
            border: 1px solid rgba(0, 0, 0, 0.05);
            box-shadow: 0 32px 64px -16px rgba(0,0,0,0.05);
          }
        }

        .hq-wifi-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: var(--hq-accent);
          color: white;
          border-radius: 100px;
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 32px;
        }

        .hq-wifi-features {
          max-width: 1200px;
          margin: -40px auto 120px auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          position: relative;
          z-index: 20;
        }

        .hq-wifi-feat-card {
          background: var(--hq-bg);
          border: 1px solid var(--hq-border);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 16px 32px -16px rgba(0,0,0,0.1);
        }

        @media (max-width: 768px) {
          .hq-glass-card {
            padding: 40px 24px;
          }
          .hq-wifi-features {
            grid-template-columns: 1fr;
            margin-top: 24px;
          }
        }
      `}</style>

      <div className="hq-wifi-hero-section">
        <div className="hq-glass-card">
          <div className="hq-wifi-badge">
            <Wifi size={16} /> {getTranslation('badge', '', '') || 'For Cafes & Hotels'}
          </div>
          <h2 className="font-bold tracking-tighter" style={{ fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.1, marginBottom: 24 }}>
            {getUcText('h1Title') || getTranslation('hero', 'Title', '') || 'WiFi QR Code for Cafes & Hotels'}
          </h2>
          <p style={{ fontSize: 'clamp(18px, 2.5vw, 20px)', color: 'var(--hq-text-muted)', lineHeight: 1.6, maxWidth: 600, margin: '0 auto' }}>
            {getUcText('seoDesc') || getTranslation('hero', 'Subtitle', '') || 'Let your guests connect to your WiFi network instantly without typing passwords. Generate a free WiFi QR code for your cafe or hotel.'}
          </p>
        </div>
      </div>

      <div className="hq-wifi-features">
        {[
          { icon: <Zap size={32} />, id: 1, fbT: 'Instant Connection', fbD: 'Guests just scan the code and their device automatically joins the network. No frustrating password typos.' },
          { icon: <ShieldCheck size={32} />, id: 2, fbT: 'Secure & Private', fbD: 'Your password is never sent to our servers. It is embedded directly and safely into the QR code pattern locally.' },
          { icon: <CheckCircle2 size={32} />, id: 3, fbT: 'Works on All Devices', fbD: 'Modern iOS and Android smartphones natively support connecting to WiFi networks via QR code.' }
        ].map((feat) => {
          const tTitle = getTranslation('feat', 'Title', feat.id) || feat.fbT;
          const tDesc = getTranslation('feat', 'Desc', feat.id) || feat.fbD;
          
          return (
            <div key={feat.id} className="hq-wifi-feat-card">
              <div style={{ width: 64, height: 64, borderRadius: 16, background: 'var(--hq-accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, color: 'var(--hq-accent)' }}>
                {feat.icon}
              </div>
              <h3 className="font-bold tracking-tighter" style={{ fontSize: 24, marginBottom: 12 }}>{tTitle}</h3>
              <p style={{ color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{tDesc}</p>
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

export default LayoutWiFiCafe;
