import os
import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

imgs = re.findall(r'assets/images/[^\s"\'\)]+', html)
print(f"Total image references: {len(imgs)}")
missing = []
for img in set(imgs):
    if not os.path.exists(img):
        missing.append(img)
    else:
        print(f"  [EXISTS] {img}")

if missing:
    print(f"[ERROR] Missing {len(missing)} files:", missing)
else:
    print("\nSUCCESS: All referenced images exist on disk!")
