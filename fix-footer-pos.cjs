const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'layouts', 'MainLayout.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove Footer from SoftBanner
content = content.replace(
  /            <button onClick=\{handleDismissBanner\} className="text-zinc-400 hover:text-white"><X className="w-4 h-4" \/><\/button>\s*<Footer \/>\s*<\/div>/,
  `            <button onClick={handleDismissBanner} className="text-zinc-400 hover:text-white"><X className="w-4 h-4" /></button>\n          </div>`
);

// 2. Add Footer at the end of the MainLayout
const endOfLayout = `      </main>

      <Footer />
    </div>
  );
}`;

content = content.replace(/      <\/main>\s*<\/div>\s*\);\s*\}/, endOfLayout);

fs.writeFileSync(filePath, content);
console.log("Footer moved to the correct location!");
