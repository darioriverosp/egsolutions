// Mide bandas de contenido en una imagen 1:1 (salida de compare.mjs): para cada franja de filas
// con píxeles distintos del fondo, imprime y-inicio, y-fin, alto, x-min, x-max.
// Uso: node src/measure.mjs <img.png> <y0> <y1> [x0=0] [x1=1440] [umbral=40] [huecoMin=4]
import sharp from 'sharp';

const [file, y0, y1, x0 = 0, x1 = 1440, thr = 40, gapMin = 4] = process.argv.slice(2).map((v, i) => (i ? +v : v));
const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width;
const px = (x, y) => { const i = (y * W + x) * 3; return [data[i], data[i + 1], data[i + 2]]; };
const bandsOut = [];
let bg = null, cur = null, gap = 0;
for (let y = y0; y < Math.min(y1, info.height); y++) {
  const rowBg = px(x0, y);
  if (!bg) bg = rowBg;
  let mn = -1, mx = -1;
  for (let x = x0; x < x1; x++) {
    const p = px(x, y);
    if (Math.abs(p[0] - bg[0]) + Math.abs(p[1] - bg[1]) + Math.abs(p[2] - bg[2]) > thr) { if (mn < 0) mn = x; mx = x; }
  }
  if (mn >= 0) {
    if (!cur) cur = { a: y, b: y, l: mn, r: mx };
    else { cur.b = y; cur.l = Math.min(cur.l, mn); cur.r = Math.max(cur.r, mx); }
    gap = 0;
  } else if (cur && ++gap >= gapMin) { bandsOut.push(cur); cur = null; gap = 0; }
}
if (cur) bandsOut.push(cur);
console.log(`fondo rgb(${bg}) · ${file.split(/[\\/]/).pop()}`);
for (const b of bandsOut) console.log(`y ${b.a}–${b.b} (h ${b.b - b.a + 1})  x ${b.l}–${b.r} (w ${b.r - b.l + 1})`);
