// Extrae la foto de cada página de servicio pendiente desde el export completo de Figma.
// Detecta el rectángulo de la foto por contraste con el fondo blanco y recorta por dentro
// (inset) para eliminar esquinas redondeadas y sombra.
import sharp from 'sharp';
import { S, X0, Y0, img } from './crop.mjs';

// [slug de servicio, fx, fy] — posición del frame en coordenadas de Figma
const frames = [
  ['climatizacion-corporativa', 6715, 6275],
  ['mantenimiento-climatizacion', 8394, 6275],
  ['climatizacion-hospitalaria', 10073, 6275],
  ['planes-mantenimiento', 13849, -49],
  ['adecuacion-areas-comunes', 16949, -49],
  ['auditorias-tecnicas', 18499, -49],
  ['remodelacion-areas-comunes', 13913, 6275],
  ['mantenimiento-hotelero', 15490, 6275],
  ['automatizacion-eficiencia', 17080, 6275],
  ['climatizacion-hotelera', 18670, 6275],
];

const out = {};
for (const [slug, fx, fy] of frames) {
  // Región de búsqueda (derecha de la cabecera), en px del export
  const left = Math.round((fx + 640 - X0) * S);
  const top = Math.round((fy + 130 - Y0) * S);
  const width = Math.round(780 * S);
  const height = Math.round(640 * S);
  const { data, info } = await img().extract({ left, top, width, height }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, C = info.channels;
  const cols = new Array(W).fill(0), rows = new Array(H).fill(0);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * C;
    if (data[i] < 205 || data[i + 1] < 205 || data[i + 2] < 205) { cols[x]++; rows[y]++; }
  }
  const xs = cols.map((v, x) => (v / H > 0.3 ? x : -1)).filter((x) => x >= 0);
  const ys = rows.map((v, y) => (v / W > 0.3 ? y : -1)).filter((y) => y >= 0);
  if (!xs.length || !ys.length) { console.log('✗', slug, 'no se detectó foto'); continue; }
  const inset = 10;
  const box = { left: left + xs[0] + inset, top: top + ys[0] + inset, width: xs[xs.length - 1] - xs[0] + 1 - inset * 2, height: ys[ys.length - 1] - ys[0] + 1 - inset * 2 };
  await img().extract(box).webp({ quality: 82 }).toFile(`public/assets/img/svc-${slug}.webp`);
  out[slug] = box;
  console.log('✓', slug.padEnd(30), `${box.width}x${box.height}`);
}
