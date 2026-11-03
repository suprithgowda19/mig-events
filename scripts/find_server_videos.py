import urllib.request
import re

headers = {'User-Agent': 'Mozilla/5.0'}

# Test common upload directories for mp4 files
years = ['2023', '2024', '2025', '2026']
months = [f"{m:02d}" for m in range(1, 13)]

print("Scanning migeventsandproductions.com for direct mp4 video files...")
found_vids = []

# Check wp-content/uploads directory listings or common video names
test_names = [
    'showreel.mp4', 'hero.mp4', 'concert.mp4', 'event.mp4', 'promo.mp4',
    'video.mp4', 'intro.mp4', 'stage.mp4', 'wedding.mp4', 'corporate.mp4',
    'WhatsApp-Video.mp4', 'VID.mp4'
]

for y in years:
    for m in months:
        for name in test_names:
            url = f"https://migeventsandproductions.com/wp-content/uploads/{y}/{m}/{name}"
            try:
                req = urllib.request.Request(url, headers=headers, method='HEAD')
                with urllib.request.urlopen(req, timeout=2) as resp:
                    if resp.status == 200:
                        print(f"Found video! {url}")
                        found_vids.append(url)
            except Exception:
                pass

print(f"Total direct mp4s found on WordPress uploads: {len(found_vids)}")
