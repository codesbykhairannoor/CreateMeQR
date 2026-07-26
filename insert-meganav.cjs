const fs = require('fs');

let content = fs.readFileSync('src/layouts/MainLayout.jsx', 'utf8');

// Ensure MegaNav is imported
if (!content.includes("import MegaNav")) {
  content = content.replace(
    "import { localizedRoutes, routeToToolMap } from '../config/localizedRoutes';",
    "import MegaNav from '../components/nav/MegaNav';\nimport { localizedRoutes, routeToToolMap } from '../config/localizedRoutes';"
  );
}

// Ensure lucide icons needed in MegaNav are available? No, MegaNav imports its own icons!
// But MainLayout needs some icons? It already has Globe, Moon, Sun, X. Let's make sure it's clean.

// Inject <MegaNav /> after the logo div
const logoEnd = `            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>\n              <img src="/logoqr.png" alt="CreateMy-QR Logo" className="w-8 h-8 rounded-xl object-contain shadow-sm" />\n              <span className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">CreateMy-QR</span>\n            </div>`;

if (!content.includes("<MegaNav")) {
  content = content.replace(logoEnd, logoEnd + '\n            \n            <MegaNav currentLangCode={currentLangCode} />');
}

fs.writeFileSync('src/layouts/MainLayout.jsx', content);
