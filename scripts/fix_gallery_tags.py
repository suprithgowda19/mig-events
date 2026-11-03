import re

with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Pattern for malformed gallery card:
# <div class="gallery-card group relative rounded-2xl cursor-pointer h-full overflow-hidden">\n            <div class="jitter-sheen"></div> data-category=... data-title="...">
pattern = r'<div class="gallery-card group relative rounded-2xl cursor-pointer h-full overflow-hidden">\s*<div class="jitter-sheen"></div> (data-category="[^"]+" data-img="[^"]+" data-title="[^"]+")>'

def replacer(match):
    attrs = match.group(1)
    return f'<div class="gallery-card group relative rounded-2xl cursor-pointer h-full overflow-hidden" {attrs}>\n            <div class="jitter-sheen"></div>'

c = re.sub(pattern, replacer, c)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Fixed gallery card tags in index.html!')
print('Remaining malformed count:', c.count('overflow-hidden">\n            <div class="jitter-sheen"></div> data-category='))
