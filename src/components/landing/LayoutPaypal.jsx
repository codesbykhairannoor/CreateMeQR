import React from 'react';
import { useTranslation } from 'react-i18next';
import { CreditCard, ShieldCheck, Zap, Lock, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';

function LayoutPaypal({ qrType = 'paypal' }) {
  const { t: translate } = useTranslation();
  const typeName = translate(`types.${qrType}`);
  const tObj = translate('landing', { returnObjects: true });
  const t = typeof tObj === 'object' && tObj !== null ? tObj : {};
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div className="hq-layout-paypal">
      <style>{`
        .hq-layout-paypal {
          --hq-bg: #f5f7fa;
          --hq-text: #2c2e2f;
          --hq-text-muted: #5e6d77;
          --hq-card: #ffffff;
          --hq-border: #eaebec;
          --hq-accent: #0070ba;
          --hq-accent-dark: #003087;
          --hq-accent-glow: rgba(0, 112, 186, 0.1);
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          min-height: 100vh;
        }
        html.dark .hq-layout-paypal {
          --hq-bg: #0b111b;
          --hq-text: #f0f0f0;
          --hq-text-muted: #a0aab2;
          --hq-card: #141b2d;
          --hq-border: #222b3d;
          --hq-accent: #0079c1;
          --hq-accent-dark: #00457c;
        }
        
        .hq-container { max-width: 1000px; margin: 0 auto; padding: 0 24px; }
        
        .hq-pp-hero { background: var(--hq-accent-dark); color: white; padding: 120px 24px; text-align: center; }
        .hq-pp-hero h1 { font-size: clamp(36px, 5vw, 56px); font-weight: 300; margin-bottom: 24px; }
        .hq-pp-hero p { font-size: 20px; font-weight: 300; max-width: 600px; margin: 0 auto; line-height: 1.5; }
        
        .hq-pp-checkout { max-width: 800px; margin: -60px auto 80px auto; background: var(--hq-card); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); display: grid; grid-template-columns: 1fr 1fr; overflow: hidden; }
        .hq-pp-left { padding: 48px; border-right: 1px solid var(--hq-border); }
        .hq-pp-right { padding: 48px; background: rgba(0, 112, 186, 0.03); }
        
        .hq-pp-item { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 32px; }
        .hq-pp-item-icon { width: 48px; height: 48px; border-radius: 50%; background: var(--hq-accent-glow); color: var(--hq-accent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        
        @media (max-width: 768px) {
          .hq-pp-checkout { grid-template-columns: 1fr; }
          .hq-pp-left { border-right: none; border-bottom: 1px solid var(--hq-border); }
        }
      `}</style>

      <div className="hq-pp-hero">
        <h1>{t.heroTitle}</h1>
        <p>{t.heroSubtitle}</p>
      </div>

      <div className="hq-container">
        <div className="hq-pp-checkout">
          <div className="hq-pp-left">
            <h2 style={{ fontSize: 24, fontWeight: 500, marginBottom: 32 }}>Secure {typeName} Features</h2>
            
            <div className="hq-pp-item">
              <div className="hq-pp-item-icon"><ShieldCheck size={24} /></div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>{t.comp1Title}</h3>
                <p style={{ color: 'var(--hq-text-muted)', lineHeight: 1.5 }}>{t.comp1Desc}</p>
              </div>
            </div>
            <div className="hq-pp-item">
              <div className="hq-pp-item-icon"><Zap size={24} /></div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>{t.comp2Title}</h3>
                <p style={{ color: 'var(--hq-text-muted)', lineHeight: 1.5 }}>{t.comp2Desc}</p>
              </div>
            </div>
          </div>
          
          <div className="hq-pp-right">
            <h2 style={{ fontSize: 24, fontWeight: 500, marginBottom: 32 }}>Privacy Guarantee</h2>
            <div className="hq-pp-item">
              <div className="hq-pp-item-icon"><Lock size={24} /></div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 8 }}>{t.comp3Title}</h3>
                <p style={{ color: 'var(--hq-text-muted)', lineHeight: 1.5 }}>{t.comp3Desc}</p>
              </div>
            </div>
            
            <div style={{ marginTop: 40, background: 'var(--hq-card)', padding: 24, borderRadius: 8, border: '1px solid var(--hq-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontWeight: 500 }}>
                <span>Transaction Status</span>
                <span style={{ color: '#00875a', display: 'flex', alignItems: 'center', gap: 4 }}><CheckCircle2 size={16} /> Verified</span>
              </div>
              <button style={{ width: '100%', background: '#ffc439', color: '#000', padding: 16, borderRadius: 24, border: 'none', fontWeight: 700, fontSize: 16, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                Generate QR Code <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
        
        <div style={{ maxWidth: 800, margin: '0 auto 100px auto' }}>
          <h2 style={{ fontSize: 32, fontWeight: 300, textAlign: 'center', marginBottom: 40 }}>{t.faqTitle}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { q: t.faq1Q, a: t.faq1A }, { q: t.faq2Q, a: t.faq2A }, { q: t.faq3Q, a: t.faq3A }
            ].map((faq, i) => (
              <div key={i} style={{ background: 'var(--hq-card)', borderRadius: 8, border: '1px solid var(--hq-border)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}>
                  <span style={{ fontSize: 16, fontWeight: 500 }}>{faq.q}</span>
                  <ChevronDown size={20} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                  <p style={{ padding: '0 24px 24px 24px', color: 'var(--hq-text-muted)', lineHeight: 1.6 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutPaypal;
