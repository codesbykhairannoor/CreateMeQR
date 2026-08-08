import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Html5Qrcode } from 'html5-qrcode';
import { Scan, ScanLine, Upload, Copy, ExternalLink, RefreshCw, AlertCircle, Camera, Smartphone, Globe, ShieldCheck, Zap, Lock } from 'lucide-react';

export default function ScanBarcode() {
  const { t } = useTranslation();
  
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  
  const html5QrCode = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isScanning) {
      startScanner();
    } else {
      stopScanner();
    }
    return () => {
      stopScanner();
    };
  }, [isScanning]);

  const startScanner = async () => {
    try {
      if (!html5QrCode.current) {
        html5QrCode.current = new Html5Qrcode("reader");
      }
      await html5QrCode.current.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 320, height: 150 } },
        (decodedText) => {
          setScanResult(decodedText);
          setIsScanning(false);
          setError('');
        },
        (errorMessage) => {
          // Ignore frequent scanning errors
        }
      );
    } catch (err) {
      setError(t("scanbarcode.workspace.errCam", "Failed to start camera. Please ensure you have granted camera permissions."));
      setIsScanning(false);
    }
  };

  const stopScanner = () => {
    if (html5QrCode.current && html5QrCode.current.isScanning) {
      html5QrCode.current.stop().catch(console.error);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      // Create a fresh instance for file uploads to avoid conflicts with camera scanner state
      const fileScanner = new Html5Qrcode("reader-hidden");
      const decodedText = await fileScanner.scanFile(file, true);
      setScanResult(decodedText);
      setError('');
    } catch (err) {
      setError(t("scanbarcode.workspace.errImg", "No QR code found in the image. Please try another image."));
      setScanResult('');
    }
    
    event.target.value = '';
  };

  const handleCopy = () => {
    if (!scanResult) return;
    navigator.clipboard.writeText(scanResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isUrl = (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="font-sans overflow-hidden bg-slate-50 dark:bg-[#040814] text-slate-900 dark:text-white min-h-screen pb-32 transition-colors duration-300">
      <Helmet>
        <title>{t("scanbarcode.seo.title", "Free Barcode Scanner Online - Scan UPC & EAN")}</title>
        <meta name="description" content={t("scanbarcode.seo.desc", "Scan barcodes online for free using your device's camera or upload an image. Supports UPC, EAN, Code 128 and more. 100% private and secure.")} />
      </Helmet>

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-slate-200 dark:border-blue-900/30 transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 dark:from-blue-900/30 via-slate-50 dark:via-[#040814] to-slate-50 dark:to-[#040814] transition-colors duration-300"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter dark:text-white tracking-tighter mb-6 leading-[1.05]">
            {t("scanbarcode.hero.title", "Instant")} <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-blue-700 dark:from-blue-300 dark:to-blue-600 pr-[4px]">{t("scanbarcode.hero.titleHighlight", "Barcode Scanner")}</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            {t("scanbarcode.hero.desc", "Scan from your webcam or upload an image. 100% private, zero data is sent to our servers.")}
          </p>
        </div>
      </section>

      {/* Workspace UI (Cyber/Scanner Layout) */}
      <section className="max-w-5xl mx-auto px-6 mt-12 mb-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="bg-white/80 dark:bg-[#0a1128]/80 backdrop-blur-2xl border border-slate-200 dark:border-[#1e2d4a] rounded-[40px] p-8 md:p-12 shadow-2xl dark:shadow-[0_0_80px_rgba(16,185,129,0.1)] relative z-10 transition-colors duration-300">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Scanner Action Area */}
            <div className="space-y-8">
              {!isScanning && !scanResult && (
                <div className="border-2 border-dashed border-blue-300 dark:border-blue-500/30 rounded-3xl p-12 text-center bg-blue-50 dark:bg-blue-500/5 hover:bg-blue-100 dark:hover:bg-blue-500/10 transition-colors">
                  <div className="w-24 h-24 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 relative group cursor-pointer" onClick={() => setIsScanning(true)}>
                    <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20"></div>
                    <Camera className="w-10 h-10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tighter dark:text-white mb-2">{t("scanbarcode.workspace.initCam", "Initialize Camera")}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-8">{t("scanbarcode.workspace.initCamDesc", "Scan a QR code using your device's camera")}</p>
                  
                  <button 
                    onClick={() => setIsScanning(true)}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 hover:opacity-90 text-white dark:text-slate-900 font-black rounded-xl shadow-xl dark:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all transform hover:-translate-y-1"
                  >
                    Start Scanning
                  </button>
                </div>
              )}

              {isScanning && (
                <div className="rounded-3xl overflow-hidden border-2 border-blue-500 relative bg-slate-100 dark:bg-black shadow-2xl dark:shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                  <div id="reader" className="w-full"></div>
                  <button 
                    onClick={() => setIsScanning(false)}
                    className="absolute top-4 right-4 bg-red-500/80 hover:bg-red-500 text-white px-4 py-2 rounded-lg backdrop-blur-sm font-bold text-sm transition-colors z-20"
                  >
                    Cancel
                  </button>
                  <div className="absolute inset-0 border-t-2 border-blue-400 opacity-50 animate-scan pointer-events-none"></div>
                </div>
              )}

              {scanResult && !isScanning && (
                <div className="border-2 border-dashed border-slate-200 dark:border-blue-500/30 rounded-3xl p-8 text-center bg-white dark:bg-blue-500/5 transition-colors">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tighter dark:text-white mb-6">{t("scanbarcode.workspace.successTitle", "Scan Successful")}</h3>
                  <button 
                    onClick={() => { setScanResult(''); setIsScanning(true); }}
                    className="w-full py-4 bg-blue-100 dark:bg-blue-500/20 hover:bg-blue-200 dark:hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Camera className="w-5 h-5 mr-2" /> {t("scanbarcode.workspace.startBtn", "Start Scanning")}
                  </button>
                </div>
              )}

              {!isScanning && (
                <div className="pt-8 border-t border-slate-200 dark:border-[#1e2d4a]">
                  <p className="text-center text-sm font-bold text-slate-500 dark:text-slate-400 mb-6 uppercase tracking-widest">{t("scanbarcode.workspace.orUpload", "Or upload an image")}</p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                    className="hidden" 
                    ref={fileInputRef}
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-5 bg-slate-100 dark:bg-[#060b19] hover:bg-slate-200 dark:hover:bg-[#101b38] border border-slate-200 dark:border-[#1e2d4a] hover:border-blue-500/50 text-slate-700 dark:text-slate-300 font-bold rounded-2xl transition-all flex items-center justify-center gap-3"
                  >
                    <Upload className="w-5 h-5" /> {t("scanbarcode.workspace.uploadBtn", "Upload QR Image File")}
                  </button>
                  {/* Hidden div for file scanning */}
                  <div id="reader-hidden" style={{ display: 'none' }}></div>
                </div>
              )}
            </div>

            {/* Right: Results Area */}
            <div>
              <div className="bg-slate-50 dark:bg-[#02040a] rounded-3xl p-8 border border-slate-200 dark:border-[#1e2d4a] min-h-[400px] flex flex-col relative overflow-hidden transition-colors duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 dark:bg-blue-500/10 blur-[50px] rounded-full pointer-events-none"></div>
                
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b border-slate-200 dark:border-[#1e2d4a] pb-4 text-zinc-900 dark:text-white">
                  <ScanLine className="w-6 h-6 text-blue-600 dark:text-blue-400" /> Decoded Result
                </h3>

                {error && (
                  <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-start gap-3 mb-6">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">{error}</p>
                  </div>
                )}

                {scanResult ? (
                  <div className="flex-1 flex flex-col">
                    <div className="bg-white dark:bg-[#0a1128] border border-blue-200 dark:border-blue-500/30 rounded-2xl p-6 mb-8 flex-1 shadow-sm">
                      <p className="text-slate-800 dark:text-blue-100 font-mono break-all text-lg leading-relaxed">
                        {scanResult}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={handleCopy}
                        className="py-4 bg-slate-200 dark:bg-[#1e2d4a] hover:bg-slate-300 dark:hover:bg-[#2a3d60] text-slate-800 dark:text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                      >
                        {copied ? <span className="text-blue-600 dark:text-blue-400">{t("scanbarcode.workspace.copied", "Copied!")}</span> : <><Copy className="w-5 h-5" /> Copy Data</>}
                      </button>
                      
                      {isUrl(scanResult) ? (
                        <a 
                          href={scanResult}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-4 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-400 text-white dark:text-slate-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
                        >
                          <ExternalLink className="w-5 h-5" /> {t("scanbarcode.workspace.openLink", "Open Link")}
                        </a>
                      ) : (
                        <div className="py-4 bg-slate-100 dark:bg-slate-800/50 text-slate-400 font-bold rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">
                          {t("scanbarcode.workspace.notLink", "Not a link")}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40">
                    <Scan className="w-20 h-20 mb-6 text-blue-500" />
                    <p className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{t("scanbarcode.workspace.waiting", "Waiting for scan...")}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{t("scanbarcode.workspace.waitingDesc", "Point your camera at a barcode or upload an image.")}</p>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white dark:bg-[#0a1128] py-24 border-t border-slate-200 dark:border-[#1e2d4a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-4">{t("scanbarcode.howto.title", "How to Scan a Barcode")}</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{t("scanbarcode.howto.subtitle", "Three simple steps to decode any product barcode instantly.")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-100 via-blue-500 to-blue-100 dark:from-blue-900/20 dark:via-blue-500/50 dark:to-blue-900/20 z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white dark:bg-[#040814] rounded-full border-4 border-blue-100 dark:border-blue-900 flex items-center justify-center mb-6 shadow-xl">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white">{t("scanbarcode.howto.step1Title", "Allow Access")}</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium">{t("scanbarcode.howto.step1Desc", "Click 'Start Scanning' and allow browser access to your device's camera.")}</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white dark:bg-[#040814] rounded-full border-4 border-blue-100 dark:border-blue-900 flex items-center justify-center mb-6 shadow-xl">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white">{t("scanbarcode.howto.step2Title", "Align Barcode")}</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium">{t("scanbarcode.howto.step2Desc", "Hold your product steady and align the barcode within the horizontal viewfinder.")}</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white dark:bg-[#040814] rounded-full border-4 border-blue-100 dark:border-blue-900 flex items-center justify-center mb-6 shadow-xl">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white">{t("scanbarcode.howto.step3Title", "View Results")}</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium">{t("scanbarcode.howto.step3Desc", "The barcode will be decoded instantly. You can copy the code or search it online.")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 1 (Bento Box Layout) */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-200 dark:border-[#1e2d4a]">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tighter text-zinc-900 dark:text-white max-w-2xl">{t("scanbarcode.features.whyTitle", "Industrial-Grade Barcode Engine")}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Card */}
          <div className="md:col-span-8 bg-gradient-to-br from-indigo-500 to-indigo-700 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
                <ScanLine className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4 text-white">{t("scanbarcode.features.retailTitle", "Retail & Inventory Ready")}</h3>
                <p className="text-indigo-100 font-medium leading-relaxed text-lg max-w-lg">
                  {t("scanbarcode.features.retailDesc", "Instantly decode product barcodes like UPC, EAN, and ISBN directly from your browser. No dedicated hardware scanners needed—your phone's camera is now an inventory tool.")}
                </p>
              </div>
            </div>
          </div>

          {/* Side Cards */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="bg-white dark:bg-[#0a1128] p-8 rounded-[2.5rem] border border-slate-200 dark:border-[#1e2d4a] hover:border-indigo-500/30 transition-all flex-1 shadow-xl">
              <Zap className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">{t("scanbarcode.features.fastTitle", "High-Speed Decoding")}</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium text-sm leading-relaxed">
                {t("scanbarcode.features.fastDesc", "Powered by WebAssembly, our engine processes frames in milliseconds for rapid consecutive scanning.")}
              </p>
            </div>
            
            <div className="bg-white dark:bg-[#0a1128] p-8 rounded-[2.5rem] border border-slate-200 dark:border-[#1e2d4a] hover:border-indigo-500/30 transition-all flex-1 shadow-xl">
              <ShieldCheck className="w-8 h-8 text-teal-600 dark:text-teal-400 mb-6" />
              <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-white">{t("scanbarcode.features.privacyTitle", "100% Private")}</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium text-sm leading-relaxed">
                {t("scanbarcode.features.privacyDesc", "Barcode processing happens entirely in your local memory. We never transmit your camera feed.")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2 (Supported Formats Spec Sheet) */}
      <section className="bg-zinc-900 dark:bg-black py-24 mt-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[100px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-6">
              {t("scanbarcode.formats.title", "Universal 1D/2D Support.")}
            </h2>
            <p className="text-lg text-zinc-400 font-medium leading-relaxed mb-8">
              {t("scanbarcode.formats.desc", "Our engine natively recognizes the most common linear barcodes used in logistics, retail, and healthcare, alongside complex 2D matrices.")}
            </p>
          </div>
          
          <div className="lg:w-2/3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: 'EAN-13', type: 'Retail' },
                { name: 'UPC-A', type: 'Retail' },
                { name: 'Code 128', type: 'Logistics' },
                { name: 'Code 39', type: 'Industrial' },
                { name: 'ITF-14', type: 'Packaging' },
                { name: 'Codabar', type: 'Logistics' },
                { name: 'EAN-8', type: 'Retail' },
                { name: 'UPC-E', type: 'Retail' },
                { name: 'Data Matrix', type: '2D' }
              ].map((fmt, i) => (
                <div key={i} className="bg-zinc-800/50 border border-zinc-700 p-4 rounded-2xl flex flex-col">
                  <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-1">{t(`scanbarcode.formats.type.${fmt.type}`, fmt.type)}</span>
                  <span className="text-zinc-100 font-bold font-mono">{fmt.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
