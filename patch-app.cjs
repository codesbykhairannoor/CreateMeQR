const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Replace imports
content = content.replace(
  /import About from '\.\/pages\/About';\nimport PrivacyPolicy from '\.\/pages\/PrivacyPolicy';\nimport TermsOfService from '\.\/pages\/TermsOfService';\nimport Compare from '\.\/pages\/Compare';\nimport BarcodeGenerator from '\.\/pages\/BarcodeGenerator';\nimport ScanQr from '\.\/pages\/ScanQr';\nimport ScanBarcode from '\.\/pages\/ScanBarcode';\nimport Contact from '\.\/pages\/Contact';/,
  `import AboutUs from './pages/AboutUs';
import Compare from './pages/Compare';
import Languages from './pages/Languages';
import Pricing from './pages/Pricing';
import Privacy from './pages/Privacy';
import Security from './pages/Security';
import Terms from './pages/Terms';
import UseCases from './pages/UseCases';
import BarcodeGenerator from './pages/BarcodeGenerator';
import ScanQr from './pages/ScanQr';
import ScanBarcode from './pages/ScanBarcode';`
);

// 2. Replace static checks
content = content.replace(
  /const isAbout = slug === '\/about';\n  const isPrivacy = slug === '\/privacy';\n  const isTerms = slug === '\/terms';\n  const isCompare = slug === '\/compare';\n  const isContact = slug === '\/contact';/,
  `const isAbout = slug === '/about';
  const isCompare = slug === '/compare';
  const isLanguages = slug === '/languages';
  const isPricing = slug === '/pricing';
  const isPrivacy = slug === '/privacy';
  const isSecurity = slug === '/security';
  const isTerms = slug === '/terms';
  const isUseCases = slug === '/use-cases';`
);

// 3. Update isStaticPage
content = content.replace(
  /const isStaticPage = isHome \|\| isAbout \|\| isPrivacy \|\| isTerms \|\| isCompare \|\| isContact \|\| isBarcode \|\| isScanQr \|\| isScanBarcode;/,
  `const isStaticPage = isHome || isAbout || isCompare || isLanguages || isPricing || isPrivacy || isSecurity || isTerms || isUseCases || isBarcode || isScanQr || isScanBarcode;`
);

// 4. Update the render block
content = content.replace(
  /{isAbout && <About \/>}\n          {isPrivacy && <PrivacyPolicy \/>}\n          {isTerms && <TermsOfService \/>}\n          {isCompare && <Compare \/>}\n          {isContact && <Contact \/>}/,
  `{isAbout && <AboutUs />}
          {isCompare && <Compare />}
          {isLanguages && <Languages />}
          {isPricing && <Pricing />}
          {isPrivacy && <Privacy />}
          {isSecurity && <Security />}
          {isTerms && <Terms />}
          {isUseCases && <UseCases />}`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log("App.jsx patched successfully!");
