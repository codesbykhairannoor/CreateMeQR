import os
import json
import time
from googletrans import Translator

translator = Translator()

languages = [
  'th', 'el', 'cs', 'da', 'fi', 'no', 'hu', 'ro', 'uk', 'ms', 'tl', 'bn'
]

HOME_EN = {
  "seoTitle": "CreateMy-QR — Free QR Code & Barcode Generator | 37 Tools Online",
  "seoDesc": "Generate 37 types of QR codes and barcodes for free. No signup. Instant download. 100% client-side, ISO/IEC 18004-compliant, available in 30 languages.",
  "badge": "ISO/IEC 18004 · 100% Free · Zero Tracking · No Signup",
  "heroTitle": "All QR & Barcode",
  "heroTitleHighlight": "Tools in One Place",
  "heroSubtitle": "Generate 37+ types of QR codes and barcodes instantly. No signup, no limits, no data uploaded — ever. Export as SVG or PNG, completely free.",
  "citation": "\"The QR Code is an international standard (ISO/IEC 18004:2015). Matrix barcodes require clean module grids for reliable scanning across all compliant readers worldwide.\"",
  "searchPlaceholder": "Search tools — WhatsApp, WiFi, vCard, PDF...",
  "allToolsHeading": "All Tools",
  "generate": "Generate Free",
  "noResults": "No tools found. Try a different keyword.",
  "privacyPill": "100% Private & Secure",
  "trustTitle": "Zero Upload. Zero Tracking. Zero Compromise.",
  "trustDesc": "Every QR code is generated inside your browser using JavaScript. Your URLs, contacts, WiFi passwords, and payment credentials never leave your device. No server receives your input.",
  "feat1": "GDPR & CCPA Compliant",
  "feat1Desc": "No personal data collected",
  "feat2": "Instant Generation",
  "feat2Desc": "Sub-100ms QR rendering",
  "feat3": "30 Languages",
  "feat3Desc": "Fully localized worldwide",
  "feat4": "ISO 18004 Compliant",
  "feat4Desc": "Meets international QR standard",
  "whatIsTitle": "What is CreateMy-QR?",
  "whatIsDesc": "CreateMy-QR is a free, client-side QR code and barcode generation platform supporting 37 data types including social media, messaging, payments, files, and contact cards. All codes are static, ISO-compliant, and export-ready as SVG or PNG. No account. No expiry. No cost.",
  "fact1": "Generates QR codes locally — no data sent to any server.",
  "fact2": "Supports 37 types: URL, WhatsApp, vCard, WiFi, Crypto, PDF, and more.",
  "fact3": "Fully localized in 30 languages including Arabic, Japanese, and Hindi.",
  "whySecureTitle": "Why is it 100% Secure?",
  "whySecureDesc": "Unlike cloud-based QR generators that store your input on remote servers, CreateMy-QR encodes everything inside your browser's JavaScript engine using the Reed-Solomon error-correction algorithm. Your WiFi credentials, payment details, or private URLs are never transmitted over the network.",
  "citation2": "\"QR code systems must implement error correction at one of four levels (L, M, Q, H), ensuring reliable scanning even when up to 30% of the code module is obscured.\"",
  "faqTitle": "Frequently Asked Questions",
  "faqSubtitle": "Everything you need to know about CreateMy-QR.",
  "faq1q": "What is CreateMy-QR?",
  "faq1a": "CreateMy-QR is a free, browser-based platform offering 37 QR code and barcode tools. It generates ISO/IEC 18004:2015-compliant codes with 100% client-side processing — no uploads, no tracking, no account required.",
  "faq2q": "Are the QR codes free to use forever?",
  "faq2a": "Yes. All QR codes are static and free forever. No limits, no watermarks, no expiry dates, and no subscription required. Ever.",
  "faq3q": "Is my data secure when generating a QR code?",
  "faq3a": "Absolutely. All encoding happens inside your browser. Your data never leaves your device and is never transmitted to any server. The platform is fully GDPR and CCPA compliant."
}

def translate_obj(obj, lang):
    if lang == 'zh': lang = 'zh-cn'
    if lang == 'he': lang = 'iw'
    
    result = {}
    for k, v in obj.items():
        try:
            # Mask CreateMy-QR
            text = v.replace("CreateMy-QR", "CREATEMYQR_PLACEHOLDER")
            res = translator.translate(text, dest=lang)
            trans = res.text.replace("CREATEMYQR_PLACEHOLDER", "CreateMy-QR")
            result[k] = trans
            print(f"[{lang}] {k}: {result[k]}")
        except Exception as e:
            print(f"Error translating to {lang}: {e}")
            result[k] = v
        time.sleep(0.3)
    return result

for lang in languages:
    filepath = os.path.join('public', 'locales', lang, 'translation.json')
    if not os.path.exists(filepath): continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print(f"\nTranslating for {lang}...")
    
    if "home" not in data or data.get("home", {}).get("seoTitle") == HOME_EN["seoTitle"]:
        data["home"] = translate_obj(HOME_EN, lang)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    else:
        print(f"[{lang}] home already translated.")
