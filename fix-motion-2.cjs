const fs = require('fs');
let app = fs.readFileSync('src/App.jsx', 'utf8');

// Use regex to match and replace the remaining motion.div tags
app = app.replace(
  /<motion\.div\s+initial={{ opacity: 0, y: 10 }}\s+animate={{ opacity: 1, y: 0 }}\s+transition={{ duration: 0\.5, ease: "easeOut" }}\s*>/,
  '<div className="animate-fade-in-up">'
);

app = app.replace(
  /<motion\.div\s+className="lg:col-span-7 lg:col-start-1 flex flex-col"\s+initial={{ opacity: 0, x: -20 }}\s+animate={{ opacity: 1, x: 0 }}\s+transition={{ duration: 0\.5, delay: 0\.1 }}\s*>/,
  '<div className="lg:col-span-7 lg:col-start-1 flex flex-col animate-fade-in-right">'
);

app = app.replace(
  /<motion\.div\s+className="lg:col-span-5 flex justify-center"\s+initial={{ opacity: 0, y: 20 }}\s+animate={{ opacity: 1, y: 0 }}\s+transition={{ duration: 0\.5, delay: 0\.2 }}\s*>/,
  '<div className="lg:col-span-5 flex justify-center animate-fade-in-up-delay">'
);

fs.writeFileSync('src/App.jsx', app);
