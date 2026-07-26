const fs = require('fs');
const file = 'src/layouts/MainLayout.jsx';
let content = fs.readFileSync(file, 'utf8');

// Ensure import MegaNav
if (!content.includes('import MegaNav')) {
  content = content.replace(
    "import { localizedRoutes, routeToToolMap } from '../config/localizedRoutes';",
    "import MegaNav from '../components/nav/MegaNav';\nimport { localizedRoutes, routeToToolMap } from '../config/localizedRoutes';"
  );
}

// Ensure relative on the container
content = content.replace(
  '<div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">',
  '<div className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">'
);

// Inject MegaNav
const targetStr = `          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/logoqr.png" alt="CreateMy-QR Logo" className="w-8 h-8 rounded-xl object-contain shadow-sm" />
            <span className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">CreateMy-QR</span>
          </div>`;

const replacement = `          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src="/logoqr.png" alt="CreateMy-QR Logo" className="w-8 h-8 rounded-xl object-contain shadow-sm" />
            <span className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">CreateMy-QR</span>
          </div>
          
          <MegaNav currentLangCode={currentLangCode} />`;

if (!content.includes('<MegaNav')) {
  content = content.replace(targetStr, replacement);
}

fs.writeFileSync(file, content);
