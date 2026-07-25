const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src/App.jsx');
let appContent = fs.readFileSync(appPath, 'utf8');

// We need to extract the state and the workspace into QrWorkspace.jsx
const qrWorkspaceContent = `
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputForm from '../components/InputForm';
const CustomizationPanel = React.lazy(() => import('../components/CustomizationPanel'));
import Preview from '../components/Preview';

export default function QrWorkspace({ qrType, setQrTypeRoute, currentSeo }) {
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

  return (
    <>
      {/* Premium Hero Section */}
      <section className="max-w-4xl mx-auto px-6 text-center mb-24">
        <div className="animate-fade-in-up">
          <h1 className="text-[clamp(44px,7vw,80px)] font-bold text-zinc-900 dark:text-white tracking-tighter mb-6 leading-[1.05]">
            {currentSeo.h1Title}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            {t('tagline')}
          </p>
          <div className="text-sm text-zinc-500 dark:text-zinc-400 max-w-3xl mx-auto text-center">
            <strong className="text-zinc-900 dark:text-white mr-2">{t('geo.title')}</strong> {t('geo.fact')}
          </div>
        </div>
      </section>

      {/* Generator Application Workspace */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#f8fafc] dark:bg-[#040a18] border border-blue-100 dark:border-[#102040] rounded-[40px] p-4 lg:p-8 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.1)] dark:shadow-none">
          <div className="sr-only" aria-hidden="true">
            <h2>{t('seoCore.h2')}</h2>
            <p>{t('seoCore.body')}</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-1 flex flex-col animate-fade-in-right">
            <div className="flex space-x-2 bg-blue-100/50 dark:bg-[#081226]/80 p-1.5 rounded-2xl mb-8 border border-blue-100/50 dark:border-[#102040]/50">
              <button onClick={() => setActiveTab('data')} className={\`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all \${activeTab === 'data' ? 'bg-gradient-to-br from-slate-900 to-blue-700 dark:from-[#020617] dark:to-blue-600 text-white shadow-md border-transparent' : 'text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white'}\`}>
                {t('tabs.step1')}
              </button>
              <button onClick={() => hasGenerated && setActiveTab('design')} className={\`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all \${activeTab === 'design' ? 'bg-gradient-to-br from-slate-900 to-blue-700 dark:from-[#020617] dark:to-blue-600 text-white shadow-md border-transparent' : 'text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white'} \${!hasGenerated ? 'cursor-not-allowed opacity-50' : ''}\`}>
                {t('tabs.step2')}
              </button>
            </div>
            <div className="bg-white dark:bg-[#081226] border border-blue-100 dark:border-[#102040] rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-[500px]">
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {activeTab === 'data' ? (
                  <InputForm qrType={qrType} setQrType={setQrTypeRoute} qrData={qrData} setQrData={setQrData} hasGenerated={hasGenerated} setHasGenerated={setHasGenerated} setActiveTab={setActiveTab} />
                ) : (
                  <div className="p-2 animate-fade-in-up-fast">
                    <React.Suspense fallback={<div className="p-12 text-center text-zinc-500 font-medium tracking-tight">Loading premium tools...</div>}>
                      <CustomizationPanel visuals={visuals} setVisuals={setVisuals} />
                    </React.Suspense>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center sticky top-24">
            <Preview qrType={qrType} qrData={qrData} visuals={visuals} hasGenerated={hasGenerated} />
          </div>
        </div>
      </section>
    </>
  );
}
`;

const pagesDir = path.join(__dirname, 'src/pages');
if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir, { recursive: true });
fs.writeFileSync(path.join(pagesDir, 'QrWorkspace.jsx'), qrWorkspaceContent, 'utf8');
console.log('✅ Created src/pages/QrWorkspace.jsx');
