import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function prerender() {
  // Polyfill window and document
  global.window = {
    location: { pathname: '/en/wifi', search: '', hash: '' }
  };
  global.document = {
    documentElement: { dir: 'ltr' },
    querySelector: () => null,
    createElement: () => ({}),
    cookie: '',
  };
  global.location = global.window.location;
  global.localStorage = { getItem: () => null, setItem: () => {} };
  global.navigator = { language: 'en' };

  try {
    const serverModule = await import('./dist/server/entry-server.js');
    const { render } = serverModule;
    
    const helmetContext = {};
    const html = render('/en/wifi', helmetContext);
    console.log("Successfully rendered HTML length:", html.length);
    console.log(html.substring(0, 500));
  } catch (err) {
    console.error("SSR Error:", err);
  }
}

prerender();
