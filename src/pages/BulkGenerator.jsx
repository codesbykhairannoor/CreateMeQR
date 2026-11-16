import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Upload, FileSpreadsheet, Download, Printer, CheckCircle2,
  AlertCircle, Sparkles, RefreshCw, Layers, Sliders, Play,
  FileArchive, ShieldCheck, Zap, ArrowRight, Eye, Trash2, Plus, Copy
} from 'lucide-react';
const PrintStudioModal = React.lazy(() => import('../components/PrintStudioModal'));

// Robust RFC-compliant CSV & TSV parser
function parseDelimitedText(rawText) {
  if (!rawText || !rawText.trim()) return { headers: [], rows: [] };

  // Detect delimiter: tab, semicolon, comma
  const firstLine = rawText.split(/\r?\n/)[0] || '';
  let delimiter = ',';
  if (firstLine.includes('\t')) delimiter = '\t';
  else if (firstLine.includes(';') && !firstLine.includes(',')) delimiter = ';';

  const lines = rawText.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length === 0) return { headers: [], rows: [] };

  const parseLine = (line) => {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === delimiter && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  const rawHeaders = parseLine(lines[0]);
  const headers = rawHeaders.map((h, idx) => h || `Column ${idx + 1}`);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseLine(lines[i]);
    if (values.length === 1 && values[0] === '') continue;
    const rowObj = {};
    headers.forEach((h, idx) => {
      rowObj[h] = values[idx] || '';
    });
    rows.push(rowObj);
  }

  return { headers, rows };
}

// Sample CSV Content
const SAMPLE_CSV = `name,payload,sku,category
Table 1,https://createmy-qr.com/menu/table-1,TBL-001,Dining
Table 2,https://createmy-qr.com/menu/table-2,TBL-002,Dining
VIP Lounge,https://createmy-qr.com/wifi/vip,VIP-900,Hospitality
Conference Room,https://createmy-qr.com/room/conf-a,CR-101,Office
Product Sample,https://createmy-qr.com/item/482019,SKU-482019,Retail`;

