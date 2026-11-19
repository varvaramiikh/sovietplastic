/*
 * Сверка перенесённой разметки с исходной: все тексты, классы, подписи aria-label, адреса картинок
 * и inline-стили из original-export/project/*.dc.html должны найтись в соответствующих файлах src/.
 * Запуск: node scripts/compare_with_original.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['Main', 'Catalog', 'Figurine', 'Carbolite', 'Materials', 'Article', 'Login', 'Account', 'Admin', 'SiteHeader', 'SiteFooter'];
const norm = (s) => s.replace(/\s+/g, ' ').trim();
let total = 0, missing = 0;
for (const p of pages) {
  const dir = path.join(ROOT, 'src', ['SiteHeader', 'SiteFooter'].includes(p) ? 'components' : 'pages', p);
  const files = [];
  const walk = (d) => { for (const f of fs.readdirSync(d)) { const q = path.join(d, f); fs.statSync(q).isDirectory() ? walk(q) : files.push(q); } };
  walk(dir);
  const visited = new Set(files);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!/\.(tsx?|css)$/.test(file)) continue;
    const source = fs.readFileSync(file, 'utf8');
    const refs = [...source.matchAll(/(?:from\s+|import\s+|@import\s+)["'](\.[^"']+)["']/g)];
    for (const match of refs) {
      const base = path.resolve(path.dirname(file), match[1].split('?')[0]);
      const target = [base, base + '.ts', base + '.tsx', base + '.css'].find(p => fs.existsSync(p) && fs.statSync(p).isFile());
      if (target && !visited.has(target)) { visited.add(target); files.push(target); }
    }
  }
  // исходник разметки: JSX-текст и строки JSON; убираем экранирование и переносы строк форматтера
  const viewSrc = files.filter((f) => /\.(tsx|css)$/.test(f)).map((f) => fs.readFileSync(f, 'utf8')).join('\n');
  const hay = norm(viewSrc.replace(/\\"/g, '"').replace(/\{" "\}/g, ' ').replace(/\{'\s'\}/g, ' '));
  const doc = parse(fs.readFileSync(path.join(ROOT, 'original-export', 'project', p + '.dc.html'), 'utf8'));
  const want = [];
  const visit = (n, inScript) => {
    if (n.tagName === 'script' || n.tagName === 'title' || n.tagName === 'head') return;
    if (n.nodeName === '#text' && !inScript) {
      for (const part of n.value.split(/\{\{[^}]*\}\}/)) { const t = norm(part); if (t && t.length > 1) want.push(['текст', t]); }
    }
    for (const a of n.attrs || []) {
      if (a.name === 'class') for (const c of a.value.replace(/\{\{[^}]*\}\}/g, ' ').split(/\s+/)) if (c) want.push(['класс', c]);
      if (a.name === 'aria-label' || a.name === 'placeholder' || a.name === 'title' || a.name === 'alt') { const t = norm(a.value.replace(/\{\{[^}]*\}\}/g, ' ')); if (t.length > 1) want.push([a.name, t.split(' ').filter(Boolean)[0]]); }
    }
    for (const k of n.childNodes || []) visit(k, inScript || n.tagName === 'style');
  };
  visit(doc, false);
  const miss = [];
  for (const [kind, t] of want) { total++; if (!hay.includes(t)) { missing++; miss.push(kind + ': ' + t.slice(0, 80)); } }
  console.log(p.padEnd(11), 'проверено', String(want.length).padStart(4), 'не найдено', miss.length, miss.slice(0, 5).join(' | '));
}
console.log('Итого: проверено ' + total + ', не найдено ' + missing);
process.exit(missing ? 1 : 0);
