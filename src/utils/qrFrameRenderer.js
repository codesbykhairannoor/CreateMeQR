// src/utils/qrFrameRenderer.js
// Studio Themes, CTA Frame Definitions, and High-DPI Canvas & Vector Frame Compositor.

export const STUDIO_THEMES = [
  {
    id: 'swiss',
    name: 'Swiss Minimalist',
    fg: '#0f172a',
    bg: '#ffffff',
    eyeOuter: '#0f172a',
    eyeInner: '#2563eb',
    dotsType: 'square',
    cornersType: 'square',
    cornerDotType: 'square',
    frameStyle: 'none'
  },
  {
    id: 'midnight',
    name: 'Midnight Cyber',
    fg: '#1e3a8a',
    bg: '#f8fafc',
    eyeOuter: '#1d4ed8',
    eyeInner: '#06b6d4',
    dotsType: 'rounded',
    cornersType: 'extra-rounded',
    cornerDotType: 'dot',
    gradient: { type: 'linear', rotation: 45, colorStops: [{ offset: 0, color: '#0f172a' }, { offset: 1, color: '#2563eb' }] }
  },
  {
    id: 'emerald',
    name: 'Emerald Luxury',
    fg: '#064e3b',
    bg: '#ffffff',
    eyeOuter: '#065f46',
    eyeInner: '#10b981',
    dotsType: 'classy-rounded',
    cornersType: 'extra-rounded',
    cornerDotType: 'dot'
  },
  {
    id: 'obsidian',
    name: 'Obsidian Gold',
    fg: '#18181b',
    bg: '#fffbeb',
    eyeOuter: '#18181b',
    eyeInner: '#d97706',
    dotsType: 'dots',
    cornersType: 'extra-rounded',
    cornerDotType: 'dot'
  },
  {
    id: 'coral',
    name: 'Vibrant Coral',
    fg: '#be123c',
    bg: '#fff1f2',
    eyeOuter: '#9f1239',
    eyeInner: '#f43f5e',
    dotsType: 'classy',
    cornersType: 'extra-rounded',
    cornerDotType: 'square'
  },
  {
    id: 'blueprint',
    name: 'Blueprint CAD',
    fg: '#1e40af',
    bg: '#eff6ff',
    eyeOuter: '#1e3a8a',
    eyeInner: '#3b82f6',
    dotsType: 'square',
    cornersType: 'square',
    cornerDotType: 'square'
  }
];

export const CTA_FRAMES = [
  { id: 'none', label: 'No Frame', isPro: false },
  { id: 'bottom-pill', label: 'Bottom Pill', isPro: false },
  { id: 'top-banner', label: 'Top Header', isPro: true },
  { id: 'polaroid', label: 'Polaroid Card', isPro: true },
  { id: 'phone-stand', label: 'Dark Showcase', isPro: true },
  { id: 'ticket', label: 'Ticket Pass', isPro: true }
];

function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Composites a QR Canvas element into a crisp high-resolution framed Canvas.
 */
