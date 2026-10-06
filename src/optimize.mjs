// Convierte las imágenes originales (src/raw) a WebP optimizado en public/assets/img
import sharp from 'sharp';
import fs from 'node:fs';
const keepPng = new Set(['logo', 'deco-hex', 'deco-arrow', 'avatar']);
for (const f of fs.readdirSync('src/raw')) {
  const name = f.replace(/\.\w+$/, '');
  let img = sharp(`src/raw/${f}`).rotate();
  if (name === 'logo') img = sharp(await img.trim().toBuffer());
  const meta = await img.metadata();
  const out = keepPng.has(name)
    ? img.resize({ width: Math.min(meta.width, 800), withoutEnlargement: true }).png({ compressionLevel: 9 })
    : img.resize({ width: Math.min(meta.width, 1600), withoutEnlargement: true }).webp({ quality: 78 });
  const ext = keepPng.has(name) ? 'png' : 'webp';
  await out.toFile(`public/assets/img/${name}.${ext}.tmp`);
  fs.renameSync(`public/assets/img/${name}.${ext}.tmp`, `public/assets/img/${name}.${ext}`);
  if (ext === 'webp') fs.rmSync(`public/assets/img/${f}`, { force: true });
  const s = fs.statSync(`public/assets/img/${name}.${ext}`).size;
  console.log(name.padEnd(28), meta.format, `${meta.width}x${meta.height}`, '->', ext, Math.round(s / 1024) + 'KB');
}
