import openpyxl
import urllib.parse
import re
import json
import unicodedata
import os

with open('src/config/localizedRoutes.js', 'r', encoding='utf-8') as f:
    text = f.read()

json_part = text.split('export const localizedRoutes =', 1)[1].split('export const routeToToolMap =', 1)[0].strip()
if json_part.endswith(';'): json_part = json_part[:-1].strip()
routes_by_lang = json.loads(json_part)

files = [
    'createmy-qr.com-Coverage-Drilldown-2026-11-09(2).xlsx',
    'createmy-qr.com-Coverage-Drilldown-2026-11-09(1).xlsx',
    'createmy-qr.com-Coverage-Drilldown-2026-11-09.xlsx'
]

ignored_roots = {'robots.txt', 'sitemap.xml', 'sitemap-index.xml', 'llms.txt', 'favicon.ico'}

missing_paths = {}
for fn in files:
    wb = openpyxl.load_workbook(fn)
    sheet = wb['Tabel']
    for r in range(2, sheet.max_row + 1):
        u = sheet.cell(r, 1).value
        if not u: continue
        parsed = urllib.parse.urlparse(u)
        raw_path = parsed.path.strip('/')
        unquoted = urllib.parse.unquote(raw_path)
        if not unquoted or unquoted in ignored_roots: continue
        
        f1 = os.path.join('dist', unquoted, 'index.html')
        is_primary = False
        if os.path.exists(f1):
            with open(f1, 'r', encoding='utf-8') as rf:
                if 'http-equiv="refresh"' not in rf.read(500):
                    is_primary = True
        if not is_primary:
            if unquoted not in missing_paths:
                missing_paths[unquoted] = []
            missing_paths[unquoted].append(u)

