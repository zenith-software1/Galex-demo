(function () {
  'use strict';

  const INTRO_MIN_MS = 2200;
  const INTRO_MAX_MS = 5500;

  const introEl = document.getElementById('intro');
  const introMedia = document.getElementById('introMedia');
  const skipBtn = document.getElementById('introSkip');

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  async function assetExists(url) {
    try {
      const r = await fetch(url, { method: 'HEAD', cache: 'no-store' });
      return r.ok;
    } catch {
      return false;
    }
  }

  async function resolveIntroMedia() {
    if (await assetExists('intro.webm')) return { kind: 'video', src: 'intro.webm', type: 'video/webm' };
    if (await assetExists('intro.mp4')) return { kind: 'video', src: 'intro.mp4', type: 'video/mp4' };
    if (await assetExists('intro-poster.jpg')) return { kind: 'image', src: 'intro-poster.jpg' };
    if (await assetExists('intro.jpg')) return { kind: 'image', src: 'intro.jpg' };
    return { kind: 'image', src: 'images/hero-md.jpg' };
  }

  function finishIntro() {
    if (!introEl || introEl.classList.contains('is-done')) return;
    introEl.classList.add('is-done');
    document.body.classList.remove('is-locked');
    sessionStorage.setItem('galexx_intro_seen', '1');
  }

  async function runIntro() {
    if (!introEl) return;
    if (prefersReducedMotion() || sessionStorage.getItem('galexx_intro_seen')) {
      finishIntro();
      return;
    }

    document.body.classList.add('is-locked');
    const media = await resolveIntroMedia();
    let doneTimer;

    const scheduleDone = (ms) => {
      clearTimeout(doneTimer);
      doneTimer = setTimeout(finishIntro, ms);
    };

    if (media.kind === 'video' && introMedia) {
      const video = document.createElement('video');
      video.className = 'intro__media';
      video.src = media.src;
      video.type = media.type;
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.setAttribute('playsinline', '');
      introMedia.replaceWith(video);
      video.addEventListener('ended', () => scheduleDone(400));
      video.addEventListener('error', () => scheduleDone(INTRO_MIN_MS));
      video.play().catch(() => scheduleDone(INTRO_MIN_MS));
      scheduleDone(INTRO_MAX_MS);
    } else if (introMedia) {
      introMedia.src = media.src;
      introMedia.alt = '';
      scheduleDone(INTRO_MIN_MS);
    } else {
      scheduleDone(INTRO_MIN_MS);
    }

    skipBtn?.addEventListener('click', finishIntro);
  }

  function initLazyImages() {
    document.querySelectorAll('img[data-src]').forEach((img) => {
      const wrap = img.closest('.img-wrap');
      const load = () => {
        const src = img.getAttribute('data-src');
        if (!src) return;
        img.onload = () => {
          img.classList.add('is-loaded');
          wrap?.classList.remove('is-loading');
        };
        img.onerror = () => wrap?.classList.remove('is-loading');
        img.src = src;
        img.removeAttribute('data-src');
      };
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                load();
                io.unobserve(img);
              }
            });
          },
          { rootMargin: '120px' }
        );
        io.observe(img);
      } else {
        load();
      }
    });
  }

  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
  }

  function initNav() {
    const nav = document.querySelector('.nav');
    const links = document.querySelector('.nav__links');
    const burger = document.querySelector('.nav__burger');

    window.addEventListener(
      'scroll',
      () => nav?.classList.toggle('is-scrolled', window.scrollY > 40),
      { passive: true }
    );

    burger?.addEventListener('click', () => links?.classList.toggle('is-open'));

    document.querySelectorAll('.nav__links a').forEach((a) => {
      a.addEventListener('click', () => links?.classList.remove('is-open'));
    });
  }

  function initLookbookDrag() {
    const track = document.querySelector('.lookbook__track');
    if (!track) return;
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
      track.style.cursor = 'grabbing';
    });
    track.addEventListener('mouseleave', () => {
      isDown = false;
      track.style.cursor = '';
    });
    track.addEventListener('mouseup', () => {
      isDown = false;
      track.style.cursor = '';
    });
    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = scrollLeft - (x - startX) * 1.2;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    runIntro();
    initLazyImages();
    initReveal();
    initNav();
    initLookbookDrag();
  });
})();
