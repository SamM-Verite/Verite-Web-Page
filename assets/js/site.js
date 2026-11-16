/* Vérité shared scripts. Progressive enhancement only: every page renders fully without this file. */
(function(){var y=document.getElementById('footer-year');if(y){y.textContent=new Date().getFullYear();}})();

// Reveal-on-scroll (progressive enhancement; content is visible if this doesn't run)
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reduce || !('IntersectionObserver' in window)) { els.forEach(function(e){e.classList.add('in')}); return; }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0, rootMargin: '0px 0px 10% 0px' });
  els.forEach(function(e){ io.observe(e); });
})();

// Mobile menu: the <details> disclosure works without JavaScript. This adds aria-expanded,
// Escape to close, and keeps keyboard focus inside the full-screen menu while it is open.
(function(){
  var menu = document.querySelector('details.menu');
  if (!menu) return;
  var toggle = menu.querySelector('summary');
  var wordmark = document.querySelector('.nav .wordmark');
  function sync(){
    var open = menu.open;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  function focusables(){
    var list = [toggle].concat(Array.prototype.slice.call(menu.querySelectorAll('.menu__panel a')));
    if (wordmark) list.unshift(wordmark);
    return list;
  }
  menu.addEventListener('toggle', sync);
  document.addEventListener('keydown', function(e){
    if (!menu.open) return;
    if (e.key === 'Escape') { menu.open = false; toggle.focus(); return; }
    if (e.key !== 'Tab') return;
    var f = focusables(), first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  sync();
})();
