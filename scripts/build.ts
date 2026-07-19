import { execSync } from 'child_process';
import { cpSync, mkdirSync, writeFileSync, rmSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { PackageJson } from 'type-fest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dist = join(root, 'dist');

if (existsSync(dist)) {
  console.log('Cleaning...');
  rmSync(dist, { recursive: true });
}

console.log('Building main...');
execSync('pnpm exec tsc', { cwd: root, stdio: 'inherit' });

console.log('Building ui...');
execSync('pnpm --filter prismabeam-ui build', { cwd: root, stdio: 'inherit' });

const copy = (src: string, dst: string, recursive: boolean = false) => cpSync(join(root, src), join(dist, dst), { recursive: true });

console.log('Copying ui...');
copy('ui/dist', 'ui', true);

mkdirSync(join(dist, 'scripts'), { recursive: true });
copy('scripts/postinstall.mjs', 'scripts/postinstall.mjs');

const pkg = require('../package.json') as PackageJson;

const distPkg = {
  name: pkg.name,
  version: pkg.version,
  main: 'index.js',
  scripts: {
    postinstall: 'node scripts/postinstall.mjs',
  },
  dependencies: pkg.dependencies,
};

writeFileSync(join(dist, 'package.json'), JSON.stringify(distPkg, null, 2));
console.log('Done.');