import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Zap, Lock, QrCode, Smartphone, ChevronDown, Globe, Sparkles } from 'lucide-react';

function LayoutURL({ qrType = 'url' }) {
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
    <div className="hq-layout-url">
      <style>{`
        .hq-layout-url {
          --hq-bg: #f8fafc;
          --hq-text: #0f172a;
          --hq-text-muted: #475569;
          --hq-card: #ffffff;
          --hq-border: #e2e8f0;
          /* LOCKED TO BASE PALETTE */
          --hq-accent: #2563eb;
          --hq-accent-glow: rgba(37, 99, 235, 0.1);
          font-family: var(--font-main);
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 160px; /* REQUIRED MASSIVE SPACING */
        }
        html.dark .hq-layout-url {
          --hq-bg: #040a18;
          --hq-text: #f1f5f9;
          --hq-text-muted: #94a3b8;
          --hq-card: #081226;
          --hq-border: #1e293b;
          --hq-accent: #3b82f6;
          --hq-accent-glow: rgba(59, 130, 246, 0.15);
        }
        .hq-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        .hq-bento {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }
        .hq-card {
          background: var(--hq-card);
          border: 1px solid var(--hq-border);
          border-radius: 24px;
          padding: 32px;
          transition: transform 0.3s, border-color 0.3s;
          display: flex; flex-direction: column;
        }
        .hq-card:hover { border-color: var(--hq-accent); transform: translateY(-2px); }
        .hq-icon-box {
          width: 56px; height: 56px;
          border-radius: 16px;
          background: var(--hq-accent-glow);
          color: var(--hq-accent);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 24px;
        }
        .hq-card-title { font-size: 20px; font-weight: 700; margin-bottom: 12px; }
        .hq-card-desc { color: var(--hq-text-muted); line-height: 1.6; }
        
        @media (max-width: 992px) {
          .hq-bento > div { grid-column: span 12 !important; }
        }
      
        
        
              
              
        /* DEEP MOBILE FIXES (Phase 5) */
        @media (max-width: 768px) {
          /* General Container fixes */
          .hq-layout-url .hq-container { padding: 0 16px !important; gap: 24px !important; }
          
          
          
          
          
          

          /* LinkedIn specific avatar overlaps */
          .hq-layout-url div.hq-li-avatar, .hq-layout-url div[class*="-avatar"] {
            width: 80px !important;
            height: 80px !important;
            top: -40px !important;
          }
          .hq-layout-url div.hq-li-profile-info, .hq-layout-url div[class*="-profile-info"] {
            margin-top: 50px !important;
          }
          .hq-layout-url div.hq-li-cover { height: 100px !important; }

          /* Ensure text wraps correctly without horizontal scroll */
          .hq-layout-url h1, .hq-layout-url h2, .hq-layout-url h3, .hq-layout-url p {
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            max-width: 100% !important;
          }
        }
    
      `}</style>

      <div className="hq-container">
        <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 80px auto' }}>
          <div style={{ display: 'inline-flex', padding: '8px 16px', background: 'var(--hq-accent-glow)', borderRadius: 100, color: 'var(--hq-accent)', fontWeight: 700, fontSize: '14px', marginBottom: 24, alignItems: 'center', gap: 8 }}>
            <Sparkles size={16} /> {t.badgeLeadMarket || 'The Engineering Standard'}
          </div>
          <h2 className="font-bold tracking-tighter " style={{ fontSize: 'clamp(40px, 6vw, 64px)',   lineHeight: 1.1, marginBottom: 24 }}>
            {t.heroTitle} <span style={{ color: 'var(--hq-accent)' }}>{typeName}</span>
          </h2>
          <p style={{ fontSize: 20, color: 'var(--hq-text-muted)', lineHeight: 1.6 }}>{t.heroSubtitle}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 24 }}>
          {/* Main feature - URL Style */}
          <div style={{ gridColumn: 'span 12', background: 'var(--hq-bg)', border: '2px solid var(--hq-accent)', borderRadius: 24, padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -50, top: -50, width: 300, height: 300, background: 'var(--hq-accent-glow)', filter: 'blur(80px)', borderRadius: '50%' }} />
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '50%' }}>
              <div style={{ display: 'inline-block', padding: '12px 24px', background: 'var(--hq-accent)', color: '#fff', borderRadius: 100, fontWeight: 800, marginBottom: 24 }}>
                URL.01
              </div>
              <h3 className="font-bold tracking-tighter " style={{ fontSize: 32,  marginBottom: 16 }}>{translate('featTools.url.t1') || t.comp1Title}</h3>
              <p style={{ fontSize: 18, color: 'var(--hq-text-muted)', lineHeight: 1.6 }}>{translate('featTools.url.d1') || t.comp1Desc}</p>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <ShieldCheck size={120} style={{ color: 'var(--hq-accent)' }} />
            </div>
          </div>
          
          <div style={{ gridColumn: 'span 6', background: 'var(--hq-card)', borderRadius: 24, padding: 40, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: 'var(--hq-bg)', border: '1px solid var(--hq-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, color: 'var(--hq-accent)' }}>
              <Zap size={32} />
            </div>
            <h3 className="font-bold tracking-tighter " style={{ fontSize: 24,  marginBottom: 12 }}>{translate('featTools.url.t2') || t.comp2Title}</h3>
            <p style={{ color: 'var(--hq-text-muted)', lineHeight: 1.6 }}>{translate('featTools.url.d2') || t.comp2Desc}</p>
          </div>
          
          <div style={{ gridColumn: 'span 6', background: 'var(--hq-card)', borderRadius: 24, padding: 40, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: 'var(--hq-bg)', border: '1px solid var(--hq-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, color: 'var(--hq-accent)' }}>
              <Lock size={32} />
            </div>
            <h3 className="font-bold tracking-tighter " style={{ fontSize: 24,  marginBottom: 12 }}>{translate('featTools.url.t3') || t.comp3Title}</h3>
            <p style={{ color: 'var(--hq-text-muted)', lineHeight: 1.6 }}>{translate('featTools.url.d3') || t.comp3Desc}</p>
          </div>
        </div>

          <div style={{ gridColumn: 'span 12', marginTop: 80, marginBottom: 40 }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ display: 'inline-flex', padding: '8px 16px', background: 'var(--hq-accent-glow)', borderRadius: 100, color: 'var(--hq-accent)', fontWeight: 700, fontSize: '14px', marginBottom: 16 }}>
                Fast & Easy
              </div>
              <h3 className="font-bold tracking-tighter" style={{ fontSize: 'clamp(32px, 4vw, 40px)', color: 'var(--hq-text)' }}>{t.stepsTitle} <span style={{ color: 'var(--hq-accent)' }}>{typeName}</span></h3>
            </div>
            
            {/* The hq-steps-bento class will automatically stack on mobile due to Phase 5 CSS */}
            <div className="hq-steps-bento" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {[
                  { n: '1', t: t.step1Title, d: `${t.step1Desc} (${typeName})` },
                  { n: '2', t: t.step2Title, d: t.step2Desc },
                  { n: '3', t: t.step3Title, d: t.step3Desc }
              ].map((step) => (
                <div key={step.n} style={{ background: 'var(--hq-bg)', padding: 40, borderRadius: 24, border: '2px solid var(--hq-border)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                  
                  {/* Giant Watermark Number */}
                  <div style={{ position: 'absolute', top: -15, right: -5, fontSize: 140, fontWeight: 900, color: 'var(--hq-accent)', opacity: 0.05, lineHeight: 1, pointerEvents: 'none' }}>
                    0{step.n}
                  </div>
                  
                  {/* Step Badge */}
                  <div style={{ width: 64, height: 64, borderRadius: 20, background: 'var(--hq-accent-glow)', color: 'var(--hq-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32, fontSize: 24, fontWeight: 800, position: 'relative', zIndex: 1 }}>
                    {step.n}
                  </div>
                  
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h4 className="font-bold tracking-tighter" style={{ fontSize: 24, marginBottom: 12 }}>{step.t}</h4>
                    <p style={{ color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      <div style={{ background: 'var(--hq-card)', borderTop: '1px solid var(--hq-border)', padding: '60px 0' }}>
        <div className="hq-container" style={{ maxWidth: 800 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'inline-flex', padding: '8px 16px', background: 'var(--hq-accent-glow)', borderRadius: 100, color: 'var(--hq-accent)', fontWeight: 700, fontSize: '14px', marginBottom: 24, alignItems: 'center', gap: 8 }}>
              <Globe size={16} /> {t.badgeFaq || 'Knowledge Base'}
            </div>
            <h2 className="font-bold tracking-tighter " style={{ paddingTop: 0, fontSize: 'clamp(32px, 5vw, 48px)' }}>{t.faqTitle} {typeName}</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = translate(`faqTools.url.q${num}`);
              const a = translate(`faqTools.url.a${num}`);
              if (!q || q === `faqTools.url.q${num}`) return null;
              return (
              <div key={i} style={{ background: 'var(--hq-bg)', borderRadius: 24, border: '1px solid var(--hq-border)', overflow: 'hidden', transition: 'all 0.3s', boxShadow: openFaq === i ? '0 10px 30px rgba(0,0,0,0.05)' : 'none' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: openFaq === i ? 'var(--hq-accent)' : 'var(--hq-text-muted)', transition: 'background 0.3s' }}></div>
                    <span style={{ fontSize: 18, fontWeight: 700, color: openFaq === i ? 'var(--hq-accent)' : 'var(--hq-text)' }}>{q}</span>
                  </div>
                  <div style={{ width: 40, height: 40, borderRadius: 20, background: openFaq === i ? 'var(--hq-accent)' : 'var(--hq-accent-glow)', color: openFaq === i ? '#fff' : 'var(--hq-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', flexShrink: 0 }}>
                    <ChevronDown size={20} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </div>
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                  <p style={{ padding: '0 32px 32px 56px', color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{a}</p>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutURL;
