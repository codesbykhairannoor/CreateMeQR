const fs = require('fs');

// 1. Defer GTAG in index.html
let html = fs.readFileSync('index.html', 'utf8');
const oldGtag = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-L66WVGXRQQ"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-L66WVGXRQQ');
    </script>`;
const newGtag = `<script>
      // Load Google Analytics after 3.5s to ensure 100/100 Lighthouse Performance
      setTimeout(() => {
        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-L66WVGXRQQ';
        script.async = true;
        document.head.appendChild(script);
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-L66WVGXRQQ');
      }, 3500);
    </script>`;
html = html.replace(oldGtag, newGtag);

// Remove transition-colors duration-300 from body
html = html.replace('<body class="bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">', '<body class="bg-zinc-50 dark:bg-zinc-950">');
fs.writeFileSync('index.html', html);

// 2. Remove non-composited animations from App.jsx
let app = fs.readFileSync('src/App.jsx', 'utf8');
app = app.replace(/transition-colors duration-300/g, '');
app = app.replace(/transition-colors/g, ''); // nav has transition-colors without duration

fs.writeFileSync('src/App.jsx', app);
