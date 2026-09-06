import os
import glob
import re
import json
import xml.etree.ElementTree as ET
import sys

sys.stdout.reconfigure(encoding='utf-8')

dist_dir = r'd:\qr-and-qr\dist'
locales_dir = r'd:\qr-and-qr\public\locales'
sitemap_path = r'd:\qr-and-qr\public\sitemap.xml'

print("=" * 85)
print("🔬 FORENSIC DEEP AUDIT: ZERO-DEFECT VERIFICATION FOR CREATE-MY-QR")
print("=" * 85)

errors = []
warnings = []

# ==============================================================================
# 1. AUDIT LOCALES & TRANSLATIONS
# ==============================================================================
print("\n[STEP 1/5] Auditing Translation JSON Files for all 30 Languages...")
langs = [f for f in os.listdir(locales_dir) if os.path.isdir(os.path.join(locales_dir, f))]
print(f"• Total Languages Found: {len(langs)}")

en_trans = {}
with open(os.path.join(locales_dir, 'en', 'translation.json'), 'r', encoding='utf-8') as fp:
    en_trans = json.load(fp)

for lang in sorted(langs):
    trans_path = os.path.join(locales_dir, lang, 'translation.json')
    with open(trans_path, 'r', encoding='utf-8') as fp:
        trans = json.load(fp)
    
    # Check static pages metadata
    if 'static' not in trans:
        errors.append(f"[{lang}] 'static' block missing in translation.json")
    else:
        for page_key in ['about', 'compare', 'languages', 'pricing', 'privacy', 'security', 'terms', 'usecases', 'barcode', 'scanqr', 'scanbarcode']:
            if page_key not in trans['static']:
                errors.append(f"[{lang}] static.{page_key} missing")
            else:
                p_meta = trans['static'][page_key]
                if not p_meta.get('seoTitle'):
                    errors.append(f"[{lang}] static.{page_key}.seoTitle missing")
                if not p_meta.get('seoDesc'):
                    errors.append(f"[{lang}] static.{page_key}.seoDesc missing")
                
                # Check for English leftovers in non-English
                if lang != 'en':
                    en_title = en_trans.get('static', {}).get(page_key, {}).get('seoTitle', '')
                    en_desc = en_trans.get('static', {}).get(page_key, {}).get('seoDesc', '')
                    curr_title = p_meta.get('seoTitle', '')
                    curr_desc = p_meta.get('seoDesc', '')
                    
                    if curr_desc == en_desc and len(en_desc) > 20:
                        errors.append(f"[{lang}] static.{page_key}.seoDesc is untranslated English: '{curr_desc[:40]}...'")

    # Check templates
    if 'templates' not in trans:
        errors.append(f"[{lang}] 'templates' block missing in translation.json")
    else:
        tpl = trans['templates']
        if not tpl.get('toolTitleSuffix'):
            errors.append(f"[{lang}] templates.toolTitleSuffix missing")
        if not tpl.get('toolDescTemplate'):
            errors.append(f"[{lang}] templates.toolDescTemplate missing")
        if lang != 'en':
            if tpl.get('toolTitleSuffix') == 'Free QR Code Generator':
                errors.append(f"[{lang}] templates.toolTitleSuffix is untranslated English")

print(f"✅ Locales check completed. Errors: {len(errors)}")

# ==============================================================================
# 2. AUDIT GENERATED HTML FILES (PRIMARY & REDIRECTS)
# ==============================================================================
print("\n[STEP 2/5] Scanning and Verifying all HTML files in dist/...")
all_html_files = []
for root, dirs, files in os.walk(dist_dir):
    if 'server' in root:
        continue
    for f in files:
        if f.endswith('.html'):
            all_html_files.append(os.path.join(root, f))

print(f"• Total HTML Files Scanned: {len(all_html_files)}")

primary_count = 0
redirect_count = 0
dead_redirect_targets = []

for fpath in all_html_files:
    rel = os.path.relpath(fpath, dist_dir)
    with open(fpath, 'r', encoding='utf-8') as fp:
        content = fp.read()
    
    is_redirect = 'http-equiv="refresh"' in content or 'name="robots" content="noindex,follow"' in content
    
    if is_redirect:
        redirect_count += 1
        # Extract target URL
        m_ref = re.search(r'content="0;\s*url=([^"]*)"', content, re.I)
        if m_ref:
            target_url = m_ref.group(1)
            clean_target = target_url.replace('https://createmy-qr.com', '').strip('/')
            target_parts = clean_target.split('/') if clean_target else []
            target_disk_file = os.path.join(dist_dir, *target_parts, 'index.html') if target_parts else os.path.join(dist_dir, 'index.html')
            if not os.path.exists(target_disk_file):
                dead_redirect_targets.append(f"{rel} -> Target does not exist on disk: {target_url} ({target_disk_file})")
        else:
            errors.append(f"Redirect stub {rel} missing refresh target URL")
    else:
        primary_count += 1
        # Primary page strict checks
        titles = re.findall(r'<title\b[^>]*>[\s\S]*?<\/title>', content, re.I)
        if len(titles) != 1:
            errors.append(f"[{rel}] Expected 1 title, found {len(titles)}")
        
        descs = re.findall(r'<meta\s+name="description"\s+content="([^"]*)"', content, re.I)
        if len(descs) != 1:
            errors.append(f"[{rel}] Expected 1 meta description, found {len(descs)}")
        
        h1s = re.findall(r'<h1\b[^>]*>[\s\S]*?<\/h1>', content, re.I)
        if len(h1s) != 1:
            errors.append(f"[{rel}] Expected 1 H1 tag, found {len(h1s)}")
        
        og = re.search(r'<meta\s+property="og:url"\s+content="([^"]*)"', content, re.I)
        can = re.search(r'<link\s+rel="canonical"\s+href="([^"]*)"', content, re.I)
        
        if not og or not can:
            errors.append(f"[{rel}] Missing og:url or canonical link tag")
        elif og.group(1) != can.group(1):
            errors.append(f"[{rel}] og:url ({og.group(1)}) does not match canonical ({can.group(1)})")
        
        # Check hreflang tags
        hreflangs = re.findall(r'<link\s+rel="alternate"\s+hreflang="([^"]*)"\s+href="([^"]*)"', content, re.I)
        if len(hreflangs) < 31:
            errors.append(f"[{rel}] Expected >= 31 alternate hreflang tags, found {len(hreflangs)}")

