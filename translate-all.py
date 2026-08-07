import os
import json
import time
from googletrans import Translator

translator = Translator()

languages = [
  'en', 'id', 'es', 'fr', 'de', 'zh', 'ja', 'ko', 'ru', 'ar', 
  'pt', 'it', 'hi', 'bn', 'ur', 'tr', 'vi', 'th', 'nl', 'pl', 
  'sv', 'fi', 'da', 'no', 'cs', 'el', 'he', 'ms', 'tl', 'uk'
]

en_texts = {
  "seo": {
    "title": "Free Barcode Scanner Online - Scan UPC & EAN",
    "desc": "Scan barcodes online for free using your device's camera or upload an image. Supports UPC, EAN, Code 128 and more. 100% private and secure."
  },
  "hero": {
    "badge": "Cyber Scanner V1",
    "title": "Instant",
    "titleHighlight": "Barcode Scanner",
    "desc": "Scan from your webcam or upload an image. 100% private, zero data is sent to our servers."
  },
  "workspace": {
    "initCam": "Initialize Camera",
    "initCamDesc": "Scan a barcode using your device's camera",
    "startBtn": "Start Scanning",
    "cancelBtn": "Cancel",
    "successTitle": "Scan Successful",
    "scanAnother": "Scan Another Barcode",
    "orUpload": "Or upload an image",
    "uploadBtn": "Upload Barcode Image File",
    "errorNoBarcode": "No barcode found in image. Please try another one.",
    "waiting": "Waiting for scan...",
    "waitingDesc": "Point your camera at a barcode or upload an image.",
    "notLink": "Not a link"
  },
  "howto": {
    "title": "How to Scan a Barcode",
    "subtitle": "Three simple steps to decode any product barcode instantly.",
    "step1Title": "Allow Access",
    "step1Desc": "Click 'Start Scanning' and allow browser access to your device's camera.",
    "step2Title": "Align Barcode",
    "step2Desc": "Hold your product steady and align the barcode within the horizontal viewfinder.",
    "step3Title": "View Results",
    "step3Desc": "The barcode will be decoded instantly. You can copy the code or search it online."
  },
  "features": {
    "whyTitle": "Industrial-Grade Barcode Engine",
    "retailTitle": "Retail & Inventory Ready",
    "retailDesc": "Instantly decode product barcodes like UPC, EAN, and ISBN directly from your browser. No dedicated hardware scanners needed—your phone's camera is now an inventory tool.",
    "fastTitle": "High-Speed Decoding",
    "fastDesc": "Powered by WebAssembly, our engine processes frames in milliseconds for rapid consecutive scanning.",
    "privacyTitle": "100% Private",
    "privacyDesc": "Barcode processing happens entirely in your local memory. We never transmit your camera feed."
  },
  "formats": {
    "title": "Universal 1D/2D Support.",
    "desc": "Our engine natively recognizes the most common linear barcodes used in logistics, retail, and healthcare, alongside complex 2D matrices.",
    "type": {
      "Retail": "Retail",
      "Logistics": "Logistics",
      "Industrial": "Industrial",
      "Packaging": "Packaging",
      "2D": "2D"
    }
  }
}

nav_texts = {
  "scanbarcode": "Scan Barcode"
}

types_texts = {
  "scanbarcode": "Barcode Scanner"
}

def translate_obj(obj, lang):
    if lang == 'en':
        return obj
    
    if lang == 'zh': lang = 'zh-cn'
    if lang == 'he': lang = 'iw'
    
    result = {}
    for k, v in obj.items():
        if isinstance(v, dict):
            result[k] = translate_obj(v, lang)
        else:
            try:
                res = translator.translate(v, dest=lang)
                result[k] = res.text
                print(f"[{lang}] {k}: {result[k]}")
            except Exception as e:
                print(f"Error translating to {lang}: {e}")
                result[k] = v
            time.sleep(0.1)
    return result

for lang in languages:
    filepath = os.path.join('public', 'locales', lang, 'translation.json')
    if not os.path.exists(filepath): continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print(f"\nTranslating for {lang}...")
    
    if "scanbarcode" not in data:
        data["scanbarcode"] = {}
        
    data["scanbarcode"] = translate_obj(en_texts, lang)
    
    if "nav" not in data: data["nav"] = {}
    data["nav"].update(translate_obj(nav_texts, lang))
    
    if "types" not in data: data["types"] = {}
    data["types"].update(translate_obj(types_texts, lang))
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Done translating all languages!")
