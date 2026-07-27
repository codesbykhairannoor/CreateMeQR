import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarDays, Clock, Users, ArrowRight, ChevronDown, Check } from 'lucide-react';

function LayoutBooking({ qrType = 'booking' }) {
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
    <div className="hq-layout-booking">
      <style>{`
        .hq-layout-booking {
          --hq-bg: #ffffff;
          --hq-text: #09090b;
          --hq-text-muted: #71717a;
          --hq-border: #e4e4e7;
          --hq-accent: #10b981; /* Emerald Green */
          font-family: -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Display", "Helvetica Neue", sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          min-height: 100vh;
          padding: 80px 24px;
        }

        :global(.dark) .hq-layout-booking {
          --hq-bg: #09090b;
          --hq-text: #fafafa;
          --hq-text-muted: #a1a1aa;
          --hq-border: #27272a;
        }

        .hq-bk-wrapper {
          max-width: 900px;
          margin: 0 auto;
        }

        .hq-bk-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .hq-bk-icon {
          width: 80px;
          height: 80px;
          background: var(--hq-text);
          color: var(--hq-bg);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px auto;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .hq-bk-container {
          background: var(--hq-bg);
          border: 1px solid var(--hq-border);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
          margin-bottom: 64px;
        }

        .hq-bk-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .hq-bk-mock-cal {
          border: 1px solid var(--hq-border);
          border-radius: 16px;
          padding: 24px;
        }
        
        .hq-bk-day {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          font-size: 14px;
        }
        .hq-bk-day.active {
          background: var(--hq-text);
          color: var(--hq-bg);
        }

        .hq-bk-slot {
          padding: 12px;
          border: 1px solid var(--hq-border);
          border-radius: 8px;
          text-align: center;
          font-weight: 500;
          margin-bottom: 8px;
        }
        .hq-bk-slot.active {
          border-color: var(--hq-accent);
          color: var(--hq-accent);
          background: rgba(16, 185, 129, 0.1);
        }

        .hq-bk-feat-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .hq-bk-feat {
          display: flex;
          gap: 16px;
        }

        .hq-bk-feat svg {
          color: var(--hq-accent);
          flex-shrink: 0;
          margin-top: 4px;
        }
      `}</style>

      <div className="hq-bk-wrapper">
        <div className="hq-bk-header">
          <div className="hq-bk-icon">
            <CalendarDays size={40} />
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: 16 }}>
            {t('landing.heroTitle', { type: t(`types.${qrType}`) })}
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--hq-text-muted)', maxWidth: 600, margin: '0 auto' }}>
            {t('landing.heroSubtitle')}
          </p>
        </div>

        <div className="hq-bk-container">
          <div className="hq-bk-grid">
            <div className="hq-bk-mock-cal">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div style={{ fontWeight: 600, fontSize: 18 }}>Select Date</div>
                <div style={{ color: 'var(--hq-text-muted)' }}>October</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                <div className="hq-bk-day">14</div>
                <div className="hq-bk-day active">15</div>
                <div className="hq-bk-day">16</div>
                <div className="hq-bk-day">17</div>
                <div className="hq-bk-day">18</div>
              </div>
              
              <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 16 }}>Available Times</div>
              <div className="hq-bk-slot">09:00 AM</div>
              <div className="hq-bk-slot active">10:30 AM</div>
              <div className="hq-bk-slot">02:00 PM</div>
              
              <div style={{ marginTop: 24, padding: 16, background: 'var(--hq-text)', color: 'var(--hq-bg)', borderRadius: 8, textAlign: 'center', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                Confirm Booking <ArrowRight size={18} />
              </div>
            </div>

            <div className="hq-bk-feat-list">
              <div>
                <h2 className="font-bold tracking-tighter " style={{ fontSize: 24,  marginBottom: 24 }}>{getTranslation('featTools', 't', 1)}</h2>
                <p style={{ color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{getTranslation('featTools', 'd', 1)}</p>
              </div>
              
              <div className="hq-bk-feat">
                <Check size={24} />
                <div>
                  <h3 className="font-bold tracking-tighter " style={{ fontSize: 18,  marginBottom: 4 }}>{getTranslation('featTools', 't', 2)}</h3>
                  <p style={{ margin: 0, color: 'var(--hq-text-muted)', fontSize: 14, lineHeight: 1.5 }}>{getTranslation('featTools', 'd', 2)}</p>
                </div>
              </div>
              <div className="hq-bk-feat">
                <Check size={24} />
                <div>
                  <h3 className="font-bold tracking-tighter " style={{ fontSize: 18,  marginBottom: 4 }}>{getTranslation('featTools', 't', 3)}</h3>
                  <p style={{ margin: 0, color: 'var(--hq-text-muted)', fontSize: 14, lineHeight: 1.5 }}>{getTranslation('featTools', 'd', 3)}</p>
                </div>
              </div>
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
                <div key={i} style={{ borderBottom: '1px solid var(--hq-border)' }}>
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}
                  >
                    <span style={{ fontSize: 18, fontWeight: 600 }}>{q}</span>
                    <ChevronDown size={20} style={{ color: 'var(--hq-text-muted)', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
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

export default LayoutBooking;
