// EG SOLUTIONS — generador estático del sitio.
// Lee src/data.mjs y escribe HTML en public/*.html, public/servicios/*.html, public/soluciones/*.html.
// Uso: node src/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { site, categories, services, homeCards, whyUs, projectCards, articles, testimonials } from './data.mjs';

const OUT = path.resolve('public');

// ── Helpers de texto ─────────────────────────────────────────
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
// Convierte el marcado ligero de data.mjs (**negrita**, {o}naranja{/o}, \n) a HTML.
function md(s) {
  if (!s) return '';
  let h = esc(s);
  h = h.replace(/\{o\}([\s\S]*?)\{\/o\}/g, '<span class="o">$1</span>');
  h = h.replace(/\*\*([\s\S]*?)\*\*/g, '<strong>$1</strong>');
  h = h.replace(/\n/g, '<br>');
  return h;
}
function plain(s) { return esc(s).replace(/\n/g, '<br>'); }
// Párrafos separados por doble salto de línea.
function paragraphs(s) {
  return s.split(/\n\n+/).map((p) => `<p>${md(p)}</p>`).join('');
}
function img(name, alt, attrs = '') {
  return `<img src="/assets/img/${name}" alt="${esc(alt || '')}" loading="lazy" decoding="async" ${attrs}>`;
}
function slugTitle(cat) { return categories.find((c) => c.slug === cat); }

// Enlace de WhatsApp con un saludo ya escrito (el usuario solo tiene que pulsar "Enviar").
function waLink(context) {
  const greeting = context
    ? `Hola EG SOLUTIONS, vengo de la página web y quisiera información sobre ${context}.`
    : 'Hola EG SOLUTIONS, vengo de la página web y quisiera más información sobre sus servicios.';
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(greeting)}`;
}

// ── Botones ─────────────────────────────────────────
function btn(label, href, variant = 'orange', extra = '') {
  return `<a class="btn btn--${variant} ${extra}" href="${href}">${esc(label)}</a>`;
}

// ── Cabecera / menú ─────────────────────────────────────────
function megaPanel(cat, i) {
  const subs = services.filter((s) => s.cat === cat.slug);
  const items = subs
    .map(
      (s, idx) =>
        `<li><a class="${idx === 0 ? 'is-featured' : ''}" href="/servicios/${s.slug}.html">${esc(s.title)}</a></li>`
    )
    .join('');
  return `<div class="mega__panel${i === 0 ? ' is-active' : ''}" data-panel="${cat.slug}">
    <img class="mega__icon" src="/assets/img/${cat.menuIcon}" alt="" aria-hidden="true">
    <ul class="mega__subs">${items}</ul>
    <p class="mega__q">${esc(cat.menuQuestion)}</p>
    ${btn(cat.menuBtn, `/servicios/${cat.slug}.html`, 'orange', 'btn--wide')}
  </div>`;
}
function megaMenu() {
  const cats = categories
    .map(
      (c, i) =>
        `<button type="button" class="mega__cat${i === 0 ? ' is-active' : ''}" data-cat="${c.slug}">
          <img src="/assets/img/${c.menuIcon}" alt="">${esc(c.menuName)}
        </button>`
    )
    .join('');
  const panels = categories.map(megaPanel).join('');
  return `<div class="mega" id="mega-servicios">
    <div class="mega__inner">
      <ul class="mega__cats">${cats}</ul>
      <div class="mega__line" aria-hidden="true"></div>
      ${panels}
    </div>
  </div>`;
}
function header(active) {
  const link = (key, label, href) =>
    `<a class="nav__link" href="${href}" ${active === key ? 'aria-current="page"' : ''}>${esc(label)}</a>`;
  return `<header class="site-header">
  <div class="site-header__inner">
    <a class="brand" href="/index.html" aria-label="${esc(site.name)} — inicio">
      ${img('logo.png', site.name, 'class="brand__logo"')}
      <span>
        <span class="brand__name">${esc(site.name)}</span>
        <span class="brand__tag">${esc(site.tagline)}</span>
      </span>
    </a>
    <button type="button" class="nav-toggle" aria-label="Abrir menú" aria-expanded="false"><span></span></button>
    <nav class="nav" aria-label="Principal">
      ${link('soluciones', 'Soluciones', '/soluciones.html')}
      <a class="nav__link" href="#" data-mega-trigger aria-haspopup="true" aria-controls="mega-servicios">
        Servicios ${img('ico-chevron-down.svg', '')}
      </a>
      ${link('nosotros', 'Nosotros', '/nosotros.html')}
      <a class="nav__cta" href="/contacto.html">Contacto</a>
    </nav>
  </div>
  ${megaMenu()}
