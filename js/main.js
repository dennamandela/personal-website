'use strict';

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

document.querySelectorAll('.tool-logo img').forEach((image) => {
  const hideUnavailableLogo = () => {
    image.parentElement.hidden = true;
  };

  image.addEventListener('error', hideUnavailableLogo, { once: true });
});

const toggle = document.querySelector('.rail-toggle');
const nav = document.querySelector('#rail-nav');
const navLinks = nav ? [...nav.querySelectorAll('a[href^="#"]')] : [];

function closeNavigation({ returnFocus = false } = {}) {
  if (!toggle || !nav) return;
  toggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
  if (returnFocus && toggle.getClientRects().length) toggle.focus({ preventScroll: true });
}

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a[href^="#"]')) closeNavigation({ returnFocus: true });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeNavigation({ returnFocus: true });
    }
  });
}

if ('IntersectionObserver' in window && navLinks.length) {
  const observed = navLinks
    .map((link) => [document.querySelector(link.hash), link])
    .filter(([section]) => section);

  const observer = new IntersectionObserver((entries) => {
    const current = entries.find((entry) => entry.isIntersecting);
    if (!current) return;
    navLinks.forEach((link) => {
      if (link.hash === `#${current.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-25% 0px -60% 0px' });

  observed.forEach(([section]) => observer.observe(section));
}

/* Reveal content once as it enters view; no per-item scroll listeners. */
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealTargets = document.querySelectorAll(
    '.manifesto-body, .stack-row, .career-entry, .log-entry, .principle-lines > li, .contact-top, .footer-bottom'
  );

  if (revealTargets.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });

    revealTargets.forEach((target) => {
      target.classList.add('scroll-reveal');
      revealObserver.observe(target);
    });
  }
}
