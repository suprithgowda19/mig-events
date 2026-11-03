import json
import os
import re
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

def fetch(url):
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=12) as resp:
            return resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Failed to fetch {url}: {e}")
        return ""

print("--- 1. Discovering All Sitemap Pages ---")
sitemaps = [
    'https://migeventsandproductions.com/wp-sitemap.xml',
    'https://migeventsandproductions.com/wp-sitemap-posts-page-1.xml',
    'https://migeventsandproductions.com/wp-sitemap-posts-post-1.xml',
    'https://migeventsandproductions.com/sitemap_index.xml',
    'https://migeventsandproductions.com/sitemap.xml'
]

discovered_pages = set(['https://migeventsandproductions.com/'])

for sm in sitemaps:
    content = fetch(sm)
    if content:
        # Extract loc tags
        locs = re.findall(r'<loc>(https?://migeventsandproductions\.com/[^<]*)</loc>', content)
        for loc in locs:
            if loc.endswith('.xml'):
                # Sub-sitemap
                sub_content = fetch(loc)
                sub_locs = re.findall(r'<loc>(https?://migeventsandproductions\.com/[^<]*)</loc>', sub_content)
                for sloc in sub_locs:
                    if not sloc.endswith('.xml'):
                        discovered_pages.add(sloc)
            else:
                discovered_pages.add(loc)

print(f"Discovered {len(discovered_pages)} distinct site pages:")
for p in sorted(discovered_pages):
    print(f"  - {p}")

print("\n--- 2. Crawling Each Page for Media & Content ---")
all_images = set()
all_videos = set()
page_content = {}

for page_url in sorted(discovered_pages):
    print(f"Scanning {page_url}...")
    html = fetch(page_url)
    if not html:
        continue
    
    # Find all images
    imgs = re.findall(r'https?://[^\s"\'<>]+\.(?:jpg|jpeg|png|webp|gif|svg)', html, re.I)
    for img in imgs:
        if 'migeventsandproductions.com' in img:
            all_images.add(img)
            
    # Find videos: direct video links, youtube, vimeo, video tags
    vids = re.findall(r'https?://[^\s"\'<>]+(?:\.mp4|\.webm|\.mov|\.m4v)', html, re.I)
    for v in vids:
        all_videos.add((page_url, v))
        
    yt = re.findall(r'https?://(?:www\.)?(?:youtube\.com/watch\?v=|youtu\.be/|youtube\.com/embed/)([a-zA-Z0-9_-]{11})', html)
    for y in yt:
        all_videos.add((page_url, f"https://www.youtube.com/watch?v={y}"))
        
    vimeo = re.findall(r'https?://(?:player\.)?vimeo\.com/(?:video/)?([0-9]+)', html)
    for vm in vimeo:
        all_videos.add((page_url, f"https://vimeo.com/{vm}"))

print(f"\nTotal unique site images found: {len(all_images)}")
print(f"Total video references found: {len(all_videos)}")
for page, v in all_videos:
    print(f"  Video: {v} (found on {page})")

# Save summary
os.makedirs('assets/media', exist_ok=True)
with open('assets/media/site_crawl_summary.json', 'w', encoding='utf-8') as f:
    json.dump({
        'pages': list(discovered_pages),
        'image_count': len(all_images),
        'images': sorted(list(all_images)),
        'videos': list(all_videos)
    }, f, indent=2)

print("\nSaved crawl summary to assets/media/site_crawl_summary.json")
