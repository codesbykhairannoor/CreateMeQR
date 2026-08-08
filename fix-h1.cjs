const fs = require('fs');
const path = require('path');
const dir = './src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

const targetContent1 = 'className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter dark:text-white tracking-tighter mb-6 leading-[1.05]"';
const targetContent2 = 'className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-6 leading-[1.05]"';

const newContent = 'className="font-black text-zinc-900 dark:text-white mb-6"\n            style={{\n              fontSize: \'clamp(2.5rem, 6vw, 4.5rem)\',\n              fontWeight: 900,\n              letterSpacing: \'-0.03em\',\n              lineHeight: 1.15\n            }}';

files.forEach(f => {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  let changed = false;
  
  if (content.includes(targetContent1)) {
    content = content.replace(targetContent1, newContent);
    changed = true;
  }
  
  if (content.includes(targetContent2)) {
    content = content.replace(targetContent2, newContent);
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(p, content);
    console.log('Updated ' + f);
  }
});
