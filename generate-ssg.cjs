const fs = require('fs');
const path = require('path');

async function run() {
  // Use dynamic import for ES modules
  const { localizedRoutes, routeToToolMap } = await import('./src/config/localizedRoutes.js');

  // Helper to get languages
  const langsDir = path.join(__dirname, 'public', 'locales');
  const langCodes = fs.readdirSync(langsDir).filter(f => fs.statSync(path.join(langsDir, f)).isDirectory());

  const distDir = path.join(__dirname, 'dist');
  const indexPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexPath)) {
    console.error('dist/index.html not found! Run npm run build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexPath, 'utf8');

  console.log('dYs? Starting Static Site Generation (SSG) for all 30 languages...');

  let generatedCount = 0;

  for (const lang of langCodes) {
    const transPath = path.join(langsDir, lang, 'translation.json');
    if (!fs.existsSync(transPath)) continue;
    
    const translations = JSON.parse(fs.readFileSync(transPath, 'utf8'));
    const toolMap = routeToToolMap[lang] || {};
    
    for (const [localizedSlug, toolId] of Object.entries(toolMap)) {
      let title, description;
      
      if (toolId === 'url' || toolId === '/') {
        title = translations.appTitle || 'CreateMy-QR | Free Custom QR Code Generator';
        description = translations.tagline || 'Generate high-quality static QR codes directly in your browser.';
      } else {
        const toolName = translations.types?.[toolId] || toolId;
        title = translations.seoTool?.title?.replace('{{tool}}', toolName) || `${toolName} Generator`;
        description = translations.seoTool?.description?.replace('{{tool}}', toolName) || `Free ${toolName} generator`;
      }

      let newHtml = baseHtml.replace(
        /<html lang="en">/,
        `<html lang="${lang}">`
      );
      newHtml = newHtml.replace(
        /<title>.*?<\/title>/,
        `<title>${title}</title>`
      );
      newHtml = newHtml.replace(
        /<meta name="title" content=".*?"\s*\/>/,
        `<meta name="title" content="${title}" />`
      );
      newHtml = newHtml.replace(
        /<meta name="description" content=".*?"\s*\/>/,
        `<meta name="description" content="${description}" />`
      );
      newHtml = newHtml.replace(
        /<meta property="og:title" content=".*?"\s*\/>/,
        `<meta property="og:title" content="${title}" />`
      );
      newHtml = newHtml.replace(
        /<meta property="og:description" content=".*?"\s*\/>/,
        `<meta property="og:description" content="${description}" />`
      );
      newHtml = newHtml.replace(
        /<meta property="twitter:title" content=".*?"\s*\/>/,
        `<meta property="twitter:title" content="${title}" />`
      );
      newHtml = newHtml.replace(
        /<meta property="twitter:description" content=".*?"\s*\/>/,
        `<meta property="twitter:description" content="${description}" />`
      );

      const routeDir = lang === 'en' ? 
        path.join(distDir, localizedSlug === '/' ? '' : localizedSlug.substring(1)) : 
        path.join(distDir, lang, localizedSlug === '/' ? '' : localizedSlug.substring(1));
      
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      
      fs.writeFileSync(path.join(routeDir, 'index.html'), newHtml);
      generatedCount++;
    }
  }

  console.log(`dY? SSG Complete! Generated ${generatedCount} statically optimized HTML files for Googlebot.`);
}

run();
