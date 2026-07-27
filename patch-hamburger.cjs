const fs = require('fs');
const path = 'src/layouts/MainLayout.jsx';
let content = fs.readFileSync(path, 'utf8');

const targetBtn = `<button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-blue-50 dark:hover:bg-[#040a18] transition-all">\n              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}\n            </button>`;

const newBtn = `<button onClick={() => setShowMobileNav(!showMobileNav)} className="lg:hidden p-2.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-blue-50 dark:hover:bg-[#040a18] transition-all">\n              {showMobileNav ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}\n            </button>`;

content = content.replace(targetBtn, newBtn);

const navEndStr = `</nav>\n\n      <main className="flex-1 pb-20">`;
const overlayStr = `</nav>\n\n      {/* Mobile Navigation Overlay */}\n      {showMobileNav && (\n        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-white/95 dark:bg-[#040a18]/95 backdrop-blur-3xl overflow-y-auto">\n          <MobileNav currentLangCode={currentLangCode} onClose={() => setShowMobileNav(false)} darkMode={darkMode} setDarkMode={setDarkMode} />\n        </div>\n      )}\n\n      <main className="flex-1 pb-20">`;

content = content.replace(navEndStr, overlayStr);

fs.writeFileSync(path, content);
console.log('Mobile menu button and overlay injected successfully.');
