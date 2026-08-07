import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Clock, Trash2, ShieldCheck, Check } from 'lucide-react';
import { get, set } from 'idb-keyval';
import { useNavigate } from 'react-router-dom';
import { localizedRoutes } from '../config/localizedRoutes';

export default function HistoryDrawer({ isOpen, onClose, currentLangCode }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadHistory();
      setCleared(false);
    }
  }, [isOpen]);

  const loadHistory = async () => {
    setIsLoading(true);
    try {
      const data = await get('qr-history-store');
      setHistory(data || []);
    } catch (e) {
      console.error('Failed to load history', e);
    }
    setIsLoading(false);
  };

  const clearHistory = async () => {
    try {
      await set('qr-history-store', []);
      setHistory([]);
      setCleared(true);
      setTimeout(() => setCleared(false), 2000);
    } catch (e) {
      console.error('Failed to clear history', e);
    }
  };

  const handleRestore = (item) => {
    onClose();
    sessionStorage.setItem('restore_qr_data', JSON.stringify(item));
    window.dispatchEvent(new CustomEvent('restore-qr-history'));
    
    const localizedSlug = localizedRoutes[currentLangCode]?.[item.qrType] || '/';
    const newPrefix = currentLangCode === 'en' ? '' : `/${currentLangCode}`;
    navigate(`${newPrefix}${localizedSlug === '/' ? '' : localizedSlug}`);
  };

  const getQrDataPreview = (item) => {
    const { qrType, qrData } = item;
    if (!qrData) return '';
    try {
      switch (qrType) {
        case 'url': return qrData.url || '';
        case 'wifi': return qrData.ssid ? `SSID: ${qrData.ssid}` : '';
        case 'vcard': return `${qrData.firstName || ''} ${qrData.lastName || ''}`.trim() || 'Contact';
        case 'email': return qrData.emailTo || '';
        case 'phone': return qrData.phoneNumber || '';
        case 'sms': return qrData.smsNumber || '';
        case 'whatsapp': return qrData.waNumber || '';
        case 'youtube': return qrData.youtubeUrl || '';
        case 'instagram': return qrData.igUsername ? `@${qrData.igUsername.replace(/^@/, '')}` : '';
        case 'twitter': return qrData.twitterInput ? `@${qrData.twitterInput.replace(/^@/, '')}` : '';
        case 'tiktok': return qrData.tiktokInput ? `@${qrData.tiktokInput.replace(/^@/, '')}` : '';
        case 'facebook': return qrData.facebookInput || '';
        case 'text': return qrData.text ? (qrData.text.length > 25 ? qrData.text.substring(0, 25) + '...' : qrData.text) : '';
        case 'location': return qrData.lat && qrData.lng ? `${qrData.lat}, ${qrData.lng}` : '';
        case 'event': return qrData.eventTitle || '';
        case 'crypto': return qrData.cryptoAddress || '';
        case 'paypal': return qrData.paypalUsername || '';
        case 'barcode': return `${qrData.format || 'Barcode'}: ${qrData.value || ''}`;
        default: 
          const firstVal = Object.values(qrData).find(v => typeof v === 'string' && v.length > 0);
          return firstVal ? (firstVal.length > 25 ? firstVal.substring(0, 25) + '...' : firstVal) : '';
      }
    } catch (e) {
      return '';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-zinc-900/40 dark:bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-[#081226] z-[101] shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              {t('history.title', 'Local History')}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border-b border-blue-100 dark:border-blue-900/30 flex gap-3 items-start">
          <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed font-medium">
            {t('history.disclaimer', 'Your QR codes are saved locally on this device and are never sent to our servers.')}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex justify-center py-10"><div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>
          ) : history.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center">
              <Clock className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mb-4" />
              <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                {t('history.empty', 'No QR codes saved yet.')}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {history.map((item) => (
                <div key={item.id} className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800 flex items-center gap-4 group">
                  <div className="w-16 h-16 bg-white dark:bg-black rounded-xl p-1 shadow-sm shrink-0 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden">
                    {item.thumbnail ? (
                      <img src={item.thumbnail} alt="QR Code" className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full bg-zinc-200 dark:bg-zinc-700 rounded-lg animate-pulse" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-white truncate">
                      {t(`types.${item.qrType}`, item.qrType.toUpperCase())}
                    </h3>
                    {getQrDataPreview(item) && (
                      <p className="text-[12px] font-medium text-blue-600 dark:text-blue-400 mt-0.5 truncate">
                        {getQrDataPreview(item)}
                      </p>
                    )}
                    <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1">
                      {new Date(item.timestamp).toLocaleString(currentLangCode)}
                    </p>
                  </div>

                  <button 
                    onClick={() => handleRestore(item)}
                    className="shrink-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                  >
                    {t('history.loadBtn', 'Restore')}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Clear Button */}
        {history.length > 0 && (
          <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-white dark:bg-[#081226]">
            <button 
              onClick={clearHistory}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                cleared 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/10 dark:text-red-400 dark:hover:bg-red-900/20'
              }`}
            >
              {cleared ? <Check className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
              {cleared ? t('history.cleared', 'Cleared!') : t('history.clear', 'Clear History')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
