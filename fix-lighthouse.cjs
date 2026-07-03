const fs = require('fs');
const glob = require('glob');

// Fix contrast in all JSX files
const files = glob.sync('src/**/*.jsx');
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/text-zinc-500/g, 'text-zinc-600');
  content = content.replace(/text-zinc-400/g, 'text-zinc-300');
  fs.writeFileSync(f, content);
});

// Fix heading level in Preview.jsx
let preview = fs.readFileSync('src/components/Preview.jsx', 'utf8');
preview = preview.replace('<h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Ready to Generate</h3>', '<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Ready to Generate</h2>');
fs.writeFileSync('src/components/Preview.jsx', preview);

// Defer fonts in index.html to fix render-blocking
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />', '<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" /><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" media="print" onload="this.media=\'all\'" /><noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" /></noscript>');
html = html.replace('<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />', '<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" /><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" media="print" onload="this.media=\'all\'" /><noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" /></noscript>');
fs.writeFileSync('index.html', html);
