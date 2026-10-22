/* =========================================================================
   Raamwerk Digitale Assistent — presentatie logic
   Swiper (swipe/keys/wheel) + tsParticles (background) + GSAP (reveals).
   ========================================================================= */
'use strict';
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP = typeof window.gsap !== 'undefined';

  /* ---- particle background (interactive constellation) ----------------- */
  if (!reduce && window.tsParticles) {
    tsParticles.load({
      id: 'particles',
      options: {
        fpsLimit: 60,
        fullScreen: { enable: false },
        background: { color: 'transparent' },
        particles: {
          number: { value: 75, density: { enable: true, area: 900 } },
          color: { value: ['#3fe9d4', '#9d8cff', '#f0c574', '#5fe08a', '#ff9bfc'] },
          links: { enable: true, color: '#6675b8', distance: 150, opacity: 0.22, width: 1 },
          move: { enable: true, speed: 0.6, direction: 'none', outModes: { default: 'bounce' } },
          opacity: { value: { min: 0.25, max: 0.7 } },
          size: { value: { min: 1, max: 2.6 } }
        },
        interactivity: {
          detectsOn: 'window',
          events: { onHover: { enable: true, mode: 'grab' }, resize: true },
          modes: { grab: { distance: 170, links: { opacity: 0.5 } } }
        },
        detectRetina: true
      }
    });
  }

  /* ---- helpers --------------------------------------------------------- */
  function revealSlide(slide) {
    var els = slide.querySelectorAll('[data-reveal]');
    if (reduce || !hasGSAP) { els.forEach(function (e) { e.style.opacity = 1; }); return; }
    gsap.fromTo(els,
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08, overwrite: true });
  }
  function runCounters(slide) {
    slide.querySelectorAll('[data-count]').forEach(function (el) {
      var end = +el.getAttribute('data-count');
      if (reduce || !hasGSAP) { el.textContent = end; return; }
      var o = { v: 0 };
      gsap.to(o, { v: end, duration: 1.15, ease: 'power2.out', onUpdate: function () { el.textContent = Math.round(o.v); } });
    });
  }
  function loadFrames(slide) {
    slide.querySelectorAll('iframe[data-src]').forEach(function (f) {
      f.src = f.getAttribute('data-src'); f.removeAttribute('data-src');
    });
  }

  var progress = document.getElementById('progress');
  var curEl = document.getElementById('cur');

  function onSlide(sw) {
    var i = sw.activeIndex, n = sw.slides.length, slide = sw.slides[i];
    progress.style.width = (n > 1 ? (i / (n - 1)) * 100 : 0) + '%';
    curEl.textContent = i + 1;
    // sync the fixed chrome accent (progress, bullets, brand) to this slide
    var acc = slide.style.getPropertyValue('--accent');
    if (acc) document.documentElement.style.setProperty('--accent', acc);
    revealSlide(slide);
    loadFrames(slide);
    // pre-warm the next slide's iframe so the demo/graph is ready when reached
    if (sw.slides[i + 1]) loadFrames(sw.slides[i + 1]);
    if (slide.querySelector('[data-count]')) runCounters(slide);
  }

  /* ---- swiper ---------------------------------------------------------- */
  var startAt = 0;
  try { startAt = parseInt(new URLSearchParams(location.search).get('slide'), 10) || 0; } catch (e) {}

  var swiper = new Swiper('.swiper', {
    initialSlide: startAt,
    speed: 650,
    grabCursor: true,
    keyboard: { enabled: true, onlyInViewport: false },
    mousewheel: { forceToAxis: true, thresholdDelta: 12 },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.nav-next', prevEl: '.nav-prev' },
    on: { init: onSlide, slideChange: onSlide }
  });

  document.getElementById('tot').textContent = swiper.slides.length;
})();
