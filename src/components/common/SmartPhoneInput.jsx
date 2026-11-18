// src/components/common/SmartPhoneInput.jsx
// International E.164 smart phone input with auto country detection & leading zero stripping.

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Check } from 'lucide-react';

const COUNTRIES = [
  { code: 'ID', dial: '62', flag: '🇮🇩', name: 'Indonesia' },
  { code: 'US', dial: '1', flag: '🇺🇸', name: 'United States' },
  { code: 'MY', dial: '60', flag: '🇲🇾', name: 'Malaysia' },
  { code: 'SG', dial: '65', flag: '🇸🇬', name: 'Singapore' },
  { code: 'GB', dial: '44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'AU', dial: '61', flag: '🇦🇺', name: 'Australia' },
  { code: 'JP', dial: '81', flag: '🇯🇵', name: 'Japan' },
  { code: 'KR', dial: '82', flag: '🇰🇷', name: 'South Korea' },
  { code: 'CN', dial: '86', flag: '🇨🇳', name: 'China' },
  { code: 'IN', dial: '91', flag: '🇮🇳', name: 'India' },
  { code: 'DE', dial: '49', flag: '🇩🇪', name: 'Germany' },
  { code: 'FR', dial: '33', flag: '🇫🇷', name: 'France' },
  { code: 'ES', dial: '34', flag: '🇪🇸', name: 'Spain' },
  { code: 'IT', dial: '39', flag: '🇮🇹', name: 'Italy' },
  { code: 'BR', dial: '55', flag: '🇧🇷', name: 'Brazil' },
  { code: 'RU', dial: '7', flag: '🇷🇺', name: 'Russia' },
  { code: 'SA', dial: '966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: 'AE', dial: '971', flag: '🇦🇪', name: 'United Arab Emirates' },
  { code: 'PH', dial: '63', flag: '🇵🇭', name: 'Philippines' },
  { code: 'TH', dial: '66', flag: '🇹🇭', name: 'Thailand' },
  { code: 'VN', dial: '84', flag: '🇻🇳', name: 'Vietnam' },
  { code: 'TR', dial: '90', flag: '🇹🇷', name: 'Turkey' },
  { code: 'NL', dial: '31', flag: '🇳🇱', name: 'Netherlands' },
  { code: 'CA', dial: '1', flag: '🇨🇦', name: 'Canada' },
  { code: 'MX', dial: '52', flag: '🇲🇽', name: 'Mexico' },
  { code: 'ZA', dial: '27', flag: '🇿🇦', name: 'South Africa' },
  { code: 'NZ', dial: '64', flag: '🇳🇿', name: 'New Zealand' },
  { code: 'PK', dial: '92', flag: '🇵🇰', name: 'Pakistan' },
  { code: 'BD', dial: '880', flag: '🇧🇩', name: 'Bangladesh' },
  { code: 'EG', dial: '20', flag: '🇪🇬', name: 'Egypt' },
  { code: 'NG', dial: '234', flag: '🇳🇬', name: 'Nigeria' },
  { code: 'AR', dial: '54', flag: '🇦🇷', name: 'Argentina' },
  { code: 'CO', dial: '57', flag: '🇨🇴', name: 'Colombia' },
  { code: 'CL', dial: '56', flag: '🇨🇱', name: 'Chile' },
  { code: 'PE', dial: '51', flag: '🇵🇪', name: 'Peru' },
  { code: 'PL', dial: '48', flag: '🇵🇱', name: 'Poland' },
  { code: 'UA', dial: '380', flag: '🇺🇦', name: 'Ukraine' },
  { code: 'SE', dial: '46', flag: '🇸🇪', name: 'Sweden' },
  { code: 'NO', dial: '47', flag: '🇳🇴', name: 'Norway' },
  { code: 'DK', dial: '45', flag: '🇩🇰', name: 'Denmark' },
  { code: 'FI', dial: '358', flag: '🇫🇮', name: 'Finland' },
  { code: 'CH', dial: '41', flag: '🇨🇭', name: 'Switzerland' },
  { code: 'AT', dial: '43', flag: '🇦🇹', name: 'Austria' },
  { code: 'BE', dial: '32', flag: '🇧🇪', name: 'Belgium' },
  { code: 'PT', dial: '351', flag: '🇵🇹', name: 'Portugal' },
  { code: 'GR', dial: '30', flag: '🇬🇷', name: 'Greece' },
  { code: 'IE', dial: '353', flag: '🇮🇪', name: 'Ireland' },
  { code: 'HK', dial: '852', flag: '🇭🇰', name: 'Hong Kong' },
  { code: 'TW', dial: '886', flag: '🇹🇼', name: 'Taiwan' },
  { code: 'CZ', dial: '420', flag: '🇨🇿', name: 'Czech Republic' },
  { code: 'HU', dial: '36', flag: '🇭🇺', name: 'Hungary' },
  { code: 'RO', dial: '40', flag: '🇷🇴', name: 'Romania' }
];

const LOCALE_TO_COUNTRY = {
  id: 'ID',
  ms: 'MY',
  en: 'US',
  es: 'ES',
  de: 'DE',
  fr: 'FR',
  it: 'IT',
  pt: 'BR',
  ja: 'JP',
  ko: 'KR',
  zh: 'CN',
  ar: 'SA',
  hi: 'IN',
  ru: 'RU',
  tr: 'TR',
  th: 'TH',
  vi: 'VN',
  tl: 'PH',
  nl: 'NL',
  pl: 'PL',
  uk: 'UA',
  sv: 'SE',
  da: 'DK',
  fi: 'FI',
  no: 'NO',
  el: 'GR',
  bn: 'BD',
  cs: 'CZ',
  hu: 'HU',
  ro: 'RO'
};

export default function SmartPhoneInput({
  name,
  value = '',
  onChange,
  placeholder,
  className = '',
  required = false
}) {
  const { i18n } = useTranslation();
  const currentLangCode = i18n.language?.split('-')[0] || 'en';

  // Determine initial country based on language or incoming value
  const initialCountryCode = useMemo(() => {
    return LOCALE_TO_COUNTRY[currentLangCode] || 'US';
  }, [currentLangCode]);

  const [selectedCountryCode, setSelectedCountryCode] = useState(initialCountryCode);
  const [localNumber, setLocalNumber] = useState('');
  const [hasStrippedZero, setHasStrippedZero] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  const selectedCountry = useMemo(() => {
    return COUNTRIES.find(c => c.code === selectedCountryCode) || COUNTRIES[0];
  }, [selectedCountryCode]);

  // Sync internal localNumber if external value changes from outside
  useEffect(() => {
    if (!value) {
      setLocalNumber('');
      setHasStrippedZero(false);
      return;
    }

    const clean = String(value).replace(/[^0-9]/g, '');
    
    // Check if value already starts with any country dial code (sort by dial length desc to match 3-digit first)
    const sortedByDialLen = [...COUNTRIES].sort((a, b) => b.dial.length - a.dial.length);
    for (const c of sortedByDialLen) {
      if (clean.startsWith(c.dial) && clean.length > c.dial.length + 3) {
        setSelectedCountryCode(c.code);
        setLocalNumber(clean.slice(c.dial.length));
        return;
      }
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format and emit normalized number
  const handleInputChange = (rawInput, country = selectedCountry) => {
    let clean = rawInput.replace(/[^0-9]/g, '');
    let stripped = false;

    // Check if user pasted full number starting with dial code
    if (clean.startsWith(country.dial) && clean.length > country.dial.length + 3) {
      clean = clean.slice(country.dial.length);
    }

    // Auto-strip leading '0' (e.g. 081234567890 -> 81234567890)
    if (clean.startsWith('0')) {
      clean = clean.replace(/^0+/, '');
      stripped = true;
    }

    setLocalNumber(clean);
    setHasStrippedZero(stripped);

    const fullNormalized = clean ? `${country.dial}${clean}` : '';
    onChange({
      target: {
        name,
        value: fullNormalized
      }
    });
  };

  const handleSelectCountry = (country) => {
    setSelectedCountryCode(country.code);
    setIsOpen(false);
    setSearchQuery('');
    handleInputChange(localNumber, country);
  };

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return COUNTRIES;
    const q = searchQuery.toLowerCase();
    return COUNTRIES.filter(
      c => c.name.toLowerCase().includes(q) || c.dial.includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const defaultPlaceholder = selectedCountry.code === 'ID' 
    ? '0812-3456-7890' 
    : selectedCountry.code === 'US' 
    ? '(555) 000-0000' 
    : '0123 456 789';

  return (
    <div className="w-full">
      <div className="flex items-center rounded-xl border border-blue-100 dark:border-slate-700 bg-[#f8fafc] dark:bg-slate-700/80 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white dark:focus-within:bg-slate-700 transition-all overflow-visible relative">
        
        {/* Country Selector Trigger */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-600/50 rounded-l-xl border-r border-slate-200 dark:border-slate-600 transition-colors cursor-pointer select-none"
            aria-label="Select Country"
          >
            <span className="text-base leading-none">{selectedCountry.flag}</span>
            <span className="text-xs font-bold text-slate-800 dark:text-white">+{selectedCountry.dial}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 dark:text-slate-300" />
          </button>

          {/* Country Dropdown Flyout */}
          {isOpen && (
            <div className="absolute top-full left-0 mt-1.5 w-64 max-h-64 bg-white dark:bg-[#081226] border border-slate-200 dark:border-blue-900/60 rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col animate-fade-in-up">
              {/* Search box */}
              <div className="p-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search country..."
                  className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
              </div>

              {/* Country list */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-1">
                {filteredCountries.map(country => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleSelectCountry(country)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                      country.code === selectedCountry.code
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-sm">{country.flag}</span>
                      <span className="truncate">{country.name}</span>
                    </div>
                    <span className="text-slate-400 dark:text-slate-500 shrink-0 font-mono">+{country.dial}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Local Phone Number Input */}
        <input
          type="tel"
          name={name}
          value={localNumber}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder || defaultPlaceholder}
          required={required}
          className="flex-1 px-3 py-2.5 text-sm bg-transparent outline-none dark:text-white"
        />
      </div>

      {/* Auto-Normalization Feedback */}
      {localNumber && (
        <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1">
          <span className="flex items-center gap-1 font-mono text-blue-600 dark:text-blue-400 font-semibold">
            <Check className="w-3 h-3 text-emerald-500" />
            Standard: +{selectedCountry.dial} {localNumber}
          </span>
          {hasStrippedZero && (
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              {t('form.zeroAutoConverted', '✨ Leading 0 auto-converted')}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
