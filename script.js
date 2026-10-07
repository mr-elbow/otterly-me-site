// Lightbox for the screenshot gallery + scroll-reveal animations
(function () {
  var lightbox = document.getElementById('lightbox');
  var lbImg = document.getElementById('lb-img');

  document.querySelectorAll('.shot').forEach(function (btn) {
    btn.addEventListener('click', function () {
      lbImg.src = btn.getAttribute('data-full');
      lbImg.alt = btn.querySelector('img').alt + ' (enlarged)';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function close() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target.classList.contains('lb-close')) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });

  // Reveal on scroll
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.card, .step, .shot, .faq details').forEach(function (el) {
    el.classList.add('reveal');
    io.observe(el);
  });
})();
