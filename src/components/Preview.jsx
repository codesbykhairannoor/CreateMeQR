import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Download, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Preview({ qrType, qrData, visuals, hasGenerated }) {
  const { t } = useTranslation();
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

  useEffect(() => {
    let dataString = '';

    if (qrType === 'url') {
      dataString = qrData.url || 'https://www.cratemy-qr.com';
    } else if (qrType === 'wifi') {
      const ssid = qrData.ssid || '';
      const pass = qrData.password || '';
      const enc = qrData.encryption || 'WPA';
      dataString = `WIFI:T:${enc};S:${ssid};P:${pass};;`;
    } else if (qrType === 'vcard') {
      const { firstName = '', lastName = '', phone = '', email = '' } = qrData;
      dataString = `BEGIN:VCARD\nVERSION:3.0\nN:${lastName};${firstName}\nFN:${firstName} ${lastName}\nTEL;TYPE=CELL:${phone}\nEMAIL;TYPE=WORK:${email}\nEND:VCARD`;
    } else if (qrType === 'text') {
      dataString = qrData.text || 'Hello World';
    } else if (qrType === 'email') {
      dataString = `MATMSG:TO:${qrData.emailTo || ''};SUB:${qrData.emailSubject || ''};BODY:${qrData.emailBody || ''};;`;
    } else if (qrType === 'phone') {
      dataString = `tel:${qrData.phoneNumber || ''}`;
    } else if (qrType === 'sms') {
      dataString = `smsto:${qrData.smsNumber || ''}:${qrData.smsMessage || ''}`;
    } else if (qrType === 'location') {
      dataString = `geo:${qrData.lat || '0'},${qrData.lng || '0'}`;
    } else if (qrType === 'event') {
      const formatTime = (t) => t ? t.replace(/[-:]/g, '') + '00Z' : '';
      dataString = `BEGIN:VEVENT\nSUMMARY:${qrData.eventTitle || ''}\nLOCATION:${qrData.eventLocation || ''}\nDTSTART:${formatTime(qrData.eventStart)}\nDTEND:${formatTime(qrData.eventEnd)}\nEND:VEVENT`;
    }

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
  }, [qrType, qrData, visuals, qrCode]);

  const onDownloadClick = (extension) => {
    qrCode.download({
      extension: extension
    });
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm p-8 flex flex-col items-center justify-center min-h-[500px]">
      
      {!hasGenerated ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <div className="w-48 h-48 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl flex items-center justify-center mb-6 bg-zinc-50 dark:bg-zinc-800/50">
            <QRCodeStylingPlaceholder />
          </div>
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Ready to Generate</h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-[200px]">
            Fill in your details on the left and click "Generate QR Code" to see your preview here.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-8 p-4 bg-white rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800" ref={ref} />
          
          <div className="flex w-full gap-3 mt-2">
            <button
              onClick={() => onDownloadClick('png')}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors font-semibold shadow-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              PNG
            </button>
            <button
              onClick={() => onDownloadClick('svg')}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-white text-zinc-700 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-medium shadow-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              SVG
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full mr-2">
              <Check className="w-3 h-3 mr-1" /> Client-side generated
            </span>
            No data sent to server
          </div>
        </>
      )}
    </div>
  );
}

function QRCodeStylingPlaceholder() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-zinc-400 dark:text-zinc-600">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M7 7h.01M18 7h.01M18 18h.01M7 18h.01" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
