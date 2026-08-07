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
        <title>{t("scanbarcode.seo.title", "Free QR Code Scanner Online - Scan QR Instantly")}</title>
        <meta name="description" content={t("scanbarcode.seo.desc", "Scan QR codes instantly using your camera or by uploading an image. 100% secure, private, and client-side processing.")} />
      </Helmet>

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-slate-200 dark:border-blue-900/30 transition-colors duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 dark:from-blue-900/30 via-slate-50 dark:via-[#040814] to-slate-50 dark:to-[#040814] transition-colors duration-300"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter dark:text-white tracking-tighter mb-6 leading-[1.05]">
            {t("scanbarcode.hero.title", "Instant")} <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-blue-700 dark:from-blue-300 dark:to-blue-600 pr-[4px]">{t("scanbarcode.hero.titleHighlight", "QR Scanner")}</span>
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
                    <p className="text-sm text-slate-600 dark:text-slate-400">{t("scanbarcode.workspace.waitingDesc", "Point your camera at a QR code or upload an image.")}</p>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Feature Section 1 */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-200 dark:border-[#1e2d4a]">
        <h2 className="text-4xl font-bold text-center mb-16 tracking-tighter text-zinc-900 dark:text-white">{t("scanbarcode.features.whyTitle", "Why use our Scanner?")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-[#0a1128] p-10 rounded-[2.5rem] border border-slate-200 dark:border-[#1e2d4a] hover:border-blue-500/30 transition-all group shadow-xl">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Camera className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">{t("scanbarcode.features.noAppTitle", "No App Required")}</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              {t("scanbarcode.features.noAppDesc", "Scan QR codes directly from your browser without downloading any bloated apps. Works perfectly on iOS, Android, and Desktop.")}
            </p>
          </div>
          <div className="bg-white dark:bg-[#0a1128] p-10 rounded-[2.5rem] border border-slate-200 dark:border-[#1e2d4a] hover:border-blue-500/30 transition-all group shadow-xl">
            <div className="w-16 h-16 bg-indigo-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Lock className="w-8 h-8 text-indigo-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">{t("scanbarcode.features.secureTitle", "100% Secure & Private")}</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              {t("scanbarcode.features.secureDesc", "Your images and camera feed are processed entirely on your device. We never send your scan data to any external servers.")}
            </p>
          </div>
          <div className="bg-white dark:bg-[#0a1128] p-10 rounded-[2.5rem] border border-slate-200 dark:border-[#1e2d4a] hover:border-blue-500/30 transition-all group shadow-xl">
            <div className="w-16 h-16 bg-purple-50 dark:bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">{t("scanbarcode.features.fastTitle", "Lightning Fast")}</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              {t("scanbarcode.features.fastDesc", "Optimized WASM engine decodes complex QR codes instantly, even in low light conditions or with blurry cameras.")}
            </p>
          </div>
        </div>
      </section>

      {/* Feature Section 2 (New Layout) */}
      <section className="bg-blue-600 dark:bg-blue-900 py-24 mt-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 blur-[100px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
              {t("scanbarcode.features.moreTitle", "More Than Just URLs.")}
            </h2>
            <p className="text-xl text-blue-100 font-medium leading-relaxed">
              {t("scanbarcode.features.moreDesc", "Our advanced scanner instantly recognizes various payload types. It doesn't just read the text, it understands the context.")}
            </p>
            <ul className="space-y-4 text-white font-bold text-lg">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><ShieldCheck className="w-4 h-4" /></div>
                {t("scanbarcode.features.moreList1", "WiFi Credentials Parsing")}
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><ShieldCheck className="w-4 h-4" /></div>
                {t("scanbarcode.features.moreList2", "vCard Contact Import")}
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><ShieldCheck className="w-4 h-4" /></div>
                {t("scanbarcode.features.moreList3", "Crypto Addresses")}
              </li>
            </ul>
          </div>
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 dark:from-blue-900 to-transparent z-10"></div>
            <div className="bg-white/10 p-8 rounded-3xl border border-white/20 backdrop-blur-xl transform rotate-3 shadow-2xl">
              <div className="flex items-center gap-4 mb-6 border-b border-white/20 pb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                  <Smartphone className="text-white w-6 h-6" />
                </div>
                <div>
                  <div className="text-white font-bold text-xl">WIFI:S:MyNetwork;T:WPA;P:1234;;</div>
                  <div className="text-blue-200 text-sm">Decoded in 40ms</div>
                </div>
              </div>
              <div className="flex items-center gap-4 border-b border-white/20 pb-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
                  <Globe className="text-white w-6 h-6" />
                </div>
                <div>
                  <div className="text-white font-bold text-xl">https://createmy-qr.com/</div>
                  <div className="text-blue-200 text-sm">Decoded in 35ms</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 3 (Supported Formats Grid) */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tighter text-zinc-900 dark:text-white">{t("scanbarcode.features.formatTitle", "Universal Format Support")}</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">{t("scanbarcode.features.formatDesc", "Upload an image containing any of these 2D barcodes, and we will decode it instantly right in your browser.")}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['QR Code', 'Micro QR', 'Aztec Code', 'Data Matrix', 'PDF417', 'MaxiCode', 'DotCode', 'GS1 DataBar'].map(fmt => (
            <div key={fmt} className="bg-white dark:bg-[#0a1128] border border-slate-200 dark:border-[#1e2d4a] py-6 px-4 rounded-2xl text-center font-bold text-slate-800 dark:text-slate-200 shadow-sm hover:shadow-md transition-shadow">
              {fmt}
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
}
