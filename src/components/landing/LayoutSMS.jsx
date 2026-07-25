import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, ShieldCheck, Zap, Lock, ChevronDown } from 'lucide-react';

function LayoutSMS({ qrType = 'sms' }) {
  const { t: translate } = useTranslation();
  const typeName = translate(`types.${qrType}`);
  const tObj = translate('landing', { returnObjects: true });
  const t = typeof tObj === 'object' && tObj !== null ? tObj : {};
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
          font-family: -apple-system, BlinkMacSystemFont, "Inter", sans-serif;
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
        
        .hq-chat-hero { margin-bottom: 80px; text-align: center; }
        .hq-chat-hero h2 {
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 900; letter-spacing: -0.04em;
          margin-bottom: 24px;
        }
        .hq-chat-hero p { font-size: 20px; color: var(--hq-text-muted); line-height: 1.6; }
        
        .hq-chat-bubbles {
          display: flex; flexDirection: column; gap: 24px; margin-bottom: 120px;
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
          <h2>{t.heroTitle} <br/>{typeName}</h2>
          <p>{t.heroSubtitle}</p>
        </div>

        <div className="hq-chat-bubbles">
          <div className="hq-bubble left">
            <h3 style={{ color: 'var(--hq-accent)' }}><ShieldCheck size={20}/> {t.comp1Title}</h3>
            <div>{t.comp1Desc}</div>
          </div>
          <div className="hq-bubble right">
            <h3><Zap size={20}/> {t.comp2Title}</h3>
            <div style={{ opacity: 0.9 }}>{t.comp2Desc}</div>
          </div>
          <div className="hq-bubble left">
            <h3 style={{ color: 'var(--hq-accent)' }}><Lock size={20}/> {t.comp3Title}</h3>
            <div>{t.comp3Desc}</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800 }}>{t.stepsTitle} {typeName}</h2>
        </div>

        <div style={{ marginBottom: 120 }}>
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

      <div style={{ background: 'var(--hq-card)', borderTop: '1px solid var(--hq-border)', padding: '100px 0' }}>
        <div className="hq-container">
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, textAlign: 'center', marginBottom: 60 }}>
            {t.faqTitle} {typeName}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { q: t.faq1Q, a: t.faq1A },
              { q: t.faq2Q, a: t.faq2A },
              { q: t.faq3Q, a: t.faq3A },
              { q: t.faq4Q, a: t.faq4A }
            ].map((faq, i) => (
              <div key={i} style={{ border: '1px solid var(--hq-border)', borderRadius: 24, overflow: 'hidden' }}>
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: '100%', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--hq-text)' }}>{faq.q}</span>
                  <span style={{ color: 'var(--hq-accent)' }}><ChevronDown open={openFaq === i} /></span>
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0, transition: 'all 0.3s' }}>
                  <div style={{ padding: '0 32px 32px 32px', color: 'var(--hq-text-muted)', lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutSMS;
