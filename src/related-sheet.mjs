// Hoja de contacto con la franja "Soluciones relacionadas" de cada artículo en Figma (para leer qué tarjetas lleva).
// Uso: node src/related-sheet.mjs <carpeta-capturas> <salida.png>
import sharp from 'sharp';
import fs from 'node:fs';
const [dir, out] = process.argv.slice(2);
const files = fs.readdirSync(dir).filter((f) => /^a-.*\.figma\.png$/.test(f));
const tiles = [];
let top = 0;
for (const f of files) {
  const { data, info } = await sharp(`${dir}/${f}`).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  // primera fila oscura (58,58,58) en x=1436 por debajo de y=900
  let y0 = -1;
  for (let y = 900; y < info.height; y++) { const i = (y * info.width + 1436) * 3; if (Math.abs(data[i] - 58) < 6 && Math.abs(data[i + 2] - 58) < 6) { y0 = y; break; } }
  const crop = await sharp(`${dir}/${f}`).extract({ left: 60, top: y0 + 120, width: 1320, height: 330 }).resize({ width: 1000 }).png().toBuffer();
  const label = await sharp({ create: { width: 1000, height: 24, channels: 3, background: '#000' } }).composite([{ input: Buffer.from(`<svg width="1000" height="24"><text x="6" y="18" font-size="18" fill="#fff" font-family="Arial">${f}</text></svg>`), left: 0, top: 0 }]).png().toBuffer();
  tiles.push({ input: label, left: 0, top }, { input: crop, left: 0, top: top + 24 });
  top += 24 + 250 + 6;
}
await sharp({ create: { width: 1000, height: top, channels: 3, background: '#f0f' } }).composite(tiles).png().toFile(out);