</header>
<div class="mega-backdrop" data-mega-backdrop></div>`;
}

function footer() {
  const sedes = site.sedes
    .map(
      (s) => `<div class="sede">
        ${img('ico-marker.svg', '', 'class="sede__pin"')}
        <span class="sede__name">${esc(s.nombre)}</span>
        <span class="sede__addr">${plain(s.direccion)}</span>
        <span class="sede__tel">${img('ico-phone2.svg', '')} ${s.telefonos.map((t) => `<a href="tel:${t.replace(/[^\d+]/g, '')}">${t}</a>`).join(' / ')}</span>
      </div>`
    )
    .join('');
  const menuCols = categories
    .map((c) => `<li><a href="/servicios/${c.slug}.html">${esc(c.menuName)}</a></li>`)
    .join('');
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer__top">
      ${img('logo.png', site.name, 'class="brand__logo"')}
      <span>
        <span class="brand__name">${esc(site.name)}</span>
        <span class="brand__tag">${esc(site.tagline)}</span>
      </span>
      <div class="footer__social">
        <a href="${site.instagram}" target="_blank" rel="noopener">${esc(site.instagramHandle)}</a>
        ${img('ico-instagram.svg', 'Instagram')}
      </div>
    </div>
    <div class="footer__about">
      En <strong>${esc(site.legal)}</strong>, conjugamos todas las áreas de la ingeniería para ofrecerte un
      <strong>servicio integral sin fricciones.</strong> Desde el sector residencial hasta el industrial, trabajamos
      para garantizar la óptima operatividad de tus inmuebles con soluciones definitivas.
    </div>
    <div class="footer__cols">
      <div class="sedes">${sedes}</div>
      <ul class="footer__menu">
        <li><a href="/nosotros.html">Nosotros</a></li>
        <li><a href="/soluciones.html">Soluciones</a></li>
        <li><a href="/contacto.html">Contacto</a></li>
      </ul>
      <ul class="footer__svc">${menuCols}</ul>
    </div>
    <div class="footer__bottom">
      <span>egsolutions.net @ 2026. All rights reserved.</span>
      <span>Resources by WebbyFrames.</span>
    </div>
  </div>
</footer>
<a class="wa-float" href="${waLink()}" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp">
  <svg viewBox="0 0 32 32"><path d="M16 3C9 3 3.3 8.7 3.3 15.7c0 2.5.7 4.8 1.9 6.8L3 29l6.7-2.1c1.9 1 4.1 1.6 6.3 1.6 7 0 12.7-5.7 12.7-12.7S23 3 16 3zm0 23.1c-2 0-3.9-.5-5.6-1.5l-.4-.2-4 1.3 1.3-3.9-.3-.4a10.4 10.4 0 0 1-1.6-5.6C5.4 9.9 10.2 5.1 16 5.1S26.6 9.9 26.6 15.7 21.8 26.1 16 26.1zm5.8-7.7c-.3-.2-1.9-.9-2.1-1-.3-.1-.5-.2-.7.1-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.4z"/></svg>
</a>
<script src="/assets/js/main.js"></script>`;
}

// ── Esqueleto de página ─────────────────────────────────────────
function page({ title, description, active, bodyClass = '', body, bodyAttrs = '' }) {
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} · ${esc(site.name)}</title>
<meta name="description" content="${esc(description)}">
<link rel="icon" href="/assets/img/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Roboto:wght@400;500;700&family=Roboto+Slab:wght@700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body class="${bodyClass}" data-whatsapp="${site.whatsapp}" ${bodyAttrs}>
${header(active)}
<main>
${body}
</main>
${footer()}
</body>
</html>`;
}

// ── Piezas reutilizables ─────────────────────────────────────────
function heroSection({ bg, icon, title, subtitle, btnLabel, btnHref, btnVariant = 'white' }) {
  return `<section class="hero reveal">
  ${img(bg, '', 'class="hero__bg"')}
  <div class="hero__content">
    ${icon ? img(icon, '', 'class="hero__icon"') : ''}
    <h1 class="h-hero">${md(title)}</h1>
    ${subtitle ? `<p class="hero__sub">${md(subtitle)}</p>` : ''}
    ${btnLabel ? btn(btnLabel, btnHref, btnVariant) : ''}
  </div>
