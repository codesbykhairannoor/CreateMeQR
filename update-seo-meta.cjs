const fs = require('fs');
const { seoKeywords } = require('./src/seoKeywords.js');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

// Add robots tag if missing
if (!html.includes('<meta name="robots"')) {
  html = html.replace(
    '<meta name="theme-color" content="#09090b" />',
    '<meta name="theme-color" content="#09090b" />\n    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />'
  );
}

// Replace keywords with full matrix
const oldKeywordsRegex = /<meta name="keywords" content="[^"]*" \/>/;
html = html.replace(oldKeywordsRegex, `<meta name="keywords" content="${seoKeywords.en}" />`);

// Add static semantic footer before </body> if not present
if (!html.includes('id="seo-static-directory"')) {
  const staticFooter = `
    <!-- Static Semantic Directory & Trust Badges for Crawlers, Scrapers, and PSEO (White/Gray Hat Architecture) -->
    <footer id="seo-static-directory" class="bg-zinc-900 text-zinc-400 py-12 px-6 border-t border-zinc-800 text-xs">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <img src="/logoqr.webp" alt="Free QR Code Generator Online - Custom Logo QR Maker" width="32" height="32" class="rounded-lg object-contain" />
            <span class="text-sm font-bold text-white">CreateMy-QR</span>
          </div>
          <p class="text-zinc-400 mb-4">
            The world's fastest 100% client-side editable QR code generator. Create custom QR codes with logo, custom colors, and high-resolution vector SVG/PNG downloads with zero server latency and no expiration date.
          </p>
          <div class="flex items-center gap-3">
            <img src="/favicon.svg" alt="Vector SVG QR Code Download Free" width="28" height="28" />
            <img src="/icons.svg" alt="Client-Side Privacy QR Code Maker" width="28" height="28" />
            <img src="/logoqr.png" alt="Custom QR Code with Logo No Watermark" width="28" height="28" />
            <img src="/logoqr.webp" alt="Turn Link into QR Code Generator Free" width="28" height="28" />
          </div>
        </div>
        
        <div>
          <h4 class="text-white font-semibold mb-3 uppercase tracking-wider text-[11px]">Free QR Code Tools</h4>
          <ul class="space-y-2">
            <li><a href="/" class="hover:text-blue-400 transition-colors">URL & Link QR Code Generator</a></li>
            <li><a href="/wifi-qr-code-generator" class="hover:text-blue-400 transition-colors">WiFi Password QR Code Maker</a></li>
            <li><a href="/vcard-qr-code-maker" class="hover:text-blue-400 transition-colors">vCard Digital Business Card QR</a></li>
            <li><a href="/text-qr-code-generator" class="hover:text-blue-400 transition-colors">Text & Note QR Code Generator</a></li>
            <li><a href="/email-qr-code-generator" class="hover:text-blue-400 transition-colors">Send Email Mailto QR Code</a></li>
            <li><a href="/sms-qr-code-generator" class="hover:text-blue-400 transition-colors">SMS Message QR Code Maker</a></li>
            <li><a href="/phone-qr-code-generator" class="hover:text-blue-400 transition-colors">Phone Call Number QR Code</a></li>
            <li><a href="/event-qr-code-generator" class="hover:text-blue-400 transition-colors">Event Ticket & RSVP QR Code</a></li>
            <li><a href="/google-maps-qr-code" class="hover:text-blue-400 transition-colors">Google Maps Location QR Code</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-3 uppercase tracking-wider text-[11px]">International Generators (1-15)</h4>
          <ul class="grid grid-cols-2 gap-2">
            <li><a href="/id" class="hover:text-blue-400">🇮🇩 Indonesia</a></li>
            <li><a href="/es" class="hover:text-blue-400">🇪🇸 Español</a></li>
            <li><a href="/fr" class="hover:text-blue-400">🇫🇷 Français</a></li>
            <li><a href="/de" class="hover:text-blue-400">🇩🇪 Deutsch</a></li>
            <li><a href="/pt" class="hover:text-blue-400">🇵🇹 Português</a></li>
            <li><a href="/zh" class="hover:text-blue-400">🇨🇳 中文</a></li>
            <li><a href="/ja" class="hover:text-blue-400">🇯🇵 日本語</a></li>
            <li><a href="/hi" class="hover:text-blue-400">🇮🇳 हिन्दी</a></li>
            <li><a href="/ko" class="hover:text-blue-400">🇰🇷 한국어</a></li>
            <li><a href="/ar" class="hover:text-blue-400">🇸🇦 العربية</a></li>
            <li><a href="/ru" class="hover:text-blue-400">🇷🇺 Русский</a></li>
            <li><a href="/it" class="hover:text-blue-400">🇮🇹 Italiano</a></li>
            <li><a href="/tr" class="hover:text-blue-400">🇹🇷 Türkçe</a></li>
            <li><a href="/nl" class="hover:text-blue-400">🇳🇱 Nederlands</a></li>
            <li><a href="/pl" class="hover:text-blue-400">🇵🇱 Polski</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-semibold mb-3 uppercase tracking-wider text-[11px]">International Generators (16-30)</h4>
          <ul class="grid grid-cols-2 gap-2">
            <li><a href="/sv" class="hover:text-blue-400">🇸🇪 Svenska</a></li>
            <li><a href="/vi" class="hover:text-blue-400">🇻🇳 Tiếng Việt</a></li>
            <li><a href="/th" class="hover:text-blue-400">🇹🇭 ไทย</a></li>
            <li><a href="/el" class="hover:text-blue-400">🇬🇷 Ελληνικά</a></li>
            <li><a href="/cs" class="hover:text-blue-400">🇨🇿 Čeština</a></li>
            <li><a href="/da" class="hover:text-blue-400">🇩🇰 Dansk</a></li>
            <li><a href="/fi" class="hover:text-blue-400">🇫🇮 Suomi</a></li>
            <li><a href="/no" class="hover:text-blue-400">🇳🇴 Norsk</a></li>
            <li><a href="/hu" class="hover:text-blue-400">🇭🇺 Magyar</a></li>
            <li><a href="/ro" class="hover:text-blue-400">🇷🇴 Română</a></li>
            <li><a href="/uk" class="hover:text-blue-400">🇺🇦 Українська</a></li>
            <li><a href="/ms" class="hover:text-blue-400">🇲🇾 Melayu</a></li>
            <li><a href="/tl" class="hover:text-blue-400">🇵🇭 Filipino</a></li>
            <li><a href="/bn" class="hover:text-blue-400">🇧🇩 বাংলা</a></li>
            <li><a href="/" class="hover:text-blue-400 font-semibold text-blue-400">🌐 Global (EN)</a></li>
          </ul>
        </div>
      </div>
      <div class="max-w-7xl mx-auto pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between text-zinc-500 gap-4">
        <p>© 2026 CreateMy-QR. Free Client-Side QR Code Generator. No signup, no watermarks, unlimited scans.</p>
        <div class="flex gap-6">
          <a href="/sitemap.xml" class="hover:text-zinc-400">Sitemap</a>
          <a href="/robots.txt" class="hover:text-zinc-400">Robots.txt</a>
          <a href="/llms.txt" class="hover:text-zinc-400">LLMs.txt</a>
        </div>
      </div>
    </footer>
  </body>`;
  html = html.replace('</body>', staticFooter);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Updated index.html with meta robots, 50+ keywords, 5+ trust images, and 40+ internal SEO links!');

// 2. Update App.jsx
let app = fs.readFileSync('src/App.jsx', 'utf8');

// Add robots and canonical tag inside Helmet
if (!app.includes('<meta name="robots"')) {
  app = app.replace(
    '<meta name="description" content={currentSeo.description} />',
    `<meta name="description" content={currentSeo.description} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={\`https://www.createmy-qr.com\${slug === '/' ? '' : slug}\`} />`
  );
}

// Add images to Bento Grid cards
app = app.replace(
  '<Lock className="w-8 h-8 text-blue-600 mb-6" />',
  '<div class="flex items-center gap-3 mb-6"><img src="/logoqr.webp" alt="Client-Side Privacy QR Code Generator" width="40" height="40" class="object-contain" /><Lock className="w-6 h-6 text-blue-600" /></div>'
);

app = app.replace(
  '<Zap className="w-8 h-8 text-blue-600 mb-6" />',
  '<div class="flex items-center gap-3 mb-6"><img src="/favicon.svg" alt="Free QR Code Maker Online Without Signup" width="40" height="40" class="object-contain" /><Zap className="w-6 h-6 text-blue-600" /></div>'
);

app = app.replace(
  '<Palette className="w-8 h-8 text-blue-600 mb-6" />',
  '<div class="flex items-center gap-3 mb-6"><img src="/logoqr.png" alt="Custom QR Code with Logo and Colors Vector Download" width="40" height="40" class="object-contain" /><Palette className="w-6 h-6 text-blue-600" /></div>'
);

// Add images to Hero and Footer
app = app.replace(
  '<img src="/logoqr.webp" alt="CreateMy-QR Logo" className="w-8 h-8 rounded-lg object-contain" />',
  '<img src="/logoqr.webp" alt="CreateMy-QR Logo - Free Editable QR Code Generator Online" className="w-8 h-8 rounded-lg object-contain" />'
);

fs.writeFileSync('src/App.jsx', app, 'utf8');
console.log('Updated App.jsx with robots, canonical, and keyword-rich images!');
