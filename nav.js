/* Mobile hamburger nav — shared across every page.
   Loaded with `defer`, so the DOM is ready when this runs. The CSS does the
   show/hide work (gated on html.js + ≤620px); this only toggles state and keeps
   the button's aria-expanded honest. Above 620px the menu CSS doesn't apply, so
   a lingering .open / aria-expanded is harmless. */
(function () {
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (!btn || !nav) return;

  function isOpen() { return nav.classList.contains('open'); }

  function open() {
    nav.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
  function close() {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', function () {
    if (isOpen()) close(); else open();
  });

  // Tap a link: let the navigation happen, but collapse the panel behind it.
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) close();
  });

  // Tap anywhere outside the header collapses the menu. Clicks on the button or
  // inside the panel live within .site-nav, so they're left alone here.
  document.addEventListener('click', function (e) {
    if (isOpen() && !e.target.closest('.site-nav')) close();
  });

  // Escape closes and returns focus to the button.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) {
      close();
      btn.focus();
    }
  });
})();
