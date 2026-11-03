with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('text-stone-400', 'text-stone-300')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Contrast updated successfully!')