</section>`;
}

function iconsRow(light = false) {
  return `<div class="icons-row${light ? ' icons-row--light' : ''}">
    ${categories
      .map(
        (c) => `<a href="/servicios/${c.slug}.html">
          ${img(c.icon, c.name)}
          <span>${esc(c.name)}</span>
        </a>`
      )
      .join('')}
  </div>`;
}

function cardsGrid(items, { light = false, tall = false } = {}) {
  return `<div class="cards reveal">
    ${items
      .map(
        (c) => `<a class="card${light ? ' card--light' : ''}${tall ? ' card--tall' : ''}" href="/${c.href}">
          ${img(c.img, c.title, 'class="card__img"')}
          <div class="card__body">
            <p class="card__title">${plain(c.title)}</p>
            <p class="card__text">${esc(c.text)}</p>
          </div>
        </a>`
      )
      .join('')}
  </div>`;
}

function partnersStrip(title) {
  return `<section class="section section--gray reveal">
  <div class="container">
    <p class="partners__title">${esc(title)}</p>
    <div class="partners__row">
      ${['partner-1.svg', 'partner-2.svg', 'partner-3.svg', 'partner-4.svg', 'partner-5.svg'].map((p) => img(p, '')).join('')}
    </div>
  </div>
</section>`;
}

function testimonialsSection({ title, sub }) {
  return `<section class="section section--dark reveal">
  <div class="container">
    <div class="section__head">
      <h2 class="h-slab on-dark">${esc(title)}</h2>
      <p class="lead on-dark">${md(sub)}</p>
    </div>
    <div class="testimonials">
      ${testimonials
        .map(
          (t) => `<div class="quote">
            <div class="quote__head">
              ${img('avatar.png', '', 'class="avatar"')}
              <span class="quote__name">${esc(t.name)}</span>
            </div>
            ${img(t.stars, '5 estrellas', 'class="quote__stars"')}
            <p class="quote__text">${esc(t.text)}</p>
          </div>`
        )
        .join('')}
    </div>
  </div>
