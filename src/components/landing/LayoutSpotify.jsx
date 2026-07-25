import React from 'react';
import { useTranslation } from 'react-i18next';
import { Music, ShieldCheck, Zap, Lock, ChevronDown, Play, Heart, MoreHorizontal, Clock } from 'lucide-react';

function LayoutSpotify({ qrType = 'spotify' }) {
  const { t: translate } = useTranslation();
  const typeName = translate(`types.${qrType}`);
  const tObj = translate('landing', { returnObjects: true });
  const t = typeof tObj === 'object' && tObj !== null ? tObj : {};
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
          font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          min-height: 100vh;
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
        
        .hq-sp-table { width: 100%; border-collapse: collapse; margin-bottom: 80px; }
        .hq-sp-table th { color: var(--hq-text-muted); font-weight: 400; font-size: 12px; text-transform: uppercase; text-align: left; padding: 8px 16px; border-bottom: 1px solid var(--hq-border); }
        .hq-sp-table td { padding: 16px; }
        .hq-sp-row { transition: background 0.2s; cursor: pointer; border-radius: 4px; }
        .hq-sp-row:hover { background: rgba(255,255,255,0.1); }
        
        .hq-sp-row h3 { font-size: 16px; font-weight: 400; color: white; margin-bottom: 4px; }
        .hq-sp-row p { font-size: 14px; color: var(--hq-text-muted); }
        
        @media (max-width: 768px) {
          .hq-sp-hero { flex-direction: column; align-items: center; text-align: center; padding-top: 40px; }
        }
      `}</style>

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
            <tr className="hq-sp-row">
              <td style={{ color: 'var(--hq-text-muted)' }}>1</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <ShieldCheck size={40} color="var(--hq-text-muted)" />
                  <div>
                    <h3>{t.comp1Title}</h3>
                    <p>{t.comp1Desc}</p>
                  </div>
                </div>
              </td>
              <td style={{ color: 'var(--hq-text-muted)', fontSize: 14 }}>Security</td>
              <td style={{ color: 'var(--hq-text-muted)', fontSize: 14, textAlign: 'right' }}>3:45</td>
            </tr>
            <tr className="hq-sp-row">
              <td style={{ color: 'var(--hq-text-muted)' }}>2</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <Zap size={40} color="var(--hq-text-muted)" />
                  <div>
                    <h3>{t.comp2Title}</h3>
                    <p>{t.comp2Desc}</p>
                  </div>
                </div>
              </td>
              <td style={{ color: 'var(--hq-text-muted)', fontSize: 14 }}>Speed</td>
              <td style={{ color: 'var(--hq-text-muted)', fontSize: 14, textAlign: 'right' }}>2:10</td>
            </tr>
            <tr className="hq-sp-row">
              <td style={{ color: 'var(--hq-text-muted)' }}>3</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <Lock size={40} color="var(--hq-text-muted)" />
                  <div>
                    <h3>{t.comp3Title}</h3>
                    <p>{t.comp3Desc}</p>
                  </div>
                </div>
              </td>
              <td style={{ color: 'var(--hq-text-muted)', fontSize: 14 }}>Privacy</td>
              <td style={{ color: 'var(--hq-text-muted)', fontSize: 14, textAlign: 'right' }}>4:20</td>
            </tr>
          </tbody>
        </table>

        <div style={{ maxWidth: 800 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>{t.faqTitle}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { q: t.faq1Q, a: t.faq1A }, { q: t.faq2Q, a: t.faq2A }, { q: t.faq3Q, a: t.faq3A }
            ].map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid var(--hq-border)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--hq-text)' }}>
                  <span style={{ fontSize: 16, fontWeight: 600 }}>{faq.q}</span>
                  <ChevronDown size={20} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                </button>
                <div style={{ height: openFaq === i ? 'auto' : 0, overflow: 'hidden', opacity: openFaq === i ? 1 : 0 }}>
                  <p style={{ paddingBottom: 16, color: 'var(--hq-text-muted)' }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutSpotify;
