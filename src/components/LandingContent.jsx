import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { landingTranslations } from '../landingTranslations';

// iOS-style phosphor-inspired icons using inline SVG paths
const IconCheck = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);
const IconZap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);
const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconChevronDown = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease' }}>
    <path d="m6 9 6 6 6-6"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconStar = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

function LandingContent() {
  const { i18n } = useTranslation();
  const langCode = (i18n.language || 'en').split('-')[0];

  const t = landingTranslations[langCode] || landingTranslations.en;
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div
      className="lc-container"
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
        background: 'var(--lc-bg, #f5f5f7)',
        color: 'var(--lc-text, #1d1d1f)',
        padding: '72px 0 0',
        width: '100%',
      }}
    >
      <style>{`
        .lc-container {
          --lc-bg: #f5f5f7;
          --lc-text: #1d1d1f;
          --lc-text2: #6e6e73;
          --lc-card: rgba(255,255,255,0.88);
          --lc-card-border: rgba(0,0,0,0.08);
          --lc-blue: #0071e3;
          --lc-blue-light: #e8f1ff;
          --lc-divider: rgba(0,0,0,0.1);
          --lc-shadow: 0 2px 20px rgba(0,0,0,0.06);
          --lc-shadow-hover: 0 8px 40px rgba(0,0,0,0.12);
          --lc-dark-card: #1c1c1e;
          --lc-radius: 20px;
        }
        .dark .lc-container {
          --lc-bg: #000000;
          --lc-text: #f5f5f7;
          --lc-text2: #98989d;
          --lc-card: rgba(28,28,30,0.9);
          --lc-card-border: rgba(255,255,255,0.1);
          --lc-blue-light: #1a2b45;
          --lc-divider: rgba(255,255,255,0.1);
          --lc-shadow: 0 2px 20px rgba(0,0,0,0.5);
          --lc-shadow-hover: 0 8px 40px rgba(0,0,0,0.7);
          --lc-dark-card: #1c1c1e;
        }
        .lc-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
        .lc-section { padding: 80px 0; }
        .lc-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600; letter-spacing: 0.02em;
          color: var(--lc-blue); background: var(--lc-blue-light);
          padding: 6px 14px; border-radius: 999px;
          margin-bottom: 16px;
        }
        .lc-h2 {
          font-size: clamp(28px, 5vw, 46px); font-weight: 700;
          letter-spacing: -0.025em; line-height: 1.08;
          color: var(--lc-text); margin: 0 0 16px;
        }
        .lc-lead {
          font-size: 17px; line-height: 1.6;
          color: var(--lc-text2); max-width: 580px; margin: 0 auto;
        }
        .lc-card {
          background: var(--lc-card);
          backdrop-filter: saturate(180%) blur(20px);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
          border: 1px solid var(--lc-card-border);
          border-radius: var(--lc-radius);
          box-shadow: var(--lc-shadow);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
        }
        .lc-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--lc-shadow-hover);
        }
        .lc-icon-bubble {
          width: 46px; height: 46px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px; flex-shrink: 0;
        }
        .lc-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (max-width: 768px) { .lc-grid-3 { grid-template-columns: 1fr; } }
        .lc-stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; }
        @media (max-width: 640px) { .lc-stat-grid { grid-template-columns: repeat(2, 1fr); } }
        .lc-bento { display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px; }
        @media (max-width: 768px) { .lc-bento { grid-template-columns: 1fr; } }
        .lc-faq-item {
          border-bottom: 1px solid var(--lc-divider);
          padding: 0;
        }
        .lc-faq-btn {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          gap: 16px; padding: 20px 0;
          background: none; border: none; cursor: pointer;
          text-align: left; font-size: 17px; font-weight: 500;
          color: var(--lc-text);
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
        }
        .lc-faq-body {
          font-size: 15px; line-height: 1.65; color: var(--lc-text2);
          padding: 0 0 20px;
        }
        .lc-steps-num {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; font-weight: 700; color: #fff;
          margin-bottom: 16px; flex-shrink: 0;
        }
        .lc-trust-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 18px; border-radius: 12px;
          font-size: 13px; font-weight: 600;
          background: var(--lc-card); border: 1px solid var(--lc-card-border);
          color: var(--lc-text); box-shadow: var(--lc-shadow);
        }
        .lc-cta-btn {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 16px 36px; border-radius: 999px;
          background: var(--lc-blue); color: #fff;
          font-size: 17px; font-weight: 600; border: none; cursor: pointer;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          transition: transform 0.2s ease, opacity 0.2s ease;
          text-decoration: none;
        }
        .lc-cta-btn:hover { opacity: 0.88; transform: scale(1.02); }
        .lc-cta-btn:active { transform: scale(0.97); }
      `}</style>

      {/* ── SECTION 1: Why We Lead ── */}
      <div className="lc-section">
        <div className="lc-wrap">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="lc-eyebrow">{t.badgeLeadMarket || 'Why We Lead'}</span>
            <h2 className="lc-h2">{t.heroTitle}</h2>
            <p className="lc-lead">{t.heroSubtitle}</p>
          </div>

          <div className="lc-grid-3">
            {/* Card 1 - Forever Free */}
            <div className="lc-card" style={{ padding: '28px 28px 32px' }}>
              <div className="lc-icon-bubble" style={{ background: 'linear-gradient(135deg,#34c759,#30d158)' }}>
                <IconCheck />
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#34c759', marginBottom: 10 }}>
                {t.badgeFree || 'Forever Free'}
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 600, color: 'var(--lc-text)', margin: '0 0 10px', lineHeight: 1.2 }}>{t.comp1Title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--lc-text2)', margin: 0 }}>{t.comp1Desc}</p>
            </div>

            {/* Card 2 - Zero Ads */}
            <div className="lc-card" style={{ padding: '28px 28px 32px' }}>
              <div className="lc-icon-bubble" style={{ background: 'linear-gradient(135deg,#007aff,#0071e3)' }}>
                <IconZap />
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#007aff', marginBottom: 10 }}>
                {t.badgeZeroAds || 'Zero Ads'}
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 600, color: 'var(--lc-text)', margin: '0 0 10px', lineHeight: 1.2 }}>{t.comp2Title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--lc-text2)', margin: 0 }}>{t.comp2Desc}</p>
            </div>

            {/* Card 3 - Private */}
            <div className="lc-card" style={{ padding: '28px 28px 32px' }}>
              <div className="lc-icon-bubble" style={{ background: 'linear-gradient(135deg,#af52de,#bf5af2)' }}>
                <IconShield />
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#bf5af2', marginBottom: 10 }}>
                {t.badgePrivate || '100% Private'}
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 600, color: 'var(--lc-text)', margin: '0 0 10px', lineHeight: 1.2 }}>{t.comp3Title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--lc-text2)', margin: 0 }}>{t.comp3Desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: Stats Bar ── */}
      <div style={{ background: 'var(--lc-dark-card)', padding: '0' }}>
        <div className="lc-wrap" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div style={{ textAlign: 'center', padding: '56px 0 36px' }}>
            <h2 style={{ fontSize: 'clamp(22px,4vw,34px)', fontWeight: 700, color: '#f5f5f7', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
              {t.statsTitle || 'Trusted By Millions of Creators'}
            </h2>
          </div>
          <div className="lc-stat-grid" style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 20, overflow: 'hidden', marginBottom: 56 }}>
            {[
              { value: t.stat1Value || '< 12ms', label: t.stat1Label || 'Generation Speed' },
              { value: t.stat2Value || '100%',   label: t.stat2Label || 'Client-Side Privacy' },
              { value: t.stat3Value || '30',      label: t.stat3Label || 'Languages Supported' },
              { value: t.stat4Value || '∞',       label: t.stat4Label || 'Free Scans, Forever' },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: '32px 24px',
                  textAlign: 'center',
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                }}
              >
                <div style={{ fontSize: 'clamp(28px,4vw,40px)', fontWeight: 700, color: '#f5f5f7', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 8 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 13, color: '#98989d', fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 3: 3-Step Guide ── */}
      <div className="lc-section">
        <div className="lc-wrap">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="lc-eyebrow">{t.badgeQuickStart || 'Quick Start'}</span>
            <h2 className="lc-h2">{t.stepsTitle}</h2>
          </div>

          <div className="lc-grid-3">
            {[
              { num: '1', color: '#007aff', shadow: 'rgba(0,122,255,0.3)', title: t.step1Title, desc: t.step1Desc },
              { num: '2', color: '#34c759', shadow: 'rgba(52,199,89,0.3)',  title: t.step2Title, desc: t.step2Desc },
              { num: '3', color: '#bf5af2', shadow: 'rgba(191,90,242,0.3)', title: t.step3Title, desc: t.step3Desc },
            ].map((step, i) => (
              <div key={i} className="lc-card" style={{ padding: '32px 28px 36px' }}>
                <div className="lc-steps-num" style={{ background: step.color, boxShadow: `0 8px 24px ${step.shadow}` }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--lc-text)', margin: '0 0 10px', lineHeight: 1.3 }}>{step.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--lc-text2)', margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 4: Use Cases Bento ── */}
      <div style={{ background: 'var(--lc-dark-card)', padding: '80px 0' }}>
        <div className="lc-wrap">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, letterSpacing: '0.02em', color: '#007aff', background: 'rgba(0,122,255,0.15)', padding: '6px 14px', borderRadius: 999, marginBottom: 16 }}>
              {t.badgeUseCases || 'Use Cases'}
            </span>
            <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontWeight: 700, letterSpacing: '-0.025em', color: '#f5f5f7', margin: '0 0 16px' }}>
              {t.useCasesTitle || 'Perfect For Every Situation'}
            </h2>
          </div>

          {/* Asymmetric bento: 2 large + 3 small */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 14 }}>
            {/* Large card 1 */}
            <div style={{ gridColumn: 'span 7', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '40px 36px', backdropFilter: 'blur(20px)' }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>🍽️</div>
              <h3 style={{ fontSize: 22, fontWeight: 600, color: '#f5f5f7', margin: '0 0 12px' }}>{t.useCase1Title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: '#98989d', margin: 0 }}>{t.useCase1Desc}</p>
            </div>
            {/* Large card 2 */}
            <div style={{ gridColumn: 'span 5', background: 'linear-gradient(135deg, rgba(0,122,255,0.25), rgba(0,122,255,0.08))', border: '1px solid rgba(0,122,255,0.2)', borderRadius: 20, padding: '40px 32px', backdropFilter: 'blur(20px)' }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>💼</div>
              <h3 style={{ fontSize: 22, fontWeight: 600, color: '#f5f5f7', margin: '0 0 12px' }}>{t.useCase2Title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: '#98989d', margin: 0 }}>{t.useCase2Desc}</p>
            </div>
            {/* 3 small cards */}
            {[
              { emoji: '📶', title: t.useCase3Title, desc: t.useCase3Desc },
              { emoji: '🎟️', title: t.useCase4Title, desc: t.useCase4Desc },
              { emoji: '🏪', title: t.useCase5Title, desc: t.useCase5Desc },
            ].map((uc, i) => (
              <div key={i} style={{ gridColumn: 'span 4', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: '28px 24px', backdropFilter: 'blur(10px)' }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{uc.emoji}</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#f5f5f7', margin: '0 0 8px' }}>{uc.title}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: '#98989d', margin: 0 }}>{uc.desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile fallback for bento */}
          <style>{`@media (max-width: 768px) {
            .lc-bento-inner > div { grid-column: span 12 !important; }
          }`}</style>
        </div>
      </div>

      {/* ── SECTION 5: FAQ Accordion ── */}
      <div className="lc-section">
        <div className="lc-wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
            {/* Left: Header */}
            <div style={{ position: 'sticky', top: 100 }}>
              <span className="lc-eyebrow">{t.badgeQuestions || 'FAQ'}</span>
              <h2 className="lc-h2" style={{ textAlign: 'left', margin: '16px 0 20px' }}>{t.faqTitle}</h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--lc-text2)', margin: 0, maxWidth: 360 }}>
                {t.heroSubtitle}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 24 }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: '#ff9f0a' }}><IconStar /></span>
                ))}
                <span style={{ fontSize: 13, color: 'var(--lc-text2)', marginLeft: 8, fontWeight: 500 }}>4.9 / 5</span>
              </div>
            </div>
            {/* Right: FAQ items */}
            <div>
              {[
                { q: t.faq1Q, a: t.faq1A },
                { q: t.faq2Q, a: t.faq2A },
                { q: t.faq3Q, a: t.faq3A },
                { q: t.faq4Q, a: t.faq4A },
                { q: t.faq5Q, a: t.faq5A },
              ].map((faq, idx) => (
                <div key={idx} className="lc-faq-item">
                  <button
                    className="lc-faq-btn"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    aria-expanded={openFaq === idx}
                  >
                    <span>{faq.q}</span>
                    <span style={{ color: 'var(--lc-text2)', flexShrink: 0 }}>
                      <IconChevronDown open={openFaq === idx} />
                    </span>
                  </button>
                  {openFaq === idx && (
                    <div className="lc-faq-body">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Mobile responsive for FAQ 2-col */}
          <style>{`@media (max-width: 768px) {
            .lc-faq-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          }`}</style>
        </div>
      </div>

      {/* ── SECTION 6: Trust & Standards ── */}
      <div style={{ background: 'var(--lc-card)', borderTop: '1px solid var(--lc-divider)', borderBottom: '1px solid var(--lc-divider)', padding: '64px 0' }}>
        <div className="lc-wrap">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 400px' }}>
              <span className="lc-eyebrow">{t.badgeTrust || 'Standards & Security'}</span>
              <h2 style={{ fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--lc-text)', margin: '16px 0 14px' }}>
                {t.trustTitle || 'Built On Global Standards'}
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--lc-text2)', margin: '0 0 28px', maxWidth: 480 }}>
                {t.trustDesc}
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {[
                { label: t.globalBarcodeRules || 'ISO/IEC 18004', icon: '🔐' },
                { label: t.federalSafetyGold  || 'NIST Privacy',  icon: '🛡️' },
                { label: t.trustBadge3        || 'W3C HTML5',     icon: '🌐' },
                { label: t.trustBadge4        || 'Zero Trust',    icon: '🔒' },
              ].map((b, i) => (
                <div key={i} className="lc-trust-badge">
                  <span>{b.icon}</span>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 7: Final CTA ── */}
      <div style={{ background: 'linear-gradient(160deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)', padding: '100px 0' }}>
        <div className="lc-wrap" style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginBottom: 20 }}>
            <span style={{ color: '#ff9f0a', fontSize: 13 }}>
              {[...Array(5)].map((_, i) => <IconStar key={i} />)}
            </span>
            <span style={{ color: '#98989d', fontSize: 13, fontWeight: 500, marginLeft: 4 }}>
              {t.badgeStats || 'By The Numbers'}
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(30px,5vw,54px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#f5f5f7', margin: '0 0 16px', lineHeight: 1.08 }}>
            {t.ctaTitle || 'Start Creating Your QR Code'}
          </h2>
          <p style={{ fontSize: 17, color: '#98989d', margin: '0 0 40px', lineHeight: 1.6 }}>
            {t.ctaSubtitle || 'Free forever. No signup. Works in every browser.'}
          </p>
          <a href="#top" className="lc-cta-btn" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            {t.ctaButton || 'Generate QR Code'}
          </a>
          <p style={{ fontSize: 13, color: '#636366', marginTop: 20 }}>
            <IconGlobe style={{ display: 'inline', verticalAlign: 'middle' }} /> {t.stat3Value || '30'} {t.stat3Label || 'Languages Supported'} &nbsp;·&nbsp; {t.stat4Value || '∞'} {t.stat4Label || 'Free Scans, Forever'}
          </p>
        </div>
      </div>

    </div>
  );
}

export default LandingContent;
