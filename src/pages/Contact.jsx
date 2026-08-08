import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Mail, MapPin, MessageSquare } from 'lucide-react';

export default function Contact() {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#040814] font-sans overflow-hidden">
      <Helmet>
        <title>{t('contact.title', 'Contact Us')} - CreateMyQR</title>
        <meta name="description" content={t('contact.desc', 'Get in touch with the CreateMyQR team.')} />
      </Helmet>

      <section className="relative pt-32 pb-24 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-full h-[500px] bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter dark:text-white tracking-tighter mb-6 leading-[1.05]">
            {t('contact.title', 'Contact Us')}
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            {t('contact.desc', 'We\'d love to hear from you. Here\'s how you can reach us.')}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-[#0a1128] border border-slate-200/60 dark:border-[#1e2d4a] p-10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 group flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <Mail className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold tracking-tighter dark:text-white mb-4">{t('contact.email_support', 'Email Support')}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg font-medium leading-relaxed">
              {t('contact.email_desc', 'For general inquiries and support, drop us an email.')}
            </p>
            <a href="mailto:support@createmy-qr.com" className="mt-auto font-bold text-blue-600 dark:text-blue-400 hover:underline text-lg">
              support@createmy-qr.com
            </a>
          </div>

          <div className="bg-white dark:bg-[#0a1128] border border-slate-200/60 dark:border-[#1e2d4a] p-10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 group flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/30 rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <MessageSquare className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold tracking-tighter dark:text-white mb-4">{t('contact.community', 'Community')}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg font-medium leading-relaxed">
              {t('contact.community_desc', 'Have a feature request or found a bug? Join the discussion.')}
            </p>
            <a href="https://github.com/codesbykhairannoor/CreateMeQR/issues" target="_blank" rel="noopener noreferrer" className="mt-auto font-bold text-emerald-600 dark:text-emerald-400 hover:underline text-lg">
              {t('contact.open_issue', 'Open an Issue')}
            </a>
          </div>

          <div className="bg-white dark:bg-[#0a1128] border border-slate-200/60 dark:border-[#1e2d4a] p-10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 group flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-purple-50 dark:bg-purple-900/30 rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <MapPin className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold tracking-tighter dark:text-white mb-4">{t('contact.hq', 'Headquarters')}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg font-medium leading-relaxed">
              {t('contact.hq_desc', 'Our remote team spans across the globe, working asynchronously.')}
            </p>
            <span className="mt-auto font-bold text-purple-600 dark:text-purple-400 text-lg">
              {t('contact.availability', '24/7 Availability')}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
