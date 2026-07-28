import React from 'react';
import { useTranslation } from 'react-i18next';
import { Briefcase, ShieldCheck, Zap, Lock, ChevronDown, Users, FileText } from 'lucide-react';

function LayoutLinkedIn({ qrType = 'linkedin' }) {
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
    <div className="hq-layout-linkedin">
      <style>{`
        .hq-layout-linkedin {
          --hq-bg: #f3f2ef;
          --hq-text: #000000;
          --hq-text-muted: #666666;
          --hq-card: #ffffff;
          --hq-border: #e0dfdc;
          --hq-accent: #0a66c2;
          --hq-accent-glow: rgba(10, 102, 194, 0.1);
          font-family: var(--font-main);
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 140px;
        }
        html.dark .hq-layout-linkedin {
          --hq-bg: #000000;
          --hq-text: #e9e9e9;
          --hq-text-muted: #8c8c8c;
          --hq-card: #1d2226;
          --hq-border: #38434f;
          --hq-accent: #70b5f9;
          --hq-accent-glow: rgba(112, 181, 249, 0.15);
        }
        
        .hq-container { max-width: 1128px; margin: 0 auto; padding: 0 24px; display: grid; grid-template-columns: 3fr 1fr; gap: 24px; }
        
        .hq-li-main { display: flex; flex-direction: column; gap: 24px; margin-bottom: 40px; }
        .hq-li-card { background: var(--hq-card); border-radius: 8px; border: 1px solid var(--hq-border); overflow: hidden; }
        
        .hq-li-cover { height: 160px; background: linear-gradient(135deg, var(--hq-border), var(--hq-accent-glow)); }
        .hq-li-profile { padding: 0 24px 24px 24px; position: relative; }
        .hq-li-avatar { width: 120px; height: 120px; border-radius: 50%; border: 4px solid var(--hq-card); background: var(--hq-accent); position: absolute; top: -60px; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        
        .hq-li-profile-info { margin-top: 100px; }
        .hq-li-profile-info h1 { font-size: 24px; font-weight: 600; margin-bottom: 4px; }
        .hq-li-profile-info p { font-size: 16px; color: var(--hq-text-muted); }
        
        .hq-li-section { padding: 24px; }
        .hq-li-section h2 { font-size: 20px; font-weight: 600; margin-bottom: 16px; }
        
        .hq-li-exp { display: flex; gap: 16px; margin-bottom: 24px; }
        .hq-li-exp:last-child { margin-bottom: 0; }
        .hq-li-exp-icon { width: 48px; height: 48px; background: var(--hq-accent-glow); color: var(--hq-accent); display: flex; align-items: center; justify-content: center; border-radius: 4px; }
        .hq-li-exp-content h3 { font-size: 16px; font-weight: 600; margin-bottom: 2px; }
        .hq-li-exp-content h4 { font-size: 14px; font-weight: 400; color: var(--hq-text-muted); margin-bottom: 8px; }
        
        .hq-li-sidebar { display: flex; flex-direction: column; gap: 24px; }
        .hq-li-side-card { padding: 16px; }
        .hq-li-side-card h3 { font-size: 16px; font-weight: 600; margin-bottom: 12px; }
        
        @media (max-width: 992px) {
          .hq-container { grid-template-columns: 1fr; }
        }
      
        
        
              
        /* STRICTLY SCOPED MOBILE FIXES (Phase 4) */
        @media (max-width: 768px) {
          /* General Container fixes */
          .hq-layout-linkedin .hq-container { padding: 0 16px !important; gap: 24px !important; }
          
          /* Phone/Player Mockups scaling */
          .hq-layout-linkedin div[class*="-phone"], .hq-layout-linkedin div[class*="-player"], .hq-layout-linkedin div[class*="-mockup"], .hq-layout-linkedin div[class*="-mock"] {
            width: 100% !important;
            max-width: 320px !important;
            height: auto !important;
            min-height: 400px !important;
            margin: 0 auto !important;
            flex: 1 1 auto !important;
          }
          
          /* Ensure tall mockups stay in ratio */
          .hq-layout-linkedin div[class*="-phone"] { aspect-ratio: 9/18 !important; }
          
          /* Specific fix for YouTube player which should be 16:9 */
          .hq-layout-linkedin div.hq-yt-player { aspect-ratio: 16/9 !important; min-height: auto !important; }
          
          /* Fix Hero Padding */
          .hq-layout-linkedin div[class*="-hero"] {
            padding: 40px 0 !important;
            gap: 32px !important;
            display: flex !important;
            flex-direction: column !important;
          }
          
          /* Fix LinkedIn & Profile Avatars Overlap */
          .hq-layout-linkedin div.hq-li-avatar, .hq-layout-linkedin div[class*="-avatar"] {
            width: 80px !important;
            height: 80px !important;
            top: -40px !important;
          }
          .hq-layout-linkedin div.hq-li-profile-info, .hq-layout-linkedin div[class*="-profile-info"] {
            margin-top: 50px !important;
          }
          .hq-layout-linkedin div.hq-li-cover { height: 100px !important; }
          
          /* Fix Inline Grids (URL, WiFi, etc) that don't use CSS classes */
          .hq-layout-linkedin div[style*="gridTemplateColumns"] {
            display: flex !important;
            flex-direction: column !important;
            gap: 24px !important;
          }
          .hq-layout-linkedin div[style*="gridColumn:"] {
            width: 100% !important;
            grid-column: span 1 !important;
          }
          
          /* Fix Inline Flex Rows (URL steps) */
          .hq-layout-linkedin div[style*="flexDirection: 'row'"], .hq-layout-linkedin div[style*="flex-direction: row"] {
            flex-direction: column !important;
          }

          /* Fix grid column squeezing for ALL bento, features, and grid classes */
          .hq-layout-linkedin div[class*="-bento"], .hq-layout-linkedin div[class*="-features"], .hq-layout-linkedin div[class*="-grid"], .hq-layout-linkedin div[class*="-row"], .hq-layout-linkedin div[class*="bento"], .hq-layout-linkedin div[class*="features"] {
            display: flex !important;
            flex-direction: column !important;
          }
          
          /* Ensure ALL Main and Wrapper containers stack vertically */
          .hq-layout-linkedin div[class*="-main"], .hq-layout-linkedin div[class*="-wrapper"], .hq-layout-linkedin div[class*="main"] {
            display: flex !important;
            flex-direction: column !important;
          }

          /* Ensure text wraps nicely */
          .hq-layout-linkedin h1, .hq-layout-linkedin h2, .hq-layout-linkedin h3 { line-height: 1.2 !important; word-wrap: break-word; }
        }
    
      `}</style>

      <div className="hq-container">
        <div className="hq-li-main">
          <div className="hq-li-card">
            <div className="hq-li-cover"></div>
            <div className="hq-li-profile">
              <div className="hq-li-avatar"><Briefcase size={64} /></div>
              <div className="hq-li-profile-info">
                <h1>{t.heroTitle} for {typeName}</h1>
                <p>{t.heroSubtitle}</p>
                <div style={{ marginTop: 16, display: 'inline-block', background: 'var(--hq-accent)', color: 'white', padding: '6px 16px', borderRadius: 100, fontWeight: 600, fontSize: 14 }}>
                  Connect
                </div>
              </div>
            </div>
          </div>

          <div className="hq-li-card hq-li-section">
            <h2 className="font-bold tracking-tighter ">About</h2>
            <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--hq-text-muted)' }}>
              We provide the most robust, privacy-first QR code generation tool in the market. 
              Our engine processes everything securely in your browser. {t.tagline}
            </p>
          </div>

          <div className="hq-li-card hq-li-section">
            <h2 className="font-bold tracking-tighter ">Experience</h2>
            <div className="hq-li-exp" style={{ padding: '16px 0', borderBottom: '1px solid var(--hq-border)' }}>
              <div className="hq-li-exp-icon" style={{ background: '#0a66c2', color: 'white' }}><ShieldCheck size={24} /></div>
              <div className="hq-li-exp-content">
                <h3 className="font-bold tracking-tighter " style={{ fontSize: 16 }}>{translate('featTools.linkedin.t1') || t.comp1Title}</h3>
                <h4 style={{ fontSize: 14, color: '#0a66c2', margin: '4px 0' }}>Security Standard</h4>
                <p style={{ fontSize: 14, color: 'var(--hq-text-muted)', margin: 0 }}>{translate('featTools.linkedin.d1') || t.comp1Desc}</p>
              </div>
            </div>
            <div className="hq-li-exp" style={{ padding: '16px 0', borderBottom: '1px solid var(--hq-border)' }}>
              <div className="hq-li-exp-icon" style={{ background: '#0a66c2', color: 'white' }}><Zap size={24} /></div>
              <div className="hq-li-exp-content">
                <h3 className="font-bold tracking-tighter " style={{ fontSize: 16 }}>{translate('featTools.linkedin.t2') || t.comp2Title}</h3>
                <h4 style={{ fontSize: 14, color: '#0a66c2', margin: '4px 0' }}>Performance Metric</h4>
                <p style={{ fontSize: 14, color: 'var(--hq-text-muted)', margin: 0 }}>{translate('featTools.linkedin.d2') || t.comp2Desc}</p>
              </div>
            </div>
            <div className="hq-li-exp" style={{ padding: '16px 0' }}>
              <div className="hq-li-exp-icon" style={{ background: '#0a66c2', color: 'white' }}><Lock size={24} /></div>
              <div className="hq-li-exp-content">
                <h3 className="font-bold tracking-tighter " style={{ fontSize: 16 }}>{translate('featTools.linkedin.t3') || t.comp3Title}</h3>
                <h4 style={{ fontSize: 14, color: '#0a66c2', margin: '4px 0' }}>Privacy Policy</h4>
                <p style={{ fontSize: 14, color: 'var(--hq-text-muted)', margin: 0 }}>{translate('featTools.linkedin.d3') || t.comp3Desc}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="hq-li-sidebar">
          <div className="hq-li-card hq-li-side-card">
            <h3 className="font-bold tracking-tighter ">People also viewed</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--hq-border)' }}></div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>URL Generator</div>
                  <div style={{ fontSize: 12, color: 'var(--hq-text-muted)' }}>CreateMeQR</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--hq-border)' }}></div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>vCard Generator</div>
                  <div style={{ fontSize: 12, color: 'var(--hq-text-muted)' }}>CreateMeQR</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ background: 'var(--hq-card)', borderTop: '1px solid var(--hq-border)', padding: '80px 0' }}>
        <div className="hq-container" style={{ display: 'block', maxWidth: 800 }}>
          <h2 className="font-bold tracking-tighter " style={{ fontSize: 24,  marginBottom: 32 }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = translate(`faqTools.linkedin.q${num}`);
              const a = translate(`faqTools.linkedin.a${num}`);
              if (!q || q === `faqTools.linkedin.q${num}`) return null;
              return (
              <div key={i} style={{ background: 'var(--hq-bg)', borderRadius: 16, border: '1px solid', borderColor: openFaq === i ? '#0a66c2' : 'var(--hq-border)', overflow: 'hidden', transition: 'all 0.3s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ background: openFaq === i ? 'rgba(10,102,194,0.1)' : 'var(--hq-accent-glow)', padding: 8, borderRadius: 12, color: openFaq === i ? '#0a66c2' : 'var(--hq-accent)', transition: 'all 0.3s' }}>
                      <Briefcase size={20} />
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

export default LayoutLinkedIn;
