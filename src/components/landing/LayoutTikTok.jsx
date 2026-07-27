import React from 'react';
import { useTranslation } from 'react-i18next';
import { Music2, ShieldCheck, Zap, Lock, ChevronDown, Heart, MessageCircle, Bookmark, Share2 } from 'lucide-react';

function LayoutTikTok({ qrType = 'tiktok' }) {
  const { t: translate } = useTranslation();
  const typeName = translate(`types.${qrType}`);
  const tObj = translate('landing', { returnObjects: true });
  const baseT = typeof tObj === 'object' && tObj !== null ? tObj : {};
  const t = Object.assign({
    heroTitle: "Premium QR Codes",
    heroSubtitle: "No limits, no ads, no tracking. Generate high-quality static codes directly in your browser.",
    stepsTitle: "How to Create a",
    step1Title: "Enter Data",
    step1Desc: "Provide the required details for your",
    step2Title: "Customize Design",
    step2Desc: "Adjust colors, patterns, and add logos to match your brand.",
    step3Title: "Download & Use",
    step3Desc: "Get your high-res QR code instantly and use it anywhere.",
    comp1Title: "Secure & Private",
    comp1Desc: "Everything is generated locally in your browser. No data leaves your device.",
    comp2Title: "Fast & Reliable",
    comp2Desc: "High performance rendering with zero loading times.",
    comp3Title: "Fully Customizable",
    comp3Desc: "Extensive design options to create the perfect QR code.",
    faqTitle: "Common Questions"
  }, baseT);
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div className="hq-layout-tiktok">
      <style>{`
        .hq-layout-tiktok {
          --hq-bg: #000000;
          --hq-text: #ffffff;
          --hq-text-muted: rgba(255,255,255,0.7);
          --hq-card: #121212;
          --hq-border: #222222;
          --hq-accent: #ff0050;
          --hq-accent-secondary: #00f2fe;
          font-family: -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Display", "Helvetica Neue", sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 100px;
        }
        
        .hq-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; gap: 40px; justify-content: center; }
        
        .hq-tk-player {
          width: 360px; height: 640px; background: #1a1a1a; border-radius: 16px; position: relative; overflow: hidden;
          box-shadow: 0 0 40px rgba(0, 242, 254, 0.1), 0 0 40px rgba(255, 0, 80, 0.1); flex-shrink: 0;
        }
        
        .hq-tk-video {
          position: absolute; inset: 0; background: linear-gradient(135deg, var(--hq-accent), var(--hq-accent-secondary));
          opacity: 0.15;
        }
        
        .hq-tk-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 24px 80px 24px 16px; background: linear-gradient(transparent, rgba(0,0,0,0.8)); }
        .hq-tk-title { font-size: 24px; font-weight: 800; margin-bottom: 8px; text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
        .hq-tk-desc { font-size: 15px; line-height: 1.4; text-shadow: 0 1px 2px rgba(0,0,0,0.5); }
        
        .hq-tk-actions { position: absolute; right: 16px; bottom: 24px; display: flex; flex-direction: column; gap: 24px; align-items: center; }
        .hq-tk-action { display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); }
        .hq-tk-action-icon { width: 48px; height: 48px; border-radius: 50%; background: rgba(255,255,255,0.1); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; }
        
        .hq-tk-content { flex: 1; max-width: 600px; padding: 40px 0; }
        .hq-tk-content h2 { font-size: clamp(32px, 4vw, 48px); font-weight: 900; margin-bottom: 24px; }
        
        .hq-tk-features { display: flex; flex-direction: column; gap: 24px; margin-top: 40px; }
        .hq-tk-feature { background: var(--hq-card); padding: 24px; border-radius: 12px; border-left: 4px solid var(--hq-accent-secondary); }
        .hq-tk-feature h3 { font-size: 18px; font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; gap: 12px; }
        
        @media (max-width: 992px) {
          .hq-container { flex-direction: column; align-items: center; }
          .hq-tk-content { text-align: center; }
          .hq-tk-feature { text-align: left; }
        }
      `}</style>

      <div className="hq-container">
        <div className="hq-tk-player">
          <div className="hq-tk-video"></div>
          <div className="hq-tk-overlay">
            <div style={{ fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}><Music2 size={16} /> @createmyqr</div>
            <div className="hq-tk-title">{t.heroTitle}</div>
            <div className="hq-tk-desc">{t.heroSubtitle} #qrcode #foryou #{typeName}</div>
          </div>
          <div className="hq-tk-actions">
            <div className="hq-tk-action">
              <div className="hq-tk-action-icon"><Heart size={24} fill="white" /></div>
              1.2M
            </div>
            <div className="hq-tk-action">
              <div className="hq-tk-action-icon"><MessageCircle size={24} fill="white" /></div>
              45K
            </div>
            <div className="hq-tk-action">
              <div className="hq-tk-action-icon"><Bookmark size={24} fill="white" /></div>
              89K
            </div>
            <div className="hq-tk-action">
              <div className="hq-tk-action-icon"><Share2 size={24} fill="white" /></div>
              Share
            </div>
          </div>
        </div>

        <div className="hq-tk-content">
          <h2 className="font-bold tracking-tighter ">Swipe Up for {typeName} QR Code</h2>
          <p style={{ color: 'var(--hq-text-muted)', fontSize: 18, lineHeight: 1.6 }}>
            {t.heroSubtitle} Generate codes instantly without any tracking or subscription fees.
          </p>
          
          <div className="hq-tk-features">
            <div className="hq-tk-feature" style={{ borderLeft: '4px solid #ff0050', paddingLeft: 16, background: 'rgba(255,255,255,0.02)' }}>
              <h3 className="font-bold tracking-tighter" style={{ fontSize: 18, color: '#ff0050', display: 'flex', alignItems: 'center', gap: 8 }}><ShieldCheck size={20} /> {translate('featTools.tiktok.t1') || t.comp1Title}</h3>
              <p style={{ color: 'var(--hq-text-muted)', fontSize: 15, margin: 0 }}>{translate('featTools.tiktok.d1') || t.comp1Desc}</p>
            </div>
            <div className="hq-tk-feature" style={{ borderLeft: '4px solid #00f2fe', paddingLeft: 16, background: 'rgba(255,255,255,0.02)' }}>
              <h3 className="font-bold tracking-tighter" style={{ fontSize: 18, color: '#00f2fe', display: 'flex', alignItems: 'center', gap: 8 }}><Zap size={20} /> {translate('featTools.tiktok.t2') || t.comp2Title}</h3>
              <p style={{ color: 'var(--hq-text-muted)', fontSize: 15, margin: 0 }}>{translate('featTools.tiktok.d2') || t.comp2Desc}</p>
            </div>
            <div className="hq-tk-feature" style={{ borderLeft: '4px solid #fff', paddingLeft: 16, background: 'rgba(255,255,255,0.02)' }}>
              <h3 className="font-bold tracking-tighter" style={{ fontSize: 18, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}><Lock size={20} /> {translate('featTools.tiktok.t3') || t.comp3Title}</h3>
              <p style={{ color: 'var(--hq-text-muted)', fontSize: 15, margin: 0 }}>{translate('featTools.tiktok.d3') || t.comp3Desc}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ background: '#0a0a0a', padding: '60px 0', marginTop: 80, borderTop: '1px solid var(--hq-border)' }}>
        <div className="hq-container" style={{ maxWidth: 800, flexDirection: 'column' }}>
          <h2 className="font-bold tracking-tighter " style={{ paddingTop: 60, fontSize: 32,  textAlign: 'center', marginBottom: 40 }}>{t.faqTitle}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = translate(`faqTools.tiktok.q${num}`);
              const a = translate(`faqTools.tiktok.a${num}`);
              if (!q || q === `faqTools.tiktok.q${num}`) return null;
              return (
              <div key={i} style={{ background: 'var(--hq-bg)', borderRadius: 24, border: '1px solid', borderColor: openFaq === i ? '#ff0050' : 'var(--hq-border)', overflow: 'hidden', transition: 'all 0.3s', boxShadow: openFaq === i ? '0 4px 20px rgba(255,0,80,0.1)' : 'none' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ background: openFaq === i ? 'rgba(255,0,80,0.1)' : 'var(--hq-accent-glow)', padding: 8, borderRadius: 12, color: openFaq === i ? '#ff0050' : 'var(--hq-accent)', transition: 'all 0.3s' }}>
                      <Music2 size={20} />
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 700 }}>{q}</span>
                  </div>
                  <ChevronDown size={20} style={{ color: 'var(--hq-text-muted)', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                  <p style={{ padding: '0 32px 32px 72px', color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{a}</p>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutTikTok;
