import React, { useState, useRef, useEffect, useDeferredValue } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import Barcode from 'react-barcode';
import { Download, Printer, ScanLine, Settings2, BarChart2, Hash, Layers, CheckCircle2, Factory, PackageOpen, Clock, Check, Gauge, Sparkles, Cpu, AlertCircle } from 'lucide-react';
import { get, set } from 'idb-keyval';
const PrintStudioModal = React.lazy(() => import('../components/PrintStudioModal'));

const RETAIL_1D_FORMATS = [
  { id: 'CODE128', label: 'CODE128 (Versatile Alphanumeric)', sample: '123456789012', engine: 'jsbarcode', isPro: false },
  { id: 'UPC', label: 'UPC-A (North American Retail - 12 digits)', sample: '012345678905', engine: 'jsbarcode', isPro: false },
  { id: 'EAN13', label: 'EAN-13 (Global Retail - 13 digits)', sample: '5901234123457', engine: 'jsbarcode', isPro: false },
  { id: 'EAN8', label: 'EAN-8 (Small Packages - 8 digits)', sample: '96385074', engine: 'jsbarcode', isPro: false },
  { id: 'ITF14', label: 'ITF-14 (Shipping Cartons - 14 digits)', sample: '10012345678902', engine: 'jsbarcode', isPro: false },
  { id: 'CODE39', label: 'CODE39 (Automotive & Defense)', sample: 'AUTO-2026-X1', engine: 'jsbarcode', isPro: false },
  { id: 'pharmacode', label: 'Pharmacode (Pharmaceutical)', sample: '1234', engine: 'jsbarcode', isPro: false }
];

const ENTERPRISE_BWIP_FORMATS = [
  { id: 'datamatrix', label: 'Data Matrix ECC 200 (Pharma / PCB / Aerospace)', sample: 'SN-2026-DM948201', engine: 'bwip', isPro: true },
  { id: 'pdf417', label: 'PDF417 (National IDs, Passports, Boarding Passes)', sample: 'ID:94820-USA-PASSENGER-FIRST', engine: 'bwip', isPro: true },
  { id: 'azteccode', label: 'Aztec Code (Airline & High-Speed Rail Tickets)', sample: 'TKT-INTL-88412-GATE-B4', engine: 'bwip', isPro: true },
  { id: 'gs1-128', label: 'GS1-128 (Global Supply Chain Logistics)', sample: '(01)09501101530003(17)271231(10)BATCH99', engine: 'bwip', isPro: true },
  { id: 'gs1datamatrix', label: 'GS1 DataMatrix (EU/FDA Medical UDI)', sample: '(01)04012345678901(21)XYZ123456', engine: 'bwip', isPro: true },
  { id: 'maxicode', label: 'MaxiCode (UPS / Express Courier Parcel)', sample: '[)>RS01GS96152382802GS840GS001', engine: 'bwip', isPro: true },
  { id: 'isbn', label: 'ISBN-13 (Book Publishing Industry)', sample: '978-0-306-40615-7', engine: 'bwip', isPro: true },
  { id: 'issn', label: 'ISSN (Periodicals & Magazines)', sample: '0378-5955', engine: 'bwip', isPro: true },
  { id: 'sscc18', label: 'SSCC-18 (Pallet Container Shipping)', sample: '003700012345678908', engine: 'bwip', isPro: true },
  { id: 'hibcdatamatrix', label: 'HIBC Data Matrix (Healthcare Devices)', sample: '+A123PROD4567/$$82026', engine: 'bwip', isPro: true },
  { id: 'code93', label: 'Code 93 (High-Density Logistics)', sample: 'LOGISTICS-93', engine: 'bwip', isPro: true },
  { id: 'rationalizedCodabar', label: 'Codabar (Blood Banks & Libraries)', sample: 'A40156B', engine: 'bwip', isPro: true },
  { id: 'micropdf417', label: 'MicroPDF417 (Compact ID & Logistics)', sample: 'MPDF-417-UNIT-88', engine: 'bwip', isPro: true }
];

