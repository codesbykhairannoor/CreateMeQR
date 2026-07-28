import React from 'react';
import { useTranslation } from 'react-i18next';
import { Video, ShieldCheck, Zap, Lock, ChevronDown, Play, Maximize, Volume2 } from 'lucide-react';

function LayoutYouTube({ qrType = 'youtube' }) {
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
    <div className="hq-layout-youtube">
      <style>{`
        .hq-layout-youtube {
          --hq-bg: #f8fafc;
          --hq-text: #0f172a;
          --hq-text-muted: #64748b;
          --hq-card: #ffffff;
          --hq-border: #e2e8f0;
          --hq-accent: #2563eb;
          --hq-accent-glow: rgba(37, 99, 235, 0.1);
          font-family: var(--font-main);
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 160px; /* REQUIRED MASSIVE SPACING */
        }
        html.dark .hq-layout-youtube {
          --hq-bg: #020617;
          --hq-text: #f8fafc;
          --hq-text-muted: #94a3b8;
          --hq-card: #0f172a;
          --hq-border: #1e293b;
          --hq-accent: #3b82f6;
          --hq-accent-glow: rgba(59, 130, 246, 0.15);
        }
        
        .hq-container { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
        
        .hq-yt-theater {
          background: #000;
          border-radius: 24px;
          overflow: hidden;
          margin-bottom: 40px;
          position: relative;
          aspect-ratio: 21/9;
          display: flex; flex-direction: column; justify-content: flex-end;
          box-shadow: 0 40px 100px -20px rgba(0,0,0,0.4);
        }
        
        .hq-yt-theater-content {
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(45deg, rgba(37,99,235,0.2) 0%, rgba(0,0,0,0) 100%);
          display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 24px;
        }
        
        .hq-yt-theater-content h2 {
          color: white; font-size: clamp(40px, 6vw, 80px); font-weight: 900; letter-spacing: -0.04em; text-align: center;
          text-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        
        .hq-yt-controls {
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          padding: 40px 40px 20px 40px;
          color: white;
          position: relative; z-index: 10;
        }
        
        .hq-yt-timeline { height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; margin-bottom: 20px; position: relative; }
        .hq-yt-timeline-fill { position: absolute; left: 0; top: 0; bottom: 0; width: 45%; background: var(--hq-accent); border-radius: 2px; }
        .hq-yt-timeline-fill::after { content: ''; position: absolute; right: -6px; top: -4px; width: 12px; height: 12px; background: var(--hq-accent); border-radius: 50%; box-shadow: 0 0 10px var(--hq-accent); }
        
        .hq-yt-buttons { display: flex; justify-content: space-between; align-items: center; }
        .hq-yt-btn-group { display: flex; gap: 24px; align-items: center; }
        
        .hq-yt-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; margin-bottom: 60px; }
        .hq-yt-card { border-left: 4px solid var(--hq-accent); padding-left: 24px; }
        .hq-yt-card h3 { font-size: 24px; font-weight: 800; margin-bottom: 16px; }
        .hq-yt-card p { font-size: 16px; color: var(--hq-text-muted); line-height: 1.6; }
        
        @media (max-width: 992px) {
          .hq-container { padding: 0 20px; }
          .hq-yt-theater { aspect-ratio: 1/1; }
          .hq-yt-grid { grid-template-columns: 1fr; }
        }
      
        
        
              
              
        /* DEEP MOBILE FIXES (Phase 5) */
        @media (max-width: 768px) {
          /* General Container fixes */
          .hq-layout-youtube .hq-container { padding: 0 16px !important; gap: 24px !important; }
          
          
          
          
          
          

          /* LinkedIn specific avatar overlaps */
          .hq-layout-youtube div.hq-li-avatar, .hq-layout-youtube div[class*="-avatar"] {
            width: 80px !important;
            height: 80px !important;
            top: -40px !important;
          }
          .hq-layout-youtube div.hq-li-profile-info, .hq-layout-youtube div[class*="-profile-info"] {
            margin-top: 50px !important;
          }
          .hq-layout-youtube div.hq-li-cover { height: 100px !important; }

          /* Ensure text wraps correctly without horizontal scroll */
          .hq-layout-youtube h1, .hq-layout-youtube h2, .hq-layout-youtube h3, .hq-layout-youtube p {
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            max-width: 100% !important;
          }
        }
    
      `}</style>

      <div className="hq-container">
        <div className="hq-yt-theater">
          <div className="hq-yt-theater-content">
            <h2 className="font-bold tracking-tighter ">{typeName} <br/>{t.heroTitle}</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 20 }}>{t.heroSubtitle}</p>
          </div>
          
          <div className="hq-yt-controls">
            <div className="hq-yt-timeline">
              <div className="hq-yt-timeline-fill"></div>
            </div>
            <div className="hq-yt-buttons">
              <div className="hq-yt-btn-group">
                <Play size={24} fill="currentColor" />
                <Volume2 size={24} />
                <span style={{ fontSize: 14, fontFamily: 'monospace' }}>01:23 / 04:56</span>
              </div>
              <div className="hq-yt-btn-group">
                <ShieldCheck size={24} />
                <Maximize size={24} />
              </div>
            </div>
          </div>
        </div>

        <div className="hq-yt-grid">
          <div className="hq-yt-card" style={{ background: '#0f0f0f', border: '1px solid #272727', borderRadius: 12, padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#272727', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShieldCheck size={24} color="#ff0000" /></div>
              <h3 className="font-bold tracking-tighter" style={{ fontSize: 20,  margin: 0, color: '#fff' }}>{translate('featTools.youtube.t1') || t.comp1Title}</h3>
            </div>
            <p style={{ color: '#aaaaaa', lineHeight: 1.6 }}>{translate('featTools.youtube.d1') || t.comp1Desc}</p>
          </div>
          <div className="hq-yt-card" style={{ background: '#0f0f0f', border: '1px solid #272727', borderRadius: 12, padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#272727', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Zap size={24} color="#ff0000" /></div>
              <h3 className="font-bold tracking-tighter" style={{ fontSize: 20,  margin: 0, color: '#fff' }}>{translate('featTools.youtube.t2') || t.comp2Title}</h3>
            </div>
            <p style={{ color: '#aaaaaa', lineHeight: 1.6 }}>{translate('featTools.youtube.d2') || t.comp2Desc}</p>
          </div>
          <div className="hq-yt-card" style={{ background: '#0f0f0f', border: '1px solid #272727', borderRadius: 12, padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#272727', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Lock size={24} color="#ff0000" /></div>
              <h3 className="font-bold tracking-tighter" style={{ fontSize: 20,  margin: 0, color: '#fff' }}>{translate('featTools.youtube.t3') || t.comp3Title}</h3>
            </div>
            <p style={{ color: '#aaaaaa', lineHeight: 1.6 }}>{translate('featTools.youtube.d3') || t.comp3Desc}</p>
          </div>
        </div>
      </div>
      
      <div style={{ background: 'var(--hq-card)', padding: '60px 0', borderTop: '1px solid var(--hq-border)' }}>
        <div className="hq-container" style={{ maxWidth: 800 }}>
          <h2 className="font-bold tracking-tighter " style={{ paddingTop: 0, fontSize: 40,  marginBottom: 48, textAlign: 'center' }}>{t.faqTitle}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = translate(`faqTools.youtube.q${num}`);
              const a = translate(`faqTools.youtube.a${num}`);
              if (!q || q === `faqTools.youtube.q${num}`) return null;
              return (
              <div key={i} style={{ background: 'var(--hq-bg)', borderRadius: 24, border: '1px solid', borderColor: openFaq === i ? '#ff0000' : 'var(--hq-border)', overflow: 'hidden', transition: 'all 0.3s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ background: openFaq === i ? 'rgba(255,0,0,0.1)' : 'var(--hq-accent-glow)', padding: 8, borderRadius: 12, color: openFaq === i ? '#ff0000' : 'var(--hq-accent)', transition: 'all 0.3s' }}>
                      <Video size={20} />
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

export default LayoutYouTube;
