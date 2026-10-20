// Detecta espacios verticales grandes en móvil (375 px): huecos sin contenido entre elementos visibles.
// Uso: node src/mobile-gaps.mjs <carpeta-salida> [umbral=90] [ruta…]
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
const [out, thr = 90, ...only] = process.argv.slice(2);
const pages = only.length ? only : ['/', '/nosotros', '/soluciones', '/contacto', '/servicios/obras-civiles', '/servicios/impermeabilizacion', '/soluciones/piso-agrietado'];
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
for (const r of pages) {
  await page.goto('http://localhost:5173' + r, { waitUntil: 'networkidle0' });
  await page.addStyleTag({ content: '.reveal{opacity:1!important;transform:none!important}' });
  await page.evaluate(async () => { document.querySelectorAll('img[loading=lazy]').forEach((i) => (i.loading = 'eager')); await Promise.all([...document.images].map((i) => i.decode().catch(() => 0))); });
  const gaps = await page.evaluate((thr) => {
    // Bloques "con contenido": textos, imágenes, botones, inputs
    const els = [...document.querySelectorAll('main h1,main h2,main h3,main p,main li,main img,main a.btn,main input,main textarea,main .quote,main .card,main .divider')]
      .filter((e) => { const s = getComputedStyle(e); const b = e.getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && b.height > 2 && b.width > 2 && !e.closest('.deco') && !e.classList.contains('deco') && !e.closest('.hero'); })
      .map((e) => { const b = e.getBoundingClientRect(); return { t: b.top + scrollY, b: b.bottom + scrollY, d: e.tagName.toLowerCase() + '.' + [...e.classList].join('.') + ' «' + (e.textContent || e.alt || '').trim().slice(0, 30) + '»', s: e.closest('section')?.className || '' }; })
      .sort((a, z) => a.t - z.t);
    const res = []; let maxB = els[0]?.b || 0, prev = els[0];
    for (const e of els.slice(1)) { if (e.t - maxB > thr) res.push(`${Math.round(e.t - maxB)}px  entre ${prev.d}  →  ${e.d}  [${e.s}]`); if (e.b > maxB) { maxB = e.b; prev = e; } }
    return res;
  }, +thr);
  console.log(`\n== ${r}`); gaps.forEach((g) => console.log('  ' + g));
  await page.screenshot({ path: `${out}/gap${r.replace(/\//g, '_') || '_home'}.png`, fullPage: true });
}
await browser.close();
