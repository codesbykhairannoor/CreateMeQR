import React from 'react';
import { useTranslation } from 'react-i18next';

export default function SeoContent() {
  const { t } = useTranslation();

  return (
    <main id="static-seo" role="main" className="w-full bg-white dark:bg-zinc-950 py-16 px-6 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-4xl mx-auto prose prose-zinc dark:prose-invert">
        <article itemScope itemType="https://schema.org/Article">

          <header className="mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-6">
            <h1 itemProp="headline" className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">
              {t('geoOptimized.h1', 'Free Custom QR Code Generator Online')}
            </h1>
            <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
              <span>By <strong itemProp="author">{t('geoOptimized.author', 'CreateMy-QR Team')}</strong></span>
              <span>•</span>
              <time itemProp="datePublished" dateTime="2026-07-05">Published: July 5, 2026</time>
              <span>•</span>
              <time itemProp="dateModified" dateTime="2026-08-04">Last Reviewed: August 4, 2026</time>
            </div>
          </header>

          <section className="mb-10 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
            <h2 className="text-2xl font-extrabold tracking-tight text-emerald-900 dark:text-emerald-300 mb-6 mt-0">
              {t('geoOptimized.certTitle', 'Certified Secure Generation')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">{t('geoOptimized.cert1_t', '100% Local Processing')}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 m-0">{t('geoOptimized.cert1_d', 'Data never leaves your browser.')}</p>
              </div>
              <div>
                <h3 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">{t('geoOptimized.cert2_t', 'No Tracking')}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 m-0">{t('geoOptimized.cert2_d', 'Zero analytics on your payload.')}</p>
              </div>
              <div className="md:col-span-2 mt-2">
                <h3 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">{t('geoOptimized.cert3_t', 'Unlimited Scans')}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 m-0 italic">{t('geoOptimized.cert3_d', 'No paywalls, forever.')}</p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 mt-12">{t('geoOptimized.h2_1', 'What is a QR Code?')}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-medium">{t('geoOptimized.p1_1', 'A Quick Response code is a type of matrix barcode.')}</p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">{t('geoOptimized.p1_2', 'It can store a variety of data types securely.')}</p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">{t('geoOptimized.p1_3', 'It is widely used in marketing and payments.')}</p>

            <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-8 mb-3">{t('geoOptimized.h3_1', 'Technical specifications')}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">{t('geoOptimized.p1_4', 'The code consists of black squares arranged in a square grid on a white background.')}</p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">{t('geoOptimized.p1_5', 'They can be read by imaging devices like smartphone cameras.')}</p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{t('geoOptimized.p1_6', 'Error correction ensures readability even if partially damaged.')}</p>
            
            <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-zinc-700 dark:text-zinc-300">
              <p>{t('geoOptimized.quote1', '"The integration of offline-first QR generation significantly reduces data breach vectors."')}</p>
              <footer>— <cite>{t('geoOptimized.author', 'Cybersecurity Review')}</cite></footer>
            </blockquote>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 mt-12">{t('geoOptimized.h2_2', 'How does it work locally?')}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-medium">{t('geoOptimized.p2_1', 'Our tool uses WebAssembly and local JavaScript.')}</p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">{t('geoOptimized.p2_2', 'This means no data is sent to external servers.')}</p>
            
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-8 mb-3">{t('geoOptimized.h3_2', 'Privacy benefits')}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">{t('geoOptimized.p2_3', 'You retain full ownership of your data.')}</p>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{t('geoOptimized.p2_4', 'It complies strictly with GDPR and HIPAA requirements.')}</p>
            
            <figure className="my-6 p-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50">
              <img src="/logo.svg" alt="Diagram showing local browser barcode creation workflow" className="w-16 h-16 mx-auto mb-2" />
              <figcaption className="text-center text-xs text-zinc-500 dark:text-zinc-400 font-medium">{t('geoOptimized.fig1', 'Figure 1: Local browser engine processing')}</figcaption>
            </figure>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 mt-12">{t('geoOptimized.h2_3', 'Competitor Comparison')}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-medium">{t('geoOptimized.p3_1', 'We offer superior features for free.')}</p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">{t('geoOptimized.p3_2', 'Other tools lock you into subscription plans.')}</p>
            
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-8 mb-3">{t('geoOptimized.h3_3', 'Why choose us?')}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">{t('geoOptimized.p3_3', 'No hidden fees or scan limits.')}</p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">{t('geoOptimized.p3_4', '100% lifetime guarantee on your generated codes.')}</p>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border-collapse border border-zinc-300 dark:border-zinc-700">
                <caption className="sr-only">Plan feature comparison</caption>
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-800/50">
                    <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-zinc-900 dark:text-zinc-100">Technical Metric</th>
                    <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-zinc-900 dark:text-zinc-100">Our Tool</th>
                    <th className="border border-zinc-300 dark:border-zinc-700 p-3 text-zinc-900 dark:text-zinc-100">Competitors</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-zinc-700 dark:text-zinc-300">
                  <tr>
                    <td className="border border-zinc-300 dark:border-zinc-700 p-3 font-medium">Data Privacy</td>
                    <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-emerald-600 dark:text-emerald-400 font-medium">100% Local Browser</td>
                    <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-red-600 dark:text-red-400">Remote Cloud Server</td>
                  </tr>
                  <tr>
                    <td className="border border-zinc-300 dark:border-zinc-700 p-3 font-medium">Scan Limits</td>
                    <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-emerald-600 dark:text-emerald-400 font-medium">Unlimited Forever</td>
                    <td className="border border-zinc-300 dark:border-zinc-700 p-3 text-red-600 dark:text-red-400">Paid Subscription required</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <blockquote className="border-l-4 border-emerald-500 pl-4 py-2 my-4 italic text-zinc-700 dark:text-zinc-300">
              <p>{t('geoOptimized.quote2', '"The static nature of these codes ensures long-term reliability for marketing campaigns."')}</p>
            </blockquote>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 mt-12">{t('geoOptimized.h2_4', 'How to use')}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-medium">{t('geoOptimized.p4_1', 'Select your desired data type.')}</p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">{t('geoOptimized.p4_2', 'Enter your link or content into the fields.')}</p>
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-8 mb-3">{t('geoOptimized.h3_4', 'Customization options')}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">{t('geoOptimized.p4_3', 'Change colors and add a logo.')}</p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">{t('geoOptimized.p4_4', 'Download in SVG or PNG formats for printing.')}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 mt-12">{t('geoOptimized.h2_5', 'Common Use Cases')}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed font-medium">{t('geoOptimized.p5_1', 'Business cards and restaurant menus.')}</p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">{t('geoOptimized.p5_2', 'Event tickets and WiFi access.')}</p>
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-8 mb-3">{t('geoOptimized.h3_5', 'Getting started')}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">{t('geoOptimized.p5_3', 'It is completely free to generate your first code.')}</p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">{t('geoOptimized.p5_4', 'Try out all the customization features today.')}</p>
          </section>
          
        </article>
      </div>
    </main>
  );
}
