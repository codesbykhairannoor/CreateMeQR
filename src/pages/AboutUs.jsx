import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

import { Users, Globe2, ShieldCheck, Zap, ArrowRight, Heart } from 'lucide-react';



export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('appTitle', 'CreateMy-QR')} | ${t.footerAbout || 'About Us'} - CreateMy-QR</title>
      </Helmet>
      <main style={{ width: '100%', flex: 1 }}>
        
        
        {/* Section 1: Hero */}
        <section style={{ position: 'relative', width: '100%', padding: '120px 24px', background: 'var(--bg-app)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 800, height: 400, background: 'var(--brand-glow)', filter: 'blur(150px)', opacity: 0.3, pointerEvents: 'none' }} />
          <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80, borderRadius: 24, background: 'var(--brand-glow)', color: 'var(--brand-primary)', marginBottom: 32, boxShadow: '0 10px 30px var(--brand-glow)' }}>
              <Globe2 size={40} />
            </div>
            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, fontFamily: 'var(--font-display)', marginBottom: 24, letterSpacing: '-0.03em', color: 'var(--text-main)', lineHeight: 1.1 }}>
              {t.pageAboutHero || 'Democratizing QR Code tools'}
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 800, margin: '0 auto' }}>
              {t.pageAboutSub || 'We believe premium QR Code and Barcode utilities should be completely free, private, and accessible to everyone. CreateMy-QR is powered entirely by client-side WebAssembly.'}
            </p>
          </div>
        </section>

        {/* Section 2: Core Philosophy */}
        <section style={{ width: '100%', padding: '80px 24px', background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
              <div className="hover-lift" style={{ padding: 40, borderRadius: 24, background: 'var(--bg-app)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <ShieldCheck size={48} className="text-brand-primary" style={{ margin: '0 auto 24px' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 16 }}>Absolute Privacy</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>We fundamentally redesigned how QR Code tools work. By processing everything locally in your browser, your files never touch a server.</p>
              </div>
              <div className="hover-lift" style={{ padding: 40, borderRadius: 24, background: 'var(--bg-app)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <Zap size={48} className="text-brand-primary" style={{ margin: '0 auto 24px' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 16 }}>Lightning Fast</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>WebAssembly allows CreateMy-QR to run complex QR code generations directly on your device CPU, bypassing upload and download bottlenecks.</p>
              </div>
              <div className="hover-lift" style={{ padding: 40, borderRadius: 24, background: 'var(--bg-app)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                <Users size={48} className="text-brand-primary" style={{ margin: '0 auto 24px' }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 16 }}>For Everyone</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>We translated our entire platform into 30 languages. No subscriptions, no hidden fees, just world-class tools available globally.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The Origin Story */}
        <section style={{ width: '100%', padding: '100px 24px', background: 'var(--bg-app)' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ display: 'inline-flex', padding: '8px 16px', background: 'var(--brand-glow)', color: 'var(--brand-primary)', borderRadius: 100, fontWeight: 800, fontSize: '0.9rem', marginBottom: 24 }}>01 &mdash; THE ORIGIN</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: 32, color: 'var(--text-main)', lineHeight: 1.2 }}>{t.pageAboutSec1Title || 'The Origin Story'}</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.8, borderLeft: '4px solid var(--brand-primary)', paddingLeft: 32, fontStyle: 'italic' }}>
              {t.pageAboutSec1Desc || 'We were frustrated by the constant paywalls and privacy leaks of traditional online QR Code tools. Uploading sensitive files to random servers felt inherently wrong. We built CreateMy-QR to prove that enterprise-grade tools could be free, fast, and fully secure.'}
            </p>
          </div>
        </section>

        {/* Section 4: Technology Stack */}
        <section style={{ width: '100%', padding: '100px 24px', background: '#0f172a', color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', bottom: -200, right: -200, width: 600, height: 600, background: 'var(--brand-primary)', filter: 'blur(200px)', opacity: 0.15, borderRadius: '50%' }} />
          <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'inline-flex', padding: '8px 16px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 100, fontWeight: 800, fontSize: '0.9rem', marginBottom: 24 }}>02 &mdash; ARCHITECTURE</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: 32, lineHeight: 1.2 }}>{t.pageAboutSec2Title || 'Technology Stack'}</h2>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: 48, borderRadius: 32, border: '1px solid rgba(255,255,255,0.1)' }}>
              <p style={{ fontSize: '1.15rem', color: '#cbd5e1', lineHeight: 1.8 }}>
                {t.pageAboutSec2Desc || 'By leveraging the power of WebAssembly (Wasm), we took complex server-side C++ and Rust libraries and ported them to run directly inside your web browser. This means the server is brought to your device, entirely eliminating the need for network uploads.'}
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Our Guarantee */}
        <section style={{ width: '100%', padding: '100px 24px', background: 'var(--brand-gradient)', color: '#fff', textAlign: 'center' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <ShieldCheck size={64} style={{ margin: '0 auto 32px', opacity: 0.9 }} />
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, marginBottom: 32, lineHeight: 1.1 }}>{t.pageAboutSec3Title || 'Our Guarantee'}</h2>
            <p style={{ fontSize: '1.3rem', opacity: 0.9, lineHeight: 1.7, fontWeight: 500 }}>
              {t.pageAboutSec3Desc || 'CreateMy-QR is built to remain completely free. Our mission is to democratize QR code utilities for everyone, everywhere.'}
            </p>
          </div>
        </section>

        {/* Section 6: Join the Movement */}
        <section style={{ width: '100%', padding: '100px 24px', background: 'var(--bg-app)', textAlign: 'center' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <Heart size={48} className="text-brand-primary" style={{ margin: '0 auto 24px' }} />
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, marginBottom: 24, color: 'var(--text-main)', lineHeight: 1.2 }}>{t.pageAboutSec4Title || 'Join the Movement'}</h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 40 }}>
              {t.pageAboutSec4Desc || 'We rely on our community to keep this project alive. Share CreateMy-QR with your friends, family, and coworkers. Together, we can build a safer, faster, and more accessible web.'}
            </p>
            <button onClick={() => window.scrollTo(0, 0)} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '16px 32px', fontSize: '1.1rem', fontWeight: 800, background: 'var(--brand-gradient)', color: '#fff', border: 'none', borderRadius: 100, cursor: 'pointer', boxShadow: '0 10px 30px var(--brand-glow)' }}>
              <span>Use Tools Now</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </section>

      </main>
    </>
  );
};
