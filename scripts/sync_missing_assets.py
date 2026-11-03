import os
import glob
import json
import urllib.request
import urllib.parse
import re

with open('assets/media/site_crawl_summary.json', encoding='utf-8') as f:
    data = json.load(f)

remote_images = set(data['images'])
print(f"Total unique remote image URLs from site crawl: {len(remote_images)}")

local_files = [os.path.basename(p) for p in glob.glob('assets/images/*')]
print(f"Total local images in assets/images: {len(local_files)}")

# Check which remote images are not yet downloaded
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
downloaded_count = 0
os.makedirs('assets/images', exist_ok=True)

for url in sorted(remote_images):
    # Parse filename
    parsed = urllib.parse.urlparse(url)
    filename = os.path.basename(parsed.path)
    if not filename:
        continue
    
    # Check if already present
    match = any(filename.lower() in lf.lower() for lf in local_files)
    if not match:
        target_path = os.path.join('assets/images', filename)
        try:
            print(f"Downloading new asset: {filename} from {url}...")
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as resp, open(target_path, 'wb') as out_f:
                out_f.write(resp.read())
            downloaded_count += 1
        except Exception as e:
            print(f"  Error downloading {filename}: {e}")

print(f"\nDone! Downloaded {downloaded_count} new images.")
total_local = len(glob.glob('assets/images/*'))
print(f"Total local assets now: {total_local}")
