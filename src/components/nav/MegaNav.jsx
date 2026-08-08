import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { ChevronDown, QrCode, ScanLine, Scan, Building2, Link, MessageCircle, Video, Camera, Users, Hash, Music2, Briefcase, Send, Ghost, Gamepad2, Music, CreditCard, Wallet, Smartphone, Bitcoin, Type, Mail, Phone, MessageSquare, Contact, MapPin, Calendar, Wifi, FileText, ClipboardList, Star, Image, List, Mic, ShoppingCart, CalendarDays, File, Clock } from 'lucide-react';
import { localizedRoutes } from '../../config/localizedRoutes';

export const QR_MENU_COLUMNS = [
  // Column 1
  [
    {
      title: 'nav.catSocial',
      items: [
        { id: 'instagram', icon: Camera, label: 'Instagram' },
        { id: 'facebook', icon: Users, label: 'Facebook' },
        { id: 'twitter', icon: Hash, label: 'X (Twitter)' },
        { id: 'tiktok', icon: Music2, label: 'TikTok' },
        { id: 'linkedin', icon: Briefcase, label: 'LinkedIn' },
        { id: 'snapchat', icon: Ghost, label: 'Snapchat' }
      ]
    },
    {
      title: 'nav.catMessage',
      items: [
        { id: 'whatsapp', icon: MessageCircle, label: 'WhatsApp' },
        { id: 'telegram', icon: Send, label: 'Telegram' },
        { id: 'discord', icon: Gamepad2, label: 'Discord' }
      ]
    }
  ],
  // Column 2
  [
    {
      title: 'nav.catWeb',
      items: [
        { id: 'url', icon: Link, label: 'URL / Link' },
        { id: 'gforms', icon: ClipboardList, label: 'Google Forms' },
        { id: 'greview', icon: Star, label: 'Google Review' },
        { id: 'linkinbio', icon: List, label: 'Link in Bio' }
      ]
    },
    {
      title: 'nav.catContact',
      items: [
        { id: 'vcard', icon: Contact, label: 'vCard' },
        { id: 'email', icon: Mail, label: 'Email' },
        { id: 'phone', icon: Phone, label: 'Phone' },
        { id: 'sms', icon: MessageSquare, label: 'SMS' }
      ]
    }
  ],
  // Column 3
  [
    {
      title: 'nav.catFinance',
      items: [
        { id: 'paypal', icon: CreditCard, label: 'PayPal' },
        { id: 'venmo', icon: Wallet, label: 'Venmo' },
        { id: 'crypto', icon: Bitcoin, label: 'Crypto' },
        { id: 'appstore', icon: Smartphone, label: 'App Store' },
        { id: 'amazon', icon: ShoppingCart, label: 'Amazon' }
      ]
    },
    {
      title: 'nav.catPlaces',
      items: [
        { id: 'location', icon: MapPin, label: 'Location' },
        { id: 'event', icon: Calendar, label: 'Event' },
        { id: 'booking', icon: CalendarDays, label: 'Booking' }
      ]
    }
  ],
  // Column 4
  [
    {
      title: 'nav.catMedia',
      items: [
        { id: 'youtube', icon: Video, label: 'YouTube' },
        { id: 'spotify', icon: Music, label: 'Spotify' },
        { id: 'image', icon: Image, label: 'Image' },
        { id: 'video', icon: Video, label: 'Video' },
        { id: 'audio', icon: Mic, label: 'Audio' }
      ]
    },
    {
      title: 'nav.catData',
      items: [
        { id: 'pdf', icon: FileText, label: 'PDF' },
        { id: 'file', icon: File, label: 'File' },
        { id: 'text', icon: Type, label: 'Text' },
        { id: 'wifi', icon: Wifi, label: 'Wi-Fi' }
      ]
    }
  ]
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
  const location = useLocation();

  return (
    <div className="hidden lg:flex flex-1 justify-center items-center gap-6">
      
      {/* 1. Scan QR (Static Link) */}
      <a href={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedRoutes[currentLangCode]?.['scanqr'] || '/scan-qr'}`} className={`py-2 px-3 rounded-lg text-[11px] font-bold tracking-wide uppercase whitespace-nowrap transition-all ${location.pathname.includes('/scan-qr') ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400'}`}>
        {t('nav.scanqr', 'Scan QR')}
      </a>

      {/* 2. Scan Barcode (Static Link) */}
      <a href={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedRoutes[currentLangCode]?.['scanbarcode'] || '/scan-barcode'}`} className={`py-2 px-3 rounded-lg text-[11px] font-bold tracking-wide uppercase whitespace-nowrap transition-all ${location.pathname.includes('/scan-barcode') ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400'}`}>
        {t('nav.scanbarcode', 'Scan Barcode')}
      </a>

      {/* 3. Barcode Maker (Static Link) */}
      <a href={`${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedRoutes[currentLangCode]?.['barcode'] || '/barcode-generator'}`} className={`py-2 px-3 rounded-lg text-[11px] font-bold tracking-wide uppercase whitespace-nowrap transition-all ${location.pathname.includes('/barcode') ? 'text-purple-600 dark:text-purple-400' : 'text-zinc-700 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400'}`}>
        {t('nav.barcode', 'Barcode Maker')}
      </a>

      {/* 4. Generate QR (Mega Menu Button) */}
      <div className="relative group">
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-800 hover:from-slate-800 hover:to-blue-600 text-white text-[11px] font-bold tracking-wide uppercase whitespace-nowrap transition-all shadow-md hover:shadow-lg">
          <QrCode className="w-4 h-4" />
          {t('nav.generator', 'ALL QR TOOLS')}
          <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
        </button>
        {/* Full-width fixed Dropdown */}
        <div className="fixed top-16 left-0 w-full bg-white dark:bg-[#081226] border-b border-blue-100 dark:border-[#102040] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.25)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-4 gap-x-8">
            {QR_MENU_COLUMNS.map((column, colIdx) => (
              <div key={colIdx} className="flex flex-col">
                {column.map((cat, catIdx) => (
                  <React.Fragment key={catIdx}>
                    <h4 className={`text-[11px] font-extrabold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3 ${catIdx > 0 ? 'mt-4' : ''}`}>{t(cat.title)}</h4>
                    <div className="flex flex-col gap-1">
                      {cat.items.map(item => {
                        const Icon = item.icon;
                        const path = item.id === 'url' ? '/' : `/${item.id}`;
                        const localizedPath = localizedRoutes[currentLangCode]?.[item.id] || path;
                        const finalUrl = `${currentLangCode === 'en' ? '' : '/' + currentLangCode}${localizedPath}`;
                        const isActive = location.pathname === finalUrl || (location.pathname === '/' && finalUrl === `/${currentLangCode}`);
                        
                        return (
                          <a key={item.id} href={finalUrl} className={`flex items-center gap-3 py-2 px-3 rounded-xl transition-colors group/item ${isActive ? 'bg-slate-100 dark:bg-[#102040] text-blue-700 dark:text-blue-400' : 'text-zinc-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-[#102040] hover:text-blue-700 dark:hover:text-blue-400'}`}>
                            <Icon className={`w-[18px] h-[18px] ${isActive ? 'opacity-100' : 'opacity-70 group-hover/item:opacity-100'}`} />
                            <span className="text-[15px] font-bold">{item.label}</span>
                          </a>
                        );
                      })}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
