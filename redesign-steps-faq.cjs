const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/landing');
const files = fs.readdirSync(dir).filter(f => f.startsWith('Layout') && f.endsWith('.jsx'));

const newStepsBlock = `
          <div style={{ gridColumn: 'span 12', marginTop: 80, marginBottom: 40 }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ display: 'inline-flex', padding: '8px 16px', background: 'var(--hq-accent-glow)', borderRadius: 100, color: 'var(--hq-accent)', fontWeight: 700, fontSize: '14px', marginBottom: 16 }}>
                Fast & Easy
              </div>
              <h3 className="font-bold tracking-tighter" style={{ fontSize: 'clamp(32px, 4vw, 40px)', color: 'var(--hq-text)' }}>{t.stepsTitle} <span style={{ color: 'var(--hq-accent)' }}>{typeName}</span></h3>
            </div>
            
            {/* The hq-steps-bento class will automatically stack on mobile due to Phase 5 CSS */}
            <div className="hq-steps-bento" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {[
                  { n: '1', t: t.step1Title, d: \`\${t.step1Desc} (\${typeName})\` },
                  { n: '2', t: t.step2Title, d: t.step2Desc },
                  { n: '3', t: t.step3Title, d: t.step3Desc }
              ].map((step) => (
                <div key={step.n} style={{ background: 'var(--hq-bg)', padding: 40, borderRadius: 24, border: '2px solid var(--hq-border)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                  
                  {/* Giant Watermark Number */}
                  <div style={{ position: 'absolute', top: -15, right: -5, fontSize: 140, fontWeight: 900, color: 'var(--hq-accent)', opacity: 0.05, lineHeight: 1, pointerEvents: 'none' }}>
                    0{step.n}
                  </div>
                  
                  {/* Step Badge */}
                  <div style={{ width: 64, height: 64, borderRadius: 20, background: 'var(--hq-accent-glow)', color: 'var(--hq-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32, fontSize: 24, fontWeight: 800, position: 'relative', zIndex: 1 }}>
                    {step.n}
                  </div>
                  
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h4 className="font-bold tracking-tighter" style={{ fontSize: 24, marginBottom: 12 }}>{step.t}</h4>
                    <p style={{ color: 'var(--hq-text-muted)', fontSize: 16, lineHeight: 1.6 }}>{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
`;

let modifiedCount = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // 1. Replace massive 60px padding on FAQ Title
  content = content.replace(/style=\{\{ paddingTop: 60, fontSize/g, "style={{ paddingTop: 0, fontSize");
  
  // Also reduce the margin bottom of the center wrapper above FAQ to tighten it slightly
  content = content.replace(/textAlign: 'center', marginBottom: 60/g, "textAlign: 'center', marginBottom: 40");

  // 2. Replace the ugly horizontal Steps card with the new Bento grid
  const stepsRegex = /<div className="hq-card" style=\{\{ gridColumn: 'span 8'[\s\S]*?<Smartphone size=\{200\} color="var\(--hq-border\)" \/>\s*<\/div>\s*<\/div>/g;
  
  content = content.replace(stepsRegex, newStepsBlock.trim());
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    modifiedCount++;
    console.log(`Redesigned Steps & FAQ in ${file}`);
  }
}

console.log(`\n🎉 Massively Redesigned ${modifiedCount} files!`);
