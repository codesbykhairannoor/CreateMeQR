import React from 'react';
import { useTranslation } from 'react-i18next';
import { Briefcase, Building2, Users, Lightbulb, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { localizedRoutes } from '../config/localizedRoutes';

export default function UseCases() {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || 'en').split('-')[0];
  const langPrefix = currentLang === 'en' ? '' : `/${currentLang}`;
  const langRoutes = localizedRoutes[currentLang] || localizedRoutes.en;
  const routeFor = (toolId) => `${langPrefix}${langRoutes[toolId] || localizedRoutes.en[toolId] || '/'}`;

  const canonicalPlaybooks = [
    {
      id: 'pdf',
      title: t('types.pdf', 'PDF QR Code'),
      desc: t('static.usecases.restaurantsDesc', 'Share digital restaurant menus, catalogs, and brochures instantly without printing costs.'),
    },
    {
      id: 'wifi',
      title: t('types.wifi', 'Wi-Fi QR Code'),
      desc: t('static.usecases.toolWifi', 'Instant one-scan guest Wi-Fi access for cafes, hotels, and coworking spaces.'),
    },
    {
      id: 'greview',
      title: t('types.greview', 'Google Review QR Code'),
      desc: t('static.usecases.toolReview', 'Collect verified customer reviews at checkout counters and printed receipts.'),
    },
    {
      id: 'vcard',
      title: t('types.vcard', 'vCard QR Code'),
      desc: t('static.usecases.toolVcard', 'Digital business cards for real estate agents, networking, and conferences.'),
    },
    {
      id: 'whatsapp',
      title: t('types.whatsapp', 'WhatsApp QR Code'),
      desc: t('static.usecases.whatsappDesc', 'Launch instant customer support and sales chats on WhatsApp.'),
    },
    {
      id: 'paypal',
      title: t('types.paypal', 'PayPal QR Code'),
      desc: t('static.usecases.paypalDesc', 'Accept frictionless donations, tips, and storefront payments.'),
    },
    {
      id: 'appstore',
      title: t('types.appstore', 'App Store QR Code'),
      desc: t('static.usecases.appstoreDesc', 'Route posters and packaging straight to iOS App Store or Google Play downloads.'),
    },
    {
      id: 'youtube',
      title: t('types.youtube', 'YouTube QR Code'),
      desc: t('static.usecases.youtubeDesc', 'Link product packaging directly to video setup guides and tutorials.'),
    },
    {
      id: 'bulk',
      title: t('bulk.title', 'Bulk QR Code Generator'),
      desc: t('bulk.subtitle', 'Generate hundreds of branded QR codes in seconds from a single CSV upload.'),
    },
  ];

  return (
    <>
      <div className="w-full flex-1 bg-slate-50 dark:bg-[#040814] text-slate-900 dark:text-white overflow-hidden">
        
        {/* Section 1: Hero */}
        <section className="relative w-full pt-32 pb-24 px-6 overflow-hidden">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-rose-500/10 dark:bg-rose-600/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/10 dark:bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full font-bold text-sm mb-8 tracking-wider border border-rose-200 dark:border-rose-500/20 backdrop-blur-md">
              <Briefcase size={16} /> {t('static.usecases.heroBadge', 'Industry Solutions')}
            </div>
            <h1 className="text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold mb-8 tracking-tight leading-[1.1]">
              {t('static.usecases.heroTitle', 'Built for Every Profession')}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium">
              {t('static.usecases.heroSubtitle', 'From strict legal environments to creative agencies, discover why professionals trust our architecture.')}
            </p>
          </div>
        </section>

        {/* Canonical Industry Solutions Directory */}
        <section className="w-full pb-20 px-6 relative z-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-[clamp(1.6rem,3.5vw,2.25rem)] font-extrabold text-center mb-12">
              {t('static.usecases.solutionsHeading', 'Specialized QR Code Playbooks')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {canonicalPlaybooks.map((item) => (
                <Link
                  key={item.id}
                  to={routeFor(item.id)}
                  className="group p-7 rounded-3xl bg-white dark:bg-[#0a1128] border border-slate-200 dark:border-[#1e2d4a] hover:border-blue-500 dark:hover:border-blue-400 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between gap-4"
                >
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                    {t('home.generate', 'Generate Free')} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Retail */}
        <section className="w-full py-24 px-6 relative z-20">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-6 mb-8">
                <div className="p-4 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-2xl shadow-xl shadow-rose-500/20">
                  <Building2 size={32} />
                </div>
                <h2 className="text-[clamp(1.6rem,4vw,2.5rem)] font-extrabold leading-[1.1]">
                  {t('static.usecases.retail', 'Retail & E-Commerce')}
                </h2>
              </div>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-8">
                {t('static.usecases.retailDesc', 'Generate product-specific barcodes or discount QR codes instantly at the POS without waiting on a slow network.')}
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="bg-white dark:bg-[#0a1128] p-10 rounded-[2rem] border border-slate-200 dark:border-[#1e2d4a] shadow-xl hover:-translate-y-2 transition-transform duration-500">
                <h4 className="text-xl font-extrabold mb-6 text-slate-800 dark:text-slate-200">{t('static.usecases.popularRetail', 'Popular Tools:')}</h4>
                <ul className="space-y-4">
                  <li><Link to={routeFor('barcode')} className="block px-6 py-4 bg-slate-50 dark:bg-[#0f172a] rounded-xl font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors">{t('static.usecases.toolBarcode', 'Barcode Generator')}</Link></li>
                  <li><Link to={routeFor('url')} className="block px-6 py-4 bg-slate-50 dark:bg-[#0f172a] rounded-xl font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors">{t('static.usecases.toolUrl', 'URL Link QR Code')}</Link></li>
                  <li><Link to={routeFor('sms')} className="block px-6 py-4 bg-slate-50 dark:bg-[#0f172a] rounded-xl font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors">{t('static.usecases.toolSms', 'SMS QR Code (Promos)')}</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Events & Ticketing */}
        <section className="w-full py-24 px-6 bg-white/50 dark:bg-[#060c1c]/50 backdrop-blur-xl border-y border-slate-200 dark:border-[#102040]">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="bg-white dark:bg-[#0a1128] p-10 rounded-[2rem] border border-slate-200 dark:border-[#1e2d4a] shadow-xl hover:-translate-y-2 transition-transform duration-500">
                <h4 className="text-xl font-extrabold mb-6 text-slate-800 dark:text-slate-200">{t('static.usecases.popularEvents', 'Popular Tools:')}</h4>
                <ul className="space-y-4">
                  <li><Link to={routeFor('event')} className="block px-6 py-4 bg-slate-50 dark:bg-[#0f172a] rounded-xl font-bold text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors">{t('static.usecases.toolEvent', 'Event QR Code')}</Link></li>
                  <li><Link to={routeFor('vcard')} className="block px-6 py-4 bg-slate-50 dark:bg-[#0f172a] rounded-xl font-bold text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors">{t('static.usecases.toolVcard', 'vCard / Contact QR')}</Link></li>
                  <li><Link to={routeFor('location')} className="block px-6 py-4 bg-slate-50 dark:bg-[#0f172a] rounded-xl font-bold text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors">{t('static.usecases.toolLocation', 'Google Maps QR')}</Link></li>
                </ul>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-6 mb-8">
                <div className="p-4 bg-orange-100 dark:bg-orange-900/30 text-orange-500 rounded-2xl shadow-xl shadow-orange-500/20">
                  <Users size={32} />
                </div>
                <h2 className="text-[clamp(1.6rem,4vw,2.5rem)] font-extrabold leading-[1.1]">
                  {t('static.usecases.events', 'Events & Ticketing')}
                </h2>
              </div>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {t('static.usecases.eventsDesc', 'Create vCard and Event QRs for badges that scan flawlessly across thousands of attendees.')}
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Restaurants */}
        <section className="w-full py-24 px-6 relative z-20">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-6 mb-8">
                <div className="p-4 bg-amber-100 dark:bg-amber-900/30 text-amber-500 rounded-2xl shadow-xl shadow-amber-500/20">
                  <Briefcase size={32} />
                </div>
                <h2 className="text-[clamp(1.6rem,4vw,2.5rem)] font-extrabold leading-[1.1]">
                  {t('static.usecases.restaurants', 'Restaurants')}
                </h2>
              </div>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-8">
                {t('static.usecases.restaurantsDesc', 'Generate beautiful, high-contrast WiFi and Menu PDFs that are perfectly scannable in low-light environments.')}
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="bg-white dark:bg-[#0a1128] p-10 rounded-[2rem] border border-slate-200 dark:border-[#1e2d4a] shadow-xl hover:-translate-y-2 transition-transform duration-500">
                <h4 className="text-xl font-extrabold mb-6 text-slate-800 dark:text-slate-200">{t('static.usecases.popularResto', 'Popular Tools:')}</h4>
                <ul className="space-y-4">
                  <li><Link to={routeFor('wifi')} className="block px-6 py-4 bg-slate-50 dark:bg-[#0f172a] rounded-xl font-bold text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors">{t('static.usecases.toolWifi', 'Wi-Fi QR Code')}</Link></li>
                  <li><Link to={routeFor('pdf')} className="block px-6 py-4 bg-slate-50 dark:bg-[#0f172a] rounded-xl font-bold text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors">{t('static.usecases.toolPdf', 'PDF Menu QR')}</Link></li>
                  <li><Link to={routeFor('greview')} className="block px-6 py-4 bg-slate-50 dark:bg-[#0f172a] rounded-xl font-bold text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors">{t('static.usecases.toolReview', 'Google Review QR')}</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Try it Out */}
        <section className="w-full py-32 px-6 bg-slate-950 text-white text-center border-t border-[#1e2d4a]">
          <div className="max-w-3xl mx-auto">
            <Lightbulb size={64} className="mx-auto mb-8 text-rose-400 animate-pulse" />
            <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold mb-8 leading-[1.1]">
              {t('static.usecases.ctaTitle', 'Find Your Own Use Case')}
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed mb-12 font-medium">
              {t('static.usecases.ctaDesc', 'No matter your industry, CreateMy-QR is the safest and fastest way to generate codes. Try our full suite of 37 tools today.')}
            </p>
            <Link to={langPrefix || '/'} className="inline-flex items-center gap-3 px-12 py-6 bg-white text-slate-900 hover:bg-slate-200 rounded-full font-extrabold text-xl transition-transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              <span>{t('landing.ctaButton', 'Use Tools Now')}</span>
              <ArrowRight size={24} />
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