</section>`;
}

function ctaFormSection({ dark = true, title, text, btnLabel = 'Enviar' } = {}) {
  return `<section class="section ${dark ? 'section--dark' : ''} reveal">
    <div class="container contact-split">
      <div class="contact-split__text">
        <h2 class="h-slab ${dark ? 'on-dark' : ''}">${md(title)}</h2>
        <p class="body ${dark ? 'on-dark' : ''}">${md(text)}</p>
      </div>
      ${leadForm({ white: !dark, btnLabel })}
    </div>
  </section>`;
}

function leadForm({ white = true, btnLabel = 'Enviar' } = {}) {
  return `<form class="form ${white ? 'form--white' : ''}" data-lead-form novalidate>
    <label class="sr-only" for="f-nombre">Nombre y apellido</label>
    <input id="f-nombre" name="nombre" type="text" placeholder="Nombre y Apellido" autocomplete="name" required>
    <label class="sr-only" for="f-correo">Correo electrónico</label>
    <input id="f-correo" name="correo" type="email" placeholder="Correo Electrónico" autocomplete="email">
    <label class="sr-only" for="f-telefono">Número de teléfono</label>
    <input id="f-telefono" name="telefono" type="tel" placeholder="Número de teléfono" autocomplete="tel" required>
    <div class="form__msg">
      <label class="sr-only" for="f-mensaje">Cuéntanos sobre el servicio que necesitas</label>
      <textarea id="f-mensaje" name="mensaje" placeholder="Cuéntanos sobre el servicio que necesitas"></textarea>
      <button type="submit" class="btn btn--orange btn--small">${esc(btnLabel)}</button>
    </div>
    <p class="form__note" role="status" aria-live="polite"></p>
  </form>`;
}

function readySection() {
  return `<section class="section reveal">
    <div class="container ready">
      <div class="ready__text">
        <h2 class="h-section">¿Listo para llevar la gestión de tus inmuebles al siguiente nivel?</h2>
        <p class="body">Ya sea que necesites una evaluación técnica preventiva, la recuperación urgente de un sistema de fuerza o la ejecución de una obra civil, nuestro equipo de ingenieros está listo para atenderte. <strong>Contáctanos hoy y diseñemos una solución a la medida de tu infraestructura.</strong></p>
        <div class="sedes">
          ${site.sedes
            .map(
              (s) => `<div class="sede">
                ${img('ico-marker.svg', '', 'class="sede__pin"')}
                <span class="sede__name">${esc(s.nombre)}</span>
                <span class="sede__addr">${plain(s.direccion)}</span>
                <span class="sede__tel">${img('ico-phone.svg', '')} ${s.telefonos.join(' / ')}</span>
              </div>`
            )
            .join('')}
        </div>
        ${btn('Nuestro WhatsApp', waLink(), 'green')}
      </div>
      <a class="map" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.sedes[0].mapa)}" target="_blank" rel="noopener" aria-label="Ver ubicación en Google Maps">
        ${img('map.webp', 'Mapa de ubicación de EG SOLUTIONS')}
      </a>
    </div>
  </section>`;
}

function ctaPhotoSection() {
  return `<section class="cta-photo reveal">
    ${img('obras-strip1.webp', '', 'class="cta-photo__bg"')}
    <div class="container contact-split">
      <div class="contact-split__text">
        <h2 class="h-slab">Solicita una Inspección o Cotización</h2>
        <p class="body">Un especialista técnico evaluará tu solicitud y se pondrá en contacto contigo en menos de 24 horas hábiles.</p>
      </div>
      ${leadForm({ white: false })}
    </div>
  </section>`;
}

function svcFooterCta(svcName) {
  return `<section class="section reveal">
    <div class="container contact-split">
      <div class="contact-split__text">
        <h2 class="h-slab">¿Necesitas una empresa constructora y de ingeniería? <span class="o">Contáctanos ahora.</span></h2>
        <p class="body">En <strong>EG SOLUTIONS C.A.</strong> estamos listos para evaluar tu requerimiento sin compromiso. <strong>Déjanos tus datos y un ingeniero te responderá en corto plazo.</strong></p>
        <div class="sedes" style="margin-top:8px">
          ${site.sedes
            .map(
              (s) => `<div class="sede">
                ${img('ico-marker.svg', '', 'class="sede__pin"')}
                <span class="sede__name">${esc(s.nombre)}</span>
                <span class="sede__addr">${plain(s.direccion)}</span>
                <span class="sede__tel">${img('ico-phone.svg', '')} ${s.telefonos.join(' / ')}</span>
              </div>`
            )
            .join('')}
        </div>
        ${btn('Nuestro WhatsApp', waLink(svcName), 'green')}
      </div>
      ${leadForm({ white: false })}
    </div>
  </section>`;
}

function carousel(images, { id, dark = false } = {}) {
  const slides = images.map((i) => `<div class="carousel__slide">${img(i, '')}</div>`).join('');
  const dots = images.map((_, i) => `<button type="button" class="carousel__dot" data-dot ${i === 0 ? 'aria-current="true"' : ''} aria-label="Foto ${i + 1}"></button>`).join('');
  return `<div class="carousel ${dark ? 'section--dark' : ''}" data-carousel id="${id}">
    <button type="button" class="carousel__btn carousel__btn--prev" data-prev aria-label="Foto anterior">${img('ico-arrow-left.svg', '')}</button>
    <div class="carousel__viewport"><div class="carousel__track" data-track>${slides}</div></div>
    <button type="button" class="carousel__btn carousel__btn--next" data-next aria-label="Foto siguiente">${img('ico-arrow-right.svg', '')}</button>
    <div class="carousel__dots">${dots}</div>
  </div>`;
}

function cardsCarousel(items, cardFn) {
  return `<div class="cards-carousel" data-carousel data-per-view="4">
    <button type="button" class="carousel__btn carousel__btn--prev" data-prev aria-label="Anterior">${img('ico-arrow-left.svg', '')}</button>
    <div class="cards-carousel__viewport"><div class="cards-carousel__track" data-track>${items.map(cardFn).join('')}</div></div>
    <button type="button" class="carousel__btn carousel__btn--next" data-next aria-label="Siguiente">${img('ico-arrow-right.svg', '')}</button>
  </div>`;
}

function projectCard(p) {
  return `<a class="card" href="/${p.href}">
    ${img(p.img, p.title, 'class="card__img"')}
    <div class="card__body">
      <p class="card__title">${plain(p.title)}</p>
      <p class="card__text">${esc(p.text)}</p>
    </div>
  </a>`;
}

// ═══════════════════════════════ PÁGINA: INICIO ═══════════════════════════════
function buildHome() {
  const body = `
${heroSection({
    bg: 'hero-home.webp',
    title: 'Ingeniería de precisión que mueve Venezuela',
    subtitle: 'Soluciones integrales, rigor técnico y experiencia local para ejecutar proyectos de alta complejidad.',
    btnLabel: 'Conoce nuestros servicios',
    btnHref: '#servicios',
  })}

<section class="section reveal">
  <div class="container intro-split">
    <div class="intro-split__text">
      <h2 class="h-section">Todas las soluciones de ingeniería que tu proyecto exige, en <span class="o2">un solo equipo</span></h2>
      <p class="lead">Sabemos que delegar el mantenimiento de tus instalaciones a múltiples proveedores agota tus recursos y retrasa los resultados. En <strong class="o">EG SOLUTIONS C.A.</strong>, conjugamos todas las áreas de la ingeniería para ofrecerte un <strong>servicio integral sin fricciones.</strong> Desde el sector residencial hasta el industrial, trabajamos para garantizar la óptima operatividad de tus inmuebles con soluciones definitivas.</p>
      ${btn('Hablemos de tu proyecto', '/contacto.html', 'dark')}
    </div>
    ${img('nos-mision.webp', 'Equipo de EG SOLUTIONS en obra', 'class="intro-split__photo"')}
  </div>
</section>

