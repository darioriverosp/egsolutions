// Abre el menú hamburguesa a 375 px y hace capturas: menú abierto y con "Servicios" desplegado.
// Uso: node src/mobile-menu.mjs <carpeta-salida> [ruta=/]
import puppeteer from 'puppeteer-core';
const [out, route = '/'] = process.argv.slice(2);
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
await page.goto('http://localhost:5173' + route, { waitUntil: 'networkidle0' });
await page.screenshot({ path: `${out}/mm-0-cerrado.png` });
await page.click('.nav-toggle');
await new Promise((r) => setTimeout(r, 400));
await page.screenshot({ path: `${out}/mm-1-abierto.png` });
const trigger = await page.$('[data-mega-trigger]');
if (trigger) { await trigger.click(); await new Promise((r) => setTimeout(r, 400)); }
await page.screenshot({ path: `${out}/mm-2-servicios.png` });
const info = await page.evaluate(() => {
  const nav = document.querySelector('.nav');
  const vis = (el) => { const s = getComputedStyle(el); const b = el.getBoundingClientRect(); return s.display !== 'none' && s.visibility !== 'hidden' && b.height > 0; };
  return {
    navVisible: vis(nav),
    links: [...nav.querySelectorAll('a, button')].filter(vis).map((e) => e.textContent.trim().replace(/\s+/g, ' ').slice(0, 50)),
  };
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
