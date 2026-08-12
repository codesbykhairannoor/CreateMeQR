import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  QrCode, ScanLine, Scan, Search, X, ArrowRight, ShieldCheck, Zap,
  Globe, Check, ChevronDown, ChevronUp, Star,
  Camera, Users, Hash, Music2, Briefcase, Ghost,
  MessageCircle, Send, Gamepad2,
  Link, ClipboardList, List,
  Contact, Mail, Phone, MessageSquare,
  CreditCard, Wallet, Bitcoin, Smartphone, ShoppingCart,
  MapPin, Calendar, CalendarDays,
  Video, Music, Image, Mic,
  FileText, File, Type, Wifi,
} from 'lucide-react';
import { localizedRoutes } from '../config/localizedRoutes';
import { LANGS } from '../config/site';

// All 37 QR & Barcode tools (id, icon, label, category, color)
const ALL_TOOLS = [
  // Social & Media
  { id: 'instagram',   icon: Camera,        label: 'Instagram',      category: 'social',   color: '#E1306C' },
  { id: 'facebook',    icon: Users,         label: 'Facebook',       category: 'social',   color: '#1877F2' },
  { id: 'twitter',     icon: Hash,          label: 'X (Twitter)',    category: 'social',   color: '#000000' },
  { id: 'tiktok',      icon: Music2,        label: 'TikTok',         category: 'social',   color: '#010101' },
  { id: 'linkedin',    icon: Briefcase,     label: 'LinkedIn',       category: 'social',   color: '#0077B5' },
  { id: 'snapchat',    icon: Ghost,         label: 'Snapchat',       category: 'social',   color: '#F7B731' },
  // Messaging
  { id: 'whatsapp',    icon: MessageCircle, label: 'WhatsApp',       category: 'message',  color: '#25D366' },
  { id: 'telegram',    icon: Send,          label: 'Telegram',       category: 'message',  color: '#0088CC' },
  { id: 'discord',     icon: Gamepad2,      label: 'Discord',        category: 'message',  color: '#5865F2' },
  // Links & Web
  { id: 'url',         icon: Link,          label: 'URL / Link',     category: 'web',      color: '#2563EB' },
  { id: 'gforms',      icon: ClipboardList, label: 'Google Forms',   category: 'web',      color: '#7B68EE' },
  { id: 'greview',     icon: Star,          label: 'Google Review',  category: 'web',      color: '#FBBC04' },
  { id: 'linkinbio',   icon: List,          label: 'Link in Bio',    category: 'web',      color: '#8B5CF6' },
  // Contact
  { id: 'vcard',       icon: Contact,       label: 'vCard',          category: 'contact',  color: '#0EA5E9' },
  { id: 'email',       icon: Mail,          label: 'Email',          category: 'contact',  color: '#EF4444' },
  { id: 'phone',       icon: Phone,         label: 'Phone',          category: 'contact',  color: '#10B981' },
  { id: 'sms',         icon: MessageSquare, label: 'SMS',            category: 'contact',  color: '#F59E0B' },
  // Finance & Store
  { id: 'paypal',      icon: CreditCard,    label: 'PayPal',         category: 'finance',  color: '#003087' },
  { id: 'venmo',       icon: Wallet,        label: 'Venmo',          category: 'finance',  color: '#3D95CE' },
  { id: 'crypto',      icon: Bitcoin,       label: 'Crypto',         category: 'finance',  color: '#F7931A' },
  { id: 'appstore',    icon: Smartphone,    label: 'App Store',      category: 'finance',  color: '#0071E3' },
  { id: 'amazon',      icon: ShoppingCart,  label: 'Amazon',         category: 'finance',  color: '#FF9900' },
  // Places & Events
  { id: 'location',    icon: MapPin,        label: 'Location',       category: 'places',   color: '#EF4444' },
  { id: 'event',       icon: Calendar,      label: 'Event',          category: 'places',   color: '#6366F1' },
  { id: 'booking',     icon: CalendarDays,  label: 'Booking',        category: 'places',   color: '#0EA5E9' },
  // Media & Entertainment
  { id: 'youtube',     icon: Video,         label: 'YouTube',        category: 'media',    color: '#FF0000' },
  { id: 'spotify',     icon: Music,         label: 'Spotify',        category: 'media',    color: '#1DB954' },
  { id: 'image',       icon: Image,         label: 'Image',          category: 'media',    color: '#8B5CF6' },
  { id: 'video',       icon: Video,         label: 'Video',          category: 'media',    color: '#3B82F6' },
  { id: 'audio',       icon: Mic,           label: 'Audio',          category: 'media',    color: '#EC4899' },
  // Files & Data
  { id: 'pdf',         icon: FileText,      label: 'PDF',            category: 'data',     color: '#EF4444' },
  { id: 'file',        icon: File,          label: 'File',           category: 'data',     color: '#6B7280' },
  { id: 'text',        icon: Type,          label: 'Text',           category: 'data',     color: '#1D4ED8' },
  { id: 'wifi',        icon: Wifi,          label: 'Wi-Fi',          category: 'data',     color: '#10B981' },
  // Scanner / Barcode
  { id: 'barcode',     icon: ScanLine,      label: 'Barcode Maker',  category: 'scanner',  color: '#7C3AED' },
  { id: 'scanqr',      icon: Scan,          label: 'Scan QR',        category: 'scanner',  color: '#2563EB' },
  { id: 'scanbarcode', icon: ScanLine,      label: 'Scan Barcode',   category: 'scanner',  color: '#0D9488' },
];

