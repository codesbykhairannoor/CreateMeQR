const fs = require('fs');

// 1. Remove framer-motion from App.jsx
let app = fs.readFileSync('src/App.jsx', 'utf8');

// Remove import
app = app.replace("import { motion } from 'framer-motion';\n", "");

// Replace motion.div with normal div and animation classes
// Block 1: text-center max-w-3xl
app = app.replace(
  /<motion\.div \s*className="text-center max-w-3xl mx-auto mb-16"\s*initial={{ opacity: 0, y: 20 }}\s*animate={{ opacity: 1, y: 0 }}\s*transition={{ duration: 0\.5 }}\s*>/g,
  '<div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">'
);

// Block 2: lg:col-span-7
app = app.replace(
  /<motion\.div \s*className="lg:col-span-7"\s*initial={{ opacity: 0, x: -20 }}\s*animate={{ opacity: 1, x: 0 }}\s*transition={{ duration: 0\.5, delay: 0\.2 }}\s*>/g,
  '<div className="lg:col-span-7 animate-fade-in-right">'
);

// Block 3: p-2 (inside CustomizationPanel wrapper)
app = app.replace(
  /<motion\.div\s*initial={{ opacity: 0, y: 10 }}\s*animate={{ opacity: 1, y: 0 }}\s*transition={{ duration: 0\.3 }}\s*className="p-2"\s*>/g,
  '<div className="p-2 animate-fade-in-up-fast">'
);

// Block 4: lg:col-span-5
app = app.replace(
  /<motion\.div \s*className="lg:col-span-5 flex justify-center"\s*initial={{ opacity: 0, y: 20 }}\s*animate={{ opacity: 1, y: 0 }}\s*transition={{ duration: 0\.5, delay: 0\.3 }}\s*>/g,
  '<div className="lg:col-span-5 flex justify-center animate-fade-in-up-delay">'
);

// Replace closing tags
app = app.replace(/<\/motion\.div>/g, '</div>');

fs.writeFileSync('src/App.jsx', app);

// 2. Add custom CSS animations to index.css
let css = fs.readFileSync('src/index.css', 'utf8');

const customAnimations = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes fadeInUpFast {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}
.animate-fade-in-right {
  animation: fadeInRight 0.5s ease-out 0.2s forwards;
  opacity: 0;
}
.animate-fade-in-up-delay {
  animation: fadeInUp 0.5s ease-out 0.3s forwards;
  opacity: 0;
}
.animate-fade-in-up-fast {
  animation: fadeInUpFast 0.3s ease-out forwards;
}
`;

if (!css.includes('@keyframes fadeInUp')) {
  fs.writeFileSync('src/index.css', css + '\n' + customAnimations);
}
