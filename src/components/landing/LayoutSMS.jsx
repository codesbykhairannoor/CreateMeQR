import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, ShieldCheck, Zap, Lock, ChevronDown } from 'lucide-react';

function LayoutSMS({ qrType = 'sms' }) {
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
    <div className="hq-layout-sms">
      <style>{`
        .hq-layout-sms {
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
        html.dark .hq-layout-sms {
          --hq-bg: #040a18;
          --hq-text: #f1f5f9;
          --hq-text-muted: #94a3b8;
          --hq-card: #081226;
          --hq-border: #1e293b;
          --hq-accent: #3b82f6;
          --hq-accent-glow: rgba(59, 130, 246, 0.15);
        }
        
        .hq-container { max-width: 800px; margin: 0 auto; padding: 0 24px; }
        
        .hq-chat-hero { margin-bottom: 40px; text-align: center; }
        .hq-chat-hero h2 {
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 900; letter-spacing: -0.04em;
          margin-bottom: 24px;
        }
        .hq-chat-hero p { font-size: 20px; color: var(--hq-text-muted); line-height: 1.6; }
        
        .hq-chat-bubbles {
          display: flex; flex-direction: column; gap: 24px; margin-bottom: 60px;
        }
        .hq-bubble {
          padding: 24px 32px; border-radius: 32px; max-width: 80%;
          line-height: 1.6; position: relative;
        }
        .hq-bubble.left {
          background: var(--hq-card); border: 1px solid var(--hq-border);
          border-bottom-left-radius: 8px; align-self: flex-start;
        }
        .hq-bubble.right {
          background: var(--hq-accent); color: white;
          border-bottom-right-radius: 8px; align-self: flex-end;
        }
        .hq-bubble h3 { font-size: 18px; font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
        
        .hq-step-chat {
          display: flex; gap: 24px; align-items: center; margin-bottom: 40px;
          background: var(--hq-card); padding: 24px; border-radius: 24px;
          border: 1px solid var(--hq-border);
        }
        .hq-step-chat-num {
          width: 56px; height: 56px; border-radius: 16px; background: var(--hq-accent-glow);
          color: var(--hq-accent); display: flex; align-items: center; justify-content: center;
          font-size: 24px; font-weight: 800; flex-shrink: 0;
        }
        .hq-step-chat h4 { font-size: 20px; font-weight: 700; margin-bottom: 4px; }
        .hq-step-chat p { color: var(--hq-text-muted); }
      `}</style>

      <div className="hq-container">
        <div className="hq-chat-hero">
          <div style={{ color: 'var(--hq-accent)', marginBottom: 24 }}><MessageSquare size={64} /></div>
          <h2 className="font-bold tracking-tighter ">{t.heroTitle} <br/>{typeName}</h2>
          <p>{t.heroSubtitle}</p>
        </div>

        <div className="hq-chat-bubbles">
          <div className="hq-bubble left" style={{ background: 'var(--hq-card)', border: 'none', borderBottomLeftRadius: 4 }}>
            <h3 className="font-bold tracking-tighter" style={{ color: 'var(--hq-accent)' }}><ShieldCheck size={20}/> {translate('featTools.sms.t1') || t.comp1Title}</h3>
            <div>{translate('featTools.sms.d1') || t.comp1Desc}</div>
          </div>
          <div className="hq-bubble right" style={{ background: 'var(--hq-accent)', color: '#fff', border: 'none', borderBottomRightRadius: 4 }}>
            <h3 className="font-bold tracking-tighter" style={{ color: '#fff' }}><Zap size={20}/> {translate('featTools.sms.t2') || t.comp2Title}</h3>
            <div style={{ opacity: 0.9 }}>{translate('featTools.sms.d2') || t.comp2Desc}</div>
          </div>
          <div className="hq-bubble left" style={{ background: 'var(--hq-card)', border: 'none', borderBottomLeftRadius: 4 }}>
            <h3 className="font-bold tracking-tighter" style={{ color: 'var(--hq-accent)' }}><Lock size={20}/> {translate('featTools.sms.t3') || t.comp3Title}</h3>
            <div>{translate('featTools.sms.d3') || t.comp3Desc}</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 className="font-bold tracking-tighter " style={{ fontSize: 'clamp(28px, 4vw, 40px)' }}>{t.stepsTitle} {typeName}</h2>
        </div>

        <div style={{ marginBottom: 60 }}>
          {[
            { n: '1', t: t.step1Title, d: `${t.step1Desc} (${typeName})` },
            { n: '2', t: t.step2Title, d: t.step2Desc },
            { n: '3', t: t.step3Title, d: t.step3Desc }
          ].map(step => (
            <div key={step.n} className="hq-step-chat">
              <div className="hq-step-chat-num">{step.n}</div>
              <div>
                <h4>{step.t}</h4>
                <p>{step.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'var(--hq-card)', borderTop: '1px solid var(--hq-border)', padding: '60px 0' }}>
        <div className="hq-container">
          <h2 className="font-bold tracking-tighter " style={{ paddingTop: 60, fontSize: 'clamp(32px, 5vw, 48px)',  textAlign: 'center', marginBottom: 60 }}>
            {t.faqTitle} {typeName}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = translate(`faqTools.sms.q${num}`);
              const a = translate(`faqTools.sms.a${num}`);
              if (!q || q === `faqTools.sms.q${num}`) return null;
              return (
              <div key={i} style={{ background: openFaq === i ? 'var(--hq-accent)' : 'var(--hq-bg)', borderRadius: 24, border: '1px solid', borderColor: openFaq === i ? 'var(--hq-accent)' : 'var(--hq-border)', overflow: 'hidden', transition: 'all 0.3s', boxShadow: openFaq === i ? '0 10px 20px rgba(0,0,0,0.1)' : 'none' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: openFaq === i ? '#fff' : 'var(--hq-text)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <MessageSquare size={20} style={{ opacity: 0.8 }} />
                    <span style={{ fontSize: 18, fontWeight: 700 }}>{q}</span>
                  </div>
                  <ChevronDown size={20} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                  <p style={{ padding: '0 32px 32px 68px', color: openFaq === i ? 'rgba(255,255,255,0.9)' : 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{a}</p>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutSMS;
