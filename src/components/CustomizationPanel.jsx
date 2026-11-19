import React from 'react';
import { useTranslation } from 'react-i18next';
import { Palette, Image as ImageIcon, LayoutTemplate, ChevronDown, ChevronUp, Sparkles, Frame } from 'lucide-react';
import { STUDIO_THEMES, CTA_FRAMES } from '../utils/qrFrameRenderer';
import { useAuth } from '../context/AuthContext';

const Accordion = ({ title, icon: Icon, badge, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const { t } = useTranslation();
  const keywordString = t('seoKeywords', { returnObjects: true });
  const keywordArray = typeof keywordString === 'string' ? keywordString.split(',').map(k => k.trim()) : [];
  const topKeywords = keywordArray.slice(5, 10).join(', ');

  return (
    <div className="border border-blue-100 dark:border-slate-700/80 rounded-2xl mb-3.5 bg-transparent overflow-hidden">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`${title} - ${topKeywords}`}
        className="w-full px-4 py-3.5 flex items-center justify-between bg-[#f8fafc] dark:bg-blue-950/30 hover:bg-blue-50/80 dark:hover:bg-blue-900/40 transition-colors cursor-pointer"
      >
        <div className="flex items-center text-zinc-900 dark:text-white font-semibold text-sm">
          {Icon && <Icon className="w-4 h-4 mr-2.5 text-blue-600 dark:text-blue-400" />}
          <span>{title}</span>
          {badge && (
            <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
              {badge}
            </span>
          )}
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-blue-100 dark:border-slate-700/80 bg-white dark:bg-[#081226]">
          {children}
        </div>
      )}
    </div>
  );
};

