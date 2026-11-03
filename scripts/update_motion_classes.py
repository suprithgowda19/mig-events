with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Capabilities Card 2: Drops from top
c = c.replace(
    '<!-- Card 2: Luxury Weddings (Slide from Center/Bottom) -->\n      <div class="motion-card-wrapper motion-slide-center">',
    '<!-- Card 2: Luxury Weddings (Drops from Top) -->\n      <div class="motion-card-wrapper motion-fall-top">'
)
# Also handle \r\n
c = c.replace(
    '<!-- Card 2: Luxury Weddings (Slide from Center/Bottom) -->\r\n      <div class="motion-card-wrapper motion-slide-center">',
    '<!-- Card 2: Luxury Weddings (Drops from Top) -->\r\n      <div class="motion-card-wrapper motion-fall-top">'
)

# Capabilities Card 5: Drops from top
c = c.replace(
    '<!-- Card 5: German Hangars & Heavy Fabrication (Slide from Right) -->\n      <div class="motion-card-wrapper motion-slide-right md:col-span-2 lg:col-span-2">',
    '<!-- Card 5: German Hangars & Heavy Fabrication (Drops from Top) -->\n      <div class="motion-card-wrapper motion-fall-top md:col-span-2 lg:col-span-2">'
)
c = c.replace(
    '<!-- Card 5: German Hangars & Heavy Fabrication (Slide from Right) -->\r\n      <div class="motion-card-wrapper motion-slide-right md:col-span-2 lg:col-span-2">',
    '<!-- Card 5: German Hangars & Heavy Fabrication (Drops from Top) -->\r\n      <div class="motion-card-wrapper motion-fall-top md:col-span-2 lg:col-span-2">'
)

# 2. Portfolio Item 2: Drops from top
c = c.replace(
    '<!-- Item 2: Corporate Leadership Summit (Slide from Center) -->\n        <div class="gallery-item-wrap motion-card-wrapper motion-slide-center" data-category="corporate">',
    '<!-- Item 2: Corporate Leadership Summit (Drops from Top) -->\n        <div class="gallery-item-wrap motion-card-wrapper motion-fall-top" data-category="corporate">'
)
c = c.replace(
    '<!-- Item 2: Corporate Leadership Summit (Slide from Center) -->\r\n        <div class="gallery-item-wrap motion-card-wrapper motion-slide-center" data-category="corporate">',
    '<!-- Item 2: Corporate Leadership Summit (Drops from Top) -->\r\n        <div class="gallery-item-wrap motion-card-wrapper motion-fall-top" data-category="corporate">'
)

# Portfolio Item 4: Drops from top
c = c.replace(
    '<!-- Item 4: German Hangar Fabrication (Slide from Left) -->\n        <div class="gallery-item-wrap motion-card-wrapper motion-slide-left" data-category="concerts">',
    '<!-- Item 4: German Hangar Fabrication (Drops from Top) -->\n        <div class="gallery-item-wrap motion-card-wrapper motion-fall-top" data-category="concerts">'
)
c = c.replace(
    '<!-- Item 4: German Hangar Fabrication (Slide from Left) -->\r\n        <div class="gallery-item-wrap motion-card-wrapper motion-slide-left" data-category="concerts">',
    '<!-- Item 4: German Hangar Fabrication (Drops from Top) -->\r\n        <div class="gallery-item-wrap motion-card-wrapper motion-fall-top" data-category="concerts">'
)

# Portfolio Item 5: Rises from bottom
c = c.replace(
    '<!-- Item 5: Sangeet Night Concert (Slide from Center) -->\n        <div class="gallery-item-wrap motion-card-wrapper motion-slide-center" data-category="weddings">',
    '<!-- Item 5: Sangeet Night Concert (Rises from Bottom) -->\n        <div class="gallery-item-wrap motion-card-wrapper motion-rise-bottom" data-category="weddings">'
)
c = c.replace(
    '<!-- Item 5: Sangeet Night Concert (Slide from Center) -->\r\n        <div class="gallery-item-wrap motion-card-wrapper motion-slide-center" data-category="weddings">',
    '<!-- Item 5: Sangeet Night Concert (Rises from Bottom) -->\r\n        <div class="gallery-item-wrap motion-card-wrapper motion-rise-bottom" data-category="weddings">'
)

# Portfolio Item 6: Drops from top
c = c.replace(
    '<!-- Item 6: Celebrity PR & Film Launch (Slide from Right) -->\n        <div class="gallery-item-wrap motion-card-wrapper motion-slide-right" data-category="celebrity">',
    '<!-- Item 6: Celebrity PR & Film Launch (Drops from Top) -->\n        <div class="gallery-item-wrap motion-card-wrapper motion-fall-top" data-category="celebrity">'
)
c = c.replace(
    '<!-- Item 6: Celebrity PR & Film Launch (Slide from Right) -->\r\n        <div class="gallery-item-wrap motion-card-wrapper motion-slide-right" data-category="celebrity">',
    '<!-- Item 6: Celebrity PR & Film Launch (Drops from Top) -->\r\n        <div class="gallery-item-wrap motion-card-wrapper motion-fall-top" data-category="celebrity">'
)

# Portfolio Item 8: Drops from top
c = c.replace(
    '<!-- Item 8: Electronic Music Showcase (Slide from Center) -->\n        <div class="gallery-item-wrap motion-card-wrapper motion-slide-center" data-category="concerts">',
    '<!-- Item 8: Electronic Music Showcase (Drops from Top) -->\n        <div class="gallery-item-wrap motion-card-wrapper motion-fall-top" data-category="concerts">'
)
c = c.replace(
    '<!-- Item 8: Electronic Music Showcase (Slide from Center) -->\r\n        <div class="gallery-item-wrap motion-card-wrapper motion-slide-center" data-category="concerts">',
    '<!-- Item 8: Electronic Music Showcase (Drops from Top) -->\r\n        <div class="gallery-item-wrap motion-card-wrapper motion-fall-top" data-category="concerts">'
)

# 3. Review 2: Drops from top
c = c.replace(
    '<!-- Review 2 (Slide from Center) -->\n      <div class="motion-card-wrapper motion-slide-center">',
    '<!-- Review 2 (Drops from Top) -->\n      <div class="motion-card-wrapper motion-fall-top">'
)
c = c.replace(
    '<!-- Review 2 (Slide from Center) -->\r\n      <div class="motion-card-wrapper motion-slide-center">',
    '<!-- Review 2 (Drops from Top) -->\r\n      <div class="motion-card-wrapper motion-fall-top">'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated motion classes in index.html!')
print('motion-fall-top count:', c.count('motion-fall-top'))
print('motion-slide-left count:', c.count('motion-slide-left'))
print('motion-slide-right count:', c.count('motion-slide-right'))
print('motion-rise-bottom count:', c.count('motion-rise-bottom'))
