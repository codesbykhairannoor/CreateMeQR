import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, ThumbsUp, MessageCircle, Share2, ShieldCheck, Zap, Lock, ChevronDown, UserPlus } from 'lucide-react';

function LayoutFacebook({ qrType = 'facebook' }) {
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
    <div className="hq-layout-facebook">
      <style>{`
        .hq-layout-facebook {
          --hq-bg: #f0f2f5;
          --hq-text: #1c1e21;
          --hq-text-muted: #65676b;
          --hq-card: #ffffff;
          --hq-border: #ced0d4;
          --hq-accent: #1877f2;
          --hq-accent-glow: rgba(24, 119, 242, 0.1);
          font-family: var(--font-main);
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 160px;
        }
        html.dark .hq-layout-facebook {
          --hq-bg: #18191a;
          --hq-text: #e4e6eb;
          --hq-text-muted: #b0b3b8;
          --hq-card: #242526;
          --hq-border: #3e4042;
          --hq-accent: #2d88ff;
          --hq-accent-glow: rgba(45, 136, 255, 0.15);
        }
        
        .hq-container { max-width: 1000px; margin: 0 auto; padding: 0 24px; }
        
        .hq-fb-feed {
          max-width: 680px; margin: 0 auto 120px auto;
        }
        
        .hq-fb-post {
          background: var(--hq-card); border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.1); margin-bottom: 24px; overflow: hidden;
        }
        .hq-fb-post-header { display: flex; align-items: center; gap: 12px; padding: 16px; }
        .hq-fb-avatar { width: 40px; height: 40px; border-radius: 50%; background: var(--hq-accent); color: white; display: flex; align-items: center; justify-content: center; }
        .hq-fb-post-content { padding: 0 16px 16px 16px; }
        
        .hq-fb-hero-title { font-size: clamp(32px, 5vw, 48px); font-weight: 800; margin-bottom: 16px; letter-spacing: -0.03em; }
        .hq-fb-hero-subtitle { font-size: 18px; color: var(--hq-text-muted); line-height: 1.5; }
        
        .hq-fb-actions { display: flex; border-top: 1px solid var(--hq-border); padding: 4px 16px; }
        .hq-fb-action { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 8px 0; color: var(--hq-text-muted); font-weight: 600; font-size: 15px; border-radius: 4px; transition: background 0.2s; cursor: pointer; }
        .hq-fb-action:hover { background: var(--hq-accent-glow); }
        
        .hq-fb-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 60px; }
        .hq-fb-feature { background: var(--hq-card); padding: 32px; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        .hq-fb-feature h3 { font-size: 18px; font-weight: 700; margin: 16px 0 8px 0; }
        .hq-fb-feature p { color: var(--hq-text-muted); line-height: 1.5; }
        
        @media (max-width: 768px) { .hq-fb-features { grid-template-columns: 1fr; } }
      
        
        
        /* GLOBAL MOBILE FIXES (Phase 3) */
        @media (max-width: 768px) {
          /* General Container fixes */
          .hq-container { padding: 0 16px !important; gap: 24px !important; }
          
          /* Phone/Player Mockups scaling (TikTok, Snapchat, WhatsApp, YouTube, etc.) */
          [class*="-phone"], [class*="-player"], [class*="-mockup"], [class*="-mock"] {
            width: 100% !important;
            max-width: 320px !important;
            height: auto !important;
            min-height: 400px !important;
            margin: 0 auto !important;
            flex: 1 1 auto !important;
          }
          
          /* Ensure tall mockups stay in ratio */
          [class*="-phone"] { aspect-ratio: 9/18 !important; }
          
          /* Specific fix for YouTube player which should be 16:9 */
          .hq-yt-player { aspect-ratio: 16/9 !important; min-height: auto !important; }
          
          /* Fix Hero Padding */
          [class*="-hero"] {
            padding: 40px 0 !important;
            gap: 32px !important;
            display: flex !important;
            flex-direction: column !important;
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

          /* Phase 2 & 3: PDF, App Store, WiFi, Link In Bio, Video, Audio, File fixes */
          /* Fix grid column squeezing for ALL bento, features, and grid classes */
          [class*="-bento"], [class*="-features"], [class*="-grid"], [class*="-row"], [class*="bento"], [class*="features"] {
            display: flex !important;
            flex-direction: column !important;
          }
          
          /* Ensure ALL Main and Wrapper containers stack vertically */
          [class*="-main"], [class*="-wrapper"], [class*="main"] {
            display: flex !important;
            flex-direction: column !important;
          }

          /* Ensure text wraps nicely */
          h1, h2, h3 { line-height: 1.2 !important; word-wrap: break-word; }
        }
    
      `}</style>

      <div className="hq-container">
        <div className="hq-fb-feed">
          <div className="hq-fb-post">
            <div className="hq-fb-post-header">
              <div className="hq-fb-avatar"><Users size={24} /></div>
              <div>
                <div style={{ fontWeight: 600 }}>CreateMeQR Official</div>
                <div style={{ fontSize: 13, color: 'var(--hq-text-muted)' }}>Sponsored • 🌎</div>
              </div>
            </div>
            <div className="hq-fb-post-content">
              <h2 className="hq-fb-hero-title font-bold tracking-tighter ">{t.heroTitle} for {typeName}</h2>
              <p className="hq-fb-hero-subtitle">{t.heroSubtitle}</p>
            </div>
            <div style={{ background: 'var(--hq-bg)', padding: '40px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid var(--hq-border)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'var(--hq-accent)', color: 'white', padding: '12px 32px', borderRadius: 6, fontWeight: 700, fontSize: 16 }}>
                <UserPlus size={20} /> Generate QR Code
              </div>
            </div>
            <div className="hq-fb-actions">
              <div className="hq-fb-action"><ThumbsUp size={20} /> Like</div>
              <div className="hq-fb-action"><MessageCircle size={20} /> Comment</div>
              <div className="hq-fb-action"><Share2 size={20} /> Share</div>
            </div>
          </div>
        </div>

        <div className="hq-fb-features">
          <div className="hq-fb-feature" style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 24, boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#e7f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShieldCheck size={20} color="#1877f2" /></div>
              <h3 className="font-bold tracking-tighter" style={{ fontSize: 16,  color: '#1c1e21', margin: 0 }}>{translate('featTools.facebook.t1') || t.comp1Title}</h3>
            </div>
            <p style={{ color: '#65676b', fontSize: 14, margin: 0 }}>{translate('featTools.facebook.d1') || t.comp1Desc}</p>
          </div>
          <div className="hq-fb-feature" style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 24, boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#e7f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Zap size={20} color="#1877f2" /></div>
              <h3 className="font-bold tracking-tighter" style={{ fontSize: 16,  color: '#1c1e21', margin: 0 }}>{translate('featTools.facebook.t2') || t.comp2Title}</h3>
            </div>
            <p style={{ color: '#65676b', fontSize: 14, margin: 0 }}>{translate('featTools.facebook.d2') || t.comp2Desc}</p>
          </div>
          <div className="hq-fb-feature" style={{ background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 24, boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#e7f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Lock size={20} color="#1877f2" /></div>
              <h3 className="font-bold tracking-tighter" style={{ fontSize: 16,  color: '#1c1e21', margin: 0 }}>{translate('featTools.facebook.t3') || t.comp3Title}</h3>
            </div>
            <p style={{ color: '#65676b', fontSize: 14, margin: 0 }}>{translate('featTools.facebook.d3') || t.comp3Desc}</p>
          </div>
        </div>
      </div>
      
      <div style={{ background: 'var(--hq-card)', padding: '60px 0', borderTop: '1px solid var(--hq-border)' }}>
        <div className="hq-container" style={{ maxWidth: 800 }}>
          <h2 className="font-bold tracking-tighter " style={{ paddingTop: 60, fontSize: 32,  textAlign: 'center', marginBottom: 40 }}>{t.faqTitle}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = translate(`faqTools.facebook.q${num}`);
              const a = translate(`faqTools.facebook.a${num}`);
              if (!q || q === `faqTools.facebook.q${num}`) return null;
              return (
              <div key={i} style={{ background: 'var(--hq-bg)', borderRadius: 24, border: '1px solid', borderColor: openFaq === i ? '#1877f2' : 'var(--hq-border)', overflow: 'hidden', transition: 'all 0.3s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ background: openFaq === i ? 'rgba(24,119,242,0.1)' : 'var(--hq-accent-glow)', padding: 8, borderRadius: 12, color: openFaq === i ? '#1877f2' : 'var(--hq-accent)', transition: 'all 0.3s' }}>
                      <Users size={20} />
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

export default LayoutFacebook;
