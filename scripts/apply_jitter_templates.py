with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Update Reviews section with Jitter Stack Cards
old_reviews = '''    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <!-- Review 1 (Slide from Left) -->
      <div class="motion-card-wrapper motion-slide-left">
        <div class="editorial-card h-full rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <div class="font-mono text-[11px] text-stone-300 mb-6">RATING: 5.0 / 5.0</div>
            <p class="text-stone-200 text-sm leading-relaxed font-light mb-8">
              “MIG Events handled our 2,000-delegate tech symposium with unmatched military precision. The German hangar installation, line-array acoustics, and seamless LED visuals made our production flawless and impactful.”
            </p>
          </div>
          <div class="pt-4 border-t border-white/5 flex items-center justify-between">
            <div>
              <h3 class="text-white text-sm font-semibold">Rajesh Menon</h3>
              <p class="font-mono text-[11px] text-stone-300">VP Marketing, Enterprise Tech</p>
            </div>
            <span class="font-mono text-xs text-stone-300">01</span>
          </div>
        </div>
      </div>

      <!-- Review 2 (Drops from Top) -->
      <div class="motion-card-wrapper motion-fall-top">
        <div class="editorial-card h-full rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <div class="font-mono text-[11px] text-stone-300 mb-6">RATING: 5.0 / 5.0</div>
            <p class="text-stone-200 text-sm leading-relaxed font-light mb-8">
              “Our 3-day destination wedding in Bangalore Palace was an absolute dream. From the royal floral mandap to the electrifying Sangeet stage that kept everyone dancing until 3 AM — MIG made it truly unforgettable!”
            </p>
          </div>
          <div class="pt-4 border-t border-white/5 flex items-center justify-between">
            <div>
              <h3 class="text-white text-sm font-semibold">Pooja & Rohan Shetty</h3>
              <p class="font-mono text-[11px] text-stone-300">Bangalore Palace Destination</p>
            </div>
            <span class="font-mono text-xs text-stone-300">02</span>
          </div>
        </div>
      </div>

      <!-- Review 3 (Slide from Right) -->
      <div class="motion-card-wrapper motion-slide-right">
        <div class="editorial-card h-full rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <div class="font-mono text-[11px] text-stone-300 mb-6">RATING: 5.0 / 5.0</div>
            <p class="text-stone-200 text-sm leading-relaxed font-light mb-8">
              “We brought in MIG for our multi-city promotional concert tour. Their sound consoles, light programming, and safety protocol execution were on par with international festival standards.”
            </p>
          </div>
          <div class="pt-4 border-t border-white/5 flex items-center justify-between">
            <div>
              <h3 class="text-white text-sm font-semibold">Ananya Rao</h3>
              <p class="font-mono text-[11px] text-stone-300">Festival Director, Live Sounds</p>
            </div>
            <span class="font-mono text-xs text-stone-300">03</span>
          </div>
        </div>
      </div>

    </div>'''

new_reviews = '''    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 jitter-stack-wrapper">
      
      <!-- Review 1 (Jitter Stack Card: Fans Left) -->
      <div class="jitter-stack-card">
        <div class="editorial-card h-full rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden">
          <div class="jitter-sheen"></div>
          <div>
            <div class="font-mono text-[11px] text-stone-300 mb-6">RATING: 5.0 / 5.0</div>
            <p class="text-stone-200 text-sm leading-relaxed font-light mb-8">
              “MIG Events handled our 2,000-delegate tech symposium with unmatched military precision. The German hangar installation, line-array acoustics, and seamless LED visuals made our production flawless and impactful.”
            </p>
          </div>
          <div class="pt-4 border-t border-white/5 flex items-center justify-between">
            <div>
              <h3 class="text-white text-sm font-semibold">Rajesh Menon</h3>
              <p class="font-mono text-[11px] text-stone-300">VP Marketing, Enterprise Tech</p>
            </div>
            <span class="font-mono text-xs text-stone-300">01</span>
          </div>
        </div>
      </div>

      <!-- Review 2 (Jitter Stack Card: Center Deck) -->
      <div class="jitter-stack-card">
        <div class="editorial-card h-full rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden">
          <div class="jitter-sheen"></div>
          <div>
            <div class="font-mono text-[11px] text-stone-300 mb-6">RATING: 5.0 / 5.0</div>
            <p class="text-stone-200 text-sm leading-relaxed font-light mb-8">
              “Our 3-day destination wedding in Bangalore Palace was an absolute dream. From the royal floral mandap to the electrifying Sangeet stage that kept everyone dancing until 3 AM — MIG made it truly unforgettable!”
            </p>
          </div>
          <div class="pt-4 border-t border-white/5 flex items-center justify-between">
            <div>
              <h3 class="text-white text-sm font-semibold">Pooja & Rohan Shetty</h3>
              <p class="font-mono text-[11px] text-stone-300">Bangalore Palace Destination</p>
            </div>
            <span class="font-mono text-xs text-stone-300">02</span>
          </div>
        </div>
      </div>

      <!-- Review 3 (Jitter Stack Card: Fans Right) -->
      <div class="jitter-stack-card">
        <div class="editorial-card h-full rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden">
          <div class="jitter-sheen"></div>
          <div>
            <div class="font-mono text-[11px] text-stone-300 mb-6">RATING: 5.0 / 5.0</div>
            <p class="text-stone-200 text-sm leading-relaxed font-light mb-8">
              “We brought in MIG for our multi-city promotional concert tour. Their sound consoles, light programming, and safety protocol execution were on par with international festival standards.”
            </p>
          </div>
          <div class="pt-4 border-t border-white/5 flex items-center justify-between">
            <div>
              <h3 class="text-white text-sm font-semibold">Ananya Rao</h3>
              <p class="font-mono text-[11px] text-stone-300">Festival Director, Live Sounds</p>
            </div>
            <span class="font-mono text-xs text-stone-300">03</span>
          </div>
        </div>
      </div>

    </div>'''

# Normalize line endings for replacement
c = c.replace(old_reviews.replace('\n', '\r\n'), new_reviews)
c = c.replace(old_reviews, new_reviews)

# Add jitter-sheen inside editorial cards in Capabilities
c = c.replace(
    '<div class="editorial-card h-full rounded-2xl p-8 flex flex-col justify-between">',
    '<div class="editorial-card h-full rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden"><div class="jitter-sheen"></div>'
)

# Add jitter-sheen inside gallery cards in Portfolio
c = c.replace(
    '<div class="gallery-card group relative rounded-2xl cursor-pointer h-full"',
    '<div class="gallery-card group relative rounded-2xl cursor-pointer h-full overflow-hidden'
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated index.html with Jitter templates!')
print('jitter-stack-card count:', c.count('jitter-stack-card'))
print('jitter-sheen count:', c.count('jitter-sheen'))