export default function BulkGenerator() {
  const { t } = useTranslation();

  // Tab & Input States
  const [inputTab, setInputTab] = useState('upload'); // 'upload' | 'paste'
  const [rawPastedText, setRawPastedText] = useState('');
  const [fileName, setFileName] = useState('');
  const [parsedData, setParsedData] = useState({ headers: [], rows: [] });
  const [dataCol, setDataCol] = useState('');
  const [labelCol, setLabelCol] = useState('');

  // Styling & Options States
  const [codeType, setCodeType] = useState('qr'); // 'qr' | 'barcode'
  const [qrShape, setQrShape] = useState('square'); // 'square' | 'dots' | 'rounded'
  const [qrColor, setQrColor] = useState('#000000');
  const [qrBgColor, setQrBgColor] = useState('#ffffff');
  const [qrErrorCorrection, setQrErrorCorrection] = useState('Q'); // L, M, Q, H
  const [barcodeFormat, setBarcodeFormat] = useState('CODE128'); // CODE128, EAN13, UPCA, CODE39
  const [exportFormat, setExportFormat] = useState('png'); // 'png' | 'svg'

  // Processing & Generation States
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [processedCount, setProcessedCount] = useState(0);
  const [generatedResults, setGeneratedResults] = useState([]);
  const [isZipping, setIsZipping] = useState(false);

  // Print Studio Modal
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const fileInputRef = useRef(null);

  // Parse uploaded file
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        const parsed = parseDelimitedText(text);
        setParsedData(parsed);
        autoPickColumns(parsed.headers);
        setGeneratedResults([]);
      }
    };
    reader.readAsText(file);
  };

  // Parse pasted raw text
  const handlePastedText = (text) => {
    setRawPastedText(text);
    const parsed = parseDelimitedText(text);
    setParsedData(parsed);
    autoPickColumns(parsed.headers);
    setGeneratedResults([]);
  };

  // Heuristic to automatically choose the best payload and label columns
  const autoPickColumns = (headers) => {
    if (!headers || headers.length === 0) return;
    
    // Choose data col
    const dataCandidates = ['payload', 'url', 'link', 'data', 'code', 'value', 'sku', 'id'];
    const foundData = headers.find(h => dataCandidates.includes(h.toLowerCase()));
    setDataCol(foundData || headers[1] || headers[0]);

    // Choose label col
    const labelCandidates = ['name', 'title', 'label', 'description', 'product', 'item'];
    const foundLabel = headers.find(h => labelCandidates.includes(h.toLowerCase()));
    setLabelCol(foundLabel || headers[0]);
  };

  // Load sample data
  const handleLoadSample = () => {
    setInputTab('paste');
    handlePastedText(SAMPLE_CSV);
    setFileName('sample_menu_codes.csv');
  };

  // Download Sample CSV template
  const handleDownloadSample = () => {
    const blob = new Blob([SAMPLE_CSV], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'createmyqr_sample_template.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Generate All in Bulk (Micro-batched for zero-lag UI)
  const handleGenerateBatch = async () => {
    if (!dataCol || parsedData.rows.length === 0) return;

    setIsProcessing(true);
    setProgress(0);
    setProcessedCount(0);
    setGeneratedResults([]);

    const { default: QRCodeStyling } = await import('qr-code-styling');
    const { default: JsBarcode } = await import('jsbarcode');

    const total = parsedData.rows.length;
    const results = [];

    // Process in chunks of 5 per event-loop tick
    const chunkSize = 5;
    let idx = 0;

    const processNextChunk = async () => {
      const end = Math.min(idx + chunkSize, total);

      for (let i = idx; i < end; i++) {
        const row = parsedData.rows[i];
        const rawValue = (row[dataCol] || '').toString().trim();
        const rawLabel = (labelCol && row[labelCol] ? row[labelCol] : `item_${i + 1}`).toString().trim();

        if (!rawValue) continue;

        let dataUrl = '';
        let svgString = '';

        try {
          if (codeType === 'qr') {
            const qr = new QRCodeStyling({
              width: 300,
              height: 300,
              data: rawValue,
              dotsOptions: {
                color: qrColor,
                type: qrShape === 'rounded' ? 'rounded' : (qrShape === 'dots' ? 'dots' : 'square')
              },
              cornersSquareOptions: {
                color: qrColor,
                type: qrShape === 'square' ? 'square' : 'extra-rounded'
              },
              backgroundOptions: { color: qrBgColor },
              qrOptions: { errorCorrectionLevel: qrErrorCorrection }
            });

            // Get PNG blob
            const blob = await qr.getRawData('png');
            if (blob) {
              dataUrl = await new Promise((res) => {
                const fr = new FileReader();
                fr.onload = () => res(fr.result);
                fr.readAsDataURL(blob);
              });
            }

            // Also get SVG blob if export format is svg
            if (exportFormat === 'svg') {
              const svgBlob = await qr.getRawData('svg');
              if (svgBlob) {
                svgString = await svgBlob.text();
              }
            }
          } else {
            // Linear Barcode via JsBarcode canvas
            const canvas = document.createElement('canvas');
            try {
              JsBarcode(canvas, rawValue, {
                format: barcodeFormat,
                lineColor: qrColor,
                background: qrBgColor,
                width: 2,
                height: 80,
                displayValue: true
              });
              dataUrl = canvas.toDataURL('image/png');
            } catch (barcodeErr) {
              // fallback with Code 128 if format failed
              JsBarcode(canvas, rawValue, {
                format: 'CODE128',
                lineColor: qrColor,
                background: qrBgColor,
                width: 2,
                height: 80,
                displayValue: true
              });
              dataUrl = canvas.toDataURL('image/png');
            }
          }
        } catch (err) {
          console.error(`Failed to generate item #${i + 1}:`, err);
        }

        results.push({
          id: i + 1,
          value: rawValue,
          title: rawLabel,
          dataUrl,
          svgString,
          type: codeType,
          originalRow: row
        });
      }

      idx = end;
      setProcessedCount(idx);
      setProgress(Math.round((idx / total) * 100));

      if (idx < total) {
        // Yield to browser main thread
        setTimeout(processNextChunk, 15);
      } else {
        setGeneratedResults(results);
        setIsProcessing(false);
      }
    };

    processNextChunk();
  };

  // Bundle into a Single ZIP Archive
  const handleDownloadZip = async () => {
    if (generatedResults.length === 0) return;
    setIsZipping(true);

    try {
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      const folderName = `createmyqr_${codeType}_batch`;
      const imgFolder = zip.folder(folderName);

      // Create manifest.csv
      let manifestContent = 'Filename,Label,Encoded_Value\n';

      generatedResults.forEach((item, index) => {
        const cleanName = (item.title || `item_${item.id}`)
          .replace(/[^a-zA-Z0-9_-]/g, '_')
          .slice(0, 40);
        const fileName = `${String(index + 1).padStart(3, '0')}_${cleanName}.${exportFormat}`;

        manifestContent += `"${fileName}","${(item.title || '').replace(/"/g, '""')}","${(item.value || '').replace(/"/g, '""')}"\n`;

        if (exportFormat === 'svg' && item.svgString) {
          imgFolder.file(fileName, item.svgString);
        } else if (item.dataUrl) {
          // Extract base64
          const base64Data = item.dataUrl.split(',')[1];
          if (base64Data) {
            imgFolder.file(fileName, base64Data, { base64: true });
          }
        }
      });

      zip.file('manifest.csv', manifestContent);

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const downloadUrl = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `createmyqr_${codeType}_${generatedResults.length}_items.zip`;
      link.click();
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('ZIP creation failed:', err);
      alert('Failed to build ZIP archive. Please try again.');
    } finally {
      setIsZipping(false);
    }
  };

  // Single Item Download
  const handleDownloadSingle = (item) => {
    if (!item.dataUrl && !item.svgString) return;
    const cleanName = (item.title || `item_${item.id}`).replace(/[^a-zA-Z0-9_-]/g, '_');
    const link = document.createElement('a');
    if (exportFormat === 'svg' && item.svgString) {
      const blob = new Blob([item.svgString], { type: 'image/svg+xml' });
      link.href = URL.createObjectURL(blob);
      link.download = `${cleanName}.svg`;
    } else {
      link.href = item.dataUrl;
      link.download = `${cleanName}.png`;
    }
    link.click();
  };

  return (
    <main className="w-full flex-1 bg-slate-50 dark:bg-[#040814] text-slate-900 dark:text-white pb-32 transition-colors duration-300">
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-slate-200 dark:border-[#1e2d4a] overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/10 dark:bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full font-bold text-xs mb-6 tracking-wider border border-purple-200 dark:border-purple-500/20 backdrop-blur-md uppercase">
            <Sparkles className="w-4 h-4" /> {t('bulk.badge', 'Pro Batch Engine • 100% Client-Side')}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-black tracking-tight mb-6 leading-[1.1]">
            {t('bulk.heroTitle', 'Bulk QR Code & Barcode Generator')}
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed mb-8">
            {t('bulk.heroSubtitle', 'Import spreadsheets or CSV files and generate hundreds or thousands of high-resolution QR codes and barcodes in seconds. Zero data tracking — every code is compiled directly in your browser memory.')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-4 h-4" /> {t('bulk.featPrivate', '100% Private (No Server Uploads)')}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              <FileArchive className="w-4 h-4" /> {t('bulk.featZip', 'Instant ZIP Export')}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
              <Printer className="w-4 h-4" /> {t('bulk.featPrint', 'A4 Sticker Sheet PDF Print')}
            </span>
          </div>
        </div>
      </section>

      {/* 2. Workspace Body */}
      <section className="max-w-6xl mx-auto px-6 mt-12 space-y-10">
        
        {/* Step 1: Data Input Card */}
        <div className="bg-white dark:bg-[#0a1128] border border-slate-200 dark:border-[#1e2d4a] rounded-[2.5rem] p-8 md:p-10 shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-[#1e2d4a]">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-purple-600 text-white font-black flex items-center justify-center text-sm">
                1
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                {t('bulk.step1Title', 'Provide Your Data (CSV or Spreadsheets)')}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadSample}
                className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> {t('bulk.templateCsv', 'Template.csv')}
              </button>
              <button
                onClick={handleLoadSample}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition-all"
              >
                {t('bulk.loadSample', 'Load Sample Data')}
              </button>
            </div>
          </div>

          {/* Input Method Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setInputTab('upload')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                inputTab === 'upload'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Upload className="w-4 h-4" /> {t('bulk.tabUpload', 'Upload CSV / TSV File')}
            </button>
            <button
              onClick={() => setInputTab('paste')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                inputTab === 'paste'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" /> {t('bulk.tabPaste', 'Paste From Excel / Google Sheets')}
            </button>
          </div>

          {/* Upload Area */}
          {inputTab === 'upload' ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-purple-300 dark:border-purple-500/30 rounded-3xl p-10 text-center bg-purple-50/50 dark:bg-purple-950/10 hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-all cursor-pointer group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.tsv,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black mb-1 text-slate-900 dark:text-white">
                {fileName ? t('bulk.dropLoaded', 'Loaded: {{fileName}}', { fileName }) : t('bulk.dropTitle', 'Choose or Drag & Drop CSV / TSV File')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('bulk.dropDesc', 'Supports Comma, Semicolon, or Tab delimited files. No file size limits.')}
              </p>
            </div>
          ) : (
            <div>
              <textarea
                value={rawPastedText}
                onChange={(e) => handlePastedText(e.target.value)}
                placeholder={t('bulk.pastePlaceholder', 'Paste rows here (e.g. from Excel or Google Sheets)...')}
                rows={6}
                className="w-full p-4 bg-slate-50 dark:bg-[#060b19] border border-slate-200 dark:border-[#1e2d4a] rounded-2xl text-xs font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}

          {/* Parsed Preview Table */}
          {parsedData.rows.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-[#1e2d4a]">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {t('bulk.detectedSummary', 'Detected {{rows}} rows and {{cols}} columns', { rows: parsedData.rows.length, cols: parsedData.headers.length })}
                </span>

                <div className="flex flex-wrap items-center gap-4">
                  {/* Data Column Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{t('bulk.colData', 'Data / URL Column:')}</span>
                    <select
                      value={dataCol}
                      onChange={(e) => setDataCol(e.target.value)}
                      className="px-3 py-1.5 bg-slate-50 dark:bg-[#060b19] border border-purple-300 dark:border-purple-600 rounded-xl text-xs font-bold text-purple-700 dark:text-purple-300 focus:outline-none"
                    >
                      {parsedData.headers.map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>

                  {/* Label Column Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{t('bulk.colLabel', 'Label / Filename:')}</span>
                    <select
                      value={labelCol}
                      onChange={(e) => setLabelCol(e.target.value)}
                      className="px-3 py-1.5 bg-slate-50 dark:bg-[#060b19] border border-slate-200 dark:border-[#1e2d4a] rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none"
                    >
                      <option value="">{t('bulk.colLabelNone', 'None (Auto Numbering)')}</option>
                      {parsedData.headers.map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Mini Table Preview (First 5 Rows) */}
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-[#1e2d4a]">
                <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-[11px] font-black uppercase text-slate-500 dark:text-slate-400">
                    <tr>
                      <th className="py-2.5 px-4 w-12">#</th>
                      {parsedData.headers.map((h) => (
                        <th key={h} className="py-2.5 px-4">
                          <span className={h === dataCol ? 'text-purple-600 dark:text-purple-400 underline decoration-2' : ''}>
                            {h} {h === dataCol ? '★' : ''}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {parsedData.rows.slice(0, 5).map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                        <td className="py-2 px-4 font-bold text-slate-400">{rIdx + 1}</td>
                        {parsedData.headers.map((h) => (
                          <td key={h} className="py-2 px-4 truncate max-w-xs font-mono">
                            {row[h] || <span className="text-slate-400 italic">empty</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {parsedData.rows.length > 5 && (
                <p className="text-[11px] text-slate-400 mt-2 text-right">
                  {t('bulk.moreRecords', '+ {{count}} more records will be processed.', { count: parsedData.rows.length - 5 })}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Step 2: Styling & Options Card */}
        <div className="bg-white dark:bg-[#0a1128] border border-slate-200 dark:border-[#1e2d4a] rounded-[2.5rem] p-8 md:p-10 shadow-xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-[#1e2d4a]">
            <span className="w-8 h-8 rounded-full bg-purple-600 text-white font-black flex items-center justify-center text-sm">
              2
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              {t('bulk.step2Title', 'Configure Code Style & Format')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Code Type */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                {t('bulk.codeType', 'Code Type')}
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setCodeType('qr')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    codeType === 'qr'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {t('bulk.typeQr', 'QR Code (2D)')}
                </button>
                <button
                  onClick={() => setCodeType('barcode')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    codeType === 'barcode'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {t('bulk.typeBarcode', 'Barcode (1D)')}
                </button>
              </div>
            </div>

            {/* If QR: Shape & Error Correction */}
            {codeType === 'qr' ? (
              <>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                    {t('bulk.dotPattern', 'Dot Pattern')}
                  </label>
                  <select
                    value={qrShape}
                    onChange={(e) => setQrShape(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#060b19] border border-slate-200 dark:border-[#1e2d4a] rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                  >
                    <option value="square">{t('bulk.patternSquare', 'Classic Square')}</option>
                    <option value="rounded">{t('bulk.patternRounded', 'Smooth Rounded')}</option>
                    <option value="dots">{t('bulk.patternDots', 'Modern Dots')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                    {t('bulk.eccLevel', 'Error Correction Level')}
                  </label>
                  <select
                    value={qrErrorCorrection}
                    onChange={(e) => setQrErrorCorrection(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#060b19] border border-slate-200 dark:border-[#1e2d4a] rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                  >
                    <option value="L">{t('bulk.eccL', 'L — 7% Restoration')}</option>
                    <option value="M">{t('bulk.eccM', 'M — 15% Standard')}</option>
                    <option value="Q">{t('bulk.eccQ', 'Q — 25% High Reliability')}</option>
                    <option value="H">{t('bulk.eccH', 'H — 30% Maximum Ruggedness')}</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                    {t('bulk.barcodeStd', 'Barcode Standard')}
                  </label>
                  <select
                    value={barcodeFormat}
                    onChange={(e) => setBarcodeFormat(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#060b19] border border-slate-200 dark:border-[#1e2d4a] rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none"
                  >
                    <option value="CODE128">Code 128 (Universal)</option>
                    <option value="EAN13">EAN-13 (Retail Product)</option>
                    <option value="UPC">UPC-A (US Retail)</option>
                    <option value="CODE39">Code 39 (Logistics)</option>
                    <option value="ITF14">ITF-14 (Packaging)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                    {t('bulk.exportImgFormat', 'Export Image Format')}
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setExportFormat('png')}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        exportFormat === 'png'
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {t('bulk.formatPng', 'PNG (High DPI)')}
                    </button>
                    <button
                      onClick={() => setExportFormat('svg')}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        exportFormat === 'svg'
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {t('bulk.formatSvg', 'SVG (Vector)')}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Step 3: Trigger & Progress */}
        <div className="bg-white dark:bg-[#0a1128] border border-slate-200 dark:border-[#1e2d4a] rounded-[2.5rem] p-8 md:p-10 shadow-xl">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-[#1e2d4a]">
            <span className="w-8 h-8 rounded-full bg-purple-600 text-white font-black flex items-center justify-center text-sm">
              3
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              {t('bulk.step3Title', 'Generate & Download')}
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                {t('bulk.readySummary', 'Ready to generate {{count}} codes', { count: parsedData.rows.length })}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('bulk.asyncNotice', 'Processed asynchronously in memory. No network bandwidth consumed.')}
              </p>
            </div>

            <button
              disabled={isProcessing || parsedData.rows.length === 0}
              onClick={handleGenerateBatch}
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-purple-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  {t('bulk.btnGenerating', 'Generating ({{percent}}%)', { percent: progress })}
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  {t('bulk.btnGenerate', 'Generate {{count}} Codes', { count: parsedData.rows.length })}
                </>
              )}
            </button>
          </div>

          {/* Progress Bar */}
          {isProcessing && (
            <div className="mt-8 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-purple-600 dark:text-purple-400">
                  {t('bulk.progressSummary', 'Processed {{current}} of {{total}} items...', { current: processedCount, total: parsedData.rows.length })}
                </span>
                <span className="text-slate-500">{progress}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-150 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Results Action Bar */}
          {generatedResults.length > 0 && !isProcessing && (
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-[#1e2d4a] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                {t('bulk.successCompile', 'Successfully compiled {{count}} codes in browser memory!', { count: generatedResults.length })}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Print Sheet Trigger */}
                <button
                  onClick={() => setIsPrintModalOpen(true)}
                  className="px-5 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <Printer className="w-4 h-4 text-purple-500" />
                  {t('bulk.btnPrintPdf', 'Print A4 Sticker Sheet PDF')}
                </button>

                {/* Download ZIP Trigger */}
                <button
                  disabled={isZipping}
                  onClick={handleDownloadZip}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2"
                >
                  <FileArchive className="w-4 h-4" />
                  {isZipping ? t('bulk.btnCompressing', 'Compressing ZIP...') : t('bulk.btnDownloadZip', 'Download All ({{count}} items) as ZIP', { count: generatedResults.length })}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Step 4: Live Results Grid Gallery */}
        {generatedResults.length > 0 && (
          <div className="bg-white dark:bg-[#0a1128] border border-slate-200 dark:border-[#1e2d4a] rounded-[2.5rem] p-8 md:p-10 shadow-xl">
            <h3 className="text-xl font-black mb-6 text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-500" /> {t('bulk.galleryTitle', 'Generated Code Gallery')}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {generatedResults.slice(0, 48).map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-slate-50 dark:bg-[#060b19] border border-slate-200 dark:border-[#1e2d4a] rounded-2xl flex flex-col items-center justify-between text-center group hover:border-purple-500 transition-all"
                >
                  <div className="w-full aspect-square bg-white rounded-xl p-2 flex items-center justify-center mb-2 shadow-xs">
                    {item.dataUrl ? (
                      <img src={item.dataUrl} alt={item.title} className="object-contain max-h-full max-w-full" />
                    ) : (
                      <div className="text-[10px] text-slate-400">Code</div>
                    )}
                  </div>

                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate w-full mb-1">
                    {item.title}
                  </span>
                  <span className="text-[9px] text-slate-400 truncate w-full font-mono mb-2">
                    {item.value}
                  </span>

                  <button
                    onClick={() => handleDownloadSingle(item)}
                    className="w-full py-1 bg-white dark:bg-slate-800 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-1"
                  >
                    <Download className="w-3 h-3" /> {t('bulk.btnSave', 'Save')}
                  </button>
                </div>
              ))}
            </div>

            {generatedResults.length > 48 && (
              <p className="text-xs text-slate-400 mt-6 text-center">
                {t('bulk.galleryLimitNotice', 'Showing first 48 items. All {{count}} items will be included in the downloaded ZIP.', { count: generatedResults.length })}
              </p>
            )}
          </div>
        )}

      </section>

      {/* Print Studio Modal (Integrated) */}
      {isPrintModalOpen && (
        <React.Suspense fallback={null}>
          <PrintStudioModal
            isOpen={isPrintModalOpen}
            onClose={() => setIsPrintModalOpen(false)}
            items={generatedResults}
            defaultTitle={fileName || 'Batch Items'}
          />
        </React.Suspense>
      )}

    </main>
  );
}
