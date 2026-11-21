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

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n';
  xml += '  <channel>\n';
  xml += '    <title>CreateMy-QR | Free Online QR Code &amp; Barcode Suite</title>\n';
  xml += `    <link>${DOMAIN}</link>\n`;
  xml += '    <description>Generate 37 types of QR codes and barcodes for free. 100% private, client-side generation in 30 languages with instant PNG and vector downloads.</description>\n';
  xml += '    <language>en</language>\n';
  xml += `    <lastBuildDate>${NOW}</lastBuildDate>\n`;
  xml += `    <atom:link href="${DOMAIN}/feed.xml" rel="self" type="application/rss+xml" />\n`;

  // Core Canonical Tools (sourced directly from localizedRoutes.en)
  const enRoutes = localizedRoutes.en || {};
  const coreTools = [
    { name: 'Free QR Code Generator', path: '/' },
    { name: 'Free Barcode Generator', path: enRoutes.barcode || '/barcode-generator' },
    { name: 'Bulk QR Code & Barcode Generator', path: enRoutes.bulk || '/bulk-qr-generator' },
    { name: 'Scan QR Code Online', path: enRoutes.scanqr || '/scan-qr' },
    { name: 'Scan Barcode Online', path: enRoutes.scanbarcode || '/scan-barcode' },
    { name: 'vCard QR Code Maker', path: enRoutes.vcard || '/vcard-qr-code-maker' },
    { name: 'WiFi QR Code Generator', path: enRoutes.wifi || '/wifi-qr-code-generator' },
    { name: 'Google Maps Location QR Code', path: enRoutes.location || '/google-maps-qr-code' },
    { name: 'PDF Document QR Code', path: enRoutes.pdf || '/pdf-qr-code-generator' },
    { name: 'WhatsApp Direct Chat QR Code', path: enRoutes.whatsapp || '/whatsapp-qr-code-generator' },
    { name: 'PayPal Payment QR Code', path: enRoutes.paypal || '/paypal-qr-code-generator' },
    { name: 'Instagram Profile QR Code', path: enRoutes.instagram || '/instagram-qr-code-generator' },
    { name: 'Google Review QR Code Generator', path: enRoutes.greview || '/google-review-qr-code-generator' }
  ];

  for (const tool of coreTools) {
    const url = tool.path === '/' ? DOMAIN : `${DOMAIN}${tool.path}`;
    xml += '    <item>\n';
    xml += `      <title>${escapeXml(tool.name)}</title>\n`;
    xml += `      <link>${url}</link>\n`;
    xml += `      <description>Create and customize ${escapeXml(tool.name)} with logo, permanent static QR encoding, high-resolution PNG export, and 100% client-side privacy.</description>\n`;
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
