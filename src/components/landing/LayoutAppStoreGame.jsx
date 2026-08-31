import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Smartphone, Download, Target, ChevronDown, CheckCircle2 } from 'lucide-react';

function LayoutAppStoreGame({ qrType = 'appstoregame', pseoUseCase = null }) {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);

  const translate = (key) => {
    const translation = t(key);
    return translation === key ? null : translation;
  };
  const getTranslation = (type, key, suffix) => translate(`pseo.${qrType}.${type}${key}${suffix}`);
  const getUcText = (field) => pseoUseCase ? pseoUseCase[field] : null;

  return (
    <div className="hq-layout-appstore">
      <style>{`
        .hq-layout-appstore { background-color: var(--hq-bg); color: var(--hq-text); font-family: 'Inter', system-ui, sans-serif; min-height: 100vh; }
        .hq-app-hero { padding: 120px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; max-width: 1200px; margin: 0 auto; }
        .hq-app-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: #007AFF; color: #fff; border-radius: 100px; font-weight: 700; font-size: 14px; margin-bottom: 24px; }
        .hq-app-phone { background: #111; border: 8px solid #333; border-radius: 40px; overflow: hidden; width: 300px; height: 600px; margin: 0 auto; position: relative; box-shadow: 0 32px 64px -16px rgba(0, 122, 255, 0.3); }
        .hq-app-notch { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 120px; height: 30px; background: #333; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; z-index: 10; }
        .hq-app-screen { width: 100%; height: 100%; background: #000; padding-top: 60px; color: #fff; display: flex; flex-direction: column; align-items: center; }
        .hq-app-icon { width: 120px; height: 120px; background: linear-gradient(135deg, #007AFF, #00C6FF); border-radius: 24px; margin-bottom: 24px; display: flex; justify-content: center; align-items: center; }
        .hq-app-btn { background: #fff; color: #007AFF; font-weight: bold; padding: 12px 32px; border-radius: 100px; margin-top: auto; margin-bottom: 40px; }
        .hq-app-features { max-width: 1200px; margin: 0 auto 120px auto; padding: 0 24px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .hq-app-feat-card { background: var(--hq-bg); border: 1px solid var(--hq-border); border-radius: 24px; padding: 32px; }
        @media (max-width: 992px) { .hq-app-hero { grid-template-columns: 1fr; text-align: center; } .hq-app-features { grid-template-columns: 1fr; } }
      `}</style>
      <div className="hq-app-hero">
        <div>
          <div className="hq-app-badge"><Smartphone size={16} /> {getTranslation('badge', '', '') || 'For Game Devs'}</div>
          <h1 className="font-bold tracking-tighter" style={{ fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 1.1, marginBottom: 24 }}>
            {getUcText('h1Title') || getTranslation('hero', 'Title', '') || 'App Store QR Code for Mobile Games'}
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2.5vw, 20px)', color: 'var(--hq-text-muted)', lineHeight: 1.6 }}>
            {getUcText('seoDesc') || getTranslation('hero', 'Subtitle', '') || 'Drive app installs directly from out-of-home advertising. Link straight to the App Store.'}
          </p>
        </div>
        <div>
          <div className="hq-app-phone">
            <div className="hq-app-notch"></div>
            <div className="hq-app-screen">
              <div className="hq-app-icon"><Smartphone size={48} color="#fff" /></div>
              <h2 style={{ fontSize: 24, fontWeight: 'bold' }}>Cyber Quest</h2>
              <p style={{ color: '#aaa', marginTop: 8 }}>Action RPG</p>
              <div style={{ display: 'flex', gap: 4, marginTop: 16 }}>⭐ ⭐ ⭐ ⭐ ⭐</div>
              <div className="hq-app-btn">GET</div>
            </div>
          </div>
        </div>
      </div>
      <div className="hq-app-features">
        {[
          { icon: <Download size={32} />, id: 1, fbT: 'Boost Installs', fbD: 'Turn physical ads into digital downloads instantly.' },
          { icon: <Target size={32} />, id: 2, fbT: 'Direct Routing', fbD: 'Bypass the web browser and open the native App Store directly.' },
          { icon: <CheckCircle2 size={32} />, id: 3, fbT: 'Trackable', fbD: 'Use attribution links like AppsFlyer to track your scan metrics.' }
        ].map(feat => (
          <div key={feat.id} className="hq-app-feat-card">
            <div style={{ color: '#007AFF', marginBottom: 24 }}>{feat.icon}</div>
            <h3 className="font-bold tracking-tighter" style={{ fontSize: 24, marginBottom: 12 }}>{getTranslation('feat', 'Title', feat.id) || feat.fbT}</h3>
            <p style={{ color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{getTranslation('feat', 'Desc', feat.id) || feat.fbD}</p>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto 120px auto', padding: '0 24px' }}>
        <h2 className="font-bold tracking-tighter" style={{ fontSize: 'clamp(32px, 5vw, 48px)', textAlign: 'center', marginBottom: 48 }}>{getTranslation('faq', 'Title', '') || 'Common Questions'}</h2>
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
export default LayoutAppStoreGame;
