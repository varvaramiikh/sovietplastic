import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
// Use the actual route table so new pages also receive a static entry point.
const routes = [...readFileSync('src/routes.ts', 'utf8').matchAll(/:\s*'([^']+)'/g)].map(match => match[1]);
const html = readFileSync('dist/index.html', 'utf8');
for (const route of routes.filter(route => route.startsWith('/') && route !== '/')) {
  if (!/^\/[a-z0-9_/-]+$/i.test(route) || route.includes('..')) throw new Error('Invalid page route');
  const folder = 'dist' + route;
  mkdirSync(folder, { recursive: true });
  writeFileSync(folder + '/index.html', html);
}
writeFileSync('dist/404.html', html);
writeFileSync('dist/.nojekyll', '');
console.log('GitHub Pages entry points generated.');
