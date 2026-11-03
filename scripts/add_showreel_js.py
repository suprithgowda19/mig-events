with open('js/main.js', 'r', encoding='utf-8') as f:
    c = f.read()

showreel_code = '''
  // =========================================================================
  // 8. Cinematic Production Showreel Modal Player
  // =========================================================================
  const showreelModal = document.getElementById('videoShowreelModal');
  const openShowreelBtn = document.getElementById('openShowreelBtn');
  const closeShowreelBtn = document.getElementById('closeShowreelBtn');
  const showreelIframe = document.getElementById('showreelIframe');

  if (showreelModal && openShowreelBtn && closeShowreelBtn && showreelIframe) {
    function openShowreel() {
      showreelIframe.src = 'https://www.youtube-nocookie.com/embed/MLpWrANjFbI?autoplay=1&rel=0&modestbranding=1';
      showreelModal.classList.remove('opacity-0', 'pointer-events-none');
      document.body.style.overflow = 'hidden';
    }

    function closeShowreel() {
      showreelIframe.src = '';
      showreelModal.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    }

    openShowreelBtn.addEventListener('click', openShowreel);
    closeShowreelBtn.addEventListener('click', closeShowreel);
    showreelModal.addEventListener('click', (e) => {
      if (e.target === showreelModal) closeShowreel();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !showreelModal.classList.contains('pointer-events-none')) {
        closeShowreel();
      }
    });
  }
'''

if 'openShowreelBtn' not in c:
    c = c.replace('})();', showreel_code + '\n})();')

with open('js/main.js', 'w', encoding='utf-8') as f:
    f.write(c)

print('Updated js/main.js with showreel modal handlers!')
