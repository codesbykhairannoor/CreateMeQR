const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://createmy-qr.com';
const NOW = new Date().toUTCString();

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

async function run() {
  const { localizedRoutes } = await import('./src/config/localizedRoutes.js');

  const pseoLocalesDir = path.join(__dirname, 'src', 'config', 'pseo-locales');
  const enPseo = fs.existsSync(path.join(pseoLocalesDir, 'en.json'))
    ? JSON.parse(fs.readFileSync(path.join(pseoLocalesDir, 'en.json'), 'utf8'))
    : [];

  const idPseo = fs.existsSync(path.join(pseoLocalesDir, 'id.json'))
    ? JSON.parse(fs.readFileSync(path.join(pseoLocalesDir, 'id.json'), 'utf8'))
    : [];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n';
  xml += '  <channel>\n';
  xml += '    <title>CreateMy-QR | Free Online QR Code &amp; Barcode Suite</title>\n';
  xml += `    <link>${DOMAIN}</link>\n`;
  xml += '    <description>Generate 37 types of QR codes and barcodes for free. 100% private, client-side generation in 30 languages with instant vector downloads.</description>\n';
  xml += '    <language>en</language>\n';
  xml += `    <lastBuildDate>${NOW}</lastBuildDate>\n`;
  xml += `    <atom:link href="${DOMAIN}/feed.xml" rel="self" type="application/rss+xml" />\n`;

  // 1. Add English pSEO use cases (High Intent)
  for (const uc of enPseo) {
    const slug = uc.slug.startsWith('/') ? uc.slug : '/' + uc.slug;
    const url = `${DOMAIN}${slug}`;
    xml += '    <item>\n';
    xml += `      <title>${escapeXml(uc.title)}</title>\n`;
    xml += `      <link>${url}</link>\n`;
    xml += `      <description>${escapeXml(uc.seoDesc || uc.heroSubtitle || uc.title)}</description>\n`;
    xml += `      <pubDate>${NOW}</pubDate>\n`;
    xml += `      <guid isPermaLink="true">${url}</guid>\n`;
    xml += '      <category>QR Code Solutions</category>\n';
    xml += '    </item>\n';
  }

  // 2. Add Indonesian pSEO use cases (High Intent Localized)
  for (const uc of idPseo) {
    const slug = (uc.translatedSlug || uc.slug);
    const safeSlug = slug.startsWith('/') ? slug : '/' + slug;
    const url = `${DOMAIN}/id${safeSlug}`;
    xml += '    <item>\n';
    xml += `      <title>${escapeXml(uc.title)}</title>\n`;
    xml += `      <link>${url}</link>\n`;
    xml += `      <description>${escapeXml(uc.seoDesc || uc.heroSubtitle || uc.title)}</description>\n`;
    xml += `      <pubDate>${NOW}</pubDate>\n`;
    xml += `      <guid isPermaLink="true">${url}</guid>\n`;
    xml += '      <category>Solusi Kode QR Indonesia</category>\n';
    xml += '    </item>\n';
  }

  // 3. Add Core Tools
  const coreTools = [
    { name: 'Free QR Code Generator', path: '/' },
    { name: 'Free Barcode Generator', path: '/barcode-generator' },
    { name: 'Scan QR Code Online', path: '/scan-qr' },
    { name: 'Scan Barcode Online', path: '/scan-barcode' },
    { name: 'vCard QR Code Generator', path: '/vcard-qr-code-generator' },
    { name: 'WiFi QR Code Generator', path: '/wifi-qr-code-generator' },
    { name: 'Google Maps Location QR Code', path: '/google-maps-qr-code' },
    { name: 'PDF Document QR Code', path: '/pdf-qr-code-generator' },
    { name: 'WhatsApp Direct Chat QR Code', path: '/whatsapp-qr-code-generator' },
    { name: 'PayPal Payment QR Code', path: '/paypal-qr-code-generator' },
    { name: 'Instagram Profile QR Code', path: '/instagram-qr-code-generator' },
    { name: 'Google Review 5-Star QR Code', path: '/google-review-qr-code' }
  ];

  for (const tool of coreTools) {
    const url = `${DOMAIN}${tool.path}`;
    xml += '    <item>\n';
    xml += `      <title>${escapeXml(tool.name)}</title>\n`;
    xml += `      <link>${url}</link>\n`;
    xml += `      <description>Create and customize ${escapeXml(tool.name)} with logo, high-resolution vector SVG/PNG export, and 100% client-side privacy.</description>\n`;
    xml += `      <pubDate>${NOW}</pubDate>\n`;
    xml += `      <guid isPermaLink="true">${url}</guid>\n`;
    xml += '      <category>Core Tools</category>\n';
    xml += '    </item>\n';
  }

  xml += '  </channel>\n';
  xml += '</rss>';

  const publicPath = path.join(__dirname, 'public', 'feed.xml');
  fs.writeFileSync(publicPath, xml, 'utf8');

  const distDir = path.join(__dirname, 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'feed.xml'), xml, 'utf8');
  }

  console.log(`✅ Successfully generated RSS 2.0 Feed: public/feed.xml (${publicPath})`);
}

run().catch(err => {
  console.error('Fatal error generating RSS feed:', err);
  process.exit(1);
});
