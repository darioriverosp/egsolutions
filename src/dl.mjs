// Uso: node src/dl.mjs <prefix> name=hash.ext name2=hash.ext ...
import fs from 'node:fs';
const [prefix, ...pairs] = process.argv.slice(2);
const base = `https://www.figma.com/api/mcp/asset/${prefix}/`;
await Promise.all(pairs.map(async p => {
  const [name, file] = p.split('=');
  const ext = file.split('.').pop();
  const out = `assets/img/${name}.${ext}`;
  if (fs.existsSync(out)) return;
  const r = await fetch(base + file);
  if (!r.ok) { console.log('FAIL', name, r.status); return; }
  fs.writeFileSync(out, Buffer.from(await r.arrayBuffer()));
  console.log('ok', out);
}));
