import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Video, Play, Clock, ChevronDown, CheckCircle2 } from 'lucide-react';

function LayoutYouTubeManual({ qrType = 'youtubemanual', pseoUseCase = null }) {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState(null);

  const translate = (key) => {
    const translation = t(key);
    return translation === key ? null : translation;
  };
  const getTranslation = (type, key, suffix) => translate(`pseo.${qrType}.${type}${key}${suffix}`);
  const getUcText = (field) => pseoUseCase ? pseoUseCase[field] : null;

  return (
    <div className="hq-layout-yt">
      <style>{`
        .hq-layout-yt { background-color: var(--hq-bg); color: var(--hq-text); font-family: 'Inter', system-ui, sans-serif; min-height: 100vh; }
        .hq-yt-hero { padding: 120px 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; max-width: 1200px; margin: 0 auto; }
        .hq-yt-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: #FF0000; color: #fff; border-radius: 100px; font-weight: 700; font-size: 14px; margin-bottom: 24px; }
        .hq-yt-player { width: 100%; aspect-ratio: 16/9; background: #000; border-radius: 24px; position: relative; overflow: hidden; display: flex; justify-content: center; align-items: center; box-shadow: 0 32px 64px -16px rgba(255,0,0,0.2); }
        .hq-yt-play-btn { width: 80px; height: 80px; background: #FF0000; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: #fff; cursor: pointer; transition: transform 0.2s; }
        .hq-yt-play-btn:hover { transform: scale(1.1); }
        .hq-yt-features { max-width: 1200px; margin: 0 auto 120px auto; padding: 0 24px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .hq-yt-feat-card { background: var(--hq-bg); border: 1px solid var(--hq-border); border-radius: 24px; padding: 32px; }
        @media (max-width: 992px) { .hq-yt-hero { grid-template-columns: 1fr; text-align: center; } .hq-yt-features { grid-template-columns: 1fr; } }
      `}</style>
      <div className="hq-yt-hero">
        <div>
          <div className="hq-yt-badge"><Video size={16} /> {getTranslation('badge', '', '') || 'For Products'}</div>
          <h2 className="font-bold tracking-tighter" style={{ fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 1.1, marginBottom: 24 }}>
            {getUcText('h1Title') || getTranslation('hero', 'Title', '') || 'YouTube Video QR Code for Product Manuals'}
          </h2>
          <p style={{ fontSize: 'clamp(18px, 2.5vw, 20px)', color: 'var(--hq-text-muted)', lineHeight: 1.6 }}>
            {getUcText('seoDesc') || getTranslation('hero', 'Subtitle', '') || 'Replace confusing paper manuals with video tutorials.'}
          </p>
        </div>
        <div>
          <div className="hq-yt-player">
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80" alt="Tech" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
            <div className="hq-yt-play-btn" style={{ zIndex: 10 }}>
              <Play size={40} fill="currentColor" style={{ marginLeft: 6 }} />
            </div>
            <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, display: 'flex', alignItems: 'center', zIndex: 10 }}>
              <div style={{ height: 4, background: '#FF0000', width: '30%', borderRadius: 2 }}></div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.3)', width: '70%', borderRadius: 2 }}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="hq-yt-features">
        {[
          { icon: <Play size={32} />, id: 1, fbT: 'Visual Learning', fbD: 'Help customers troubleshoot visually to reduce support tickets.' },
          { icon: <Clock size={32} />, id: 2, fbT: 'Timestamp Links', fbD: 'Link directly to specific moments in the video using ?t= parameter.' },
          { icon: <CheckCircle2 size={32} />, id: 3, fbT: 'Unlisted Videos', fbD: 'Works perfectly with private or unlisted instructional videos.' }
        ].map(feat => (
          <div key={feat.id} className="hq-yt-feat-card">
            <div style={{ color: '#FF0000', marginBottom: 24 }}>{feat.icon}</div>
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
export default LayoutYouTubeManual;