export function composeFramedCanvas(sourceQrCanvas, frameOptions = {}, qrBackground = '#ffffff') {
  const style = frameOptions?.style || 'none';
  if (!sourceQrCanvas || style === 'none') {
    return sourceQrCanvas;
  }

  const text = (frameOptions.text || 'SCAN ME').trim().slice(0, 28);
  const accentColor = frameOptions.color || '#1d4ed8';
  const textColor = frameOptions.textColor || '#ffffff';

  // Upscale 3x for razor-sharp PNG output
  const targetQrSize = 900;
  const pad = 70;
  let canvasW = targetQrSize + pad * 2;
  let canvasH = targetQrSize + pad * 2;
  let qrX = pad;
  let qrY = pad;

  const out = document.createElement('canvas');

  if (style === 'bottom-pill') {
    canvasH = targetQrSize + pad * 2 + 130;
    out.width = canvasW;
    out.height = canvasH;
    const ctx = out.getContext('2d');
    ctx.fillStyle = qrBackground;
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Outer frame card
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 14;
    drawRoundedRect(ctx, 18, 18, canvasW - 36, canvasH - 36, 48);
    ctx.stroke();

    // Draw QR
    ctx.drawImage(sourceQrCanvas, qrX, qrY, targetQrSize, targetQrSize);

    // Bottom pill badge
    const pillW = Math.min(canvasW - 140, Math.max(420, text.length * 32 + 120));
    const pillH = 92;
    const pillX = (canvasW - pillW) / 2;
    const pillY = targetQrSize + pad + 18;
    ctx.fillStyle = accentColor;
    drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 46);
    ctx.fill();

    ctx.fillStyle = textColor;
    ctx.font = '800 42px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvasW / 2, pillY + pillH / 2 + 2);
  } else if (style === 'top-banner') {
    const headerH = 140;
    canvasH = targetQrSize + pad * 2 + headerH - 20;
    qrY = headerH + 35;
    out.width = canvasW;
    out.height = canvasH;
    const ctx = out.getContext('2d');

    ctx.fillStyle = qrBackground;
    drawRoundedRect(ctx, 0, 0, canvasW, canvasH, 44);
    ctx.fill();

    // Top Header Bar
    ctx.fillStyle = accentColor;
    ctx.fillRect(0, 0, canvasW, headerH);

    ctx.fillStyle = textColor;
    ctx.font = '800 48px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvasW / 2, headerH / 2 + 2);

    ctx.drawImage(sourceQrCanvas, qrX, qrY, targetQrSize, targetQrSize);
  } else if (style === 'polaroid') {
    canvasH = targetQrSize + pad * 2 + 170;
    out.width = canvasW;
    out.height = canvasH;
    const ctx = out.getContext('2d');

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Inner QR box backdrop
    ctx.fillStyle = qrBackground;
    ctx.fillRect(qrX - 10, qrY - 10, targetQrSize + 20, targetQrSize + 20);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 6;
    ctx.strokeRect(qrX - 10, qrY - 10, targetQrSize + 20, targetQrSize + 20);

    ctx.drawImage(sourceQrCanvas, qrX, qrY, targetQrSize, targetQrSize);

    // Handwritten-feel bold caption
    ctx.fillStyle = accentColor;
    ctx.font = '800 50px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvasW / 2, targetQrSize + pad + 95);
  } else if (style === 'phone-stand') {
    const topPad = 80;
    const footerH = 150;
    canvasH = targetQrSize + pad + topPad + footerH;
    qrY = topPad;
    out.width = canvasW;
    out.height = canvasH;
    const ctx = out.getContext('2d');

    // Rich dark casing
    const grad = ctx.createLinearGradient(0, 0, canvasW, canvasH);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(1, '#020617');
    ctx.fillStyle = grad;
    drawRoundedRect(ctx, 0, 0, canvasW, canvasH, 64);
    ctx.fill();

    // Inner bright QR window
    ctx.fillStyle = qrBackground;
    drawRoundedRect(ctx, qrX - 20, qrY - 20, targetQrSize + 40, targetQrSize + 40, 36);
    ctx.fill();

    ctx.drawImage(sourceQrCanvas, qrX, qrY, targetQrSize, targetQrSize);

    // Footer glowing CTA button
    const btnW = Math.min(canvasW - 120, Math.max(460, text.length * 34 + 120));
    const btnH = 88;
    const btnX = (canvasW - btnW) / 2;
    const btnY = qrY + targetQrSize + 52;
    ctx.fillStyle = accentColor;
    drawRoundedRect(ctx, btnX, btnY, btnW, btnH, 44);
    ctx.fill();

    ctx.fillStyle = textColor;
    ctx.font = '800 40px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvasW / 2, btnY + btnH / 2 + 2);
  } else if (style === 'ticket') {
    const footerH = 150;
    canvasH = targetQrSize + pad * 2 + footerH;
    out.width = canvasW;
    out.height = canvasH;
    const ctx = out.getContext('2d');

    ctx.fillStyle = qrBackground;
    ctx.fillRect(0, 0, canvasW, canvasH);

    // Dashed ticket perforation
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 8;
    ctx.setLineDash([24, 18]);
    ctx.beginPath();
    ctx.moveTo(40, targetQrSize + pad + 20);
    ctx.lineTo(canvasW - 40, targetQrSize + pad + 20);
    ctx.stroke();
    ctx.setLineDash([]);

    // Border
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 12;
    drawRoundedRect(ctx, 16, 16, canvasW - 32, canvasH - 32, 32);
    ctx.stroke();

    ctx.drawImage(sourceQrCanvas, qrX, qrY, targetQrSize, targetQrSize);

    ctx.fillStyle = accentColor;
    ctx.font = '800 46px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvasW / 2, targetQrSize + pad + 98);
  }

  return out;
}
