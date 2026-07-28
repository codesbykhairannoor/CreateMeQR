import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, ShieldCheck, Zap, Lock, ChevronDown, MoveRight } from 'lucide-react';

function LayoutEmail({ qrType = 'email' }) {
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
    <div className="hq-layout-email">
      <style>{`
        .hq-layout-email {
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
        }
        html.dark .hq-layout-email {
          --hq-bg: #040a18;
          --hq-text: #f1f5f9;
          --hq-text-muted: #94a3b8;
          --hq-card: #081226;
          --hq-border: #1e293b;
          --hq-accent: #3b82f6;
          --hq-accent-glow: rgba(59, 130, 246, 0.15);
        }
        
        .hq-container { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
        
        .hq-masonry-hero {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-rows: 240px;
          gap: 24px;
          margin-bottom: 60px;
        }
        
        .hq-m-card {
          background: var(--hq-card);
          border: 1px solid var(--hq-border);
          border-radius: 32px;
          padding: 40px;
          display: flex; flex-direction: column; justify-content: center;
          position: relative; overflow: hidden;
        }
        
        .hq-m-main {
          grid-column: span 8;
          grid-row: span 2;
          background: var(--hq-accent);
          color: white;
          border: none;
        }
        .hq-m-main h2 {
          font-size: clamp(48px, 6vw, 80px);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin-bottom: 24px;
          position: relative; z-index: 2;
        }
        .hq-m-main p {
          font-size: 20px; opacity: 0.9; max-width: 500px;
          position: relative; z-index: 2;
        }
        .hq-m-main-icon {
          position: absolute; right: -40px; bottom: -60px; opacity: 0.1;
          color: white;
        }
        
        .hq-m-stat { grid-column: span 4; grid-row: span 1; }
        .hq-m-stat h3 { font-size: 24px; font-weight: 800; margin-bottom: 12px; }
        .hq-m-stat p { color: var(--hq-text-muted); line-height: 1.6; }
        .hq-m-stat-bg { position: absolute; right: -20px; top: -20px; opacity: 0.05; color: var(--hq-accent); }
        
        .hq-steps-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 60px;
        }
        .hq-step-masonry {
          background: var(--hq-bg); padding: 40px 0; border-top: 2px solid var(--hq-border);
        }
        .hq-step-masonry h4 { font-size: 24px; font-weight: 800; margin-bottom: 16px; margin-top: 24px; }
        .hq-step-masonry p { color: var(--hq-text-muted); line-height: 1.7; }
        
        @media (max-width: 1024px) {
          .hq-m-main { grid-column: span 12; }
          .hq-m-stat { grid-column: span 6; }
          .hq-steps-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .hq-m-stat { grid-column: span 12; }
        }
      
        
        /* GLOBAL MOBILE FIXES */
        @media (max-width: 768px) {
          /* General Container fixes */
          .hq-container { padding: 0 16px !important; gap: 24px !important; }
          
          /* Phone/Player Mockups scaling (TikTok, Snapchat, WhatsApp, YouTube, etc.) */
          [class*="-phone"], [class*="-player"] {
            width: 100% !important;
            max-width: 320px !important;
            height: auto !important;
            min-height: 480px !important;
            aspect-ratio: 9/18 !important;
            margin: 0 auto !important;
            flex: 1 1 auto !important;
          }
          
          /* Specific fix for YouTube player which should be 16:9 */
          .hq-yt-player { aspect-ratio: 16/9 !important; min-height: auto !important; }
          
          /* Fix Hero Padding */
          [class*="-hero"] {
            padding: 40px 0 !important;
            gap: 32px !important;
          }
          
          /* Fix LinkedIn & Profile Avatars Overlap */
          .hq-li-avatar, [class*="-avatar"] {
            width: 80px !important;
            height: 80px !important;
            top: -40px !important;
          }
          .hq-li-profile-info, [class*="-profile-info"] {
            margin-top: 50px !important;
          }
          .hq-li-cover { height: 100px !important; }
          
          /* Fix Inline Grids (URL, WiFi, etc) that don't use CSS classes */
          div[style*="gridTemplateColumns"] {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
          }
          div[style*="gridColumn:"] {
            width: 100% !important;
            grid-column: span 1 !important;
          }
          
          /* Fix Inline Flex Rows (URL steps) */
          div[style*="flexDirection: 'row'"], div[style*="flex-direction: row"] {
            flex-direction: column !important;
          }

          /* Phase 2: PDF, App Store, WiFi, Link In Bio fixes */
          /* Fix grid column squeezing */
          [class*="bento"], [class*="features"], [class*="grid"] {
            grid-template-columns: 1fr !important;
          }
          
          /* Ensure Main containers stack vertically */
          [class*="main"], .hq-li-main {
            flex-direction: column !important;
          }

          /* Ensure text wraps nicely */
          h1, h2, h3 { line-height: 1.2 !important; word-wrap: break-word; }
        }
    
      `}</style>

      <div className="hq-container">
        <div className="hq-masonry-hero">
          <div className="hq-m-card hq-m-main">
            <div className="hq-m-main-icon"><Mail size={320} /></div>
            <h2 className="font-bold tracking-tighter ">{t.heroTitle} <br/>{typeName}</h2>
            <p>{t.heroSubtitle}</p>
          </div>
          
          <div className="hq-m-card hq-m-stat" style={{ background: 'var(--hq-card)', borderLeft: '4px solid var(--hq-accent)', borderRadius: '0 24px 24px 0', padding: 40, position: 'relative', overflow: 'hidden' }}>
            <div className="hq-m-stat-bg"><ShieldCheck size={200}/></div>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'inline-block', padding: '8px 16px', background: 'var(--hq-bg)', borderRadius: 8, fontSize: 14, fontWeight: 700, marginBottom: 16 }}>FEATURE 1</div>
              <h3 className="font-bold tracking-tighter ">{translate('featTools.email.t1') || t.comp1Title}</h3>
              <p>{translate('featTools.email.d1') || t.comp1Desc}</p>
            </div>
          </div>
          
          <div className="hq-m-card hq-m-stat" style={{ background: 'var(--hq-card)', borderLeft: '4px solid var(--hq-accent)', borderRadius: '0 24px 24px 0', padding: 40, position: 'relative', overflow: 'hidden' }}>
            <div className="hq-m-stat-bg"><Zap size={200}/></div>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'inline-block', padding: '8px 16px', background: 'var(--hq-bg)', borderRadius: 8, fontSize: 14, fontWeight: 700, marginBottom: 16 }}>FEATURE 2</div>
              <h3 className="font-bold tracking-tighter ">{translate('featTools.email.t2') || t.comp2Title}</h3>
              <p>{translate('featTools.email.d2') || t.comp2Desc}</p>
            </div>
          </div>
        </div>
        
        <div style={{ marginBottom: 60 }}>
          <div className="hq-m-card hq-m-stat" style={{ background: 'var(--hq-card)', borderLeft: '4px solid var(--hq-accent)', borderRadius: '0 24px 24px 0', padding: 40, position: 'relative', overflow: 'hidden', width: '100%', maxWidth: 1200, margin: '0 auto' }}>
            <div className="hq-m-stat-bg"><Lock size={200}/></div>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'inline-block', padding: '8px 16px', background: 'var(--hq-bg)', borderRadius: 8, fontSize: 14, fontWeight: 700, marginBottom: 16 }}>FEATURE 3</div>
              <h3 className="font-bold tracking-tighter ">{translate('featTools.email.t3') || t.comp3Title}</h3>
              <p>{translate('featTools.email.d3') || t.comp3Desc}</p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 40 }}>
          <h2 className="font-bold tracking-tighter " style={{ fontSize: 'clamp(32px, 5vw, 48px)' }}>{t.stepsTitle} {typeName}</h2>
        </div>

        <div className="hq-steps-grid">
          {[
            { n: '1', t: t.step1Title, d: `${t.step1Desc} (${typeName})` },
            { n: '2', t: t.step2Title, d: t.step2Desc },
            { n: '3', t: t.step3Title, d: t.step3Desc }
          ].map(step => (
            <div key={step.n} className="hq-step-masonry">
              <div style={{ color: 'var(--hq-accent)' }}><MoveRight size={32} strokeWidth={3} /></div>
              <h4>{step.t}</h4>
              <p>{step.d}</p>
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
              const q = translate(`faqTools.email.q${num}`);
              const a = translate(`faqTools.email.a${num}`);
              if (!q || q === `faqTools.email.q${num}`) return null;
              return (
              <div key={i} style={{ background: 'var(--hq-card)', borderRadius: 24, boxShadow: openFaq === i ? 'inset 2px 2px 5px var(--hq-shadow-dark), inset -2px -2px 5px var(--hq-shadow-light)' : '5px 5px 10px var(--hq-shadow-dark), -5px -5px 10px var(--hq-shadow-light)', overflow: 'hidden', transition: 'all 0.3s ease' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Mail size={20} style={{ color: openFaq === i ? 'var(--hq-accent)' : 'var(--hq-text-muted)' }} />
                    <span style={{ fontSize: 18, fontWeight: 700, color: openFaq === i ? 'var(--hq-accent)' : 'var(--hq-text)' }}>{q}</span>
                  </div>
                  <ChevronDown size={20} style={{ color: 'var(--hq-text-muted)', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                  <p style={{ padding: '0 32px 32px 68px', color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{a}</p>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutEmail;
