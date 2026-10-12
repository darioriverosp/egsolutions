// Mide en las capturas de Figma (salida de compare.mjs) los anchos de texto de cada página de servicio:
// ancho de la entradilla, ancho del texto de "Detalles" y posición/ancho del formulario.
// Uso: node src/svc-widths.mjs <carpeta-capturas>  → imprime JSON {slug: {lead, details, formX, formW}}
import sharp from 'sharp';
import fs from 'node:fs';

const dir = process.argv[2];
const out = {};
for (const f of fs.readdirSync(dir).filter((f) => /^s-.*\.figma\.png$/.test(f))) {
  const slug = f.slice(2, -'.figma.png'.length);
  const { data, info } = await sharp(`${dir}/${f}`).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width;
  const dark = (x, y) => { const i = (y * W + x) * 3; return data[i] + data[i + 1] + data[i + 2] < 300; };
  const gray = (x, y) => { const i = (y * W + x) * 3; const [r, g, b] = [data[i], data[i + 1], data[i + 2]]; return Math.abs(r - 217) < 8 && Math.abs(g - 217) < 8 && Math.abs(b - 217) < 8; };
  // Formulario: primera fila (y > 700) con un tramo gris largo a la derecha
  let formY = -1, formX = -1, formR = -1;
  for (let y = 700; y < Math.min(info.height, 1300) && formY < 0; y++) {
    let a = -1, b = -1;
    for (let x = 650; x < 1400; x++) if (gray(x, y)) { if (a < 0) a = x; b = x; }
    if (a > 0 && b - a > 400) { formY = y; formX = a; formR = b; }
  }
  // Texto de la izquierda: x máxima de píxeles oscuros
  const maxX = (y0, y1, x1) => { let m = 0; for (let y = y0; y < y1; y++) for (let x = 100; x < x1; x++) if (dark(x, y) && x > m) m = x; return m; };
  const leftX = (y0, y1, x1) => { let m = 9999; for (let y = y0; y < y1; y++) for (let x = 100; x < x1; x++) if (dark(x, y)) { if (x < m) m = x; break; } return m; };
  const leadR = maxX(340, 560, 700), leadL = leftX(340, 560, 700);
  const detR = maxX(formY + 60, formY + 400, formX - 5), detL = leftX(formY + 60, formY + 400, formX - 5);
  out[slug] = { lead: leadR - leadL + 1, leadL, details: detR - detL + 1, detL, formX, formW: formR - formX + 1, formY };
}
console.log(JSON.stringify(out, null, 1));
