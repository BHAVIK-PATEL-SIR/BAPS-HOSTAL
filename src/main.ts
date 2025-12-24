

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// --- Mobile Menu Toggle (Priority) ---
const initMobileMenu = () => {
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileBtn && navLinks) {
    // Toggle Menu
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent bubbling
      navLinks.classList.toggle('active');

      // Animate Links
      if (navLinks.classList.contains('active')) {
        gsap.fromTo('.nav-links a',
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.1, duration: 0.4 }
        );
      }
    });

    // Close when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') &&
        !navLinks.contains(e.target as Node) &&
        !mobileBtn.contains(e.target as Node)) {
        navLinks.classList.remove('active');
      }
    });
  }
};

// Initialize immediately
initMobileMenu();

gsap.registerPlugin(ScrollTrigger)

// --- Custom Cursor ---
const cursor = document.getElementById('custom-cursor') || document.createElement('div');
if (!cursor.id) {
  cursor.id = 'custom-cursor';
  Object.assign(cursor.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '20px',
    height: '20px',
    border: '2px solid var(--c-gold)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: '10000',
    transform: 'translate(-50%, -50%)',
    transition: 'width 0.2s, height 0.2s',
    mixBlendMode: 'difference'
  });
  document.body.appendChild(cursor);
}

const cursorDot = document.createElement('div');
Object.assign(cursorDot.style, {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '6px',
  height: '6px',
  backgroundColor: 'var(--c-gold)',
  borderRadius: '50%',
  pointerEvents: 'none',
  zIndex: '10001',
  transform: 'translate(-50%, -50%)'
});
document.body.appendChild(cursorDot);

window.addEventListener('mousemove', (e) => {
  gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
  gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0, ease: 'power2.out' });
});

// Hover effects for cursor
document.querySelectorAll('a, button, .facility-card-3d, .gallery-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(cursor, { width: 50, height: 50, duration: 0.3 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(cursor, { width: 20, height: 20, duration: 0.3 });
  });
});

// --- Preloader ---
const tl = gsap.timeline();

if (document.querySelector('.loader-mandala')) {
  tl.from('.loader-mandala', {
    scale: 0.5,
    opacity: 0,
    duration: 1
  })
    .from('.loader-text', {
      opacity: 0,
      duration: 1,
    }, "-=0.5")
    .to('#preloader', {
      yPercent: -100,
      duration: 1.5,
      ease: 'power4.inOut',
      delay: 0.5
    });
}

// --- Home Page Animations (Safe Check) ---
if (document.querySelector('#hero')) {
  tl.from('.block-reveal', {
    y: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: 'power3.out'
  }, '-=1')
    .from('.hero-subtitle', {
      opacity: 0,
      y: 20,
      duration: 1
    }, '-=0.5')
    .from('.hero-btns', {
      opacity: 0,
      y: 20,
      duration: 1
    }, '-=0.8');

  gsap.to('.hero-bg', {
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    yPercent: 30,
    scale: 1
  });
}


// --- About / Inspiration Section Reveal ---
gsap.from('.about-text-col', {
  scrollTrigger: {
    trigger: '#inspiration',
    start: 'top 80%',
  },
  x: -50,
  opacity: 0,
  duration: 1.5,
  ease: 'power3.out'
});

gsap.from('.about-visual-col', {
  scrollTrigger: {
    trigger: '#inspiration',
    start: 'top 80%',
  },
  x: 50,
  opacity: 0,
  duration: 1.5,
  ease: 'power3.out',
  delay: 0.2
});

// --- Vision Cards Stagger ---
gsap.from('.vision-card', {
  scrollTrigger: {
    trigger: '.vision-grid',
    start: 'top 85%',
  },
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: 'power3.out'
});

// --- Facilities Stagger ---
gsap.from('.facility-card-3d', {
  scrollTrigger: {
    trigger: '.cards-perspective',
    start: 'top 85%',
  },
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.1,
  ease: 'power3.out'
});

// --- Horizontal Gallery ---
const galleryContainer = document.querySelector('#gallery-container') as HTMLElement;
const galleryTrack = document.querySelector('.gallery-track') as HTMLElement;

if (galleryContainer && galleryTrack) {
  gsap.to(galleryTrack, {
    x: () => -(galleryTrack.scrollWidth - document.documentElement.clientWidth) + 'px',
    ease: 'none',
    scrollTrigger: {
      trigger: '#gallery-container',
      pin: true,
      scrub: 1,
      end: () => '+=' + galleryTrack.scrollWidth,
    }
  });
}

// --- Mobile Menu Toggle ---
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn && navLinks) {
  mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Animate Links
    if (navLinks.classList.contains('active')) {
      gsap.fromTo('.nav-links a', { x: 50, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 0.4 });
    }
  });
}
