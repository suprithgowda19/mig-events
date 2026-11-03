import urllib.request
import json
import re

url = "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=MLpWrANjFbI&format=json"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        print("YouTube Video Info:")
        print("  Title:", data.get('title'))
        print("  Author:", data.get('author_name'))
        print("  Author URL:", data.get('author_url'))
        print("  Thumbnail:", data.get('thumbnail_url'))
except Exception as e:
    print(f"Error fetching YT info: {e}")

# Check social links across crawled pages
with open('assets/media/site_crawl_summary.json', encoding='utf-8') as f:
    summary = json.load(f)

print(f"Total crawled pages: {len(summary['pages'])}")
