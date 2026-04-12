/* ══════════════════════════════════════════════════
   GlobalVisa · Country Page Shared JavaScript
   ══════════════════════════════════════════════════ */

/* ── Pathway Tab Switching ── */
function showPath(btn, id) {
  document.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.pathway-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(id).classList.add('active');
}

function switchPath(btn, id) {
  document.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.pathway-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('path-' + id).classList.add('active');
}

/* ── FAQ Accordion ── */
function toggleFaq(el) {
  const item = el.closest('.faq-item');
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

/* ── Shared Navigation ── */
(function() {
  const nav = document.getElementById('main-nav');
  if (nav) {
    nav.innerHTML =
      '<a class="nav-back" href="index.html">\u2190 \u9996\u9875</a>' +
      '<div class="nav-logo">\u5168\u7403\u79fb\u6c11<span>\u00b7</span>\u653f\u7b56\u5927\u5168</div>' +
      '<div class="nav-updated"><div class="live-dot"></div>\u6570\u636e\u5df2\u540c\u6b65 \u00b7 2026\u5e744\u6708</div>';
  }
})();

/* ── Shared Page Footer ── */
(function() {
  const footer = document.getElementById('main-footer');
  if (footer) {
    footer.innerHTML =
      '<div class="pf-inner">' +
        '<div class="pf-disclaimer">\u514d\u8d23\u58f0\u660e\uff1a\u672c\u7ad9\u4fe1\u606f\u4ec5\u4f9b\u53c2\u8003\uff0c\u4e0d\u6784\u6210\u4efb\u4f55\u6cd5\u5f8b\u6216\u79fb\u6c11\u5efa\u8bae\u3002\u5177\u4f53\u653f\u7b56\u8bf7\u4ee5\u5404\u56fd\u5b98\u65b9\u79fb\u6c11\u5c40\u6700\u65b0\u516c\u5e03\u4e3a\u51c6\u3002</div>' +
        '<div class="pf-links">' +
          '<a href="index.html">\u9996\u9875</a>' +
          '<a href="membership.html">\u4f1a\u5458</a>' +
        '</div>' +
      '</div>';
  }
})();

/* ── Sticky Nav Scroll Spy ── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.snav-item');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
  navItems.forEach(n => { n.classList.toggle('active', n.getAttribute('href') === '#' + current); });
});
