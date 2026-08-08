const fs = require('fs');

const p = 'd:/qr-and-qr/generate-ssg.cjs';
let content = fs.readFileSync(p, 'utf8');

// H2 replacements
content = content.replace(/class="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4 mt-10"/g, 'class="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6 mt-12"');
content = content.replace(/class="text-xl font-semibold text-emerald-800 dark:text-emerald-400 mb-4 mt-0"/g, 'class="text-2xl font-extrabold tracking-tight text-emerald-900 dark:text-emerald-300 mb-6 mt-0"');

// H3 replacements
content = content.replace(/class="text-lg font-medium text-zinc-800 dark:text-zinc-200 mt-6 mb-2"/g, 'class="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-8 mb-3"');
content = content.replace(/class="text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-1"/g, 'class="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2"');

fs.writeFileSync(p, content);
console.log('Updated SEO sections typography in generate-ssg.cjs');
