import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, ShieldCheck, Zap, Lock, ChevronDown, CheckCircle2 } from 'lucide-react';

function LayoutLocation({ qrType = 'location' }) {
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
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="hq-layout-loc">
      <style>{`
        .hq-layout-loc {
          --hq-bg: #f8fafc;
          --hq-text: #0a1930;
          --hq-text-muted: #475569;
          --hq-card: #ffffff;
          --hq-border: #e2e8f0;
          --hq-accent: #2563eb;
          --hq-accent-glow: rgba(37, 99, 235, 0.1);
          font-family: var(--font-main);
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 160px; /* REQUIRED MASSIVE SPACING */
          position: relative;
        }
        html.dark .hq-layout-loc {
          --hq-bg: #040a18;
          --hq-text: #f1f5f9;
          --hq-text-muted: #94a3b8;
          --hq-card: #081226;
          --hq-border: #1e293b;
          --hq-accent: #3b82f6;
          --hq-accent-glow: rgba(59, 130, 246, 0.15);
        }
        
        .hq-radar-bg {
          position: absolute; top: 0; left: 0; right: 0; height: 600px;
          background-image: 
            radial-gradient(circle at 50% 50%, var(--hq-accent-glow) 0%, transparent 60%),
            linear-gradient(var(--hq-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--hq-border) 1px, transparent 1px);
          background-size: 100% 100%, 50px 50px, 50px 50px;
          background-position: center;
          opacity: 0.5; z-index: 0;
          mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
        }
        
        .hq-container { max-width: 1000px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2; }
        
        .hq-radar-hero { text-align: center; margin-bottom: 60px; }
        .hq-radar-icon {
          position: relative; width: 120px; height: 120px; margin: 0 auto 40px auto;
        }
        .hq-radar-circle {
          position: absolute; inset: 0; border-radius: 50%;
          border: 2px solid var(--hq-accent); opacity: 0;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .hq-radar-circle:nth-child(2) { animation-delay: 0.5s; }
        .hq-radar-circle:nth-child(3) { animation-delay: 1s; }
        .hq-radar-pin {
          position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
          color: var(--hq-accent);
        }
        @keyframes pulse { 0% { transform: scale(0.5); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
        
        .hq-radar-hero h2 { font-size: clamp(40px, 6vw, 64px); font-weight: 900; margin-bottom: 24px; letter-spacing: -0.04em; }
        .hq-radar-hero p { font-size: 20px; color: var(--hq-text-muted); max-width: 600px; margin: 0 auto; line-height: 1.6; }
        
        .hq-map-cards {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 60px;
        }
        .hq-map-card {
          background: var(--hq-bg); border: 2px solid var(--hq-border);
          border-radius: 24px; padding: 32px;
          display: flex; flex-direction: column; align-items: center; text-align: center;
        }
        .hq-map-card h3 { font-size: 20px; font-weight: 700; margin: 20px 0 12px 0; }
        .hq-map-card p { color: var(--hq-text-muted); line-height: 1.6; }
        
        .hq-step-list { max-width: 700px; margin: 0 auto 120px auto; }
        .hq-step-loc {
          display: flex; gap: 24px; padding-bottom: 40px; border-left: 2px dashed var(--hq-border);
          padding-left: 40px; position: relative; margin-left: 24px;
        }
        .hq-step-loc::before {
          content: ''; position: absolute; left: -13px; top: 0;
          width: 24px; height: 24px; border-radius: 50%; background: var(--hq-accent);
          border: 4px solid var(--hq-bg);
        }
        .hq-step-loc h4 { font-size: 24px; font-weight: 800; margin-bottom: 8px; margin-top: -4px; }
        .hq-step-loc p { color: var(--hq-text-muted); font-size: 18px; line-height: 1.6; }
        
        @media (max-width: 768px) {
          .hq-map-cards { grid-template-columns: 1fr; }
        }
      
        
        
              
        /* STRICTLY SCOPED MOBILE FIXES (Phase 4) */
        @media (max-width: 768px) {
          /* General Container fixes */
          .hq-layout-location .hq-container { padding: 0 16px !important; gap: 24px !important; }
          
          /* Phone/Player Mockups scaling */
          .hq-layout-location div[class*="-phone"], .hq-layout-location div[class*="-player"], .hq-layout-location div[class*="-mockup"], .hq-layout-location div[class*="-mock"] {
            width: 100% !important;
            max-width: 320px !important;
            height: auto !important;
            min-height: 400px !important;
            margin: 0 auto !important;
            flex: 1 1 auto !important;
          }
          
          /* Ensure tall mockups stay in ratio */
          .hq-layout-location div[class*="-phone"] { aspect-ratio: 9/18 !important; }
          
          /* Specific fix for YouTube player which should be 16:9 */
          .hq-layout-location div.hq-yt-player { aspect-ratio: 16/9 !important; min-height: auto !important; }
          
          /* Fix Hero Padding */
          .hq-layout-location div[class*="-hero"] {
            padding: 40px 0 !important;
            gap: 32px !important;
            display: flex !important;
            flex-direction: column !important;
          }
          
          /* Fix LinkedIn & Profile Avatars Overlap */
          .hq-layout-location div.hq-li-avatar, .hq-layout-location div[class*="-avatar"] {
            width: 80px !important;
            height: 80px !important;
            top: -40px !important;
          }
          .hq-layout-location div.hq-li-profile-info, .hq-layout-location div[class*="-profile-info"] {
            margin-top: 50px !important;
          }
          .hq-layout-location div.hq-li-cover { height: 100px !important; }
          
          /* Fix Inline Grids (URL, WiFi, etc) that don't use CSS classes */
          .hq-layout-location div[style*="gridTemplateColumns"] {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
          }
          .hq-layout-location div[style*="gridColumn:"] {
            width: 100% !important;
            grid-column: span 1 !important;
          }
          
          /* Fix Inline Flex Rows (URL steps) */
          .hq-layout-location div[style*="flexDirection: 'row'"], .hq-layout-location div[style*="flex-direction: row"] {
            flex-direction: column !important;
          }

          /* Fix grid column squeezing for ALL bento, features, and grid classes */
          .hq-layout-location div[class*="-bento"], .hq-layout-location div[class*="-features"], .hq-layout-location div[class*="-grid"], .hq-layout-location div[class*="-row"], .hq-layout-location div[class*="bento"], .hq-layout-location div[class*="features"] {
            display: flex !important;
            flex-direction: column !important;
          }
          
          /* Ensure ALL Main and Wrapper containers stack vertically */
          .hq-layout-location div[class*="-main"], .hq-layout-location div[class*="-wrapper"], .hq-layout-location div[class*="main"] {
            display: flex !important;
            flex-direction: column !important;
          }

          /* Ensure text wraps nicely */
          .hq-layout-location h1, .hq-layout-location h2, .hq-layout-location h3 { line-height: 1.2 !important; word-wrap: break-word; }
        }
    
      `}</style>

      <div className="hq-radar-bg" />

      <div className="hq-container">
        <div className="hq-radar-hero">
          <div className="hq-radar-icon">
            <div className="hq-radar-circle" />
            <div className="hq-radar-circle" />
            <div className="hq-radar-circle" />
            <div className="hq-radar-pin"><MapPin size={48} /></div>
          </div>
          <h2 className="font-bold tracking-tighter ">{t.heroTitle} <br/>{typeName}</h2>
          <p>{t.heroSubtitle}</p>
        </div>

        <div className="hq-map-cards">
          <div className="hq-map-card" style={{ background: 'var(--hq-bg)', border: '1px solid var(--hq-border)', padding: 32, borderRadius: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <div style={{ color: 'var(--hq-accent)', background: 'var(--hq-accent-glow)', width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShieldCheck size={32} /></div>
            <h3 className="font-bold tracking-tighter ">{translate('featTools.location.t1') || t.comp1Title}</h3>
            <p>{translate('featTools.location.d1') || t.comp1Desc}</p>
          </div>
          <div className="hq-map-card" style={{ background: 'var(--hq-bg)', border: '1px solid var(--hq-border)', padding: 32, borderRadius: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <div style={{ color: 'var(--hq-accent)', background: 'var(--hq-accent-glow)', width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Zap size={32} /></div>
            <h3 className="font-bold tracking-tighter ">{translate('featTools.location.t2') || t.comp2Title}</h3>
            <p>{translate('featTools.location.d2') || t.comp2Desc}</p>
          </div>
          <div className="hq-map-card" style={{ background: 'var(--hq-bg)', border: '1px solid var(--hq-border)', padding: 32, borderRadius: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
            <div style={{ color: 'var(--hq-accent)', background: 'var(--hq-accent-glow)', width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Lock size={32} /></div>
            <h3 className="font-bold tracking-tighter ">{translate('featTools.location.t3') || t.comp3Title}</h3>
            <p>{translate('featTools.location.d3') || t.comp3Desc}</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 className="font-bold tracking-tighter " style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>{t.stepsTitle} {typeName}</h2>
        </div>

        <div className="hq-step-list">
          {[
            { n: '1', t: t.step1Title, d: `${t.step1Desc} (${typeName})` },
            { n: '2', t: t.step2Title, d: t.step2Desc },
            { n: '3', t: t.step3Title, d: t.step3Desc }
          ].map((step, idx, arr) => (
            <div key={step.n} className="hq-step-loc" style={{ borderLeftColor: idx === arr.length - 1 ? 'transparent' : 'var(--hq-border)' }}>
              <div>
                <h4>{step.t}</h4>
                <p>{step.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'var(--hq-card)', borderTop: '1px solid var(--hq-border)', padding: '60px 0' }}>
        <div className="hq-container" style={{ maxWidth: 800 }}>
          <h2 className="font-bold tracking-tighter " style={{ paddingTop: 60, fontSize: 'clamp(32px, 5vw, 48px)',  textAlign: 'center', marginBottom: 60 }}>
            {t.faqTitle} {typeName}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = translate(`faqTools.location.q${num}`);
              const a = translate(`faqTools.location.a${num}`);
              if (!q || q === `faqTools.location.q${num}`) return null;
              return (
                <div key={i} style={{ background: openFaq === i ? 'var(--hq-accent)' : 'var(--hq-card)', borderRadius: 20, boxShadow: '0 4px 20px var(--hq-shadow)', overflow: 'hidden', transition: 'all 0.3s', transform: openFaq === i ? 'scale(1.02)' : 'scale(1)' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: openFaq === i ? '#fff' : 'var(--hq-text)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <MapPin size={24} style={{ color: openFaq === i ? '#fff' : 'var(--hq-accent)' }} />
                      <span style={{ fontSize: 18, fontWeight: 700 }}>{q}</span>
                    </div>
                    <ChevronDown size={20} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </button>
                  <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                    <p style={{ padding: '0 32px 32px 72px', color: openFaq === i ? 'rgba(255,255,255,0.9)' : 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{a}</p>
                  </div>
                </div>
              )})}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutLocation;
