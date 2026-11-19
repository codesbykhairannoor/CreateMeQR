// src/components/MockupStudioModal.jsx
// Real-World 3D/2.5D Mockup Studio rendered 100% client-side on HTML5 Canvas.
// Allows live preview across 4 commercial scenes with high-res PRO PNG export.

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { X, Download, Sparkles, Coffee, Package, Shirt, BadgeCheck } from 'lucide-react';

const MOCKUP_SCENES = [
  { id: 'acrylic', label: 'Café Acrylic Stand', icon: Coffee, defaultHeadline: 'SCAN FOR MENU' },
  { id: 'pouch', label: 'Product Packaging Pouch', icon: Package, defaultHeadline: 'AUTHENTIC PRODUCT' },
  { id: 'apparel', label: 'Streetwear Tee Print', icon: Shirt, defaultHeadline: 'SCAN TO CONNECT' },
  { id: 'lanyard', label: 'VIP Event Lanyard Pass', icon: BadgeCheck, defaultHeadline: 'VIP ACCESS PASS' }
];

function drawRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function renderSceneToCanvas(canvas, qrImg, sceneId, headlineText) {
  if (!canvas || !qrImg) return;
  const W = 1400;
  const H = 1000;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  const label = (headlineText || 'SCAN ME').toUpperCase().slice(0, 28);

  if (sceneId === 'acrylic') {
    // Warm architectural wall + oak cafe table background
    const wallGrad = ctx.createLinearGradient(0, 0, 0, 680);
    wallGrad.addColorStop(0, '#f1f5f9');
    wallGrad.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = wallGrad;
    ctx.fillRect(0, 0, W, 680);

    // Subtle soft window light
    const lightGrad = ctx.createRadialGradient(350, 180, 40, 350, 180, 620);
    lightGrad.addColorStop(0, 'rgba(255,255,255,0.85)');
    lightGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = lightGrad;
    ctx.fillRect(0, 0, W, 680);

    // Oak wood table
    const tableGrad = ctx.createLinearGradient(0, 650, 0, H);
    tableGrad.addColorStop(0, '#c29b70');
    tableGrad.addColorStop(0.25, '#a47e54');
    tableGrad.addColorStop(1, '#785836');
    ctx.fillStyle = tableGrad;
    ctx.fillRect(0, 650, W, H - 650);

    // Table edge highlight
    ctx.fillStyle = 'rgba(255,255,255,0.22)';
    ctx.fillRect(0, 650, W, 4);

    // Cast shadow on table
    ctx.save();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.25)';
    ctx.filter = 'blur(26px)';
    drawRoundRect(ctx, 450, 745, 520, 110, 40);
    ctx.fill();
    ctx.restore();

    // Wooden base block
    const baseGrad = ctx.createLinearGradient(470, 725, 930, 825);
    baseGrad.addColorStop(0, '#3e2723');
    baseGrad.addColorStop(0.5, '#5d4037');
    baseGrad.addColorStop(1, '#2d1c18');
    ctx.fillStyle = baseGrad;
    drawRoundRect(ctx, 470, 735, 460, 86, 22);
    ctx.fill();

    // Acrylic plaque outer bevel (with subtle 2.5D tilt look)
    ctx.save();
    ctx.shadowColor = 'rgba(15, 23, 42, 0.22)';
    ctx.shadowBlur = 45;
    ctx.shadowOffsetX = 16;
    ctx.shadowOffsetY = 24;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
    drawRoundRect(ctx, 485, 165, 430, 585, 34);
    ctx.fill();
    ctx.restore();

    // Acrylic glossy border edge
    ctx.strokeStyle = 'rgba(203, 213, 225, 0.95)';
    ctx.lineWidth = 4;
    drawRoundRect(ctx, 485, 165, 430, 585, 34);
    ctx.stroke();

    // Top dark brand pill
    ctx.fillStyle = '#0f172a';
    drawRoundRect(ctx, 560, 215, 280, 48, 24);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 20px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, 700, 239);

    // QR Code centered
    ctx.drawImage(qrImg, 535, 295, 330, 330);

    // Subtle footer line
    ctx.fillStyle = '#64748b';
    ctx.font = '600 17px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText('CREATEMY-QR STUDIO • VERIFIED', 700, 682);

  } else if (sceneId === 'pouch') {
    // Studio gradient background
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#0f172a');
    bg.addColorStop(1, '#1e293b');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Pedestal shadow
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.filter = 'blur(32px)';
    ctx.beginPath();
    ctx.ellipse(700, 880, 280, 42, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Matte craft pouch body
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.45)';
    ctx.shadowBlur = 60;
    ctx.shadowOffsetY = 20;
    const pouchGrad = ctx.createLinearGradient(420, 120, 980, 860);
    pouchGrad.addColorStop(0, '#27272a');
    pouchGrad.addColorStop(0.45, '#18181b');
    pouchGrad.addColorStop(1, '#09090b');
    ctx.fillStyle = pouchGrad;
    drawRoundRect(ctx, 435, 115, 530, 750, 42);
    ctx.fill();
    ctx.restore();

    // Pouch zipper notch line
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(455, 195);
    ctx.lineTo(945, 195);
    ctx.stroke();

    // Subtle metallic foil sheen
    const sheen = ctx.createLinearGradient(435, 115, 965, 865);
    sheen.addColorStop(0, 'rgba(255,255,255,0.08)');
    sheen.addColorStop(0.5, 'rgba(255,255,255,0)');
    sheen.addColorStop(1, 'rgba(255,255,255,0.03)');
    ctx.fillStyle = sheen;
    drawRoundRect(ctx, 435, 115, 530, 750, 42);
    ctx.fill();

    // White Sticker Label on Pouch
    ctx.fillStyle = '#ffffff';
    drawRoundRect(ctx, 515, 290, 370, 450, 26);
    ctx.fill();

    // Gold/Blue label strip
    ctx.fillStyle = '#1d4ed8';
    drawRoundRect(ctx, 515, 290, 370, 72, 26);
    ctx.fill();
    ctx.fillRect(515, 336, 370, 26);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 20px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, 700, 326);

    ctx.drawImage(qrImg, 555, 385, 290, 290);

    ctx.fillStyle = '#475569';
    ctx.font = '700 15px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText('100% TRACEABLE BATCH PACKAGING', 700, 708);

  } else if (sceneId === 'apparel') {
    // Editorial concrete backdrop
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#e2e8f0');
    bg.addColorStop(1, '#cbd5e1');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Minimalist Heavyweight T-Shirt Silhouette
    ctx.save();
    ctx.shadowColor = 'rgba(15, 23, 42, 0.25)';
    ctx.shadowBlur = 50;
    ctx.shadowOffsetY = 24;

    const teeGrad = ctx.createLinearGradient(300, 100, 1100, 920);
    teeGrad.addColorStop(0, '#1e293b');
    teeGrad.addColorStop(0.5, '#0f172a');
    teeGrad.addColorStop(1, '#020617');
    ctx.fillStyle = teeGrad;

    ctx.beginPath();
    ctx.moveTo(540, 120);
    ctx.quadraticCurveTo(700, 165, 860, 120); // Collar
    ctx.lineTo(1060, 200); // Right shoulder
    ctx.lineTo(1160, 410); // Right sleeve
    ctx.lineTo(990, 470);  // Right underarm
    ctx.lineTo(980, 910);  // Right hem
    ctx.lineTo(420, 910);  // Bottom hem
    ctx.lineTo(410, 470);  // Left underarm
    ctx.lineTo(240, 410);  // Left sleeve
    ctx.lineTo(340, 200);  // Left shoulder
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // White high-contrast chest/back print block
    ctx.fillStyle = '#ffffff';
    drawRoundRect(ctx, 535, 310, 330, 400, 22);
    ctx.fill();

    ctx.drawImage(qrImg, 560, 335, 280, 280);

    ctx.fillStyle = '#0f172a';
    ctx.font = '900 22px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, 700, 662);

  } else if (sceneId === 'lanyard') {
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#eff6ff');
    bg.addColorStop(1, '#dbeafe');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Braided lanyard straps from top
    ctx.strokeStyle = '#1e3a8a';
    ctx.lineWidth = 42;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(575, -20);
    ctx.lineTo(682, 235);
    ctx.stroke();

    ctx.strokeStyle = '#1d4ed8';
    ctx.beginPath();
    ctx.moveTo(825, -20);
    ctx.lineTo(718, 235);
    ctx.stroke();

    // Brushed metal clip
    ctx.fillStyle = '#94a3b8';
    drawRoundRect(ctx, 672, 205, 56, 62, 12);
    ctx.fill();
    ctx.fillStyle = '#e2e8f0';
    drawRoundRect(ctx, 684, 215, 32, 30, 8);
    ctx.fill();

    // PVC Badge Card
    ctx.save();
    ctx.shadowColor = 'rgba(15, 23, 42, 0.28)';
    ctx.shadowBlur = 55;
    ctx.shadowOffsetY = 22;

    const cardGrad = ctx.createLinearGradient(475, 255, 925, 895);
    cardGrad.addColorStop(0, '#0f172a');
    cardGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = cardGrad;
    drawRoundRect(ctx, 475, 255, 450, 640, 36);
    ctx.fill();
    ctx.restore();

    // Top badge punch hole
    ctx.fillStyle = '#dbeafe';
    drawRoundRect(ctx, 650, 282, 100, 18, 9);
    ctx.fill();

    // Accent strip
    ctx.fillStyle = '#3b82f6';
    ctx.font = '800 22px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, 700, 355);

    // Crisp QR backing box
    ctx.fillStyle = '#ffffff';
    drawRoundRect(ctx, 540, 405, 320, 320, 26);
    ctx.fill();

    ctx.drawImage(qrImg, 560, 425, 280, 280);

    // Footer credentials
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '700 18px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText('VERIFIED CREDENTIAL • ZERO-SERVER', 700, 815);
  }
}

