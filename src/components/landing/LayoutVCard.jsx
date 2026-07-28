import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserCircle2, ShieldCheck, Zap, CheckCircle2, ChevronDown, Lock } from 'lucide-react';

function LayoutVCard({ qrType = 'vcard' }) {
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
    <div className="hq-layout-vcard">
      <style>{`
        .hq-layout-vcard {
          --hq-bg: #f8fafc;
          --hq-text: #0a1930;
          --hq-text-muted: #475569;
          --hq-card: #ffffff;
          --hq-border: #e2e8f0;
          /* LOCKED TO BASE PALETTE */
          --hq-accent: #2563eb;
          --hq-accent-glow: rgba(37, 99, 235, 0.1);
          --hq-grad: linear-gradient(135deg, var(--hq-accent), #60a5fa);
          font-family: var(--font-main);
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 160px; /* REQUIRED MASSIVE SPACING */
        }
        html.dark .hq-layout-vcard {
          --hq-bg: #040a18;
          --hq-text: #f1f5f9;
          --hq-text-muted: #94a3b8;
          --hq-card: #081226;
          --hq-border: #1e293b;
          --hq-accent: #3b82f6;
          --hq-accent-glow: rgba(59, 130, 246, 0.15);
          --hq-grad: linear-gradient(135deg, #1d4ed8, var(--hq-accent));
        }
        
        .hq-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        .hq-profile-hero {
          background: var(--hq-card);
          border: 1px solid var(--hq-border);
          border-radius: 40px;
          padding: 80px 40px;
          text-align: center;
          margin-bottom: 40px;
          box-shadow: 0 20px 80px -20px rgba(37, 99, 235, 0.05);
          position: relative;
          overflow: hidden;
        }
        html.dark .hq-profile-hero { box-shadow: none; }
        
        .hq-hero-bg {
          position: absolute; top: 0; left: 0; right: 0; height: 160px;
          background: var(--hq-grad); opacity: 0.1;
        }
        
        .hq-avatar-wrap {
          width: 120px; height: 120px;
          border-radius: 50%;
          background: var(--hq-card);
          border: 4px solid var(--hq-bg);
          color: var(--hq-accent);
          display: flex; align-items: center; justify-content: center;
          margin: -20px auto 32px auto;
          position: relative;
          z-index: 2;
          box-shadow: 0 10px 30px -10px var(--hq-accent-glow);
        }
        
        .hq-profile-hero h2 {
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 900;
          letter-spacing: -0.04em;
          margin-bottom: 24px;
          position: relative; z-index: 2;
        }
        .hq-profile-hero p {
          font-size: 20px;
          color: var(--hq-text-muted);
          max-width: 600px; margin: 0 auto 40px auto;
          line-height: 1.6;
          position: relative; z-index: 2;
        }
        
        .hq-badge-strip {
          display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; position: relative; z-index: 2;
        }
        .hq-badge {
          background: var(--hq-bg); border: 1px solid var(--hq-border);
          padding: 8px 16px; border-radius: 999px;
          font-size: 14px; font-weight: 600;
          display: flex; align-items: center; gap: 8px;
        }
        
        .hq-horizontal-cards {
          display: flex; gap: 24px; overflow-x: auto; padding-bottom: 40px;
          scroll-snap-type: x mandatory;
          -ms-overflow-style: none; scrollbar-width: none;
        }
        .hq-horizontal-cards::-webkit-scrollbar { display: none; }
        .hq-h-card {
          min-width: 340px; flex: 1;
          background: var(--hq-card); border: 1px solid var(--hq-border);
          border-radius: 24px; padding: 40px;
          scroll-snap-align: start;
        }
        .hq-h-card h3 { font-size: 24px; font-weight: 800; margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
        .hq-h-card p { color: var(--hq-text-muted); line-height: 1.6; }
        
        .hq-timeline {
          max-width: 600px; margin: 0 auto 100px auto;
        }
        .hq-t-item { display: flex; gap: 24px; margin-bottom: 40px; }
        .hq-t-num { width: 48px; height: 48px; border-radius: 50%; background: var(--hq-grad); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 20px; flex-shrink: 0; }
        .hq-t-content h4 { font-size: 20px; font-weight: 700; margin-bottom: 8px; margin-top: 8px; }
        .hq-t-content p { color: var(--hq-text-muted); line-height: 1.6; }
      
        
        
              
              
        /* DEEP MOBILE FIXES (Phase 5) */
        @media (max-width: 768px) {
          /* General Container fixes */
          .hq-layout-vcard .hq-container { padding: 0 16px !important; gap: 24px !important; }
          
          /* NATIVE MOCKUP SCALING:
             Instead of crushing the height (which destroys internal CSS), 
             we use native transform scale to shrink the mockups proportionally! */
          .hq-layout-vcard div[class*="-phone"], .hq-layout-vcard div[class*="-player"], .hq-layout-vcard div[class*="-mockup"], .hq-layout-vcard div[class*="-mock"] {
            transform: scale(0.85) !important;
            transform-origin: top center !important;
            margin: 0 auto !important;
            /* Negative margin to eat up the empty space left by scaling */
            margin-bottom: -60px !important;
            /* Do not override height or aspect-ratio so internal CSS stays intact! */
          }
          
          /* Fix Hero Stacking safely */
          .hq-layout-vcard div[class*="-hero"], .hq-layout-vcard div[class*="-main"], .hq-layout-vcard div[class*="-wrapper"], .hq-layout-vcard div[class*="main"] {
            display: flex !important;
            flex-direction: column !important;
            padding: 32px 0 !important;
            gap: 24px !important;
          }
          
          /* Fix Grid Squeezing (Video, Image, PDF features) */
          .hq-layout-vcard div[class*="-bento"], .hq-layout-vcard div[class*="-features"], .hq-layout-vcard div[class*="-grid"], .hq-layout-vcard div[class*="-row"], .hq-layout-vcard div[class*="bento"], .hq-layout-vcard div[class*="features"] {
            display: flex !important;
            flex-direction: column !important;
          }

          /* LinkedIn specific avatar overlaps */
          .hq-layout-vcard div.hq-li-avatar, .hq-layout-vcard div[class*="-avatar"] {
            width: 80px !important;
            height: 80px !important;
            top: -40px !important;
          }
          .hq-layout-vcard div.hq-li-profile-info, .hq-layout-vcard div[class*="-profile-info"] {
            margin-top: 50px !important;
          }
          .hq-layout-vcard div.hq-li-cover { height: 100px !important; }

          /* Ensure text wraps correctly without horizontal scroll */
          .hq-layout-vcard h1, .hq-layout-vcard h2, .hq-layout-vcard h3, .hq-layout-vcard p {
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            max-width: 100% !important;
          }
        }
    
      `}</style>

      <div className="hq-container">
        <div className="hq-profile-hero">
          <div className="hq-hero-bg"></div>
          <div className="hq-avatar-wrap"><UserCircle2 size={64} strokeWidth={1.5} /></div>
          <h2 className="font-bold tracking-tighter ">{t.heroTitle} <br/><span style={{ color: 'var(--hq-accent)' }}>{typeName}</span></h2>
          <p>{t.heroSubtitle}</p>
          <div className="hq-badge-strip">
            <div className="hq-badge"><span style={{ color: 'var(--hq-accent)' }}><ShieldCheck size={16}/></span> {t.badgePrivate || 'Private'}</div>
            <div className="hq-badge"><span style={{ color: 'var(--hq-accent)' }}><CheckCircle2 size={16}/></span> {t.badgeZeroAds || 'No Ads'}</div>
            <div className="hq-badge"><span style={{ color: 'var(--hq-accent)' }}><Zap size={16}/></span> {t.badgeFree || 'Free'}</div>
          </div>
        </div>
        
        <div style={{ marginBottom: 40 }}>
          <h2 className="font-bold tracking-tighter " style={{ fontSize: 'clamp(28px, 4vw, 40px)',  textAlign: 'center' }}>
            {t.badgeLeadMarket || 'Why We Lead'}
          </h2>
        </div>
        
        <div className="hq-horizontal-cards">
          <div className="hq-h-card" style={{ background: 'linear-gradient(145deg, var(--hq-bg), var(--hq-card))', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
            <h3 className="font-bold tracking-tighter "><div style={{ padding: 12, background: 'var(--hq-accent-glow)', borderRadius: 12, display: 'inline-flex', marginRight: 12 }}><ShieldCheck size={28} color="var(--hq-accent)" /></div> {translate('featTools.vcard.t1') || t.comp1Title}</h3>
            <p>{translate('featTools.vcard.d1') || t.comp1Desc}</p>
          </div>
          <div className="hq-h-card" style={{ background: 'linear-gradient(145deg, var(--hq-bg), var(--hq-card))', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
            <h3 className="font-bold tracking-tighter "><div style={{ padding: 12, background: 'var(--hq-accent-glow)', borderRadius: 12, display: 'inline-flex', marginRight: 12 }}><Zap size={28} color="var(--hq-accent)" /></div> {translate('featTools.vcard.t2') || t.comp2Title}</h3>
            <p>{translate('featTools.vcard.d2') || t.comp2Desc}</p>
          </div>
          <div className="hq-h-card" style={{ background: 'linear-gradient(145deg, var(--hq-bg), var(--hq-card))', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
            <h3 className="font-bold tracking-tighter "><div style={{ padding: 12, background: 'var(--hq-accent-glow)', borderRadius: 12, display: 'inline-flex', marginRight: 12 }}><Lock size={28} color="var(--hq-accent)" /></div> {translate('featTools.vcard.t3') || t.comp3Title}</h3>
            <p>{translate('featTools.vcard.d3') || t.comp3Desc}</p>
          </div>
        </div>

        <div style={{ marginBottom: 60, marginTop: 40 }}>
          <h2 className="font-bold tracking-tighter " style={{ fontSize: 'clamp(28px, 4vw, 40px)',  textAlign: 'center' }}>
            {t.stepsTitle} {typeName}
          </h2>
        </div>

        <div className="hq-timeline">
          {[
            { n: '1', t: t.step1Title, d: `${t.step1Desc} (${typeName})` },
            { n: '2', t: t.step2Title, d: t.step2Desc },
            { n: '3', t: t.step3Title, d: t.step3Desc }
          ].map(step => (
            <div key={step.n} className="hq-t-item">
              <div className="hq-t-num">{step.n}</div>
              <div className="hq-t-content">
                <h4>{step.t}</h4>
                <p>{step.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: 'var(--hq-card)', borderTop: '1px solid var(--hq-border)', padding: '60px 0' }}>
        <div className="hq-container" style={{ maxWidth: 800 }}>
          <h2 className="font-bold tracking-tighter " style={{ paddingTop: 60, fontSize: 'clamp(32px, 5vw, 48px)',  textAlign: 'center', marginBottom: 60 }}>
            {t.faqTitle} {typeName}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = translate(`faqTools.vcard.q${num}`);
              const a = translate(`faqTools.vcard.a${num}`);
              if (!q || q === `faqTools.vcard.q${num}`) return null;
              return (
              <div key={i} style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(12px)', borderRadius: 16, border: '1px solid', borderColor: openFaq === i ? 'var(--hq-accent)' : 'rgba(255,255,255,0.05)', overflow: 'hidden', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}>
                  <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.02em' }}>{q}</span>
                  <div style={{ color: openFaq === i ? 'var(--hq-accent)' : 'var(--hq-text-muted)', transition: 'all 0.3s' }}>
                    <ChevronDown size={20} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                  </div>
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0, transition: 'opacity 0.4s' }}>
                  <p style={{ padding: '0 24px 24px 24px', color: 'var(--hq-text-muted)', fontSize: 15, lineHeight: 1.6, borderTop: openFaq === i ? '1px solid rgba(255,255,255,0.05)' : 'none', paddingTop: openFaq === i ? 20 : 0 }}>{a}</p>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutVCard;
