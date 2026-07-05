import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { landingTranslations } from '../landingTranslations';

const IconCheck = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);
const IconZap = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);
const IconShield = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);
const IconChevronDown = ({ open }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);
const IconGlobe = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

function LandingContent() {
  const { i18n } = useTranslation();
  const langCode = (i18n.language || 'en').split('-')[0];
  const t = landingTranslations[langCode] || landingTranslations.en;
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="hq-wrapper">
      <style>{`
        .hq-wrapper {
          --hq-bg: #ffffff;
          --hq-text: #000000;
          --hq-text-muted: #666666;
          --hq-card: #f9f9f9;
          --hq-border: #eaeaea;
          --hq-accent: #000000;
          --hq-accent-glow: rgba(0,0,0,0.1);
          --hq-shadow: 0 10px 40px -10px rgba(0,0,0,0.08);
          --hq-hover-shadow: 0 20px 60px -15px rgba(0,0,0,0.15);
          font-family: -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Display", sans-serif;
          background: var(--hq-bg);
          color: var(--hq-text);
          padding-top: 60px;
          transition: background 0.5s ease, color 0.5s ease;
        }

        html.dark .hq-wrapper {
          --hq-bg: #000000;
          --hq-text: #ffffff;
          --hq-text-muted: #888888;
          --hq-card: #0a0a0a;
          --hq-border: #222222;
          --hq-accent: #ffffff;
          --hq-accent-glow: rgba(255,255,255,0.1);
          --hq-shadow: 0 10px 40px -10px rgba(255,255,255,0.05);
          --hq-hover-shadow: 0 20px 60px -15px rgba(255,255,255,0.1);
        }

        .hq-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        .hq-section { padding: 100px 0; position: relative; }
        
        .hq-title {
          font-size: clamp(40px, 6vw, 64px);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1.05;
          margin-bottom: 24px;
        }
        .hq-subtitle {
          font-size: clamp(18px, 2vw, 22px);
          color: var(--hq-text-muted);
          line-height: 1.5;
          max-width: 600px;
        }

        .hq-pill {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 16px; border-radius: 999px;
          font-size: 13px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;
          background: var(--hq-accent-glow); color: var(--hq-accent);
          border: 1px solid var(--hq-border);
          margin-bottom: 32px;
        }

        /* Bento Grid Architecture */
        .hq-bento {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 24px;
          margin-top: 60px;
        }

        .hq-card {
          background: var(--hq-card);
          border: 1px solid var(--hq-border);
          border-radius: 24px;
          padding: 40px;
          position: relative;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .hq-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--hq-hover-shadow);
        }
        
        /* Subtle Glow on Cards */
        .hq-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--hq-accent-glow), transparent);
          opacity: 0; transition: opacity 0.4s;
        }
        .hq-card:hover::before { opacity: 1; }

        .hq-card-title { font-size: 24px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 16px; }
        .hq-card-desc { font-size: 16px; line-height: 1.6; color: var(--hq-text-muted); }

        .hq-icon-box {
          width: 56px; height: 56px; border-radius: 16px;
          background: var(--hq-accent); color: var(--hq-bg);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 24px;
        }

        /* Giant Numbers */
        .hq-giant-num {
          font-size: 120px; font-weight: 900; letter-spacing: -0.06em; line-height: 1;
          background: linear-gradient(180deg, var(--hq-text) 0%, transparent 120%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          opacity: 0.2; position: absolute; right: -10px; bottom: -20px;
          pointer-events: none;
        }

        /* FAQ Styling */
        .hq-faq-wrap { max-width: 800px; margin: 0 auto; }
        .hq-faq-item {
          border-bottom: 1px solid var(--hq-border);
        }
        .hq-faq-btn {
          width: 100%; display: flex; justify-content: space-between; align-items: center;
          padding: 32px 0; background: none; border: none; cursor: pointer;
          font-size: 20px; font-weight: 600; color: var(--hq-text); text-align: left;
          letter-spacing: -0.01em;
        }
        .hq-faq-body {
          padding-bottom: 32px; font-size: 16px; line-height: 1.7; color: var(--hq-text-muted);
        }

        /* Marquee Stats */
        .hq-stats-banner {
          border-top: 1px solid var(--hq-border); border-bottom: 1px solid var(--hq-border);
          background: var(--hq-card); padding: 40px 0; overflow: hidden;
          display: flex; flex-wrap: wrap; justify-content: center; gap: 80px;
        }
        .hq-stat-group { display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .hq-stat-val { font-size: 48px; font-weight: 800; letter-spacing: -0.04em; }
        .hq-stat-lbl { font-size: 14px; font-weight: 600; color: var(--hq-text-muted); text-transform: uppercase; letter-spacing: 0.1em; }

        @media (max-width: 992px) {
          .hq-bento > div { grid-column: span 12 !important; }
          .hq-stats-banner { gap: 40px; }
        }
      `}</style>

      {/* 1. ARCHITECTURE / VALUE PROP */}
      <section className="hq-section">
        <div className="hq-container">
          <div style={{ maxWidth: 800 }}>
            <div className="hq-pill">{t.badgeLeadMarket || 'The Engineering Standard'}</div>
            <h2 className="hq-title">{t.heroTitle}</h2>
            <p className="hq-subtitle">{t.heroSubtitle}</p>
          </div>

          <div className="hq-bento">
            {/* Span 4 x 3 */}
            <div className="hq-card" style={{ gridColumn: 'span 4' }}>
              <div className="hq-icon-box"><IconCheck /></div>
              <h3 className="hq-card-title">{t.comp1Title}</h3>
              <p className="hq-card-desc">{t.comp1Desc}</p>
            </div>
            <div className="hq-card" style={{ gridColumn: 'span 4' }}>
              <div className="hq-icon-box"><IconZap /></div>
              <h3 className="hq-card-title">{t.comp2Title}</h3>
              <p className="hq-card-desc">{t.comp2Desc}</p>
            </div>
            <div className="hq-card" style={{ gridColumn: 'span 4' }}>
              <div className="hq-icon-box"><IconShield /></div>
              <h3 className="hq-card-title">{t.comp3Title}</h3>
              <p className="hq-card-desc">{t.comp3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS INJECTION */}
      <div className="hq-stats-banner">
        {[
          { v: t.stat1Value || '< 12ms', l: t.stat1Label || 'Latency' },
          { v: t.stat2Value || '100%', l: t.stat2Label || 'Privacy' },
          { v: t.stat3Value || '30', l: t.stat3Label || 'Languages' },
          { v: t.stat4Value || '∞', l: t.stat4Label || 'Scans' }
        ].map((s, i) => (
          <div key={i} className="hq-stat-group">
            <div className="hq-stat-val">{s.v}</div>
            <div className="hq-stat-lbl">{s.l}</div>
          </div>
        ))}
      </div>

      {/* 3. ASYMMETRICAL USE CASES & STEPS BENTO */}
      <section className="hq-section">
        <div className="hq-container">
          <div className="hq-bento">
            {/* Left Giant Column */}
            <div className="hq-card" style={{ gridColumn: 'span 7', minHeight: 480, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="hq-pill">{t.badgeQuickStart || 'Workflow'}</div>
              <h2 className="hq-title" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>{t.stepsTitle}</h2>
              <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 32 }}>
                {[
                  { n: '1', t: t.step1Title, d: t.step1Desc },
                  { n: '2', t: t.step2Title, d: t.step2Desc },
                  { n: '3', t: t.step3Title, d: t.step3Desc }
                ].map(step => (
                  <div key={step.n} style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--hq-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, color: 'var(--hq-text)', flexShrink: 0 }}>
                      {step.n}
                    </div>
                    <div>
                      <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{step.t}</h4>
                      <p style={{ color: 'var(--hq-text-muted)', lineHeight: 1.6 }}>{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Stacked Cards */}
            <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div className="hq-card" style={{ flex: 1 }}>
                <div className="hq-giant-num">🌐</div>
                <h3 className="hq-card-title">{t.useCase1Title}</h3>
                <p className="hq-card-desc">{t.useCase1Desc}</p>
              </div>
              <div className="hq-card" style={{ flex: 1, background: 'var(--hq-accent)', color: 'var(--hq-bg)' }}>
                <h3 className="hq-card-title" style={{ color: 'inherit' }}>{t.useCase2Title}</h3>
                <p className="hq-card-desc" style={{ color: 'inherit', opacity: 0.8 }}>{t.useCase2Desc}</p>
                <div style={{ marginTop: 24 }}>
                  <a href="#top" style={{ display: 'inline-flex', background: 'var(--hq-bg)', color: 'var(--hq-text)', padding: '12px 24px', borderRadius: 999, fontWeight: 600, textDecoration: 'none' }}>
                    {t.ctaButton || 'Start Building'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXTREME CLEAN FAQ */}
      <section className="hq-section" style={{ borderTop: '1px solid var(--hq-border)' }}>
        <div className="hq-container">
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 className="hq-title" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>{t.faqTitle}</h2>
          </div>
          <div className="hq-faq-wrap">
            {[
              { q: t.faq1Q, a: t.faq1A },
              { q: t.faq2Q, a: t.faq2A },
              { q: t.faq3Q, a: t.faq3A },
              { q: t.faq4Q, a: t.faq4A },
              { q: t.faq5Q, a: t.faq5A },
            ].map((faq, idx) => (
              <div key={idx} className="hq-faq-item">
                <button
                  className="hq-faq-btn"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span>{faq.q}</span>
                  <IconChevronDown open={openFaq === idx} />
                </button>
                {openFaq === idx && (
                  <div className="hq-faq-body">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TRUST STANDARDS TERMINAL */}
      <section className="hq-section" style={{ background: '#000000', color: '#ffffff' }}>
        <div className="hq-container" style={{ textAlign: 'center' }}>
          <div className="hq-pill" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
            {t.badgeTrust || 'Security & Compliance'}
          </div>
          <h2 className="hq-title" style={{ color: '#fff' }}>{t.trustTitle || 'Built On Global Standards'}</h2>
          <p className="hq-subtitle" style={{ color: '#888', margin: '0 auto 60px' }}>{t.trustDesc}</p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
            {[
              { label: t.globalBarcodeRules || 'ISO/IEC 18004', icon: '🔐' },
              { label: t.federalSafetyGold  || 'NIST Privacy',  icon: '🛡️' },
              { label: t.trustBadge3        || 'W3C HTML5',     icon: '🌐' },
              { label: t.trustBadge4        || 'Zero Trust',    icon: '🔒' },
            ].map((b, i) => (
              <div key={i} style={{ padding: '16px 32px', background: 'rgba(255,255,255,0.05)', borderRadius: 999, border: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: 12 }}>
                <span>{b.icon}</span> {b.label}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

export default LandingContent;
