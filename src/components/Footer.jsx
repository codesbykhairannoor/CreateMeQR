import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { LANGS } from '../config/site';

export default function Footer() {
  const { t } = useTranslation();
  const location = useLocation();
  
  const decodedPath = decodeURIComponent(location.pathname);
  const pathParts = decodedPath.split('/').filter(Boolean);
  let currentLangCode = 'en';
  if (pathParts.length > 0 && LANGS.some(l => l.code === pathParts[0])) {
    currentLangCode = pathParts[0];
  }
  const prefix = currentLangCode === 'en' ? '' : `/${currentLangCode}`;

  return (
    <footer className="bg-white dark:bg-[#081226] border-t border-slate-200 dark:border-[#102040] py-12 mt-24">
      <div className="max-w-7xl mx-auto px-6 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
            <img src="/logoqr.png" alt="CreateMy-QR Logo" className="w-8 h-8 rounded-xl object-contain shadow-sm" />
            <span className="text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              CreateMy-<span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-blue-700 dark:from-blue-300 dark:to-blue-600">QR</span>
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} CreateMyQR. {t('tagline') || 'Free QR Code Generator'}
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link to={`${prefix}/about`} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {t('info.nav.about', 'About Us')}
          </Link>
          <Link to={`${prefix}/privacy`} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {t('info.nav.privacy', 'Privacy Policy')}
          </Link>
          <Link to={`${prefix}/terms`} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {t('info.nav.terms', 'Terms of Service')}
          </Link>
          <Link to={`${prefix}/compare`} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {t('info.nav.compare', 'Compare')}
          </Link>
        </div>

      </div>
    </footer>
  );
}