<section class="section section--dark reveal" id="servicios">
  <div class="container">
    <p class="years"><strong>11 años de trayectoria</strong> ejecutando ingeniería con alto nivel de profesionalismo.</p>
    ${iconsRow(true)}
  </div>
</section>

<section class="section reveal">
  <div class="container">
    <div class="section__head">
      <h2 class="h-section">Soluciones diseñadas para que <span class="o">tu empresa nunca se detenga</span></h2>
    </div>
    ${cardsGrid(homeCards)}
    <div class="cards-cta">${btn('Conoce todos nuestros servicios', '/soluciones.html', 'orange2')}</div>
  </div>
</section>

${partnersStrip('Referentes de nuestras soluciones y servicios')}

<section class="section section--orange reveal">
  <div class="container">
    <div class="section__head"><h2 class="h-slab" style="color:#fff">¿Por qué somos el único aliado de ingeniería que tu infraestructura necesita?</h2></div>
    <div class="why">
      ${whyUs
        .map(
          (w, i) => `<div class="why__item">
            <button type="button" class="why__q" id="why-q-${i}" aria-controls="why-p-${i}" aria-expanded="${i === 0 ? 'true' : 'false'}">
              ${esc(w.q)} <span class="why__plus" aria-hidden="true">+</span>
            </button>
            <div class="why__panel" id="why-p-${i}" role="region" aria-labelledby="why-q-${i}" ${i === 0 ? '' : 'hidden'}>
              <div>
                <h3>${md(w.title)}</h3>
                <p>${esc(w.text)}</p>
                ${btn(w.btn, `/${w.href}`, i === 0 ? 'dark' : 'orange')}
              </div>
              ${img(w.img, '')}
            </div>
          </div>`
        )
        .join('')}
    </div>
  </div>
</section>

${testimonialsSection({ title: 'Opiniones de nuestros clientes', sub: 'No solo ejecutamos proyectos; construimos alianzas basadas en la confianza y el rigor técnico. Conoce la experiencia de quienes ya centralizaron su gestión operativa con nosotros, {o}clientes 100% satisfechos{/o}' })}
<div class="container reveal" style="display:flex;justify-content:center;margin-top:-56px;padding-bottom:96px">${btn('Contáctanos', '/contacto.html', 'orange')}</div>

${readySection()}
${ctaPhotoSection()}
`;
  write('index.html', page({ title: 'Inicio', description: 'Ingeniería, obras civiles, climatización, gestión de inmuebles y mantenimiento en Venezuela. Un sólo equipo, todas las soluciones.', active: 'home', body }));
}

// ═══════════════════════════════ PÁGINAS: CATEGORÍA ═══════════════════════════════
function buildCategory(cat) {
  const subs = services.filter((s) => s.cat === cat.slug);
  const zigzag = subs
    .map(
      (s, i) => `<div class="zz ${i % 2 ? 'zz--rev' : ''}">
        ${img(s.img, s.title, 'class="zz__photo"')}
        <div class="zz__body">
          <div class="zz__bar"><h3>${plain(s.title)}</h3></div>
          <p class="zz__text">${esc(s.summary)}</p>
          <a class="zz__more" href="/servicios/${s.slug}.html">Ver detalles del servicio →</a>
        </div>
      </div>`
    )
    .join('');

  const body = `
${heroSection({ bg: cat.hero, title: cat.title, subtitle: cat.subtitle, btnLabel: 'Contáctanos', btnHref: '/contacto.html' })}

<section class="section reveal">
  <div class="container">
    <div class="section__head">
      <h2 class="h-section">${md(cat.h2)}</h2>
      <div class="lead center">${paragraphs(cat.intro)}</div>
      ${btn(cat.introBtn, '/contacto.html', 'dark')}
    </div>
  </div>
</section>

<div class="strip reveal">${cat.strip.map((i) => img(i, '')).join('')}</div>

<section class="section reveal">
  <div class="container">
    <div class="section__head"><h2 class="h-section">${md(cat.sectionTitle)}</h2></div>
    <div class="zigzag">${zigzag}</div>
  </div>
</section>

<section class="section section--dark reveal">
  <div class="container">
    <div class="section__head">
      <h2 class="h-slab on-dark">${esc(cat.resultsTitle)}</h2>
      <p class="lead on-dark">${esc(cat.resultsSub)}</p>
    </div>
    <div class="testimonials">
      ${testimonials
        .slice(0, 6)
        .map(
          (t) => `<div class="quote">
            <div class="quote__head">${img('avatar.png', '', 'class="avatar"')}<span class="quote__name">${esc(t.name)}</span></div>
            ${img(t.stars, '5 estrellas', 'class="quote__stars"')}
            <p class="quote__text">${esc(t.text)}</p>
          </div>`
        )
        .join('')}
    </div>
  </div>
