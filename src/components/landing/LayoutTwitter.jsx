import React from 'react';
import { useTranslation } from 'react-i18next';
import { Hash, ShieldCheck, Zap, Lock, ChevronDown, MessageCircle, Repeat2, Heart, Share } from 'lucide-react';

function LayoutTwitter({ qrType = 'twitter' }) {
  const { t: translate } = useTranslation();
  const typeName = translate(`types.${qrType}`);
  const tObj = translate('landing', { returnObjects: true });
  const t = typeof tObj === 'object' && tObj !== null ? tObj : {};
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div className="hq-layout-twitter">
      <style>{`
        .hq-layout-twitter {
          --hq-bg: #ffffff;
          --hq-text: #0f1419;
          --hq-text-muted: #536471;
          --hq-card: #ffffff;
          --hq-border: #eff3f4;
          --hq-accent: #1d9bf0;
          --hq-accent-glow: rgba(29, 155, 240, 0.1);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 160px;
        }
        html.dark .hq-layout-twitter {
          --hq-bg: #000000;
          --hq-text: #e7e9ea;
          --hq-text-muted: #71767b;
          --hq-card: #000000;
          --hq-border: #2f3336;
        }
        
        .hq-container { max-width: 800px; margin: 0 auto; padding: 0; border-left: 1px solid var(--hq-border); border-right: 1px solid var(--hq-border); min-height: 100vh; }
        
        .hq-tw-header { padding: 16px; border-bottom: 1px solid var(--hq-border); position: sticky; top: 0; background: rgba(255,255,255,0.85); backdrop-filter: blur(12px); z-index: 10; }
        html.dark .hq-tw-header { background: rgba(0,0,0,0.85); }
        .hq-tw-header h1 { font-size: 20px; font-weight: 700; margin: 0; }
        
        .hq-tw-tweet { padding: 24px 16px; border-bottom: 1px solid var(--hq-border); display: flex; gap: 16px; }
        .hq-tw-avatar { width: 48px; height: 48px; border-radius: 50%; background: var(--hq-accent); flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: white; }
        .hq-tw-content { flex: 1; }
        .hq-tw-name { font-weight: 700; font-size: 16px; display: inline-flex; align-items: center; gap: 4px; }
        .hq-tw-handle { color: var(--hq-text-muted); font-weight: 400; }
        
        .hq-tw-body h2 { font-size: 24px; font-weight: 800; margin: 8px 0; line-height: 1.3; }
        .hq-tw-body p { font-size: 16px; line-height: 1.5; margin-bottom: 16px; }
        
        .hq-tw-media { border-radius: 16px; border: 1px solid var(--hq-border); padding: 40px; text-align: center; margin-bottom: 16px; background: rgba(29, 155, 240, 0.05); }
        
        .hq-tw-actions { display: flex; justify-content: space-between; color: var(--hq-text-muted); max-width: 425px; margin-top: 12px; }
        .hq-tw-action { display: flex; align-items: center; gap: 8px; font-size: 14px; cursor: pointer; transition: color 0.2s; }
        .hq-tw-action:hover { color: var(--hq-accent); }
        
        .hq-tw-thread { padding-left: 32px; border-left: 2px solid var(--hq-border); margin-left: 40px; margin-top: -16px; padding-top: 16px; }
      `}</style>

      <div className="hq-container">
        <div className="hq-tw-header">
          <h1>{typeName} Explorer</h1>
        </div>

        <div className="hq-tw-tweet">
          <div className="hq-tw-avatar"><Hash size={24} /></div>
          <div className="hq-tw-content">
            <div className="hq-tw-name">CreateMeQR <span className="hq-tw-handle">@createmyqr · 1h</span></div>
            <div className="hq-tw-body">
              <h2>{t.heroTitle} for {typeName}</h2>
              <p>{t.heroSubtitle} 🚀✨</p>
              
              <div className="hq-tw-media">
                <ShieldCheck size={48} color="var(--hq-accent)" style={{ margin: '0 auto 16px auto' }} />
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{t.comp1Title}</h3>
                <p style={{ margin: 0, color: 'var(--hq-text-muted)' }}>{t.comp1Desc}</p>
              </div>
              
              <div className="hq-tw-actions">
                <div className="hq-tw-action"><MessageCircle size={18} /> 4.2K</div>
                <div className="hq-tw-action"><Repeat2 size={18} /> 12K</div>
                <div className="hq-tw-action"><Heart size={18} /> 89K</div>
                <div className="hq-tw-action"><Share size={18} /></div>
              </div>
            </div>
          </div>
        </div>

        <div className="hq-tw-tweet" style={{ borderBottom: 'none', paddingBottom: 8 }}>
          <div className="hq-tw-avatar" style={{ background: '#f59e0b' }}><Zap size={24} /></div>
          <div className="hq-tw-content">
            <div className="hq-tw-name">Fast Engine <span className="hq-tw-handle">@speedy · 2h</span></div>
            <div className="hq-tw-body">
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: '4px 0' }}>{t.comp2Title}</h3>
              <p>{t.comp2Desc}</p>
            </div>
          </div>
        </div>
        <div className="hq-tw-thread"></div>
        
        <div className="hq-tw-tweet">
          <div className="hq-tw-avatar" style={{ background: '#10b981' }}><Lock size={24} /></div>
          <div className="hq-tw-content">
            <div className="hq-tw-name">Privacy Guard <span className="hq-tw-handle">@secure · 3h</span></div>
            <div className="hq-tw-body">
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: '4px 0' }}>{t.comp3Title}</h3>
              <p>{t.comp3Desc}</p>
            </div>
          </div>
        </div>

        <div style={{ padding: '60px 24px' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>{t.faqTitle}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { q: t.faq1Q, a: t.faq1A }, { q: t.faq2Q, a: t.faq2A }, { q: t.faq3Q, a: t.faq3A }
            ].map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid var(--hq-border)', padding: '16px 0' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{faq.q}</span>
                  <ChevronDown size={20} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                  <p style={{ paddingTop: 16, color: 'var(--hq-text-muted)' }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutTwitter;
