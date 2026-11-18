import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Wifi, Contact, Type, Mail, Phone, MessageSquare, MapPin, Calendar, MessageCircle, Video, Camera, Bitcoin, Smartphone, Users, Hash, Music2, Briefcase, Send, Ghost, Gamepad2, Music, CreditCard, Wallet, FileText, ClipboardList, Star, Image, List, Mic, ShoppingCart, CalendarDays, File, ShieldCheck, Info } from 'lucide-react';

const TABS = [
  { id: 'url', icon: Link, label: 'types.url' },
  { id: 'whatsapp', icon: MessageCircle, label: 'types.whatsapp' },
  { id: 'youtube', icon: Video, label: 'types.youtube' },
  { id: 'instagram', icon: Camera, label: 'types.instagram' },
  { id: 'facebook', icon: Users, label: 'types.facebook' },
  { id: 'twitter', icon: Hash, label: 'types.twitter' },
  { id: 'tiktok', icon: Music2, label: 'types.tiktok' },
  { id: 'linkedin', icon: Briefcase, label: 'types.linkedin' },
  { id: 'telegram', icon: Send, label: 'types.telegram' },
  { id: 'snapchat', icon: Ghost, label: 'types.snapchat' },
  { id: 'discord', icon: Gamepad2, label: 'types.discord' },
  { id: 'spotify', icon: Music, label: 'types.spotify' },
  { id: 'paypal', icon: CreditCard, label: 'types.paypal' },
  { id: 'venmo', icon: Wallet, label: 'types.venmo' },
  { id: 'appstore', icon: Smartphone, label: 'types.appstore' },
  { id: 'crypto', icon: Bitcoin, label: 'types.crypto' },
  { id: 'text', icon: Type, label: 'types.text' },
  { id: 'email', icon: Mail, label: 'types.email' },
  { id: 'phone', icon: Phone, label: 'types.phone' },
  { id: 'sms', icon: MessageSquare, label: 'types.sms' },
  { id: 'vcard', icon: Contact, label: 'types.vcard' },
  { id: 'location', icon: MapPin, label: 'types.location' },
  { id: 'event', icon: Calendar, label: 'types.event' },
    { id: 'wifi', icon: Wifi, label: 'types.wifi' },
  { id: 'pdf', icon: FileText, label: 'types.pdf' },
  { id: 'gforms', icon: ClipboardList, label: 'types.gforms' },
  { id: 'greview', icon: Star, label: 'types.greview' },
  { id: 'image', icon: Image, label: 'types.image' },
  { id: 'linkinbio', icon: List, label: 'types.linkinbio' },
  { id: 'video', icon: Video, label: 'types.video' },
  { id: 'audio', icon: Mic, label: 'types.audio' },
  { id: 'amazon', icon: ShoppingCart, label: 'types.amazon' },
  { id: 'booking', icon: CalendarDays, label: 'types.booking' },
  { id: 'file', icon: File, label: 'types.file' },
];