def strip_accents(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn')

def detect_language(path, slug):
    parts = path.split('/', 1)
    if len(parts) == 2 and parts[0] in routes_by_lang:
        return parts[0], parts[1]
    
    s = slug.lower()
    if 'penjana-kod-qr' in s or 'percuma-dalam-talian' in s: return 'ms', slug
    if 'generatore-di-codici-qr' in s or 'gratis-online' in s: return 'it', slug
    if 'generator-de-coduri-qr' in s or 'gratuit-online' in s: return 'ro', slug
    if 'zdarma-online-generator' in strip_accents(s): return 'cs', slug
    if 'ucretsiz-cevrimici-qr-kod' in strip_accents(s): return 'tr', slug
    if 'ingyenes-online-qr' in strip_accents(s): return 'hu', slug
    if 'ilmainen-qr-koodi' in strip_accents(s): return 'fi', slug
    if 'darmowy-generator-kodow' in strip_accents(s): return 'pl', slug
    if 'gerador-de-codigo' in strip_accents(s): return 'pt', slug
    if 'generador-de-codigos' in strip_accents(s): return 'es', slug
    if 'kostenloser-qr-code' in s: return 'de', slug
    if 'gratis-online-qr-kode' in s: return 'da', slug
    if 'gratis-qr-kod-generator' in s: return 'sv', slug
    
    if re.search(r'[\u4e00-\u9fff]', slug): return 'zh', slug
    if re.search(r'[\u3040-\u30ff]', slug): return 'ja', slug
    if re.search(r'[\u0600-\u06ff]', slug): return 'ar', slug
    if re.search(r'[\u0980-\u09ff]', slug): return 'bn', slug
    if re.search(r'[\u0370-\u03ff]', slug): return 'el', slug
    if re.search(r'[\u0400-\u04ff]', slug): return 'ru', slug
    if re.search(r'[\u0900-\u097f]', slug): return 'hi', slug
    return 'en', slug

def detect_tool(slug):
    raw_s = slug.lower()
    s = strip_accents(raw_s)
    if 'wifi' in s or 'wi-fi' in s: return 'wifi'
    if 'vcard' in s: return 'vcard'
    if 'whatsapp' in s: return 'whatsapp'
    if 'youtube' in s: return 'youtube'
    if 'instagram' in s: return 'instagram'
    if 'crypto' in s: return 'crypto'
    if 'app-store' in s or 'appstore' in s: return 'appstore'
    if 'facebook' in s: return 'facebook'
    if 'twitter' in s or 'x-twitter' in s: return 'twitter'
    if 'tiktok' in s: return 'tiktok'
    if 'linkedin' in s: return 'linkedin'
    if 'telegram' in s: return 'telegram'
    if 'snapchat' in s: return 'snapchat'
    if 'discord' in s: return 'discord'
    if 'spotify' in s: return 'spotify'
    if 'paypal' in s: return 'paypal'
    if 'venmo' in s: return 'venmo'
    if 'pdf' in s: return 'pdf'
    if 'form' in s or 'forms' in s: return 'gforms'
    if 'review' in s: return 'greview'
    if any(k in s for k in ['maps', 'lokasyon', 'location', 'umisteni', 'umístění', 'الموقع', 'অবস্থান', '位置', 'konum']): return 'location'
    if any(k in s for k in ['contact', 'about', 'من-نحن']): return 'about'
    if any(k in s for k in ['event', 'acara', 'podiya', 'подія', 'etkinlik', 'udalost', 'evenement', 'الحدث', 'ঘটনা', '活动']): return 'event'
    if 'sms' in s: return 'sms'
    if any(k in s for k in ['phone', 'telefon', 'lhtf', 'الهاتف', 'ফোন', '电话']): return 'phone'
    if any(k in s for k in ['email', 'eposta']): return 'email'
    if any(k in s for k in ['text', 'metin', 'teks', 'ns', 'tekst', 'পাঠ্য', '文本']): return 'text'
    if any(k in s for k in ['image', 'resim', 'gambar', 'imagen', 'imagem', 'ছবি', '图片']): return 'image'
    if any(k in s for k in ['audio', 'podcast', 'zvuk', 'yin-pin', 'অডিও', '音频']): return 'audio'
    if any(k in s for k in ['video', 'vinteo', 'βίντεο', 'відео', 'ভিডিও', '视频']): return 'video'
    if any(k in s for k in ['booking', 'reservat', 'tempahan', 'rezervace', 'rezerwacja', 'الحجز', 'বুকিং', 'অনলাইন-বুকিং', '预订', '予約']): return 'booking'
    if 'amazon' in s: return 'amazon'
    if any(k in s for k in ['bio', 'odkaz-v-biu', 'pautan-di-bio', 'tautan-di-bio', 'বায়ো-লিংক', '生物链接']): return 'linkinbio'
    if any(k in s for k in ['file', 'fichier', 'datei', 'arquivo', 'bestand', 'dosya', 'fil', 'файл', 'ফাইল', '文件']): return 'file'
    if any(k in s for k in ['url', 'pautan', 'tautan']): return 'url'
    return None

redirect_items = []
seen_from = set()

for p in sorted(missing_paths.keys()):
    lang, slug = detect_language(p, p)
    tool = detect_tool(slug)
    
    if tool and tool in routes_by_lang.get(lang, {}):
        target_slug = routes_by_lang[lang][tool]
        target_path = f"{lang}{target_slug}" if lang != 'en' else target_slug.lstrip('/')
    else:
        target_path = f"{lang}" if lang != 'en' else ""
    
    # Don't redirect to self!
    if p != target_path and p not in seen_from:
        seen_from.add(p)
        redirect_items.append({
            'from': p,
            'to': target_path
        })

print(f"Generated {len(redirect_items)} unique redirect mappings.")

# Write to src/config/legacyGscRedirects.cjs
out_file = 'src/config/legacyGscRedirects.cjs'
with open(out_file, 'w', encoding='utf-8') as f:
    f.write('// Auto-generated legacy GSC URL redirect definitions\n')
    f.write('// Resolves historical crawled URLs (non-latin, accented, cross-locale slugs) to valid canonical targets\n')
    f.write('module.exports = [\n')
    for item in redirect_items:
        f.write(f"  {{ from: {json.dumps(item['from'], ensure_ascii=False)}, to: {json.dumps(item['to'], ensure_ascii=False)} }},\n")
    f.write('];\n')

print(f"Wrote to {out_file} successfully.")

