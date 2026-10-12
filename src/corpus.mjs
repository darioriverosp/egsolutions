// Extrae el texto visible de cada página generada (normalizado) para compararlo con Figma.
// Uso: node src/corpus.mjs <grupo>   → escribe src/figma-export/corpus-<grupo>.json
import fs from 'node:fs';
import path from 'node:path';

const groups = {
  main: ['index', 'nosotros', 'soluciones', 'contacto', '_chrome'],
  cat: ['servicios/obras-civiles', 'servicios/climatizacion', 'servicios/gestion-inmuebles', 'servicios/sector-hotelero'],
  svc1: [],
  svc2: [],
  art1: [],
  art2: [],
};
const svcs = fs.readdirSync('public/servicios').map((f) => 'servicios/' + f.replace('.html', '')).filter((s) => !groups.cat.includes(s));
groups.svc1 = svcs.slice(0, 8);
groups.svc2 = svcs.slice(8);
const arts = fs.readdirSync('public/soluciones').map((f) => 'soluciones/' + f.replace('.html', ''));
groups.art1 = arts.slice(0, 4);
groups.art2 = arts.slice(4);

export const norm = (s) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();

const text = (html) => norm(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' '));

const g = process.argv[2];
const out = {};
for (const p of groups[g]) {
  const html = fs.readFileSync('public/' + (p === '_chrome' ? 'index' : p) + '.html', 'utf8');
  if (p === '_chrome') {
    // Cabecera + menú + pie (compartidos por todas las páginas)
    out[p] = text(html.replace(/<main>[\s\S]*<\/main>/, ' '));
  } else out[p] = text(html.match(/<main>([\s\S]*)<\/main>/)[1]);
}
fs.writeFileSync(`src/figma-export/corpus-${g}.json`, JSON.stringify(out));
console.log(g, Object.keys(out).length, JSON.stringify(out).length);
