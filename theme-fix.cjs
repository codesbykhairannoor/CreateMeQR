const fs = require('fs');
const path = require('path');

const files = [
  'src/App.jsx',
  'src/components/InputForm.jsx',
  'src/components/LandingContent.jsx',
  'src/components/Preview.jsx',
  'src/components/CustomizationPanel.jsx',
  'src/components/SeoArticle.jsx',
  'index.html'
];

const replacements = [
  // Fix the Logo references
  { search: /logoqr\.webp/g, replace: 'logoqr.png' },

  // Revert texts to neutral grays (zinc/slate) so it's not ugly blue text
  { search: /text-blue-600\/70/g, replace: 'text-zinc-500' },
  { search: /dark:text-blue-300\/70/g, replace: 'dark:text-zinc-400' },
  { search: /text-blue-400/g, replace: 'text-zinc-400' },
  { search: /dark:text-blue-500/g, replace: 'dark:text-zinc-500' },
  { search: /text-blue-800\/70/g, replace: 'text-zinc-600' },
  { search: /text-\[\#0a1930\]/g, replace: 'text-zinc-900' },
  { search: /text-blue-950/g, replace: 'text-zinc-800' },
  { search: /dark:text-blue-50/g, replace: 'dark:text-zinc-100' },
  { search: /dark:text-blue-100/g, replace: 'dark:text-zinc-200' },
  
  // Make the gradient button accurately match the logo (Midnight Black to Royal Blue)
  { search: /bg-gradient-to-br from-blue-700 to-blue-500/g, replace: 'bg-gradient-to-br from-slate-900 to-blue-700 dark:from-[#020617] dark:to-blue-600' },
  { search: /hover:from-blue-800 hover:to-blue-600/g, replace: 'hover:from-slate-800 hover:to-blue-600 dark:hover:from-[#0f172a] dark:hover:to-blue-500' },
];

files.forEach(f => {
  const p = path.join(__dirname, f);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf8');
  let original = content;
  
  replacements.forEach(r => {
    content = content.replace(r.search, r.replace);
  });
  
  if (content !== original) {
    fs.writeFileSync(p, content, 'utf8');
    console.log(`✅ Updated ${f}`);
  }
});

// Also fix index.css to revert base body text
const cssPath = path.join(__dirname, 'src/index.css');
if (fs.existsSync(cssPath)) {
  let cssContent = fs.readFileSync(cssPath, 'utf8');
  cssContent = cssContent.replace(/text-\[\#0a1930\]/, 'text-black');
  cssContent = cssContent.replace(/dark:text-\[\#f1f5f9\]/, 'dark:text-white');
  fs.writeFileSync(cssPath, cssContent, 'utf8');
  console.log(`✅ Updated src/index.css`);
}
