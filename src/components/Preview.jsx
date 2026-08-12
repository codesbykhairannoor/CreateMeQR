import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Download, Check, Clock } from 'lucide-react';
import { get, set } from 'idb-keyval';
import { useTranslation } from 'react-i18next';

export default function Preview({ qrType, qrData, visuals, hasGenerated }) {
  const { t } = useTranslation();
  const [isSaved, setIsSaved] = useState(false);
  const [qrCode] = useState(new QRCodeStyling({
    width: 300,
    height: 300,
    type: 'canvas',
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 10
    }
  }));
  const ref = useRef(null);

  useEffect(() => {
    if (hasGenerated && ref.current) {
      ref.current.innerHTML = '';
      qrCode.append(ref.current);
    }
  }, [hasGenerated, qrCode]);

  // Use worker for heavy string parsing (INP optimization)
  useEffect(() => {
    const worker = new Worker(new URL('../workers/data.worker.js', import.meta.url), { type: 'module' });
    
    worker.onmessage = (e) => {
      if (e.data.success) {
        const dataString = e.data.dataString;
        
        // Defer the heavy DOM canvas drawing to yield the main thread (INP fix)
        setTimeout(() => {
          qrCode.update({
            data: dataString,
            dotsOptions: visuals.dotsOptions,
            backgroundOptions: visuals.backgroundOptions,
            image: visuals.image,
            imageOptions: visuals.imageOptions || { crossOrigin: "anonymous", margin: 10 },
            qrOptions: visuals.qrOptions || { errorCorrectionLevel: 'Q' },
            cornersSquareOptions: visuals.cornersSquareOptions,
            cornersDotOptions: visuals.cornersDotOptions,
          });
        }, 0);
      }
    };

    worker.postMessage({ qrType, qrData });

    return () => worker.terminate();
  }, [qrType, qrData, visuals, qrCode]);

  const onDownloadClick = (extension) => {
    qrCode.download({
      extension: extension
    });
  };

  const onSaveHistory = async () => {
    try {
      const history = await get('qr-history-store') || [];
      let thumbnail = '';
      if (ref.current) {
        const canvas = ref.current.querySelector('canvas');
        if (canvas) {
          thumbnail = canvas.toDataURL('image/png', 0.2);
        }
      }
      
      const newItem = {
        id: Date.now(),
        qrType,
        qrData,
        visuals,
        timestamp: new Date().toISOString(),
        thumbnail
      };
      
      // Limit to 10
      const newHistory = [newItem, ...history].slice(0, 10);
      await set('qr-history-store', newHistory);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (e) {
      console.error('Failed to save to history', e);
    }
  };

  return (
    <div className="bg-white dark:bg-[#081226] border border-blue-100 dark:border-slate-700 rounded-3xl shadow-sm p-8 flex flex-col items-center justify-center min-h-[500px]">
      
      {!hasGenerated ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <div className="w-48 h-48 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl flex items-center justify-center mb-6 bg-[#f8fafc] dark:bg-blue-900/50">
            <QRCodeStylingPlaceholder />
          </div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{t('preview.readyTitle')}</h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-sm max-w-[200px]">
            {t('preview.readyDesc')}
          </p>
        </div>
      ) : (
        <>
          <div className="mb-8 p-4 bg-white rounded-2xl shadow-sm border border-zinc-100 dark:border-slate-700" ref={ref} />
          
          <div className="flex w-full gap-3 mt-2">
            <button
              onClick={() => onDownloadClick('png')}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-[#040a18] text-white dark:bg-blue-50 dark:text-zinc-900 rounded-xl hover:bg-blue-900 dark:hover:bg-zinc-200 transition-colors font-semibold shadow-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              PNG
            </button>
            <button
              onClick={() => onDownloadClick('svg')}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-white text-zinc-700 border border-blue-100 dark:bg-[#081226] dark:text-zinc-300 dark:border-zinc-700 rounded-xl hover:bg-[#f8fafc] dark:hover:bg-blue-900 transition-colors font-medium shadow-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              SVG
            </button>
          </div>

          <div className="mt-4 w-full">
            <button
              onClick={onSaveHistory}
              disabled={isSaved}
              className={`w-full flex items-center justify-center px-4 py-3 border rounded-xl transition-all font-semibold shadow-sm text-sm ${
                isSaved 
                  ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
                  : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/50 dark:hover:bg-blue-900/40'
              }`}
            >
              {isSaved ? <Check className="w-4 h-4 mr-2" /> : <Clock className="w-4 h-4 mr-2" />}
              {isSaved ? t('history.saved', 'Saved to history!') : t('history.saveBtn', 'Save to Browser History')}
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center text-xs font-medium text-zinc-600 dark:text-zinc-300">
            <span className="flex items-center text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full mr-2">
              <Check className="w-3 h-3 mr-1" /> {t('preview.clientSide')}
            </span>
            {t('preview.noServer')}
          </div>
        </>
      )}
    </div>
  );
}

function QRCodeStylingPlaceholder() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-zinc-300 dark:text-zinc-600">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M7 7h.01M18 7h.01M18 18h.01M7 18h.01" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
