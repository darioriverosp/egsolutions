// Recorta una franja de una imagen 1:1 y le dibuja una cuadrícula (cada 50 px; roja cada 250) para medir a ojo.
// Uso: node src/grid.mjs <img.png> <y0> <alto> <salida.png> [ancho-salida=1100]
import sharp from 'sharp';
const [file, y0, h, out, ow = 1100] = process.argv.slice(2);
const meta = await sharp(file).metadata();
const W = meta.width, H = Math.min(+h, meta.height - +y0);
const base = await sharp(file).extract({ left: 0, top: +y0, width: W, height: H }).png().toBuffer();
const lines = [];
for (let y = 0; y < H; y += 50) lines.push({ input: { create: { width: W, height: 1, channels: 4, background: (+y0 + y) % 250 === 0 ? '#ff000099' : '#00aa0055' } }, left: 0, top: y });
for (let x = 0; x < W; x += 100) lines.push({ input: { create: { width: 1, height: H, channels: 4, background: '#0000ff66' } }, left: x, top: 0 });
const comp = await sharp(base).composite(lines).png().toBuffer();
await sharp(comp).resize({ width: +ow }).toFile(out);
