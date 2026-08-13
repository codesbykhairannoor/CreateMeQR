
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import InputForm from '../components/InputForm';
const CustomizationPanel = React.lazy(() => import('../components/CustomizationPanel'));
import Preview from '../components/Preview';

export default function QrWorkspace({ qrType, setQrTypeRoute, currentSeo, pseoUseCase }) {
  const { t } = useTranslation();
  const [qrData, setQrData] = useState({});
  const [hasGenerated, setHasGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState('data');
  const [visuals, setVisuals] = useState({
    dotsOptions: { color: '#0a1930', type: 'square' },
    backgroundOptions: { color: '#ffffff' },
    image: null,
    imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 10 },
    cornersSquareOptions: { type: 'square', color: '#0a1930' },
    cornersDotOptions: { type: 'square', color: '#0a1930' },
    qrOptions: { errorCorrectionLevel: 'Q' }
  });

  useEffect(() => {
    const handleRestore = () => {
      const savedStr = sessionStorage.getItem('restore_qr_data');
      if (savedStr) {
        try {
          const item = JSON.parse(savedStr);
          setQrTypeRoute(item.qrType);
          setQrData(item.qrData);
          setVisuals(item.visuals);
          setHasGenerated(true);
          sessionStorage.removeItem('restore_qr_data');
        } catch (e) {
          console.error('Failed to restore history', e);
        }
      }
    };
    
    window.addEventListener('restore-qr-history', handleRestore);
    // Trigger on mount in case it was set before component loaded
    handleRestore();
    
    return () => window.removeEventListener('restore-qr-history', handleRestore);
  }, [setQrTypeRoute]);

  const renderHighlightedTitle = (title) => {
    if (!title) return null;
    const match = title.match(/QR(?:[-\s]+[A-Za-z0-9а-яА-Я]+)?/i);
    const highlightClass = "text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-blue-700 dark:from-blue-300 dark:to-blue-600 pr-[4px]";
    
    if (!match) {
      const words = title.split(' ');
      if (words.length <= 2) return <span className={highlightClass}>{title}</span>;
      return <><span className={highlightClass}>{words.slice(0, 2).join(' ')}</span> {words.slice(2).join(' ')}</>;
    }
    
    const parts = title.split(match[0]);
    return (
      <>
        {parts[0]}
        <span className={highlightClass}>{match[0]}</span>
        {parts.slice(1).join(match[0])}
      </>
    );
  };

  return (
    <>
      {/* Premium Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 text-center mb-24 pt-32">
        <div className="animate-fade-in-up">
          <h1 
            className="text-[clamp(2rem,5vw,4rem)] font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.15] text-balance max-w-[900px] mx-auto"
          >
            {renderHighlightedTitle(currentSeo.h1Title)}
          </h1>
          <p className="text-[1.1rem] text-zinc-500 dark:text-zinc-400 max-w-[800px] mx-auto mb-10 font-normal leading-[1.6]">
            {currentSeo.description || t('tagline')}
          </p>
        </div>
      </section>

      {/* Generator Application Workspace */}
      <section className="max-w-7xl mx-auto px-6 mb-32 lg:mb-48">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#f8fafc] dark:bg-[#040a18] border border-blue-100 dark:border-[#102040] rounded-[40px] p-4 lg:p-8 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.1)] dark:shadow-none">
          <div className="sr-only" aria-hidden="true">
            <h2>{t('seoCore.h2')}</h2>
            <p>{t('seoCore.body')}</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-1 flex flex-col animate-fade-in-right">
            <div className="flex space-x-2 bg-blue-100/50 dark:bg-[#081226]/80 p-1.5 rounded-2xl mb-8 border border-blue-100/50 dark:border-[#102040]/50">
              <button onClick={() => setActiveTab('data')} className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${activeTab === 'data' ? 'bg-gradient-to-br from-slate-900 to-blue-700 dark:from-[#020617] dark:to-blue-600 text-white shadow-md border-transparent' : 'text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white'}`}>
                {t('tabs.step1')}
              </button>
              <button onClick={() => hasGenerated && setActiveTab('design')} className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${activeTab === 'design' ? 'bg-gradient-to-br from-slate-900 to-blue-700 dark:from-[#020617] dark:to-blue-600 text-white shadow-md border-transparent' : 'text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white'} ${!hasGenerated ? 'cursor-not-allowed opacity-50' : ''}`}>
                {t('tabs.step2')}
              </button>
            </div>
            <div className="bg-white dark:bg-[#081226] border border-blue-100 dark:border-[#102040] rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-[500px]">
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {activeTab === 'data' ? (
                  <div key={qrType} className="animate-fade-in-up-fast">
                    <InputForm qrType={qrType} setQrType={setQrTypeRoute} qrData={qrData} setQrData={setQrData} hasGenerated={hasGenerated} setHasGenerated={setHasGenerated} setActiveTab={setActiveTab} />
                  </div>
                ) : (
                  <div key={qrType + '-design'} className="p-2 animate-fade-in-up-fast">
                    <React.Suspense fallback={<div className="p-12 text-center text-zinc-500 font-medium tracking-tight">Loading premium tools...</div>}>
                      <CustomizationPanel visuals={visuals} setVisuals={setVisuals} />
                    </React.Suspense>
                  </div>
                )}
              </div>
            </div>
            {pseoUseCase && pseoUseCase.infoGain && (
              <div className="mt-8 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6 shadow-sm animate-fade-in-up">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-xl shrink-0 mt-1">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Use Case Insight</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[0.95rem]">{pseoUseCase.infoGain}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-5 flex justify-center sticky top-24">
            <Preview qrType={qrType} qrData={qrData} visuals={visuals} hasGenerated={hasGenerated} />
          </div>
        </div>
      </section>

      {/* pSEO Premium Expert Insights (replaces standard FAQs) */}
      {pseoUseCase && pseoUseCase.faqs && pseoUseCase.faqs.length > 0 && (
        <section className="max-w-[1200px] mx-auto px-6 mb-32 mt-12">
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm tracking-widest uppercase mb-4 shadow-sm border border-blue-100 dark:border-blue-800/50">
              {t('pseo.insights_badge', 'Pro Guide')}
            </span>
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-[900] tracking-tight text-zinc-900 dark:text-white leading-[1.2]">
              {t('pseo.insights_title', 'Expert Insights & Best Practices')}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pseoUseCase.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-[#081226] border border-zinc-200 dark:border-[#102040] rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)] relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-xl mb-6 shadow-sm border border-blue-100 dark:border-blue-800/30">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 leading-snug">{faq.q}</h3>
                <p className="text-[1.05rem] text-zinc-600 dark:text-zinc-400 leading-relaxed mt-auto">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
