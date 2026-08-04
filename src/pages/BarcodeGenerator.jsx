import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Barcode from 'react-barcode';
import { Download, Share2, Printer, ScanLine, Settings2, BarChart2, Hash, Layers, CheckCircle2, Factory, PackageOpen } from 'lucide-react';

export default function BarcodeGenerator() {
  const { t } = useTranslation();
  
  // Barcode states
  const [value, setValue] = useState('123456789012');
  const [format, setFormat] = useState('CODE128');
  const [lineColor, setLineColor] = useState('#000000');
  const [background, setBackground] = useState('#ffffff');
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(100);
  const [displayValue, setDisplayValue] = useState(true);

  const barcodeRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDownload = () => {
    if (!barcodeRef.current) return;
    const svg = barcodeRef.current.querySelector('svg');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width + 40; // Add padding
      canvas.height = img.height + 40;
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 20, 20);
      
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `barcode_${format}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };


  const LivePreviewCard = () => (
    <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-8 shadow-2xl border border-blue-700/50 flex flex-col h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none"></div>
      
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <BarChart2 className="w-6 h-6 text-blue-400" />
        <h2 className="text-2xl font-bold text-white tracking-tighter">{t("barcode.workspace.liveOutput", "Live Output")}</h2>
      </div>
      
      <div className="flex-1 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 relative z-10 min-h-[300px]">
        <div 
          ref={barcodeRef} 
          className="bg-white p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
          style={{ backgroundColor: background }}
        >
          {value ? (
            <Barcode 
              value={value} 
              format={format} 
              lineColor={lineColor}
              background={background}
              width={width}
              height={height}
              displayValue={displayValue}
              margin={0}
            />
          ) : (
            <div className="w-64 h-24 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 font-bold">
              <p className="text-slate-500 dark:text-slate-400 font-medium">{t("barcode.workspace.enterData", "Enter data to generate")}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 space-y-4 relative z-10">
        <button 
          onClick={handleDownload}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-2 hover:-translate-y-1"
        >
          <Download className="w-5 h-5" /> {t("barcode.workspace.download", "Download High-Res PNG")}
        </button>
      </div>
    </div>
  );

  return (
    <div className="font-sans overflow-hidden bg-slate-50 dark:bg-[#020617] min-h-screen pb-32 transition-colors duration-300">
      <Helmet>
        <title>{t("barcode.seo.title", "Free Barcode Generator Online - Create 1D Barcodes")}</title>
        <meta name="description" content={t("barcode.seo.desc", "Generate high-quality 1D Barcodes like CODE128, EAN, UPC, and more instantly for free. Download in PNG.")} />
      </Helmet>

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 dark:from-blue-900/10 via-slate-50 dark:via-[#020617] to-slate-50 dark:to-[#020617] transition-colors duration-300"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter dark:text-white tracking-tighter mb-6 leading-[1.05]">
            {t("barcode.hero.title", "Generate")} <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-blue-700 dark:from-blue-300 dark:to-blue-600 pr-[4px]">{t("barcode.hero.titleHighlight", "Barcodes")}</span> {t("barcode.hero.titleSuffix", "Instantly")}
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            {t("barcode.hero.desc", "Create high-quality inventory tags, shipping labels, and retail codes in seconds.")}
          </p>
        </div>
      </section>

      {/* Workspace UI (Industrial/Dashboard Layout) */}
      <section className="max-w-7xl mx-auto px-6 mt-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Settings (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white dark:bg-[#0a1128] border border-slate-200 dark:border-[#1e2d4a] rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100 dark:border-[#1e2d4a]">
                <Hash className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                <h2 className="text-2xl font-bold tracking-tighter dark:text-white tracking-tighter">{t("barcode.workspace.dataTitle", "Barcode Data")}</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t("barcode.workspace.contentLabel", "Barcode Content")}</label>
                  <input 
                    type="text" 
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#020617] border border-slate-300 dark:border-[#1e2d4a] text-slate-900 dark:text-white rounded-xl px-5 py-4 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg font-mono"
                    placeholder={t("barcode.workspace.contentPlaceholder", "Enter numbers or text...")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t("barcode.workspace.formatLabel", "Barcode Standard / Format")}</label>
                  <select 
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#020617] border border-slate-300 dark:border-[#1e2d4a] text-slate-900 dark:text-white rounded-xl px-5 py-4 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg appearance-none cursor-pointer"
                  >
                    <option value="CODE128">CODE128 (Versatile, Alphanumeric)</option>
                    <option value="UPC">UPC-A (North American Retail)</option>
                    <option value="EAN13">EAN-13 (Global Retail)</option>
                    <option value="EAN8">EAN-8 (Small Packages)</option>
                    <option value="ITF14">ITF-14 (Shipping & Logistics)</option>
                    <option value="CODE39">CODE39 (Automotive & Defense)</option>
                    <option value="pharmacode">Pharmacode (Pharmaceutical)</option>
                  </select>
                </div>
              </div>
            </div>

            {isMobile && <LivePreviewCard />}

            <div className="bg-white dark:bg-[#0a1128] border border-slate-200 dark:border-[#1e2d4a] rounded-3xl p-8 shadow-xl flex-1">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100 dark:border-[#1e2d4a]">
                <Settings2 className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                <h2 className="text-2xl font-bold tracking-tighter dark:text-white tracking-tighter">{t("barcode.workspace.visualTitle", "Visual Tuning")}</h2>
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
            <Layers className="w-4 h-4" /> Comprehensive Standards
          </div>
          <h2 className="text-4xl font-bold tracking-tighter text-zinc-900 dark:text-white">{t("barcode.features.standardsTitle", "Supported Barcode Formats")}</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            {t("barcode.features.standardsDesc", "Choose the right standard for your industry. From retail checkout to warehouse logistics.")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-[#0a1128] p-10 rounded-[2.5rem] border border-slate-200 dark:border-[#1e2d4a] shadow-lg hover:shadow-2xl transition-all group">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform">
              <ScanLine className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold tracking-tighter dark:text-white mb-4">CODE-128</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              {t("barcode.features.c128Desc", "Highly compact and versatile. Supports the full ASCII character set. Ideal for general inventory and internal tracking systems.")}
            </p>
          </div>
          <div className="bg-white dark:bg-[#0a1128] p-10 rounded-[2.5rem] border border-slate-200 dark:border-[#1e2d4a] shadow-lg hover:shadow-2xl transition-all group">
            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform">
              <Hash className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold tracking-tighter dark:text-white mb-4">ITF-14</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              {t("barcode.features.itf14Desc", "Designed for packaging levels like cartons or pallets. Uses thick borders to improve scanning accuracy on corrugated cardboard.")}
            </p>
          </div>
          <div className="bg-white dark:bg-[#0a1128] p-10 rounded-[2.5rem] border border-slate-200 dark:border-[#1e2d4a] shadow-lg hover:shadow-2xl transition-all group">
            <div className="w-16 h-16 bg-green-50 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform">
              <BarChart2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold tracking-tighter dark:text-white mb-4">UPC / EAN</h3>
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
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter dark:text-white tracking-tighter">{t("barcode.features.mfgTitle", "Built for Production & Logistics")}</h2>
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
            <h2 className="text-4xl font-bold tracking-tighter dark:text-white mb-6">{t("barcode.features.ecoTitle", "Perfect for E-Commerce & Retail")}</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium mb-10 leading-relaxed">
              {t("barcode.features.ecoDesc", "Whether you are listing a new product on Amazon (FBA) or setting up your own Shopify storefront, generating UPC and EAN codes is required for global distribution.")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => { setFormat('UPC'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl transition-transform hover:-translate-y-1 shadow-xl"
              >
                Generate UPC Code Now
              </button>
              <button 
                onClick={() => { setFormat('EAN13'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-[#1e2d4a] text-slate-900 dark:text-white font-bold border border-slate-200 dark:border-transparent rounded-xl transition-transform hover:-translate-y-1 shadow-sm"
              >
                Generate EAN-13 Code Now
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
