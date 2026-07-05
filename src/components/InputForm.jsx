import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Wifi, Contact, Type, Mail, Phone, MessageSquare, MapPin, Calendar } from 'lucide-react';

const TABS = [
  { id: 'url', icon: Link, label: 'types.url' },
  { id: 'text', icon: Type, label: 'types.text' },
  { id: 'email', icon: Mail, label: 'types.email' },
  { id: 'phone', icon: Phone, label: 'types.phone' },
  { id: 'sms', icon: MessageSquare, label: 'types.sms' },
  { id: 'vcard', icon: Contact, label: 'types.vcard' },
  { id: 'location', icon: MapPin, label: 'types.location' },
  { id: 'event', icon: Calendar, label: 'types.event' },
  { id: 'wifi', icon: Wifi, label: 'types.wifi' },
];

export default function InputForm({ qrType, setQrType, qrData, setQrData, hasGenerated, setHasGenerated, setActiveTab }) {
  const { t } = useTranslation();

  const handleTypeChange = (type) => {
    setQrType(type);
    // Reset data when switching types for simplicity in MVP
    setQrData({});
    setHasGenerated(false);
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setQrData(prev => ({ ...prev, [name]: value }));
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
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = qrType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTypeChange(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap
                ${isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600'
                }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {t(tab.label)}
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {qrType === 'url' && (
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-200">
              {t('types.url')}
            </label>
            <input
              type="url"
              name="url"
              value={qrData.url || ''}
              onChange={handleDataChange}
              placeholder={t('form.enterUrl')}
              className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1a1a] focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
            />
          </div>
        )}

        {qrType === 'wifi' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-200">{t('form.networkName')}</label>
              <input
                type="text"
                name="ssid"
                value={qrData.ssid || ''}
                onChange={handleDataChange}
                className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1a1a] focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-200">{t('form.password')}</label>
                <input
                  type="password"
                  name="password"
                  value={qrData.password || ''}
                  onChange={handleDataChange}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1a1a] focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-200">{t('form.encryption')}</label>
                <select
                  name="encryption"
                  value={qrData.encryption || 'WPA'}
                  onChange={handleDataChange}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1a1a] focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                >
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">None</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {qrType === 'vcard' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-200">{t('form.firstName')}</label>
                <input type="text" name="firstName" value={qrData.firstName || ''} onChange={handleDataChange} className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1a1a] focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-200">{t('form.lastName')}</label>
                <input type="text" name="lastName" value={qrData.lastName || ''} onChange={handleDataChange} className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1a1a] focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-200">{t('form.phone')}</label>
              <input type="tel" name="phone" value={qrData.phone || ''} onChange={handleDataChange} className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1a1a] focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-200">{t('form.email')}</label>
              <input type="email" name="email" value={qrData.email || ''} onChange={handleDataChange} className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1a1a] focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
            </div>
          </div>
        )}

        {qrType === 'text' && (
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-200">{t('types.text')}</label>
            <textarea
              name="text"
              value={qrData.text || ''}
              onChange={handleDataChange}
              placeholder={t('form.textPlaceholder')}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1a1a] focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
            />
          </div>
        )}

        {qrType === 'email' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-200">{t('form.emailTo')}</label>
              <input type="email" name="emailTo" value={qrData.emailTo || ''} onChange={handleDataChange} className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1a1a] focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-200">{t('form.emailSubject')}</label>
              <input type="text" name="emailSubject" value={qrData.emailSubject || ''} onChange={handleDataChange} className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1a1a] focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-200">{t('form.emailBody')}</label>
              <textarea name="emailBody" value={qrData.emailBody || ''} onChange={handleDataChange} rows={3} className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1a1a] focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
            </div>
          </div>
        )}

        {qrType === 'phone' && (
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-200">{t('form.phone')}</label>
            <input type="tel" name="phoneNumber" value={qrData.phoneNumber || ''} onChange={handleDataChange} className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1a1a] focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
          </div>
        )}

        {qrType === 'sms' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-200">{t('form.phone')}</label>
              <input type="tel" name="smsNumber" value={qrData.smsNumber || ''} onChange={handleDataChange} className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1a1a] focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-200">{t('form.smsMessage')}</label>
              <textarea name="smsMessage" value={qrData.smsMessage || ''} onChange={handleDataChange} rows={3} className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1a1a] focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
            </div>
          </div>
        )}

        {qrType === 'location' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-200">{t('form.lat')}</label>
              <input type="text" name="lat" placeholder="e.g. -6.2088" value={qrData.lat || ''} onChange={handleDataChange} className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1a1a] focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-200">{t('form.lng')}</label>
              <input type="text" name="lng" placeholder="e.g. 106.8456" value={qrData.lng || ''} onChange={handleDataChange} className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1a1a] focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
            </div>
          </div>
        )}

        {qrType === 'event' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-200">{t('form.eventTitle')}</label>
              <input type="text" name="eventTitle" value={qrData.eventTitle || ''} onChange={handleDataChange} className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1a1a] focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-200">{t('form.eventLocation')}</label>
              <input type="text" name="eventLocation" value={qrData.eventLocation || ''} onChange={handleDataChange} className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1a1a] focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-200">{t('form.eventStart')}</label>
                <input type="datetime-local" name="eventStart" value={qrData.eventStart || ''} onChange={handleDataChange} className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1a1a] focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-zinc-800 dark:text-zinc-200">{t('form.eventEnd')}</label>
                <input type="datetime-local" name="eventEnd" value={qrData.eventEnd || ''} onChange={handleDataChange} className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1a1a1a] focus:ring-2 focus:ring-blue-500 outline-none dark:text-white" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-700">
        <button
          onClick={handleGenerate}
          className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-sm text-lg"
        >
          {hasGenerated ? t('tabs.update') : t('tabs.generate')}
        </button>
      </div>
    </div>
  );
}
