import React from 'react';
import { useTranslation } from 'react-i18next';
import { Palette, Image as ImageIcon, LayoutTemplate, ChevronDown, ChevronUp } from 'lucide-react';

const Accordion = ({ title, icon: Icon, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  
  const { t } = useTranslation();
  const keywordString = t('seoKeywords', { returnObjects: true });
  const keywordArray = typeof keywordString === 'string' ? keywordString.split(',').map(k => k.trim()) : [];
  const topKeywords = keywordArray.slice(5, 10).join(', '); // Use different slice than InputForm for variety

  return (
    <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg mb-4 bg-transparent overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`${title} - ${topKeywords}`}
        className="w-full px-4 py-3 flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
      >
        <div className="flex items-center text-zinc-900 dark:text-white font-semibold">
          {Icon && <Icon className="w-5 h-5 mr-2 text-blue-600" />}
          {title}
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-zinc-600" /> : <ChevronDown className="w-5 h-5 text-zinc-600" />}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-700">
          {children}
        </div>
      )}
    </div>
  );
};


export default function CustomizationPanel({ visuals, setVisuals }) {
  const { t } = useTranslation();

  const handleColorChange = (key, value) => {
    setVisuals(prev => {
      const next = { ...prev };
      if (key === 'foreground') {
        next.dotsOptions = { ...next.dotsOptions, color: value };
        next.cornersSquareOptions = { ...next.cornersSquareOptions, color: value };
        next.cornersDotOptions = { ...next.cornersDotOptions, color: value };
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
        type: prev.dotsOptions.type, // keep type
        gradient: isGradient ? {
          type: 'linear',
          rotation: 45,
          colorStops: [{ offset: 0, color: prev.dotsOptions.color || '#000000' }, { offset: 1, color: '#3b82f6' }]
        } : undefined,
        color: isGradient ? undefined : (prev.dotsOptions.color || '#000000')
      }
    }));
  };

  const handleEyeColorChange = (value) => {
    setVisuals(prev => ({
      ...prev,
      cornersSquareOptions: { ...prev.cornersSquareOptions, color: value },
      cornersDotOptions: { ...prev.cornersDotOptions, color: value }
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

  return (
    <div className="bg-transparent rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-700 p-6">
      
      <Accordion title={t('customization.colors')} icon={Palette} defaultOpen={true}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-200">{t('customization.foreground')}</label>
            <input
              type="color"
              value={visuals.dotsOptions.color || visuals.dotsOptions.gradient?.colorStops[0]?.color || '#000000'}
              onChange={(e) => handleColorChange('foreground', e.target.value)}
              className="w-full h-10 p-1 rounded border border-zinc-300 cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-200">{t('customization.background')}</label>
            <input
              type="color"
              value={visuals.backgroundOptions.color || '#ffffff'}
              onChange={(e) => handleColorChange('background', e.target.value)}
              className="w-full h-10 p-1 rounded border border-zinc-300 cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-200">{t('customization.eyeColor')}</label>
            <input
              type="color"
              value={visuals.cornersSquareOptions.color || '#000000'}
              onChange={(e) => handleEyeColorChange(e.target.value)}
              className="w-full h-10 p-1 rounded border border-zinc-300 cursor-pointer"
            />
          </div>
        </div>
        <div className="mb-2 flex items-center">
          <input 
            type="checkbox" 
            id="useGradient" 
            checked={!!visuals.dotsOptions.gradient}
            onChange={handleGradientToggle}
            className="w-4 h-4 text-blue-600 rounded border-zinc-300 focus:ring-black dark:focus:ring-white"
          />
          <label htmlFor="useGradient" className="ml-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {t('customization.gradient')}
          </label>
        </div>
      </Accordion>

      <Accordion title={t('customization.logo')} icon={ImageIcon}>
        <div>
          {visuals.image ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img src={visuals.image} alt="Logo" className="w-12 h-12 object-contain rounded border border-zinc-200 p-1 bg-white" />
                <button
                  onClick={removeImage}
                  className="px-3 py-1 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
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
                    className="w-full"
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
                    className="w-full"
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
                className="block w-full text-sm text-zinc-600
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100 transition-colors
                  dark:file:bg-zinc-700 dark:file:text-zinc-300"
              />
            </div>
          )}
        </div>
      </Accordion>

      <Accordion title={t('customization.design')} icon={LayoutTemplate}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-200">{t('customization.dotsStyle')}</label>
            <div className="grid grid-cols-4 gap-2">
              {['square', 'dots', 'rounded', 'classy'].map(style => (
                <button
                  key={style}
                  onClick={() => handleShapeChange('dotsOptions', style)}
                  className={`p-2 border rounded text-xs capitalize ${visuals.dotsOptions.type === style ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700'}`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-200">{t('customization.cornersStyle')}</label>
            <div className="grid grid-cols-4 gap-2">
              {['square', 'dot', 'extra-rounded'].map(style => (
                <button
                  key={style}
                  onClick={() => handleShapeChange('cornersSquareOptions', style)}
                  className={`p-2 border rounded text-xs capitalize ${visuals.cornersSquareOptions.type === style ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700'}`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-800 dark:text-zinc-200">Error Correction</label>
            <div className="grid grid-cols-4 gap-2">
              {['L', 'M', 'Q', 'H'].map(level => (
                <button
                  key={level}
                  onClick={() => handleQrOptionChange('errorCorrectionLevel', level)}
                  className={`p-2 border rounded text-xs font-bold ${visuals.qrOptions?.errorCorrectionLevel === level ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700'}`}
                  title={`Level ${level}`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Accordion>

    </div>
  );
}