</section>

${svcFooterCta(cat.name)}
`;
  write(`servicios/${cat.slug}.html`, page({ title: cat.name, description: cat.subtitle, active: 'servicios', body }));
}

// ═══════════════════════════════ PÁGINAS: SERVICIO INDIVIDUAL ═══════════════════════════════
function buildService(svc) {
  const cat = slugTitle(svc.cat);
  const bullets = svc.bullets
    .map(([label, text]) => `<li><strong>${esc(label)}</strong> ${esc(text)}</li>`)
    .join('');
  const related = services.filter((s) => s.cat === svc.cat && s.slug !== svc.slug).slice(0, 3);
  const body = `
<section class="section reveal">
  <div class="container svc-top">
    <div class="svc-top__text">
      <h1>${plain(svc.pageTitle || svc.title)}</h1>
      <div class="lead">${paragraphs(svc.intro)}</div>
      <h2>Cotiza con nosotros</h2>
      ${leadForm({ white: false, btnLabel: 'Enviar' })}
    </div>
    ${img(svc.img, svc.title, 'class="zz__photo" style="width:100%;height:auto;aspect-ratio:578/471"')}
  </div>
</section>

<section class="section section--gray reveal">
  <div class="container details">
    <div class="details__text">
      <h2 class="h-section">Detalles del Servicio</h2>
      <p>${esc(svc.details)}</p>
      <ul>${bullets}</ul>
    </div>
    <div>
      ${btn('Nuestro WhatsApp', waLink(svc.title), 'green', 'btn--wide')}
    </div>
  </div>
</section>

<section class="section section--dark reveal">
  <div class="container">
    <div class="section__head">
      <h2 class="h-slab on-dark">Nuestra mejor garantía es la operatividad de nuestros clientes.</h2>
      <p class="lead on-dark">Con criterios de calidad, entrega a tiempo y ejecución impecable.</p>
    </div>
    <div class="testimonials">
      ${testimonials
        .slice(0, 6)
        .map(
          (t) => `<div class="quote">
            <div class="quote__head">${img('avatar.png', '', 'class="avatar"')}<span class="quote__name">${esc(t.name)}</span></div>
            ${img(t.stars, '5 estrellas', 'class="quote__stars"')}
            <p class="quote__text">${esc(t.text)}</p>
          </div>`
        )
        .join('')}
    </div>
  </div>
</section>

${svcFooterCta(svc.title)}

${related.length ? `<section class="section reveal">
  <div class="container">
    <div class="section__head"><h2 class="h-section">También te puede interesar</h2></div>
    <div class="cards">${related.map((s) => `<a class="card" href="/servicios/${s.slug}.html">${img(s.img, s.title, 'class="card__img"')}<div class="card__body"><p class="card__title">${plain(s.title)}</p></div></a>`).join('')}</div>
    <div class="cards-cta">${btn(`Ver ${cat.name}`, `/servicios/${cat.slug}.html`, 'orange2')}</div>
  </div>
</section>` : ''}
`;
  write(`servicios/${svc.slug}.html`, page({ title: svc.title, description: svc.summary, active: 'servicios', body }));
}

// ═══════════════════════════════ PÁGINA: NOSOTROS ═══════════════════════════════
function buildNosotros() {
  const body = `
${heroSection({
    bg: 'nos-hero.webp',
    title: 'Ingeniería, Infraestructura y Mantenimiento Estratégico.',
    subtitle: 'Asumimos la complejidad técnica de sus instalaciones para que usted se enfoque en el crecimiento de su negocio.',
    btnLabel: 'Nuestros Servicios',
    btnHref: '#servicios',
  })}

<section class="section reveal">
  <div class="container">
    <div class="section__head">
      <h2 class="h-section">¿Quiénes somos?</h2>
      <div class="lead center">
        <p><strong>EG SOLUTIONS C.A.</strong>, es una firma de ingeniería dedicada a la ejecución integral de <strong>soluciones en infraestructura, obras civiles y mantenimiento corporativo.</strong></p>
        <p>Nos especializamos en intervenir y optimizar instalaciones con altas exigencias operativas: corporativas, industriales, hoteleras y centros de salud en Venezuela. Trabajamos bajo la premisa de la ingeniería aplicada, asumiendo el liderazgo de proyectos multidisciplinarios complejos para transformarlos en resultados viables, seguros y duraderos. No solo ejecutamos obras; generamos valor agregado para prolongar el ciclo de vida de cada activo.</p>
      </div>
      ${btn('Contáctanos', '/contacto.html', 'dark')}
    </div>
  </div>
</section>

