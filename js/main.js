/* ============================
   NAYU TECHNOLOGIES — MAIN JS
============================ */

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile menu ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');

function setMenuState(isOpen) {
  if (!mobileMenu) return;
  mobileMenu.classList.toggle('open', isOpen);
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  hamburger?.setAttribute('aria-expanded', String(isOpen));
}

function activateOnEnterOrSpace(el, handler) {
  el?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handler();
    }
  });
}

hamburger?.addEventListener('click', () => setMenuState(true));
mobileClose?.addEventListener('click', () => setMenuState(false));
activateOnEnterOrSpace(hamburger, () => setMenuState(true));
activateOnEnterOrSpace(mobileClose, () => setMenuState(false));
mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenuState(false)));

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Particle canvas ──
function initParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], nodes = [];

  function resize() {
    W = canvas.width  = canvas.parentElement.offsetWidth;
    H = canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); buildNodes(); });

  // Create neural-network style nodes
  function buildNodes() {
    nodes = [];
    const count = Math.min(Math.floor(W * H / 14000), 60);
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5
      });
    }
  }
  buildNodes();

  function drawNodes() {
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const maxDist = 130;
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.25;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 212, 255, 0.6)';
      ctx.fill();

      // Update
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    requestAnimationFrame(drawNodes);
  }
  drawNodes();
}

initParticles('particles-canvas');

// ── Typed text animation (slot width = longest phrase → no page shift) ──
const HERO_TYPED_PHRASES = [
  'Artificial Intelligence',
  'Automation at Scale',
  'Generative AI',
  'Digital Transformation',
  'Agentic Workflows'
];

function debounce(fn, ms) {
  let t;
  return () => {
    clearTimeout(t);
    t = setTimeout(fn, ms);
  };
}

function applyHeroTypedSlotWidth() {
  const inner = document.getElementById('typed-text');
  const slot = inner?.closest('.hero-typed-slot');
  if (!inner || !slot) return;

  const measure = document.createElement('span');
  const cs = window.getComputedStyle(inner);
  measure.style.cssText = [
    'position:absolute',
    'left:-99999px',
    'top:0',
    'visibility:hidden',
    'white-space:nowrap',
    `font-family:${cs.fontFamily}`,
    `font-size:${cs.fontSize}`,
    `font-weight:${cs.fontWeight}`,
    `letter-spacing:${cs.letterSpacing}`,
    `font-style:${cs.fontStyle}`
  ].join(';');
  document.body.appendChild(measure);

  let maxW = 0;
  HERO_TYPED_PHRASES.forEach((phrase) => {
    measure.textContent = phrase;
    maxW = Math.max(maxW, measure.getBoundingClientRect().width);
  });
  document.body.removeChild(measure);

  const line = slot.closest('.hero-typed-line');
  const cap = line ? line.getBoundingClientRect().width : Infinity;
  slot.style.minWidth = `${Math.min(Math.ceil(maxW) + 2, Math.floor(cap))}px`;
}

function typeWriter(element, texts, speed = 80) {
  if (!element) return;
  let textIndex = 0, charIndex = 0, deleting = false;

  function type() {
    const current = texts[textIndex];
    if (deleting) {
      element.textContent = current.substring(0, charIndex--);
      if (charIndex < 0) {
        deleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 400);
        return;
      }
    } else {
      element.textContent = current.substring(0, charIndex++);
      if (charIndex > current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    }
    setTimeout(type, deleting ? 40 : speed);
  }
  type();
}

applyHeroTypedSlotWidth();
window.addEventListener('resize', debounce(applyHeroTypedSlotWidth, 120));
window.addEventListener('load', applyHeroTypedSlotWidth);
document.fonts?.ready?.then(applyHeroTypedSlotWidth);

typeWriter(document.getElementById('typed-text'), HERO_TYPED_PHRASES);

// ── Counter animation ──
function animateCounter(el, target, duration = 1800) {
  let start = null;
  const step = (ts) => {
    if (!start) start = ts;
    const prog = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - prog, 3);
    el.textContent = (target.includes('+') || target.includes('%'))
      ? Math.floor(parseFloat(target) * eased) + target.replace(/[0-9.]/g, '')
      : Math.floor(parseFloat(target) * eased);
    if (prog < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        animateCounter(el, el.getAttribute('data-count'));
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(el => counterObserver.observe(el));

// ── Sector tabs ──
document.querySelectorAll('.sector-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.sector-item').forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.sector-detail-content').forEach(d => d.classList.remove('active'));
    item.classList.add('active');
    const target = item.getAttribute('data-sector');
    document.getElementById('sector-' + target)?.classList.add('active');
  });
});

// ── Smooth anchor scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    let target = null;
    try {
      target = document.querySelector(href);
    } catch {
      return;
    }
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
