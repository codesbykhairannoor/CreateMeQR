const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'InputForm.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add missing lucide icons
const importLucideRegex = /import\s+\{\s*([^}]+)\s*\}\s+from\s+'lucide-react';/;
const match = content.match(importLucideRegex);
if (match) {
  const existingImports = match[1];
  const missingImports = ['FileText', 'ClipboardList', 'Star', 'Image', 'List', 'Mic', 'ShoppingCart', 'CalendarDays', 'File'];
  const toAdd = missingImports.filter(i => !existingImports.includes(i));
  if (toAdd.length > 0) {
    const newImports = existingImports + ', ' + toAdd.join(', ');
    content = content.replace(importLucideRegex, `import { ${newImports} } from 'lucide-react';`);
  }
}

// 2. Add 10 tools to TABS array
const tabsEndRegex = /\{ id: 'wifi', icon: Wifi, label: 'types\.wifi' \},?\n\s*\];/;
if (content.match(tabsEndRegex)) {
  const newTabs = `  { id: 'wifi', icon: Wifi, label: 'types.wifi' },
  { id: 'pdf', icon: FileText, label: 'types.pdf' },
  { id: 'gforms', icon: ClipboardList, label: 'types.gforms' },
  { id: 'greview', icon: Star, label: 'types.greview' },
  { id: 'image', icon: Image, label: 'types.image' },
  { id: 'linkinbio', icon: List, label: 'types.linkinbio' },
  { id: 'video', icon: Video, label: 'types.video' },
  { id: 'audio', icon: Mic, label: 'types.audio' },
  { id: 'amazon', icon: ShoppingCart, label: 'types.amazon' },
  { id: 'booking', icon: CalendarDays, label: 'types.booking' },
  { id: 'file', icon: File, label: 'types.file' },
];`;
  content = content.replace(tabsEndRegex, newTabs);
}

// 3. Update the qrType === 'url' condition to also render for the 10 new tools
const urlConditionRegex = /\{qrType === 'url' && \(/g;
if (content.match(urlConditionRegex)) {
  // Actually, we want to allow all these types to use the basic URL input field for MVP
  const newCondition = `{['url', 'pdf', 'gforms', 'greview', 'image', 'linkinbio', 'video', 'audio', 'amazon', 'booking', 'file'].includes(qrType) && (`;
  content = content.replace(urlConditionRegex, newCondition);
}

// 4. Update the "URL" label to be dynamic based on qrType
const labelRegex = /\{\s*t\('types\.url'\)\s*\}/g;
if (content.match(labelRegex)) {
  const newLabel = `{t('types.' + qrType)}`;
  content = content.replace(labelRegex, newLabel);
}

fs.writeFileSync(filePath, content);
console.log("Restored 10 tools to InputForm.jsx!");
