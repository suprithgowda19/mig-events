with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Fix the missing quote and add jitter-sheen
target = 'class="gallery-card group relative rounded-2xl cursor-pointer h-full overflow-hidden data-category='
replacement = 'class="gallery-card group relative rounded-2xl cursor-pointer h-full overflow-hidden" data-category='

c = c.replace(target, replacement)

# Now add jitter-sheen inside each gallery-card
old_tag = '<div class="gallery-card group relative rounded-2xl cursor-pointer h-full overflow-hidden"'
new_tag = '<div class="gallery-card group relative rounded-2xl cursor-pointer h-full overflow-hidden">\n            <div class="jitter-sheen"></div>'

c = c.replace(old_tag, new_tag)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Fixed gallery card classes and inserted jitter-sheen!')
print('Total jitter-sheen count:', c.count('jitter-sheen'))
