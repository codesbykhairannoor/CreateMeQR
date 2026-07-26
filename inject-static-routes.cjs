const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Add imports for the new pages
if (!content.includes('import About from')) {
  content = content.replace(
    /import QrWorkspace from '\.\/pages\/QrWorkspace';/,
    `import QrWorkspace from './pages/QrWorkspace';\nimport About from './pages/About';\nimport PrivacyPolicy from './pages/PrivacyPolicy';\nimport TermsOfService from './pages/TermsOfService';\nimport Compare from './pages/Compare';`
  );
}

// Add route checks
if (!content.includes('const isStaticPage')) {
  const routeCheck = `
  const isAbout = slug === '/about';
  const isPrivacy = slug === '/privacy';
  const isTerms = slug === '/terms';
  const isCompare = slug === '/compare';
  const isStaticPage = isAbout || isPrivacy || isTerms || isCompare;
`;
  content = content.replace(/const currentType = routeToToolMap\[currentLangCode\]\?\.\[slug\] \|\| 'url';/, routeCheck + `\n  const currentType = routeToToolMap[currentLangCode]?.[slug] || 'url';`);
}

// Modify the render block
if (content.includes('<QrWorkspace qrType={qrType}')) {
  const renderOld = `      <QrWorkspace qrType={qrType} setQrTypeRoute={handleTypeChangeRoute} currentSeo={currentSeo} />
      <LandingContent qrType={qrType} />
      <SeoArticle qrType={qrType} />`;
      
  const renderNew = `      {!isStaticPage ? (
        <>
          <QrWorkspace qrType={qrType} setQrTypeRoute={handleTypeChangeRoute} currentSeo={currentSeo} />
          <LandingContent qrType={qrType} />
          <SeoArticle qrType={qrType} />
        </>
      ) : (
        <>
          {isAbout && <About />}
          {isPrivacy && <PrivacyPolicy />}
          {isTerms && <TermsOfService />}
          {isCompare && <Compare />}
        </>
      )}`;
      
  content = content.replace(renderOld, renderNew);
}

fs.writeFileSync(filePath, content);
console.log("App.jsx updated with static routes!");
