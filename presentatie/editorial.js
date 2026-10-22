/* =========================================================================
   Raamwerk Digitale Assistent · presentatie (editorial versie)
   Swiper + GSAP only. Geen particles. Ingetogen bewegingen.
   ========================================================================= */
'use strict';
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // ?static=1 forces the final, motionless state (for PDF/screenshot export):
  // reveals visible, counters at their end value, no tweens.
  try { if (new URLSearchParams(location.search).get('static') !== null) reduce = true; } catch (e) {}
  var hasGSAP = typeof window.gsap !== 'undefined';

  var fill = document.getElementById('fill');
  var curEl = document.getElementById('cur');

  function revealSlide(slide) {
    var els = slide.querySelectorAll('[data-reveal]');
    if (reduce || !hasGSAP) { els.forEach(function (e) { e.style.opacity = 1; }); return; }
    gsap.fromTo(els, { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', stagger: 0.06, overwrite: true });
  }
  function runCounters(slide) {
    slide.querySelectorAll('[data-count]').forEach(function (el) {
      var end = +el.getAttribute('data-count');
      if (reduce || !hasGSAP) { el.textContent = end; return; }
      var o = { v: 0 };
      gsap.to(o, { v: end, duration: 1.0, ease: 'power2.out', onUpdate: function () { el.textContent = Math.round(o.v); } });
    });
  }
  function loadFrames(slide) {
    if (!slide) return;
    slide.querySelectorAll('iframe[data-src]').forEach(function (f) {
      f.src = f.getAttribute('data-src'); f.removeAttribute('data-src');
    });
  }

  // right-edge tick marks (thin lines, not bullets)
  var ticksWrap = document.getElementById('ticks');
  var ticks = [];

  function onSlide(sw) {
    var i = sw.activeIndex, n = sw.slides.length, slide = sw.slides[i];
    fill.style.width = (n > 1 ? (i / (n - 1)) * 100 : 0) + '%';
    curEl.textContent = i + 1;
    ticks.forEach(function (t, k) { t.classList.toggle('on', k === i); });
    revealSlide(slide);
    loadFrames(slide);
    loadFrames(sw.slides[i + 1]);
    if (slide.querySelector('[data-count]')) runCounters(slide);
  }

  var startAt = 0;
  try { startAt = parseInt(new URLSearchParams(location.search).get('slide'), 10) || 0; } catch (e) {}

  var swiper = new Swiper('.swiper', {
    initialSlide: startAt,
    speed: 600,
    grabCursor: true,
    keyboard: { enabled: true, onlyInViewport: false },
    mousewheel: { forceToAxis: true, thresholdDelta: 12 },
    navigation: { nextEl: '.nav-next', prevEl: '.nav-prev' },
    on: {
      init: function (sw) {
        document.getElementById('tot').textContent = sw.slides.length;
        for (var k = 0; k < sw.slides.length; k++) {
          var t = document.createElement('button');
          t.className = 't'; t.type = 'button'; t.setAttribute('aria-label', 'Ga naar slide ' + (k + 1));
          (function (idx) { t.addEventListener('click', function () { sw.slideTo(idx); }); })(k);
          ticksWrap.appendChild(t); ticks.push(t);
        }
        onSlide(sw);
      },
      slideChange: onSlide
    }
  });
})();
