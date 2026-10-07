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

  // Install-guide modal (Add to Home Screen per OS)
  var INSTALL = {
    android: {
      title: 'Add to Home screen on Android',
      img: 'assets/install-android.webp',
      alt: 'Chrome menu with Add to Home screen highlighted',
      steps: [
        'Open <a href="https://app.getotterlyme.com" target="_blank" rel="noopener">app.getotterlyme.com</a> in Chrome.',
        'Tap the <strong>⋮</strong> menu in the top-right corner.',
        'Tap <strong>“Add to Home screen.”</strong>',
        'Tap <strong>“Add”</strong> to confirm — the Otterly Me! icon lands on your home screen. 📱'
      ]
    },
    ios: {
      title: 'Add to Home Screen on iPhone',
      img: 'assets/install-ios.webp',
      alt: 'Safari share sheet with Add to Home Screen highlighted',
      steps: [
        'Open <a href="https://app.getotterlyme.com" target="_blank" rel="noopener">app.getotterlyme.com</a> in Safari.',
        'Tap the <strong>Share</strong> button (the square with an arrow pointing up).',
        'Scroll down and tap <strong>“Add to Home Screen.”</strong>',
        'Tap <strong>“Add”</strong> in the top-right — the Otterly Me! icon lands on your home screen. 📱'
      ]
    }
  };
  var installModal = document.getElementById('install-modal');
  var installTitle = document.getElementById('install-title');
  var installImg = document.getElementById('install-img');
  var installSteps = document.getElementById('install-steps');

  document.querySelectorAll('.install-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var os = INSTALL[btn.getAttribute('data-os')];
      if (!os) return;
      installTitle.textContent = os.title;
      installImg.src = os.img;
      installImg.alt = os.alt;
      installSteps.innerHTML = os.steps.map(function (s) { return '<li>' + s + '</li>'; }).join('');
      installModal.classList.add('open');
      installModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeInstall() {
    installModal.classList.remove('open');
    installModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  installModal.addEventListener('click', function (e) {
    if (e.target === installModal || e.target.classList.contains('install-close')) closeInstall();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeInstall();
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
