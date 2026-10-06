// Utilidades para recortar el export completo de Figma (src/figma-export/full.png).
// El export está a escala S = 32768 / 35425 y su origen en Figma es (X0, Y0).
import sharp from 'sharp';
export const SRC = 'src/figma-export/full.png';
export const S = 32768 / 35425;
export const X0 = -1575; // x mínima del lienzo en coordenadas de Figma
export const Y0 = -3593; // y mínima del lienzo
export function img() { return sharp(SRC, { limitInputPixels: false }); }
// Recorta una región dada en coordenadas de Figma (x, y, w, h) y la guarda.
export async function cropFigma(x, y, w, h, out, opts = {}) {
  const left = Math.round((x - X0) * S), top = Math.round((y - Y0) * S);
  const width = Math.round(w * S), height = Math.round(h * S);
  let p = img().extract({ left, top, width, height });
  if (opts.resizeW) p = p.resize({ width: opts.resizeW });
  if (/\.png$/.test(out)) await p.png().toFile(out);
  else await p.webp({ quality: opts.q || 80 }).toFile(out);
  return { left, top, width, height };
}
