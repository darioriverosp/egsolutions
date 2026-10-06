// Comprueba que cada href="/..." y cada imagen referenciada en public/ exista en disco.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('public');
const files = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) files.push(p);
  }
})(ROOT);

let errors = 0;
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const hrefs = [...html.matchAll(/(?:href|src)="(\/[^"]+)"/g)].map((m) => m[1]);
  for (const href of hrefs) {
    const clean = href.split('#')[0].split('?')[0];
    if (!clean) continue;
    const target = path.join(ROOT, clean);
    if (!fs.existsSync(target)) {
      console.log('✗', path.relative(ROOT, file), '->', href);
      errors++;
    }
  }
}
console.log(errors ? `\n${errors} enlaces/imágenes rotos.` : `\nOK: ${files.length} páginas, todos los enlaces e imágenes internos existen.`);
process.exit(errors ? 1 : 0);
