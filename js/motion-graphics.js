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
      // Jitter.video Inspired Kinetic Motion Engine
      // 1. "Rotating Cards" 3D Isometric Pivot & Drop (Capabilities & Portfolio)
      // 2. "Stacked Cards" Deck Fan-Out & Retract (Testimonials)
      // 3. Specular Light Beam Sheen Tracking
      // =========================================================================
      const isMobile = window.innerWidth <= 768;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.utils.toArray('.motion-card-wrapper, .jitter-stack-card').forEach((card) => {
          gsap.fromTo(card,
            { opacity: 0 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: card,
                start: 'top 95%',
                end: 'top 65%',
                scrub: 0.6
              }
            }
          );
        });
      } else {
        const slideOffsetX = isMobile ? 65 : 180;
        const slideOffsetY = isMobile ? 65 : 150;

        // 1. Jitter Rotating & Drop Ingress (Capabilities, Portfolio, Partners)
        gsap.utils.toArray('.motion-card-wrapper').forEach((card) => {
          let initX = 0;
          let initY = 0;
          let initRotX = 0;
          let initRotY = 0;
          let initRotZ = 0;
          let initScale = 0.90;

          if (card.classList.contains('motion-fall-top') || card.classList.contains('jitter-drop-top')) {
            // Jitter Overhead Rig Drop with 3D Forward Pitch
            initY = -slideOffsetY;
            initRotX = isMobile ? 10 : 24;
            initScale = 0.92;
          } else if (card.classList.contains('motion-rise-bottom') || card.classList.contains('jitter-rise-center')) {
            // Jitter Stage Lift Rise with 3D Backward Pitch
            initY = slideOffsetY;
            initRotX = isMobile ? -8 : -18;
            initScale = 0.90;
          } else if (card.classList.contains('motion-slide-left') || card.classList.contains('jitter-rotate-left')) {
            // Jitter Left 3D Isometric Pivot
            initX = -slideOffsetX;
            initY = isMobile ? 0 : 35;
            initRotY = isMobile ? -6 : -22;
            initRotX = isMobile ? 3 : 8;
            initRotZ = isMobile ? 0 : -2;
          } else if (card.classList.contains('motion-slide-right') || card.classList.contains('jitter-rotate-right')) {
            // Jitter Right 3D Isometric Pivot
            initX = slideOffsetX;
            initY = isMobile ? 0 : 35;
            initRotY = isMobile ? 6 : 22;
            initRotX = isMobile ? -3 : -8;
            initRotZ = isMobile ? 0 : 2;
          } else {
            initX = -slideOffsetX;
            initRotY = -12;
          }

          gsap.fromTo(card,
            {
              x: initX,
              y: initY,
              rotateX: initRotX,
              rotateY: initRotY,
              rotateZ: initRotZ,
              scale: initScale,
              opacity: 0,
              transformPerspective: 1400
            },
            {
              x: 0,
              y: 0,
              rotateX: 0,
              rotateY: 0,
              rotateZ: 0,
              scale: 1,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 96%',
                end: 'top 60%',
                scrub: 0.75,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  const innerSheen = card.querySelector('.jitter-sheen');
                  if (innerSheen) {
                    if (self.progress > 0.6) {
                      innerSheen.style.backgroundPosition = '-100% 0';
                    } else {
                      innerSheen.style.backgroundPosition = '200% 0';
                    }
                  }
                }
              }
            }
          );
        });

        // 2. Jitter "Stacked Cards" Deck Fan-Out (Testimonial Reviews)
        const reviewsSection = document.getElementById('reviews');
        if (reviewsSection) {
          const stackCards = reviewsSection.querySelectorAll('.jitter-stack-card');
          if (stackCards.length === 3 && !isMobile) {
            // Left Card: fans out to the left
            gsap.fromTo(stackCards[0],
              {
                x: 105,
                y: 15,
                rotation: -6,
                scale: 0.94,
                opacity: 0
              },
              {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: reviewsSection,
                  start: 'top 92%',
                  end: 'top 55%',
                  scrub: 0.8,
                  invalidateOnRefresh: true
                }
              }
            );

            // Center Card: elevates and scales up
            gsap.fromTo(stackCards[1],
              {
                y: 30,
                scale: 0.90,
                opacity: 0
              },
              {
                y: 0,
                scale: 1,
                opacity: 1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: reviewsSection,
                  start: 'top 92%',
                  end: 'top 55%',
                  scrub: 0.8,
                  invalidateOnRefresh: true
                }
              }
            );

            // Right Card: fans out to the right
            gsap.fromTo(stackCards[2],
              {
                x: -105,
                y: 15,
                rotation: 6,
                scale: 0.94,
                opacity: 0
              },
              {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: reviewsSection,
                  start: 'top 92%',
                  end: 'top 55%',
                  scrub: 0.8,
                  invalidateOnRefresh: true
                }
              }
            );
          } else if (isMobile && stackCards.length > 0) {
            stackCards.forEach((card) => {
              gsap.fromTo(card,
                { y: 50, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  scrollTrigger: {
                    trigger: card,
                    start: 'top 95%',
                    end: 'top 70%',
                    scrub: 0.6
                  }
                }
              );
            });
          }
        }
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


  // =========================================================================
  // 7. Webflow Scroll Snap Kinetic Section Engine (Reverse Engineered System)
  // =========================================================================
  const snapSection = document.getElementById('scrollSnapShowcase');
  if (snapSection && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    const layer2 = snapSection.querySelector('.layer-2');
    const layer3 = snapSection.querySelector('.layer-3');
    const layer4 = snapSection.querySelector('.layer-4');
    const headerRail = snapSection.querySelector('.snap-header-rail');
    const brandRail = snapSection.querySelector('.snap-brand-rail');
    const subRail = snapSection.querySelector('.snap-sub-rail');
    const progressFill = snapSection.querySelector('.snap-progress-fill');
    const counter = snapSection.querySelector('.snap-counter');
    const navBtns = snapSection.querySelectorAll('.snap-nav-btn');

    // 4 chapters: 0.0, 0.3333, 0.6666, 1.0
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: snapSection,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        snap: {
          snapTo: [0, 0.3333, 0.6666, 1],
          duration: { min: 0.25, max: 0.6 },
          delay: 0.05,
          ease: 'power2.inOut'
        },
        onUpdate: (self) => {
          const p = self.progress;
          if (progressFill) {
            progressFill.style.width = `${Math.min(100, Math.max(25, 25 + p * 75))}%`;
          }

          let activeIdx = 0;
          if (p >= 0.83) activeIdx = 3;
          else if (p >= 0.5) activeIdx = 2;
          else if (p >= 0.17) activeIdx = 1;

          if (counter) {
            counter.textContent = `0${activeIdx + 1} / 04`;
          }

          navBtns.forEach((btn, i) => {
            if (i === activeIdx) {
              btn.classList.add('active');
            } else {
              btn.classList.remove('active');
            }
          });
        }
      }
    });

    // 1. Kinetic Typography Elevator Rail:
    // Header rail has 4 words stacked. -100% of single word height * 3 = -75% of container height.
    tl.to(headerRail, { yPercent: -75, ease: 'none', duration: 1 }, 0);

    // 2. Brand Rail & Sub Rail:
    tl.to(brandRail, { yPercent: -75, ease: 'none', duration: 1 }, 0);
    tl.to(subRail, { yPercent: -75, ease: 'none', duration: 1 }, 0);

    // 3. Sliding Background Layers (The exact Webflow timeline math!):
    // From 0 to 0.3333: Layer 2 slides up from 100% to 0%
    tl.fromTo(layer2, 
      { yPercent: 100 }, 
      { yPercent: 0, ease: 'power1.inOut', duration: 0.3333 }, 
      0
    );

    // From 0.3333 to 0.6666: Layer 3 slides up from 100% to 0%
    tl.fromTo(layer3, 
      { yPercent: 100 }, 
      { yPercent: 0, ease: 'power1.inOut', duration: 0.3333 }, 
      0.3333
    );

    // From 0.6666 to 1.0000: Layer 4 slides up from 100% to 0%
    tl.fromTo(layer4, 
      { yPercent: 100 }, 
      { yPercent: 0, ease: 'power1.inOut', duration: 0.3334 }, 
      0.6666
    );

    // Click on nav pills to scroll to snap point
    navBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(btn.getAttribute('data-snap-idx'), 10);
        const st = tl.scrollTrigger;
        if (st) {
          const targetScroll = st.start + (st.end - st.start) * (idx / 3);
          window.scrollTo({
            top: targetScroll + 2,
            behavior: 'smooth'
          });
        }
      });
    });
  }

})();
