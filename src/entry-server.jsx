import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import i18n from './i18n';

export function render(url, helmetContext, lang = 'en', translations = null) {
  // Inject translations synchronously for SSR
  if (translations && lang !== 'en') {
    i18n.addResourceBundle(lang, 'translation', translations, true, true);
  }
  i18n.changeLanguage(lang);

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  )
  return html
}
