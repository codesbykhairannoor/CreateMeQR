import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Zap, Lock, Map, Wifi, CheckCircle2, ChevronDown } from 'lucide-react';

function LayoutWiFi({ qrType = 'wifi' }) {
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
    <div className="hq-layout-wifi">
      <style>{`
        .hq-layout-wifi {
          --hq-bg: #f8fafc;
          --hq-text: #0a1930;
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
        html.dark .hq-layout-wifi {
          --hq-bg: #040a18;
          --hq-text: #f1f5f9;
          --hq-text-muted: #94a3b8;
          --hq-card: #081226;
          --hq-border: #102040;
          --hq-accent: #3b82f6;
          --hq-accent-glow: rgba(59, 130, 246, 0.15);
        }
        .hq-container { max-width: 1300px; margin: 0 auto; padding: 0 32px; }
        
        .hq-split-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          margin-bottom: 60px;
        }
        
        .hq-split-left h2 {
          font-size: clamp(48px, 6vw, 72px);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -0.05em;
          margin-bottom: 32px;
        }
        .hq-split-left p {
          font-size: 20px;
          color: var(--hq-text-muted);
          line-height: 1.6;
          max-width: 500px;
          margin-bottom: 40px;
        }
        .hq-feature-list { display: flex; flex-direction: column; gap: 20px; }
        .hq-feature-item { display: flex; alignItems: center; gap: 16px; font-size: 18px; font-weight: 600; }
        .hq-feature-icon {
          width: 48px; height: 48px; border-radius: 16px;
          background: var(--hq-accent-glow); color: var(--hq-accent);
          display: flex; align-items: center; justify-content: center;
        }

        .hq-split-right { display: flex; justify-content: center; }
        .hq-glow-orb { position: relative; width: 340px; height: 340px; }
        .hq-glow-orb-inner {
          position: absolute; inset: 0; border-radius: 50%;
          border: 2px solid rgba(37, 99, 235, 0.2);
        }
        .hq-glow-orb-mid {
          position: absolute; inset: 40px; border-radius: 50%;
          border: 2px dashed rgba(37, 99, 235, 0.3);
          animation: spin 30s linear infinite;
        }
        .hq-glow-orb-core {
          position: absolute; inset: 80px; border-radius: 50%;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(29, 78, 216, 0.2));
          display: flex; alignItems: center; justify-content: center;
          box-shadow: 0 0 80px rgba(37, 99, 235, 0.3);
        }
        html.dark .hq-glow-orb-inner { border-color: rgba(59, 130, 246, 0.3); }
        html.dark .hq-glow-orb-mid { border-color: rgba(59, 130, 246, 0.4); }
        html.dark .hq-glow-orb-core { 
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.3));
            box-shadow: 0 0 80px rgba(59, 130, 246, 0.4);
        }
        
        @keyframes spin { 100% { transform: rotate(360deg); } }

        .hq-step-cards {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-bottom: 60px;
        }
        .hq-step-card {
          background: var(--hq-bg); border-top: 4px solid var(--hq-border); padding: 40px 0;
        }
        .hq-step-card:hover { border-top-color: var(--hq-accent); }
        .hq-step-num { font-size: 64px; font-weight: 900; color: var(--hq-border); line-height: 1; margin-bottom: 24px; }
        
        .hq-faq-section { background: var(--hq-card); border-top: 1px solid var(--hq-border); padding: 100px 0; }
        
        @media (max-width: 992px) {
          .hq-split-hero { grid-template-columns: 1fr; text-align: center; gap: 40px; }
          .hq-split-left p { margin: 0 auto 40px auto; }
          .hq-feature-list { align-items: center; }
          .hq-step-cards { grid-template-columns: 1fr; }
        }
      
        
        
              
              
        /* DEEP MOBILE FIXES (Phase 5) */
        @media (max-width: 768px) {
          /* General Container fixes */
          .hq-layout-wifi .hq-container { padding: 0 16px !important; gap: 24px !important; }
          
          
          
          
          
          

          /* LinkedIn specific avatar overlaps */
          .hq-layout-wifi div.hq-li-avatar, .hq-layout-wifi div[class*="-avatar"] {
            width: 80px !important;
            height: 80px !important;
            top: -40px !important;
          }
          .hq-layout-wifi div.hq-li-profile-info, .hq-layout-wifi div[class*="-profile-info"] {
            margin-top: 50px !important;
          }
          .hq-layout-wifi div.hq-li-cover { height: 100px !important; }

          /* Ensure text wraps correctly without horizontal scroll */
          .hq-layout-wifi h1, .hq-layout-wifi h2, .hq-layout-wifi h3, .hq-layout-wifi p {
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            max-width: 100% !important;
          }
        }
    
      `}</style>

      <div className="hq-container">
        <div className="hq-split-hero">
          <div className="hq-split-left">
            <div style={{ display: 'inline-flex', padding: '10px 20px', background: 'var(--hq-accent-glow)', borderRadius: 100, color: 'var(--hq-accent)', fontWeight: 700, fontSize: '14px', marginBottom: 24, gap: 8, alignItems: 'center' }}>
              <ShieldCheck size={16} /> 100% Client-Side Processing
            </div>
            <h2 className="font-bold tracking-tighter ">{t.heroTitle} <br/><span style={{ color: 'var(--hq-accent)' }}>{typeName}</span></h2>
            <p>{t.heroSubtitle}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div style={{ background: 'var(--hq-bg)', borderRadius: 32, padding: 48, border: '1px solid var(--hq-border)', position: 'relative', overflow: 'hidden', boxShadow: 'inset 0 0 100px rgba(0,0,0,0.05)' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'var(--hq-accent)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                  <div style={{ flex: 1 }}>
                    <h3 className="font-bold tracking-tighter " style={{ fontSize: 36,  marginBottom: 16 }}>{translate('featTools.wifi.t1') || t.comp1Title}</h3>
                    <p style={{ fontSize: 20, color: 'var(--hq-text-muted)', lineHeight: 1.6 }}>{translate('featTools.wifi.d1') || t.comp1Desc}</p>
                  </div>
                  <Wifi size={80} style={{ color: 'var(--hq-accent)', opacity: 0.5 }} />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
                <div style={{ background: 'var(--hq-card)', borderRadius: 32, padding: 48, border: '1px solid var(--hq-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <ShieldCheck size={40} style={{ color: 'var(--hq-accent)', marginBottom: 24 }} />
                  <h3 className="font-bold tracking-tighter " style={{ fontSize: 24,  marginBottom: 16 }}>{translate('featTools.wifi.t2') || t.comp2Title}</h3>
                  <p style={{ color: 'var(--hq-text-muted)', lineHeight: 1.6 }}>{translate('featTools.wifi.d2') || t.comp2Desc}</p>
                </div>
                <div style={{ background: 'var(--hq-card)', borderRadius: 32, padding: 48, border: '1px solid var(--hq-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <Lock size={40} style={{ color: 'var(--hq-accent)', marginBottom: 24 }} />
                  <h3 className="font-bold tracking-tighter " style={{ fontSize: 24,  marginBottom: 16 }}>{translate('featTools.wifi.t3') || t.comp3Title}</h3>
                  <p style={{ color: 'var(--hq-text-muted)', lineHeight: 1.6 }}>{translate('featTools.wifi.d3') || t.comp3Desc}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hq-split-right">
            <div className="hq-glow-orb">
              <div className="hq-glow-orb-inner" />
              <div className="hq-glow-orb-mid" />
              <div className="hq-glow-orb-core">
                <Wifi size={80} color="var(--hq-accent)" />
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 className="font-bold tracking-tighter " style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>{t.stepsTitle} {typeName}</h2>
        </div>

        <div className="hq-step-cards">
          {[
            { n: '01', t: t.step1Title, d: `${t.step1Desc} (${typeName})` },
            { n: '02', t: t.step2Title, d: t.step2Desc },
            { n: '03', t: t.step3Title, d: t.step3Desc }
          ].map(step => (
            <div key={step.n} className="hq-step-card">
              <div className="hq-step-num">{step.n}</div>
              <h3 className="font-bold tracking-tighter " style={{ fontSize: 24,  marginBottom: 12 }}>{step.t}</h3>
              <p style={{ color: 'var(--hq-text-muted)', lineHeight: 1.6, fontSize: 16 }}>{step.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="hq-faq-section">
        <div className="hq-container" style={{ maxWidth: 800 }}>
          <h2 className="font-bold tracking-tighter " style={{ paddingTop: 0, fontSize: 'clamp(32px, 5vw, 48px)',  textAlign: 'center', marginBottom: 40 }}>
            {t.faqTitle} {typeName}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = translate(`faqTools.wifi.q${num}`);
              const a = translate(`faqTools.wifi.a${num}`);
              if (!q || q === `faqTools.wifi.q${num}`) return null;
              return (
                <div key={i} style={{ background: 'var(--hq-bg)', borderRadius: 20, border: '2px solid', borderColor: openFaq === i ? 'var(--hq-accent)' : 'var(--hq-border)', overflow: 'hidden', transition: 'all 0.3s' }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ padding: 8, borderRadius: 12, background: openFaq === i ? 'var(--hq-accent)' : 'var(--hq-accent-glow)', color: openFaq === i ? '#fff' : 'var(--hq-accent)', transition: 'all 0.3s' }}>
                        <Wifi size={20} />
                      </div>
                      <span style={{ fontSize: 18, fontWeight: 700 }}>{q}</span>
                    </div>
                    <ChevronDown size={20} style={{ color: 'var(--hq-text-muted)', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </button>
                  <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                    <p style={{ padding: '0 24px 24px 72px', color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutWiFi;
