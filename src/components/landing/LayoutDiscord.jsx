import React from 'react';
import { useTranslation } from 'react-i18next';
import { Gamepad2, ShieldCheck, Zap, Lock, ChevronDown, Hash, MessageSquare, Mic } from 'lucide-react';

function LayoutDiscord({ qrType = 'discord' }) {
  const { t: translate } = useTranslation();
  const typeName = translate(`types.${qrType}`);
  const tObj = translate('landing', { returnObjects: true });
  const t = typeof tObj === 'object' && tObj !== null ? tObj : {};
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <div className="hq-layout-discord">
      <style>{`
        .hq-layout-discord {
          --hq-bg: #36393f;
          --hq-text: #dcddde;
          --hq-text-muted: #8e9297;
          --hq-card: #2f3136;
          --hq-border: #202225;
          --hq-accent: #5865F2;
          --hq-accent-glow: rgba(88, 101, 242, 0.15);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          min-height: 100vh;
        }
        
        .hq-dc-app { display: flex; min-height: 100vh; }
        
        .hq-dc-guilds { width: 72px; background: #202225; padding: 12px 0; display: flex; flex-direction: column; align-items: center; gap: 8px; flex-shrink: 0; }
        .hq-dc-guild { width: 48px; height: 48px; border-radius: 50%; background: #36393f; display: flex; align-items: center; justify-content: center; color: var(--hq-text); cursor: pointer; transition: 0.2s; position: relative; }
        .hq-dc-guild:hover { border-radius: 16px; background: var(--hq-accent); color: white; }
        .hq-dc-guild.active { border-radius: 16px; background: var(--hq-accent); color: white; }
        .hq-dc-guild.active::before { content: ''; position: absolute; left: -12px; top: 8px; bottom: 8px; width: 4px; background: white; border-radius: 0 4px 4px 0; }
        
        .hq-dc-sidebar { width: 240px; background: #2f3136; display: flex; flex-direction: column; flex-shrink: 0; border-right: 1px solid var(--hq-border); }
        .hq-dc-header { padding: 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.2); font-weight: 700; display: flex; align-items: center; justify-content: space-between; height: 48px; }
        .hq-dc-channels { padding: 16px 8px; flex: 1; }
        .hq-dc-channel { padding: 6px 8px; border-radius: 4px; display: flex; align-items: center; gap: 8px; color: var(--hq-text-muted); cursor: pointer; margin-bottom: 2px; }
        .hq-dc-channel:hover { background: rgba(79,84,92,0.16); color: var(--hq-text); }
        .hq-dc-channel.active { background: rgba(79,84,92,0.32); color: white; }
        
        .hq-dc-main { flex: 1; display: flex; flex-direction: column; background: var(--hq-bg); }
        .hq-dc-main-header { padding: 0 16px; height: 48px; display: flex; align-items: center; border-bottom: 1px solid #202225; box-shadow: 0 1px 2px rgba(0,0,0,0.1); font-weight: 600; gap: 8px; }
        
        .hq-dc-content { padding: 32px; overflow-y: auto; flex: 1; }
        .hq-dc-hero-icon { width: 68px; height: 68px; border-radius: 50%; background: var(--hq-card); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .hq-dc-content h1 { font-size: 32px; font-weight: 800; color: white; margin-bottom: 8px; }
        
        .hq-dc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 40px; }
        .hq-dc-card { background: #292b2f; padding: 24px; border-radius: 8px; }
        .hq-dc-card h3 { color: white; font-size: 16px; font-weight: 700; margin: 12px 0 8px 0; }
        
        @media (max-width: 768px) {
          .hq-dc-guilds, .hq-dc-sidebar { display: none; }
          .hq-dc-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="hq-dc-app">
        <div className="hq-dc-guilds">
          <div className="hq-dc-guild" style={{ background: '#5865F2', color: 'white' }}><Gamepad2 size={28} /></div>
          <div style={{ width: 32, height: 2, background: '#2f3136', margin: '4px 0' }}></div>
          <div className="hq-dc-guild active">QR</div>
          <div className="hq-dc-guild">SE</div>
        </div>
        
        <div className="hq-dc-sidebar">
          <div className="hq-dc-header">CreateMeQR Server <ChevronDown size={18} /></div>
          <div className="hq-dc-channels">
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--hq-text-muted)', marginBottom: 8, paddingLeft: 8 }}>GENERATOR</div>
            <div className="hq-dc-channel active"><Hash size={18} /> welcome</div>
            <div className="hq-dc-channel"><Hash size={18} /> features</div>
            <div className="hq-dc-channel"><Hash size={18} /> faq</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--hq-text-muted)', margin: '16px 0 8px 0', paddingLeft: 8 }}>VOICE CHANNELS</div>
            <div className="hq-dc-channel"><Mic size={18} /> General</div>
          </div>
          <div style={{ background: '#292b2f', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#5865F2' }}></div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>User</div>
              <div style={{ fontSize: 12, color: 'var(--hq-text-muted)' }}>#1234</div>
            </div>
          </div>
        </div>

        <div className="hq-dc-main">
          <div className="hq-dc-main-header">
            <Hash size={24} color="var(--hq-text-muted)" /> welcome
          </div>
          
          <div className="hq-dc-content">
            <div className="hq-dc-hero-icon"><Hash size={40} color="white" /></div>
            <h1>Welcome to #welcome!</h1>
            <p style={{ fontSize: 16, color: 'var(--hq-text-muted)', lineHeight: 1.5, maxWidth: 600 }}>
              This is the start of the #welcome channel. {t.heroSubtitle} Generate invites for your server effortlessly.
            </p>

            <div className="hq-dc-grid">
              <div className="hq-dc-card">
                <ShieldCheck size={28} color="var(--hq-accent)" />
                <h3>{t.comp1Title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.5 }}>{t.comp1Desc}</p>
              </div>
              <div className="hq-dc-card">
                <Zap size={28} color="var(--hq-accent)" />
                <h3>{t.comp2Title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.5 }}>{t.comp2Desc}</p>
              </div>
              <div className="hq-dc-card">
                <Lock size={28} color="var(--hq-accent)" />
                <h3>{t.comp3Title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.5 }}>{t.comp3Desc}</p>
              </div>
            </div>
            
            <div style={{ marginTop: 80, borderTop: '1px solid var(--hq-border)', paddingTop: 40 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginBottom: 24 }}>{t.faqTitle}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { q: t.faq1Q, a: t.faq1A }, { q: t.faq2Q, a: t.faq2A }, { q: t.faq3Q, a: t.faq3A }
                ].map((faq, i) => (
                  <div key={i} style={{ background: '#2f3136', borderRadius: 8, padding: '16px 20px' }}>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--hq-accent)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <Bot size={20} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontWeight: 600, color: 'white' }}>FAQ Bot</span>
                          <span style={{ fontSize: 10, background: '#5865F2', color: 'white', padding: '2px 4px', borderRadius: 4, fontWeight: 700 }}>APP</span>
                          <span style={{ fontSize: 12, color: 'var(--hq-text-muted)' }}>Today at 12:00 PM</span>
                        </div>
                        <div style={{ fontWeight: 700, color: 'white', marginBottom: 4 }}>Q: {faq.q}</div>
                        <div style={{ color: 'var(--hq-text)' }}>A: {faq.a}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutDiscord;
