// Genera versiones responsivas de las fotos (480/800/1200 px + base de 1440 px como máximo, en WebP)
// a partir de los originales de src/raw, y escribe src/img-manifest.json con dimensiones, huella
// (para versionar la URL y poder cachear un año) y variantes de cada imagen de public/assets/img.
// Uso: node src/variants.mjs
import sharp from 'sharp';
import fs from 'node:fs';
import crypto from 'node:crypto';

const DIR = 'public/assets/img';
const WIDTHS = [480, 800, 1200];
const BASE_MAX = 1440;
const KEEP = new Set(['logo', 'deco-hex', 'deco-arrow', 'avatar']); // se mantienen como PNG

// 1) Fotos con original en src/raw
for (const f of fs.readdirSync('src/raw')) {
  const name = f.replace(/\.\w+$/, '');
  if (KEEP.has(name)) continue;
  const src = () => sharp(`src/raw/${f}`, { limitInputPixels: false }).rotate();
  const { info } = await src().toBuffer({ resolveWithObject: true });
  const w = info.width;
  // Variantes más pequeñas que el original
  for (const vw of WIDTHS) {
    if (vw < w * 0.85) await src().resize({ width: vw }).webp({ quality: 74 }).toFile(`${DIR}/${name}-${vw}.webp`);
    else fs.rmSync(`${DIR}/${name}-${vw}.webp`, { force: true });
  }
  await src().resize({ width: Math.min(w, BASE_MAX), withoutEnlargement: true }).webp({ quality: 72 }).toFile(`${DIR}/${name}.webp.tmp`);
  fs.renameSync(`${DIR}/${name}.webp.tmp`, `${DIR}/${name}.webp`);
}

// 2) Logo: versiones pequeñas (se muestra a ~96 px)
for (const vw of [192, 384]) await sharp(`${DIR}/logo.png`).resize({ width: vw }).webp({ quality: 85 }).toFile(`${DIR}/logo-${vw}.webp`);

// 3) Manifiesto
const files = fs.readdirSync(DIR).filter((f) => /\.(webp|png|svg)$/.test(f));
const isVariant = (f) => /-(192|384|480|800|1200)\.webp$/.test(f);
const manifest = {};
for (const f of files) {
  const buf = fs.readFileSync(`${DIR}/${f}`);
  const hash = crypto.createHash('md5').update(buf).digest('hex').slice(0, 8);
  if (f.endsWith('.svg')) {
    const s = buf.toString('utf8');
    const w = s.match(/<svg[^>]*?\swidth="([\d.]+)/), h = s.match(/<svg[^>]*?\sheight="([\d.]+)/);
    manifest[f] = w && h ? { hash, w: Math.round(+w[1]), h: Math.round(+h[1]) } : { hash };
    continue;
  }
  const m = await sharp(buf).metadata();
  manifest[f] = { hash, w: m.width, h: m.height };
}
for (const f of files) {
  if (isVariant(f) || f.endsWith('.svg')) continue;
  const stem = f.replace(/\.\w+$/, '');
  const variants = files
    .filter((v) => isVariant(v) && v.startsWith(stem + '-') && /^-\d+$/.test(v.slice(stem.length).replace(/\.webp$/, '')))
    .map((v) => ({ file: v, w: manifest[v].w }))
    .filter((v) => v.w < manifest[f].w)
    .sort((a, b) => a.w - b.w);
  if (variants.length) manifest[f].variants = variants;
}
fs.writeFileSync('src/img-manifest.json', JSON.stringify(manifest, null, 1));

let total = 0, base = 0;
for (const f of files) { const s = fs.statSync(`${DIR}/${f}`).size; total += s; if (!isVariant(f)) base += s; }
console.log(`Imágenes base: ${Math.round(base / 1024)} KB · con variantes: ${Math.round(total / 1024)} KB · ${Object.keys(manifest).length} archivos`);
