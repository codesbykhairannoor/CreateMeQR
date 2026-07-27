const fs = require('fs');
const path = require('path');

// 1. Update index.css
const indexCssPath = 'src/index.css';
let indexCss = fs.readFileSync(indexCssPath, 'utf8');

// Ensure :root has the CSS variables
if (!indexCss.includes('--font-main')) {
  const rootVars = `
:root {
  --font-main: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-display: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
`;
  indexCss = indexCss.replace('@import "tailwindcss";', '@import "tailwindcss";\n' + rootVars);
}

// Replace Tailwind's default --font-sans priority to put Inter first (if not already)
indexCss = indexCss.replace(
  /--font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;/g,
  `--font-sans: "Inter", system-ui, -apple-system, sans-serif;`
);

// Replace body font-family which puts -apple-system first
indexCss = indexCss.replace(
  /font-family: -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Display", "Helvetica Neue", sans-serif;/g,
  `font-family: var(--font-main);`
);

fs.writeFileSync(indexCssPath, indexCss);


// 2. Update all Layout components to use --font-main
const dir = 'src/components/landing';
const files = fs.readdirSync(dir).filter(f => f.startsWith('Layout') && f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // They all have: font-family: -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Display", "Helvetica Neue", sans-serif;
  content = content.replace(
    /font-family: -apple-system, BlinkMacSystemFont, "Inter", "SF Pro Display", "Helvetica Neue", sans-serif;/g,
    `font-family: var(--font-main);`
  );
  
  // Some might use "Inter" instead of 'Inter', etc, so let's just make sure
  
  fs.writeFileSync(filePath, content);
});

console.log('Fonts updated successfully!');
