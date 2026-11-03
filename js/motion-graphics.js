/**
 * MIG EVENTS & PRODUCTIONS - ADVANCED MOTION GRAPHICS & TACTILE 3D CARD ENGINE
 * Open-Source Motion Patterns:
 * 1. Lenis Smooth Momentum Inertia Scroll (Darkroom Engineering)
 * 2. GSAP ScrollTrigger Orchestrated Staggers & Parallax Depth
 * 3. 3D Perspective Tilt & Surface Sheen Tracking (Linear / Vercel Pattern)
 * 4. Image Depth Micro-Parallax in Portfolio Cards
 * 5. Volumetric Stage Moving-Head Concert Light Beams (Canvas 2D)
 */

(function () {
  'use strict';

  const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

  // =========================================================================
  // 1. Lenis Smooth Momentum Scroll Integration
  // =========================================================================
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  // =========================================================================
  // 2. Interactive 3D Perspective Tilt & Card Surface Sheen Tracking
  // =========================================================================
  if (!isMobile) {
    const tiltCards = document.querySelectorAll('.editorial-card, .gallery-card');

    tiltCards.forEach((card) => {
      let isHovered = false;
      let targetRotX = 0;
      let targetRotY = 0;
      let currentRotX = 0;
      let currentRotY = 0;
      let targetPanX = 0;
      let targetPanY = 0;
      let currentPanX = 0;
      let currentPanY = 0;
      let animFrameId = null;

      const innerImg = card.querySelector('img');

      function updateTilt() {
        currentRotX += (targetRotX - currentRotX) * 0.12;
        currentRotY += (targetRotY - currentRotY) * 0.12;
        currentPanX += (targetPanX - currentPanX) * 0.12;
        currentPanY += (targetPanY - currentPanY) * 0.12;

        if (isHovered) {
          card.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translate3d(0, -6px, 0)`;
          if (innerImg) {
            innerImg.style.transform = `scale(1.06) translate3d(${currentPanX.toFixed(1)}px, ${currentPanY.toFixed(1)}px, 0)`;
          }
          animFrameId = requestAnimationFrame(updateTilt);
        } else {
          if (Math.abs(currentRotX) > 0.05 || Math.abs(currentRotY) > 0.05) {
            card.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translate3d(0, 0, 0)`;
            if (innerImg) {
              innerImg.style.transform = `scale(1) translate3d(0, 0, 0)`;
            }
            animFrameId = requestAnimationFrame(updateTilt);
          } else {
            card.style.transform = '';
            if (innerImg) innerImg.style.transform = '';
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
          }
        }
      }

      card.addEventListener('mouseenter', () => {
        isHovered = true;
        if (!animFrameId) {
          animFrameId = requestAnimationFrame(updateTilt);
        }
      });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${mouseX.toFixed(1)}px`);
        card.style.setProperty('--mouse-y', `${mouseY.toFixed(1)}px`);

        const normX = (mouseX / rect.width) * 2 - 1;
        const normY = (mouseY / rect.height) * 2 - 1;

        targetRotX = -normY * 5.5;
        targetRotY = normX * 5.5;

        targetPanX = -normX * 8;
        targetPanY = -normY * 8;
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        targetRotX = 0;
        targetRotY = 0;
        targetPanX = 0;
        targetPanY = 0;
      });
    });
  }

  // =========================================================================
  // 3. Interactive Volumetric Stage Spotlights (Concert Moving-Heads)
  // =========================================================================
  const canvas = document.getElementById('stageBeamsCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    let mouse = { x: width * 0.5, y: height * 0.4, targetX: width * 0.5, targetY: height * 0.4 };
    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    });

    const dustCount = 35;
    const dustParticles = [];
    for (let i = 0; i < dustCount; i++) {
      dustParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        alpha: Math.random() * 0.35 + 0.1
      });
    }

    const spotlights = [
      { originX: 0.18, angle: 0.3, baseAngle: 0.35, speed: 0.008, color: 'rgba(212, 178, 140, ', maxAlpha: 0.12 },
      { originX: 0.50, angle: 0,   baseAngle: 0.0,  speed: 0.012, color: 'rgba(230, 215, 195, ', maxAlpha: 0.16, trackMouse: true },
      { originX: 0.82, angle: -0.3,baseAngle: -0.35,speed: 0.009, color: 'rgba(212, 178, 140, ', maxAlpha: 0.12 }
    ];

    let time = 0;

    function renderStageLighting() {
      ctx.clearRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      time += 0.02;

      spotlights.forEach((spot) => {
        const startX = width * spot.originX;
        const startY = -40;

        let targetX, targetY;

        if (spot.trackMouse) {
          targetX = mouse.x;
          targetY = mouse.y + 100;
        } else {
          const sweep = Math.sin(time * spot.speed * 80 + spot.originX * 10) * 0.25;
          const currentAngle = spot.baseAngle + sweep;
          targetX = startX + Math.sin(currentAngle) * (height * 1.2);
          targetY = startY + Math.cos(currentAngle) * (height * 1.2);
        }

        const beamSpread = width * 0.28;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(targetX - beamSpread, targetY);
        ctx.lineTo(targetX + beamSpread, targetY);
        ctx.closePath();

        const grad = ctx.createLinearGradient(startX, startY, targetX, targetY);
        grad.addColorStop(0, spot.color + (spot.maxAlpha * 1.5) + ')');
        grad.addColorStop(0.3, spot.color + spot.maxAlpha + ')');
        grad.addColorStop(0.8, spot.color + (spot.maxAlpha * 0.25) + ')');
        grad.addColorStop(1, spot.color + '0)');

        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(targetX - beamSpread * 0.3, targetY);
        ctx.lineTo(targetX + beamSpread * 0.3, targetY);
        ctx.closePath();
        const coreGrad = ctx.createLinearGradient(startX, startY, targetX, targetY);
        coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
        coreGrad.addColorStop(0.4, spot.color + (spot.maxAlpha * 0.5) + ')');
        coreGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = coreGrad;
        ctx.fill();

        ctx.restore();
      });

      // Render Stage Haze / Ambient Dust
      ctx.save();
      for (let i = 0; i < dustParticles.length; i++) {
        const p = dustParticles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(215, 195, 170, ${p.alpha})`;
        ctx.fill();
      }
      ctx.restore();

      requestAnimationFrame(renderStageLighting);
    }

    renderStageLighting();
  }

  // =========================================================================
  // 4. Magnetic Hover Physics for Interactive Buttons
  // =========================================================================
  const magneticEls = document.querySelectorAll('.magnetic-target');
  magneticEls.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate3d(0, 0, 0)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    el.addEventListener('mouseenter', () => {
      el.style.transition = 'none';
    });
  });

  // =========================================================================
  // 5. GSAP ScrollTrigger Staggered Card Entrances
  // =========================================================================
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Hero Kinetic Title Entrance
      gsap.from('.hero-headline-word', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power4.out',
        delay: 0.2
      });

      gsap.from('.hero-sub-element', {
        y: 40,
        opacity: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.6
      });

      // Animate Section Headings on Scroll
      gsap.utils.toArray('.gsap-reveal-title').forEach((title) => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 40,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out'
        });
      });

      // =========================================================================
      // Bidirectional Lateral Converging Card Motion Engine
      // Cards dynamically slide in from sides toward center as user scrolls down,
      // and cleanly reverse back outward & disappear when scrolling back up.
      // =========================================================================
      const isMobile = window.innerWidth <= 768;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const motionCards = gsap.utils.toArray('.motion-card-wrapper');

      if (prefersReducedMotion) {
        motionCards.forEach((card) => {
          gsap.fromTo(card,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      } else {
        const slideOffset = isMobile ? 50 : 135;

        motionCards.forEach((card) => {
          let initX = 0;
          let initY = 0;
          let initRotY = 0;
          let initScale = 0.94;

          if (card.classList.contains('motion-slide-left')) {
            initX = -slideOffset;
            initRotY = isMobile ? -3 : -7;
          } else if (card.classList.contains('motion-slide-right')) {
            initX = slideOffset;
            initRotY = isMobile ? 3 : 7;
          } else if (card.classList.contains('motion-slide-center')) {
            initY = isMobile ? 35 : 70;
            initScale = 0.90;
          } else {
            const siblings = Array.from(card.parentNode ? card.parentNode.children : []);
            const idx = siblings.indexOf(card);
            initX = (idx % 2 === 0) ? -slideOffset : slideOffset;
            initRotY = (idx % 2 === 0) ? -6 : 6;
          }

          gsap.fromTo(card,
            {
              x: initX,
              y: initY,
              rotateY: initRotY,
              scale: initScale,
              opacity: 0
            },
            {
              x: 0,
              y: 0,
              rotateY: 0,
              scale: 1,
              opacity: 1,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
                invalidateOnRefresh: true
              }
            }
          );
        });
      }
    }
  }

  // =========================================================================
  // 6. Minimal Stagecraft Audio Waveform Visualizer
  // =========================================================================
  const visualizerContainer = document.getElementById('audioVisualizer');
  if (visualizerContainer) {
    const barCount = 14;
    visualizerContainer.innerHTML = '';
    for (let i = 0; i < barCount; i++) {
      const bar = document.createElement('span');
      bar.className = 'w-[2px] bg-amber-200/80 rounded-full inline-block transition-all duration-150';
      bar.style.height = `${Math.floor(Math.random() * 12 + 4)}px`;
      visualizerContainer.appendChild(bar);
    }

    setInterval(() => {
      const bars = visualizerContainer.querySelectorAll('span');
      bars.forEach((bar) => {
        const h = Math.floor(Math.random() * 16 + 4);
        bar.style.height = `${h}px`;
      });
    }, 180);
  }

})();
