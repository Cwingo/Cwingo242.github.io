/*  NAV TOGGLE  */
const btn = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
const backdrop = document.getElementById('nav-backdrop');

function openNav() {
  nav.classList.add('open');
  backdrop.classList.add('show');
  btn.setAttribute('aria-expanded', 'true');
  document.documentElement.classList.add('no-scroll');
}

function closeNav() {
  nav.classList.remove('open');
  backdrop.classList.remove('show');
  btn.setAttribute('aria-expanded', 'false');
  document.documentElement.classList.remove('no-scroll');
}

function toggleNav() {
  nav.classList.contains('open') ? closeNav() : openNav();
}

if (btn && nav && backdrop) {
  btn.addEventListener('click', toggleNav);
  backdrop.addEventListener('click', closeNav);
  nav.addEventListener('click', e => { if (e.target.tagName === 'A') closeNav(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
  const mql = window.matchMedia('(min-width: 721px)');
  mql.addEventListener('change', e => { if (e.matches) closeNav(); });
}
/* gallery */
document.querySelectorAll('[data-gallery]').forEach(gal => {
    const track = gal.querySelector('[data-track]');
    const slides = Array.from(track.children);
    const prev = gal.querySelector('.prev');
    const next = gal.querySelector('.next');
    let i = 0;
  
    function update() { track.style.transform = `translateX(${-i*100}%)`; }
  
    slides.forEach(s => s.style.flex = '0 0 100%');
    update();
  
    next.addEventListener('click', () => { i = (i + 1) % slides.length; update(); });
    prev.addEventListener('click', () => { i = (i - 1 + slides.length) % slides.length; update(); });
  
    let startX = 0, deltaX = 0;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; deltaX = 0; }, {passive:true});
    track.addEventListener('touchmove',  e => { deltaX = e.touches[0].clientX - startX; }, {passive:true});
    track.addEventListener('touchend',   () => {
      if (Math.abs(deltaX) > 40) { i = deltaX < 0 ? (i + 1) % slides.length : (i - 1 + slides.length) % slides.length; update(); }
    });
  });
  