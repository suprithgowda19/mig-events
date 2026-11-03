import os
import json
import re

content_dir = 'content/raw_pages'
page_images = {}

for f in os.listdir(content_dir):
    if f.endswith('.json'):
        with open(os.path.join(content_dir, f), 'r', encoding='utf-8') as jf:
            page = json.load(jf)
            html = page.get('content', {}).get('rendered', '')
            # find all wp-content/uploads image urls
            imgs = re.findall(r'wp-content/uploads/([^\s"\'<>]+\.(?:jpg|jpeg|png|webp))', html, re.I)
            page_images[f.replace('.json', '')] = list(set(imgs))

print("Mapped images per page:")
for page, imgs in page_images.items():
    print(f"Page '{page}': {len(imgs)} images")
