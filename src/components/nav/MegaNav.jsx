import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, QrCode, ScanLine, Scan, Building2, Link, MessageCircle, Video, Camera, Users, Hash, Music2, Briefcase, Send, Ghost, Gamepad2, Music, CreditCard, Wallet, Smartphone, Bitcoin, Type, Mail, Phone, MessageSquare, Contact, MapPin, Calendar, Wifi, FileText, ClipboardList, Star, Image, List, Mic, ShoppingCart, CalendarDays, File, Clock } from 'lucide-react';
import { localizedRoutes } from '../../config/localizedRoutes';

export const QR_CATEGORIES = [
  {
    title: 'nav.catSocial',
    items: [
      { id: 'whatsapp', icon: MessageCircle, label: 'WhatsApp' },
      { id: 'youtube', icon: Video, label: 'YouTube' },
      { id: 'instagram', icon: Camera, label: 'Instagram' },
      { id: 'facebook', icon: Users, label: 'Facebook' },
      { id: 'twitter', icon: Hash, label: 'X (Twitter)' },
      { id: 'tiktok', icon: Music2, label: 'TikTok' },
      { id: 'linkedin', icon: Briefcase, label: 'LinkedIn' },
      { id: 'snapchat', icon: Ghost, label: 'Snapchat' },
      { id: 'telegram', icon: Send, label: 'Telegram' },
      { id: 'discord', icon: Gamepad2, label: 'Discord' }
    ]
  },
  {
    title: 'nav.catBusiness',
    items: [
      { id: 'url', icon: Link, label: 'URL / Link' },
      { id: 'vcard', icon: Contact, label: 'vCard' },
      { id: 'email', icon: Mail, label: 'Email' },
      { id: 'phone', icon: Phone, label: 'Phone' },
      { id: 'sms', icon: MessageSquare, label: 'SMS' },
      { id: 'location', icon: MapPin, label: 'Location' },
      { id: 'event', icon: Calendar, label: 'Event' },
      { id: 'gforms', icon: ClipboardList, label: 'Google Forms' },
      { id: 'greview', icon: Star, label: 'Google Review' },
      { id: 'linkinbio', icon: List, label: 'Link in Bio' }
    ]
  },
  {
    title: 'nav.catFinance',
    items: [
      { id: 'paypal', icon: CreditCard, label: 'PayPal' },
      { id: 'venmo', icon: Wallet, label: 'Venmo' },
      { id: 'crypto', icon: Bitcoin, label: 'Crypto' },
      { id: 'appstore', icon: Smartphone, label: 'App Store' },
      { id: 'amazon', icon: ShoppingCart, label: 'Amazon' },
      { id: 'booking', icon: CalendarDays, label: 'Booking' }
    ]
  },
  {
    title: 'nav.catFiles',
    items: [
      { id: 'pdf', icon: FileText, label: 'PDF' },
      { id: 'image', icon: Image, label: 'Image' },
      { id: 'video', icon: Video, label: 'Video' },
      { id: 'audio', icon: Mic, label: 'Audio' },
      { id: 'file', icon: File, label: 'File' },
      { id: 'text', icon: Type, label: 'Text' },
      { id: 'wifi', icon: Wifi, label: 'Wi-Fi' },
      { id: 'spotify', icon: Music, label: 'Spotify' }
    ]
  }
];

export const BARCODE_CATEGORIES = [
  {
    title: 'nav.catRetail',
    items: ['UPC', 'EAN13', 'EAN8', 'pharmacode']
  },
  {
    title: 'nav.catIndustrial',
    items: ['CODE128', 'CODE39', 'ITF14', 'MSI', 'codabar']
  }
];

export default function MegaNav({ currentLangCode, onOpenHistory }) {
  const { t } = useTranslation();

  return (
    <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
      
      {/* 1. Generate QR (Mega Menu) */}
      <div className="relative group">
        <button className="flex items-center gap-1.5 py-2 text-[15px] font-bold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <QrCode className="w-4 h-4" />
          {t('nav.generator', 'Generate QR')}
          <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
        </button>
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <div className="bg-white dark:bg-[#081226] rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border border-blue-100 dark:border-[#102040] overflow-hidden p-6 w-[800px] grid grid-cols-4 gap-6">
            {QR_CATEGORIES.map((cat, i) => (
              <div key={i} className="flex flex-col">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">{t(cat.title)}</h4>
                <div className="flex flex-col gap-1">
                  {cat.items.map(item => {
                    const Icon = item.icon;
                    const path = item.id === 'url' ? '/' : `/${item.id}`;
                    const localizedPath = localizedRoutes[currentLangCode]?.[item.id] || path;
                    const finalUrl = `${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedPath}`;
                    
                    return (
                      <a key={item.id} href={finalUrl} className="flex items-center gap-3 p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-[#102040] transition-colors group/item text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400">
                        <Icon className="w-4 h-4 opacity-70 group-hover/item:opacity-100" />
                        <span className="text-[13px] font-bold">{item.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Scan QR */}
      <a href={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedRoutes[currentLangCode]?.['scanqr'] || '/scan-qr'}`} className="flex items-center gap-1.5 py-2 text-[15px] font-bold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
        <Scan className="w-4 h-4" />
        {t('nav.scan', 'Scan QR')}
      </a>

      {/* 3. Barcode Maker (Mega Menu) */}
      <div className="relative group">
        <button className="flex items-center gap-1.5 py-2 text-[15px] font-bold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <ScanLine className="w-4 h-4" />
          {t('nav.barcode', 'Barcode Maker')}
          <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
        </button>
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <div className="bg-white dark:bg-[#081226] rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border border-blue-100 dark:border-[#102040] overflow-hidden p-6 w-[400px] grid grid-cols-2 gap-6">
            {BARCODE_CATEGORIES.map((cat, i) => (
              <div key={i} className="flex flex-col">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">{t(cat.title)}</h4>
                <div className="flex flex-col gap-1">
                  {cat.items.map(format => {
                    const barcodePath = localizedRoutes[currentLangCode]?.['barcode'] || '/barcode-generator';
                    const finalUrl = `${currentLangCode === 'en' ? '' : '/' + currentLangCode}${barcodePath}?format=${format}`;
                    return (
                      <a key={format} href={finalUrl} className="flex items-center gap-3 p-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                        <span className="text-[13px] font-bold font-mono">{format}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Company (Dropdown) */}
      <div className="relative group">
        <button className="flex items-center gap-1.5 py-2 text-[15px] font-bold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <Building2 className="w-4 h-4" />
          {t('nav.company', 'Company')}
          <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
        </button>
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <div className="bg-white dark:bg-[#081226] rounded-3xl shadow-[0_30px_80px_-15px_rgba(0,0,0,0.3)] border border-blue-100 dark:border-[#102040] overflow-hidden p-2 w-[200px] flex flex-col">
            <a href={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}/about`} className="px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-[#102040] text-[14px] font-bold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors">{t('nav.about', 'About Us')}</a>
            <a href={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}/compare`} className="px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-[#102040] text-[14px] font-bold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors">{t('nav.compare', 'Compare')}</a>
            <a href={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}/privacy`} className="px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-[#102040] text-[14px] font-bold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors">{t('nav.privacy', 'Privacy Policy')}</a>
            <a href={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}/terms`} className="px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-[#102040] text-[14px] font-bold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors">{t('nav.terms', 'Terms of Service')}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
