with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

# Add Watch 2026 Reel button
old_hero_btns = '''      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto hero-sub-element">
        <a href="#portfolio" class="w-full sm:w-auto btn-editorial-gold px-8 py-4 rounded-full text-xs font-display tracking-widest uppercase flex items-center justify-center gap-2 magnetic-target">
          <span>Explore ExperienceWork</span>
          <i data-lucide="arrow-down-right" class="w-4 h-4"></i>
        </a>
        <a href="https://wa.me/917022019101?text=Hi%20MIG%20Events,%20I%20would%20like%20to%20inquire%20about%20event%20production." target="_blank" class="w-full sm:w-auto btn-editorial-outline px-8 py-4 rounded-full text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 magnetic-target">
          <i data-lucide="message-circle" class="w-4 h-4 text-emerald-400"></i>
          <span>Direct Desk</span>
        </a>
      </div>'''

new_hero_btns = '''      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto hero-sub-element">
        <a href="#portfolio" class="w-full sm:w-auto btn-editorial-gold px-7 py-4 rounded-full text-xs font-display tracking-widest uppercase flex items-center justify-center gap-2 magnetic-target">
          <span>Explore ExperienceWork</span>
          <i data-lucide="arrow-down-right" class="w-4 h-4"></i>
        </a>
        <button id="openShowreelBtn" class="w-full sm:w-auto px-6 py-4 rounded-full text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 border border-white/20 bg-white/[0.04] text-white hover:bg-white/10 hover:border-white/40 transition-all magnetic-target">
          <i data-lucide="play" class="w-3.5 h-3.5 text-amber-300 fill-amber-300"></i>
          <span>Watch 2026 Reel</span>
        </button>
        <a href="https://wa.me/917022019101?text=Hi%20MIG%20Events,%20I%20would%20like%20to%20inquire%20about%20event%20production." target="_blank" class="w-full sm:w-auto btn-editorial-outline px-6 py-4 rounded-full text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 magnetic-target">
          <i data-lucide="message-circle" class="w-4 h-4 text-emerald-400"></i>
          <span>Direct Desk</span>
        </a>
      </div>'''

c = c.replace(old_hero_btns.replace('\n', '\r\n'), new_hero_btns)
c = c.replace(old_hero_btns, new_hero_btns)

# Add showreel modal before </body>
modal_html = '''
  <!-- =========================================================================
       12. CINEMATIC VIDEO SHOWREEL MODAL
       ========================================================================= -->
  <div id="videoShowreelModal" class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8 opacity-0 pointer-events-none transition-opacity duration-300">
    <div class="relative w-full max-w-5xl aspect-video bg-pitch rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
      <button id="closeShowreelBtn" class="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-black/90 transition-all">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>
      <iframe id="showreelIframe" class="w-full h-full" src="" title="MIG Events Production Showreel" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>
'''

if 'id="videoShowreelModal"' not in c:
    c = c.replace('</body>', modal_html + '\n</body>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated index.html with showreel modal!')