export default function CustomizationPanel({ visuals, setVisuals }) {
  const { t } = useTranslation();
  const { user, isPro, freeTrialsRemaining } = useAuth();

  const applyStudioTheme = (theme) => {
    setVisuals(prev => ({
      ...prev,
      dotsOptions: {
        ...prev.dotsOptions,
        type: theme.dotsType,
        color: theme.gradient ? undefined : theme.fg,
        gradient: theme.gradient || undefined
      },
      backgroundOptions: {
        ...prev.backgroundOptions,
        color: theme.bg
      },
      cornersSquareOptions: {
        ...prev.cornersSquareOptions,
        type: theme.cornersType,
        color: theme.eyeOuter
      },
      cornersDotOptions: {
        ...prev.cornersDotOptions,
        type: theme.cornerDotType,
        color: theme.eyeInner
      }
    }));
  };

  const handleColorChange = (key, value) => {
    setVisuals(prev => {
      const next = { ...prev };
      if (key === 'foreground') {
        next.dotsOptions = { ...next.dotsOptions, color: value, gradient: undefined };
      } else if (key === 'background') {
        next.backgroundOptions = { ...next.backgroundOptions, color: value };
      }
      return next;
    });
  };

  const handleShapeChange = (key, value) => {
    setVisuals(prev => ({
      ...prev,
      [key]: { ...prev[key], type: value }
    }));
  };

  const handleGradientToggle = (e) => {
    const isGradient = e.target.checked;
    setVisuals(prev => ({
      ...prev,
      dotsOptions: {
        ...prev.dotsOptions,
        type: prev.dotsOptions.type,
        gradient: isGradient ? {
          type: 'linear',
          rotation: 45,
          colorStops: [{ offset: 0, color: prev.dotsOptions.color || '#0a1930' }, { offset: 1, color: '#2563eb' }]
        } : undefined,
        color: isGradient ? undefined : (prev.dotsOptions.color || '#0a1930')
      }
    }));
  };

  const handleEyeOuterColorChange = (value) => {
    setVisuals(prev => ({
      ...prev,
      cornersSquareOptions: { ...prev.cornersSquareOptions, color: value }
    }));
  };

  const handleEyeInnerColorChange = (value) => {
    setVisuals(prev => ({
      ...prev,
      cornersDotOptions: { ...prev.cornersDotOptions, color: value }
    }));
  };

  const handleFrameOptionChange = (key, value) => {
    setVisuals(prev => ({
      ...prev,
      frameOptions: {
        ...(prev.frameOptions || { style: 'none', text: 'SCAN ME', color: '#1d4ed8', textColor: '#ffffff' }),
        [key]: value
      }
    }));
  };

  const handleLogoOptionChange = (key, value) => {
    setVisuals(prev => ({
      ...prev,
      imageOptions: { ...prev.imageOptions, [key]: parseFloat(value) }
    }));
  };

  const handleQrOptionChange = (key, value) => {
    setVisuals(prev => ({
      ...prev,
      qrOptions: { ...prev.qrOptions, [key]: value }
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setVisuals(prev => ({ ...prev, image: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setVisuals(prev => ({ ...prev, image: null }));
  };

  const currentFrame = visuals.frameOptions || { style: 'none', text: 'SCAN ME', color: '#1d4ed8', textColor: '#ffffff' };

  return (
    <div className="bg-transparent rounded-xl p-2 sm:p-4">
      
      {/* 1. Studio Quick Themes & CTA Frames */}
      <Accordion title={t('customization.studioThemes', 'Studio Themes & CTA Frames')} icon={Frame} badge="New" defaultOpen={true}>
        <div className="space-y-5">
          {/* 1-Click Themes */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>{t('customization.quickPresets', '1-Click Designer Palettes')}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {STUDIO_THEMES.map(theme => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => applyStudioTheme(theme)}
                  className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 bg-slate-50/60 dark:bg-slate-900/40 text-left transition-all cursor-pointer"
                >
                  <span
                    className="w-5 h-5 rounded-md shrink-0 border border-black/10"
                    style={{
                      background: theme.gradient
                        ? `linear-gradient(135deg, ${theme.gradient.colorStops[0].color}, ${theme.gradient.colorStops[1].color})`
                        : theme.fg
                    }}
                  />
                  <span className="text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                    {t(`customization.themes.${theme.id}`, theme.name)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* CTA Frame Presets */}
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-2.5">
              {t('customization.ctaFrameLabel', 'CTA Showcase Frame')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CTA_FRAMES.map(frame => {
                const active = currentFrame.style === frame.id;
                return (
                  <button
                    key={frame.id}
                    type="button"
                    onClick={() => handleFrameOptionChange('style', frame.id)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      active
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 text-zinc-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="truncate">{t(`customization.frames.${frame.id}`, frame.label)}</span>
                    {frame.isPro && !isPro && (
                      <span className="ml-1 px-1 py-0.2 rounded text-[9px] font-bold bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30 flex items-center gap-0.5 shrink-0">
                        <Sparkles size={8} /> {user && freeTrialsRemaining > 0 ? `${freeTrialsRemaining} Free` : 'PRO'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {currentFrame.style !== 'none' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-700/60">
                <div>
                  <label className="block text-[11px] font-semibold mb-1 text-zinc-600 dark:text-zinc-400">
                    {t('customization.frameText', 'Frame Callout Text')}
                  </label>
                  <input
                    type="text"
                    maxLength={28}
                    value={currentFrame.text}
                    onChange={(e) => handleFrameOptionChange('text', e.target.value)}
                    placeholder="SCAN ME"
                    className="w-full px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#040a18] text-zinc-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold mb-1 text-zinc-600 dark:text-zinc-400">
                    {t('customization.frameColor', 'Frame Accent Color')}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentFrame.color || '#1d4ed8'}
                      onChange={(e) => handleFrameOptionChange('color', e.target.value)}
                      className="w-9 h-8 p-0.5 rounded border border-slate-300 dark:border-slate-700 cursor-pointer"
                    />
                    <span className="text-xs font-mono text-zinc-500 uppercase">{currentFrame.color || '#1D4ED8'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Accordion>

      {/* 2. Colors & Dual-Tone Corner Eyes */}
      <Accordion title={t('customization.colors')} icon={Palette} defaultOpen={true}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-zinc-800 dark:text-zinc-200">{t('customization.foreground')}</label>
            <input
              type="color"
              value={visuals.dotsOptions.color || visuals.dotsOptions.gradient?.colorStops[0]?.color || '#0a1930'}
              onChange={(e) => handleColorChange('foreground', e.target.value)}
              className="w-full h-10 p-1 rounded-lg border border-zinc-300 dark:border-slate-700 cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-zinc-800 dark:text-zinc-200">{t('customization.background')}</label>
            <input
              type="color"
              value={visuals.backgroundOptions.color || '#ffffff'}
              onChange={(e) => handleColorChange('background', e.target.value)}
              className="w-full h-10 p-1 rounded-lg border border-zinc-300 dark:border-slate-700 cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-zinc-800 dark:text-zinc-200">
              {t('customization.eyeOuterColor', 'Eye Outer Frame Color')}
            </label>
            <input
              type="color"
              value={visuals.cornersSquareOptions.color || '#0a1930'}
              onChange={(e) => handleEyeOuterColorChange(e.target.value)}
              className="w-full h-10 p-1 rounded-lg border border-zinc-300 dark:border-slate-700 cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-zinc-800 dark:text-zinc-200">
              {t('customization.eyeInnerColor', 'Eye Inner Pupil Color')}
            </label>
            <input
              type="color"
              value={visuals.cornersDotOptions?.color || '#0a1930'}
              onChange={(e) => handleEyeInnerColorChange(e.target.value)}
              className="w-full h-10 p-1 rounded-lg border border-zinc-300 dark:border-slate-700 cursor-pointer"
            />
          </div>
        </div>
        <div className="mb-1 flex items-center">
          <input 
            type="checkbox" 
            id="useGradient" 
            checked={!!visuals.dotsOptions.gradient}
            onChange={handleGradientToggle}
            className="w-4 h-4 text-blue-600 rounded border-zinc-300 focus:ring-blue-500"
          />
          <label htmlFor="useGradient" className="ml-2 text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 cursor-pointer">
            {t('customization.gradient')}
          </label>
        </div>
      </Accordion>

      {/* 3. Pattern Geometry & Error Correction */}
      <Accordion title={t('customization.design')} icon={LayoutTemplate}>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-2 text-zinc-800 dark:text-zinc-200">{t('customization.dotsStyle')}</label>
            <div className="grid grid-cols-3 gap-2">
              {['square', 'dots', 'rounded', 'classy', 'classy-rounded', 'extra-rounded'].map(style => (
                <button
                  key={style}
                  type="button"
                  onClick={() => handleShapeChange('dotsOptions', style)}
                  className={`p-2 border rounded-lg text-[11px] font-semibold capitalize transition-all cursor-pointer ${
                    visuals.dotsOptions.type === style
                      ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                      : 'border-slate-200 dark:border-slate-700 text-zinc-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {style.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-2 text-zinc-800 dark:text-zinc-200">{t('customization.cornersStyle')}</label>
              <div className="grid grid-cols-3 gap-1.5">
                {['square', 'dot', 'extra-rounded'].map(style => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => handleShapeChange('cornersSquareOptions', style)}
                    className={`p-2 border rounded-lg text-[11px] font-semibold capitalize transition-all cursor-pointer ${
                      visuals.cornersSquareOptions.type === style
                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                        : 'border-slate-200 dark:border-slate-700 text-zinc-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {style.replace('extra-', '')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-2 text-zinc-800 dark:text-zinc-200">
                {t('customization.cornerDotStyle', 'Eye Pupil Shape')}
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {['square', 'dot'].map(style => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => handleShapeChange('cornersDotOptions', style)}
                    className={`p-2 border rounded-lg text-[11px] font-semibold capitalize transition-all cursor-pointer ${
                      visuals.cornersDotOptions?.type === style
                        ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                        : 'border-slate-200 dark:border-slate-700 text-zinc-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-2 text-zinc-800 dark:text-zinc-200">
              {t('customization.errorCorrection', 'Error Correction Level (ISO/IEC 18004)')}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['L', 'M', 'Q', 'H'].map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => handleQrOptionChange('errorCorrectionLevel', level)}
                  className={`p-2 border rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    visuals.qrOptions?.errorCorrectionLevel === level
                      ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                      : 'border-slate-200 dark:border-slate-700 text-zinc-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                  title={`Level ${level}`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Accordion>

      {/* 4. Center Logo Embedding */}
      <Accordion title={t('customization.logo')} icon={ImageIcon}>
        <div>
          {visuals.image ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img src={visuals.image} alt="Logo" className="w-12 h-12 object-contain rounded border border-blue-100 p-1 bg-white" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                >
                  {t('customization.removeLogo')}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1 text-zinc-800 dark:text-zinc-200">{t('customization.logoSize')}</label>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="0.5" 
                    step="0.05" 
                    value={visuals.imageOptions?.imageSize || 0.4} 
                    onChange={(e) => handleLogoOptionChange('imageSize', e.target.value)}
                    className="w-full accent-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 text-zinc-800 dark:text-zinc-200">{t('customization.logoMargin')}</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="20" 
                    step="1" 
                    value={visuals.imageOptions?.margin || 10} 
                    onChange={(e) => handleLogoOptionChange('margin', e.target.value)}
                    className="w-full accent-blue-600"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-xs text-zinc-600
                  file:mr-3 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-xs file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100 transition-colors cursor-pointer
                  dark:file:bg-slate-800 dark:file:text-zinc-300"
              />
            </div>
          )}
        </div>
      </Accordion>

    </div>
  );
}
