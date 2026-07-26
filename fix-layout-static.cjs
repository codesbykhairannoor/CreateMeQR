const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'layouts', 'MainLayout.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const oldChangeLanguageRegex = /const changeLanguage = \(lang\) => \{[\s\S]*?navigate\([^)]+\);\s*\};/;
const newChangeLanguage = `const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setShowLangMenu(false);
    setSoftBannerLang(null);
    
    const isStaticPage = ['/about', '/privacy', '/terms', '/compare'].includes(slug);
    const newPrefix = lang === 'en' ? '' : \`/\${lang}\`;
    
    if (isStaticPage) {
      navigate(\`\${newPrefix}\${slug}\`, { replace: true });
    } else {
      const currentTool = routeToToolMap[currentLangCode]?.[slug] || 'url';
      const newSlug = localizedRoutes[lang]?.[currentTool] || '/';
      navigate(\`\${newPrefix}\${newSlug === '/' ? '' : newSlug}\`, { replace: true });
    }
  };`;

content = content.replace(oldChangeLanguageRegex, newChangeLanguage);
fs.writeFileSync(filePath, content);
console.log("MainLayout language switcher fixed for static pages!");
