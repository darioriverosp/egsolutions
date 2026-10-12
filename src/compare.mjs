// Compara visualmente una página del sitio con su pantalla de Figma: genera imágenes por tramos
// con Figma a la izquierda y el sitio a la derecha.
// Uso: node src/compare.mjs <ruta> <figmaX> <figmaY> <alto> <salida> [tramo=1200] [escala=0.55]
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';
import { cropFigma } from './crop.mjs';

const [route, fx, fy, fh, out, chunkArg, scaleArg] = process.argv.slice(2);
const CHUNK = +(chunkArg || 1200), SC = +(scaleArg || 0.55), W = 1440;

const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const page = await browser.newPage();
await page.setViewport({ width: W, height: 900 });
await page.goto('http://localhost:5173' + route, { waitUntil: 'networkidle0' });
await page.addStyleTag({ content: '.reveal{opacity:1!important;transform:none!important}' });
await page.evaluate(async () => {
  document.querySelectorAll('img[loading=lazy]').forEach((i) => (i.loading = 'eager'));
  await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => (i.onload = i.onerror = r)))));
  await document.fonts.ready;
  await Promise.all([...document.images].map((i) => i.decode().catch(() => 0)));
});
await new Promise((r) => setTimeout(r, 600));
const siteH = await page.evaluate(() => document.documentElement.scrollHeight);
const site = await page.screenshot({ fullPage: true, type: 'png' });
await browser.close();

const tmp = out + '.figma.png';
await cropFigma(+fx, +fy, W, +fh, tmp);
const figma = await sharp(tmp).resize({ width: W }).png().toBuffer();
// Copias a escala 1:1 (1 px = 1 unidad de Figma = 1 px CSS) para medir con src/measure.mjs
await sharp(figma).toFile(out + '.figma.png');
await sharp(site).toFile(out + '.site.png');
const H = Math.max(+fh, siteH);
console.log(`figma ${fh}px · sitio ${siteH}px`);
const cw = Math.round(W * SC);
for (let y = 0, i = 1; y < H; y += CHUNK, i++) {
  const part = async (buf, total) => {
    const h = Math.min(CHUNK, total - y);
    if (h <= 0) return sharp({ create: { width: cw, height: 1, channels: 3, background: '#ddd' } }).png().toBuffer();
    return sharp(buf).extract({ left: 0, top: y, width: W, height: h }).resize({ width: cw }).png().toBuffer();
  };
  const a = await part(figma, +fh), b = await part(site, siteH);
  const ch = Math.round(Math.min(CHUNK, H - y) * SC);
  await sharp({ create: { width: cw * 2 + 10, height: ch, channels: 3, background: '#e11' } })
    .composite([{ input: a, left: 0, top: 0 }, { input: b, left: cw + 10, top: 0 }])
    .png().toFile(`${out}-${String(i).padStart(2, '0')}.png`);
}