const ALL_FORMATS = [...RETAIL_1D_FORMATS, ...ENTERPRISE_BWIP_FORMATS];

export default function BarcodeGenerator() {
  const { t } = useTranslation();
  const { user, isPro, freeTrialsRemaining, consumeProFeature } = useAuth();

  // Barcode states (clean empty state by default)
  const [value, setValue] = useState('');
  const [format, setFormat] = useState('CODE128');
  const [lineColor, setLineColor] = useState('#000000');
  const [background, setBackground] = useState('#ffffff');
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(100);
  const [displayValue, setDisplayValue] = useState(true);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [currentBarcodeDataUrl, setCurrentBarcodeDataUrl] = useState('');
  const [bwipSvg, setBwipSvg] = useState('');
  const [bwipError, setBwipError] = useState('');

  // Defer heavy renders for INP optimization
  const deferredValue = useDeferredValue(value);
  const deferredFormat = useDeferredValue(format);
  const deferredLineColor = useDeferredValue(lineColor);
  const deferredBackground = useDeferredValue(background);
  const deferredWidth = useDeferredValue(width);
  const deferredHeight = useDeferredValue(height);
  const deferredDisplayValue = useDeferredValue(displayValue);

  const barcodeRef = useRef(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
  const [isSaved, setIsSaved] = useState(false);

  const activeFormatMeta = ALL_FORMATS.find(f => f.id === deferredFormat) || RETAIL_1D_FORMATS[0];
  const isBwipEngine = activeFormatMeta.engine === 'bwip';
  const trialBadgeText = user && freeTrialsRemaining > 0 ? `${freeTrialsRemaining} Free` : 'PRO';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleRestore = () => {
      const savedStr = sessionStorage.getItem('restore_qr_data');
      if (savedStr) {
        try {
          const item = JSON.parse(savedStr);
          if (item.qrType === 'barcode') {
            setValue(item.qrData.value);
            setFormat(item.qrData.format);
            setLineColor(item.qrData.lineColor);
            setBackground(item.qrData.background);
            setWidth(item.qrData.width);
            setHeight(item.qrData.height);
            setDisplayValue(item.qrData.displayValue);
            sessionStorage.removeItem('restore_qr_data');
          }
        } catch (e) {
          console.error(e);
        }
      }
    };

    window.addEventListener('restore-qr-history', handleRestore);
    handleRestore();

    return () => window.removeEventListener('restore-qr-history', handleRestore);
  }, []);

  // Dynamically load & render via bwip-js/browser when an Enterprise 2D/Industrial standard has content
  useEffect(() => {
    if (!isBwipEngine || !deferredValue || typeof window === 'undefined') {
      setBwipSvg('');
      setBwipError('');
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const bwipjs = await import('bwip-js/browser');
        const mod = bwipjs.default || bwipjs;
        const cleanBarColor = (deferredLineColor || '#000000').replace('#', '');
        const cleanBgColor = (deferredBackground || '#ffffff').replace('#', '');

        const svgStr = mod.toSVG({
          bcid: deferredFormat,
          text: deferredValue,
          scale: Math.max(2, deferredWidth + 1),
          height: Math.max(12, Math.round(deferredHeight / 4)),
          includetext: deferredDisplayValue,
          textxalign: 'center',
          barcolor: cleanBarColor,
          backgroundcolor: cleanBgColor,
          paddingwidth: 8,
          paddingheight: 8
        });

        if (!cancelled) {
          setBwipSvg(svgStr);
          setBwipError('');
        }
      } catch (err) {
        if (!cancelled) {
          setBwipSvg('');
          setBwipError(err?.message || 'Input value invalid for this barcode standard.');
        }
      }
    })();

    return () => { cancelled = true; };
  }, [isBwipEngine, deferredFormat, deferredValue, deferredLineColor, deferredBackground, deferredWidth, deferredHeight, deferredDisplayValue]);

  const handleFormatChange = (newFmt) => {
    setFormat(newFmt);
    const target = ALL_FORMATS.find(f => f.id === newFmt);
    // For strict 2D/Enterprise formats (GS1-128, DataMatrix, SSCC-18, etc.), load a valid sample when changing formats
    if (target && target.engine === 'bwip') {
      setValue(target.sample);
    }
  };

  const getCurrentSvgString = () => {
    if (!barcodeRef.current) return '';
    const svg = barcodeRef.current.querySelector('svg');
    if (!svg) return '';
    let svgString = new XMLSerializer().serializeToString(svg);
    if (!svgString.includes('xmlns="http://www.w3.org/2000/svg"')) {
      svgString = svgString.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
    }
    return svgString;
  };

  const handleDownloadPng = async () => {
    if (!value || !barcodeRef.current) return;
    if (isBwipEngine && !isPro) {
      const allowed = await consumeProFeature(t('proAlert.enterpriseBarcodeFeature', `Enterprise ${activeFormatMeta.label.split(' (')[0]} Export`));
      if (!allowed) return;
    }

    const svgData = getCurrentSvgString();
    if (!svgData) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = Math.max(600, img.width * 2 + 40);
      canvas.height = Math.max(240, img.height * 2 + 40);
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 20, 20, canvas.width - 40, canvas.height - 40);

      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `barcode_${format}_${value || 'code'}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handleDownloadSvg = async () => {
    if (!value || !barcodeRef.current) return;

    if (!isPro) {
      const allowed = await consumeProFeature(
        isBwipEngine
          ? t('proAlert.enterpriseBarcodeFeature', `Enterprise ${activeFormatMeta.label.split(' (')[0]} SVG Export`)
          : t('proAlert.svgFeature', 'Vector SVG Export')
      );
      if (!allowed) return;
    }

    const svgString = getCurrentSvgString();
    if (!svgString) return;

    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.download = `barcode_${format}_${value || 'code'}.svg`;
    downloadLink.href = url;
    downloadLink.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleDownloadDxf = async () => {
    if (!value || !barcodeRef.current) return;
    if (!isPro) {
      const allowed = await consumeProFeature(t('proAlert.dxfFeature', 'AutoCAD DXF Laser Cut Export'));
      if (!allowed) return;
    }
    const svgString = getCurrentSvgString();
    if (!svgString) return;
    const { svgToDxfString, triggerTextFileDownload } = await import('../utils/cadDxfExporter');
    const dxf = svgToDxfString(svgString, 100);
    triggerTextFileDownload(dxf, `barcode_${format}_100mm.dxf`, 'application/dxf');
  };

  const onSaveHistory = async () => {
    if (!value) return;
    try {
      const history = (await get('qr-history-store')) || [];
      let thumbnail = '';
      const svgData = getCurrentSvgString();
      if (svgData) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        await new Promise((resolve) => {
          img.onload = () => {
            canvas.width = img.width + 40;
            canvas.height = img.height + 40;
            ctx.fillStyle = background;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 20, 20);
            thumbnail = canvas.toDataURL('image/png', 0.2);
            resolve();
          };
          img.onerror = () => resolve();
          img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
        });
      }

      const newItem = {
        id: Date.now(),
        qrType: 'barcode',
        qrData: {
          value,
          format,
          lineColor,
          background,
          width,
          height,
          displayValue
        },
        visuals: {},
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

  const LivePreviewCard = () => (
    <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-8 shadow-2xl border border-blue-700/50 flex flex-col h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="flex items-center justify-between gap-3 mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <BarChart2 className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-white tracking-tight">{t('barcode.workspace.liveOutput', 'Live Output')}</h2>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
          isBwipEngine
            ? 'bg-amber-500/20 text-amber-300 border-amber-400/30'
            : 'bg-blue-500/20 text-blue-200 border-blue-400/30'
        }`}>
          {isBwipEngine ? 'BWIPP Engine' : '1D Retail'}
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative z-10 min-h-[300px]">
        {bwipError && isBwipEngine ? (
          <div className="p-4 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-200 text-xs max-w-xs text-center space-y-2">
            <AlertCircle className="w-5 h-5 mx-auto text-amber-400" />
            <p className="font-semibold">{bwipError}</p>
            <button
              type="button"
              onClick={() => setValue(activeFormatMeta.sample)}
              className="px-3 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 font-bold text-[11px] cursor-pointer"
            >
              Load Valid Sample ({activeFormatMeta.sample})
            </button>
          </div>
        ) : (
          <div
            ref={barcodeRef}
            className={`p-6 rounded-xl transition-all duration-300 max-w-full overflow-x-auto flex items-center justify-center ${
              value ? 'bg-white shadow-lg hover:scale-105' : 'bg-transparent'
            }`}
            style={{ backgroundColor: value ? background : 'transparent' }}
          >
            {deferredValue ? (
              isBwipEngine ? (
                bwipSvg ? (
                  <div
                    className="[&>svg]:max-w-[260px] [&>svg]:max-h-[200px] [&>svg]:w-auto [&>svg]:h-auto"
                    dangerouslySetInnerHTML={{ __html: bwipSvg }}
                  />
                ) : (
                  <div className="text-xs text-slate-400 font-medium py-8 px-12">Rendering BWIPP Matrix...</div>
                )
              ) : (
                <Barcode
                  value={deferredValue}
                  format={deferredFormat}
                  lineColor={deferredLineColor}
                  background={deferredBackground}
                  width={deferredWidth}
                  height={deferredHeight}
                  displayValue={deferredDisplayValue}
                  margin={10}
                />
              )
            ) : (
              <div className="w-64 h-32 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center p-4 text-center">
                <ScanLine className="w-8 h-8 text-blue-300/60 mb-2 animate-pulse" />
                <p className="text-white/80 font-semibold text-sm">
                  {t('barcode.workspace.enterData', 'Enter barcode data to preview')}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-3 relative z-10">
        {/* Row 1: PNG, SVG & CAD DXF Downloads */}
        <div className="grid grid-cols-3 gap-2.5 w-full">
          <button
            onClick={handleDownloadPng}
            disabled={!value}
            className={`py-3.5 px-2.5 rounded-xl bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-1.5 ${!value
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-blue-600 hover:-translate-y-0.5 cursor-pointer'
              }`}
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>PNG</span>
            {isBwipEngine && !isPro && (
              <span className="px-1 py-0.2 rounded text-[8.5px] font-semibold bg-white/20 text-white uppercase hidden sm:inline">
                {trialBadgeText}
              </span>
            )}
          </button>

          <button
            onClick={handleDownloadSvg}
            disabled={!value}
            className={`py-3.5 px-2.5 rounded-xl bg-white/10 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center justify-center gap-1 ${!value
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-white/20 hover:border-white/30 hover:-translate-y-0.5 cursor-pointer'
              }`}
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span>SVG</span>
            {!isPro && (
              <span className="ml-0.5 px-1 py-0.5 rounded text-[8.5px] font-semibold bg-blue-500/30 text-blue-200 border border-blue-400/30 uppercase flex items-center gap-0.5 shrink-0">
                <Sparkles size={8} className="text-blue-300" />
                {trialBadgeText}
              </span>
            )}
          </button>

          <button
            onClick={handleDownloadDxf}
            disabled={!value}
            className={`py-3.5 px-2.5 rounded-xl bg-white/10 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center justify-center gap-1 ${!value
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-white/20 hover:border-white/30 hover:-translate-y-0.5 cursor-pointer'
              }`}
          >
            <Cpu className="w-3.5 h-3.5 shrink-0 text-blue-300" />
            <span>DXF</span>
            {!isPro && (
              <span className="ml-0.5 px-1 py-0.5 rounded text-[8.5px] font-semibold bg-blue-500/30 text-blue-200 border border-blue-400/30 uppercase flex items-center gap-0.5 shrink-0">
                <Sparkles size={8} className="text-blue-300" />
                {trialBadgeText}
              </span>
            )}
          </button>
        </div>

        <button
          onClick={() => {
            if (!value) return;
            const svgData = getCurrentSvgString();
            if (svgData) {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              const img = new Image();
              img.onload = () => {
                canvas.width = img.width + 40;
                canvas.height = img.height + 40;
                ctx.fillStyle = background;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 20, 20);
                setCurrentBarcodeDataUrl(canvas.toDataURL('image/png'));
                setIsPrintModalOpen(true);
              };
              img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
            }
          }}
          disabled={!value}
          className={`w-full bg-gradient-to-r from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-700 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-2 ${!value
            ? 'opacity-40 cursor-not-allowed'
            : 'hover:from-slate-800 hover:to-blue-600 dark:hover:from-blue-500 dark:hover:to-blue-600 hover:-translate-y-1 cursor-pointer'
            }`}
        >
          <Printer className="w-5 h-5" />
          <span>{t('barcode.printStudioBtn', 'Print / A4 Sticker Sheet PDF')}</span>
          {!isPro && (
            <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30 uppercase flex items-center gap-1">
              <Sparkles size={10} className="text-blue-300" />
              {trialBadgeText}
            </span>
          )}
        </button>

        <button
          onClick={onSaveHistory}
          disabled={!value || isSaved}
          className={`w-full flex items-center justify-center px-4 py-4 rounded-xl transition-all font-bold shadow-sm text-sm border ${!value
            ? 'opacity-40 cursor-not-allowed bg-white/5 text-blue-200 border-blue-500/20'
            : isSaved
              ? 'bg-green-500/20 text-green-400 border-green-500/30'
              : 'bg-white/5 text-blue-200 border-blue-500/30 hover:bg-white/10 hover:border-blue-400/50 hover:-translate-y-1 cursor-pointer'
            }`}
        >
          {isSaved ? <Check className="w-5 h-5 mr-2" /> : <Clock className="w-5 h-5 mr-2" />}
          {isSaved ? t('history.saved', 'Saved to history!') : t('history.saveBtn', 'Save to Browser History')}
        </button>
      </div>
    </div>
  );

  return (
    <div className="font-sans overflow-hidden bg-slate-50 dark:bg-[#020617] min-h-screen pb-32 transition-colors duration-300">
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 dark:from-blue-900/10 via-slate-50 dark:via-[#020617] to-slate-50 dark:to-[#020617] transition-colors duration-300"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]">
            {t('barcode.hero.title', 'Generate')} <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-blue-700 dark:from-blue-300 dark:to-blue-600 pr-[4px]">{t('barcode.hero.titleHighlight', 'Barcodes')}</span> {t('barcode.hero.titleSuffix', 'Instantly')}
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            {t('barcode.hero.desc', 'Create high-quality inventory tags, shipping labels, and enterprise 2D industrial codes (DataMatrix, PDF417, Aztec, GS1-128) in seconds.')}
          </p>
        </div>
      </section>

      {/* Workspace UI (Industrial/Dashboard Layout) */}
      <section className="max-w-7xl mx-auto px-6 mt-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Left Column: Settings (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white dark:bg-[#0a1128] border border-slate-200 dark:border-[#1e2d4a] rounded-3xl p-8 shadow-xl">
              <div className="flex items-center justify-between gap-3 mb-8 pb-4 border-b border-slate-100 dark:border-[#1e2d4a]">
                <div className="flex items-center gap-3">
                  <Hash className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                  <h2 className="text-2xl font-bold tracking-tight dark:text-white">{t('barcode.workspace.dataTitle', 'Barcode Data')}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setValue(activeFormatMeta.sample)}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  {t('barcode.workspace.loadSample', 'Load Sample Value')}
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t('barcode.workspace.contentLabel', 'Barcode Content')}</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#020617] border border-slate-300 dark:border-[#1e2d4a] text-slate-900 dark:text-white rounded-xl px-5 py-4 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg font-mono"
                    placeholder={t('barcode.workspace.contentPlaceholder', 'Enter numbers or text...')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    {t('barcode.workspace.formatLabel', 'Barcode Standard / Format (20+ Retail & Industrial Standards)')}
                  </label>
                  <select
                    value={format}
                    onChange={(e) => handleFormatChange(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#020617] border border-slate-300 dark:border-[#1e2d4a] text-slate-900 dark:text-white rounded-xl px-5 py-4 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-base font-semibold cursor-pointer"
                  >
                    <optgroup label={t('barcode.workspace.optGroupRetail', 'Retail 1D Barcodes (Free PNG)')}>
                      {RETAIL_1D_FORMATS.map(fmt => (
                        <option key={fmt.id} value={fmt.id}>{fmt.label}</option>
                      ))}
                    </optgroup>
                    <optgroup label={t('barcode.workspace.optGroupEnterprise', 'Enterprise 2D & Industrial BWIPP Engine (PRO Export)')}>
                      {ENTERPRISE_BWIP_FORMATS.map(fmt => (
                        <option key={fmt.id} value={fmt.id}>★ {fmt.label}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>
            </div>

            {isMobile && <LivePreviewCard />}

            <div className="bg-white dark:bg-[#0a1128] border border-slate-200 dark:border-[#1e2d4a] rounded-3xl p-8 shadow-xl flex-1">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100 dark:border-[#1e2d4a]">
                <Settings2 className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                <h2 className="text-2xl font-bold tracking-tight dark:text-white">{t("barcode.workspace.visualTitle", "Visual Tuning")}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t("barcode.workspace.widthLabel", "Bar Width")} ({width}px)</label>
                  <input type="range" min="1" max="4" step="1" value={width} onChange={e => setWidth(Number(e.target.value))} className="w-full accent-blue-600" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t("barcode.workspace.heightLabel", "Bar Height")} ({height}px)</label>
                  <input type="range" min="40" max="150" step="10" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full accent-blue-600" />
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">{t("barcode.workspace.lineColor", "Line Color")}</label>
                  <div className="flex items-center gap-4">
                    <input type="color" value={lineColor} onChange={e => setLineColor(e.target.value)} className="w-12 h-12 rounded-lg cursor-pointer bg-slate-50 dark:bg-transparent border border-slate-300 dark:border-[#1e2d4a]" />
                    <input type="text" value={lineColor.toUpperCase()} onChange={e => setLineColor(e.target.value)} className="flex-1 bg-slate-50 dark:bg-[#020617] border border-slate-300 dark:border-[#1e2d4a] rounded-xl px-4 text-slate-900 dark:text-white font-mono uppercase" />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">{t("barcode.workspace.bgColor", "Background Color")}</label>
                  <div className="flex items-center gap-4">
                    <input type="color" value={background} onChange={e => setBackground(e.target.value)} className="w-12 h-12 rounded-lg cursor-pointer bg-slate-50 dark:bg-transparent border border-slate-300 dark:border-[#1e2d4a]" />
                    <input type="text" value={background.toUpperCase()} onChange={e => setBackground(e.target.value)} className="flex-1 bg-slate-50 dark:bg-[#020617] border border-slate-300 dark:border-[#1e2d4a] rounded-xl px-4 text-slate-900 dark:text-white font-mono uppercase" />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between bg-slate-50 dark:bg-[#020617] p-4 rounded-xl border border-slate-200 dark:border-[#1e2d4a]">
                <span className="font-bold text-slate-700 dark:text-slate-300">{t("barcode.workspace.showText", "Show Text Value Below Code")}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={displayValue} onChange={() => setDisplayValue(!displayValue)} />
                  <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Live Preview (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24 h-fit">
            {!isMobile && <LivePreviewCard />}
          </div>

        </div>
      </section>

      {/* Feature Section 1 */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-200 dark:border-[#1e2d4a]">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full mb-4 font-bold text-sm">
            <Layers className="w-4 h-4" /> {t("barcode.features.badge", "Comprehensive Standards")}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">{t("barcode.features.standardsTitle", "Supported Barcode Formats")}</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            {t("barcode.features.standardsDesc", "Choose the right standard for your industry. From retail checkout to warehouse logistics.")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-[#0a1128] p-10 rounded-[2.5rem] border border-slate-200 dark:border-[#1e2d4a] shadow-lg hover:shadow-2xl transition-all group">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform">
              <ScanLine className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold tracking-tight dark:text-white mb-4">CODE-128</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              {t("barcode.features.c128Desc", "Highly compact and versatile. Supports the full ASCII character set. Ideal for general inventory and internal tracking systems.")}
            </p>
          </div>
          <div className="bg-white dark:bg-[#0a1128] p-10 rounded-[2.5rem] border border-slate-200 dark:border-[#1e2d4a] shadow-lg hover:shadow-2xl transition-all group">
            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform">
              <Hash className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold tracking-tight dark:text-white mb-4">ITF-14</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              {t("barcode.features.itf14Desc", "Designed for packaging levels like cartons or pallets. Uses thick borders to improve scanning accuracy on corrugated cardboard.")}
            </p>
          </div>
          <div className="bg-white dark:bg-[#0a1128] p-10 rounded-[2.5rem] border border-slate-200 dark:border-[#1e2d4a] shadow-lg hover:shadow-2xl transition-all group">
            <div className="w-16 h-16 bg-green-50 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform">
              <BarChart2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold tracking-tight dark:text-white mb-4">UPC / EAN</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              {t("barcode.features.upcDesc", "The global standard for point-of-sale retail. EAN-13 is used worldwide, while UPC-A is standard in North America.")}
            </p>
          </div>
        </div>
      </section>

      {/* Feature Section 2 (New Layout - Manufacturing) */}
      <section className="bg-white dark:bg-[#060b19] py-24 border-t border-slate-200 dark:border-[#1e2d4a]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 order-2 lg:order-1 relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="bg-slate-50 dark:bg-[#0a1128] p-8 rounded-[2.5rem] border border-slate-200 dark:border-[#1e2d4a] shadow-xl relative z-10 transform -rotate-2">
              <div className="flex justify-between items-center mb-8 border-b border-slate-200 dark:border-[#1e2d4a] pb-4">
                <span className="font-mono text-sm font-bold text-slate-500 dark:text-slate-400">BATCH_ID_4920</span>
                <CheckCircle2 className="text-green-500 w-6 h-6" />
              </div>
              <div className="bg-white p-6 rounded-2xl flex justify-center mb-8">
                <Barcode value="MFG-849201" format="CODE128" width={2.5} height={80} background="#ffffff" lineColor="#000000" />
              </div>
              <div className="flex items-center gap-4 bg-slate-100 dark:bg-[#02040a] p-4 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Factory className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{t("barcode.features.mfgBadge", "Factory Ready")}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{t("barcode.features.mfgBadgeDesc", "High contrast for laser scanners")}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white">{t("barcode.features.mfgTitle", "Built for Production & Logistics")}</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              {t("barcode.features.mfgDesc", "Our generator creates crisp, pixel-perfect PNG files that scale beautifully for print. We don't use fuzzy raster images—our engine renders pure SVG math before converting it to high-res PNG downloads.")}
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0" />
                <span className="font-bold text-slate-700 dark:text-slate-300">{t("barcode.features.mfgList1", "Absolute Precision: No blurry edges.")}</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0" />
                <span className="font-bold text-slate-700 dark:text-slate-300">{t("barcode.features.mfgList2", "Custom Padding: Safe zones for thermal printers.")}</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0" />
                <span className="font-bold text-slate-700 dark:text-slate-300">{t("barcode.features.mfgList3", "100% Free: No subscriptions for basic generation.")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Feature Section 3 (New Layout - E-Commerce) */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-[#081226] dark:to-[#0a1128] rounded-[3rem] p-12 md:p-16 border border-indigo-100 dark:border-blue-900/30 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <PackageOpen className="w-64 h-64 text-blue-500" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white mb-6">{t("barcode.features.ecoTitle", "Perfect for E-Commerce & Retail")}</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium mb-10 leading-relaxed">
              {t("barcode.features.ecoDesc", "Whether you are listing a new product on Amazon (FBA) or setting up your own Shopify storefront, generating UPC and EAN codes is required for global distribution.")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => { setFormat('UPC'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl transition-transform hover:-translate-y-1 shadow-xl cursor-pointer"
              >
                {t('barcode.features.generateUpc', 'Generate UPC Code Now')}
              </button>
              <button
                onClick={() => { setFormat('EAN13'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-[#1e2d4a] text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-transparent rounded-xl transition-transform hover:-translate-y-1 shadow-sm cursor-pointer"
              >
                {t('barcode.features.generateEan', 'Generate EAN-13 Code Now')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 4 (Optical Verification Blueprint) */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-200 dark:border-[#1e2d4a]">
        <div className="bg-slate-900 text-white rounded-[3rem] p-10 md:p-16 border border-slate-800 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

          <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-blue-950/80 text-blue-400 rounded-full font-bold text-xs uppercase tracking-widest mb-6 border border-blue-500/30">
              <Gauge size={14} /> {t('research.barcodePhysics.badge', 'Optical Verification & Physical Contrast Standards')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              {t('research.barcodePhysics.title', 'ISO/IEC 15416 Barcode Print Quality Standards')}
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed font-medium">
              {t('research.barcodePhysics.subtitle', 'Engineered to satisfy industrial verification standards for reflectance, edge contrast, and modulation.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Feat 1 */}
            <div className="bg-[#050b18] p-8 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest mb-3">ISO Parameter: Rmin / Rmax</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {t('research.barcodePhysics.feat1Title', 'Minimum Edge Contrast (ECmin)')}
                </h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  {t('research.barcodePhysics.feat1Desc', 'Ensures distinction between space reflectance and bar reflectance for high-speed industrial laser scanners.')}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-500">
                Grade: A (4.0 / 4.0 Peak Contrast)
              </div>
            </div>

            {/* Feat 2 */}
            <div className="bg-[#050b18] p-8 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest mb-3">ISO Parameter: Margin Guard</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {t('research.barcodePhysics.feat2Title', 'Quiet Zone Calibration')}
                </h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  {t('research.barcodePhysics.feat2Desc', 'Mandatory margins on leading and trailing edges to avoid misreads on corrugated boxes and high-speed conveyors.')}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-500">
                Padding: 10x Module Width
              </div>
            </div>

            {/* Feat 3 */}
            <div className="bg-[#050b18] p-8 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest mb-3">ISO Parameter: Modulation</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {t('research.barcodePhysics.feat3Title', 'Vector Mathematical Sharpness')}
                </h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                  {t('research.barcodePhysics.feat3Desc', 'Pure vector rendering eliminates raster blur, guaranteeing crisp thermal transfer and laser printing at any DPI.')}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-500">
                Resolution: Infinite Vector SVG / High-Res PNG
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Print Studio Modal */}
      {isPrintModalOpen && (
        <React.Suspense fallback={null}>
          <PrintStudioModal
            isOpen={isPrintModalOpen}
            onClose={() => setIsPrintModalOpen(false)}
            items={[
              {
                id: 1,
                value: value || '',
                title: `Barcode (${format})`,
                dataUrl: currentBarcodeDataUrl,
                type: 'barcode'
              }
            ]}
            defaultTitle={`Barcode ${value || ''}`}
          />
        </React.Suspense>
      )}

    </div>
  );
}
