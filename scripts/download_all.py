import os
import re
import ssl
import json
import urllib.request
import urllib.parse
from concurrent.futures import ThreadPoolExecutor, as_completed
from html import unescape

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.join(BASE_DIR, 'assets')
IMAGES_DIR = os.path.join(ASSETS_DIR, 'images')
CONTENT_DIR = os.path.join(BASE_DIR, 'content')
PAGES_DIR = os.path.join(CONTENT_DIR, 'pages')
RAW_DIR = os.path.join(CONTENT_DIR, 'raw_pages')

for d in [ASSETS_DIR, IMAGES_DIR, CONTENT_DIR, PAGES_DIR, RAW_DIR]:
    os.makedirs(d, exist_ok=True)

def fetch_json(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=20, context=ctx) as res:
        return json.loads(res.read().decode('utf-8'))

def download_file(url, target_path):
    if os.path.exists(target_path) and os.path.getsize(target_path) > 0:
        return target_path, True, "Already exists"
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=25, context=ctx) as res:
            with open(target_path, 'wb') as f:
                f.write(res.read())
        return target_path, True, "Downloaded"
    except Exception as e:
        return target_path, False, str(e)

def clean_html_to_markdown(html_content):
    if not html_content:
        return ""
    # Replace headings
    text = re.sub(r'<h1[^>]*>(.*?)</h1>', r'\n# \1\n', html_content, flags=re.I|re.S)
    text = re.sub(r'<h2[^>]*>(.*?)</h2>', r'\n## \1\n', text, flags=re.I|re.S)
    text = re.sub(r'<h3[^>]*>(.*?)</h3>', r'\n### \1\n', text, flags=re.I|re.S)
    text = re.sub(r'<h4[^>]*>(.*?)</h4>', r'\n#### \1\n', text, flags=re.I|re.S)
    text = re.sub(r'<h5[^>]*>(.*?)</h5>', r'\n##### \1\n', text, flags=re.I|re.S)
    # Lists
    text = re.sub(r'<li[^>]*>(.*?)</li>', r'\n- \1', text, flags=re.I|re.S)
    # Paragraphs and breaks
    text = re.sub(r'<p[^>]*>(.*?)</p>', r'\n\1\n', text, flags=re.I|re.S)
    text = re.sub(r'<br\s*/?>', r'\n', text, flags=re.I)
    # Links
    text = re.sub(r'<a\s+[^>]*href=[\x27\x22]([^\x27\x22]+)[\x27\x22][^>]*>(.*?)</a>', r'[\2](\1)', text, flags=re.I|re.S)
    # Remove remaining HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    # Unescape HTML entities
    text = unescape(text)
    # Normalize multiple empty lines
    text = re.sub(r'\n\s*\n\s*\n+', '\n\n', text)
    return text.strip()

def sanitize_filename(name):
    clean = re.sub(r'[\\/*?:"<>|]', '_', name)
    return clean[:100]

