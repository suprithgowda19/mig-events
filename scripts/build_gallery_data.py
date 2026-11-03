import json

with open('assets/media_manifest.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

valid = [i for i in items if (i.get('width') or 0) >= 800 and (i.get('height') or 0) >= 500]
print(f"Total high-res images: {len(valid)}")
for v in valid[:25]:
    print(f"ID {v['id']}: {v['filename']} | {v['width']}x{v['height']}")
