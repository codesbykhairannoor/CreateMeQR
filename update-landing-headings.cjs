const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/landing');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Function to process a tag
  const processTag = (tagHtml, isH2) => {
    // Remove fontWeight from style
    tagHtml = tagHtml.replace(/fontWeight:\s*(?:'[^']*'|"[^"]*"|\d+)\s*,?/g, '');
    // Remove letterSpacing from style
    tagHtml = tagHtml.replace(/letterSpacing:\s*(?:'[^']*'|"[^"]*"|\d+)\s*,?/g, '');
    
    // Clean up empty styles
    tagHtml = tagHtml.replace(/style=\{\{\s*\}\}/g, '');
    tagHtml = tagHtml.replace(/,\s*\}/g, ' }');

    // Add className
    const classesToAdd = ['font-bold', 'tracking-tighter'];
    
    // Check if it has inline color
    const hasInlineColor = /color:/.test(tagHtml);
    if (!hasInlineColor) {
      classesToAdd.push('text-zinc-900', 'dark:text-white');
    }

    const classStr = classesToAdd.join(' ');

    if (tagHtml.includes('className=')) {
      tagHtml = tagHtml.replace(/className=(["'])([^"']*)(["'])/, (match, p1, p2, p3) => {
        let existing = p2.replace(/font-\w+/g, '').replace(/tracking-\w+/g, '').replace(/text-slate-\d+/g, '').replace(/dark:text-\w+/g, '').trim();
        return `className=${p1}${existing} ${classStr}${p3}`;
      });
    } else {
      // Insert className after the tag name
      tagHtml = tagHtml.replace(/<(h[23])/, `<$1 className="${classStr}"`);
    }

    return tagHtml;
  };

  content = content.replace(/<(h[23])([^>]*)>/g, (match) => {
    return processTag(match, match.startsWith('<h2'));
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated headings in ${file}`);
  }
});
