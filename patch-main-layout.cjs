const fs = require('fs');

let content = fs.readFileSync('src/layouts/MainLayout.jsx', 'utf8');

// Replace lucide imports
content = content.replace(/import {([^}]+)} from 'lucide-react';/, "import { $1, ChevronDown, QrCode, ScanLine, Scan, Info, Target, LayoutGrid } from 'lucide-react';");

const newNav = `
            <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
              {/* Dropdown Menu */}
              <div className="relative group">
                <button className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-br from-[#1551c6] to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full text-[15px] font-bold tracking-wide transition-all shadow-md">
                  <LayoutGrid className="w-4 h-4" />
                  {t('nav.allTools', 'All Tools')}
                  <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
                </button>

                {/* Dropdown Content */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-[280px]">
                  <div className="bg-white dark:bg-[#081226] rounded-3xl shadow-[0_30px_80px_-15px_rgba(0,0,0,0.3)] border border-blue-100 dark:border-[#102040] overflow-hidden p-2 flex flex-col gap-1">
                    <a href={\`\${currentLangCode === 'en' ? '' : '/' + currentLangCode}/\`} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-blue-50 dark:hover:bg-[#102040] transition-colors group/item">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2.5 rounded-xl text-blue-600 dark:text-blue-400 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-zinc-900 dark:text-white">{t('nav.generator', 'QR Generator')}</span>
                        <span className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400">{t('nav.generatorDesc', 'Create 34+ QR Types')}</span>
                      </div>
                    </a>
                    
                    <a href={\`\${currentLangCode === 'en' ? '' : '/' + currentLangCode}\${localizedRoutes[currentLangCode]?.['barcode'] || '/barcode-generator'}\`} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-blue-50 dark:hover:bg-[#102040] transition-colors group/item">
                      <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2.5 rounded-xl text-indigo-600 dark:text-indigo-400 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors">
                        <ScanLine className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-zinc-900 dark:text-white">{t('nav.barcode', 'Barcode Maker')}</span>
                        <span className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400">{t('nav.barcodeDesc', '1D/2D Pro Barcodes')}</span>
                      </div>
                    </a>
                    
                    <a href={\`\${currentLangCode === 'en' ? '' : '/' + currentLangCode}\${localizedRoutes[currentLangCode]?.['scanqr'] || '/scan-qr'}\`} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-blue-50 dark:hover:bg-[#102040] transition-colors group/item">
                      <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2.5 rounded-xl text-emerald-600 dark:text-emerald-400 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors">
                        <Scan className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-zinc-900 dark:text-white">{t('nav.scan', 'Scan QR')}</span>
                        <span className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400">{t('nav.scanDesc', 'Read from Camera')}</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <a href={\`\${currentLangCode === 'en' ? '' : '/' + currentLangCode}/about\`} className="text-[15px] font-bold text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.about', 'About')}</a>
              <a href={\`\${currentLangCode === 'en' ? '' : '/' + currentLangCode}/compare\`} className="text-[15px] font-bold text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.compare', 'Compare')}</a>
            </div>`;

content = content.replace(/<div className="hidden lg:flex items-center gap-10 absolute left-1\/2 -translate-x-1\/2">[\s\S]*?<\/div>/, newNav.trim());

fs.writeFileSync('src/layouts/MainLayout.jsx', content);
