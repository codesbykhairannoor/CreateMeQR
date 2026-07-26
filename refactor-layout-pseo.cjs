const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'layouts', 'MainLayout.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add import
if (!content.includes("import { localizedRoutes, routeToToolMap }")) {
  content = content.replace(
    /import \{ LANGS \} from '\.\.\/config\/site';/,
    `import { LANGS } from '../config/site';\nimport { localizedRoutes, routeToToolMap } from '../config/localizedRoutes';`
  );
}

// 2. Modify changeLanguage function
/*
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setShowLangMenu(false);
    setSoftBannerLang(null);
    const newPrefix = lang === 'en' ? '' : `/${lang}`;
    navigate(`${newPrefix}${slug === '/' ? '' : slug}`, { replace: true });
  };
*/
const oldChangeLanguageRegex = /const changeLanguage = \(lang\) => \{[\s\S]*?navigate\([^)]+\);\s*\};/;
const newChangeLanguage = `const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setShowLangMenu(false);
    setSoftBannerLang(null);
    
    // Look up the current tool based on current lang and slug
    const currentTool = routeToToolMap[currentLangCode]?.[slug] || 'url';
    
    // Get the localized slug for the NEW language
    const newSlug = localizedRoutes[lang]?.[currentTool] || '/';
    
    const newPrefix = lang === 'en' ? '' : \`/\${lang}\`;
    navigate(\`\${newPrefix}\${newSlug === '/' ? '' : newSlug}\`, { replace: true });
  };`;

content = content.replace(oldChangeLanguageRegex, newChangeLanguage);

fs.writeFileSync(filePath, content);
console.log("Updated MainLayout.jsx language switcher for dynamic localized routing!");
