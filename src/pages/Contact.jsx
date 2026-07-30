import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, MapPin, MessageSquare } from 'lucide-react';

export default function Contact() {
  const { t } = useTranslation();
  
  // Note: Since we don't have dedicated translations for the Contact page yet,
  // we will use generic English fallbacks for the structural text, but the page 
  // will exist and not throw 404s/duplicates.
  
  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12 md:py-20 animate-fade-in-up">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">
          Contact Us
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Have questions about our free QR code generator? Need help with an integration? 
          Our support team is here to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-[#081226] border border-blue-100 dark:border-[#102040] p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all group flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Email Support</h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm">
            We aim to respond to all inquiries within 24 hours.
          </p>
          <a href="mailto:support@createmy-qr.com" className="mt-auto font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            support@createmy-qr.com
          </a>
        </div>

        <div className="bg-white dark:bg-[#081226] border border-blue-100 dark:border-[#102040] p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all group flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <MessageSquare className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Community</h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm">
            Join our developer community on GitHub to report bugs or request features.
          </p>
          <a href="https://github.com/codesbykhairannoor/CreateMeQR/issues" target="_blank" rel="noopener noreferrer" className="mt-auto font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
            Open an Issue
          </a>
        </div>

        <div className="bg-white dark:bg-[#081226] border border-blue-100 dark:border-[#102040] p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all group flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">HQ</h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-sm">
            CreateMy-QR Technologies<br/>
            Global Remote Team
          </p>
          <span className="mt-auto font-semibold text-purple-600 dark:text-purple-400">
            Available 24/7
          </span>
        </div>
      </div>
    </div>
  );
}
