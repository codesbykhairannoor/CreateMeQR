import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Download, Check, Clock, Printer, Sparkles, ShieldCheck, AlertTriangle, Box, FileCode2, Cpu } from 'lucide-react';
import { get, set } from 'idb-keyval';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { composeFramedCanvas, CTA_FRAMES } from '../utils/qrFrameRenderer';

const PrintStudioModal = React.lazy(() => import('./PrintStudioModal'));
const MockupStudioModal = React.lazy(() => import('./MockupStudioModal'));

export default function Preview({ qrType, qrData, visuals, hasGenerated }) {
  const { t } = useTranslation();
  const { user, isPro, freeTrialsRemaining, consumeProFeature } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isMockupModalOpen, setIsMockupModalOpen] = useState(false);
  const [currentCanvasUrl, setCurrentCanvasUrl] = useState('');
  const [scanAudit, setScanAudit] = useState(null); // { grade, contrast, wasmVerified, timeMs }
  const [qrCode] = useState(() => new QRCodeStyling({
    width: 300,
    height: 300,
    type: 'canvas',
    imageOptions: {
      crossOrigin: 'anonymous',
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

  // Worker updates QR matrix & triggers non-blocking WebAssembly ISO Scan Health Audit
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const worker = new Worker(new URL('../workers/data.worker.js', import.meta.url), { type: 'module' });
    let auditTimer = null;

    worker.onmessage = (e) => {
      if (e.data.success) {
        const dataString = e.data.dataString;

        setTimeout(async () => {
          await qrCode.update({
            data: dataString,
            dotsOptions: visuals.dotsOptions,
            backgroundOptions: visuals.backgroundOptions,
            image: visuals.image,
            imageOptions: visuals.imageOptions || { crossOrigin: 'anonymous', margin: 10 },
            qrOptions: visuals.qrOptions || { errorCorrectionLevel: 'Q' },
            cornersSquareOptions: visuals.cornersSquareOptions,
            cornersDotOptions: visuals.cornersDotOptions,
          });

          if (hasGenerated && ref.current) {
            clearTimeout(auditTimer);
            auditTimer = setTimeout(async () => {
              const canvas = ref.current?.querySelector('canvas');
              if (!canvas) return;
              try {
                const { auditCanvasScannability } = await import('../utils/zxingEngine');
                const fgColor = visuals.dotsOptions?.color || visuals.dotsOptions?.gradient?.colorStops?.[0]?.color || '#0a1930';
                const bgColor = visuals.backgroundOptions?.color || '#ffffff';
                const result = await auditCanvasScannability(canvas, fgColor, bgColor);
                setScanAudit(result);
              } catch {
                // Silent fail on audit if WASM blocked
              }
            }, 220);
          }
        }, 0);
      }
    };

    worker.postMessage({ qrType, qrData });

    return () => {
      clearTimeout(auditTimer);
      worker.terminate();
    };
  }, [qrType, qrData, visuals, qrCode, hasGenerated]);

  const frameStyle = visuals.frameOptions?.style || 'none';
  const frameText = visuals.frameOptions?.text || 'SCAN ME';
  const frameColor = visuals.frameOptions?.color || '#1d4ed8';
  const frameMeta = CTA_FRAMES.find(f => f.id === frameStyle);
  const isProFrameSelected = Boolean(frameMeta?.isPro);

  const getCompositeDataUrl = () => {
    if (!ref.current) return '';
    const canvas = ref.current.querySelector('canvas');
    if (!canvas) return '';
    if (frameStyle === 'none') {
      return canvas.toDataURL('image/png', 1.0);
    }
    const framed = composeFramedCanvas(canvas, visuals.frameOptions, visuals.backgroundOptions?.color || '#ffffff');
    return framed ? framed.toDataURL('image/png', 1.0) : canvas.toDataURL('image/png', 1.0);
  };

  // Generate clean temporary SVG-mode QRCodeStyling instance for lossless DXF & EPS export
  const getRawSvgText = async () => {
    const svgQr = new QRCodeStyling({
      width: 300,
      height: 300,
      type: 'svg',
      data: qrCode._options?.data || qrData?.url || qrData?.text || 'https://createmy-qr.com',
      dotsOptions: visuals.dotsOptions,
      backgroundOptions: visuals.backgroundOptions,
      image: visuals.image,
      imageOptions: visuals.imageOptions || { crossOrigin: 'anonymous', margin: 10 },
      qrOptions: visuals.qrOptions || { errorCorrectionLevel: 'Q' },
      cornersSquareOptions: visuals.cornersSquareOptions,
      cornersDotOptions: visuals.cornersDotOptions,
    });
    const blob = await svgQr.getRawData('svg');
    return await blob.text();
  };

  const onDownloadClick = async (extension) => {
    if (extension === 'svg') {
      if (!isPro) {
        const allowed = await consumeProFeature(t('proAlert.svgFeature', 'Vector SVG Export'));
        if (!allowed) return;
      }
      qrCode.download({ extension: 'svg' });
      return;
    }

    if (extension === 'dxf') {
      if (!isPro) {
        const allowed = await consumeProFeature(t('proAlert.dxfFeature', 'AutoCAD DXF Laser Cut Export'));
        if (!allowed) return;
      }
      const svgText = await getRawSvgText();
      const { svgToDxfString, triggerTextFileDownload } = await import('../utils/cadDxfExporter');
      const dxf = svgToDxfString(svgText, 100);
      triggerTextFileDownload(dxf, `createmyqr-${qrType}-100mm.dxf`, 'application/dxf');
      return;
    }

    if (extension === 'eps') {
      if (!isPro) {
        const allowed = await consumeProFeature(t('proAlert.epsFeature', 'Adobe Illustrator EPS Export'));
        if (!allowed) return;
      }
      const svgText = await getRawSvgText();
      const { svgToEpsString, triggerTextFileDownload } = await import('../utils/cadDxfExporter');
      const fgHex = visuals.dotsOptions?.color || visuals.dotsOptions?.gradient?.colorStops?.[0]?.color || '#0a1930';
      const bgHex = visuals.backgroundOptions?.color || '#ffffff';
      const eps = svgToEpsString(svgText, fgHex, bgHex);
      triggerTextFileDownload(eps, `createmyqr-${qrType}.eps`, 'application/postscript');
      return;
    }

    // PNG Download (Supports High-Res Framed Output)
    if (frameStyle !== 'none') {
      if (isProFrameSelected && !isPro) {
        const allowed = await consumeProFeature(t('proAlert.frameFeature', 'Custom CTA Frame Showcase Export'));
        if (!allowed) return;
      }
      const dataUrl = getCompositeDataUrl();
      if (dataUrl) {
        const link = document.createElement('a');
        link.download = `createmyqr-${qrType}-framed.png`;
        link.href = dataUrl;
        link.click();
        return;
      }
    }

    qrCode.download({ extension: 'png' });
  };

  const onSaveHistory = async () => {
    try {
      const history = (await get('qr-history-store')) || [];
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

      const newHistory = [newItem, ...history].slice(0, 10);
      await set('qr-history-store', newHistory);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (e) {
      console.error('Failed to save to history', e);
    }
  };

  // Visual Frame Wrapper classes for live HTML preview
  const renderLiveFramedQr = () => {
    const qrBg = visuals.backgroundOptions?.color || '#ffffff';
    const canvasNode = <div ref={ref} className="flex items-center justify-center [&>canvas]:max-w-full [&>canvas]:h-auto" />;

    if (frameStyle === 'bottom-pill') {
      return (
        <div className="p-4 pb-5 rounded-3xl shadow-sm border-[3px] flex flex-col items-center gap-3 transition-all" style={{ backgroundColor: qrBg, borderColor: frameColor }}>
          {canvasNode}
          <span className="px-5 py-1.5 rounded-full text-xs font-extrabold tracking-wider text-white shadow-sm" style={{ backgroundColor: frameColor }}>
            {frameText}
          </span>
        </div>
      );
    }
    if (frameStyle === 'top-banner') {
      return (
        <div className="rounded-3xl shadow-md overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col items-center transition-all" style={{ backgroundColor: qrBg }}>
          <div className="w-full py-2.5 px-4 text-center text-xs font-extrabold tracking-wider text-white" style={{ backgroundColor: frameColor }}>
            {frameText}
          </div>
          <div className="p-4">{canvasNode}</div>
        </div>
      );
    }
    if (frameStyle === 'polaroid') {
      return (
        <div className="p-4 pb-6 bg-white rounded-xl shadow-md border border-slate-200 flex flex-col items-center gap-3">
          <div className="p-2 border border-slate-200 rounded" style={{ backgroundColor: qrBg }}>
            {canvasNode}
          </div>
          <span className="text-sm font-extrabold tracking-wide" style={{ color: frameColor }}>
            {frameText}
          </span>
        </div>
      );
    }
    if (frameStyle === 'phone-stand') {
      return (
        <div className="p-4 pb-5 rounded-[28px] bg-slate-950 shadow-xl border border-slate-800 flex flex-col items-center gap-3.5">
          <div className="p-2.5 rounded-2xl" style={{ backgroundColor: qrBg }}>
            {canvasNode}
          </div>
          <span className="px-5 py-1.5 rounded-full text-xs font-extrabold tracking-wider text-white shadow-sm" style={{ backgroundColor: frameColor }}>
            {frameText}
          </span>
        </div>
      );
    }
    if (frameStyle === 'ticket') {
      return (
        <div className="p-4 rounded-2xl shadow-sm border-[3px] flex flex-col items-center transition-all" style={{ backgroundColor: qrBg, borderColor: frameColor }}>
          {canvasNode}
          <div className="w-full border-t-2 border-dashed my-3" style={{ borderColor: frameColor }} />
          <span className="text-xs font-extrabold tracking-widest uppercase" style={{ color: frameColor }}>
            {frameText}
          </span>
        </div>
      );
    }

    return (
      <div className="p-4 rounded-2xl shadow-sm border border-zinc-100 dark:border-slate-700" style={{ backgroundColor: qrBg }}>
        {canvasNode}
      </div>
    );
  };

  const trialBadgeText = user && freeTrialsRemaining > 0 ? `${freeTrialsRemaining} Free` : 'PRO';

  return (
    <div className="bg-white dark:bg-[#081226] border border-blue-100 dark:border-slate-700 rounded-3xl shadow-sm p-6 sm:p-8 flex flex-col items-center justify-center min-h-[500px] w-full">
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
          <div className="mb-4 flex justify-center w-full">
            {renderLiveFramedQr()}
          </div>

          {/* Real-Time WebAssembly ISO/IEC 15415 Scannability Health Badge */}
          {scanAudit && (
            <div className={`w-full mb-5 px-3.5 py-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${
              scanAudit.grade === 'A' || scanAudit.grade === 'B'
                ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300'
                : 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/50 text-amber-800 dark:text-amber-300'
            }`}>
              <div className="flex items-center gap-2 font-semibold">
                {scanAudit.wasmVerified ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                )}
                <span>
                  {scanAudit.wasmVerified
                    ? t('preview.isoGradePass', `ISO Grade ${scanAudit.grade} • Scannable (${scanAudit.timeMs}ms)`, { grade: scanAudit.grade, ms: scanAudit.timeMs })
                    : t('preview.isoGradeWarn', 'Low contrast or dense logo detected')}
                </span>
              </div>
              <span className="font-mono text-[11px] font-bold opacity-80 shrink-0">
                {scanAudit.contrast}:1
              </span>
            </div>
          )}

          {/* Row 1: Standard PNG & Vector SVG */}
          <div className="flex w-full gap-2.5">
            <button
              onClick={() => onDownloadClick('png')}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-[#040a18] text-white dark:bg-blue-50 dark:text-zinc-900 rounded-xl hover:bg-blue-900 dark:hover:bg-zinc-200 transition-colors font-semibold shadow-sm text-sm cursor-pointer"
            >
              <Download className="w-4 h-4 mr-1.5" />
              <span>PNG</span>
              {isProFrameSelected && !isPro && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded text-[9px] font-semibold bg-blue-500/25 text-blue-200 border border-blue-400/30 uppercase flex items-center gap-0.5">
                  <Sparkles size={8} /> {trialBadgeText}
                </span>
              )}
            </button>
            <button
              onClick={() => onDownloadClick('svg')}
              className="flex-1 flex items-center justify-center px-4 py-3 bg-white text-zinc-700 border border-blue-100 dark:bg-[#081226] dark:text-zinc-300 dark:border-zinc-700 rounded-xl hover:bg-[#f8fafc] dark:hover:bg-blue-900 transition-colors font-medium shadow-sm text-sm cursor-pointer"
            >
              <Download className="w-4 h-4 mr-1.5" />
              <span>SVG</span>
              {!isPro && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded text-[9.5px] font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 uppercase flex items-center gap-0.5">
                  <Sparkles size={9} /> {trialBadgeText}
                </span>
              )}
            </button>
          </div>

          {/* Row 2: CAD Fabrication (.DXF) & Print Press Vector (.EPS) */}
          <div className="flex w-full gap-2.5 mt-2.5">
            <button
              onClick={() => onDownloadClick('dxf')}
              className="flex-1 flex items-center justify-center px-3 py-2.5 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 hover:border-blue-400 rounded-xl transition-all font-semibold text-xs cursor-pointer"
              title={t('preview.dxfTitle', 'AutoCAD / LightBurn / Glowforge Laser Cut Vector')}
            >
              <Cpu className="w-3.5 h-3.5 mr-1.5 text-blue-600 dark:text-blue-400" />
              <span>{t('preview.dxfBtn', 'DXF (CAD)')}</span>
              {!isPro && (
                <span className="ml-1 px-1 py-0.2 rounded text-[8.5px] font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 uppercase flex items-center gap-0.5">
                  <Sparkles size={8} /> {trialBadgeText}
                </span>
              )}
            </button>
            <button
              onClick={() => onDownloadClick('eps')}
              className="flex-1 flex items-center justify-center px-3 py-2.5 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 hover:border-blue-400 rounded-xl transition-all font-semibold text-xs cursor-pointer"
              title={t('preview.epsTitle', 'Adobe Illustrator / Offset Print Press PostScript')}
            >
              <FileCode2 className="w-3.5 h-3.5 mr-1.5 text-indigo-600 dark:text-indigo-400" />
              <span>{t('preview.epsBtn', 'EPS Vector')}</span>
              {!isPro && (
                <span className="ml-1 px-1 py-0.2 rounded text-[8.5px] font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 uppercase flex items-center gap-0.5">
                  <Sparkles size={8} /> {trialBadgeText}
                </span>
              )}
            </button>
          </div>

          {/* Row 3: Print Studio & 3D Mockup Studio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2.5 w-full">
            <button
              onClick={() => {
                setCurrentCanvasUrl(getCompositeDataUrl());
                setIsPrintModalOpen(true);
              }}
              className="w-full flex items-center justify-center px-3 py-3 bg-blue-50/70 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 hover:bg-blue-100/80 dark:hover:bg-blue-900/40 rounded-xl transition-all font-semibold shadow-xs text-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 mr-1.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="truncate">{t('preview.printBtnShort', 'Print Sheet PDF')}</span>
              {!isPro && (
                <span className="ml-1 px-1 py-0.2 rounded text-[8.5px] font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 uppercase flex items-center gap-0.5 shrink-0">
                  <Sparkles size={8} /> {trialBadgeText}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setCurrentCanvasUrl(getCompositeDataUrl());
                setIsMockupModalOpen(true);
              }}
              className="w-full flex items-center justify-center px-3 py-3 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50 hover:from-indigo-100 hover:to-blue-100 rounded-xl transition-all font-semibold shadow-xs text-xs cursor-pointer"
            >
              <Box className="w-3.5 h-3.5 mr-1.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span className="truncate">{t('preview.mockupBtnShort', '3D Mockup Studio')}</span>
            </button>
          </div>

          <div className="mt-2.5 w-full">
            <button
              onClick={onSaveHistory}
              disabled={isSaved}
              className={`w-full flex items-center justify-center px-4 py-3 border rounded-xl transition-all font-semibold shadow-sm text-sm cursor-pointer ${isSaved
                ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
                : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/50 dark:hover:bg-blue-900/40'
                }`}
            >
              {isSaved ? <Check className="w-4 h-4 mr-2" /> : <Clock className="w-4 h-4 mr-2" />}
              {isSaved ? t('history.saved', 'Saved to history!') : t('history.saveBtn', 'Save to Browser History')}
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center text-xs font-medium text-zinc-600 dark:text-zinc-300">
            <span className="flex items-center text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full mr-2">
              <Check className="w-3 h-3 mr-1" /> {t('preview.clientSide')}
            </span>
            {t('preview.noServer')}
          </div>
        </>
      )}

      {/* Print Studio Modal */}
      {isPrintModalOpen && (
        <React.Suspense fallback={null}>
          <PrintStudioModal
            isOpen={isPrintModalOpen}
            onClose={() => setIsPrintModalOpen(false)}
            items={[
              {
                id: 1,
                value: qrData?.url || qrData?.text || 'https://createmy-qr.com',
                title: t(`types.${qrType}`) || 'CreateMy-QR',
                dataUrl: currentCanvasUrl,
                type: 'qr'
              }
            ]}
            defaultTitle={t(`types.${qrType}`) || 'QR Code'}
          />
        </React.Suspense>
      )}

      {/* 3D Real-World Mockup Studio Modal */}
      {isMockupModalOpen && (
        <React.Suspense fallback={null}>
          <MockupStudioModal
            isOpen={isMockupModalOpen}
            onClose={() => setIsMockupModalOpen(false)}
            qrCanvasUrl={currentCanvasUrl}
            defaultHeadline={frameText || 'SCAN ME'}
          />
        </React.Suspense>
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
