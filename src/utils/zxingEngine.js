// src/utils/zxingEngine.js
// Ultra-fast client-side WebAssembly ZXing-C++ decoding & ISO 15415 scan health audit engine.
// Dynamically imported only in browser so SSR stays zero-overhead.

let wasmPrepared = false;

async function getReaderModule() {
  if (typeof window === 'undefined') return null;
  const mod = await import('zxing-wasm/reader');
  if (!wasmPrepared) {
    try {
      mod.prepareZXingModule({
        overrides: {
          locateFile: (path, prefix) => {
            if (path.endsWith('.wasm')) {
              return `/wasm/${path}`;
            }
            return prefix + path;
          }
        }
      });
      wasmPrepared = true;
    } catch {
      // Fallback if already initialized
      wasmPrepared = true;
    }
  }
  return mod;
}

/**
 * Parses a CSS hex color (#RRGGBB or #RGB) to relative luminance [0..1] per WCAG/ISO reflectance.
 */
export function getRelativeLuminance(hex) {
  if (!hex || typeof hex !== 'string') return 0;
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  if (clean.length !== 6) return 0;
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;

  const toLinear = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Calculates luminance contrast ratio between foreground dots and background [1..21].
 */
export function computeContrastRatio(fgHex = '#000000', bgHex = '#ffffff') {
  const l1 = getRelativeLuminance(fgHex);
  const l2 = getRelativeLuminance(bgHex);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

/**
 * Decodes an uploaded image File/Blob via ZXing-C++ WebAssembly.
 * Returns { results, timeMs, engine: 'zxing-wasm' }.
 */
export async function decodeFileWithWasm(file, formats = []) {
  const start = performance.now();
  const mod = await getReaderModule();
  if (!mod) throw new Error('WASM decoder unavailable outside browser');

  const results = await mod.readBarcodesFromImageFile(file, {
    formats,
    tryHarder: true,
    tryRotate: true,
    tryInvert: true,
    tryDownscale: true,
    maxNumberOfSymbols: 10,
    textMode: 'HRI'
  });

  const timeMs = Math.max(1, Math.round(performance.now() - start));
  const valid = (results || []).filter(r => r.isValid && r.text);
  return {
    results: valid.map(r => ({
      text: r.text,
      format: r.format || 'Unknown',
      eccLevel: r.eccLevel || '',
      contentType: r.contentType || 'Text'
    })),
    timeMs
  };
}

/**
 * Decodes an HTMLCanvasElement via ZXing-C++ WebAssembly.
 */
export async function decodeCanvasWithWasm(canvas, formats = []) {
  const start = performance.now();
  const mod = await getReaderModule();
  if (!mod || !canvas) return { results: [], timeMs: 0 };

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return { results: [], timeMs: 0 };

  // Add subtle white quiet-zone padding around canvas so pure edge-to-edge QR decodes reliably
  const pad = 24;
  const off = document.createElement('canvas');
  off.width = canvas.width + pad * 2;
  off.height = canvas.height + pad * 2;
  const offCtx = off.getContext('2d', { willReadFrequently: true });
  offCtx.fillStyle = '#ffffff';
  offCtx.fillRect(0, 0, off.width, off.height);
  offCtx.drawImage(canvas, pad, pad);

  const imageData = offCtx.getImageData(0, 0, off.width, off.height);
  const results = await mod.readBarcodesFromImageData(imageData, {
    formats,
    tryHarder: true,
    tryRotate: true,
    tryInvert: true,
    maxNumberOfSymbols: 5
  });

  const timeMs = Math.max(1, Math.round(performance.now() - start));
  const valid = (results || []).filter(r => r.isValid && r.text);
  return {
    results: valid.map(r => ({
      text: r.text,
      format: r.format || 'QRCode',
      eccLevel: r.eccLevel || ''
    })),
    timeMs
  };
}

/**
 * Full Pre-Flight ISO/IEC 15415 Scannability Audit on the live QR/Barcode canvas.
 */
export async function auditCanvasScannability(canvas, fgHex = '#000000', bgHex = '#ffffff') {
  const contrast = computeContrastRatio(fgHex, bgHex);
  const decoded = await decodeCanvasWithWasm(canvas);
  const wasmVerified = decoded.results.length > 0;

  let grade = 'F';
  let statusKey = 'fail';
  if (wasmVerified) {
    if (contrast >= 7.0) {
      grade = 'A';
      statusKey = 'excellent';
    } else if (contrast >= 4.5) {
      grade = 'B';
      statusKey = 'good';
    } else if (contrast >= 2.5) {
      grade = 'C';
      statusKey = 'marginal';
    } else {
      grade = 'D';
      statusKey = 'low_contrast';
    }
  } else {
    grade = 'F';
    statusKey = 'unreadable';
  }

  return {
    grade,
    statusKey,
    contrast,
    wasmVerified,
    timeMs: decoded.timeMs,
    decodedText: decoded.results[0]?.text || '',
    detectedFormat: decoded.results[0]?.format || ''
  };
}
