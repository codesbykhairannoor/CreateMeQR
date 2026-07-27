import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, ShieldCheck, Zap, Lock, ChevronDown, CheckCheck } from 'lucide-react';

function LayoutWhatsApp({ qrType = 'whatsapp' }) {
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
    <div className="hq-layout-whatsapp">
      <style>{`
        .hq-layout-whatsapp {
          --hq-bg: #f8fafc;
          --hq-text: #0f172a;
          --hq-text-muted: #64748b;
          --hq-card: #ffffff;
          --hq-border: #e2e8f0;
          --hq-accent: #2563eb;
          --hq-accent-glow: rgba(37, 99, 235, 0.1);
          --wa-chat-bg: #e5ddd5;
          --wa-bubble-out: #dcf8c6;
          --wa-bubble-in: #ffffff;
          font-family: var(--font-main);
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 160px; /* REQUIRED MASSIVE SPACING */
        }
        html.dark .hq-layout-whatsapp {
          --hq-bg: #020617;
          --hq-text: #f8fafc;
          --hq-text-muted: #94a3b8;
          --hq-card: #0f172a;
          --hq-border: #1e293b;
          --hq-accent: #3b82f6;
          --hq-accent-glow: rgba(59, 130, 246, 0.15);
          --wa-chat-bg: #0b141a;
          --wa-bubble-out: #005c4b;
          --wa-bubble-in: #202c33;
        }
        
        .hq-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        
        .hq-wa-hero {
          display: flex; gap: 60px; align-items: center; margin-bottom: 60px;
        }
        
        .hq-wa-content { flex: 1; }
        .hq-wa-content h2 { font-size: clamp(36px, 5vw, 56px); font-weight: 800; margin-bottom: 24px; line-height: 1.1; letter-spacing: -0.03em; }
        .hq-wa-content p { font-size: 18px; color: var(--hq-text-muted); line-height: 1.6; margin-bottom: 32px; max-width: 500px; }
        
        .hq-wa-phone-container {
          flex: 0 0 320px;
          height: 600px;
          background: var(--wa-chat-bg);
          border-radius: 40px;
          border: 12px solid var(--hq-text);
          position: relative;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.1);
          display: flex; flex-direction: column;
        }
        html.dark .hq-wa-phone-container { box-shadow: 0 24px 80px rgba(0,0,0,0.5); }
        .hq-wa-phone-header {
          background: var(--hq-card); padding: 20px 16px; border-bottom: 1px solid var(--hq-border);
          display: flex; align-items: center; gap: 12px;
        }
        .hq-wa-avatar { width: 40px; height: 40px; background: var(--hq-accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; }
        .hq-wa-phone-body { flex: 1; padding: 16px; display: flex; flex-direction: column; gap: 12px; position: relative; }
        /* WA doodle bg simulation */
        .hq-wa-phone-body::before { content:''; position:absolute; top:0; left:0; right:0; bottom:0; opacity: 0.05; background-image: radial-gradient(var(--hq-text) 1px, transparent 1px); background-size: 10px 10px; z-index: 0; }
        
        .hq-wa-bubble { padding: 12px 16px; border-radius: 16px; max-width: 85%; font-size: 14px; position: relative; z-index: 1; line-height: 1.4; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        .hq-wa-bubble-in { background: var(--wa-bubble-in); align-self: flex-start; border-top-left-radius: 4px; }
        .hq-wa-bubble-out { background: var(--wa-bubble-out); align-self: flex-end; border-top-right-radius: 4px; display: flex; flex-direction: column; }
        .hq-wa-time { font-size: 11px; color: var(--hq-text-muted); text-align: right; margin-top: 4px; display: flex; justify-content: flex-end; align-items: center; gap: 4px; }
        
        .hq-wa-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-bottom: 60px; }
        .hq-wa-feature-card { background: var(--hq-card); padding: 32px; border-radius: 24px; border: 1px solid var(--hq-border); transition: transform 0.3s; }
        .hq-wa-feature-card:hover { transform: translateY(-5px); }
        .hq-wa-feature-icon { width: 48px; height: 48px; background: var(--hq-accent-glow); color: var(--hq-accent); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
        .hq-wa-feature-card h3 { font-size: 20px; font-weight: 700; margin-bottom: 12px; }
        .hq-wa-feature-card p { font-size: 15px; color: var(--hq-text-muted); line-height: 1.6; }
        
        @media (max-width: 992px) {
          .hq-wa-hero { flex-direction: column; text-align: center; }
          .hq-wa-content p { margin: 0 auto 32px auto; }
          .hq-wa-features { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="hq-container">
        <div className="hq-wa-hero">
          <div className="hq-wa-content">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'var(--hq-accent-glow)', color: 'var(--hq-accent)', borderRadius: 100, fontWeight: 600, marginBottom: 24, fontSize: 14 }}>
              <MessageCircle size={16} /> {typeName} Standard
            </div>
            <h2 className="font-bold tracking-tighter ">{t.heroTitle} <br/>for {typeName}</h2>
            <p>{t.heroSubtitle}</p>
          </div>
          
          <div className="hq-wa-phone-container">
            <div className="hq-wa-phone-header">
              <div className="hq-wa-avatar"><MessageCircle size={20} /></div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>Customer</div>
                <div style={{ fontSize: 12, color: 'var(--hq-text-muted)' }}>online</div>
              </div>
            </div>
            <div className="hq-wa-phone-body">
              <div className="hq-wa-bubble hq-wa-bubble-out">
                Hello, I scanned your QR code and I'm interested in your product!
                <div className="hq-wa-time">10:42 AM <CheckCheck size={14} color="#34b7f1" /></div>
              </div>
              <div className="hq-wa-bubble hq-wa-bubble-in">
                Hi! Thanks for reaching out. How can we help you today?
                <div className="hq-wa-time">10:43 AM</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hq-wa-features">
          <div className="hq-wa-feature-card" style={{ background: '#dcf8c6', borderColor: '#dcf8c6', color: '#075e54', boxShadow: '0 10px 30px rgba(7,94,84,0.1)' }}>
            <div className="hq-wa-feature-icon" style={{ background: '#25d366', color: '#fff' }}><ShieldCheck /></div>
            <h3 className="font-bold tracking-tighter" style={{ color: '#075e54' }}>{translate('featTools.whatsapp.t1') || t.comp1Title}</h3>
            <p style={{ color: '#128c7e' }}>{translate('featTools.whatsapp.d1') || t.comp1Desc}</p>
          </div>
          <div className="hq-wa-feature-card" style={{ background: '#dcf8c6', borderColor: '#dcf8c6', color: '#075e54', boxShadow: '0 10px 30px rgba(7,94,84,0.1)' }}>
            <div className="hq-wa-feature-icon" style={{ background: '#25d366', color: '#fff' }}><Zap /></div>
            <h3 className="font-bold tracking-tighter" style={{ color: '#075e54' }}>{translate('featTools.whatsapp.t2') || t.comp2Title}</h3>
            <p style={{ color: '#128c7e' }}>{translate('featTools.whatsapp.d2') || t.comp2Desc}</p>
          </div>
          <div className="hq-wa-feature-card" style={{ background: '#dcf8c6', borderColor: '#dcf8c6', color: '#075e54', boxShadow: '0 10px 30px rgba(7,94,84,0.1)' }}>
            <div className="hq-wa-feature-icon" style={{ background: '#25d366', color: '#fff' }}><Lock /></div>
            <h3 className="font-bold tracking-tighter" style={{ color: '#075e54' }}>{translate('featTools.whatsapp.t3') || t.comp3Title}</h3>
            <p style={{ color: '#128c7e' }}>{translate('featTools.whatsapp.d3') || t.comp3Desc}</p>
          </div>
        </div>
      </div>
      
      <div style={{ borderTop: '1px solid var(--hq-border)', background: 'var(--hq-card)', padding: '60px 0' }}>
        <div className="hq-container" style={{ maxWidth: 800 }}>
          <h2 className="font-bold tracking-tighter " style={{ paddingTop: 60, fontSize: 36,  textAlign: 'center', marginBottom: 40 }}>{t.faqTitle}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = translate(`faqTools.whatsapp.q${num}`);
              const a = translate(`faqTools.whatsapp.a${num}`);
              if (!q || q === `faqTools.whatsapp.q${num}`) return null;
              return (
              <div key={i} style={{ background: openFaq === i ? 'rgba(37, 211, 102, 0.05)' : 'var(--hq-bg)', borderRadius: 24, border: '1px solid', borderColor: openFaq === i ? '#25d366' : 'var(--hq-border)', overflow: 'hidden', transition: 'all 0.3s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ background: openFaq === i ? '#25d366' : 'var(--hq-border)', color: openFaq === i ? '#fff' : 'var(--hq-text-muted)', padding: 8, borderRadius: 12, transition: 'all 0.3s' }}>
                      <MessageCircle size={20} />
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
    </div>
  );
}

export default LayoutWhatsApp;
