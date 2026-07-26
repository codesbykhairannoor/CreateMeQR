const fs = require('fs');
let content = fs.readFileSync('src/layouts/MainLayout.jsx', 'utf8');

// Add import if missing
if (!content.includes("import MegaNav")) {
  content = content.replace(
    "import { localizedRoutes",
    "import MegaNav from '../components/nav/MegaNav';\nimport { localizedRoutes"
  );
}

// Ensure the parent nav div has relative class (for absolute positioning of MegaNav)
if (!content.includes('className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"')) {
  content = content.replace(
    'className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"',
    'className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"'
  );
}

// Inject <MegaNav currentLangCode={currentLangCode} /> after the logo div
const searchTarget = '<span className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">CreateMy-QR</span>\n          </div>';
const injectStr = '\n\n          <MegaNav currentLangCode={currentLangCode} />\n';

if (content.includes(searchTarget) && !content.includes('<MegaNav currentLangCode')) {
  content = content.replace(searchTarget, searchTarget + injectStr);
  fs.writeFileSync('src/layouts/MainLayout.jsx', content);
  console.log("Successfully injected MegaNav!");
} else {
  console.log("Failed to find injection target or already injected.");
}
