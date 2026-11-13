with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Watch Our Reel button contrast
old_reel = """        <button id="openShowreelBtn" class="showreel-ring-btn w-full sm:w-auto px-6 py-4 rounded-full text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2.5 border border-amber-400/40 bg-amber-500/[0.08] text-white hover:bg-amber-500/[0.18] hover:border-amber-400/70 transition-all magnetic-target relative group">
          <div class="showreel-soundwave-ring"></div>
          <div class="showreel-soundwave-ring"></div>
          <span class="w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center group-hover:scale-110 transition-transform">
            <i data-lucide="play" class="w-3 h-3 fill-black text-black ml-0.5"></i>
          </span>
          <span class="font-bold tracking-widest text-amber-200">Watch Our Reel</span>
        </button>"""

new_reel = """        <button id="openShowreelBtn" class="showreel-ring-btn w-full sm:w-auto px-6 py-4 rounded-full text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2.5 border border-amber-400/60 bg-black/85 backdrop-blur-md text-white hover:bg-black hover:border-amber-400 transition-all magnetic-target relative group">
          <div class="showreel-soundwave-ring"></div>
          <div class="showreel-soundwave-ring"></div>
          <span class="w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center group-hover:scale-110 transition-transform">
            <i data-lucide="play" class="w-3 h-3 fill-black text-black ml-0.5"></i>
          </span>
          <span class="font-bold tracking-widest text-white">Watch Our Reel</span>
        </button>"""

if old_reel in html:
    html = html.replace(old_reel, new_reel, 1)
    print("Updated Watch Our Reel button")
else:
    print("Watch Our Reel not found directly")

# 2. Direct Desk contrast
old_direct = """        <a href="https://wa.me/916366225477?text=Hi%2C%20I%20have%20an%20event%20enquiry." target="_blank" class="w-full sm:w-auto btn-editorial-outline px-6 py-4 rounded-full text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 magnetic-target">
          <i data-lucide="message-circle" class="w-4 h-4 text-emerald-400"></i>
          <span>Direct Desk</span>
        </a>"""

new_direct = """        <a href="https://wa.me/916366225477?text=Hi%2C%20I%20have%20an%20event%20enquiry." target="_blank" class="w-full sm:w-auto btn-editorial-outline px-6 py-4 rounded-full text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 magnetic-target bg-black/85 backdrop-blur-md border border-white/25 text-white font-medium hover:border-white/50">
          <i data-lucide="message-circle" class="w-4 h-4 text-emerald-400"></i>
          <span class="text-white">Direct Desk</span>
        </a>"""

if old_direct in html:
    html = html.replace(old_direct, new_direct, 1)
    print("Updated Direct Desk button")
else:
    print("Direct Desk not found directly")

# 3. Acronym Header Bar contrast
old_acronym_bar = """          <div class="flex items-center justify-between mb-3 px-2 font-mono text-[11px] sm:text-xs text-stone-400 border-b border-white/5 pb-2 relative z-10">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-amber-400 "></span>
              <span class="tracking-widest uppercase text-stone-300">ACRONYM ARCHITECTURE // BRAND PHILOSOPHY</span>
            </div>
            <span class="tracking-widest uppercase text-amber-300/90 hidden sm:inline">HOVER / SCROLL TO EXPAND SPEC</span>
          </div>"""

new_acronym_bar = """          <div class="flex items-center justify-between mb-3 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[11px] sm:text-xs text-white relative z-10">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-amber-400"></span>
              <span class="tracking-widest uppercase font-semibold text-white">ACRONYM ARCHITECTURE // BRAND PHILOSOPHY</span>
            </div>
            <span class="tracking-widest uppercase text-amber-300 font-medium hidden sm:inline">HOVER / SCROLL TO EXPAND SPEC</span>
          </div>"""

if old_acronym_bar in html:
    html = html.replace(old_acronym_bar, new_acronym_bar, 1)
    print("Updated Acronym header bar")
else:
    print("Acronym header bar not found directly")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
