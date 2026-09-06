import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Lock, Cpu, EyeOff, GlobeLock, CheckCircle2 } from 'lucide-react';

export default function Security() {
  const { t } = useTranslation();

  return (
    <>
<main className="w-full flex-1 bg-[#040814] text-white overflow-hidden">
        
        {/* Section 1: Hero */}
        <section className="relative w-full pt-32 pb-24 px-6 overflow-hidden bg-slate-950 border-b border-[#1e2d4a]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-900/30 text-emerald-400 rounded-full font-bold text-sm mb-8 tracking-wider border border-emerald-500/20 backdrop-blur-md">
              <ShieldCheck size={16} /> {t('static.security.heroBadge', 'Trust Center')}
            </div>
            <h1 className="text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold mb-8 tracking-tight leading-[1.1] bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
              {t('static.security.heroTitle', 'Security Architecture')}
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium">
              {t('static.security.heroSubtitle', 'Mathematical Privacy. Zero Uploads. Most QR tools promise they delete your files after 1 hour. We promise we never see them.')}
            </p>
          </div>
        </section>

        {/* Section 2: Architecture Diagram (Visual) */}
        <section className="w-full py-32 px-6 relative">
          <div className="max-w-6xl mx-auto relative z-10">
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold text-center mb-16 leading-[1.1]">
              {t('static.security.wasmTitle', 'The WebAssembly Revolution')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-[#0a1128]/80 backdrop-blur-xl p-10 rounded-[2rem] border border-[#1e2d4a] relative shadow-xl hover:-translate-y-2 transition-transform duration-500 group">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform text-slate-400">
                  <Lock size={32} />
                </div>
                <h3 className="text-2xl font-extrabold mb-4">{t('static.security.step1Title', '1. Local Selection')}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">
                  {t('static.security.step1Desc', 'You select a file. The browser locks the file in local memory. No network request is initiated.')}
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="bg-[#0a1128]/80 backdrop-blur-xl p-10 rounded-[2rem] border-2 border-emerald-500 relative shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:-translate-y-2 transition-transform duration-500 group z-10 scale-105">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform text-white shadow-lg">
                  <Cpu size={32} />
                </div>
                <h3 className="text-2xl font-extrabold mb-4">{t('static.security.step2Title', '2. Wasm Engine')}</h3>
                <p className="text-slate-300 leading-relaxed font-medium">
                  {t('static.security.step2Desc', 'Our engine runs compiled WebAssembly directly on your CPU to process the code offline.')}
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-[#0a1128]/80 backdrop-blur-xl p-10 rounded-[2rem] border border-[#1e2d4a] relative shadow-xl hover:-translate-y-2 transition-transform duration-500 group">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform text-slate-400">
                  <GlobeLock size={32} />
                </div>
                <h3 className="text-2xl font-extrabold mb-4">{t('static.security.step3Title', '3. Direct Save')}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">
                  {t('static.security.step3Desc', 'The processed code is reconstructed in memory and saved directly to your hard drive.')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Safe Analytics */}
        <section className="w-full py-32 px-6 bg-[#0a1128]/50 border-y border-[#1e2d4a]">
          <div className="max-w-4xl mx-auto text-center">
            <EyeOff size={64} className="mx-auto mb-8 text-slate-500" />
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold mb-8 leading-[1.1]">
              {t('static.security.analyticsTitle', 'Your Documents Are Blind To Us')}
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed font-medium">
              {t('static.security.analyticsDesc', 'While we use standard analytics to improve our website experience, our scripts never touch your documents. We do not extract metadata, text contents, or images. The sandbox is entirely self-contained.')}
            </p>
          </div>
        </section>

        {/* Section 4: Compliance List */}
        <section className="w-full py-32 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold mb-8 leading-[1.1]">
                {t('static.security.complianceTitle', 'Compliance by Default')}
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed font-medium mb-8">
                {t('static.security.complianceDesc', 'Because CreateMy-QR cannot access your files, using our tools automatically complies with the strictest data protection laws worldwide.')}
              </p>
              <ul className="space-y-4">
                <li className="flex gap-4 items-center text-slate-200 font-bold text-lg">
                  <CheckCircle2 size={24} className="text-emerald-500 shrink-0" /> {t('static.security.comp1', 'HIPAA (Healthcare Data)')}
                </li>
                <li className="flex gap-4 items-center text-slate-200 font-bold text-lg">
                  <CheckCircle2 size={24} className="text-emerald-500 shrink-0" /> {t('static.security.comp2', 'GDPR (European Privacy)')}
                </li>
                <li className="flex gap-4 items-center text-slate-200 font-bold text-lg">
                  <CheckCircle2 size={24} className="text-emerald-500 shrink-0" /> {t('static.security.comp3', 'CCPA (California Privacy)')}
                </li>
                <li className="flex gap-4 items-center text-slate-200 font-bold text-lg">
                  <CheckCircle2 size={24} className="text-emerald-500 shrink-0" /> {t('static.security.comp4', 'NDA Protected Files')}
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <GlobeLock size={180} strokeWidth={1} className="text-slate-800" />
            </div>
          </div>
        </section>

        {/* Section 5: Academic Research Dossier */}
        <section className="w-full py-32 px-6 bg-slate-950 border-y border-[#1e2d4a] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-600/5 blur-[160px] rounded-full pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-950/60 text-emerald-400 rounded-full font-bold text-xs uppercase tracking-widest mb-6 border border-emerald-500/30 backdrop-blur-md">
                <ShieldCheck size={14} /> {t('research.securityResearch.badge', 'Peer-Reviewed Security & Zero-Trust Architecture')}
              </div>
              <h2 className="text-[clamp(1.8rem,4vw,2.75rem)] font-extrabold tracking-tight leading-[1.15] bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-6">
                {t('research.securityResearch.title', 'Academic Research Dossier on QR Vulnerabilities')}
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed font-medium">
                {t('research.securityResearch.subtitle', 'Our client-side architecture is directly informed by peer-reviewed research analyzing QR redirect hijacking and zero-trust data integrity.')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Paper 1: IEEE ARES */}
              <div className="bg-[#0a1128]/90 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-emerald-500/20 shadow-2xl relative group hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between">
                <div className="absolute top-6 right-6 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 font-mono text-xs font-semibold">
                  {t('research.securityResearch.paper1Doi', 'DOI: 10.1109/ARES.2015.42')}
                </div>
                <div>
                  <div className="text-xs font-bold font-mono uppercase tracking-widest text-emerald-400/80 mb-3">
                    {t('research.securityResearch.paper1Cite', 'IEEE ARES Conference (2015)')}
                  </div>
                  <h3 className="text-2xl font-extrabold text-white mb-4 leading-snug">
                    {t('research.securityResearch.paper1Title', 'Mitigating QR Code Phishing (Quishing)')}
                  </h3>
                  <p className="text-slate-300 leading-relaxed font-medium mb-6">
                    {t('research.securityResearch.paper1Desc', 'Academic analysis detailing how intermediary redirect servers expose end users to phishing. CreateMeQR eliminates the man-in-the-middle vector by encoding static destination payloads locally.')}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#1e2d4a] flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Architecture: Direct-to-Payload</span>
                  <span className="text-emerald-400 font-bold">Zero Intermediate hops</span>
                </div>
              </div>

              {/* Paper 2: NIST SP 800-207 */}
              <div className="bg-[#0a1128]/90 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-blue-500/20 shadow-2xl relative group hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between">
                <div className="absolute top-6 right-6 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 font-mono text-xs font-semibold">
                  {t('research.securityResearch.paper2Doi', 'NIST SP 800-207 Standard')}
                </div>
                <div>
                  <div className="text-xs font-bold font-mono uppercase tracking-widest text-blue-400/80 mb-3">
                    {t('research.securityResearch.paper2Cite', 'NIST Special Publication 800-207')}
                  </div>
                  <h3 className="text-2xl font-extrabold text-white mb-4 leading-snug">
                    {t('research.securityResearch.paper2Title', 'NIST Zero Trust Architecture')}
                  </h3>
                  <p className="text-slate-300 leading-relaxed font-medium mb-6">
                    {t('research.securityResearch.paper2Desc', 'Implementing "never trust, always verify" data hygiene by executing all rasterization and vector rendering in an isolated client memory boundary.')}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#1e2d4a] flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Security Sandbox: Isolated Wasm VM</span>
                  <span className="text-blue-400 font-bold">Zero Data Ingestion</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Verify Yourself */}
        <section className="w-full py-32 px-6 bg-slate-950 border-b border-[#1e2d4a]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold mb-8 text-center leading-[1.1]">
              {t('static.security.verifyTitle', 'Don\'t Trust Us. Verify It.')}
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed text-center mb-16 font-medium">
              {t('static.security.verifyDesc', 'You don\'t have to take our word for it. You can prove our offline guarantee yourself in 3 simple steps:')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 bg-[#0a1128] rounded-2xl border border-[#1e2d4a] text-center">
                <div className="text-emerald-500 font-extrabold text-xl mb-4">{t('static.security.step1', 'Step 1')}</div>
                <p className="text-slate-300 font-medium">{t('static.security.verify1', 'Load CreateMy-QR.com in your browser.')}</p>
              </div>
              <div className="p-8 bg-[#0a1128] rounded-2xl border border-[#1e2d4a] text-center">
                <div className="text-emerald-500 font-extrabold text-xl mb-4">{t('static.security.step2', 'Step 2')}</div>
                <p className="text-slate-300 font-medium">{t('static.security.verify2', 'Turn off your Wi-Fi or unplug your internet.')}</p>
              </div>
              <div className="p-8 bg-[#0a1128] rounded-2xl border border-[#1e2d4a] text-center">
                <div className="text-emerald-500 font-extrabold text-xl mb-4">{t('static.security.step3', 'Step 3')}</div>
                <p className="text-slate-300 font-medium">{t('static.security.verify3', 'Generate any QR. It works perfectly, proving no server is required.')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Mission */}
        <section className="w-full py-32 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <Lock size={64} className="mx-auto mb-8 text-slate-500" />
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold mb-8 leading-[1.1]">
              {t('static.security.missionTitle', 'The Future is Local')}
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed font-medium">
              {t('static.security.missionDesc', 'We envision a web where utility apps respect your hardware and your privacy. Welcome to the new era of client-side computing.')}
            </p>
          </div>
        </section>

      </main>
    </>
  );
}
