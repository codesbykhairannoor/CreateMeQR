import React from 'react';
import { useTranslation } from 'react-i18next';
import { Send, ShieldCheck, Zap, Lock, ChevronDown, Bot, FileCheck, ShieldAlert } from 'lucide-react';

function LayoutTelegram({ qrType = 'telegram' }) {
  const { t: translate } = useTranslation();
  const typeName = translate(`types.${qrType}`);
  const tObj = translate('landing', { returnObjects: true });
  const t = typeof tObj === 'object' && tObj !== null ? tObj : {};
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div className="hq-layout-telegram">
      <style>{`
        .hq-layout-telegram {
          --hq-bg: #ffffff;
          --hq-text: #000000;
          --hq-text-muted: #707579;
          --hq-card: #f4f4f5;
          --hq-border: #e4e4e5;
          --hq-accent: #3390ec;
          --hq-accent-glow: rgba(51, 144, 236, 0.1);
          --tg-chat-bg: #8ba3cb;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 140px;
        }
        html.dark .hq-layout-telegram {
          --hq-bg: #1c1c1d;
          --hq-text: #ffffff;
          --hq-text-muted: #aaaaaa;
          --hq-card: #2c2c2e;
          --hq-border: #3d3d3f;
          --hq-accent: #8774e1;
          --hq-accent-glow: rgba(135, 116, 225, 0.15);
          --tg-chat-bg: #0f0f0f;
        }
        
        .hq-container { max-width: 1000px; margin: 0 auto; padding: 0 24px; }
        
        .hq-tg-window {
          display: flex; height: 600px; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1); margin-bottom: 80px;
          border: 1px solid var(--hq-border);
        }
        html.dark .hq-tg-window { box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
        
        .hq-tg-sidebar { width: 320px; background: var(--hq-bg); border-right: 1px solid var(--hq-border); display: flex; flex-direction: column; }
        .hq-tg-search { padding: 12px; }
        .hq-tg-search input { width: 100%; padding: 8px 12px; border-radius: 20px; background: var(--hq-card); border: none; outline: none; color: var(--hq-text); }
        
        .hq-tg-chat-list { flex: 1; overflow-y: auto; }
        .hq-tg-chat-item { padding: 12px; display: flex; gap: 12px; align-items: center; cursor: pointer; transition: background 0.2s; }
        .hq-tg-chat-item.active { background: var(--hq-accent); color: white; }
        .hq-tg-chat-item:not(.active):hover { background: var(--hq-card); }
        .hq-tg-chat-avatar { width: 48px; height: 48px; border-radius: 50%; background: #54a5e3; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0; }
        
        .hq-tg-main { flex: 1; display: flex; flex-direction: column; background: var(--tg-chat-bg); position: relative; }
        .hq-tg-main::before { content:''; position:absolute; inset:0; opacity:0.1; background-image: url('data:image/svg+xml;utf8,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="1" fill="%23000"/></svg>'); }
        
        .hq-tg-header { background: var(--hq-bg); padding: 12px 20px; display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 2; border-bottom: 1px solid var(--hq-border); }
        .hq-tg-messages { flex: 1; padding: 20px; display: flex; flex-direction: column; gap: 16px; overflow-y: auto; position: relative; z-index: 2; justify-content: flex-end; }
        
        .hq-tg-msg { max-width: 70%; padding: 10px 14px; border-radius: 12px; font-size: 15px; line-height: 1.4; position: relative; }
        .hq-tg-msg-in { background: var(--hq-bg); align-self: flex-start; border-bottom-left-radius: 4px; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        .hq-tg-msg-out { background: var(--hq-accent); color: white; align-self: flex-end; border-bottom-right-radius: 4px; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        
        .hq-tg-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 100px; }
        .hq-tg-card { text-align: center; padding: 32px; }
        .hq-tg-icon-wrap { width: 64px; height: 64px; border-radius: 50%; background: var(--hq-accent-glow); color: var(--hq-accent); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; }
        
        @media (max-width: 768px) {
          .hq-tg-sidebar { display: none; }
          .hq-tg-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="hq-container">
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800 }}>{t.heroTitle} <br/>for {typeName}</h2>
          <p style={{ color: 'var(--hq-text-muted)', fontSize: 18 }}>{t.heroSubtitle}</p>
        </div>

        <div className="hq-tg-window">
          <div className="hq-tg-sidebar">
            <div className="hq-tg-search"><input type="text" placeholder="Search" /></div>
            <div className="hq-tg-chat-list">
              <div className="hq-tg-chat-item active">
                <div className="hq-tg-chat-avatar"><Bot size={24} /></div>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>CreateMeQR Bot</div>
                  <div style={{ fontSize: 14, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Your QR is ready!</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hq-tg-main">
            <div className="hq-tg-header">
              <div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>CreateMeQR Bot</div>
                <div style={{ fontSize: 13, color: 'var(--hq-accent)' }}>bot</div>
              </div>
            </div>
            
            <div className="hq-tg-messages">
              <div className="hq-tg-msg hq-tg-msg-out">
                /start
              </div>
              <div className="hq-tg-msg hq-tg-msg-in">
                Welcome to CreateMeQR! Generating your secure, client-side QR codes natively in the browser. 🚀
              </div>
              <div className="hq-tg-msg hq-tg-msg-in">
                <strong>Fast & Secure</strong><br/>
                We process your data entirely in your browser. {t.comp1Desc}
              </div>
            </div>
          </div>
        </div>

        <div className="hq-tg-grid">
          <div className="hq-tg-card">
            <div className="hq-tg-icon-wrap"><ShieldCheck size={32} /></div>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 12px 0' }}>{t.comp1Title}</h3>
            <p style={{ color: 'var(--hq-text-muted)', fontSize: 15 }}>{t.comp1Desc}</p>
          </div>
          <div className="hq-tg-card">
            <div className="hq-tg-icon-wrap"><Zap size={32} /></div>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 12px 0' }}>{t.comp2Title}</h3>
            <p style={{ color: 'var(--hq-text-muted)', fontSize: 15 }}>{t.comp2Desc}</p>
          </div>
          <div className="hq-tg-card">
            <div className="hq-tg-icon-wrap"><Lock size={32} /></div>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 12px 0' }}>{t.comp3Title}</h3>
            <p style={{ color: 'var(--hq-text-muted)', fontSize: 15 }}>{t.comp3Desc}</p>
          </div>
        </div>
      </div>
      
      <div style={{ background: 'var(--hq-card)', padding: '100px 0', borderTop: '1px solid var(--hq-border)' }}>
        <div className="hq-container" style={{ maxWidth: 800 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, textAlign: 'center', marginBottom: 40 }}>{t.faqTitle}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { q: t.faq1Q, a: t.faq1A }, { q: t.faq2Q, a: t.faq2A }, { q: t.faq3Q, a: t.faq3A }
            ].map((faq, i) => (
              <div key={i} style={{ background: 'var(--hq-bg)', borderRadius: 12, padding: 8 }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}>
                  <span style={{ fontSize: 16, fontWeight: 600 }}>{faq.q}</span>
                  <ChevronDown size={20} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                  <p style={{ padding: '0 24px 24px 24px', color: 'var(--hq-text-muted)' }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutTelegram;
