import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import {
  ChevronDown,
  QrCode,
  ScanLine,
  Scan,
  Link,
  MessageCircle,
  Video,
  Camera,
  Users,
  Hash,
  Music2,
  Briefcase,
  Send,
  Ghost,
  Gamepad2,
  Music,
  CreditCard,
  Wallet,
  Smartphone,
  Bitcoin,
  Type,
  Mail,
  Phone,
  MessageSquare,
  Contact,
  MapPin,
  Calendar,
  Wifi,
  FileText,
  ClipboardList,
  Star,
  Image,
  List,
  Mic,
  ShoppingCart,
  CalendarDays,
  File,
  Sparkles,
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';
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

export default function MegaNav({ currentLangCode }) {
  const { t } = useTranslation();
  const location = useLocation();

  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const megaTimerRef = useRef(null);
  const scannerTimerRef = useRef(null);

  // Mouse hover handlers for Generators Mega Menu
  const handleMegaEnter = () => {
    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
    setIsMegaOpen(true);
    setIsScannerOpen(false);
  };

  const handleMegaLeave = () => {
    megaTimerRef.current = setTimeout(() => setIsMegaOpen(false), 140);
  };

  // Mouse hover handlers for Scanner Dropdown
  const handleScannerEnter = () => {
    if (scannerTimerRef.current) clearTimeout(scannerTimerRef.current);
    setIsScannerOpen(true);
    setIsMegaOpen(false);
  };

  const handleScannerLeave = () => {
    scannerTimerRef.current = setTimeout(() => setIsScannerOpen(false), 140);
  };

  const handleLinkClick = () => {
    setIsMegaOpen(false);
    setIsScannerOpen(false);
  };

  const langPrefix = currentLangCode === 'en' ? '' : `/${currentLangCode}`;

  const scanQrUrl = `${langPrefix}${localizedRoutes[currentLangCode]?.['scanqr'] || '/scan-qr'}`;
  const scanBarcodeUrl = `${langPrefix}${localizedRoutes[currentLangCode]?.['scanbarcode'] || '/scan-barcode'}`;
  const barcodeUrl = `${langPrefix}${localizedRoutes[currentLangCode]?.['barcode'] || '/barcode-generator'}`;
  const bulkUrl = `${langPrefix}${localizedRoutes[currentLangCode]?.['bulk'] || '/bulk-qr-generator'}`;
  const pricingUrl = `${langPrefix}${localizedRoutes[currentLangCode]?.['pricing'] || '/pricing'}`;

  const isScannerActive = location.pathname.includes('/scan-qr') || location.pathname.includes('/scan-barcode');
  const isPricingActive = location.pathname.includes('/pricing');
  const isGeneratorActive = !isScannerActive && !isPricingActive && (location.pathname === '/' || location.pathname === `/${currentLangCode}` || location.pathname.includes('/barcode') || location.pathname.includes('/bulk'));

  return (
    <div className="hidden lg:flex flex-1 justify-center items-center gap-2 lg:gap-3 min-w-0 px-2">
      
      {/* 1. Generators Dropdown (Mega Menu) */}
      <div 
        className="relative"
        onMouseEnter={handleMegaEnter}
        onMouseLeave={handleMegaLeave}
      >
        <button
          onClick={() => {
            setIsMegaOpen(!isMegaOpen);
            setIsScannerOpen(false);
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
            isMegaOpen || isGeneratorActive
              ? 'bg-blue-50/80 dark:bg-[#0c1831] text-blue-600 dark:text-blue-400'
              : 'text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-[#0c1831]'
          }`}
          aria-expanded={isMegaOpen}
        >
          <QrCode className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span>{t('nav.generators', 'Generators')}</span>
          <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${isMegaOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''}`} />
        </button>

        {/* Full-width fixed Dropdown */}
        <div 
          className={`fixed top-16 left-0 w-full bg-white dark:bg-[#081226] border-b border-blue-100 dark:border-[#102040] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.25)] transition-all duration-200 z-50 ${
            isMegaOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 py-6">
            {/* Featured Pro Tools Header Strip */}
            <div className="grid grid-cols-2 gap-4 pb-5 mb-5 border-b border-slate-100 dark:border-[#102040]">
              
              {/* Bulk Batch Generator */}
              <RouterLink
                to={bulkUrl}
                onClick={handleLinkClick}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-blue-50/60 dark:bg-[#0c1831] border border-blue-200/80 dark:border-[#1e2d4a] hover:border-blue-500 dark:hover:border-blue-400 transition-all group shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-700 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {t('nav.bulkTitle', 'Bulk QR & Barcode Generator')}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-blue-600 text-white shadow-xs">
                        PRO BATCH
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
                      {t('nav.bulkDesc', 'Import CSV or Excel, generate 1,000+ codes in memory & export ZIP')}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </RouterLink>

              {/* Barcode Maker */}
              <RouterLink
                to={barcodeUrl}
                onClick={handleLinkClick}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0c1831] border border-slate-200 dark:border-[#1e2d4a] hover:border-blue-500 dark:hover:border-blue-400 transition-all group shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-[#102040] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                    <ScanLine className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {t('nav.barcodeTitle', '1D Barcode Generator')}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        RETAIL & LOGISTICS
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
                      {t('nav.barcodeDesc', 'Code 128, EAN-13, UPC-A, ITF-14 vector barcode symbologies')}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </RouterLink>

            </div>

            {/* 4 Column QR Matrix */}
            <div className="grid grid-cols-4 gap-x-8">
              {QR_MENU_COLUMNS.map((column, colIdx) => (
                <div key={colIdx} className="flex flex-col">
                  {column.map((cat, catIdx) => (
                    <React.Fragment key={catIdx}>
                      <h4 className={`text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 ${catIdx > 0 ? 'mt-3.5' : ''}`}>
                        {t(cat.title)}
                      </h4>
                      <div className="flex flex-col gap-0.5">
                        {cat.items.map(item => {
                          const Icon = item.icon;
                          const path = item.id === 'url' ? '/' : `/${item.id}`;
                          const localizedPath = localizedRoutes[currentLangCode]?.[item.id] || path;
                          const finalUrl = `${langPrefix}${localizedPath}`;
                          const isActive = location.pathname === finalUrl || (location.pathname === '/' && finalUrl === `/${currentLangCode}`);
                          
                          return (
                            <RouterLink 
                              key={item.id} 
                              to={finalUrl} 
                              onClick={handleLinkClick} 
                              className={`flex items-center gap-2.5 py-1.5 px-2.5 rounded-xl transition-colors group/item ${
                                isActive 
                                  ? 'bg-blue-50 dark:bg-[#102040] text-blue-700 dark:text-blue-400 font-semibold' 
                                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#102040] hover:text-blue-700 dark:hover:text-blue-400'
                              }`}
                            >
                              <Icon className={`w-4 h-4 ${isActive ? 'opacity-100 text-blue-600 dark:text-blue-400' : 'opacity-65 group-hover/item:opacity-100'}`} />
                              <span className="text-[13px] font-medium tracking-normal">{item.label}</span>
                            </RouterLink>
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

      {/* 2. Scanner Dropdown */}
      <div 
        className="relative"
        onMouseEnter={handleScannerEnter}
        onMouseLeave={handleScannerLeave}
      >
        <button
          onClick={() => {
            setIsScannerOpen(!isScannerOpen);
            setIsMegaOpen(false);
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
            isScannerOpen || isScannerActive
              ? 'bg-blue-50/80 dark:bg-[#0c1831] text-blue-600 dark:text-blue-400'
              : 'text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-[#0c1831]'
          }`}
          aria-expanded={isScannerOpen}
        >
          <ScanLine className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{t('nav.scanner', 'Scanner')}</span>
          <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${isScannerOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''}`} />
        </button>

        {/* Floating compact card directly under Scanner button */}
        {isScannerOpen && (
          <div 
            className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-fade-in-up"
            onMouseEnter={handleScannerEnter}
            onMouseLeave={handleScannerLeave}
          >
            <div className="w-76 bg-white dark:bg-[#081226] border border-slate-200 dark:border-[#102040] rounded-2xl shadow-2xl p-2.5 flex flex-col gap-1.5">
              
              {/* Scan QR Code */}
              <RouterLink
                to={scanQrUrl}
                onClick={handleLinkClick}
                className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors group ${
                  location.pathname.includes('/scan-qr')
                    ? 'bg-blue-50 dark:bg-[#102040]'
                    : 'hover:bg-slate-50 dark:hover:bg-[#102040]'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {t('nav.scanqr', 'Scan QR Code')}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                    {t('nav.scanQrDesc', 'Camera scanner & image decoder')}
                  </div>
                </div>
              </RouterLink>

              {/* Scan Barcode */}
              <RouterLink
                to={scanBarcodeUrl}
                onClick={handleLinkClick}
                className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors group ${
                  location.pathname.includes('/scan-barcode')
                    ? 'bg-emerald-50 dark:bg-emerald-950/40'
                    : 'hover:bg-slate-50 dark:hover:bg-[#102040]'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                  <Scan className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {t('nav.scanbarcode', 'Scan Barcode')}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                    {t('nav.scanBarcodeDesc', 'UPC, EAN, Code 128 laser reader')}
                  </div>
                </div>
              </RouterLink>

            </div>
          </div>
        )}
      </div>

      {/* 3. Pricing (Direct Link) */}
      <RouterLink
        to={pricingUrl}
        className={`py-2 px-3.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
          isPricingActive
            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
            : 'text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-[#0c1831]'
        }`}
      >
        <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />
        <span>{t('nav.pricing', 'Pricing')}</span>
      </RouterLink>

    </div>
  );
}