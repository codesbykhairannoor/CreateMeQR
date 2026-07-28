import React from 'react';
import { useTranslation } from 'react-i18next';
import { Ghost, ShieldCheck, Zap, Lock, ChevronDown, Camera, Search, UserPlus } from 'lucide-react';

function LayoutSnapchat({ qrType = 'snapchat' }) {
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
    <div className="hq-layout-snapchat">
      <style>{`
        .hq-layout-snapchat {
          --hq-bg: #000000;
          --hq-text: #ffffff;
          --hq-text-muted: #888888;
          --hq-card: #111111;
          --hq-border: #222222;
          --hq-accent: #fffc00; /* snapchat yellow */
          --hq-accent-glow: rgba(255, 252, 0, 0.1);
          font-family: var(--font-main);
          background: var(--hq-bg);
          color: var(--hq-text);
        }
        
        .hq-container { max-width: 1000px; margin: 0 auto; padding: 0 24px; }
        
        .hq-sc-hero { min-height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; position: relative; overflow: hidden; padding-top: 80px; }
        
        .hq-sc-ghost-bg { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; opacity: 0.03; z-index: 1; pointer-events: none; }
        .hq-sc-content { position: relative; z-index: 2; }
        
        .hq-sc-hero h1 { font-size: clamp(48px, 8vw, 80px); font-weight: 900; margin-bottom: 24px; letter-spacing: -0.05em; line-height: 1; color: var(--hq-accent); }
        .hq-sc-hero p { font-size: clamp(18px, 3vw, 24px); max-width: 600px; margin: 0 auto 40px auto; color: rgba(255,255,255,0.9); }
        
        .hq-sc-camera-btn { display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; border-radius: 50%; border: 4px solid var(--hq-accent); background: transparent; cursor: pointer; transition: transform 0.2s; }
        .hq-sc-camera-btn:hover { transform: scale(1.05); background: var(--hq-accent-glow); }
        .hq-sc-camera-btn-inner { width: 60px; height: 60px; border-radius: 50%; border: 2px solid var(--hq-accent); }
        
        .hq-sc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; padding: 80px 0; }
        .hq-sc-card { background: var(--hq-card); padding: 40px; border-radius: 24px; text-align: center; border: 1px solid var(--hq-border); transition: transform 0.3s, border-color 0.3s; }
        .hq-sc-card:hover { transform: translateY(-8px); border-color: var(--hq-accent); }
        .hq-sc-icon { width: 64px; height: 64px; background: #222; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto; color: var(--hq-accent); }
        .hq-sc-card h3 { font-size: 20px; font-weight: 800; margin-bottom: 16px; }
        
        .hq-sc-toolbar { position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%); background: rgba(30,30,30,0.8); backdrop-filter: blur(12px); padding: 12px 24px; border-radius: 40px; display: flex; gap: 40px; z-index: 100; border: 1px solid rgba(255,255,255,0.1); }
        .hq-sc-tool { color: white; display: flex; flex-direction: column; align-items: center; gap: 4px; font-size: 10px; font-weight: 700; opacity: 0.5; transition: opacity 0.2s; cursor: pointer; }
        .hq-sc-tool:hover, .hq-sc-tool.active { opacity: 1; }
        .hq-sc-tool.active { color: var(--hq-accent); }
        
        @media (max-width: 768px) {
          .hq-sc-grid { grid-template-columns: 1fr; }
        }
      
        
        
              
        /* STRICTLY SCOPED MOBILE FIXES (Phase 4) */
        @media (max-width: 768px) {
          /* General Container fixes */
          .hq-layout-snapchat .hq-container { padding: 0 16px !important; gap: 24px !important; }
          
          /* Phone/Player Mockups scaling */
          .hq-layout-snapchat div[class*="-phone"], .hq-layout-snapchat div[class*="-player"], .hq-layout-snapchat div[class*="-mockup"], .hq-layout-snapchat div[class*="-mock"] {
            width: 100% !important;
            max-width: 320px !important;
            height: auto !important;
            min-height: 400px !important;
            margin: 0 auto !important;
            flex: 1 1 auto !important;
          }
          
          /* Ensure tall mockups stay in ratio */
          .hq-layout-snapchat div[class*="-phone"] { aspect-ratio: 9/18 !important; }
          
          /* Specific fix for YouTube player which should be 16:9 */
          .hq-layout-snapchat div.hq-yt-player { aspect-ratio: 16/9 !important; min-height: auto !important; }
          
          /* Fix Hero Padding */
          .hq-layout-snapchat div[class*="-hero"] {
            padding: 40px 0 !important;
            gap: 32px !important;
            display: flex !important;
            flex-direction: column !important;
          }
          
          /* Fix LinkedIn & Profile Avatars Overlap */
          .hq-layout-snapchat div.hq-li-avatar, .hq-layout-snapchat div[class*="-avatar"] {
            width: 80px !important;
            height: 80px !important;
            top: -40px !important;
          }
          .hq-layout-snapchat div.hq-li-profile-info, .hq-layout-snapchat div[class*="-profile-info"] {
            margin-top: 50px !important;
          }
          .hq-layout-snapchat div.hq-li-cover { height: 100px !important; }
          
          /* Fix Inline Grids (URL, WiFi, etc) that don't use CSS classes */
          .hq-layout-snapchat div[style*="gridTemplateColumns"] {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
          }
          .hq-layout-snapchat div[style*="gridColumn:"] {
            width: 100% !important;
            grid-column: span 1 !important;
          }
          
          /* Fix Inline Flex Rows (URL steps) */
          .hq-layout-snapchat div[style*="flexDirection: 'row'"], .hq-layout-snapchat div[style*="flex-direction: row"] {
            flex-direction: column !important;
          }

          /* Fix grid column squeezing for ALL bento, features, and grid classes */
          .hq-layout-snapchat div[class*="-bento"], .hq-layout-snapchat div[class*="-features"], .hq-layout-snapchat div[class*="-grid"], .hq-layout-snapchat div[class*="-row"], .hq-layout-snapchat div[class*="bento"], .hq-layout-snapchat div[class*="features"] {
            display: flex !important;
            flex-direction: column !important;
          }
          
          /* Ensure ALL Main and Wrapper containers stack vertically */
          .hq-layout-snapchat div[class*="-main"], .hq-layout-snapchat div[class*="-wrapper"], .hq-layout-snapchat div[class*="main"] {
            display: flex !important;
            flex-direction: column !important;
          }

          /* Ensure text wraps nicely */
          .hq-layout-snapchat h1, .hq-layout-snapchat h2, .hq-layout-snapchat h3 { line-height: 1.2 !important; word-wrap: break-word; }
        }
    
      `}</style>

      <div className="hq-sc-hero">
        <div className="hq-sc-ghost-bg"><Ghost size={600} /></div>
        <div className="hq-sc-content hq-container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--hq-card)', padding: '8px 16px', borderRadius: 100, marginBottom: 24, fontSize: 14, fontWeight: 700, border: '1px solid var(--hq-border)' }}>
            <Ghost size={16} color="var(--hq-accent)" /> @createmyqr
          </div>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroSubtitle}</p>
          <div className="hq-sc-camera-btn">
            <div className="hq-sc-camera-btn-inner"></div>
          </div>
        </div>
      </div>

      <div className="hq-container hq-sc-grid">
        <div className="hq-sc-card" style={{ background: '#FFFC00', border: 'none', color: '#000', borderRadius: 32 }}>
          <div className="hq-sc-icon" style={{ background: '#000', color: '#FFFC00' }}><ShieldCheck size={32} /></div>
          <h3 className="font-bold tracking-tighter " style={{  textTransform: 'uppercase' }}>{translate('featTools.snapchat.t1') || t.comp1Title}</h3>
          <p style={{ color: '#333', lineHeight: 1.6, fontWeight: 500 }}>{translate('featTools.snapchat.d1') || t.comp1Desc}</p>
        </div>
        <div className="hq-sc-card" style={{ background: '#FFFC00', border: 'none', color: '#000', borderRadius: 32 }}>
          <div className="hq-sc-icon" style={{ background: '#000', color: '#FFFC00' }}><Zap size={32} /></div>
          <h3 className="font-bold tracking-tighter " style={{  textTransform: 'uppercase' }}>{translate('featTools.snapchat.t2') || t.comp2Title}</h3>
          <p style={{ color: '#333', lineHeight: 1.6, fontWeight: 500 }}>{translate('featTools.snapchat.d2') || t.comp2Desc}</p>
        </div>
        <div className="hq-sc-card" style={{ background: '#FFFC00', border: 'none', color: '#000', borderRadius: 32 }}>
          <div className="hq-sc-icon" style={{ background: '#000', color: '#FFFC00' }}><Lock size={32} /></div>
          <h3 className="font-bold tracking-tighter " style={{  textTransform: 'uppercase' }}>{translate('featTools.snapchat.t3') || t.comp3Title}</h3>
          <p style={{ color: '#333', lineHeight: 1.6, fontWeight: 500 }}>{translate('featTools.snapchat.d3') || t.comp3Desc}</p>
        </div>
      </div>
      
      <div style={{ background: '#111', padding: '60px 0', paddingBottom: 160 }}>
        <div className="hq-container" style={{ maxWidth: 800 }}>
          <h2 className="font-bold tracking-tighter" style={{ paddingTop: 60, fontSize: 32,  textAlign: 'center', marginBottom: 40, color: 'white' }}>{t.faqTitle}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = translate(`faqTools.snapchat.q${num}`);
              const a = translate(`faqTools.snapchat.a${num}`);
              if (!q || q === `faqTools.snapchat.q${num}`) return null;
              return (
              <div key={i} style={{ background: 'var(--hq-bg)', borderRadius: 24, border: '1px solid', borderColor: openFaq === i ? '#FFFC00' : 'var(--hq-border)', overflow: 'hidden', transition: 'all 0.3s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ background: openFaq === i ? '#FFFC00' : 'var(--hq-border)', color: openFaq === i ? '#000' : 'var(--hq-text-muted)', padding: 8, borderRadius: 12, transition: 'all 0.3s' }}>
                      <Ghost size={20} />
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

      <div className="hq-sc-toolbar">
        <div className="hq-sc-tool"><Search size={24} /></div>
        <div className="hq-sc-tool active"><Camera size={24} /></div>
        <div className="hq-sc-tool"><UserPlus size={24} /></div>
      </div>
    </div>
  );
}

export default LayoutSnapchat;
