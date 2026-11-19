import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { createRequire } from 'node:module';
import { existsSync, readFileSync } from 'node:fs';
const require = createRequire(import.meta.url);
for (const base of ['/', '/sovietplastic/']) {
 const result = await build({ stdin: { contents: `export { publicUrl, routePath, isStaticDemo } from './src/runtime/urls.ts';`, resolveDir: process.cwd() }, bundle: true, format: 'cjs', platform: 'node', write: false, define: { 'import.meta.env': JSON.stringify({ BASE_URL: base, VITE_STATIC_DEMO: base !== '/' ? 'true' : 'false' }) } });
 const mod = { exports: {} }; new Function('module', 'exports', 'require', result.outputFiles[0].text)(mod, mod.exports, require);
 const { publicUrl, routePath, isStaticDemo } = mod.exports;
 assert.equal(publicUrl('/catalog?kind=1#top'), base + 'catalog?kind=1#top');
 assert.equal(publicUrl('/images/logo-accent.svg'), base + 'images/logo-accent.svg');
 assert.equal(publicUrl(base + 'catalog'), base + 'catalog');
 for (const url of ['https://example.com/pic.svg', '//example.com/pic.svg', 'data:image/png;base64,abc', '#top', 'mailto:test@example.com']) assert.equal(publicUrl(url), url);
 assert.equal(routePath(base + 'catalog/'), '/catalog');
 assert.equal(routePath(base), '/');
 assert.equal(isStaticDemo, base !== '/');
}
const routes = [...readFileSync('src/routes.ts', 'utf8').matchAll(/:\s*'([^']+)'/g)].map(match => match[1]).filter(route => route.startsWith('/'));
for (const route of routes) {
 const html = readFileSync('dist' + (route === '/' ? '' : route) + '/index.html', 'utf8');
 for (const [, url] of html.matchAll(/(?:src|href)="(\/sovietplastic\/assets\/[^\"]+)"/g)) assert.ok(existsSync('dist/' + url.slice('/sovietplastic/'.length)), url);
 assert.ok(html.includes('/sovietplastic/assets/'));
}
for (const file of ['404.html', '.nojekyll', 'images/logo-accent.svg']) assert.ok(existsSync('dist/' + file));
console.log('OK: root and repository URL handling, external URLs, all static route entry points and built assets.');