<section class="section reveal">
  <div class="container about-split">
    <div class="about-split__text">
      <h2 class="h-section">Nuestra <span class="o">Misión</span></h2>
      <p class="lead">Proporcionar soluciones infraestructurales y de mantenimiento preventivo/correctivo que garanticen la operatividad ininterrumpida de los espacios de nuestros clientes. Integramos recursos técnicos, personal calificado e innovación constante para optimizar inmuebles y servicios, convirtiéndonos en el pilar que sostiene su negocio núcleo.</p>
    </div>
    ${img('nos-mision.webp', 'Equipo de EG SOLUTIONS trabajando')}
  </div>
</section>

<section class="section reveal">
  <div class="container about-split--rev about-split">
    ${img('nos-vision.webp', 'Obra de EG SOLUTIONS')}
    <div class="about-split__text">
      <h2 class="h-section">Nuestra <span class="o">Visión</span></h2>
      <p class="lead">Consolidarnos como el aliado estratégico y la firma de ingeniería de referencia en el sector de servicios en Venezuela, reconocidos por desarrollar prácticas de ejecución impecables, altos estándares de calidad y la capacidad de satisfacer las exigencias técnicas más rigurosas del mercado.</p>
    </div>
  </div>
</section>

<section class="section section--dark reveal">
  <div class="container">
    <div class="section__head"><h2 class="h-slab on-dark">Filosofía Operativa</h2></div>
    <p class="lead on-dark center" style="max-width:710px;margin:0 auto">Entendemos que detrás de cada proyecto de infraestructura hay un reto crítico para la operatividad de una empresa. Por ello, nuestra filosofía se fundamenta en la resiliencia corporativa y el esfuerzo calculado. Abordamos cada obstáculo técnico con una planificación minuciosa y un compromiso inquebrantable. El éxito de EG Solutions se mide por la tranquilidad operativa de los clientes a los que servimos.</p>
  </div>
</section>

<section class="section reveal" id="servicios">
  <div class="container">
    ${iconsRow()}
    <div class="cards-cta">${btn('Conoce nuestros proyectos más destacados', '/soluciones.html', 'orange2', 'btn--wide')}</div>
  </div>
</section>

${partnersStrip('Referentes de nuestras soluciones y servicios')}

<section class="section reveal">
  <div class="container">
    <div class="section__head"><h2 class="h-section"><span class="o">11 años de trayectoria</span> ejecutando ingeniería con alto nivel de profesionalismo.</h2></div>
    ${carousel(['nos-strip1.webp', 'nos-strip2.webp', 'nos-strip3.webp'], { id: 'nos-strip' })}
  </div>
</section>

${testimonialsSection({ title: 'Opiniones de nuestros clientes', sub: 'No solo ejecutamos proyectos; construimos alianzas basadas en la confianza y el rigor técnico. Conoce la experiencia de quienes ya centralizaron su gestión operativa con nosotros, {o}clientes 100% satisfechos{/o}' })}
<div class="container reveal" style="display:flex;justify-content:center;margin-top:-56px;padding-bottom:96px">${btn('Contáctanos', '/contacto.html', 'orange')}</div>
`;
  write('nosotros.html', page({ title: 'Nosotros', description: 'Conoce a EG SOLUTIONS C.A.: misión, visión y 11 años de trayectoria en ingeniería e infraestructura en Venezuela.', active: 'nosotros', body }));
}

// ═══════════════════════════════ PÁGINA: SOLUCIONES ═══════════════════════════════
function buildSoluciones() {
  const grid = articles
    .map(
      (a) => `<a class="card sol-card" href="/soluciones/${a.slug}.html">
        <div class="crop">${img(a.img, a.title, 'style="width:100%;height:100%;object-fit:cover"')}</div>
        <div class="card__body">
          <p class="card__title">${plain(a.cardTitle)}</p>
          <p class="card__text">${esc(a.cardText || a.text)}</p>
        </div>
      </a>`
    )
    .join('');

  const body = `
<section class="section reveal">
  <div class="container">
    <div class="section__head">
      <h2 class="h-slab">Soluciones Integrales\nen Ingeniería, Infraestructura y Mantenimiento Técnico</h2>
    </div>
    <div class="sol-grid">${grid}</div>
  </div>
</section>

<section class="section reveal">
  <div class="container">
    <p class="lead center" style="max-width:691px;margin:0 auto 24px"><strong>Explora nuestros casos de éxito:</strong> un recorrido técnico por los proyectos donde hemos integrado soluciones de ingeniería, infraestructura y mantenimiento continuo.</p>
    <span class="divider" style="margin-bottom:40px"></span>
    <p class="h-section center" style="font-size:clamp(20px,2.2vw,32px);max-width:860px;margin:0 auto 40px">Descubre cómo transformamos infraestructuras corporativas. <span class="o">Analiza nuestros proyectos ejecutados</span> y la ingeniería detrás de cada solución técnica</p>
    <div class="sol-grid">${projectCards.map((p) => `<a class="card sol-card" href="/${p.href}"><div class="crop">${img(p.img, p.title, 'style="width:100%;height:100%;object-fit:cover"')}</div><div class="card__body"><p class="card__title">${plain(p.title)}</p><p class="card__text">${esc(p.text)}</p></div></a>`).join('')}</div>
  </div>
