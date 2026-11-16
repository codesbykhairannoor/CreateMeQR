import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Printer, Download, Settings, Grid, FileText, Check, ChevronLeft, ChevronRight, Sliders, Sparkles, Layers } from 'lucide-react';

// Standard Paper Dimensions in mm
const PAPERS = {
  a4: { name: 'A4', width: 210, height: 297 },
  letter: { name: 'US Letter', width: 215.9, height: 279.4 }
};

// Common Sticker Sheet Presets (Avery / Tom & Jerry / European standard)
const PRESETS = [
  {
    id: 'a4_24',
    name: 'A4 — 24 Labels (3 × 8)',
    paper: 'a4',
    cols: 3,
    rows: 8,
    labelWidth: 70.0,
    labelHeight: 37.0,
    marginTop: 0.5,
    marginLeft: 0.0,
    gapX: 0.0,
    gapY: 0.0,
    desc: '70 × 37 mm (European Standard / Avery 7159)'
  },
  {
    id: 'a4_21',
    name: 'A4 — 21 Labels (3 × 7)',
    paper: 'a4',
    cols: 3,
    rows: 7,
    labelWidth: 63.5,
    labelHeight: 38.1,
    marginTop: 15.1,
    marginLeft: 7.2,
    gapX: 2.5,
    gapY: 0.0,
    desc: '63.5 × 38.1 mm (Tom & Jerry / Avery 7160)'
  },
  {
    id: 'a4_18',
    name: 'A4 — 18 Labels (3 × 6)',
    paper: 'a4',
    cols: 3,
    rows: 6,
    labelWidth: 63.5,
    labelHeight: 46.6,
    marginTop: 8.7,
    marginLeft: 7.2,
    gapX: 2.5,
    gapY: 0.0,
    desc: '63.5 × 46.6 mm (Medium Labels / Avery 7161)'
  },
  {
    id: 'a4_8',
    name: 'A4 — 8 Labels (2 × 4)',
    paper: 'a4',
    cols: 2,
    rows: 4,
    labelWidth: 99.1,
    labelHeight: 67.7,
    marginTop: 13.1,
    marginLeft: 4.7,
    gapX: 2.5,
    gapY: 0.0,
    desc: '99.1 × 67.7 mm (Large Badges / Shipping / Avery 7165)'
  },
  {
    id: 'a4_40',
    name: 'A4 — 40 Labels (4 × 10)',
    paper: 'a4',
    cols: 4,
    rows: 10,
    labelWidth: 48.5,
    labelHeight: 25.4,
    marginTop: 21.5,
    marginLeft: 8.0,
    gapX: 0.0,
    gapY: 0.0,
    desc: '48.5 × 25.4 mm (Micro / Barcode Tags / Avery 7157)'
  },
  {
    id: 'letter_30',
    name: 'Letter — 30 Labels (3 × 10)',
    paper: 'letter',
    cols: 3,
    rows: 10,
    labelWidth: 66.675,
    labelHeight: 25.4,
    marginTop: 12.7,
    marginLeft: 4.76,
    gapX: 3.175,
    gapY: 0.0,
    desc: '2.625 × 1.0 in (Avery 5160 Address Labels)'
  },
  {
    id: 'letter_10',
    name: 'Letter — 10 Labels (2 × 5)',
    paper: 'letter',
    cols: 2,
    rows: 5,
    labelWidth: 101.6,
    labelHeight: 50.8,
    marginTop: 12.7,
    marginLeft: 4.0,
    gapX: 4.0,
    gapY: 0.0,
    desc: '4.0 × 2.0 in (Avery 5163 Shipping Labels)'
  },
  {
    id: 'custom',
    name: 'Custom Grid Settings',
    paper: 'a4',
    cols: 3,
    rows: 8,
    labelWidth: 65.0,
    labelHeight: 35.0,
    marginTop: 10.0,
    marginLeft: 10.0,
    gapX: 2.0,
    gapY: 2.0,
    desc: 'Configure custom row, column, and margin dimensions'
  }
];

