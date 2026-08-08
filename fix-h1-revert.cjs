const fs = require('fs');
const path = require('path');
const dir = './src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

const targetContent1 = 'className="font-black text-zinc-900 dark:text-white mb-6"\n            style={{\n              fontSize: \'clamp(2.5rem, 6vw, 4.5rem)\',\n              fontWeight: 900,\n              letterSpacing: \'-0.03em\',\n              lineHeight: 1.15\n            }}';

// We will use standard Tailwind classes that simulate the premium fluid look but are not excessively thick.
const newContent = 'className="text-4xl md:text-5xl lg:text-[4rem] font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]"';

files.forEach(f => {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  let changed = false;
  
  if (content.includes(targetContent1)) {
    content = content.replace(targetContent1, newContent);
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(p, content);
    console.log('Reverted H1 in ' + f);
  }
});
