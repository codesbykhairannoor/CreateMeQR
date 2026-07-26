import React from 'react';
import { useTranslation } from 'react-i18next';
import { Wallet, ShieldCheck, Zap, Lock, ChevronDown, Heart, MessageCircle, Banknote } from 'lucide-react';

function LayoutVenmo({ qrType = 'venmo' }) {
  const { t: translate } = useTranslation();
  const typeName = translate(`types.${qrType}`);
  const tObj = translate('landing', { returnObjects: true });
  const t = typeof tObj === 'object' && tObj !== null ? tObj : {};
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div className="hq-layout-venmo">
      <style>{`
        .hq-layout-venmo {
          --hq-bg: #f5f6f7;
          --hq-text: #2e2e2e;
          --hq-text-muted: #747474;
          --hq-card: #ffffff;
          --hq-border: #e6e6e6;
          --hq-accent: #008cff;
          --hq-accent-glow: rgba(0, 140, 255, 0.1);
          font-family: -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Display", "Helvetica Neue", sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 100px;
        }
        html.dark .hq-layout-venmo {
          --hq-bg: #111111;
          --hq-text: #f5f5f5;
          --hq-text-muted: #999999;
          --hq-card: #1c1c1c;
          --hq-border: #333333;
        }
        
        .hq-container { max-width: 600px; margin: 0 auto; padding: 0 24px; }
        
        .hq-vn-feed { margin-bottom: 80px; }
        .hq-vn-tx { background: var(--hq-card); padding: 24px; border-radius: 16px; margin-bottom: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .hq-vn-tx-head { display: flex; gap: 16px; margin-bottom: 16px; }
        .hq-vn-avatar { width: 56px; height: 56px; border-radius: 50%; background: var(--hq-accent); flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: white; }
        
        .hq-vn-actions { display: flex; gap: 24px; margin-top: 16px; color: var(--hq-text-muted); font-size: 14px; }
        .hq-vn-action { display: flex; align-items: center; gap: 6px; cursor: pointer; }
        
        .hq-vn-hero { text-align: center; margin-bottom: 40px; }
        .hq-vn-hero h1 { font-size: clamp(32px, 5vw, 48px); font-weight: 800; margin-bottom: 16px; color: var(--hq-accent); }
        
      `}</style>

      <div className="hq-container">
        <div className="hq-vn-hero">
          <h1>{t.heroTitle}</h1>
          <p style={{ fontSize: 18, color: 'var(--hq-text-muted)' }}>{t.heroSubtitle}</p>
        </div>

        <div className="hq-vn-feed">
          <div className="hq-vn-tx">
            <div className="hq-vn-tx-head">
              <div className="hq-vn-avatar" style={{ boxShadow: '0 0 0 4px rgba(0,140,255,0.2)' }}><ShieldCheck size={28} /></div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{translate('featTools.venmo.t1') || t.comp1Title} <span style={{ fontWeight: 400, color: 'var(--hq-text-muted)' }}>paid</span> Privacy</div>
                <div style={{ fontSize: 14, color: 'var(--hq-text-muted)', marginBottom: 8 }}>1h ago • 🌎</div>
                <div style={{ fontSize: 16 }}>{translate('featTools.venmo.d1') || t.comp1Desc}</div>
              </div>
            </div>
            <div className="hq-vn-actions">
              <div className="hq-vn-action"><Heart size={18} /> 24</div>
              <div className="hq-vn-action"><MessageCircle size={18} /> 0</div>
            </div>
          </div>
          
          <div className="hq-vn-tx">
            <div className="hq-vn-tx-head">
              <div className="hq-vn-avatar" style={{ background: '#f5a623', boxShadow: '0 0 0 4px rgba(245,166,35,0.2)' }}><Zap size={28} /></div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{translate('featTools.venmo.t2') || t.comp2Title} <span style={{ fontWeight: 400, color: 'var(--hq-text-muted)' }}>charged</span> Time</div>
                <div style={{ fontSize: 14, color: 'var(--hq-text-muted)', marginBottom: 8 }}>2h ago • 🌎</div>
                <div style={{ fontSize: 16 }}>{translate('featTools.venmo.d2') || t.comp2Desc}</div>
              </div>
            </div>
            <div className="hq-vn-actions">
              <div className="hq-vn-action"><Heart size={18} /> 42</div>
              <div className="hq-vn-action"><MessageCircle size={18} /> 1</div>
            </div>
          </div>
          
          <div className="hq-vn-tx">
            <div className="hq-vn-tx-head">
              <div className="hq-vn-avatar" style={{ background: '#10b981', boxShadow: '0 0 0 4px rgba(16,185,129,0.2)' }}><Lock size={28} /></div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{translate('featTools.venmo.t3') || t.comp3Title} <span style={{ fontWeight: 400, color: 'var(--hq-text-muted)' }}>paid</span> Servers</div>
                <div style={{ fontSize: 14, color: 'var(--hq-text-muted)', marginBottom: 8 }}>3h ago • 🌎</div>
                <div style={{ fontSize: 16 }}>{translate('featTools.venmo.d3') || t.comp3Desc}</div>
              </div>
            </div>
            <div className="hq-vn-actions">
              <div className="hq-vn-action"><Heart size={18} /> 128</div>
              <div className="hq-vn-action"><MessageCircle size={18} /> 4</div>
            </div>
          </div>
        </div>

        <div style={{ paddingBottom: 100 }}>
          <h2 style={{ paddingTop: 120, fontSize: 24, fontWeight: 700, textAlign: 'center', marginBottom: 32 }}>{t.faqTitle}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = translate(`faqTools.venmo.q${num}`);
              const a = translate(`faqTools.venmo.a${num}`);
              if (!q || q === `faqTools.venmo.q${num}`) return null;
              return (
              <div key={i} style={{ background: 'var(--hq-bg)', borderRadius: 24, border: '1px solid', borderColor: openFaq === i ? '#008CFF' : 'var(--hq-border)', overflow: 'hidden', transition: 'all 0.3s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ background: openFaq === i ? 'rgba(0,140,255,0.1)' : 'var(--hq-accent-glow)', padding: 8, borderRadius: 12, color: openFaq === i ? '#008CFF' : 'var(--hq-accent)', transition: 'all 0.3s' }}>
                      <Banknote size={20} />
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

export default LayoutVenmo;
