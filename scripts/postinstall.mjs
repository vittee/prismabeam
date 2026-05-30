import { copyFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const src = join(root, 'node_modules/@tensorflow/tfjs-node/deps/lib');
const libRoot = join(root, 'node_modules/@tensorflow/tfjs-node/lib');

if (!existsSync(src)) process.exit(0);
if (!existsSync(libRoot)) process.exit(0);

const files = readdirSync(src).filter(f => {
  const ext = extname(f).toLowerCase();
  return ext === '.dll' || ext === '.so' || f.includes('.so.');
});

const dirs = readdirSync(libRoot, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

for (const dir of dirs) {
  const dest = join(libRoot, dir);
  for (const file of files) {
    const from = join(src, file);
    const to = join(dest, file);
    copyFileSync(from, to);
    console.log(`copied ${file} -> lib/${dir}/`);
  }
}