</section>
`;
  write('soluciones.html', page({ title: 'Soluciones', description: 'Casos de éxito y artículos técnicos de EG SOLUTIONS: ingeniería, infraestructura y mantenimiento en Venezuela.', active: 'soluciones', body }));
}

// ═══════════════════════════════ PÁGINAS: ARTÍCULO ═══════════════════════════════
function buildArticle(a) {
  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 4);
  const relatedCat = projectCards.slice(0, 4);
  const body = `
<section class="section reveal">
  <div class="container article">
    <div>
      <div class="article__head">
        ${img('ico-instagram-orange.svg', '')}
        <h1>${plain(a.title)}</h1>
      </div>
      ${img(a.img, a.title, 'class="article__photo" style="width:100%;object-fit:cover"')}
      <div class="article__cta">${btn('Haz clic aquí para ver la publicación completa', site.instagram, 'orange', 'btn--wide')}</div>
      <div class="article__body">${a.body ? paragraphs(a.body) : `<p>${esc(a.text)}</p>`}</div>
      ${a.pending ? `<p class="article__pending">Este artículo se completará con el texto íntegro de la publicación de Instagram.</p>` : ''}
    </div>
    <aside class="aside">
      <h2>Artículos de Interés</h2>
      <span class="divider"></span>
      ${related
        .map(
          (r) => `<a class="mini" href="/soluciones/${r.slug}.html">
            <div class="crop">${img(r.img, r.title, 'style="width:100%;height:100%;object-fit:cover"')}</div>
            <h3>${plain(r.cardTitle)}</h3>
            <p>${esc(r.cardText || r.text)}</p>
          </a>`
        )
        .join('')}
      <h2 style="margin-top:16px">Cotiza con nosotros</h2>
      ${btn('Nuestro WhatsApp', waLink(), 'green')}
      ${btn('Llenar formulario', '/contacto.html', 'orange')}
    </aside>
  </div>
</section>

<section class="section section--dark reveal">
  <div class="container">
    <div class="section__head"><h2 class="h-slab on-dark">Soluciones relacionadas</h2></div>
    <div class="sol-grid">${relatedCat.map((p) => `<a class="card sol-card card--light" href="/${p.href}"><div class="crop">${img(p.img, p.title, 'style="width:100%;height:100%;object-fit:cover"')}</div><div class="card__body"><p class="card__title">${plain(p.title)}</p><p class="card__text">${esc(p.text)}</p></div></a>`).join('')}</div>
  </div>
</section>

${svcFooterCta()}
`;
  write(`soluciones/${a.slug}.html`, page({ title: a.cardTitle.replace(/\n/g, ' '), description: a.text, active: 'soluciones', body }));
}

// ═══════════════════════════════ PÁGINA: CONTACTO ═══════════════════════════════
function buildContacto() {
  const body = `
<section class="contact-hero reveal">
  <div class="container contact-split">
    <div class="contact-split__text">
      ${img('logo.png', site.name, 'class="contact-hero__logo"')}
      <h1 class="h-slab">Solicita una Inspección o Cotización</h1>
      <p class="body">Un especialista técnico evaluará tu solicitud y se pondrá en contacto contigo en menos de 24 horas hábiles.</p>
      ${btn('Nuestro WhatsApp', waLink(), 'green')}
    </div>
    ${leadForm({ white: true })}
  </div>
</section>

${readySection()}

<section class="section reveal">
  <div class="container partners__row" style="justify-content:center;gap:40px">
    ${['partner-1.svg', 'partner-2.svg', 'partner-3.svg', 'partner-4.svg', 'partner-5.svg'].map((p) => img(p, '')).join('')}
  </div>
</section>
`;
  write('contacto.html', page({ title: 'Contacto', description: 'Solicita una inspección o cotización con EG SOLUTIONS C.A. Te respondemos en menos de 24 horas hábiles.', active: 'contacto', body }));
}

// ── Escritura de archivos ─────────────────────────────────────────
function write(rel, html) {
  const full = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html);
  console.log('✓', rel);
}

buildHome();
categories.forEach(buildCategory);
services.forEach(buildService);
buildNosotros();
buildSoluciones();
articles.forEach(buildArticle);
buildContacto();
console.log(`\nListo: ${1 + categories.length + services.length + 1 + 1 + articles.length + 1} páginas generadas en public/`);
