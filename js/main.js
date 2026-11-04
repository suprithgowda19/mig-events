/**
 * MIG EVENTS & PRODUCTIONS - SCRIPT ENGINE
 * Fusing TemplateMo 612 Parallax Engine + Interactive Experiential UI
 */

(function () {
  'use strict';

  // --- Parallax Elements ---
  const parallaxBgs = document.querySelectorAll('.parallax-bg');
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const revealElements = document.querySelectorAll('.section-reveal');

  const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

  // =========================================================================
  // 1. TemplateMo 612 Smooth Parallax Engine (requestAnimationFrame)
  // =========================================================================
  let ticking = false;

  function updateParallax() {
    if (isMobile) {
      ticking = false;
      return;
    }

    const windowHeight = window.innerHeight;

    parallaxBgs.forEach((bg) => {
      const section = bg.parentElement;
      const rect = section.getBoundingClientRect();

      // Skip elements completely outside the viewport buffer
      if (rect.bottom < -200 || rect.top > windowHeight + 200) {
        return;
      }

      const speed = parseFloat(bg.getAttribute('data-speed')) || 0.4;
      const sectionCenterY = rect.top + rect.height / 2;
      const distFromCenter = sectionCenterY - windowHeight / 2;
      const travelRange = windowHeight * 0.15 * speed;
      const normalizedDist = Math.max(-1, Math.min(1, distFromCenter / (windowHeight / 2)));
      const offsetY = normalizedDist * travelRange;

      bg.style.transform = `translate3d(0, ${offsetY.toFixed(1)}px, 0)`;
    });

    ticking = false;
  }

  function onScroll() {
    // Navbar styling on scroll
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Schedule parallax update
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    updateParallax();
  });
  updateParallax();

  // =========================================================================
  // 2. Scroll Reveal Observer
  // =========================================================================
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // =========================================================================
  // 3. Animated Impact Stats Counters
  // =========================================================================
  const statsCounters = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsCounted) {
        statsCounted = true;
        statsCounters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const duration = 1800; // ms
          const stepTime = 20;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.innerText = target.toLocaleString();
              clearInterval(timer);
            } else {
              counter.innerText = Math.floor(current).toLocaleString();
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // =========================================================================
  // 4. "ExperienceWork" Portfolio Category Filter
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item-wrap, #galleryGrid > .gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-amber-500/20', 'border-amber-500', 'text-amber-400');
        b.classList.add('text-slate-400', 'border-white/10');
      });
      btn.classList.add('bg-amber-500/20', 'border-amber-500', 'text-amber-400');
      btn.classList.remove('text-slate-400', 'border-white/10');

      const category = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 30);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });

      if (typeof ScrollTrigger !== 'undefined') {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 280);
      }
    });
  });

  // =========================================================================
  // 5. Fullscreen Lightbox Modal
  // =========================================================================
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxTag = document.getElementById('lightboxTag');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.open-lightbox').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const card = trigger.closest('.gallery-card');
      const imgSrc = card.getAttribute('data-img');
      const title = card.getAttribute('data-title');
      const category = card.getAttribute('data-category');

      lightboxImg.src = imgSrc;
      lightboxTitle.innerText = title;
      lightboxTag.innerText = category.toUpperCase();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  // =========================================================================
  // 6. Interactive 3-Step Event Estimate Wizard
  // =========================================================================
  let wizardData = {
    type: 'Corporate Summit',
    scale: '100 - 500 Guests',
    date: '',
    city: '',
    name: '',
    phone: ''
  };

  // Step 1: Type Selection
  document.querySelectorAll('.wizard-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.wizard-type-btn').forEach(b => b.classList.remove('glass-panel-active', 'border-amber-500'));
      btn.classList.add('glass-panel-active', 'border-amber-500');
      wizardData.type = btn.getAttribute('data-value');
    });
  });

  // Step 2: Scale Selection
  document.querySelectorAll('.wizard-scale-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.wizard-scale-btn').forEach(b => b.classList.remove('glass-panel-active', 'border-amber-500'));
      btn.classList.add('glass-panel-active', 'border-amber-500');
      wizardData.scale = btn.getAttribute('data-value');
    });
  });

  // Step Navigation
  const step1 = document.getElementById('wizardStep1');
  const step2 = document.getElementById('wizardStep2');
  const step3 = document.getElementById('wizardStep3');
  const progress1 = document.getElementById('wizardProgress1');
  const progress2 = document.getElementById('wizardProgress2');
  const progress3 = document.getElementById('wizardProgress3');

  document.getElementById('toStep2').addEventListener('click', () => {
    step1.classList.add('hidden');
    step2.classList.remove('hidden');
    progress2.classList.add('bg-amber-400', 'text-slate-900');
  });

  document.getElementById('backToStep1').addEventListener('click', () => {
    step2.classList.add('hidden');
    step1.classList.remove('hidden');
    progress2.classList.remove('bg-amber-400', 'text-slate-900');
  });

  document.getElementById('toStep3').addEventListener('click', () => {
    step2.classList.add('hidden');
    step3.classList.remove('hidden');
    progress3.classList.add('bg-amber-400', 'text-slate-900');
  });

  document.getElementById('backToStep2').addEventListener('click', () => {
    step3.classList.add('hidden');
    step2.classList.remove('hidden');
    progress3.classList.remove('bg-amber-400', 'text-slate-900');
  });

  // WhatsApp / Final Submit
  const wizardForm = document.getElementById('wizardForm');
  if (wizardForm) {
    wizardForm.addEventListener('submit', (e) => {
      e.preventDefault();
      wizardData.name = document.getElementById('wizName').value;
      wizardData.phone = document.getElementById('wizPhone').value;
      wizardData.city = document.getElementById('wizCity').value || 'Bangalore / Destination';
      wizardData.date = document.getElementById('wizDate').value || 'To Be Finalized';

      const waMessage = `*New Event Production Inquiry - MIG Events*%0A%0A` +
        `👤 *Name:* ${encodeURIComponent(wizardData.name)}%0A` +
        `📞 *Phone:* ${encodeURIComponent(wizardData.phone)}%0A` +
        `🎯 *Event Type:* ${encodeURIComponent(wizardData.type)}%0A` +
        `👥 *Guest Scale:* ${encodeURIComponent(wizardData.scale)}%0A` +
        `📍 *City / Venue:* ${encodeURIComponent(wizardData.city)}%0A` +
        `📅 *Planned Date:* ${encodeURIComponent(wizardData.date)}%0A%0A` +
        `_Inquiry sent via MIG Events & Productions Digital Platform._`;

      const whatsappURL = `https://wa.me/916366225477?text=${waMessage}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappURL, '_blank');

      // Show confirmation message
      document.getElementById('wizardSuccessMsg').classList.remove('hidden');
      wizardForm.classList.add('hidden');
    });
  }

  // =========================================================================
  // 7. Mobile Navigation Toggle
  // =========================================================================
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }


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

})();