export default function InputForm({ qrType, setQrType, qrData, setQrData, hasGenerated, setHasGenerated, setActiveTab }) {
  const { t } = useTranslation();
  const [showAllTools, setShowAllTools] = React.useState(false);
  
  const keywordString = t('seoKeywords', { returnObjects: true });
  const keywordArray = typeof keywordString === 'string' ? keywordString.split(',').map(k => k.trim()) : [];
  const topKeywords = keywordArray.slice(0, 5).join(', ');

  const handleTypeChange = (type) => {
    setQrType(type);
    // Reset data when switching types for simplicity in MVP
    setQrData({});
    setHasGenerated(false);
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setQrData(prev => {
      const updated = { ...prev, [name]: value };
      if (['url', 'pdf', 'gforms', 'greview', 'image', 'linkinbio', 'video', 'audio', 'amazon', 'booking', 'file'].includes(qrType)) {
        updated.url = value;
        updated[`${qrType}Input`] = value;
      }
      return updated;
    });
    setHasGenerated(false);
  };

  const handleGenerate = () => {
    setHasGenerated(true);
    if (setActiveTab) {
      setActiveTab('design');
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* App Drawer / Smart Grid UI */}
      <div className="mb-8">
        {showAllTools ? (
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 flex items-center">
                All 34 Tools
              </h3>
              <button onClick={() => setShowAllTools(false)} className="text-slate-500 hover:text-slate-900 dark:hover:text-white px-4 py-1.5 rounded-full text-sm font-semibold bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:shadow-sm transition-all">Close</button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {TABS.map(tab => {
                const Icon = tab.icon;
                const isActive = qrType === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => { handleTypeChange(tab.id); setShowAllTools(false); }}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all
                      ${isActive 
                        ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md border border-transparent' 
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-slate-600'
                      }`}
                  >
                    <Icon className={`w-6 h-6 mb-2 ${isActive ? 'text-white' : 'text-blue-500 dark:text-blue-400'}`} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-[11px] font-semibold text-center leading-tight">{t(tab.label)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {(() => {
              const defaultPopular = ['url', 'pdf', 'wifi', 'image', 'whatsapp', 'vcard', 'instagram'];
              let visibleIds = [...defaultPopular];
              
              if (!visibleIds.includes(qrType)) {
                visibleIds[6] = qrType; // Replace the last item with the active tool
              }

              return visibleIds.map(id => {
                const tab = TABS.find(t => t.id === id);
                if (!tab) return null;
                const Icon = tab.icon;
                const isActive = qrType === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTypeChange(tab.id)}
                    className={`flex items-center px-4 py-2.5 rounded-full text-sm font-semibold transition-all
                      ${isActive 
                        ? 'bg-slate-900 text-white dark:bg-blue-600 shadow-md border border-transparent' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'
                      }`}
                  >
                    <Icon className={`w-4 h-4 mr-2 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} strokeWidth={2.5} />
                    {t(tab.label)}
                  </button>
                );
              });
            })()}
            
            <button
              onClick={() => setShowAllTools(true)}
              className="flex items-center px-4 py-2.5 rounded-full text-sm font-semibold transition-all bg-blue-50 text-blue-700 hover:bg-blue-100 hover:shadow-sm dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 border border-blue-100 dark:border-blue-800/30"
            >
              + 27 Tools
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {['url', 'pdf', 'gforms', 'greview', 'image', 'linkinbio', 'video', 'audio', 'amazon', 'booking', 'file'].includes(qrType) && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
                {t(`form.${qrType}Input`, t(`types.${qrType}`))}
              </label>
              {['pdf', 'file', 'image', 'audio', 'video'].includes(qrType) && (
                <span className="text-[11px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/40 px-2.5 py-0.5 rounded-full border border-blue-200/80 dark:border-blue-700/50 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  {t('formHints.zeroServerTitle', '100% Privacy & Lifetime Validity')}
                </span>
              )}
            </div>
            <input
              type="url"
              name="url"
              value={qrData.url || qrData[`${qrType}Input`] || ''}
              onChange={handleDataChange}
              placeholder={t(`form.enter_${qrType}`, t('form.enterUrl', 'https://...'))}
              className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-700 outline-none transition-all dark:text-white text-sm"
            />
            {t(`formHints.${qrType}`) && (
              <div className={`mt-2.5 p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                ['pdf', 'file', 'image', 'audio', 'video'].includes(qrType)
                  ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-200/60 dark:border-blue-800/40 text-slate-600 dark:text-slate-300'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-700/50 text-slate-500 dark:text-slate-400'
              }`}>
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {t(`formHints.${qrType}`)}
                </p>
              </div>
            )}
          </div>
        )}

        {qrType === 'wifi' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.networkName')}</label>
              <input
                type="text"
                name="ssid"
                value={qrData.ssid || ''}
                onChange={handleDataChange}
                placeholder="MyHomeWiFi"
                className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.password')}</label>
                <input
                  type="password"
                  name="password"
                  value={qrData.password || ''}
                  onChange={handleDataChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.encryption')}</label>
                <select
                  name="encryption"
                  value={qrData.encryption || 'WPA'}
                  onChange={handleDataChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white text-sm"
                >
                  <option value="WPA">WPA/WPA2/WPA3</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None (Open Network)</option>
                </select>
              </div>
            </div>
            {t('formHints.wifi') && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{t('formHints.wifi')}</span>
              </p>
            )}
          </div>
        )}

        {['facebook', 'twitter', 'tiktok', 'linkedin', 'telegram', 'snapchat', 'discord', 'spotify', 'venmo'].includes(qrType) && (
          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">
              {t(`form.${qrType}Input`)}
            </label>
            <input
              type="text"
              name={`${qrType}Input`}
              value={qrData[`${qrType}Input`] || ''}
              onChange={handleDataChange}
              placeholder={t(`form.enter_${qrType}`)}
              className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white text-sm"
            />
            {t(`formHints.${qrType}`) && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{t(`formHints.${qrType}`)}</span>
              </p>
            )}
          </div>
        )}

        {qrType === 'paypal' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.paypalUsername')}</label>
              <input type="text" name="paypalUsername" value={qrData.paypalUsername || ''} onChange={handleDataChange} placeholder="yourusername" className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.paypalAmount')}</label>
              <input type="number" name="paypalAmount" value={qrData.paypalAmount || ''} onChange={handleDataChange} placeholder="0.00" className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white text-sm" />
            </div>
            {t('formHints.paypal') && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{t('formHints.paypal')}</span>
              </p>
            )}
          </div>
        )}

        {qrType === 'vcard' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.firstName')}</label>
                <input type="text" name="firstName" value={qrData.firstName || ''} onChange={handleDataChange} placeholder="John" className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.lastName')}</label>
                <input type="text" name="lastName" value={qrData.lastName || ''} onChange={handleDataChange} placeholder="Doe" className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.phone')}</label>
              <input type="tel" name="phone" value={qrData.phone || ''} onChange={handleDataChange} placeholder="+1 234 567 8900" className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.email')}</label>
              <input type="email" name="email" value={qrData.email || ''} onChange={handleDataChange} placeholder="john@example.com" className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
            </div>
            {t('formHints.vcard') && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{t('formHints.vcard')}</span>
              </p>
            )}
          </div>
        )}

        {qrType === 'text' && (
          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('types.text')}</label>
            <textarea
              name="text"
              value={qrData.text || ''}
              onChange={handleDataChange}
              placeholder={t('form.textPlaceholder')}
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white text-sm"
            />
            {t('formHints.text') && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{t('formHints.text')}</span>
              </p>
            )}
          </div>
        )}

        {qrType === 'email' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.emailTo')}</label>
              <input type="email" name="emailTo" value={qrData.emailTo || ''} onChange={handleDataChange} placeholder="contact@business.com" className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.emailSubject')}</label>
              <input type="text" name="emailSubject" value={qrData.emailSubject || ''} onChange={handleDataChange} placeholder="Inquiry about services" className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.emailBody')}</label>
              <textarea name="emailBody" value={qrData.emailBody || ''} onChange={handleDataChange} placeholder="Hello, I would like to get in touch..." rows={3} className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
            </div>
            {t('formHints.email') && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{t('formHints.email')}</span>
              </p>
            )}
          </div>
        )}

        {qrType === 'phone' && (
          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.phone')}</label>
            <input type="tel" name="phoneNumber" value={qrData.phoneNumber || ''} onChange={handleDataChange} placeholder="+1 234 567 8900" className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
            {t('formHints.phone') && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{t('formHints.phone')}</span>
              </p>
            )}
          </div>
        )}

        {qrType === 'sms' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.phone')}</label>
              <input type="tel" name="smsNumber" value={qrData.smsNumber || ''} onChange={handleDataChange} placeholder="+1 234 567 8900" className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.smsMessage')}</label>
              <textarea name="smsMessage" value={qrData.smsMessage || ''} onChange={handleDataChange} placeholder="Pre-filled SMS text..." rows={3} className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
            </div>
            {t('formHints.sms') && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{t('formHints.sms')}</span>
              </p>
            )}
          </div>
        )}

        {qrType === 'location' && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.lat')}</label>
                <input type="text" name="lat" placeholder="e.g. -6.2088" value={qrData.lat || ''} onChange={handleDataChange} className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.lng')}</label>
                <input type="text" name="lng" placeholder="e.g. 106.8456" value={qrData.lng || ''} onChange={handleDataChange} className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
              </div>
            </div>
            {t('formHints.location') && (
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{t('formHints.location')}</span>
              </p>
            )}
          </div>
        )}

        {qrType === 'event' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.eventTitle')}</label>
              <input type="text" name="eventTitle" value={qrData.eventTitle || ''} onChange={handleDataChange} placeholder="Grand Opening Party" className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.eventLocation')}</label>
              <input type="text" name="eventLocation" value={qrData.eventLocation || ''} onChange={handleDataChange} placeholder="123 Main St, New York" className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.eventStart')}</label>
                <input type="datetime-local" name="eventStart" value={qrData.eventStart || ''} onChange={handleDataChange} className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.eventEnd')}</label>
                <input type="datetime-local" name="eventEnd" value={qrData.eventEnd || ''} onChange={handleDataChange} className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
              </div>
            </div>
            {t('formHints.event') && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{t('formHints.event')}</span>
              </p>
            )}
          </div>
        )}

        {qrType === 'whatsapp' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.waNumber')}</label>
              <input type="tel" name="waNumber" placeholder={t('form.enter_whatsapp', '6281234567890')} value={qrData.waNumber || ''} onChange={handleDataChange} className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
              {t('formHints.whatsapp') && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>{t('formHints.whatsapp')}</span>
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.waMessage')}</label>
              <textarea name="waMessage" value={qrData.waMessage || ''} onChange={handleDataChange} placeholder="Hello, I would like to ask about..." rows={3} className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
            </div>
          </div>
        )}

        {qrType === 'youtube' && (
          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.youtubeUrl')}</label>
            <input type="url" name="youtubeUrl" placeholder={t('form.enter_youtube', 'https://youtube.com/watch?v=...')} value={qrData.youtubeUrl || qrData.url || ''} onChange={handleDataChange} className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
            {t('formHints.youtube') && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{t('formHints.youtube')}</span>
              </p>
            )}
          </div>
        )}

        {qrType === 'instagram' && (
          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.igUsername')}</label>
            <input type="text" name="igUsername" placeholder={t('form.enter_instagram', '@username')} value={qrData.igUsername || ''} onChange={handleDataChange} className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
            {t('formHints.instagram') && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{t('formHints.instagram')}</span>
              </p>
            )}
          </div>
        )}

        {qrType === 'appstore' && (
          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.appStoreUrl')}</label>
            <input type="url" name="appStoreUrl" placeholder={t('form.enter_appstore', 'https://apps.apple.com/...')} value={qrData.appStoreUrl || qrData.url || ''} onChange={handleDataChange} className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
            {t('formHints.appstore') && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{t('formHints.appstore')}</span>
              </p>
            )}
          </div>
        )}

        {qrType === 'crypto' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.cryptoCoin')}</label>
              <select name="cryptoCoin" value={qrData.cryptoCoin || 'bitcoin'} onChange={handleDataChange} className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm">
                <option value="bitcoin">Bitcoin (BTC)</option>
                <option value="ethereum">Ethereum (ETH)</option>
                <option value="bitcoincash">Bitcoin Cash (BCH)</option>
                <option value="litecoin">Litecoin (LTC)</option>
                <option value="dash">Dash</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.cryptoAddress')}</label>
              <input type="text" name="cryptoAddress" value={qrData.cryptoAddress || ''} onChange={handleDataChange} placeholder="e.g. 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-slate-800 dark:text-slate-100">{t('form.cryptoAmount')}</label>
              <input type="number" step="any" name="cryptoAmount" value={qrData.cryptoAmount || ''} onChange={handleDataChange} placeholder="0.00" className="w-full px-4 py-2.5 rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white text-sm" />
            </div>
            {t('formHints.crypto') && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>{t('formHints.crypto')}</span>
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-700">
        <button
          onClick={handleGenerate}
          className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-br from-slate-900 to-blue-700 dark:from-[#020617] dark:to-blue-600 text-white rounded-xl hover:from-slate-800 hover:to-blue-600 dark:hover:from-[#0f172a] dark:hover:to-blue-500 transition-colors font-semibold shadow-sm text-lg"
        >
          {hasGenerated ? t('tabs.update') : t('tabs.generate')}
        </button>
      </div>
    </div>
  );
}
