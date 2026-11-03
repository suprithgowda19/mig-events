import urllib.request
import os

os.makedirs('assets/videos', exist_ok=True)
url = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
target = "assets/videos/stage-showreel.mp4"

print(f"Downloading {url} to {target}...")
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, timeout=30) as resp, open(target, 'wb') as f:
        f.write(resp.read())
    size = os.path.getsize(target)
    print(f"Success! Downloaded {size} bytes ({size / (1024*1024):.2f} MB).")
except Exception as e:
    print(f"Error: {e}")
