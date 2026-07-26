const fs = require('fs');

const files = [
  'src/pages/About.jsx',
  'src/pages/PrivacyPolicy.jsx',
  'src/pages/TermsOfService.jsx',
  'src/pages/Contact.jsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf8');

  // Add pt-32 to the first section
  content = content.replace(/<section className="relative pb-24/g, '<section className="relative pt-32 pb-24');
  
  // Replace h1
  content = content.replace(/<h1 className="text-6xl[^>]*>/g, '<h1 className="text-[clamp(44px,7vw,80px)] font-bold text-zinc-900 dark:text-white tracking-tighter mb-6 leading-[1.05]">');
  
  // Replace p
  content = content.replace(/<p className="text-xl md:text-3xl[^>]*>/g, '<p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">');

  // Remove About badge
  content = content.replace(/<div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white\/60[^>]*>[\s\S]*?<\/div>/, '');
  
  // Remove Icon badges (Privacy, Terms, Contact)
  content = content.replace(/<div className="inline-flex items-center justify-center p-5 bg-white[^>]*>[\s\S]*?<\/div>/g, '');

  fs.writeFileSync(file, content);
  console.log('Patched', file);
});
