import json

with open('assets/media_manifest.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

for item in items:
    title = item.get('title', '')
    fn = item.get('filename', '')
    # Check if there are recognizable words
    words = [w for w in title.split() if len(w) > 3 and not w.isdigit()]
    if words and not fn.startswith('DSC') and not fn.startswith('KGP') and not fn.startswith('SDR') and not fn.startswith('WhatsApp'):
        print(f"ID {item['id']}: {title} -> {fn}")