const CATEGORIES = [
  { id: 'all',     label: 'All Tools' },
  { id: 'social',  label: 'Social' },
  { id: 'message', label: 'Messaging' },
  { id: 'web',     label: 'Web & Links' },
  { id: 'contact', label: 'Contact' },
  { id: 'finance', label: 'Finance' },
  { id: 'places',  label: 'Places' },
  { id: 'media',   label: 'Media' },
  { id: 'data',    label: 'Files & Data' },
  { id: 'scanner', label: 'Scanner' },
];

const FAQS_DEFAULT = [
  {
    q: 'What is CreateMy-QR?',
    a: 'CreateMy-QR is a free, browser-based platform offering 37 QR code and barcode tools. It generates ISO/IEC 18004:2015-compliant QR codes with 100% client-side processing — no uploads, no tracking, no account required.',
  },
  {
    q: 'Are the QR codes free to use forever?',
    a: 'Yes. All QR codes generated are static and free forever. There are no limits, no watermarks, no expiry dates, and no subscription required. Ever.',
  },
];
// Note: FAQS_DEFAULT no longer needed — keys are in translation.json


function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        borderBottom: '1px solid rgba(37,99,235,0.1)',
        paddingBottom: 20,
        marginBottom: 20,
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.4, margin: 0 }}>{faq.q}</h3>
        {open
          ? <ChevronUp size={20} style={{ flexShrink: 0, color: '#2563EB', marginTop: 2 }} />
          : <ChevronDown size={20} style={{ flexShrink: 0, opacity: 0.4, marginTop: 2 }} />
        }
      </div>
      {open && (
        <p style={{ marginTop: 14, fontSize: '1rem', lineHeight: 1.75, opacity: 0.65, margin: '14px 0 0' }}>{faq.a}</p>
      )}
    </div>
  );
}

