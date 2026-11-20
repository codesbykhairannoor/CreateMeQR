import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import JSZip from 'jszip';
import {
  Archive,
  Upload,
  FileSpreadsheet,
  FileText,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Zap,
  Lock,
  Crown,
  Sparkles,
  AlertCircle,
  Search,
  Filter,
  RefreshCw,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { decodeBatchWithWasm } from '../utils/zxingEngine';
import { exportToCsv, exportToXlsx } from '../utils/excelExporter';

const SUPPORTED_IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.bmp', '.svg', '.tiff'];

function isImageFile(filename = '') {
  const lower = filename.toLowerCase();
  return SUPPORTED_IMAGE_EXTENSIONS.some(ext => lower.endsWith(ext));
}

export default function BatchScanner({ defaultMode = 'all' }) {
  const { t } = useTranslation();
  const {
    user,
    isPro,
    freeBatchScanTrialsRemaining,
    FREE_BATCH_SCAN_TRIALS_MAX,
    consumeBatchScanFeature,
    openAuthModal,
    openProModal
  } = useAuth();

  const [selectedItems, setSelectedItems] = useState([]); // [{ id, name, blob, thumbUrl }]
  const [sourceName, setSourceName] = useState('');
  const [isExtractingZip, setIsExtractingZip] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState({ completed: 0, total: 0 });
  const [results, setResults] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'detected' | 'none'
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);

  // Scan configurations
  const [formatScope, setFormatScope] = useState(defaultMode === 'qr' ? 'qr' : defaultMode === 'barcode' ? 'barcode' : 'all');
  const [deepScan, setDeepScan] = useState(true);

  const fileInputRef = useRef(null);
  const imagesInputRef = useRef(null);

  // Clean up object URLs on unmount or items reset
  useEffect(() => {
    return () => {
      selectedItems.forEach(item => {
        if (item.thumbUrl) URL.revokeObjectURL(item.thumbUrl);
      });
    };
  }, [selectedItems]);

  const handleZipUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!user) {
      openAuthModal();
      event.target.value = '';
      return;
    }

    setIsExtractingZip(true);
    setSourceName(file.name);
    setResults([]);
    setSelectedItems([]);

    try {
      const zip = await JSZip.loadAsync(file);
      const extracted = [];
      let index = 0;

      const entries = Object.keys(zip.files).filter(name => {
        const entry = zip.files[name];
        return !entry.dir && !name.includes('__MACOSX') && isImageFile(name);
      });

      for (const name of entries) {
        index += 1;
        const blob = await zip.files[name].async('blob');
        const thumbUrl = URL.createObjectURL(blob);
        extracted.push({
          id: `item-${index}-${Date.now()}`,
          name: name.split('/').pop() || name,
          blob,
          thumbUrl
        });
      }

      setSelectedItems(extracted);
    } catch (err) {
      console.error('[BatchScanner] Failed to unpack ZIP:', err);
      alert(t('batchScanner.errZip', 'Failed to extract ZIP file. Please ensure it is a valid ZIP archive.'));
    } finally {
      setIsExtractingZip(false);
      event.target.value = '';
    }
  };

  const handleMultipleImagesUpload = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    if (!user) {
      openAuthModal();
      event.target.value = '';
      return;
    }

    setSourceName(`${files.length} Image Files`);
    setResults([]);
    setSelectedItems([]);

    const items = files.filter(f => isImageFile(f.name)).map((file, idx) => ({
      id: `multi-${idx}-${Date.now()}`,
      name: file.name,
      blob: file,
      thumbUrl: URL.createObjectURL(file)
    }));

    setSelectedItems(items);
    event.target.value = '';
  };

  const startBatchScan = async () => {
    if (selectedItems.length === 0) return;

    if (!user) {
      openAuthModal();
      return;
    }

    // Permission and quota verification
    const allowed = await consumeBatchScanFeature(t('batchScanner.featureName', 'Batch ZIP QR & Barcode Scanner'));
    if (!allowed) return;

    setIsScanning(true);
    setScanProgress({ completed: 0, total: selectedItems.length });
    const startTime = performance.now();

    // Map format scope to zxing format lists
    let targetFormats = [];
    if (formatScope === 'qr') {
      targetFormats = ['QRCode', 'MicroQRCode', 'RMQRCode', 'DataMatrix', 'Aztec'];
    } else if (formatScope === 'barcode') {
      targetFormats = ['Code128', 'Code39', 'Code93', 'Codabar', 'EAN-13', 'EAN-8', 'UPC-A', 'UPC-E', 'ITF', 'PDF417'];
    }

    try {
      const decodedList = await decodeBatchWithWasm(
        selectedItems,
        (completed, total) => {
          setScanProgress({ completed, total });
        },
        {
          formats: targetFormats,
          tryHarder: deepScan,
          tryRotate: deepScan,
          tryInvert: deepScan,
          maxNumberOfSymbols: 10,
          concurrency: 3
        }
      );

      setElapsedMs(Math.round(performance.now() - startTime));
      setResults(decodedList);
    } catch (err) {
      console.error('[BatchScanner] Scan error:', err);
      alert(t('batchScanner.errScan', 'An error occurred during batch decoding.'));
    } finally {
      setIsScanning(false);
    }
  };

  // Filtered results
  const filteredResults = useMemo(() => {
    return results.filter(item => {
      if (activeFilter === 'detected' && item.status !== 'detected') return false;
      if (activeFilter === 'none' && item.status === 'detected') return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return item.filename.toLowerCase().includes(q) || item.text.toLowerCase().includes(q) || item.format.toLowerCase().includes(q);
      }
      return true;
    });
  }, [results, activeFilter, searchQuery]);

  const stats = useMemo(() => {
    const totalFiles = selectedItems.length;
    const detectedRows = results.filter(r => r.status === 'detected');
    const filesWithCodes = new Set(detectedRows.map(r => r.filename)).size;
    const rate = totalFiles > 0 ? Math.round((filesWithCodes / totalFiles) * 100) : 0;
    return {
      totalFiles,
      totalCodes: detectedRows.length,
      filesWithCodes,
      rate
    };
  }, [selectedItems, results]);

  const handleCopySingle = (id, text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleCopyAll = () => {
    const detected = results.filter(r => r.status === 'detected' && r.text);
    if (detected.length === 0) return;
    const textBlock = detected.map(r => `${r.filename}\t${r.format}\t${r.text}`).join('\n');
    navigator.clipboard.writeText(textBlock);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleExportCsv = () => {
    if (results.length === 0) return;
    const headers = [
      t('batchScanner.thIndex', '#'),
      t('batchScanner.thFilename', 'Filename'),
      t('batchScanner.thFormat', 'Barcode Format'),
      t('batchScanner.thDecoded', 'Decoded Content'),
      t('batchScanner.thCategory', 'Category'),
      t('batchScanner.thStatus', 'Status'),
      t('batchScanner.thTimeMs', 'Time (ms)')
    ];
    const rows = results.map((r, idx) => [
      idx + 1,
      r.filename,
      r.format,
      r.text,
      r.category,
      r.status === 'detected' ? 'Detected' : 'No Barcode',
      r.timeMs || 0
    ]);
    exportToCsv(headers, rows, `createmyqr_batch_scan_${Date.now()}.csv`);
  };

  const handleExportXlsx = async () => {
    if (results.length === 0) return;
    const headers = [
      t('batchScanner.thIndex', '#'),
      t('batchScanner.thFilename', 'Filename'),
      t('batchScanner.thFormat', 'Barcode Format'),
      t('batchScanner.thDecoded', 'Decoded Content'),
      t('batchScanner.thCategory', 'Category'),
      t('batchScanner.thStatus', 'Status'),
      t('batchScanner.thTimeMs', 'Time (ms)')
    ];
    const rows = results.map((r, idx) => [
      idx + 1,
      r.filename,
      r.format,
      r.text,
      r.category,
      r.status === 'detected' ? 'Detected' : 'No Barcode',
      r.timeMs || 0
    ]);
    await exportToXlsx(headers, rows, `createmyqr_batch_scan_${Date.now()}.xlsx`, 'Scanned Barcodes');
  };

  const handleClear = () => {
    setSelectedItems([]);
    setResults([]);
    setSourceName('');
    setSearchQuery('');
    setScanProgress({ completed: 0, total: 0 });
  };

  const percent = scanProgress.total > 0 ? Math.round((scanProgress.completed / scanProgress.total) * 100) : 0;

  return (
    <div className="space-y-8 animate-fade-in text-slate-800 dark:text-slate-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-blue-900/30">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('batchScanner.title', 'Batch ZIP & Multi-Image Scanner')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {t('batchScanner.subtitle', 'Upload a ZIP archive or multiple image files. Extract and decode all QR codes and barcodes at once, then export to CSV or Excel (.xlsx).')}
          </p>
        </div>

        {/* Quota / User Status Badge */}
        <div className="shrink-0">
          {!user ? (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3 text-left max-w-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
                <Lock className="w-4 h-4 shrink-0" />
                <span>{t('batchScanner.guestNoticeTitle', 'Guest Restricted')}</span>
              </div>
              <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80 mt-1 leading-tight">
                {t('batchScanner.guestNoticeDesc', 'Sign in to unlock 2 free batch scans every month, or upgrade to PRO.')}
              </p>
              <button
                onClick={openAuthModal}
                className="mt-2 w-full py-1.5 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                {t('batchScanner.guestSignInBtn', 'Sign In (Claim 2/Mo)')}
              </button>
            </div>
          ) : isPro ? (
            <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-2xl p-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Crown className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-300">
                  {t('batchScanner.proUnlimitedActive', 'PRO Unlimited Active')}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t('batchScanner.proUnlimitedDesc', 'Zero limits on batch ZIP images & exports')}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-blue-50 dark:bg-[#0c1831] border border-blue-200 dark:border-blue-900/40 rounded-2xl p-3 text-left max-w-xs">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white mb-1">
                <span>{t('batchScanner.freeMonthlyQuota', 'Free Monthly Quota')}</span>
                <span className="text-blue-600 dark:text-blue-400">
                  {freeBatchScanTrialsRemaining} / {FREE_BATCH_SCAN_TRIALS_MAX} {t('batchScanner.quotaLeft', 'Left')}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all"
                  style={{ width: `${(freeBatchScanTrialsRemaining / FREE_BATCH_SCAN_TRIALS_MAX) * 100}%` }}
                />
              </div>
              <button
                onClick={() => openProModal(t('batchScanner.featureName', 'Batch ZIP Scanner'))}
                className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Crown className="w-3 h-3 text-amber-500" />
                {t('batchScanner.userUpgradeBtn', 'Upgrade to PRO for Unlimited')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upload Dropzone & Selection Area */}
      {selectedItems.length === 0 ? (
        <div className="relative border-2 border-dashed border-blue-300 dark:border-blue-500/30 rounded-3xl p-8 sm:p-14 text-center bg-blue-50/50 dark:bg-blue-500/5 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleZipUpload}
            accept=".zip"
            className="hidden"
          />
          <input
            type="file"
            ref={imagesInputRef}
            onChange={handleMultipleImagesUpload}
            accept="image/*"
            multiple
            className="hidden"
          />

          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/10">
            <Archive className="w-10 h-10" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-2">
            {t('batchScanner.dropzoneTitle', 'Upload a ZIP Archive or Multiple Images')}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
            {t('batchScanner.dropzoneSubtitle', 'Upload a .zip file containing tickets, inventory labels, or receipts, or directly select multiple image files.')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                if (!user) { openAuthModal(); return; }
                fileInputRef.current?.click();
              }}
              disabled={isExtractingZip}
              className="py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-2xl shadow-xl shadow-blue-600/20 transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Archive className="w-4 h-4" />
              <span>{isExtractingZip ? t('batchScanner.unpackingZip', 'Unpacking ZIP...') : t('batchScanner.btnSelectZip', 'Choose ZIP Archive')}</span>
            </button>

            <button
              onClick={() => {
                if (!user) { openAuthModal(); return; }
                imagesInputRef.current?.click();
              }}
              disabled={isExtractingZip}
              className="py-3.5 px-6 bg-white dark:bg-[#0c1831] hover:bg-slate-50 dark:hover:bg-[#102040] text-slate-800 dark:text-white font-bold text-sm rounded-2xl border border-slate-300 dark:border-blue-900/50 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4 text-blue-500" />
              <span>{t('batchScanner.btnSelectImages', 'Select Multiple Images')}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Configuration and Scan Action Area */
        <div className="bg-slate-50 dark:bg-[#081226] border border-slate-200 dark:border-[#102040] rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-[#102040]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
                  {sourceName}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedItems.length} {t('batchScanner.imagesReady', 'images ready for processing')}
                </p>
              </div>
            </div>

            {!isScanning && (
              <button
                onClick={handleClear}
                className="text-xs font-bold text-red-500 hover:text-red-600 dark:hover:text-red-400 py-2 px-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center gap-1 self-start sm:self-auto cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t('batchScanner.btnClear', 'Choose Different Files')}</span>
              </button>
            )}
          </div>

          {/* Configuration Grid */}
          {!isScanning && results.length === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                  {t('batchScanner.targetFormatLabel', 'Target Symbologies')}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setFormatScope('all')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${formatScope === 'all' ? 'bg-blue-600 text-white border-blue-600 shadow' : 'bg-white dark:bg-[#0c1831] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-blue-900/40 hover:border-blue-500'}`}
                  >
                    {t('batchScanner.scopeAll', 'All Barcodes')}
                  </button>
                  <button
                    onClick={() => setFormatScope('qr')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${formatScope === 'qr' ? 'bg-blue-600 text-white border-blue-600 shadow' : 'bg-white dark:bg-[#0c1831] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-blue-900/40 hover:border-blue-500'}`}
                  >
                    {t('batchScanner.scopeQr', 'QR Codes Only')}
                  </button>
                  <button
                    onClick={() => setFormatScope('barcode')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${formatScope === 'barcode' ? 'bg-blue-600 text-white border-blue-600 shadow' : 'bg-white dark:bg-[#0c1831] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-blue-900/40 hover:border-blue-500'}`}
                  >
                    {t('batchScanner.scope1D', '1D Retail Only')}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                  {t('batchScanner.scanEngineLabel', 'Detection Engine Intensity')}
                </label>
                <div className="flex items-center gap-3 bg-white dark:bg-[#0c1831] p-2.5 rounded-xl border border-slate-200 dark:border-blue-900/40">
                  <input
                    type="checkbox"
                    id="deepScanToggle"
                    checked={deepScan}
                    onChange={(e) => setDeepScan(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="deepScanToggle" className="text-xs text-slate-700 dark:text-slate-300 font-medium cursor-pointer">
                    <span className="font-bold">{t('batchScanner.deepScanTitle', 'Deep Inspection')}:</span> {t('batchScanner.deepScanDesc', 'Rotated, inverted, and distorted barcodes (recommended)')}
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Scan Action / Progress Bar */}
          {isScanning ? (
            <div className="space-y-4 my-6">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{t('batchScanner.scanningStatus', 'Processing with WebAssembly...')}</span>
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {scanProgress.completed} / {scanProgress.total} ({percent}%)
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-3 rounded-full overflow-hidden shadow-inner">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full transition-all duration-200"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          ) : results.length === 0 ? (
            <button
              onClick={startBatchScan}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-base rounded-2xl shadow-xl shadow-blue-600/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Zap className="w-5 h-5 text-amber-300" />
              <span>{t('batchScanner.btnStartScan', `Start Batch Scan (${selectedItems.length} Images)`)}</span>
            </button>
          ) : null}
        </div>
      )}

      {/* Results Section */}
      {results.length > 0 && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Stats KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-[#081226] border border-slate-200 dark:border-[#102040] rounded-2xl p-4 text-center">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t('batchScanner.statProcessed', 'Total Files')}</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalFiles}</div>
            </div>
            <div className="bg-white dark:bg-[#081226] border border-slate-200 dark:border-[#102040] rounded-2xl p-4 text-center">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t('batchScanner.statDetected', 'Barcodes Found')}</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{stats.totalCodes}</div>
            </div>
            <div className="bg-white dark:bg-[#081226] border border-slate-200 dark:border-[#102040] rounded-2xl p-4 text-center">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t('batchScanner.statSuccessRate', 'Detection Rate')}</div>
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400">{stats.rate}%</div>
            </div>
            <div className="bg-white dark:bg-[#081226] border border-slate-200 dark:border-[#102040] rounded-2xl p-4 text-center">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{t('batchScanner.statTime', 'Total Elapsed')}</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">{elapsedMs > 1000 ? `${(elapsedMs / 1000).toFixed(1)}s` : `${elapsedMs}ms`}</div>
            </div>
          </div>

          {/* Action Toolbar & Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-[#081226] border border-slate-200 dark:border-[#102040] rounded-2xl p-4 shadow-sm">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
              <button
                onClick={() => setActiveFilter('all')}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-colors shrink-0 cursor-pointer ${activeFilter === 'all' ? 'bg-slate-900 dark:bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                {t('batchScanner.filterAllRows', 'All Rows')} ({results.length})
              </button>
              <button
                onClick={() => setActiveFilter('detected')}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-colors shrink-0 cursor-pointer ${activeFilter === 'detected' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                {t('batchScanner.filterDetected', 'Detected')} ({stats.totalCodes})
              </button>
              <button
                onClick={() => setActiveFilter('none')}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-colors shrink-0 cursor-pointer ${activeFilter === 'none' ? 'bg-amber-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                {t('batchScanner.filterNoBarcode', 'No Barcode')} ({results.filter(r => r.status !== 'detected').length})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 max-w-xs">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={t('batchScanner.searchPlaceholder', 'Filter results or filenames...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-[#0c1831] border border-slate-200 dark:border-blue-900/40 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Export Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopyAll}
                className="py-2 px-3 bg-slate-100 dark:bg-[#0c1831] hover:bg-slate-200 dark:hover:bg-[#102040] text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl border border-slate-200 dark:border-blue-900/40 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAll ? 'Copied All!' : t('batchScanner.btnCopyAll', 'Copy All')}</span>
              </button>

              <button
                onClick={handleExportCsv}
                className="py-2 px-3 bg-white dark:bg-[#0c1831] hover:bg-slate-50 dark:hover:bg-[#102040] text-slate-800 dark:text-white text-xs font-bold rounded-xl border border-slate-300 dark:border-blue-900/50 shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-blue-500" />
                <span>{t('batchScanner.btnExportCsv', 'Export CSV')}</span>
              </button>

              <button
                onClick={handleExportXlsx}
                className="py-2 px-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-white" />
                <span>{t('batchScanner.btnExportXlsx', 'Export Excel (.xlsx)')}</span>
              </button>
            </div>
          </div>

          {/* Interactive Results Table */}
          <div className="bg-white dark:bg-[#081226] border border-slate-200 dark:border-[#102040] rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto max-h-[550px] custom-scrollbar">
              <table className="w-full text-left text-xs">
                <thead className="sticky top-0 z-10 bg-slate-100 dark:bg-[#0c1831] border-b border-slate-200 dark:border-[#102040] text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4 w-12">{t('batchScanner.thIndex', '#')}</th>
                    <th className="py-3 px-4 w-16">{t('batchScanner.thThumb', 'Image')}</th>
                    <th className="py-3 px-4">{t('batchScanner.thFilename', 'Filename')}</th>
                    <th className="py-3 px-4 w-28">{t('batchScanner.thFormat', 'Format')}</th>
                    <th className="py-3 px-4">{t('batchScanner.thDecoded', 'Decoded Content')}</th>
                    <th className="py-3 px-4 w-28">{t('batchScanner.thCategory', 'Type')}</th>
                    <th className="py-3 px-4 w-28">{t('batchScanner.thStatus', 'Status')}</th>
                    <th className="py-3 px-4 w-20 text-right">{t('batchScanner.thAction', 'Action')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#102040]">
                  {filteredResults.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-400">
                        {t('batchScanner.noMatchingRows', 'No rows match the current search or filter.')}
                      </td>
                    </tr>
                  ) : (
                    filteredResults.map((row, idx) => (
                      <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-blue-900/10 transition-colors">
                        <td className="py-3 px-4 font-mono text-slate-400">{idx + 1}</td>
                        <td className="py-3 px-4">
                          {row.thumbUrl ? (
                            <img
                              src={row.thumbUrl}
                              alt={row.filename}
                              className="w-10 h-10 object-cover rounded-lg border border-slate-200 dark:border-blue-900/40 bg-slate-50 dark:bg-slate-900"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                              <ImageIcon className="w-4 h-4" />
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200 max-w-[180px] truncate" title={row.filename}>
                          {row.filename}
                          {row.totalInFile > 1 && (
                            <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                              #{row.codeIndex}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {row.status === 'detected' ? (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-500/30">
                              {row.format}
                            </span>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4 max-w-[280px]">
                          {row.status === 'detected' ? (
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs text-slate-900 dark:text-white truncate" title={row.text}>
                                {row.text}
                              </span>
                              {row.category === 'url' && (
                                <a
                                  href={row.text}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:text-blue-600 shrink-0"
                                  title="Open Link"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-400 italic">{t('batchScanner.noCodeDetected', 'No readable barcode detected')}</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {row.status === 'detected' ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
                              {row.category}
                            </span>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {row.status === 'detected' ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                              <span>{t('batchScanner.statusDetected', 'Detected')}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400">
                              <XCircle className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                              <span>{t('batchScanner.statusUnreadable', 'Unreadable')}</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {row.status === 'detected' && row.text && (
                            <button
                              onClick={() => handleCopySingle(row.id, row.text)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                              title="Copy Text"
                            >
                              {copiedId === row.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
