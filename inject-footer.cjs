const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'layouts', 'MainLayout.jsx');
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes('import Footer from')) {
  content = content.replace(
    /import \{ LANGS \} from '\.\.\/config\/site';/,
    `import { LANGS } from '../config/site';\nimport Footer from '../components/Footer';`
  );
  
  // Inject Footer right before the closing </div> of the layout
  content = content.replace(/<\/div>\s*$/m, `      <Footer />\n    </div>\n`);
  
  fs.writeFileSync(filePath, content);
  console.log("Footer added to MainLayout!");
}