export default function HomePage({ currentLangCode = 'en' }) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('all');

  const getToolUrl = (toolId) => {
    const localizedPath = localizedRoutes[currentLangCode]?.[toolId];
    if (!localizedPath) return '/url-qr-code-generator';
    const prefix = currentLangCode === 'en' ? '' : `/${currentLangCode}`;
    if (localizedPath === '/') {
      // url tool was at root, now at /url-qr-code-generator
      return `${prefix}/url-qr-code-generator`;
    }
    return `${prefix}${localizedPath}`;
  };

  const filtered = ALL_TOOLS.filter((tool) => {
    const matchCat = activeCat === 'all' || tool.category === activeCat;
    const q = search.toLowerCase();
    const translatedLabel = t(`types.${tool.id}`, tool.label).toLowerCase();
    const matchSearch = !q || translatedLabel.includes(q) || tool.label.toLowerCase().includes(q) || tool.id.includes(q);
    return matchCat && matchSearch;
  });

  const seoTitle = `CreateMy-QR | ${t('home.heroTitle', 'All QR & Barcode')} ${t('home.heroTitleHighlight', 'Tools in One Place')}`;
  const seoDesc = t('home.seoDesc', 'Generate 37 types of QR codes and barcodes for free. No signup. Instant download. 100% client-side, ISO/IEC 18004-compliant, available in 30 languages.');
  const canonicalBase = `https://createmy-qr.com${currentLangCode === 'en' ? '' : '/' + currentLangCode}`;

  // Translated FAQ — now from translation JSON
  const FAQS = [
    { q: t('home.faq1q'), a: t('home.faq1a') },
    { q: t('home.faq2q'), a: t('home.faq2a') },
    { q: t('home.faq3q'), a: t('home.faq3a') },
  ];

  return (
    <main style={{ width: '100%', position: 'relative', overflowX: 'hidden' }}>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${canonicalBase}/`} />
        <link rel="canonical" href={`${canonicalBase}/`} />
        {LANGS.map(lang => {
          const href = `https://createmy-qr.com${lang.code === 'en' ? '' : '/' + lang.code}/`;
          return <link key={lang.code} rel="alternate" hrefLang={lang.code} href={href} />;
        })}
        <link rel="alternate" hrefLang="x-default" href="https://createmy-qr.com/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "CreateMy-QR",
          "description": seoDesc,
          "url": "https://createmy-qr.com",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "All",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "ratingCount": "18200" }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQS.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
          }))
        })}</script>
      </Helmet>

      {/* ═══════ SECTION 1: HERO ═══════ */}
      <section style={{ position: 'relative', paddingTop: 'clamp(115px, 12vw, 135px)', paddingBottom: '56px', textAlign: 'center' }}>
        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Monumental headline — class matches audiovideo .hero-title pattern */}
          <h1
            className="homepage-hero-title"
            style={{
              fontSize: 'clamp(2.75rem, 6.5vw, 4.75rem)', 
              fontWeight: 900, 
              letterSpacing: '-0.03em', 
              lineHeight: 1.15,
              marginBottom: 24,
              margin: '0 auto 24px',
            }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-blue-700 dark:from-blue-300 dark:to-blue-600 pr-1">
              {t('home.heroTitle')}
            </span>{' '}
            {t('home.heroTitleHighlight')}
          </h1>

          {/* Subtitle */}
          <p className="homepage-hero-subtitle text-zinc-600 dark:text-zinc-400" style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
            lineHeight: 1.65,
            maxWidth: 780,
            margin: '0 auto 40px',
            fontWeight: 500,
          }}>
            {t('home.heroSubtitle')}
          </p>


          {/* Search */}
          <div className="hero-search-wrapper" style={{ maxWidth: 600, margin: '0 auto 44px', position: 'relative' }}>
            <Search size={20} style={{ position: 'absolute', left: 22, top: '50%', transform: 'translateY(-50%)', opacity: 0.38, zIndex: 2 }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('home.searchPlaceholder', 'Search tools — WhatsApp, WiFi, vCard, PDF...')}
              className="hero-search-input"
              style={{
                width: '100%', padding: '18px 24px 18px 56px', borderRadius: 9999,
                border: '1.5px solid rgba(37,99,235,0.18)',
                background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(8px)',
                fontSize: '1rem', fontWeight: 500, outline: 'none', color: 'inherit',
                boxShadow: '0 8px 32px rgba(37,99,235,0.07)', transition: 'all 0.22s',
              }}
              onFocus={e => { e.target.style.borderColor = '#2563EB'; e.target.style.boxShadow = '0 0 0 4px rgba(37,99,235,0.1), 0 8px 32px rgba(37,99,235,0.12)'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(37,99,235,0.18)'; e.target.style.boxShadow = '0 8px 32px rgba(37,99,235,0.07)'; }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{
                  position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)',
                  width: 28, height: 28, borderRadius: '50%', border: 'none',
                  background: 'rgba(0,0,0,0.08)', cursor: 'pointer', color: 'inherit',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Category filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                style={{
                  padding: '9px 20px', borderRadius: 9999,
                  fontSize: '0.83rem', fontWeight: 700, cursor: 'pointer',
                  border: 'none', transition: 'all 0.2s ease',
                  background: activeCat === cat.id
                    ? 'linear-gradient(135deg, #1e3a8a, #2563EB)'
                    : 'rgba(37,99,235,0.07)',
                  color: activeCat === cat.id ? '#fff' : 'inherit',
                  boxShadow: activeCat === cat.id ? '0 6px 18px rgba(37,99,235,0.28)' : 'none',
                  transform: activeCat === cat.id ? 'translateY(-2px)' : 'none',
                  opacity: activeCat === cat.id ? 1 : 0.7,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 2: TOOLS GRID ═══════ */}
      <section style={{ padding: '16px 0 80px' }}>
        <div className="max-w-7xl mx-auto px-6">

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] text-zinc-900 dark:text-white" style={{
              fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2,
            }}>
              {activeCat === 'all'
                ? t('home.allToolsHeading', 'All Tools')
                : (CATEGORIES.find(c => c.id === activeCat)?.label || '')}
              <span style={{ marginLeft: 10, opacity: 0.35, fontWeight: 600, fontSize: '1.2rem' }}>
                ({filtered.length})
              </span>
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '64px 24px', borderRadius: 32,
              border: '1px dashed rgba(37,99,235,0.18)',
            }}>
              <QrCode size={44} style={{ opacity: 0.15, margin: '0 auto 16px', display: 'block' }} />
              <p style={{ opacity: 0.45, fontSize: '1rem' }}>
                {t('home.noResults', 'No tools found. Try a different keyword.')}
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
              gap: 18,
            }}>
              {filtered.map(tool => {
                const Icon = tool.icon;
                const href = getToolUrl(tool.id);
                return (
                  <RouterLink
                    key={tool.id}
                    to={href}
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                  >
                    <div
                      style={{
                        padding: '26px 22px', borderRadius: 26, height: '100%',
                        border: '1px solid rgba(37,99,235,0.1)',
                        background: 'rgba(255,255,255,0.025)',
                        display: 'flex', flexDirection: 'column', gap: 14,
                        cursor: 'pointer', position: 'relative', overflow: 'hidden',
                        transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.borderColor = `${tool.color}55`;
                        e.currentTarget.style.boxShadow = `0 12px 40px ${tool.color}18`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.borderColor = 'rgba(37,99,235,0.1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {/* Color accent glow */}
                      <div style={{
                        position: 'absolute', top: -16, right: -16, width: 72, height: 72,
                        borderRadius: '50%', background: tool.color, opacity: 0.07,
                        filter: 'blur(18px)', pointerEvents: 'none',
                      }} />

                      {/* Icon + badge */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{
                          width: 48, height: 48, borderRadius: 15,
                          background: `${tool.color}18`,
                          border: `1.5px solid ${tool.color}25`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <Icon size={20} style={{ color: tool.color }} />
                        </div>
                        <span style={{
                          fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em',
                          textTransform: 'uppercase', padding: '4px 10px', borderRadius: 9999,
                          background: 'rgba(37,99,235,0.07)', opacity: 0.55,
                        }}>
                          {tool.category}
                        </span>
                      </div>

                      {/* Label — translated via types.* key */}
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, lineHeight: 1.3, margin: 0, flexGrow: 1 }}>
                        {t(`types.${tool.id}`, tool.label)}
                      </h3>

                      {/* CTA */}
                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        paddingTop: 12, borderTop: '1px solid rgba(37,99,235,0.07)',
                        fontSize: '0.84rem', fontWeight: 700, color: '#2563EB',
                      }}>
                        <span>{t('home.generate', 'Generate Free')}</span>
                        <ArrowRight size={15} />
                      </div>
                    </div>
                  </RouterLink>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ═══════ SECTION 3: TRUST / ZERO TRACKING ═══════ */}
      <section style={{ padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div style={{
            borderRadius: 44, padding: 'clamp(36px, 7vw, 68px)',
            position: 'relative', overflow: 'hidden',
            border: '1px solid rgba(37,99,235,0.14)',
            background: 'linear-gradient(135deg, rgba(37,99,235,0.04) 0%, rgba(124,58,237,0.04) 100%)',
          }}>
            {/* Orb glow */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)', width: 700, height: 600,
              background: 'radial-gradient(circle, rgba(37,99,235,0.06), transparent 65%)',
              borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px',
                borderRadius: 9999, border: '1px solid rgba(37,99,235,0.2)',
                background: 'rgba(37,99,235,0.06)', marginBottom: 24,
                fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB', boxShadow: '0 0 8px #2563EB', display: 'inline-block' }} />
                <span style={{ color: '#2563EB' }}>{t('home.privacyPill', '100% Private & Secure')}</span>
              </div>

              <h2 className="homepage-section-title" style={{ marginBottom: 18 }}>
                {t('home.trustTitle', 'Zero Upload. Zero Tracking. Zero Compromise.')}
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.62, maxWidth: 820, marginBottom: 40 }}>
                {t('home.trustDesc', 'Every QR code is generated inside your browser using JavaScript. Your URLs, contacts, WiFi passwords, and payment credentials never leave your device. No server receives your input. This makes CreateMy-QR the safest alternative to cloud-based QR generators for enterprise, healthcare, and government use cases.')}
              </p>

              {/* 4 feature cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                {[
                  { icon: ShieldCheck, label: t('home.feat1', 'GDPR & CCPA Compliant'),  desc: t('home.feat1Desc', 'No personal data collected') },
                  { icon: Zap,         label: t('home.feat2', 'Instant Generation'),     desc: t('home.feat2Desc', 'Sub-100ms QR rendering') },
                  { icon: Globe,       label: t('home.feat3', '30 Languages'),            desc: t('home.feat3Desc', 'Fully localized worldwide') },
                  { icon: QrCode,      label: t('home.feat4', 'ISO 18004 Compliant'),    desc: t('home.feat4Desc', 'Meets international QR standard') },
                ].map((f, i) => {
                  const FIcon = f.icon;
                  return (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 12, padding: '18px',
                      borderRadius: 18, border: '1px solid rgba(37,99,235,0.1)',
                      background: 'rgba(37,99,235,0.04)',
                    }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: 11,
                        background: 'rgba(37,99,235,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <FIcon size={17} style={{ color: '#2563EB' }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: 3 }}>{f.label}</div>
                        <div style={{ fontSize: '0.78rem', opacity: 0.55, lineHeight: 1.4 }}>{f.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 4: WHAT IS / WHY SECURE (GEO) ═══════ */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(37,99,235,0.08)' }}>
        <div className="max-w-7xl mx-auto px-6" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 60, alignItems: 'start',
        }}>

          {/* Left — What is */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px',
              borderRadius: 9999, border: '1px solid rgba(37,99,235,0.2)',
              background: 'rgba(37,99,235,0.05)', marginBottom: 22,
              fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#2563EB',
            }}>
              Key Facts
            </div>
            <h2 className="homepage-section-title" style={{ marginBottom: 20 }}>
              {t('home.whatIsTitle', 'What is CreateMy-QR?')}
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.63, marginBottom: 28 }}>
              {t('home.whatIsDesc', 'CreateMy-QR is a free, client-side QR code and barcode generation platform supporting 37 data types including social media, messaging apps, payments, files, and contact cards. All codes are static, ISO/IEC 18004-compliant, and export-ready as high-resolution SVG or PNG. No account. No expiry. No cost.')}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                t('home.fact1', 'Generates QR codes locally — no data sent to any server.'),
                t('home.fact2', 'Supports 37 types: URL, WhatsApp, vCard, WiFi, Crypto, PDF, and more.'),
                t('home.fact3', 'Fully localized in 30 languages including Arabic, Japanese, and Hindi.'),
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1e3a8a, #2563EB)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 3,
                  }}>
                    <Check size={11} strokeWidth={3} style={{ color: '#fff' }} />
                  </div>
                  <span style={{ fontSize: '1rem', lineHeight: 1.65, opacity: 0.67 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Why secure */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px',
              borderRadius: 9999, border: '1px solid rgba(124,58,237,0.2)',
              background: 'rgba(124,58,237,0.05)', marginBottom: 22,
              fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#7C3AED',
            }}>
              Trust & Security
            </div>
            <h2 className="homepage-section-title" style={{ marginBottom: 20 }}>
              {t('home.whySecureTitle', 'Why is it 100% Secure?')}
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.63, marginBottom: 24 }}>
              {t('home.whySecureDesc', "Unlike cloud-based QR generators that receive and store your input on remote servers, CreateMy-QR encodes everything inside your browser's JavaScript engine using the Reed-Solomon error-correction algorithm locally. Your WiFi credentials, payment details, or private URLs are never transmitted over the network.")}
            </p>
            {/* Citation card */}
            <div style={{
              padding: '18px 22px', borderRadius: 18,
              border: '1px solid rgba(124,58,237,0.15)',
              background: 'rgba(124,58,237,0.04)',
            }}>
              <p style={{ fontSize: '0.88rem', lineHeight: 1.7, fontStyle: 'italic', opacity: 0.68, margin: 0 }}>
                {t('home.citation2', '"QR code systems must implement error correction at one of four levels (L, M, Q, H), ensuring reliable scanning even when up to 30% of the code module is obscured."')}
              </p>
              <p style={{ fontSize: '0.78rem', fontWeight: 700, marginTop: 10, opacity: 0.45, margin: '10px 0 0' }}>
                — ISO/IEC 18004:2015, Section 7.4
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 5: FAQ ═══════ */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(37,99,235,0.08)' }}>
        <div className="max-w-[800px] mx-auto px-6">

          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px',
              borderRadius: 9999, border: '1px solid rgba(37,99,235,0.2)',
              background: 'rgba(37,99,235,0.05)', marginBottom: 18,
              fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#2563EB',
            }}>
              FAQ
            </div>
            <h2 className="homepage-section-title" style={{ marginBottom: 10 }}>
              {t('home.faqTitle', 'Frequently Asked Questions')}
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.52 }}>
              {t('home.faqSubtitle', 'Everything you need to know about CreateMy-QR.')}
            </p>
          </div>

          <div>
            {FAQS.map((faq, i) => <FaqItem key={i} faq={faq} />)}
          </div>
        </div>
      </section>

    </main>
  );
}
