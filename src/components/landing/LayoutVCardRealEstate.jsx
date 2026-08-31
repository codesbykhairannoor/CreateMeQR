import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, Phone, Briefcase, ChevronDown, CheckCircle2 } from 'lucide-react';

function LayoutVCardRealEstate({ qrType = 'vcardrealestate', pseoUseCase = null }) {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);

  const translate = (key) => {
    const translation = t(key);
    return translation === key ? null : translation;
  };

  const getTranslation = (type, key, suffix) => {
    return translate(`pseo.${qrType}.${type}${key}${suffix}`);
  };

  const getUcText = (field) => pseoUseCase ? pseoUseCase[field] : null;

  return (
    <div className="hq-layout-vcard">
      <style>{`
        .hq-layout-vcard {
          background-color: var(--hq-bg);
          color: var(--hq-text);
          font-family: 'Inter', system-ui, sans-serif;
          min-height: 100vh;
        }

        .hq-vcard-hero {
          position: relative;
          padding: 120px 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .hq-vcard-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: #000;
          color: #fff;
          border-radius: 100px;
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 32px;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .hq-biz-card {
          background: var(--hq-card-bg, #111);
          border: 1px solid var(--hq-border);
          border-radius: 16px;
          padding: 48px;
          width: 100%;
          max-width: 600px;
          margin-top: 48px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 32px 64px -16px rgba(0,0,0,0.5);
        }

        @media (prefers-color-scheme: light) {
          .hq-biz-card {
            background: #fff;
            box-shadow: 0 32px 64px -16px rgba(0,0,0,0.1);
          }
        }

        .hq-biz-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 8px;
          background: var(--hq-accent);
        }

        .hq-vcard-features {
          max-width: 1200px;
          margin: 0 auto 120px auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .hq-vcard-feat-card {
          background: var(--hq-bg);
          border: 1px solid var(--hq-border);
          border-radius: 24px;
          padding: 32px;
        }

        @media (max-width: 768px) {
          .hq-vcard-features { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="hq-vcard-hero">
        <div className="hq-vcard-badge">
          <Building2 size={16} /> {getTranslation('badge', '', '') || 'For Real Estate'}
        </div>
        <h1 className="font-bold tracking-tighter" style={{ fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.1, marginBottom: 24, textAlign: 'center', maxWidth: 800 }}>
          {getUcText('h1Title') || getTranslation('hero', 'Title', '') || 'vCard QR Code for Real Estate Agents'}
        </h1>
        <p style={{ fontSize: 'clamp(18px, 2.5vw, 20px)', color: 'var(--hq-text-muted)', lineHeight: 1.6, maxWidth: 600, textAlign: 'center' }}>
          {getUcText('seoDesc') || getTranslation('hero', 'Subtitle', '') || 'Never lose a lead again. Create a digital vCard QR code for your real estate business cards and open house brochures.'}
        </p>

        <div className="hq-biz-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--hq-border)', flexShrink: 0 }}></div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 'bold' }}>Sarah Realtor</div>
              <div style={{ color: 'var(--hq-accent)' }}>Senior Broker</div>
            </div>
          </div>
          <div style={{ display: 'grid', gap: 16, color: 'var(--hq-text-muted)' }}>
            <div style={{ display: 'flex', gap: 12 }}><Building2 size={20} /> Prime Properties Real Estate</div>
            <div style={{ display: 'flex', gap: 12 }}><Phone size={20} /> (555) 123-4567</div>
          </div>
        </div>
      </div>

      <div className="hq-vcard-features">
        {[
          { icon: <Briefcase size={32} />, id: 1, fbT: 'Instant Contacts', fbD: 'Clients scan your code and instantly save your contact details to their phone.' },
          { icon: <Phone size={32} />, id: 2, fbT: 'Offline Ready', fbD: 'Your contact info is embedded in the QR itself, no internet connection required.' },
          { icon: <CheckCircle2 size={32} />, id: 3, fbT: 'High Conversions', fbD: 'Make it frictionless for open-house visitors to reach out to you later.' }
        ].map((feat) => (
          <div key={feat.id} className="hq-vcard-feat-card">
            <div style={{ color: 'var(--hq-accent)', marginBottom: 24 }}>{feat.icon}</div>
            <h3 className="font-bold tracking-tighter" style={{ fontSize: 24, marginBottom: 12 }}>{getTranslation('feat', 'Title', feat.id) || feat.fbT}</h3>
            <p style={{ color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{getTranslation('feat', 'Desc', feat.id) || feat.fbD}</p>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto 120px auto', padding: '0 24px' }}>
        <h2 className="font-bold tracking-tighter" style={{ fontSize: 'clamp(32px, 5vw, 48px)', textAlign: 'center', marginBottom: 48 }}>
          {getTranslation('faq', 'Title', '') || 'Common Questions'}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {(pseoUseCase?.faqs || [1,2,3]).map((faq, i) => {
            const q = faq.q || getTranslation('faq', 'Q', faq);
            const a = faq.a || getTranslation('faq', 'A', faq);
            if (!q) return null;
            return (
              <div key={i} style={{ background: 'var(--hq-bg)', border: '1px solid var(--hq-border)', borderRadius: 16, overflow: 'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}>
                  <span className="font-bold tracking-tighter" style={{ fontSize: 20 }}>{q}</span>
                  <ChevronDown size={24} style={{ color: 'var(--hq-text-muted)', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
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
  );
}
export default LayoutVCardRealEstate;
