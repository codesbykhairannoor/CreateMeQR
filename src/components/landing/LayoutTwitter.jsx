import React from 'react';
import { useTranslation } from 'react-i18next';
import { Hash, ShieldCheck, Zap, Lock, ChevronDown, MessageCircle, Repeat2, Heart, Share, CheckCircle2 } from 'lucide-react';

function LayoutTwitter({ qrType = 'twitter' }) {
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
          font-family: var(--font-main);
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
      
        /* GLOBAL MOBILE FIXES */
        @media (max-width: 768px) {
          /* General Container fixes */
          .hq-container { padding: 0 16px !important; gap: 24px !important; }
          
          /* Phone/Player Mockups scaling (TikTok, Snapchat, WhatsApp, YouTube, etc.) */
          [class*="-phone"], [class*="-player"] {
            width: 100% !important;
            max-width: 320px !important;
            height: auto !important;
            min-height: 480px !important;
            aspect-ratio: 9/18 !important;
            margin: 0 auto !important;
            flex: 1 1 auto !important;
          }
          
          /* Specific fix for YouTube player which should be 16:9 */
          .hq-yt-player { aspect-ratio: 16/9 !important; min-height: auto !important; }
          
          /* Fix Hero Padding */
          [class*="-hero"] {
            padding: 40px 0 !important;
            gap: 32px !important;
          }
          
          /* Fix LinkedIn & Profile Avatars Overlap */
          .hq-li-avatar, [class*="-avatar"] {
            width: 80px !important;
            height: 80px !important;
            top: -40px !important;
          }
          .hq-li-profile-info, [class*="-profile-info"] {
            margin-top: 50px !important;
          }
          .hq-li-cover { height: 100px !important; }
          
          /* Fix Inline Grids (URL, WiFi, etc) that don't use CSS classes */
          div[style*="gridTemplateColumns"] {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
          }
          div[style*="gridColumn:"] {
            width: 100% !important;
            grid-column: span 1 !important;
          }
          
          /* Fix Inline Flex Rows (URL steps) */
          div[style*="flexDirection: 'row'"], div[style*="flex-direction: row"] {
            flex-direction: column !important;
          }
          
          /* Ensure text wraps nicely */
          h1, h2, h3 { line-height: 1.2 !important; word-wrap: break-word; }
        }
    
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
              <h2 className="font-bold tracking-tighter ">{t.heroTitle} for {typeName}</h2>
              <p>{t.heroSubtitle} 🚀✨</p>
              
              <div className="hq-tw-media">
                <ShieldCheck size={48} color="var(--hq-accent)" style={{ margin: '0 auto 16px auto' }} />
                <h3 className="font-bold tracking-tighter " style={{ fontSize: 18,  marginBottom: 8 }}>{t.comp1Title}</h3>
                <p style={{ margin: 0, color: 'var(--hq-text-muted)' }}>{t.comp1Desc}</p>
              </div>
              
              <div className="hq-tw-actions">
                <div className="hq-tw-name">{translate('featTools.twitter.t1') || t.comp1Title} <CheckCircle2 size={16} color="#1da1f2" fill="currentColor" /></div>
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
            <div className="hq-tw-name">{translate('featTools.twitter.t2') || t.comp2Title} <span className="hq-tw-handle">@speedy · 2h</span></div>
            <div className="hq-tw-body">
              <p>{translate('featTools.twitter.d2') || t.comp2Desc}</p>
            </div>
          </div>
        </div>
        <div className="hq-tw-thread"></div>
        
        <div className="hq-tw-tweet">
          <div className="hq-tw-avatar" style={{ background: '#10b981' }}><Lock size={24} /></div>
          <div className="hq-tw-content">
            <div className="hq-tw-name">{translate('featTools.twitter.t3') || t.comp3Title} <span className="hq-tw-handle">@secure · 3h</span></div>
            <div className="hq-tw-body">
              <p>{translate('featTools.twitter.d3') || t.comp3Desc}</p>
            </div>
          </div>
        </div>

        <div style={{ padding: '60px 24px' }}>
          <h2 className="font-bold tracking-tighter " style={{ paddingTop: 60, fontSize: 24,  marginBottom: 24 }}>{t.faqTitle}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = translate(`faqTools.twitter.q${num}`);
              const a = translate(`faqTools.twitter.a${num}`);
              if (!q || q === `faqTools.twitter.q${num}`) return null;
              return (
              <div key={i} style={{ background: 'var(--hq-bg)', borderRadius: 24, border: '1px solid', borderColor: openFaq === i ? '#1da1f2' : 'var(--hq-border)', overflow: 'hidden', transition: 'all 0.3s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ background: openFaq === i ? 'rgba(29,161,242,0.1)' : 'var(--hq-accent-glow)', padding: 8, borderRadius: 12, color: openFaq === i ? '#1da1f2' : 'var(--hq-accent)', transition: 'all 0.3s' }}>
                      <Hash size={20} />
                    </div>
                    <p style={{ fontSize: 20, lineHeight: 1.5, margin: '16px 0' }}>
                {translate('featTools.twitter.d1') || t.comp1Desc}
              </p>    <ChevronDown size={20} style={{ color: 'var(--hq-text-muted)', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </div>
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

export default LayoutTwitter;
