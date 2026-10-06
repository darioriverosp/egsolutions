// EG SOLUTIONS — interacción del sitio (sin dependencias)
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var navToggle = document.querySelector('.nav-toggle');
  var backdrop = document.querySelector('.mega-backdrop');

  // Menú móvil
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(open));
      document.documentElement.style.overflow = open ? 'hidden' : '';
    });
  }

  // Mega menú "Servicios"
  var megaTrigger = document.querySelector('[data-mega-trigger]');
  var mega = document.querySelector('.mega');
  function closeMega() {
    if (!mega) return;
    mega.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    if (megaTrigger) megaTrigger.setAttribute('aria-expanded', 'false');
  }
  function toggleMega() {
    if (!mega) return;
    var open = mega.classList.toggle('is-open');
    if (backdrop) backdrop.classList.toggle('is-open', open);
    if (megaTrigger) megaTrigger.setAttribute('aria-expanded', String(open));
  }
  if (megaTrigger && mega) {
    megaTrigger.setAttribute('aria-expanded', 'false');
    megaTrigger.addEventListener('click', function (e) {
      e.preventDefault();
      toggleMega();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMega();
    });
    if (backdrop) backdrop.addEventListener('click', closeMega);
    document.addEventListener('click', function (e) {
      if (window.innerWidth <= 960) return; // en móvil el menú vive dentro del nav
      if (!mega.contains(e.target) && e.target !== megaTrigger && !megaTrigger.contains(e.target)) closeMega();
    });

    // Pestañas de categoría dentro del mega menú
    var cats = mega.querySelectorAll('.mega__cat');
    var panels = mega.querySelectorAll('.mega__panel');
    cats.forEach(function (cat) {
      cat.addEventListener('click', function () {
        cats.forEach(function (c) { c.classList.remove('is-active'); });
        panels.forEach(function (p) { p.classList.remove('is-active'); });
        cat.classList.add('is-active');
        var target = mega.querySelector('[data-panel="' + cat.dataset.cat + '"]');
        if (target) target.classList.add('is-active');
      });
    });
  }

  // Cerrar el menú móvil al navegar
  document.querySelectorAll('.nav__link:not([data-mega-trigger])').forEach(function (a) {
    a.addEventListener('click', function () {
      document.body.classList.remove('nav-open');
      document.documentElement.style.overflow = '';
    });
  });

  // Acordeón "¿Por qué somos…?"
  document.querySelectorAll('.why__q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.why__q').forEach(function (b) {
        b.setAttribute('aria-expanded', 'false');
        var p = document.getElementById(b.getAttribute('aria-controls'));
        if (p) p.hidden = true;
      });
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        if (panel) panel.hidden = false;
      }
    });
  });

  // Carruseles (fotos de servicio y tarjetas)
  document.querySelectorAll('[data-carousel]').forEach(function (root) {
    var track = root.querySelector('[data-track]');
    var slides = track ? Array.prototype.slice.call(track.children) : [];
    var dots = Array.prototype.slice.call(root.querySelectorAll('[data-dot]'));
    var prev = root.querySelector('[data-prev]');
    var next = root.querySelector('[data-next]');
    var perView = parseInt(root.dataset.perView || '1', 10);
    var index = 0;

    function maxIndex() { return Math.max(0, slides.length - perView); }
    function update() {
      if (!track) return;
      var slideWidth = slides[0] ? slides[0].getBoundingClientRect().width : 0;
      var gap = parseFloat(getComputedStyle(track).gap || '0');
      track.style.transform = 'translateX(-' + index * (slideWidth + gap) + 'px)';
      dots.forEach(function (d, i) { d.setAttribute('aria-current', String(i === index)); });
      if (prev) prev.disabled = index === 0;
      if (next) next.disabled = index >= maxIndex();
    }
    function go(i) { index = Math.max(0, Math.min(maxIndex(), i)); update(); }

    if (prev) prev.addEventListener('click', function () { go(index - 1); });
    if (next) next.addEventListener('click', function () { go(index + 1); });
    dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); }); });
    window.addEventListener('resize', update);
    if (slides.length) update();
  });

  // Formularios: envían por WhatsApp (no hay backend propio)
  var WHATSAPP_NUMBER = document.body.dataset.whatsapp || '';
  document.querySelectorAll('form[data-lead-form]').forEach(function (form) {
    var note = form.querySelector('.form__note');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var nombre = (data.get('nombre') || '').toString().trim();
      var correo = (data.get('correo') || '').toString().trim();
      var telefono = (data.get('telefono') || '').toString().trim();
      var mensaje = (data.get('mensaje') || '').toString().trim();
      if (!nombre || !telefono) {
        if (note) note.textContent = 'Por favor completa al menos tu nombre y teléfono.';
        return;
      }
      var text = 'Hola EG SOLUTIONS, soy ' + nombre + '.' +
        (telefono ? ' Mi teléfono: ' + telefono + '.' : '') +
        (correo ? ' Mi correo: ' + correo + '.' : '') +
        (mensaje ? ' ' + mensaje : '');
      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
      if (note) note.textContent = 'Abriendo WhatsApp…';
      window.open(url, '_blank', 'noopener');
      form.reset();
    });
  });

  // Animación de aparición al hacer scroll
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Sombra de cabecera al hacer scroll (sutil)
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }, { passive: true });
  }
})();
