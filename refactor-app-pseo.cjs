const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add import
if (!content.includes("import { localizedRoutes, routeToToolMap }")) {
  content = content.replace(
    /import \{ PSEO_ROUTES, LANGS \} from '\.\/config\/site';/,
    `import { PSEO_ROUTES, LANGS } from './config/site';\nimport { localizedRoutes, routeToToolMap } from './config/localizedRoutes';`
  );
}

// 2. Modify route resolution
// Old: const currentType = PSEO_ROUTES[slug] || PSEO_ROUTES['/'];
// New: const currentType = routeToToolMap[currentLangCode]?.[slug] || 'url';
content = content.replace(
  /const currentType = PSEO_ROUTES\[slug\] \|\| PSEO_ROUTES\['\/'\];/g,
  `const currentType = routeToToolMap[currentLangCode]?.[slug] || 'url';`
);

// 3. Modify handleTypeChangeRoute
/*
  const handleTypeChangeRoute = (newType) => {
    setQrType(newType);
    const entry = Object.entries(PSEO_ROUTES).find(([_, val]) => val === newType);
    if (entry && entry[0] !== slug) {
      const newPrefix = currentLangCode === 'en' ? '' : `/${currentLangCode}`;
      navigate(`${newPrefix}${entry[0] === '/' ? '' : entry[0]}`, { replace: true });
    }
  };
*/
const oldHandleTypeChange = `  const handleTypeChangeRoute = (newType) => {
    setQrType(newType);
    const entry = Object.entries(PSEO_ROUTES).find(([_, val]) => val === newType);
    if (entry && entry[0] !== slug) {
      const newPrefix = currentLangCode === 'en' ? '' : \`/\${currentLangCode}\`;
      navigate(\`\${newPrefix}\${entry[0] === '/' ? '' : entry[0]}\`, { replace: true });
    }
  };`;

const newHandleTypeChange = `  const handleTypeChangeRoute = (newType) => {
    setQrType(newType);
    const localizedSlug = localizedRoutes[currentLangCode]?.[newType] || PSEO_ROUTES[newType === 'url' ? '/' : newType] || '/';
    if (localizedSlug !== slug) {
      const newPrefix = currentLangCode === 'en' ? '' : \`/\${currentLangCode}\`;
      navigate(\`\${newPrefix}\${localizedSlug === '/' ? '' : localizedSlug}\`, { replace: true });
    }
  };`;

content = content.replace(oldHandleTypeChange, newHandleTypeChange);

// 4. Inject hreflang into <Helmet>
// Find: <link rel="canonical" href={`https://createmy-qr.com${slug === '/' ? '' : slug}`} />
const oldCanonical = /<link rel="canonical"[^>]+>/;
if (content.match(oldCanonical) && !content.includes("hreflang=")) {
  const newCanonicalWithHreflang = `<link rel="canonical" href={\`https://createmy-qr.com\${currentLangCode === 'en' ? '' : '/' + currentLangCode}\${slug === '/' ? '' : slug}\`} />
        {/* pSEO Hreflang Tags for all 30 languages */}
        <link rel="alternate" hrefLang="x-default" href={\`https://createmy-qr.com\${localizedRoutes['en']?.[currentType] === '/' ? '' : localizedRoutes['en']?.[currentType]}\`} />
        {LANGS.map(lang => {
          const lSlug = localizedRoutes[lang.code]?.[currentType] || '/';
          const href = \`https://createmy-qr.com\${lang.code === 'en' ? '' : '/' + lang.code}\${lSlug === '/' ? '' : lSlug}\`;
          return <link key={lang.code} rel="alternate" hrefLang={lang.code} href={href} />;
        })}`;
        
  content = content.replace(oldCanonical, newCanonicalWithHreflang);
}

// 5. Update useState initialization
// Old: const [qrType, setQrType] = useState(PSEO_ROUTES[slug] || PSEO_ROUTES['/']);
// New: const [qrType, setQrType] = useState(routeToToolMap[currentLangCode]?.[slug] || 'url');
content = content.replace(
  /const \[qrType, setQrType\] = useState\(PSEO_ROUTES\[slug\] \|\| PSEO_ROUTES\['\/'\]\);/g,
  `const [qrType, setQrType] = useState(routeToToolMap[currentLangCode]?.[slug] || 'url');`
);

// 6. Update useEffect route sync
// Old: const routeType = PSEO_ROUTES[slug];
// New: const routeType = routeToToolMap[currentLangCode]?.[slug];
content = content.replace(
  /const routeType = PSEO_ROUTES\[slug\];/g,
  `const routeType = routeToToolMap[currentLangCode]?.[slug];`
);

fs.writeFileSync(filePath, content);
console.log("Updated App.jsx with pSEO dynamic localized routing and hreflang!");
