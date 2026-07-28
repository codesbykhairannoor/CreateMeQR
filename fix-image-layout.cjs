const fs = require('fs');

let c = fs.readFileSync('src/components/landing/LayoutImage.jsx', 'utf8');
c = c.replace(/<div className="hq-img-grid">[\s\S]*?<div style={{ marginTop: 100, maxWidth: 800/, `<div className="hq-img-grid">
          <div className="hq-img-card main" style={{ padding: 40, flexDirection: 'column', textAlign: 'center' }}>
            <ImageIcon size={64} color="var(--hq-text-muted)" style={{ marginBottom: 24 }} />
            <h2 className="font-bold tracking-tighter " style={{ fontSize: 32,  marginBottom: 16 }}>{getTranslation('featTools', 't', 1)}</h2>
            <p style={{ fontSize: 18, color: 'var(--hq-text-muted)', maxWidth: 400 }}>{getTranslation('featTools', 'd', 1)}</p>
          </div>
          <div className="hq-img-card" style={{ padding: 32, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end', textAlign: 'left' }}>
            <ZoomIn size={48} color="var(--hq-text-muted)" style={{ marginBottom: 24 }} />
            <h3 className="font-bold tracking-tighter" style={{ fontSize: 24, marginBottom: 12, color: 'var(--hq-text)' }}>{getTranslation('featTools', 't', 2)}</h3>
            <p style={{ color: 'var(--hq-text-muted)', fontSize: 16 }}>{getTranslation('featTools', 'd', 2)}</p>
          </div>
          <div className="hq-img-card" style={{ padding: 32, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end', textAlign: 'left' }}>
            <ImagePlus size={48} color="var(--hq-text-muted)" style={{ marginBottom: 24 }} />
            <h3 className="font-bold tracking-tighter" style={{ fontSize: 24, marginBottom: 12, color: 'var(--hq-text)' }}>{getTranslation('featTools', 't', 3)}</h3>
            <p style={{ color: 'var(--hq-text-muted)', fontSize: 16 }}>{getTranslation('featTools', 'd', 3)}</p>
          </div>
        </div>

        <div style={{ marginTop: 100, maxWidth: 800`);

// Also fix the hq-img-card so it stacks on mobile
// And we need to fix the grid layout on mobile!
c = c.replace('.hq-img-grid {', '.hq-img-grid {\n          display: grid;\n          grid-template-columns: repeat(1, 1fr);\n          gap: 16px;\n          margin-bottom: 40px;\n        }\n\n        @media (min-width: 768px) {\n          .hq-img-grid {');
c = c.replace('.hq-img-card.main {', '}\n\n        .hq-img-card.main {');

fs.writeFileSync('src/components/landing/LayoutImage.jsx', c);
console.log('LayoutImage fixed!');
