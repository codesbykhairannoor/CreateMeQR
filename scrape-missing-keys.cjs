const fs = require('fs');
const path = require('path');

// Recursive function to get all .jsx files
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.jsx')) {
        arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

const allFiles = getAllFiles('src');

const extractedKeys = {};

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Match t('key.path', 'Default English Text')
  // We need a robust regex to handle quotes.
  // This handles t('key', 'value') and t("key", "value") and t(`key`, `value`)
  const regex = /t\(\s*['"`]([^'"`]+)['"`]\s*,\s*['"`](([^'"`\\]|\\.)*)['"`]\s*\)/g;
  
  let match;
  while ((match = regex.exec(content)) !== null) {
    const keyPath = match[1];
    const defaultText = match[2];
    extractedKeys[keyPath] = defaultText;
  }
});

// Load existing en/translation.json
const enPath = path.join(__dirname, 'public', 'locales', 'en', 'translation.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Helper to set deep key
function setDeep(obj, path, value) {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  
  // Only set if not already set, or if it's an empty object/string
  if (typeof current[parts[parts.length - 1]] === 'undefined' || current[parts[parts.length - 1]] === '') {
    current[parts[parts.length - 1]] = value;
  }
}

let addedCount = 0;
for (const [keyPath, text] of Object.entries(extractedKeys)) {
  // Only care about specific namespaces if needed, but let's just add all
  if (keyPath.startsWith('static.') || keyPath.startsWith('footer.') || keyPath.startsWith('nav.') || keyPath.startsWith('history.')) {
    // Check if it exists
    const parts = keyPath.split('.');
    let exists = true;
    let curr = enData;
    for (const p of parts) {
      if (!curr[p]) {
        exists = false;
        break;
      }
      curr = curr[p];
    }
    
    if (!exists || curr === '') {
      setDeep(enData, keyPath, text);
      addedCount++;
      console.log(`Added missing key: ${keyPath} -> "${text}"`);
    }
  }
}

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
console.log(`Finished. Added ${addedCount} missing keys.`);
