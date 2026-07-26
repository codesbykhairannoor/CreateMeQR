const fs = require('fs');

const path = 'src/layouts/MainLayout.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add imports
if (!content.includes('import MobileNav')) {
  content = content.replace(
    "import MegaNav from '../components/nav/MegaNav';",
    "import MegaNav from '../components/nav/MegaNav';\nimport MobileNav from '../components/nav/MobileNav';"
  );
}

if (content.includes("import { Globe, Moon, Sun, X } from 'lucide-react';")) {
  content = content.replace(
    "import { Globe, Moon, Sun, X } from 'lucide-react';",
    "import { Globe, Moon, Sun, X, Menu } from 'lucide-react';"
  );
} else if (content.includes("import { Globe, Moon, Sun, X, Menu } from 'lucide-react';")) {
  // Already there
}

// 2. Add state
if (!content.includes('const [showMobileNav, setShowMobileNav]')) {
  content = content.replace(
    "const [showLangMenu, setShowLangMenu] = useState(false);",
    "const [showLangMenu, setShowLangMenu] = useState(false);\n  const [showMobileNav, setShowMobileNav] = useState(false);"
  );
}

// 3. Add hamburger button next to dark mode toggle
const dmToggleStr = `<button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-blue-50 dark:hover:bg-[#040a18] transition-all">\n              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}\n            </button>`;

const newButtonsStr = `<button onClick={() => setDarkMode(!darkMode)} className="p-2.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-blue-50 dark:hover:bg-[#040a18] transition-all">\n              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}\n            </button>\n            \n            <button onClick={() => setShowMobileNav(!showMobileNav)} className="lg:hidden p-2.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-blue-50 dark:hover:bg-[#040a18] transition-all">\n              {showMobileNav ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}\n            </button>`;

if (content.includes(dmToggleStr) && !content.includes('setShowMobileNav(!showMobileNav)')) {
  content = content.replace(dmToggleStr, newButtonsStr);
}

// 4. Add the mobile menu overlay below the <nav> element
const navEndStr = `</nav>\n\n      <main className="flex-1 pb-20">`;
const overlayStr = `</nav>\n\n      {/* Mobile Navigation Overlay */}\n      {showMobileNav && (\n        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-white/95 dark:bg-[#040a18]/95 backdrop-blur-3xl overflow-y-auto">\n          <MobileNav currentLangCode={currentLangCode} onClose={() => setShowMobileNav(false)} />\n        </div>\n      )}\n\n      <main className="flex-1 pb-20">`;

if (content.includes(navEndStr) && !content.includes('Mobile Navigation Overlay')) {
  content = content.replace(navEndStr, overlayStr);
}

fs.writeFileSync(path, content);
console.log('MainLayout patched for MobileNav');
