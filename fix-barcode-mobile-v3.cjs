const fs = require('fs');
const path = 'src/pages/BarcodeGenerator.jsx';
let content = fs.readFileSync(path, 'utf8');

const importTarget = `import React, { useState, useRef } from 'react';`;
const newImport = `import React, { useState, useRef, useEffect } from 'react';`;
content = content.replace(importTarget, newImport);

const stateTarget = `  const barcodeRef = useRef(null);`;
const newState = `  const barcodeRef = useRef(null);\n  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);\n\n  useEffect(() => {\n    const handleResize = () => setIsMobile(window.innerWidth < 1024);\n    window.addEventListener('resize', handleResize);\n    return () => window.removeEventListener('resize', handleResize);\n  }, []);`;
content = content.replace(stateTarget, newState);

fs.writeFileSync(path, content);
console.log('Fixed state accurately!');
