import json

with open('assets/media_manifest.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

large_images = sorted([i for i in items if i.get('width') and i.get('height')], key=lambda x: x['width']*x['height'], reverse=True)
print('Total media items with dimensions:', len(large_images))
for img in large_images[:25]:
    w = img.get('width')
    h = img.get('height')
    fn = img.get('filename')
    title = img.get('title')
    print(f"{img.get('id')} ({w}x{h}): {fn} | {title}")
