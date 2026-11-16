import React from 'react';
import { useTranslation } from 'react-i18next';
import { Scale, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Terms() {
  const { t } = useTranslation();

  return (
    <>
<main className="w-full flex-1 bg-slate-50 dark:bg-[#040814] text-slate-900 dark:text-white overflow-hidden">
        
        {/* Section 1: Hero Ledger */}
        <section className="relative w-full pt-32 pb-24 px-6 overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-400/20 dark:bg-slate-700/20 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-400/20 dark:bg-slate-700/20 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Scale size={80} className="text-slate-700 dark:text-slate-400 mx-auto mb-8 animate-[pulse_3s_ease-in-out_infinite]" />
            <h1 className="text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold mb-8 tracking-tight leading-[1.1] text-slate-900 dark:text-white">
              {t('static.terms.heroTitle', 'Terms of Service')}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium">
              {t('static.terms.heroSubtitle', 'Simple, transparent, and fair. Read the terms that govern the usage of the CreateMy-QR platform.')}
            </p>
            <div className="mt-12 inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#0a1128] text-slate-700 dark:text-slate-400 rounded-full font-bold text-sm tracking-wider border border-slate-200 dark:border-[#1e2d4a] shadow-xl">
              <CheckCircle2 size={16} /> {t('static.terms.lastUpdated', 'Last Updated: November 2026')}
            </div>
          </div>
        </section>

        {/* Section 2: Agreement & Accessibility */}
        <section className="w-full py-24 px-6 relative z-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 text-white font-extrabold text-2xl shadow-xl">1</div>
              <h2 className="text-[clamp(1.6rem,4vw,2.5rem)] font-extrabold leading-[1.1]">
                {t('static.terms.sec1Title', 'Agreement to Terms')}
              </h2>
            </div>
            <div className="pl-24">
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {t('static.terms.sec1Desc', 'By accessing and using CreateMy-QR, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you do not have permission to access the Service. Our platform is provided completely free of charge for both personal and commercial use.')}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Local Processing Guarantee */}
        <section className="w-full py-24 px-6 bg-white/50 dark:bg-[#060c1c]/50 backdrop-blur-xl border-y border-slate-200 dark:border-[#102040]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 text-white font-extrabold text-2xl shadow-xl">2</div>
              <h2 className="text-[clamp(1.6rem,4vw,2.5rem)] font-extrabold leading-[1.1]">
                {t('static.terms.sec2Title', 'Local Processing Guarantee')}
              </h2>
            </div>
            <div className="pl-24">
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-8">
                {t('static.terms.sec2Desc', 'CreateMy-QR provides tools that execute strictly within your local browser environment via WebAssembly. We guarantee that:')}
              </p>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <ShieldCheck size={28} className="text-emerald-500 shrink-0 mt-1" />
                  <span className="text-xl text-slate-700 dark:text-slate-300 font-medium">
                    {t('static.terms.sec2Bul1', 'Your files are never uploaded to our servers or any third-party infrastructure.')}
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <ShieldCheck size={28} className="text-emerald-500 shrink-0 mt-1" />
                  <span className="text-xl text-slate-700 dark:text-slate-300 font-medium">
                    {t('static.terms.sec2Bul2', 'We do not retain copies of your data, metadata, or processed documents.')}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Acceptable Use Policy */}
        <section className="w-full py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 text-white font-extrabold text-2xl shadow-xl">3</div>
              <h2 className="text-[clamp(1.6rem,4vw,2.5rem)] font-extrabold leading-[1.1]">
                {t('static.terms.usage', 'Acceptable Use Policy')}
              </h2>
            </div>
            <div className="pl-24">
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {t('static.terms.usageDesc', 'You agree to use CreateMy-QR only for lawful purposes. You must not use our tools to forge, manipulate, or falsify legal documents, government IDs, or any materials for fraudulent activities.')}
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Intellectual Property */}
        <section className="w-full py-24 px-6 bg-white/50 dark:bg-[#060c1c]/50 backdrop-blur-xl border-y border-slate-200 dark:border-[#102040]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 text-white font-extrabold text-2xl shadow-xl">4</div>
              <h2 className="text-[clamp(1.6rem,4vw,2.5rem)] font-extrabold leading-[1.1]">
                {t('static.terms.sec4Title', 'Intellectual Property')}
              </h2>
            </div>
            <div className="pl-24">
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {t('static.terms.sec4Desc', 'You retain 100% ownership and all intellectual property rights to the documents you process using CreateMy-QR. We claim zero rights, licenses, or ownership over your content.')}
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Limitations & Modifications */}
        <section className="w-full py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-6 mb-12">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 text-white font-extrabold text-2xl shadow-xl">5</div>
              <h2 className="text-[clamp(1.6rem,4vw,2.5rem)] font-extrabold leading-[1.1]">
                {t('static.terms.sec5Title', 'Disclaimers & Liability')}
              </h2>
            </div>
            <div className="pl-24 space-y-12">
              <div>
                <h3 className="text-2xl font-extrabold mb-4">{t('static.terms.liability', 'No Liability')}</h3>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {t('static.terms.liabilityDesc', 'The tools are provided "as is" without warranties. We are not liable for any issues arising from generated codes.')}
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold mb-4">{t('static.terms.localData', 'Local Data')}</h3>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {t('static.terms.localDataDesc', 'Your history is stored in your own browser via IndexedDB. If you clear your browser data, your history is permanently deleted.')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Service Continuity, Lifetime Definition & Operational Cessation */}
        <section className="w-full py-24 px-6 bg-white/50 dark:bg-[#060c1c]/50 backdrop-blur-xl border-t border-slate-200 dark:border-[#102040]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-6 mb-10">
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 dark:from-slate-600 dark:to-slate-800 text-white font-extrabold text-2xl shadow-xl">6</div>
              <h2 className="text-[clamp(1.6rem,4vw,2.5rem)] font-extrabold leading-[1.1]">
                {t('static.terms.sec6Title', 'Service Continuity, Lifetime Access & Unforeseen Discontinuation')}
              </h2>
            </div>
            
            <div className="pl-24 space-y-10">
              <div>
                <h3 className="text-2xl font-extrabold mb-3 text-slate-900 dark:text-white">
                  {t('static.terms.sec6LifetimeTitle', 'Meaning of "Lifetime" Access')}
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {t('static.terms.sec6LifetimeDesc', '"Lifetime Access" refers specifically to the commercial and operational lifespan of the CreateMy-QR service, not the natural biological lifespan of the buyer nor an unconditional guarantee of eternity until the end of time. While we endeavor to maintain the service online for as long as feasible, digital products are subject to evolving internet infrastructure, browser technologies, and operational sustainability.')}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold mb-3 text-slate-900 dark:text-white">
                  {t('static.terms.sec6CessationTitle', 'Founder Incapacitation, Cessation of Operations & Force Majeure')}
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {t('static.terms.sec6CessationDesc', 'CreateMy-QR is an independently developed and managed software tool. In the unforeseen event that operations become commercially unviable, technical infrastructure ceases to be available, or the founder/maintainer faces permanent incapacitation, severe illness, or death, the service may be suspended, archived, or permanently shut down. Users and purchasers expressly acknowledge that no personal, financial, or legal liability, nor any obligation for continued maintenance or pro-rata refunds, shall transfer to the founder, their family, or their estate in such circumstances.')}
                </p>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
                  <h3 className="text-lg sm:text-xl font-bold text-blue-900 dark:text-blue-200">
                    {t('static.terms.sec6StaticGuaranteeTitle', 'Permanent Independence of Generated Static QR Codes')}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-blue-800/90 dark:text-blue-300/90 leading-relaxed font-normal">
                  {t('static.terms.sec6StaticGuaranteeDesc', 'Because CreateMy-QR operates 100% on the client side using WebAssembly and strictly encodes direct data into ISO/IEC 18004 standard static barcodes without intermediary cloud redirect servers, every QR code, barcode, image (PNG/SVG), or printed sticker sheet you export remains completely functional forever. Even if this website, domain, or hosting is discontinued in the future, your printed codes will never expire or stop scanning.')}
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
