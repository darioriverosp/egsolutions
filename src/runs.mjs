// Recorre una columna x de una imagen 1:1 y lista los tramos de color de fondo (secciones).
// Uso: node src/runs.mjs <img.png> <x> [altoMin=40]
import sharp from 'sharp';
const [file, xs, minH = 40] = process.argv.slice(2);
const x = +xs;
const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const px = (y) => { const i = (y * info.width + x) * 3; return [data[i], data[i + 1], data[i + 2]]; };
const runs = [];
let start = 0, c = px(0);
for (let y = 1; y <= info.height; y++) {
  const p = y < info.height ? px(y) : null;
  if (!p || Math.abs(p[0] - c[0]) + Math.abs(p[1] - c[1]) + Math.abs(p[2] - c[2]) > 24) {
    if (y - start >= +minH) runs.push(`${start}–${y - 1} (h ${y - start}) rgb(${c})`);
    start = y; c = p;
  }
}
console.log(runs.join('\n'));
