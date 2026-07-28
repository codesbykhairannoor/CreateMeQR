import React from 'react';
import { useTranslation } from 'react-i18next';
import { Music, ShieldCheck, Zap, Lock, ChevronDown, Play, Heart, MoreHorizontal, Clock } from 'lucide-react';

function LayoutSpotify({ qrType = 'spotify' }) {
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
    <div className="hq-layout-spotify">
      <style>{`
        .hq-layout-spotify {
          --hq-bg: #121212;
          --hq-text: #ffffff;
          --hq-text-muted: #a7a7a7;
          --hq-card: #181818;
          --hq-card-hover: #282828;
          --hq-border: #282828;
          --hq-accent: #1ed760;
          font-family: var(--font-main);
          background: var(--hq-bg);
          color: var(--hq-text);
          min-height: 100vh;
          padding: 80px 24px;
          display: flex;
          align-items: center;
        }
        
        .hq-sp-hero { background: linear-gradient(180deg, #535353 0%, var(--hq-bg) 100%); padding: 80px 32px 32px 32px; display: flex; gap: 24px; align-items: flex-end; }
        .hq-sp-cover { width: 232px; height: 232px; background: #282828; box-shadow: 0 8px 24px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; }
        
        .hq-sp-hero-info { flex: 1; }
        .hq-sp-hero-label { font-size: 12px; font-weight: 700; margin-bottom: 8px; text-transform: uppercase; }
        .hq-sp-hero-title { font-size: clamp(48px, 6vw, 96px); font-weight: 900; letter-spacing: -0.04em; margin-bottom: 16px; line-height: 1; }
        .hq-sp-hero-desc { font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
        
        .hq-sp-content { padding: 24px 32px; background: rgba(0,0,0,0.2); }
        .hq-sp-controls { display: flex; align-items: center; gap: 32px; margin-bottom: 40px; }
        .hq-sp-play { width: 56px; height: 56px; border-radius: 50%; background: var(--hq-accent); display: flex; align-items: center; justify-content: center; color: black; cursor: pointer; transition: transform 0.2s; }
        .hq-sp-play:hover { transform: scale(1.05); background: #1fdf64; }
        
        .hq-sp-table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
        .hq-sp-table th { color: var(--hq-text-muted); font-weight: 400; font-size: 12px; text-transform: uppercase; text-align: left; padding: 8px 16px; border-bottom: 1px solid var(--hq-border); }
        .hq-sp-table td { padding: 16px; }
        .hq-sp-row { transition: background 0.2s; cursor: pointer; border-radius: 4px; }
        .hq-sp-row:hover { background: rgba(255,255,255,0.1); }
        
        .hq-sp-row h3 { font-size: 16px; font-weight: 400; color: white; margin-bottom: 4px; }
        .hq-sp-row p { font-size: 14px; color: var(--hq-text-muted); }
        
        @media (max-width: 768px) {
          .hq-sp-hero { flex-direction: column; align-items: center; text-align: center; padding-top: 40px; }
        }
        
        .hq-sp-wrapper {
          max-width: 1000px;
          margin: 0 auto;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
          background: var(--hq-bg);
          width: 100%;
        }
      
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

      <div className="hq-sp-wrapper">
        <div className="hq-sp-hero">
        <div className="hq-sp-cover">
          <Music size={80} color="var(--hq-text-muted)" />
        </div>
        <div className="hq-sp-hero-info">
          <div className="hq-sp-hero-label">Playlist</div>
          <div className="hq-sp-hero-title">{t.heroTitle}</div>
          <div className="hq-sp-hero-desc">
            <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--hq-accent)', display: 'inline-block' }}></span>
            CreateMeQR <span style={{ color: 'var(--hq-text-muted)', fontWeight: 400 }}>• {t.heroSubtitle}</span>
          </div>
        </div>
      </div>

      <div className="hq-sp-content">
        <div className="hq-sp-controls">
          <div className="hq-sp-play"><Play size={28} fill="currentColor" style={{ marginLeft: 4 }} /></div>
          <Heart size={32} color="var(--hq-text-muted)" />
          <MoreHorizontal size={32} color="var(--hq-text-muted)" />
        </div>

        <table className="hq-sp-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}>#</th>
              <th>Features</th>
              <th style={{ width: 100 }}>Type</th>
              <th style={{ width: 60, textAlign: 'right' }}><Clock size={16} /></th>
            </tr>
          </thead>
          <tbody>
            <tr className="hq-sp-row" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
              <td style={{ color: 'var(--hq-text-muted)' }}>1</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: '#282828', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShieldCheck size={24} color="#1DB954" /></div>
                  <div>
                    <h3 className="font-bold tracking-tighter" style={{ fontSize: 16,  margin: 0, color: 'white' }}>{translate('featTools.spotify.t1') || t.comp1Title}</h3>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--hq-text-muted)' }}>{translate('featTools.spotify.d1') || t.comp1Desc}</p>
                  </div>
                </div>
              </td>
              <td style={{ color: 'var(--hq-text-muted)', fontSize: 14 }}>Security</td>
              <td style={{ color: 'var(--hq-text-muted)', fontSize: 14, textAlign: 'right' }}>3:45</td>
            </tr>
            <tr className="hq-sp-row" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
              <td style={{ color: 'var(--hq-text-muted)' }}>2</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: '#282828', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Zap size={24} color="#1DB954" /></div>
                  <div>
                    <h3 className="font-bold tracking-tighter" style={{ fontSize: 16,  margin: 0, color: 'white' }}>{translate('featTools.spotify.t2') || t.comp2Title}</h3>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--hq-text-muted)' }}>{translate('featTools.spotify.d2') || t.comp2Desc}</p>
                  </div>
                </div>
              </td>
              <td style={{ color: 'var(--hq-text-muted)', fontSize: 14 }}>Speed</td>
              <td style={{ color: 'var(--hq-text-muted)', fontSize: 14, textAlign: 'right' }}>2:10</td>
            </tr>
            <tr className="hq-sp-row" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
              <td style={{ color: 'var(--hq-text-muted)' }}>3</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 48, height: 48, background: '#282828', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Lock size={24} color="#1DB954" /></div>
                  <div>
                    <h3 className="font-bold tracking-tighter" style={{ fontSize: 16,  margin: 0, color: 'white' }}>{translate('featTools.spotify.t3') || t.comp3Title}</h3>
                    <p style={{ margin: 0, fontSize: 14, color: 'var(--hq-text-muted)' }}>{translate('featTools.spotify.d3') || t.comp3Desc}</p>
                  </div>
                </div>
              </td>
              <td style={{ color: 'var(--hq-text-muted)', fontSize: 14 }}>Privacy</td>
              <td style={{ color: 'var(--hq-text-muted)', fontSize: 14, textAlign: 'right' }}>4:20</td>
            </tr>
          </tbody>
        </table>

        <div style={{ maxWidth: 800 }}>
          <h2 className="font-bold tracking-tighter " style={{ paddingTop: 60, fontSize: 24,  marginBottom: 24 }}>{t.faqTitle}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[1, 2, 3, 4, 5].map((num, i) => {
              const q = translate(`faqTools.spotify.q${num}`);
              const a = translate(`faqTools.spotify.a${num}`);
              if (!q || q === `faqTools.spotify.q${num}`) return null;
              return (
              <div key={i} style={{ background: openFaq === i ? '#1DB954' : 'var(--hq-bg)', borderRadius: 24, border: '1px solid', borderColor: openFaq === i ? '#1DB954' : 'var(--hq-border)', overflow: 'hidden', transition: 'all 0.3s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: openFaq === i ? '#000' : 'var(--hq-text)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ color: openFaq === i ? '#000' : 'var(--hq-text-muted)', transition: 'color 0.3s' }}>
                      <Music size={24} />
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 700 }}>{q}</span>
                  </div>
                  <ChevronDown size={20} style={{ color: openFaq === i ? '#000' : 'var(--hq-text-muted)', transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                  <p style={{ padding: '0 32px 32px 72px', color: openFaq === i ? 'rgba(0,0,0,0.8)' : 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{a}</p>
                </div>
              </div>
            )})}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutSpotify;
