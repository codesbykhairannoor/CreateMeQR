import React, { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'
import './i18n'

// Removed static SEO deletion to support White-Hat React rendering

// Suppress harmless external wasm-bindgen initialization warning in browser console
if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('using deprecated parameters for the initialization function')) {
      return;
    }
    originalWarn(...args);
  };
}

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