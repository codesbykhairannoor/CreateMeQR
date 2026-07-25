const fs = require('fs');
const path = require('path');

const files = [
  'src/App.jsx',
  'src/components/InputForm.jsx',
  'src/components/LandingContent.jsx',
  'src/components/Preview.jsx',
  'src/components/CustomizationPanel.jsx',
  'src/components/SeoArticle.jsx'
];

const replacements = [
  { search: /bg-zinc-50/g, replace: 'bg-[#f8fafc]' },
  { search: /dark:bg-slate-900/g, replace: 'dark:bg-[#040a18]' },
  { search: /bg-white dark:bg-[#040a18]/g, replace: 'bg-white dark:bg-[#081226]' }, // Some cards shouldn't be pitch midnight
  { search: /text-black dark:text-white/g, replace: 'text-[#0a1930] dark:text-white' },
  { search: /text-zinc-800 dark:text-zinc-200/g, replace: 'text-blue-950 dark:text-blue-100' },
  { search: /text-zinc-900 dark:text-zinc-100/g, replace: 'text-[#0a1930] dark:text-blue-50' },
  { search: /border-zinc-200/g, replace: 'border-blue-100' },
  { search: /dark:border-slate-800/g, replace: 'dark:border-[#102040]' },
  { search: /dark:border-zinc-800/g, replace: 'dark:border-[#102040]' },
  { search: /bg-zinc-100/g, replace: 'bg-blue-50' },
  { search: /dark:bg-zinc-900/g, replace: 'dark:bg-[#081226]' },
  { search: /dark:bg-[#18181b]/g, replace: 'dark:bg-[#081226]' },
  { search: /bg-zinc-800/g, replace: 'bg-blue-900' },
  { search: /bg-zinc-900/g, replace: 'bg-[#040a18]' },
  { search: /text-zinc-500/g, replace: 'text-blue-600/70' },
  { search: /dark:text-zinc-400/g, replace: 'dark:text-blue-300/70' },
  { search: /text-zinc-400/g, replace: 'text-blue-400' },
  { search: /dark:text-zinc-500/g, replace: 'dark:text-blue-500' },
  { search: /text-zinc-600/g, replace: 'text-blue-800/70' },
  { search: /bg-blue-600/g, replace: 'bg-gradient-to-br from-blue-700 to-blue-500' },
  { search: /hover:bg-blue-700/g, replace: 'hover:from-blue-800 hover:to-blue-600' },
  { search: /bg-zinc-200\/50/g, replace: 'bg-blue-100/50' },
  { search: /dark:bg-slate-800\/80/g, replace: 'dark:bg-[#081226]/80' },
  { search: /dark:bg-slate-800/g, replace: 'dark:bg-[#081226]' },
];

files.forEach(f => {
  const p = path.join(__dirname, f);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf8');
  let original = content;
  
  replacements.forEach(r => {
    content = content.replace(r.search, r.replace);
  });
  
  // Specific tweaks
  // Change default QR black dots to dark blue
  if (f === 'src/App.jsx') {
    content = content.replace(/color: '#000000'/g, "color: '#0a1930'");
  }
  
  if (content !== original) {
    fs.writeFileSync(p, content, 'utf8');
    console.log(`✅ Updated ${f}`);
  }
});
