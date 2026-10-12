// Revisa todas las páginas a 375 px: desbordamiento horizontal y captura de las indicadas.
// Uso: node src/mobile-check.mjs <carpeta-salida> [ruta1 ruta2 ...]
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
const [out, ...shots] = process.argv.slice(2);
const pages = ['/', '/nosotros', '/soluciones', '/contacto',
  ...fs.readdirSync('public/servicios').map((f) => '/servicios/' + f.replace('.html', '')),
  ...fs.readdirSync('public/soluciones').map((f) => '/soluciones/' + f.replace('.html', ''))];
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 375, height: 812, isMobile: true, deviceScaleFactor: 1 });
for (const r of pages) {
  await page.goto('http://localhost:5173' + r, { waitUntil: 'networkidle0' });
  const res = await page.evaluate(() => {
    const W = document.documentElement.clientWidth;
    const bad = [...document.querySelectorAll('body *')].filter((e) => {
      const b = e.getBoundingClientRect();
      return b.width > 0 && b.right > W + 1 && !e.closest('.deco, .carousel__track, .cards-carousel__track, .mega, .nav') && getComputedStyle(e).position !== 'fixed';
    }).slice(0, 3).map((e) => `${e.tagName.toLowerCase()}.${[...e.classList].join('.')} r=${Math.round(e.getBoundingClientRect().right)}`);
    return { sw: document.documentElement.scrollWidth, W, bad };
  });
  if (res.sw > res.W || res.bad.length) console.log(r, JSON.stringify(res));
  if (shots.includes(r)) {
    await page.addStyleTag({ content: '.reveal{opacity:1!important;transform:none!important}' });
    await page.evaluate(async () => { document.querySelectorAll('img[loading=lazy]').forEach((i) => (i.loading = 'eager')); await Promise.all([...document.images].map((i) => i.decode().catch(() => 0))); });
    await page.screenshot({ path: `${out}/m${r.replace(/\//g, '_') || '_home'}.png`, fullPage: true });
  }
}
console.log('revisadas', pages.length);
await browser.close();