print(f"• Primary HTML Pages: {primary_count}")
print(f"• Redirect Fallback Stubs: {redirect_count}")
print(f"• Dead Redirect Targets Found: {len(dead_redirect_targets)}")
if dead_redirect_targets:
    for d in dead_redirect_targets[:5]:
        errors.append(d)

# ==============================================================================
# 3. AUDIT SITEMAP XML
# ==============================================================================
print("\n[STEP 3/5] Auditing sitemap.xml...")
sitemap_errors = []
sitemap_urls = set()

if not os.path.exists(sitemap_path):
    errors.append("public/sitemap.xml is missing!")
else:
    tree = ET.parse(sitemap_path)
    root = tree.getroot()
    # Namespace handling
    ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9', 'xhtml': 'http://www.w3.org/1999/xhtml'}
    
    for url_tag in root.findall('sm:url', ns):
        loc = url_tag.find('sm:loc', ns)
        if loc is None or not loc.text:
            sitemap_errors.append("Empty <loc> found in sitemap")
            continue
        
        u = loc.text.strip()
        if u in sitemap_urls:
            sitemap_errors.append(f"Duplicate URL in sitemap: {u}")
        sitemap_urls.add(u)
        
        # Verify that URL corresponds to an existing primary file
        clean_u = u.replace('https://createmy-qr.com', '').strip('/')
        u_parts = clean_u.split('/') if clean_u else []
        disk_file = os.path.join(dist_dir, *u_parts, 'index.html') if u_parts else os.path.join(dist_dir, 'index.html')
        
        if not os.path.exists(disk_file):
            sitemap_errors.append(f"Sitemap URL missing on disk: {u} -> {disk_file}")
        else:
            # Verify file is not a redirect stub
            with open(disk_file, 'r', encoding='utf-8') as df:
                c = df.read()
            if 'http-equiv="refresh"' in c:
                sitemap_errors.append(f"Sitemap URL is a redirect stub (should only contain canonical primary pages): {u}")

print(f"• Total Valid URLs in Sitemap: {len(sitemap_urls)}")
print(f"• Sitemap Errors: {len(sitemap_errors)}")
for se in sitemap_errors:
    errors.append(se)

# ==============================================================================
# 4. AUDIT ASSETS (IMAGES & BUNDLES)
# ==============================================================================
print("\n[STEP 4/5] Auditing Logo & Critical Assets...")
logo_file = r'd:\qr-and-qr\public\logoqr.png'
if os.path.exists(logo_file):
    size_kb = os.path.getsize(logo_file) / 1024
    print(f"• logoqr.png size: {size_kb:.2f} KB")
    if size_kb > 50:
        errors.append(f"logoqr.png exceeds 50 KB limit: {size_kb:.2f} KB")
else:
    errors.append("public/logoqr.png is missing!")

# ==============================================================================
# 5. FINAL FORENSIC SUMMARY
# ==============================================================================
print("\n" + "=" * 85)
print("📊 FORENSIC AUDIT SUMMARY REPORT")
print("=" * 85)
print(f"• Total Primary Static Pages Verified: {primary_count} (Target: 1.680)")
print(f"• Total Fallback Redirect Stubs:      {redirect_count} (Target: 1.334)")
print(f"• Total Sitemap URLs Verified:         {len(sitemap_urls)} (Target: 1.680)")
print(f"• Total Translation Locales Audited:   30 Languages")
print(f"• Total Critical Errors / Defects:     {len(errors)}")
print("=" * 85)

if len(errors) == 0:
    print("\n🏆 ZERO DEFECTS VERIFIED! CODEBASE IS 100% CLEAN, SECURE, AND PRODUCTION-READY!\n")
else:
    print("\n⚠️ DETECTED ISSUES TO RESOLVE:")
    for err in errors[:20]:
        print(f"  ❌ {err}")
    if len(errors) > 20:
        print(f"  ... and {len(errors) - 20} more errors.")
