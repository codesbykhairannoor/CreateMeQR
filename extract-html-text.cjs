const fs = require('fs');
const path = require('path');

// Target HTML: Indonesian URL tool
const htmlPath = path.join(__dirname, 'dist', 'id', 'url-link-generator-qr-code-gratis-online', 'index.html');
const rawHtml = fs.readFileSync(htmlPath, 'utf8');

// Simple regex to extract text content from the body, stripping script and style tags first
let bodyHtml = rawHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i)[1];

// Remove script and style tags and their contents
bodyHtml = bodyHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ' ');
bodyHtml = bodyHtml.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, ' ');

// Remove SVG tags
bodyHtml = bodyHtml.replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, ' ');

// Strip all remaining HTML tags
let textContent = bodyHtml.replace(/<[^>]+>/g, ' ');

// Decode HTML entities
const entities = {
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' '
};
textContent = textContent.replace(/&[a-z0-9#]+;/gi, match => entities[match] || match);

// Normalize whitespace
textContent = textContent.replace(/\s+/g, ' ').trim();

// Save to scratch
const outPath = path.join(__dirname, 'scratch', 'bot_text_output.txt');
fs.writeFileSync(outPath, textContent);
console.log(`Text extracted and saved to ${outPath}`);
