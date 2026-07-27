const fs = require('fs');
const path = require('path');

const dir = 'src/components/landing';
const files = fs.readdirSync(dir).filter(f => f.startsWith('Layout') && f.endsWith('.jsx'));

const tReplacement = `const baseT = typeof tObj === 'object' && tObj !== null ? tObj : {};
  const t = Object.assign({
    heroTitle: "Premium QR Codes",
    heroSubtitle: "No limits, no ads, no tracking. Generate high-quality static codes directly in your browser.",
    stepsTitle: "How to Create a",
    step1Title: "Enter Data",
    step1Desc: "Provide the required details for your",
    step2Title: "Customize Design",
    step2Desc: "Adjust colors, patterns, and add logos to match your brand.",
    step3Title: "Download & Use",
    step3Desc: "Get your high-res QR code instantly and use it anywhere.",
    comp1Title: "Secure & Private",
    comp1Desc: "Everything is generated locally in your browser. No data leaves your device.",
    comp2Title: "Fast & Reliable",
    comp2Desc: "High performance rendering with zero loading times.",
    comp3Title: "Fully Customizable",
    comp3Desc: "Extensive design options to create the perfect QR code.",
    faqTitle: "Common Questions"
  }, baseT);`;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Fix undefined texts
  content = content.replace(
    /const t = typeof tObj === 'object' && tObj !== null \? tObj : {};/g,
    tReplacement
  );

  // 2. Fix massive gaps
  content = content.replace(/paddingTop:\s*120/g, 'paddingTop: 60');
  content = content.replace(/padding:\s*'1[0-9]{2}px 0'/g, "padding: '60px 0'");
  content = content.replace(/marginBottom:\s*120/g, 'marginBottom: 60');
  content = content.replace(/marginBottom:\s*80/g, 'marginBottom: 40');
  content = content.replace(/margin-bottom:\s*120px/g, 'margin-bottom: 60px');
  content = content.replace(/margin-bottom:\s*80px/g, 'margin-bottom: 40px');

  // 3. Fix black text on dark background in FAQ and titles
  // We remove 'text-zinc-900 dark:text-white' so it inherits --hq-text which is bright in dark layouts
  content = content.replace(/text-zinc-900 dark:text-white/g, '');
  content = content.replace(/text-slate-900 dark:text-white/g, '');

  // 4. Component specific layout fixes
  if (file === 'LayoutYouTube.jsx') {
    // Give theater mode more height on mobile so controls don't overlap text
    content = content.replace(
      /aspect-ratio: 16\/9;/g,
      'aspect-ratio: 1/1;'
    );
  }

  if (file === 'LayoutLinkedIn.jsx') {
    // Give avatar more clearance on mobile
    content = content.replace(
      /margin-top: 72px;/g,
      'margin-top: 100px;'
    );
  }
  
  if (file === 'LayoutWhatsApp.jsx') {
      // Just in case whatsapp bubbles overlap
      content = content.replace(
        /min-height: 400px;/g,
        'min-height: 450px;'
      );
  }

  fs.writeFileSync(filePath, content);
});

console.log('All layouts fixed successfully!');