def main():
    print("=== Step 1: Fetching WordPress Pages & Content ===")
    pages = fetch_json('https://migeventsandproductions.com/wp-json/wp/v2/pages?per_page=100')
    posts = fetch_json('https://migeventsandproductions.com/wp-json/wp/v2/posts?per_page=100')
    
    all_pages = pages + posts
    print(f"Total pages + posts found: {len(all_pages)}")

    site_pages_summary = []
    videos_found = []

    for item in all_pages:
        title = unescape(item.get('title', {}).get('rendered', 'Untitled')).strip()
        slug = item.get('slug', 'page')
        link = item.get('link', '')
        raw_html = item.get('content', {}).get('rendered', '')
        clean_text = clean_html_to_markdown(raw_html)

        # Detect videos
        yt = re.findall(r'https?://(?:www\.)?(?:youtube\.com/[^\s"\'<>]+|youtu\.be/[^\s"\'<>]+)', raw_html)
        vimeo = re.findall(r'https?://(?:www\.)?vimeo\.com/[^\s"\'<>]+', raw_html)
        direct_vids = re.findall(r'https?://[^\s"\'<>]+\.(?:mp4|webm|mov|m4v)', raw_html, re.I)
        
        for v in yt + vimeo + direct_vids:
            videos_found.append({"page": title, "url": v})

        # Save markdown
        md_file = os.path.join(PAGES_DIR, f"{slug}.md")
        with open(md_file, 'w', encoding='utf-8') as f:
            f.write(f"# {title}\n\n")
            f.write(f"- **URL**: {link}\n")
            f.write(f"- **Type**: {item.get('type')}\n")
            f.write(f"- **Date**: {item.get('date')}\n\n")
            f.write("---\n\n")
            f.write(clean_text)

        # Save raw json
        raw_file = os.path.join(RAW_DIR, f"{slug}.json")
        with open(raw_file, 'w', encoding='utf-8') as f:
            json.dump(item, f, indent=2, ensure_ascii=False)

        site_pages_summary.append({
            "id": item.get('id'),
            "title": title,
            "slug": slug,
            "link": link,
            "md_file": f"content/pages/{slug}.md"
        })
        print(f"  [SAVED PAGE] {title} -> {md_file}")

    # Save consolidated site summary
    with open(os.path.join(CONTENT_DIR, 'site_pages_index.json'), 'w', encoding='utf-8') as f:
        json.dump(site_pages_summary, f, indent=2)

    with open(os.path.join(CONTENT_DIR, 'videos.json'), 'w', encoding='utf-8') as f:
        json.dump(videos_found, f, indent=2)

    # Consolidated single markdown document for easy AI ingestion / reading
    with open(os.path.join(CONTENT_DIR, 'all_site_text.md'), 'w', encoding='utf-8') as f:
        f.write("# MIG Events & Productions - Complete Website Content\n\n")
        for p in site_pages_summary:
            f.write(f"## {p['title']}\n")
            f.write(f"Source URL: {p['link']}\n\n")
            p_md = os.path.join(BASE_DIR, p['md_file'])
            if os.path.exists(p_md):
                with open(p_md, 'r', encoding='utf-8') as pf:
                    f.write(pf.read())
            f.write("\n\n" + "="*50 + "\n\n")

    print(f"\n=== Step 2: Fetching All Media Assets (Images, Videos, Documents) ===")
    media_items = []
    page_num = 1
    while True:
        try:
            url = f'https://migeventsandproductions.com/wp-json/wp/v2/media?per_page=100&page={page_num}'
            batch = fetch_json(url)
            if not batch:
                break
            media_items.extend(batch)
            print(f"  Fetched media batch {page_num}: {len(batch)} items")
            page_num += 1
        except Exception:
            break

    print(f"Total media items to download: {len(media_items)}")

    download_tasks = []
    media_manifest = []

    for idx, m in enumerate(media_items):
        source_url = m.get('source_url')
        if not source_url:
            continue
        
        parsed = urllib.parse.urlparse(source_url)
        orig_filename = os.path.basename(parsed.path)
        if not orig_filename:
            orig_filename = f"media_{m.get('id', idx)}.jpg"
        
        # Keep clean unique filename
        filename = f"{m.get('id', idx)}_{orig_filename}"
        target_path = os.path.join(IMAGES_DIR, filename)

        download_tasks.append((source_url, target_path))
        
        media_manifest.append({
            "id": m.get('id'),
            "title": unescape(m.get('title', {}).get('rendered', '')),
            "alt_text": m.get('alt_text', ''),
            "caption": unescape(m.get('caption', {}).get('rendered', '')),
            "mime_type": m.get('mime_type', ''),
            "original_url": source_url,
            "filename": filename,
            "local_path": f"assets/images/{filename}",
            "width": m.get('media_details', {}).get('width'),
            "height": m.get('media_details', {}).get('height')
        })

    with open(os.path.join(ASSETS_DIR, 'media_manifest.json'), 'w', encoding='utf-8') as f:
        json.dump(media_manifest, f, indent=2)

    print(f"\n=== Step 3: Downloading {len(download_tasks)} Assets in Parallel ===")
    completed = 0
    failed = 0
    
    with ThreadPoolExecutor(max_workers=8) as executor:
        future_to_url = {executor.submit(download_file, url, path): url for url, path in download_tasks}
        for future in as_completed(future_to_url):
            path, success, msg = future.result()
            if success:
                completed += 1
            else:
                failed += 1
                print(f"  [ERROR] {path}: {msg}")
            if (completed + failed) % 25 == 0 or (completed + failed) == len(download_tasks):
                print(f"  Progress: {completed + failed}/{len(download_tasks)} ({completed} succeeded, {failed} failed)")

    print(f"\n=== Download Complete! ===")
    print(f"- Total pages saved: {len(all_pages)}")
    print(f"- Total media files downloaded: {completed} / {len(download_tasks)}")
    print(f"- Assets directory: {ASSETS_DIR}")
    print(f"- Content directory: {CONTENT_DIR}")

if __name__ == '__main__':
    main()
