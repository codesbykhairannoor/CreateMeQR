const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('import ScrollToTop')) {
  content = content.replace(
    /import MainLayout from '\.\/layouts\/MainLayout';/,
    `import MainLayout from './layouts/MainLayout';\nimport ScrollToTop from './components/ScrollToTop';`
  );
  
  content = content.replace(
    /<MainLayout>/,
    `<MainLayout>\n      <ScrollToTop />`
  );
  
  fs.writeFileSync(filePath, content);
  console.log("ScrollToTop injected!");
}