export default function PrintStudioModal({ isOpen, onClose, items = [], defaultTitle = '' }) {
  const { t } = useTranslation();

  // Grid Configuration States
  const [selectedPreset, setSelectedPreset] = useState('a4_24');
  const [paperFormat, setPaperFormat] = useState('a4');
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(8);
  const [labelWidth, setLabelWidth] = useState(70.0);
  const [labelHeight, setLabelHeight] = useState(37.0);
  const [marginTop, setMarginTop] = useState(0.5);
  const [marginLeft, setMarginLeft] = useState(0.0);
  const [gapX, setGapX] = useState(0.0);
  const [gapY, setGapY] = useState(0.0);

  // Label Content States
  const [repeatSingle, setRepeatSingle] = useState(items.length <= 1);
  const [singleCopyCount, setSingleCopyCount] = useState(24);
  const [startOffset, setStartOffset] = useState(0); // skip previously peeled stickers
  const [showBorders, setShowBorders] = useState(true);
  const [showCropMarks, setShowCropMarks] = useState(true);
  const [showLabelText, setShowLabelText] = useState(true);
  const [showValueSubtext, setShowValueSubtext] = useState(false);
  const [pureBlackInk, setPureBlackInk] = useState(true); // K:100% monochrome ink optimization
  const [customHeading, setCustomHeading] = useState(defaultTitle || '');
  const [currentPage, setCurrentPage] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  // Apply Preset when changed
  const applyPreset = (presetId) => {
    setSelectedPreset(presetId);
    const p = PRESETS.find(x => x.id === presetId);
    if (!p) return;
    setPaperFormat(p.paper);
    setCols(p.cols);
    setRows(p.rows);
    setLabelWidth(p.labelWidth);
    setLabelHeight(p.labelHeight);
    setMarginTop(p.marginTop);
    setMarginLeft(p.marginLeft);
    setGapX(p.gapX);
    setGapY(p.gapY);
    if (items.length <= 1) {
      setSingleCopyCount(p.cols * p.rows);
    }
  };

  useEffect(() => {
    if (items.length > 1) {
      setRepeatSingle(false);
    } else {
      setRepeatSingle(true);
    }
  }, [items]);

  if (!isOpen) return null;

  const labelsPerPage = cols * rows;
  const paper = PAPERS[paperFormat] || PAPERS.a4;

  // Build the full list of labels to render across all pages
  const labelSequence = [];
  // Add empty slots for start offset (previously used stickers)
  for (let i = 0; i < startOffset; i++) {
    labelSequence.push(null);
  }

  if (repeatSingle) {
    const singleItem = items[0] || { value: 'https://createmy-qr.com', title: customHeading || 'CreateMy-QR' };
    for (let i = 0; i < singleCopyCount; i++) {
      labelSequence.push({
        ...singleItem,
        title: customHeading || singleItem.title || singleItem.label || ''
      });
    }
  } else {
    items.forEach((item, idx) => {
      labelSequence.push({
        ...item,
        title: item.title || item.label || customHeading || `Item #${idx + 1}`
      });
    });
  }

  const totalPages = Math.max(1, Math.ceil(labelSequence.length / labelsPerPage));
  const activePage = Math.min(currentPage, totalPages - 1);
  const pageItems = labelSequence.slice(activePage * labelsPerPage, (activePage + 1) * labelsPerPage);

  // Generate and Download Vector PDF via jsPDF
  const handleDownloadPdf = async () => {
    setIsExporting(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: paperFormat === 'letter' ? 'letter' : 'a4'
      });

      for (let pIdx = 0; pIdx < totalPages; pIdx++) {
        if (pIdx > 0) doc.addPage();

        const currentSlice = labelSequence.slice(pIdx * labelsPerPage, (pIdx + 1) * labelsPerPage);

        // Draw Crop Marks on page edges if enabled
        if (showCropMarks) {
          doc.setDrawColor(180, 180, 180);
          doc.setLineWidth(0.15);
          const markLen = 3;

          // Horizontal marks
          for (let r = 0; r <= rows; r++) {
            const y = marginTop + r * (labelHeight + gapY) - (r > 0 ? gapY / 2 : 0);
            doc.line(marginLeft - markLen - 1, y, marginLeft - 1, y);
            const rightEdge = marginLeft + cols * labelWidth + (cols - 1) * gapX;
            doc.line(rightEdge + 1, y, rightEdge + markLen + 1, y);
          }

          // Vertical marks
          for (let c = 0; c <= cols; c++) {
            const x = marginLeft + c * (labelWidth + gapX) - (c > 0 ? gapX / 2 : 0);
            doc.line(x, marginTop - markLen - 1, x, marginTop - 1);
            const bottomEdge = marginTop + rows * labelHeight + (rows - 1) * gapY;
            doc.line(x, bottomEdge + 1, x, bottomEdge + markLen + 1);
          }
        }

        // Render each label on this page
        for (let i = 0; i < currentSlice.length; i++) {
          const item = currentSlice[i];
          if (!item) continue; // skipped slot

          const colIdx = i % cols;
          const rowIdx = Math.floor(i / cols);

          const cellX = marginLeft + colIdx * (labelWidth + gapX);
          const cellY = marginTop + rowIdx * (labelHeight + gapY);

          // Draw Dotted Outline if enabled
          if (showBorders) {
            doc.setDrawColor(210, 215, 225);
            doc.setLineWidth(0.1);
            doc.setLineDashPattern([1, 1], 0);
            doc.rect(cellX, cellY, labelWidth, labelHeight, 'S');
            doc.setLineDashPattern([], 0); // reset
          }

          // Compute inner element placements
          const centerX = cellX + labelWidth / 2;
          let currentY = cellY + 3;

          // 1. Label Heading
          if (showLabelText && item.title) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8);
            doc.setTextColor(pureBlackInk ? 0 : 40, pureBlackInk ? 0 : 40, pureBlackInk ? 0 : 40);
            const truncatedTitle = item.title.length > 28 ? item.title.slice(0, 26) + '...' : item.title;
            doc.text(truncatedTitle, centerX, currentY + 2, { align: 'center' });
            currentY += 4.5;
          }

          // 2. Code Image (QR or Barcode)
          const availHeight = labelHeight - (currentY - cellY) - (showValueSubtext ? 5 : 2);
          const availWidth = labelWidth - 4;
          const isBarcode = item.type === 'barcode';
          
          const codeSize = isBarcode
            ? { w: Math.min(availWidth, labelWidth * 0.9), h: Math.min(availHeight, 18) }
            : { w: Math.min(availWidth, availHeight, 35), h: Math.min(availWidth, availHeight, 35) };

          const imgX = centerX - codeSize.w / 2;
          const imgY = currentY + (availHeight - codeSize.h) / 2;

          if (item.dataUrl) {
            try {
              doc.addImage(item.dataUrl, 'PNG', imgX, imgY, codeSize.w, codeSize.h);
            } catch (err) {
              console.warn('Could not add image to PDF', err);
            }
          }

          // 3. Subtext (Value / URL)
          if (showValueSubtext && item.value) {
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(6);
            doc.setTextColor(pureBlackInk ? 0 : 100, pureBlackInk ? 0 : 100, pureBlackInk ? 0 : 100);
            const valStr = item.value.length > 35 ? item.value.slice(0, 32) + '...' : item.value;
            doc.text(valStr, centerX, cellY + labelHeight - 2, { align: 'center' });
          }
        }
      }

      doc.save(`createmyqr_sticker_sheet_${paperFormat}_${cols}x${rows}.pdf`);
    } catch (e) {
      console.error('PDF Generation failed:', e);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Direct Browser Print
  const handleDirectPrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      {/* Container */}
      <div className="relative w-full max-w-6xl bg-white dark:bg-[#0a1128] border border-slate-200 dark:border-[#1e2d4a] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-[#1e2d4a] bg-slate-50/50 dark:bg-[#070d1e]/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {t('printStudio.modalTitle', 'Print & Sticker Sheet Studio')}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50">
                  {t('printStudio.proBadge', 'Pro Engine')}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('printStudio.modalSubtitle', '100% Client-Side vector layout for A4 & Letter Avery / Tom & Jerry sticker sheets')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split into Settings (Left) & Sheet Preview (Right) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* Left Column: Settings Panel (5 cols) */}
          <div className="lg:col-span-5 p-6 overflow-y-auto border-r border-slate-200 dark:border-[#1e2d4a] space-y-6">
            
            {/* 1. Sheet Preset Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                <Grid className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> {t('printStudio.presetLabel', 'Sticker Sheet Preset')}
              </label>
              <select
                value={selectedPreset}
                onChange={(e) => applyPreset(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#060b19] border border-slate-200 dark:border-[#1e2d4a] rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.desc}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Paper Format & Grid Details */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 dark:bg-[#060b19] rounded-2xl border border-slate-200 dark:border-[#1e2d4a] text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block mb-1">{t('printStudio.paperFormat', 'Paper Format:')}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPaperFormat('a4')}
                    className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                      paperFormat === 'a4'
                        ? 'bg-gradient-to-r from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-700 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    A4
                  </button>
                  <button
                    onClick={() => setPaperFormat('letter')}
                    className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                      paperFormat === 'letter'
                        ? 'bg-gradient-to-r from-slate-900 to-blue-700 dark:from-blue-600 dark:to-blue-700 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    US Letter
                  </button>
                </div>
              </div>

              <div>
                <span className="text-slate-500 dark:text-slate-400 block mb-1">{t('printStudio.gridStructure', 'Grid Structure:')}</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 block py-1.5">
                  {t('printStudio.colsRowsSummary', '{{cols}} columns × {{rows}} rows ({{total}}/sheet)', { cols, rows, total: cols * rows })}
                </span>
              </div>
            </div>

            {/* Custom Grid Sliders (shown when preset is 'custom') */}
            {selectedPreset === 'custom' && (
              <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 rounded-2xl space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 font-bold">{t('printStudio.cols', 'Columns:')} {cols}</label>
                    <input type="range" min="1" max="6" value={cols} onChange={(e) => setCols(Number(e.target.value))} className="w-full accent-blue-600" />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 font-bold">{t('printStudio.rows', 'Rows:')} {rows}</label>
                    <input type="range" min="1" max="15" value={rows} onChange={(e) => setRows(Number(e.target.value))} className="w-full accent-blue-600" />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 font-bold">{t('printStudio.labelWidth', 'Label Width (mm):')} {labelWidth}</label>
                    <input type="number" value={labelWidth} onChange={(e) => setLabelWidth(Number(e.target.value))} className="w-full px-2 py-1 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700" />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 font-bold">{t('printStudio.labelHeight', 'Label Height (mm):')} {labelHeight}</label>
                    <input type="number" value={labelHeight} onChange={(e) => setLabelHeight(Number(e.target.value))} className="w-full px-2 py-1 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700" />
                  </div>
                </div>
              </div>
            )}

            {/* 3. Distribution & Offset Mode */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> {t('printStudio.allocation', 'Sticker Allocation')}
              </label>

              {items.length <= 1 ? (
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">{t('printStudio.quantity', 'Quantity to Print:')}</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">{t('printStudio.stickersCount', '{{count}} stickers', { count: singleCopyCount })}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max={cols * rows * 5}
                    value={singleCopyCount}
                    onChange={(e) => setSingleCopyCount(Number(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setSingleCopyCount(cols * rows)}
                      className="px-2.5 py-1 text-[11px] font-bold rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                    >
                      {t('printStudio.fill1Page', 'Fill 1 Page ({{count}})', { count: cols * rows })}
                    </button>
                    <button
                      onClick={() => setSingleCopyCount(cols * rows * 2)}
                      className="px-2.5 py-1 text-[11px] font-bold rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                    >
                      {t('printStudio.fill2Pages', 'Fill 2 Pages ({{count}})', { count: cols * rows * 2 })}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-xs p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 rounded-xl text-blue-700 dark:text-blue-300 font-medium">
                  {t('printStudio.bulkSequencing', 'Sequencing {{count}} items from bulk list across {{pages}} page(s).', { count: items.length, pages: totalPages })}
                </div>
              )}

              {/* Start Offset / Skip Used Stickers */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-600 dark:text-slate-400">{t('printStudio.skipPeels', 'Skip Previously Peeled Stickers:')}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{t('printStudio.skipSlots', '{{count}} slots', { count: startOffset })}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={Math.max(0, cols * rows - 1)}
                  value={startOffset}
                  onChange={(e) => setStartOffset(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {t('printStudio.skipDesc', 'Save paper by reusing partially used sticker sheets!')}
                </p>
              </div>
            </div>

            {/* 4. Print Quality & Guide Controls */}
            <div className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-[#1e2d4a]">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> {t('printStudio.guidesAndInks', 'Print Guides & Inks')}
              </label>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-[#060b19] rounded-xl border border-slate-200 dark:border-[#1e2d4a] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pureBlackInk}
                    onChange={(e) => setPureBlackInk(e.target.checked)}
                    className="rounded accent-blue-600"
                  />
                  <div>
                    <span className="font-bold block text-slate-800 dark:text-slate-200">{t('printStudio.k100', 'K:100% Black')}</span>
                    <span className="text-[10px] text-slate-400">{t('printStudio.k100Desc', 'Crisp monochrome')}</span>
                  </div>
                </label>

                <label className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-[#060b19] rounded-xl border border-slate-200 dark:border-[#1e2d4a] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showCropMarks}
                    onChange={(e) => setShowCropMarks(e.target.checked)}
                    className="rounded accent-blue-600"
                  />
                  <div>
                    <span className="font-bold block text-slate-800 dark:text-slate-200">{t('printStudio.cropMarks', 'Crop Marks')}</span>
                    <span className="text-[10px] text-slate-400">{t('printStudio.cropMarksDesc', 'Guillotine guides')}</span>
                  </div>
                </label>

                <label className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-[#060b19] rounded-xl border border-slate-200 dark:border-[#1e2d4a] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showBorders}
                    onChange={(e) => setShowBorders(e.target.checked)}
                    className="rounded accent-blue-600"
                  />
                  <div>
                    <span className="font-bold block text-slate-800 dark:text-slate-200">{t('printStudio.dottedOutlines', 'Dotted Outlines')}</span>
                    <span className="text-[10px] text-slate-400">{t('printStudio.dottedDesc', 'Label boundary')}</span>
                  </div>
                </label>

                <label className="flex items-center gap-2 p-2.5 bg-slate-50 dark:bg-[#060b19] rounded-xl border border-slate-200 dark:border-[#1e2d4a] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showLabelText}
                    onChange={(e) => setShowLabelText(e.target.checked)}
                    className="rounded accent-blue-600"
                  />
                  <div>
                    <span className="font-bold block text-slate-800 dark:text-slate-200">{t('printStudio.labelTitle', 'Label Title')}</span>
                    <span className="text-[10px] text-slate-400">{t('printStudio.labelTitleDesc', 'Top caption')}</span>
                  </div>
                </label>
              </div>

              {showLabelText && (
                <div className="pt-1">
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    {t('printStudio.labelHeading', 'Label Heading Text:')}
                  </label>
                  <input
                    type="text"
                    value={customHeading}
                    onChange={(e) => setCustomHeading(e.target.value)}
                    placeholder={t('printStudio.labelPlaceholder', 'e.g. Scan for Menu / Table 1')}
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-[#060b19] border border-slate-200 dark:border-[#1e2d4a] rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Interactive Sheet Preview (7 cols) */}
          <div className="lg:col-span-7 bg-slate-100 dark:bg-[#050914] p-6 flex flex-col justify-between overflow-y-auto">
            
            {/* Top Toolbar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>{t('printStudio.pageOf', 'Page {{current}} of {{total}}', { current: activePage + 1, total: totalPages })}</span>
                <span className="text-slate-400">•</span>
                <span className="text-blue-600 dark:text-blue-400">{paper.name} ({paper.width} × {paper.height} mm)</span>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-1.5">
                  <button
                    disabled={activePage === 0}
                    onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                    className="p-1 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={activePage >= totalPages - 1}
                    onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                    className="p-1 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Virtual A4 Sheet Scaled Container */}
            <div className="flex-1 flex items-center justify-center p-2 min-h-[420px]">
              <div
                className="relative bg-white shadow-2xl rounded-sm border border-slate-300 transition-all select-none"
                style={{
                  width: '320px',
                  height: `${(320 * paper.height) / paper.width}px`,
                  paddingTop: `${(marginTop / paper.height) * 100}%`,
                  paddingLeft: `${(marginLeft / paper.width) * 100}%`,
                  paddingRight: `${(marginLeft / paper.width) * 100}%`,
                  paddingBottom: `${(marginTop / paper.height) * 100}%`
                }}
              >
                {/* Crop Marks Indicator */}
                {showCropMarks && (
                  <>
                    <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-slate-400 pointer-events-none" />
                    <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-slate-400 pointer-events-none" />
                    <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-slate-400 pointer-events-none" />
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-slate-400 pointer-events-none" />
                  </>
                )}

                {/* Grid Grid */}
                <div
                  className="w-full h-full grid"
                  style={{
                    gridTemplateColumns: `repeat(${cols}, 1fr)`,
                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                    gap: `${(gapY / paper.height) * 100}% ${(gapX / paper.width) * 100}%`
                  }}
                >
                  {Array.from({ length: labelsPerPage }).map((_, slotIdx) => {
                    const item = pageItems[slotIdx];

                    return (
                      <div
                        key={slotIdx}
                        className={`flex flex-col items-center justify-center p-1 relative text-[7px] overflow-hidden ${
                          showBorders ? 'border border-dashed border-slate-300' : ''
                        }`}
                      >
                        {item ? (
                          <>
                            {showLabelText && item.title && (
                              <span className="font-bold text-slate-800 truncate w-full text-center leading-none mb-0.5">
                                {item.title}
                              </span>
                            )}

                            {item.dataUrl ? (
                              <img
                                src={item.dataUrl}
                                alt="Code"
                                className={`object-contain max-h-[80%] max-w-[85%] ${
                                  pureBlackInk ? 'contrast-200' : ''
                                }`}
                              />
                            ) : (
                              <div className="w-5 h-5 bg-slate-900 rounded-xs flex items-center justify-center text-white text-[5px]">
                                QR
                              </div>
                            )}

                            {showValueSubtext && item.value && (
                              <span className="text-slate-400 truncate w-full text-center text-[5px] leading-none mt-0.5">
                                {item.value}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-[6px] text-slate-300 italic">{t('printStudio.emptySlot', 'Empty')}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t border-slate-200 dark:border-[#1e2d4a] flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {t('printStudio.totalStickers', 'Total stickers: {{count}} ({{pages}} pages)', { count: labelSequence.filter(Boolean).length, pages: totalPages })}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDirectPrint}
                  className="px-4 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" /> {t('printStudio.directPrint', 'Direct Print')}
                </button>

                <button
                  disabled={isExporting}
                  onClick={handleDownloadPdf}
                  className="px-5 py-2.5 bg-gradient-to-r from-slate-900 to-blue-700 hover:from-slate-800 hover:to-blue-600 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-500 dark:hover:to-blue-600 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  {isExporting ? t('printStudio.generatingPdf', 'Generating PDF...') : t('printStudio.downloadPdf', 'Download Printable PDF')}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
