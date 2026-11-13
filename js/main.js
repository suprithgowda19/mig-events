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
  // 5. "Blueprint to Spectacle" Case Study Dossier Modal (TAIT Towers Benchmark)
  // =========================================================================
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxTag = document.getElementById('lightboxTag');
  const lightboxClose = document.getElementById('lightboxClose');
  const caseModalFootfall = document.getElementById('caseModalFootfall');
  const caseModalVenue = document.getElementById('caseModalVenue');
  const caseBlueprintTruss = document.getElementById('caseBlueprintTruss');
  const caseBlueprintAudio = document.getElementById('caseBlueprintAudio');
  const caseBlueprintPower = document.getElementById('caseBlueprintPower');
  const caseBlueprintVideo = document.getElementById('caseBlueprintVideo');
  const caseTabSpectacle = document.getElementById('caseTabSpectacle');
  const caseTabBlueprint = document.getElementById('caseTabBlueprint');
  const caseViewSpectacle = document.getElementById('caseViewSpectacle');
  const caseViewBlueprint = document.getElementById('caseViewBlueprint');
  const caseModalCta = document.getElementById('caseModalCta');

  // Tab switching inside case study modal
  if (caseTabSpectacle && caseTabBlueprint && caseViewSpectacle && caseViewBlueprint) {
    caseTabSpectacle.addEventListener('click', () => {
      caseViewSpectacle.classList.remove('hidden');
      caseViewBlueprint.classList.add('hidden');
      caseTabSpectacle.className = 'px-3 py-1 rounded-full bg-white text-black font-bold uppercase transition-all';
      caseTabBlueprint.className = 'px-3 py-1 rounded-full text-stone-300 hover:text-white uppercase transition-all';
      if (window.MIGAudio) window.MIGAudio.playClickTick(750);
    });

    caseTabBlueprint.addEventListener('click', () => {
      caseViewBlueprint.classList.remove('hidden');
      caseViewSpectacle.classList.add('hidden');
      caseTabBlueprint.className = 'px-3 py-1 rounded-full bg-white text-black font-bold uppercase transition-all';
      caseTabSpectacle.className = 'px-3 py-1 rounded-full text-stone-300 hover:text-white uppercase transition-all';
      if (window.MIGAudio) window.MIGAudio.playClickTick(900);
    });
  }

  // Open Case Study on card click or trigger
  document.querySelectorAll('.open-lightbox, .gallery-card').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const card = trigger.classList.contains('gallery-card') ? trigger : trigger.closest('.gallery-card');
      if (!card || !lightbox) return;

      const imgSrc = card.getAttribute('data-img') || '';
      const title = card.getAttribute('data-title') || 'Production Spectacle';
      const category = card.getAttribute('data-category') || 'CONCERTS';
      const footfall = card.getAttribute('data-footfall') || '10,000+ ATTENDEES';
      const venue = card.getAttribute('data-venue') || 'Bangalore Palace Grounds';
      const truss = card.getAttribute('data-truss') || '40m Clear-Span Eurotruss Rigging Grid (12.5T Payload)';
      const audio = card.getAttribute('data-audio') || '120dB SPL L-Acoustics K2 Array with Cardioid KS28 Subs';
      const power = card.getAttribute('data-power') || '250 kVA Synchronized Dual-Generator Grid';
      const video = card.getAttribute('data-video') || 'Curved 1.9mm MicroLED 4K Video Canvas';

      if (lightboxImg) lightboxImg.src = imgSrc;
      if (lightboxTitle) lightboxTitle.innerText = title;
      if (lightboxTag) lightboxTag.innerText = category.toUpperCase();
      if (caseModalFootfall) caseModalFootfall.innerText = footfall;
      if (caseModalVenue) caseModalVenue.innerText = venue;
      if (caseBlueprintTruss) caseBlueprintTruss.innerText = truss;
      if (caseBlueprintAudio) caseBlueprintAudio.innerText = audio;
      if (caseBlueprintPower) caseBlueprintPower.innerText = power;
      if (caseBlueprintVideo) caseBlueprintVideo.innerText = video;

      // Reset to spectacle view on open
      if (caseTabSpectacle) caseTabSpectacle.click();

      lightbox.classList.remove('opacity-0', 'pointer-events-none');
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';

      if (window.MIGAudio) window.MIGAudio.playClickTick(600);
    });
  });

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.add('opacity-0', 'pointer-events-none');
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

  if (caseModalCta) {
    caseModalCta.addEventListener('click', () => {
      closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
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

  // WhatsApp Technical Blueprint Transmitter
  const wizardForm = document.getElementById('wizardForm');
  if (wizardForm) {
    wizardForm.addEventListener('submit', (e) => {
      e.preventDefault();
      wizardData.name = document.getElementById('wizName').value;
      wizardData.phone = document.getElementById('wizPhone').value;
      wizardData.city = document.getElementById('wizCity').value || 'Bangalore / Pan-India';
      wizardData.date = document.getElementById('wizDate').value || 'Immediate Production Scope';

      // Gather checked technical infrastructure needs
      const checkedBoxes = Array.from(document.querySelectorAll('input[name="tech_need"]:checked'));
      const techRequirements = checkedBoxes.map(cb => cb.value);
      const techText = techRequirements.length > 0 
        ? techRequirements.map(t => `%0A   • ${encodeURIComponent(t)}`).join('')
        : '%0A   • Turnkey Technical Rigging & Production';

      const spec = wizardData.calculatedSpec || {
        truss: '160m Eurotruss Grid',
        power: '250 kVA Synchronized',
        audio: '122dB K2 + KS28 Subs',
        time: '36h Build / 8h Out'
      };

      const waMessage = `*MIG PRODUCTION BLUEPRINT SPECIFICATION*%0A` +
        `-----------------------------------------%0A` +
        `👤 *Technical Director / Contact:* ${encodeURIComponent(wizardData.name)}%0A` +
        `📞 *Direct Line:* ${encodeURIComponent(wizardData.phone)}%0A` +
        `📍 *Location / Venue:* ${encodeURIComponent(wizardData.city)}%0A` +
        `📅 *Production Date:* ${encodeURIComponent(wizardData.date)}%0A` +
        `🎯 *Production Scope:* ${encodeURIComponent(wizardData.type)}%0A` +
        `👥 *Audience Scale:* ${encodeURIComponent(wizardData.scale)}%0A%0A` +
        `⚙️ *REQUIRED INFRASTRUCTURE:*${techText}%0A` +
        `-----------------------------------------%0A` +
        `📐 *CALCULATED RIGGING FEASIBILITY:*%0A` +
        `   • Truss Grid: ${encodeURIComponent(spec.truss)}%0A` +
        `   • Power Draw: ${encodeURIComponent(spec.power)}%0A` +
        `   • Audio Coverage: ${encodeURIComponent(spec.audio)}%0A` +
        `   • Setup Window: ${encodeURIComponent(spec.time)}%0A` +
        `-----------------------------------------%0A` +
        `_Transmitted via MIG Events & Productions Operations Desk._`;

      const whatsappURL = `https://wa.me/916366225477?text=${waMessage}`;
      
      if (window.MIGAudio) window.MIGAudio.playClickTick(900);

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


  // =========================================================================
  // 10. GOLD STANDARD: HERO WORD-SPLIT REVEAL
  // =========================================================================
  setTimeout(() => {
    const heroH1 = document.getElementById('heroHeadline');
    if (heroH1) {
      heroH1.classList.add('hero-revealed');
    }
  }, 350);

  // =========================================================================
  // 11. GOLD STANDARD: grandMA3 DMX LIVE DESK SLIDERS
  // =========================================================================
  const faderHaze = document.getElementById('dmxFaderHaze');
  const faderSpread = document.getElementById('dmxFaderSpread');
  const faderLux = document.getElementById('dmxFaderLux');
  const faderSPL = document.getElementById('dmxFaderSPL');
  const resetDmxBtn = document.getElementById('resetDmxBtn');

  const valHaze = document.getElementById('valDmxHaze');
  const valSpread = document.getElementById('valDmxSpread');
  const valLux = document.getElementById('valDmxLux');
  const valSPL = document.getElementById('valDmxSPL');

  if (faderHaze && valHaze) {
    faderHaze.addEventListener('input', (e) => {
      valHaze.textContent = `${e.target.value}%`;
      if (window.MIGAudio) window.MIGAudio.playClickTick(600 + parseInt(e.target.value) * 4);
      if (window.MIGStageControl) window.MIGStageControl.setHaze(parseInt(e.target.value));
    });
  }

  if (faderSpread && valSpread) {
    faderSpread.addEventListener('input', (e) => {
      valSpread.textContent = `${e.target.value}°`;
      if (window.MIGAudio) window.MIGAudio.playClickTick(700 + parseInt(e.target.value) * 5);
      if (window.MIGStageControl) window.MIGStageControl.setSpread(parseInt(e.target.value));
    });
  }

  if (faderLux && valLux) {
    faderLux.addEventListener('input', (e) => {
      valLux.textContent = `${e.target.value}%`;
      if (window.MIGAudio) window.MIGAudio.playClickTick(800 + parseInt(e.target.value) * 3);
      if (window.MIGStageControl) window.MIGStageControl.setLux(parseInt(e.target.value));
    });
  }

  if (faderSPL && valSPL) {
    faderSPL.addEventListener('input', (e) => {
      valSPL.textContent = `${e.target.value}dB`;
      if (window.MIGAudio) window.MIGAudio.playClickTick(400 + parseInt(e.target.value) * 6);
      // Accelerate frequency spectrum bars on page
      document.querySelectorAll('.s-bar').forEach(b => {
        const speed = Math.max(0.2, 1.2 - (parseInt(e.target.value) - 80) / 60);
        b.style.animationDuration = `${speed}s`;
      });
    });
  }

  if (resetDmxBtn) {
    resetDmxBtn.addEventListener('click', () => {
      if (faderHaze) { faderHaze.value = 50; valHaze.textContent = '50%'; }
      if (faderSpread) { faderSpread.value = 35; valSpread.textContent = '35°'; }
      if (faderLux) { faderLux.value = 85; valLux.textContent = '85%'; }
      if (faderSPL) { faderSPL.value = 115; valSPL.textContent = '115dB'; }
      if (window.MIGAudio) window.MIGAudio.playClickTick(950);
      if (window.MIGStageControl) {
        window.MIGStageControl.setHaze(50);
        window.MIGStageControl.setSpread(35);
        window.MIGStageControl.setLux(85);
      }
    });
  }

  // =========================================================================
  // 12. GOLD STANDARD: DYNAMIC RIGGING FEASIBILITY HUD CALCULATOR
  // =========================================================================
  const feasibilityMatrix = {
    'corporate': {
      'small': { truss: '40m Architectural Truss', power: '65 kVA Silent Mains', audio: '74dB Speech-Calibrated', time: '12h Build / 4h Out' },
      'medium': { truss: '80m Eurotruss Box Rig', power: '125 kVA Synchronized', audio: '82dB Keynote Array', time: '18h Build / 6h Out' },
      'large': { truss: '140m Clear-Span Rigging', power: '180 kVA Dual-Grid', audio: '96dB Arena Relay Array', time: '28h Build / 8h Out' },
      'massive': { truss: '220m Stadium Truss Grid', power: '250 kVA Twin Industrial', audio: '108dB Multi-Zone System', time: '40h Build / 10h Out' }
    },
    'wedding': {
      'small': { truss: 'Custom Mandap Box Truss', power: '50 kVA Regulated Unit', audio: '80dB Acoustic Harmonics', time: '16h Build / 6h Out' },
      'medium': { truss: 'Thematic Glasshouse Frame', power: '125 kVA Dedicated Unit', audio: '88dB Sangeet Array', time: '24h Build / 8h Out' },
      'large': { truss: '40m Palace Clear-Span Rig', power: '180 kVA Synchronized', audio: '98dB Concert Stage Rig', time: '36h Build / 10h Out' },
      'massive': { truss: 'German Hangar Luxury Dome', power: '250 kVA Industrial Grid', audio: '110dB Royal Sangeet Rig', time: '48h Build / 12h Out' }
    },
    'concert': {
      'small': { truss: '60m Heavy Stage Truss', power: '125 kVA Clean Supply', audio: '105dB Club Tour Array', time: '18h Build / 6h Out' },
      'medium': { truss: '100m Arena Box Grid (8T)', power: '180 kVA Dual Generator', audio: '115dB L-Acoustics Rig', time: '26h Build / 8h Out' },
      'large': { truss: '160m Eurotruss Grid (14T)', power: '250 kVA Synchronized', audio: '122dB K2 + KS28 Subs', time: '36h Build / 8h Out' },
      'massive': { truss: '280m Stadium Cyber-Hoist', power: '350 kVA Multi-Phase Grid', audio: '128dB Arena Line-Array', time: '48h Build / 12h Out' }
    },
    'celebrity': {
      'small': { truss: 'Red Carpet Studio Truss', power: '45 kVA Low-Noise', audio: 'Direct Broadcast Feed', time: '10h Build / 4h Out' },
      'medium': { truss: 'Studio Soundstage Grid', power: '100 kVA Mobile Unit', audio: 'Multi-Zone Media Audio', time: '16h Build / 6h Out' },
      'large': { truss: 'Curved VIP Media Pavilion', power: '160 kVA Regulated Grid', audio: 'Broadcast Live Matrix', time: '24h Build / 8h Out' },
      'massive': { truss: 'Stadium VIP Compound Rig', power: '220 kVA Industrial Unit', audio: 'Arena Media Relay', time: '36h Build / 10h Out' }
    }
  };

  function updateFeasibilityHUD() {
    const scopeTag = document.getElementById('hudLiveScopeTag');
    const trussVal = document.getElementById('hudTrussVal');
    const powerVal = document.getElementById('hudPowerVal');
    const audioVal = document.getElementById('hudAudioVal');
    const timeVal = document.getElementById('hudTimeVal');

    if (!scopeTag || !trussVal) return;

    let typeKey = 'concert';
    const typeStr = (wizardData.type || '').toLowerCase();
    if (typeStr.includes('corporate') || typeStr.includes('summit')) typeKey = 'corporate';
    else if (typeStr.includes('wedding')) typeKey = 'wedding';
    else if (typeStr.includes('celebrity') || typeStr.includes('ad film')) typeKey = 'celebrity';

    let scaleKey = 'large';
    const scaleStr = (wizardData.scale || '').toLowerCase();
    if (scaleStr.includes('under 100') || scaleStr.includes('intimate')) scaleKey = 'small';
    else if (scaleStr.includes('100 - 500') || scaleStr.includes('medium')) scaleKey = 'medium';
    else if (scaleStr.includes('500 - 2,000') || scaleStr.includes('large')) scaleKey = 'large';
    else if (scaleStr.includes('2,000') || scaleStr.includes('mega') || scaleStr.includes('arena')) scaleKey = 'massive';

    const spec = (feasibilityMatrix[typeKey] && feasibilityMatrix[typeKey][scaleKey]) 
      ? feasibilityMatrix[typeKey][scaleKey] 
      : feasibilityMatrix['concert']['large'];

    scopeTag.textContent = `SCOPE: ${typeKey.toUpperCase()} // ${scaleKey.toUpperCase()}`;
    trussVal.textContent = spec.truss;
    powerVal.textContent = spec.power;
    audioVal.textContent = spec.audio;
    timeVal.textContent = spec.time;

    // Store in wizardData for WhatsApp compile
    wizardData.calculatedSpec = spec;
  }

  // Hook HUD into wizard button clicks
  document.querySelectorAll('.wizard-type-btn, .wizard-scale-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(updateFeasibilityHUD, 50);
    });
  });

})();