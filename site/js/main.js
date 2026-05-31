/* =========================================================
   Tru Wash — main.js
   Mobile nav drawer, scroll-reveal, count-up, form, smooth-scroll.
   ========================================================= */

(function(){
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- nav: scrolled state ----------
  const nav = document.querySelector('.nav');
  const setNavState = () => {
    if (!nav) return;
    if (window.scrollY > 30) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  setNavState();
  window.addEventListener('scroll', setNavState, { passive: true });

  // ---------- nav: mobile drawer ----------
  const toggle = document.querySelector('.nav-toggle');
  const closeDrawer = () => {
    if (!nav) return;
    nav.classList.remove('open');
    document.body.classList.remove('nav-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  };
  const openDrawer = () => {
    if (!nav) return;
    nav.classList.add('open');
    document.body.classList.add('nav-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
  };
  if (toggle) {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      if (nav.classList.contains('open')) closeDrawer();
      else openDrawer();
    });
  }
  // close on link tap
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => closeDrawer());
  });
  // close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav && nav.classList.contains('open')) closeDrawer();
  });
  // close on resize above breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) closeDrawer();
  });

  // ---------- smooth scroll with nav offset ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = nav ? nav.offsetHeight : 0;
      const y = target.getBoundingClientRect().top + window.scrollY - navH - 12;
      window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
    });
  });

  // ---------- scroll-reveal with 3-layer fallback ----------
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // Fallback 1: within 600ms, reveal anything already in or near viewport
  setTimeout(() => {
    revealEls.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 2) el.classList.add('is-visible');
    });
  }, 600);

  // Fallback 2: force-reveal everything at 3s (no section can stay invisible)
  setTimeout(() => {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }, 3000);

  // ---------- count-up stats ----------
  const numberEls = document.querySelectorAll('[data-count]');
  const setFinal = (el) => {
    const target = parseInt(el.dataset.count, 10);
    el.textContent = isNaN(target) ? el.dataset.count : target.toLocaleString();
    el.dataset.done = '1';
  };
  const animateCount = (el) => {
    if (el.dataset.done) return;
    const target = parseInt(el.dataset.count, 10);
    if (isNaN(target)) { setFinal(el); return; }
    const duration = 1100;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if (t < 1) requestAnimationFrame(step);
      else setFinal(el);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && !reduced) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    numberEls.forEach(el => cio.observe(el));
  } else {
    numberEls.forEach(el => setFinal(el));
  }
  // 2s settle fallback so no counter is stuck blank
  setTimeout(() => {
    numberEls.forEach(el => { if (!el.dataset.done) setFinal(el); });
  }, 2000);

  // ---------- scroll-driven hero (canvas frame sequence) ----------
  // Reads frames from data-frame-pattern on .hero-scroll. Falls back to a
  // static poster image on mobile / reduced motion (set via CSS background).
  (function setupScrollHero(){
    const scroller = document.querySelector('.hero-scroll');
    if (!scroller) return;

    const canvas = scroller.querySelector('.hero-canvas');
    const poster = scroller.dataset.poster;

    // Always set the poster as the canvas background so something paints
    // immediately, before frames are ready (or for mobile / reduced motion).
    if (canvas && poster) {
      canvas.style.setProperty('--hero-poster', `url('${poster}')`);
    }

    // Skip frame-driven behavior on mobile or when user prefers reduced motion.
    const isMobile = window.matchMedia('(max-width: 720px)').matches;
    if (reduced || isMobile || !canvas) return;

    const totalFrames = parseInt(scroller.dataset.frames, 10) || 0;
    const pattern = scroller.dataset.framePattern;
    if (!totalFrames || !pattern) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    const frames = new Array(totalFrames);
    let loaded = 0;
    let firstReady = false;
    let lastDrawn = -1;
    let targetFrame = 0;
    let rafId = null;

    function sizeCanvas(){
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (firstReady) drawFrame(lastDrawn >= 0 ? lastDrawn : 0, true);
    }

    function drawFrame(idx, force){
      if (!force && idx === lastDrawn) return;
      const img = frames[idx] || frames[0];
      if (!img || !img.complete || !img.naturalWidth) return;
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;
      ctx.fillStyle = '#06202c';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
      lastDrawn = idx;
    }

    function tick(){
      rafId = null;
      drawFrame(targetFrame);
    }

    function requestDraw(){
      if (rafId == null) rafId = requestAnimationFrame(tick);
    }

    function pad4(n){ return String(n).padStart(4, '0'); }

    function preload(){
      // Start by loading frame 1 + last + a sparse first pass for fast paint,
      // then fill in the rest in order.
      const order = [];
      // 1) first frame priority
      order.push(0);
      // 2) every 10th frame for quick rough preview
      for (let i = 10; i < totalFrames; i += 10) order.push(i);
      // 3) the rest
      for (let i = 1; i < totalFrames; i++) {
        if (i % 10 !== 0) order.push(i);
      }

      let cursor = 0;
      const CONCURRENT = 6;
      function next(){
        while (cursor < order.length) {
          const idx = order[cursor++];
          if (frames[idx]) continue;
          const img = new Image();
          img.decoding = 'async';
          img.onload = () => {
            loaded++;
            if (!firstReady) {
              firstReady = true;
              drawFrame(0, true);
            }
            requestDraw();
            next();
          };
          img.onerror = () => { loaded++; next(); };
          img.src = pattern.replace('{n}', pad4(idx + 1));
          frames[idx] = img;
          return;
        }
      }
      for (let k = 0; k < CONCURRENT; k++) next();
    }

    function updateTargetFromScroll(){
      const rect = scroller.getBoundingClientRect();
      const totalScroll = scroller.offsetHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      // progress = how far we've scrolled past the top of the .hero-scroll
      const progress = Math.min(Math.max(-rect.top / totalScroll, 0), 1);
      const idx = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
      if (idx !== targetFrame) {
        targetFrame = idx;
        requestDraw();
      }
    }

    sizeCanvas();
    preload();

    window.addEventListener('scroll', updateTargetFromScroll, { passive: true });
    window.addEventListener('resize', () => {
      sizeCanvas();
      updateTargetFromScroll();
    });
    updateTargetFromScroll();
  })();

  // ---------- quote form ----------
  const form = document.querySelector('#quote-form');
  const status = document.querySelector('#form-status');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const phone = (data.get('phone') || '').toString().trim();
      const service = (data.get('service') || '').toString();
      const message = (data.get('message') || '').toString().trim();

      if (!name || !phone) {
        if (status) {
          status.style.color = '#f0a022';
          status.textContent = 'Please add your name and phone so Tory can get back to you.';
        }
        return;
      }

      // Until the client wires up a real endpoint, open the user's mail client.
      // Replace this with a Formspree / Netlify Forms endpoint when ready.
      const subject = encodeURIComponent(`Quote request from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nPhone: ${phone}\nService: ${service || 'Not specified'}\n\n${message || '(no message)'}\n`
      );
      window.location.href = `mailto:hello@truwashhouma.com?subject=${subject}&body=${body}`;

      if (status) {
        status.style.color = '#5BAE3E';
        status.textContent = "Thanks. Your mail app should be opening. If it doesn't, call Tory directly at (985) 856-7396.";
      }
      form.reset();
    });
  }

})();
