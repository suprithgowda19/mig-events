import glob
import re
import urllib.request

print("--- Checking existing downloaded content files ---")
found_vids = set()
for f in glob.glob('content/**/*.html', recursive=True) + glob.glob('content/**/*.md', recursive=True):
    try:
        txt = open(f, encoding='utf-8', errors='ignore').read()
        vids = re.findall(r'https?://[^\s"\'<>]+(?:mp4|webm|mov|youtube\.com|youtu\.be|vimeo\.com)[^\s"\'<>]*', txt, re.I)
        for v in vids:
            found_vids.add((f, v))
    except Exception as e:
        pass

print(f"Found {len(found_vids)} video references in existing content files:")
for src, v in list(found_vids)[:15]:
    print(f"  [{src}] -> {v}")

print("\n--- Live Scraping migeventsandproductions.com for Video Elements ---")
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
urls_to_check = [
    'https://migeventsandproductions.com/',
    'https://migeventsandproductions.com/about-us/',
    'https://migeventsandproductions.com/services/',
    'https://migeventsandproductions.com/portfolio/',
    'https://migeventsandproductions.com/gallery/',
    'https://migeventsandproductions.com/contact-us/'
]

live_media = set()
for url in urls_to_check:
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            # Look for video tags, iframe, mp4, youtube, etc.
            matches = re.findall(r'https?://[^\s"\'<>]+(?:\.mp4|\.webm|\.mov|youtube\.com|youtu\.be|vimeo\.com)[^\s"\'<>]*', html, re.I)
            for m in matches:
                live_media.add((url, m))
            # Also check for wp-content/uploads video files
            wp_vids = re.findall(r'https?://[^\s"\'<>]+/wp-content/uploads/[^\s"\'<>]+\.(?:mp4|webm|mov|m4v)', html, re.I)
            for w in wp_vids:
                live_media.add((url, w))
    except Exception as e:
        print(f"Error checking {url}: {e}")

print(f"Found {len(live_media)} live video references:")
for page, media in live_media:
    print(f"  [{page}] -> {media}")
