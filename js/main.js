'use strict';

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

const readingProgress = document.querySelector('.reading-progress span');
if (readingProgress) {
  let progressFrame = 0;
  const updateReadingProgress = () => {
    if (progressFrame) return;
    progressFrame = requestAnimationFrame(() => {
      progressFrame = 0;
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      readingProgress.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    });
  };

  window.addEventListener('scroll', updateReadingProgress, { passive: true });
  window.addEventListener('resize', updateReadingProgress);
  updateReadingProgress();
}

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

/* Infrastructure network: highlight a node's paths on hover, focus, or tap. */
const network = document.querySelector('[data-net]');
if (network) {
  const nodeButtons = [...network.querySelectorAll('[data-node]')];
  const linked = [...network.querySelectorAll('[data-link]')];
  const detail = document.querySelector('#net-detail');
  const summary = detail ? detail.textContent.trim() : '';
  let activeNode = null;

  const setActive = (id) => {
    if (id === activeNode) return;
    activeNode = id;
    network.classList.toggle('has-active', Boolean(id));
    nodeButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.node === id)));
    linked.forEach((el) => el.classList.toggle('is-lit', Boolean(id) && el.dataset.link.split(' ').includes(id)));
    if (detail) detail.textContent = id ? nodeButtons.find((b) => b.dataset.node === id).dataset.detail : summary;
  };

  nodeButtons.forEach((button) => {
    button.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'mouse') setActive(button.dataset.node);
    });
    button.addEventListener('focus', () => setActive(button.dataset.node));
    button.addEventListener('click', () => setActive(button.dataset.node));
  });

  network.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'mouse' && !network.contains(document.activeElement)) setActive(null);
  });
  network.addEventListener('focusout', (event) => {
    if (!network.contains(event.relatedTarget)) setActive(null);
  });
  document.addEventListener('pointerdown', (event) => {
    if (activeNode && !network.contains(event.target)) setActive(null);
  });
  network.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setActive(null);
  });

  // Subtle depth: cards drift with the pointer, the dot grid drifts the other way (wide layout, fine pointers only).
  const parallax = window.matchMedia('(min-width: 1101px) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  let frame = 0;
  network.addEventListener('pointermove', (event) => {
    if (!parallax.matches || frame) return;
    const { clientX, clientY } = event;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const box = network.getBoundingClientRect();
      network.style.setProperty('--px', (((clientX - box.left) / box.width) * 2 - 1).toFixed(3));
      network.style.setProperty('--py', (((clientY - box.top) / box.height) * 2 - 1).toFixed(3));
    });
  });
  network.addEventListener('pointerleave', () => {
    network.style.setProperty('--px', '0');
    network.style.setProperty('--py', '0');
  });

  // Signals are SMIL animations; pause them while the hero is off screen.
  const svgs = [...network.querySelectorAll('svg')];
  if ('IntersectionObserver' in window && svgs.every((svg) => svg.pauseAnimations)) {
    new IntersectionObserver(([entry]) => {
      svgs.forEach((svg) => (entry.isIntersecting ? svg.unpauseAnimations() : svg.pauseAnimations()));
      // A signal paused before its first frame sits at the SVG origin; keep it hidden until it runs.
      network.classList.toggle('is-paused', !entry.isIntersecting);
    }).observe(network);
  }
}

const themeToggle = document.querySelector('.theme-toggle');
const themePreferenceKey = 'portfolio-theme';
const systemTheme = window.matchMedia('(prefers-color-scheme: light)');

function getSavedTheme() {
  try {
    const saved = localStorage.getItem(themePreferenceKey);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null;
  }
}

function setTheme(theme, { persist = false } = {}) {
  document.documentElement.dataset.theme = theme;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = theme === 'light' ? '#f4f6fc' : '#0b1020';
  if (themeToggle) {
    const nextMode = theme === 'dark' ? 'light' : 'dark';
    themeToggle.setAttribute('aria-label', `Switch to ${nextMode} mode`);
    themeToggle.title = `Switch to ${nextMode} mode`;
  }
  if (persist) {
    try {
      localStorage.setItem(themePreferenceKey, theme);
    } catch {}
  }
}

if (themeToggle) {
  setTheme(document.documentElement.dataset.theme || (systemTheme.matches ? 'light' : 'dark'));
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme, { persist: true });
  });

  systemTheme.addEventListener('change', (event) => {
    if (!getSavedTheme()) setTheme(event.matches ? 'light' : 'dark');
  });

  window.addEventListener('storage', (event) => {
    if (event.key !== themePreferenceKey) return;
    const theme = event.newValue === 'light' || event.newValue === 'dark'
      ? event.newValue
      : systemTheme.matches ? 'light' : 'dark';
    setTheme(theme);
  });
}
