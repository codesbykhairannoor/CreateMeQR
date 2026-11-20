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

        <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-medium">
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
          <a
            href="https://discord.gg/NcWY6bcVdN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#5865F2] hover:text-[#4752C4] font-semibold transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            <span>Discord</span>
          </a>
        </div>

      </div>
    </footer>
  );
}
