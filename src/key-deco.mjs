// Extrae un adorno naranja de una captura 1:1 de Figma quitando el fondo (blanco u oscuro) → PNG transparente.
// Uso: node src/key-deco.mjs <img.png> <x> <y> <w> <h> <fondo: white|dark> <salida.png>
import sharp from 'sharp';
const [file, x, y, w, h, bg, out] = process.argv.slice(2);
const { data, info } = await sharp(file).extract({ left: +x, top: +y, width: +w, height: +h }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const px = Buffer.alloc(info.width * info.height * 4);
const O = [238, 125, 22];
for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
  const [r, , b] = [data[i], data[i + 1], data[i + 2]];
  const a = bg === 'white' ? (255 - b) / (255 - O[2]) : (r - 58) / (O[0] - 58);
  px[j] = O[0]; px[j + 1] = O[1]; px[j + 2] = O[2];
  px[j + 3] = Math.round(255 * Math.max(0, Math.min(1, a)));
}
// Recorta el borde transparente
await sharp(px, { raw: { width: info.width, height: info.height, channels: 4 } }).trim({ threshold: 1 }).png({ compressionLevel: 9 }).toFile(out);
const m = await sharp(out).metadata();
console.log(out, m.width, m.height);
