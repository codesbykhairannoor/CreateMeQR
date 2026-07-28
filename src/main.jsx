import React, { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'
import './i18n'

// Dynamic Replacement: Remove static SEO block once React mounts
document.getElementById('static-seo')?.remove();

// Optional Global Loading State
const LoadingScreen = () => (
  <div className="min-h-screen bg-[#f8fafc] dark:bg-[#040a18] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
setTimeout(() => document.body.classList.add('ready'), 50); 