import urllib.request
import ssl
import re
import json

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
}

def analyze(name, url):
    print(f"\n=================== {name} ({url}) ===================")
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=15, context=ctx) as res:
        html = res.read().decode('utf-8', errors='ignore')

    # 1. Fonts
    google_fonts = re.findall(r'fonts\.googleapis\.com/css2?\?family=([^&"\']+)', html)
    print("Google Fonts:", google_fonts)

    # 2. Colors in inline styles and CSS
    colors = set(re.findall(r'#(?:[0-9a-fA-F]{3}){1,2}\b', html))
    print("Colors found in HTML:", list(colors)[:10])

    # 3. Main navigation structure
    nav_links = re.findall(r'<a\s+[^>]*href=[\'"]([^\'"]+)[\'"][^>]*>(.*?)</a>', html, re.S)
    clean_nav = []
    for href, text in nav_links:
        t = re.sub(r'<[^>]+>', '', text).strip()
        if t and len(t) < 30 and not href.startswith('#') and not href.startswith('javascript:'):
            clean_nav.append(f"{t} ({href})")
    print("Navigation items:", clean_nav[:12])

    # 4. Hero section anatomy
    hero_match = re.search(r'<(?:div|section)[^>]*(?:id|class)=[\'"][^\'"]*hero[^\'"]*[\'"][^>]*>(.*?)</(?:div|section)>', html, re.S|re.I)
    if hero_match:
        hero_txt = re.sub(r'<[^>]+>', ' ', hero_match.group(1))
        hero_txt = ' '.join(hero_txt.split())
        print("Hero Text Preview:", hero_txt[:250])

    # 5. Key Section Titles
    h_tags = re.findall(r'<(h[1-4])[^>]*>(.*?)</\1>', html, re.S|re.I)
    print("Headings:")
    for tag, content in h_tags[:12]:
        clean = re.sub(r'<[^>]+>', '', content).strip()
        if clean:
            print(f"  [{tag.upper()}] {clean}")

analyze('Fuel India', 'https://www.fuelindia.co.in/')
analyze('GPJ India', 'https://www.gpjindia.com/')
