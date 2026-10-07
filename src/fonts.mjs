// Descarga las tipografías de Google Fonts (solo el subconjunto latino, que cubre el español)
// y las guarda en public/assets/fonts. Genera src/fonts.css con los @font-face (se inserta en
// el <head> de cada página, así no hay petición externa que bloquee el pintado).
// Uso: node src/fonts.mjs
import fs from 'node:fs';

const CSS_URL =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400..800&family=Roboto:wght@400..700&family=Roboto+Slab:wght@700..800&display=swap';
// Un navegador moderno recibe woff2 con fuentes variables (un solo archivo por familia)
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';

const css = await (await fetch(CSS_URL, { headers: { 'user-agent': UA } })).text();
fs.mkdirSync('public/assets/fonts', { recursive: true });

// Cada bloque va precedido de un comentario con el subconjunto: /* latin */
const blocks = [...css.matchAll(/\/\*\s*([\w-]+)\s*\*\/\s*(@font-face\s*\{[^}]+\})/g)];
let out = '';
for (const [, subset, face] of blocks) {
  if (subset !== 'latin') continue;
  const family = face.match(/font-family:\s*'([^']+)'/)[1];
  const url = face.match(/url\((https:[^)]+\.woff2)\)/)[1];
  const file = `${family.toLowerCase().replace(/\s+/g, '-')}-latin.woff2`;
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  fs.writeFileSync(`public/assets/fonts/${file}`, buf);
  out += face.replace(url, `/assets/fonts/${file}`).replace(/\s*\n\s*/g, ' ') + '\n';
  console.log('✓', file, Math.round(buf.length / 1024) + ' KB');
}
fs.writeFileSync('src/fonts.css', out);
console.log(`\nsrc/fonts.css: ${out.split('\n').filter(Boolean).length} @font-face`);
