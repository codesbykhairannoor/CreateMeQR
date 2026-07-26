const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'LandingContent.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace React.lazy with standard imports
content = content.replace(/const (Layout[a-zA-Z0-9]+) = React\.lazy\(\(\) => import\('([^']+)'\)\);/g, "import $1 from '$2';");

// Remove Suspense from import
content = content.replace(/import React, { Suspense } from 'react';/, "import React from 'react';");

// Remove Suspense wrap
content = content.replace(/<Suspense fallback=\{<div[^>]*>Loading layout...<\/div>\}>/g, "");
content = content.replace(/<\/Suspense>/g, "");

fs.writeFileSync(filePath, content);
console.log("Fixed LandingContent.jsx");
