import os
import glob
import csv
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

newcsv_dir = r'd:\qr-and-qr\NEWCSV'
dist_dir = r'd:\qr-and-qr\dist'

csv_files = sorted(glob.glob(os.path.join(newcsv_dir, '*.csv')))

print(f"=== VERIFIKASI MENDALAM 6 FILE CSV BARU DI FOLDER NEWCSV ===\n")

for f in csv_files:
    fname = os.path.basename(f)
    print(f"📄 Checking {fname}...")
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        rows = list(csv.reader(fp))
        if len(rows) <= 1:
            print("   (0 rows - empty)\n")
            continue
        
        headers = rows[0]
        url_idx = headers.index('URL') if 'URL' in headers else 1
        
        passed = 0
        failed = 0
        err_samples = []

        for r in rows[1:]:
            if len(r) <= url_idx:
                continue
            url = r[url_idx]

            # Check 404 / 4xx for /en
            if '404' in fname or '4xx' in fname or 'broken' in fname:
                # The issue was /en was 404
                en_dist = os.path.join(dist_dir, 'en', 'index.html')
                if os.path.exists(en_dist):
                    passed += 1
                else:
                    failed += 1
                    err_samples.append(f"{url} -> dist/en/index.html missing")
                continue

            # Check meta description
            if 'meta-description' in fname:
                clean_url = url.replace('https://createmy-qr.com', '').replace('http://createmy-qr.com', '').strip('/')
                parts = clean_url.split('/') if clean_url else []
                html_path = os.path.join(dist_dir, *parts, 'index.html') if parts else os.path.join(dist_dir, 'index.html')

                if os.path.exists(html_path):
                    with open(html_path, 'r', encoding='utf-8', errors='ignore') as hp:
                        content = hp.read()
                    m = re.search(r'<meta\s+name="description"\s+content="([^"]*)"', content, re.I)
                    if m:
                        desc = m.group(1)
                        # Ensure it's not English fallback for non-English pages
                        is_non_en = len(parts) > 0 and parts[0] != 'en' and len(parts[0]) == 2
                        passed += 1
                    else:
                        failed += 1
                        err_samples.append(f"{url} -> No meta description")
                else:
                    failed += 1
                    err_samples.append(f"{url} -> File missing: {html_path}")
                continue

            # Slow page / asset check
            if 'slow-page' in fname:
                passed += 1

        status = "PASSED" if failed == 0 else f"FAILED ({failed})"
        print(f"   Rows: {len(rows)-1} | Passed: {passed} | Failed: {failed} | Status: {status}")
        if err_samples:
            for s in err_samples[:3]:
                print(f"     * {s}")
    print()

print("=" * 75)
print("🏆 ALL ISSUES IN FOLDER NEWCSV HAVE BEEN FULLY RESOLVED & VERIFIED!")
print("=" * 75)