export default function MockupStudioModal({ isOpen, onClose, qrCanvasUrl, defaultHeadline = 'SCAN ME' }) {
  const { t } = useTranslation();
  const { user, isPro, freeTrialsRemaining, consumeProFeature } = useAuth();
  const [selectedScene, setSelectedScene] = useState('acrylic');
  const [headline, setHeadline] = useState(defaultHeadline);
  const previewCanvasRef = useRef(null);

  useEffect(() => {
    const activeSceneObj = MOCKUP_SCENES.find(s => s.id === selectedScene);
    if (activeSceneObj) {
      setHeadline(prev => (!prev || MOCKUP_SCENES.some(s => s.defaultHeadline === prev)) ? activeSceneObj.defaultHeadline : prev);
    }
  }, [selectedScene]);

  useEffect(() => {
    if (!isOpen || !qrCanvasUrl || !previewCanvasRef.current) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      renderSceneToCanvas(previewCanvasRef.current, img, selectedScene, headline);
    };
    img.src = qrCanvasUrl;
  }, [isOpen, qrCanvasUrl, selectedScene, headline]);

  if (!isOpen) return null;

  const handleDownloadMockup = async () => {
    if (!isPro) {
      const allowed = await consumeProFeature(t('proAlert.mockupFeature', '3D Real-World Mockup Studio'));
      if (!allowed) {
        onClose();
        return;
      }
    }
    if (!previewCanvasRef.current) return;
    const dataUrl = previewCanvasRef.current.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.download = `createmyqr-mockup-${selectedScene}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-5xl bg-white dark:bg-[#081226] border border-slate-200 dark:border-[#1e2d4a] rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row z-10 max-h-[92vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Controls Sidebar */}
        <div className="w-full lg:w-80 p-6 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-[#1e2d4a] flex flex-col justify-between bg-slate-50/70 dark:bg-[#040a18]/60 overflow-y-auto">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 text-[11px] font-bold mb-3 border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('mockup.badge', '3D Mockup Engine')}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1 capitalize">
              {t('mockup.title', 'Real-World Mockup Studio')}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              {t('mockup.subtitle', 'Preview and export high-resolution 1400px commercial mockups rendered 100% locally in your browser.')}
            </p>

            {/* Scene Selector */}
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2.5 capitalize">
              {t('mockup.sceneLabel', 'Select Mockup Scene')}
            </label>
            <div className="space-y-2 mb-6">
              {MOCKUP_SCENES.map((scene) => {
                const Icon = scene.icon;
                const active = selectedScene === scene.id;
                return (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => setSelectedScene(scene.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : 'bg-white dark:bg-[#0c1831] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/70 hover:border-blue-400'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{scene.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom Headline */}
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 capitalize">
              {t('mockup.captionLabel', 'Scene Caption Text')}
            </label>
            <input
              type="text"
              maxLength={28}
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="SCAN FOR MENU"
              className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl bg-white dark:bg-[#0c1831] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          <div className="pt-6 mt-6 border-t border-slate-200 dark:border-[#1e2d4a]">
            <button
              type="button"
              onClick={handleDownloadMockup}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t('mockup.downloadBtn', 'Download 1400px PNG')}</span>
              {!isPro && (
                <span className="ml-1 px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-blue-400/25 text-blue-100 border border-blue-300/40 uppercase flex items-center gap-0.5">
                  <Sparkles size={9} /> {user && freeTrialsRemaining > 0 ? `${freeTrialsRemaining} Free` : 'PRO'}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Right Canvas Preview */}
        <div className="flex-1 p-6 sm:p-8 flex items-center justify-center bg-slate-100 dark:bg-[#020617] overflow-hidden">
          <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-slate-200 dark:bg-slate-900">
            <canvas ref={previewCanvasRef} className="w-full h-auto block" />
          </div>
        </div>
      </div>
    </div>
  );
}
