import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarRange, ShieldCheck, Zap, Lock, ChevronDown, Ticket } from 'lucide-react';

function LayoutEvent({ qrType = 'event' }) {
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
    <div className="hq-layout-event">
      <style>{`
        .hq-layout-event {
          --hq-bg: #f8fafc;
          --hq-text: #0a1930;
          --hq-text-muted: #475569;
          --hq-card: #ffffff;
          --hq-border: #e2e8f0;
          --hq-accent: #2563eb;
          --hq-accent-glow: rgba(37, 99, 235, 0.1);
          font-family: -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Display", "Helvetica Neue", sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 160px; /* REQUIRED MASSIVE SPACING */
        }
        html.dark .hq-layout-event {
          --hq-bg: #040a18;
          --hq-text: #f1f5f9;
          --hq-text-muted: #94a3b8;
          --hq-card: #081226;
          --hq-border: #1e293b;
          --hq-accent: #3b82f6;
          --hq-accent-glow: rgba(59, 130, 246, 0.15);
        }
        
        .hq-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        .hq-ticket-hero {
          display: flex; margin-bottom: 60px;
          background: var(--hq-card); border-radius: 24px;
          box-shadow: 0 40px 100px -20px rgba(0,0,0,0.1);
          position: relative; overflow: hidden;
        }
        html.dark .hq-ticket-hero { box-shadow: 0 40px 100px -20px rgba(0,0,0,0.5); }
        .hq-ticket-left { flex: 1; padding: 80px 60px; position: relative; }
        .hq-ticket-right {
          flex: 0 0 300px; padding: 80px 40px;
          background: var(--hq-accent); color: white;
          border-left: 2px dashed rgba(255,255,255,0.3);
          display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;
        }
        /* Ticket Cutouts */
        .hq-ticket-hero::before, .hq-ticket-hero::after {
          content: ''; position: absolute; top: -20px; right: 280px; width: 40px; height: 40px;
          background: var(--hq-bg); border-radius: 50%; z-index: 2;
        }
        .hq-ticket-hero::after { top: auto; bottom: -20px; }
        
        .hq-ticket-left h2 { font-size: clamp(32px, 5vw, 64px); font-weight: 900; margin-bottom: 24px; letter-spacing: -0.04em; }
        .hq-ticket-left p { font-size: 20px; color: var(--hq-text-muted); max-width: 500px; line-height: 1.6; }
        
        .hq-event-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 60px; }
        .hq-e-card { background: var(--hq-bg); border: 1px solid var(--hq-border); border-radius: 16px; padding: 32px; display: flex; gap: 16px; }
        .hq-e-icon { flex: 0 0 48px; height: 48px; border-radius: 12px; background: var(--hq-accent-glow); color: var(--hq-accent); display: flex; align-items: center; justify-content: center; }
        .hq-e-content h3 { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
        .hq-e-content p { color: var(--hq-text-muted); font-size: 14px; line-height: 1.6; }
        
        .hq-event-steps { margin-bottom: 60px; }
        .hq-event-step {
          background: var(--hq-card); border: 1px solid var(--hq-border);
          padding: 32px 40px; border-radius: 16px; margin-bottom: 24px;
          display: flex; align-items: center; gap: 32px;
        }
        .hq-event-step-num { font-size: 64px; font-weight: 900; color: var(--hq-accent-glow); line-height: 1; }
        .hq-event-step h4 { font-size: 24px; font-weight: 800; margin-bottom: 8px; }
        .hq-event-step p { color: var(--hq-text-muted); font-size: 18px; line-height: 1.6; }
        
        @media (max-width: 992px) {
          .hq-ticket-hero { flex-direction: column; }
          .hq-ticket-right { flex: auto; border-left: none; border-top: 2px dashed rgba(255,255,255,0.3); }
          .hq-ticket-hero::before, .hq-ticket-hero::after { right: -20px; top: auto; bottom: 280px; }
          .hq-ticket-hero::after { right: auto; left: -20px; }
          .hq-event-grid { grid-template-columns: 1fr; }
          .hq-event-step { flex-direction: column; text-align: center; }
        }
      `}</style>

      <div className="hq-container">
        <div className="hq-ticket-hero">
          <div className="hq-ticket-left">
            <div style={{ color: 'var(--hq-accent)', marginBottom: 24 }}><CalendarRange size={48} /></div>
            <h2 className="font-bold tracking-tighter ">{t.heroTitle} <br/>{typeName}</h2>
            <p>{t.heroSubtitle}</p>
          </div>
          <div className="hq-ticket-right">
            <Ticket size={80} style={{ opacity: 0.5, marginBottom: 24 }} />
            <div style={{ fontSize: 24, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 4 }}>Admit One</div>
          </div>
        </div>

        <div className="hq-event-grid">
          <div className="hq-e-card" style={{ background: 'var(--hq-bg)', borderTop: '4px solid var(--hq-accent)', borderBottom: '1px solid var(--hq-border)', borderLeft: '1px solid var(--hq-border)', borderRight: '1px solid var(--hq-border)' }}>
            <div className="hq-e-icon" style={{ background: 'var(--hq-card)', border: '1px solid var(--hq-border)' }}><ShieldCheck /></div>
            <div className="hq-e-content">
              <h3 className="font-bold tracking-tighter ">{translate('featTools.event.t1') || t.comp1Title}</h3>
              <p>{translate('featTools.event.d1') || t.comp1Desc}</p>
            </div>
          </div>
          <div className="hq-e-card" style={{ background: 'var(--hq-bg)', borderTop: '4px solid var(--hq-accent)', borderBottom: '1px solid var(--hq-border)', borderLeft: '1px solid var(--hq-border)', borderRight: '1px solid var(--hq-border)' }}>
            <div className="hq-e-icon" style={{ background: 'var(--hq-card)', border: '1px solid var(--hq-border)' }}><Zap /></div>
            <div className="hq-e-content">
              <h3 className="font-bold tracking-tighter ">{translate('featTools.event.t2') || t.comp2Title}</h3>
              <p>{translate('featTools.event.d2') || t.comp2Desc}</p>
            </div>
          </div>
          <div className="hq-e-card" style={{ background: 'var(--hq-bg)', borderTop: '4px solid var(--hq-accent)', borderBottom: '1px solid var(--hq-border)', borderLeft: '1px solid var(--hq-border)', borderRight: '1px solid var(--hq-border)' }}>
            <div className="hq-e-icon" style={{ background: 'var(--hq-card)', border: '1px solid var(--hq-border)' }}><Lock /></div>
            <div className="hq-e-content">
              <h3 className="font-bold tracking-tighter ">{translate('featTools.event.t3') || t.comp3Title}</h3>
              <p>{translate('featTools.event.d3') || t.comp3Desc}</p>
            </div>
          </div>
        </div>

        <div className="hq-event-steps">
          <h2 className="font-bold tracking-tighter " style={{ fontSize: 'clamp(32px, 5vw, 48px)',  textAlign: 'center', marginBottom: 60 }}>
            {t.stepsTitle} {typeName}
          </h2>
          {[
            { n: '1', t: t.step1Title, d: `${t.step1Desc} (${typeName})` },
            { n: '2', t: t.step2Title, d: t.step2Desc },
            { n: '3', t: t.step3Title, d: t.step3Desc }
          ].map(step => (
            <div key={step.n} className="hq-event-step">
              <div className="hq-event-step-num">0{step.n}</div>
              <div>
                <h4>{step.t}</h4>
                <p>{step.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'var(--hq-card)', borderTop: '1px dashed var(--hq-border)', padding: '60px 0' }}>
        <div className="hq-container" style={{ maxWidth: 800 }}>
          <h2 className="font-bold tracking-tighter " style={{ paddingTop: 60, fontSize: 'clamp(32px, 5vw, 48px)',  textAlign: 'center', marginBottom: 60 }}>
            {t.faqTitle} {typeName}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = translate(`faqTools.event.q${num}`);
              const a = translate(`faqTools.event.a${num}`);
              if (!q || q === `faqTools.event.q${num}`) return null;
              return (
              <div key={i} style={{ background: openFaq === i ? 'var(--hq-bg)' : 'transparent', borderRadius: 20, border: '2px solid', borderColor: openFaq === i ? 'var(--hq-accent)' : 'var(--hq-border)', overflow: 'hidden', transition: 'all 0.3s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ padding: '8px 12px', background: 'var(--hq-accent-glow)', color: 'var(--hq-accent)', borderRadius: 8, fontWeight: 800, fontSize: 14 }}>
                      Q{num}
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 700 }}>{q}</span>
                  </div>
                  <ChevronDown size={20} style={{ color: 'var(--hq-text-muted)', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                  <p style={{ padding: '0 32px 32px 80px', color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{a}</p>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutEvent;
