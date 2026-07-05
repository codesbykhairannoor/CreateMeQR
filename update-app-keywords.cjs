const fs = require('fs');

let app = fs.readFileSync('src/App.jsx', 'utf8');

// Add import
if (!app.includes("import seoKeywords from './seoKeywords'")) {
  app = app.replace("import './i18n';", "import './i18n';\nimport seoKeywords from './seoKeywords';");
}

// Add meta keywords inside Helmet
if (!app.includes('<meta name="keywords"')) {
  app = app.replace(
    '<meta name="description" content={currentSeo.description} />',
    '<meta name="description" content={currentSeo.description} />\n        <meta name="keywords" content={seoKeywords[currentLangCode] || seoKeywords.en} />'
  );
}

fs.writeFileSync('src/App.jsx', app, 'utf8');
console.log('Successfully injected Super SEO Keyword Matrix into App.jsx Helmet!');
