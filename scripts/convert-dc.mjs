/*
 * Одноразовый инструмент миграции: превращает исходные файлы Claude Design (*.dc.html)
 * из original-export/project в React-компоненты (src/...).
 *
 * Как он работал при экспорте:
 *   node scripts/convert-dc.mjs
 * После экспорта сгенерированные файлы — обычный исходный код проекта: правьте их напрямую.
 * Повторный запуск ПЕРЕЗАПИШЕТ src/pages, src/components/SiteHeader|SiteFooter и сгенерированные
 * файлы в src/data и src/features — делайте это только осознанно.
 *
 * Зависимости инструмента (parse5, acorn) стоят в devDependencies.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';
import * as acorn from 'acorn';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = path.join(ROOT, 'original-export', 'project');
const OUT = path.join(ROOT, 'src');

// ---------- соответствия ----------
export const ROUTES = {
  Main: '/', Catalog: '/catalog', Figurine: '/figurine', Carbolite: '/carbolite', Materials: '/articles',
  Article: '/article', Login: '/login', Account: '/account', Admin: '/admin',
};
const BLOBS = {
  '450b2160012cd8f6c7fdb8f130e8930a': '/images/logo-accent.svg',
  'ead7ee690ae7a722a357b0be0559583f': '/images/logo-white.svg',
  '71c672eab5ec5354e8696155720ef67e': '/images/placeholder-ballerina.svg',
  '1abde048756c885343125ae104d78e21': '/images/placeholder-boxer.svg',
  '6093db140d0917325323fbdbf569d997': '/images/placeholder-skater.svg',
};
function fixRefs(text) {
  text = text.replace(/\/_blob\/([0-9a-f]{32})/g, (m, id) => {
    if (!BLOBS[id]) throw new Error('Неизвестный ресурс ' + m);
    return BLOBS[id];
  });
  text = text.replace(/\b([A-Z][A-Za-z]*)\.dc\.html(#[\w-]*)?/g, (m, name, hash) => {
    if (!(name in ROUTES)) return m;
    const r = ROUTES[name];
    return hash ? (r === '/' ? '/' + hash : r + hash) : r;
  });
  return text;
}

const BOOL_ATTRS = new Set(['multiple', 'disabled', 'checked', 'selected', 'readonly', 'required', 'autofocus', 'hidden', 'open', 'novalidate']);
const ATTR_MAP = {
  class: 'className', for: 'htmlFor', tabindex: 'tabIndex', autocomplete: 'autoComplete', inputmode: 'inputMode',
  maxlength: 'maxLength', minlength: 'minLength', readonly: 'readOnly', colspan: 'colSpan', rowspan: 'rowSpan',
  crossorigin: 'crossOrigin', srcset: 'srcSet', spellcheck: 'spellCheck', autofocus: 'autoFocus', enterkeyhint: 'enterKeyHint',
  novalidate: 'noValidate', datetime: 'dateTime', 'accept-charset': 'acceptCharset', 'http-equiv': 'httpEquiv',
  onclick: 'onClick', onchange: 'onChange', oninput: 'onInput', onkeydown: 'onKeyDown', onkeyup: 'onKeyUp',
  onsubmit: 'onSubmit', onfocus: 'onFocus', onblur: 'onBlur', onmouseenter: 'onMouseEnter', onmouseleave: 'onMouseLeave',
};
const BLOCK = new Set(['div', 'section', 'main', 'header', 'footer', 'nav', 'article', 'aside', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li', 'dl', 'dt', 'dd', 'figure', 'figcaption', 'form', 'fieldset', 'table', 'blockquote', 'hr', 'helmet', 'style', 'link',
  'script', 'dc-import', 'thead', 'tbody', 'tr', 'td', 'th', 'x-dc', 'body']);
const NO_TEXT = new Set(['table', 'thead', 'tbody', 'tfoot', 'tr', 'colgroup', 'svg', 'g', 'defs', 'path', 'circle', 'rect', 'ellipse', 'line', 'polyline', 'polygon']);

const HOLE = /\{\{\s*([^{}]+?)\s*\}\}/g;
const camel = (s) => s.replace(/^-ms-/, 'ms-').replace(/-([a-z])/g, (m, c) => c.toUpperCase()).replace(/^Webkit/, 'Webkit');

function exprFor(p, scope) {
  p = p.trim();
  if (/^(true|false|null|undefined)$/.test(p) || /^-?\d+(\.\d+)?$/.test(p)) return p;
  if (/^'.*'$/.test(p) || /^".*"$/.test(p)) return JSON.stringify(p.slice(1, -1));
  if (!/^[\w$]+(\.[\w$]+)*$/.test(p)) throw new Error('Не путь: ' + p);
  const segs = p.split('.');
  const head = scope.includes(segs[0]) ? segs[0] : '$v?.' + segs[0];
  return [head, ...segs.slice(1)].join('?.');
}
// строка с дырками -> JS-выражение (шаблонная строка) или сырое значение
function attrExpr(value, scope) {
  const whole = value.match(/^\s*\{\{\s*([^{}]+?)\s*\}\}\s*$/);
  if (whole) return { raw: true, js: exprFor(whole[1], scope) };
  if (!HOLE.test(value)) { HOLE.lastIndex = 0; return { literal: true, value }; }
  HOLE.lastIndex = 0;
  let out = '`', last = 0, m;
  while ((m = HOLE.exec(value))) {
    out += value.slice(last, m.index).replace(/[`\\$]/g, (c) => '\\' + c);
    out += '${__s(' + exprFor(m[1], scope) + ')}';
    last = m.index + m[0].length;
  }
  out += value.slice(last).replace(/[`\\$]/g, (c) => '\\' + c) + '`';
  return { js: out };
}
function splitDecls(css) {
  const out = []; let depth = 0, q = null, cur = '';
  for (const ch of css) {
    if (q) { cur += ch; if (ch === q) q = null; continue; }
    if (ch === '"' || ch === "'") { q = ch; cur += ch; continue; }
    if (ch === '(') depth++; if (ch === ')') depth--;
    if (ch === ';' && depth === 0) { out.push(cur); cur = ''; continue; }
    cur += ch;
  }
  if (cur.trim()) out.push(cur);
  return out.map((d) => d.trim()).filter(Boolean);
}
function styleObject(css) {
  const parts = [];
  for (const d of splitDecls(css)) {
    const i = d.indexOf(':'); if (i < 0) continue;
    const k = d.slice(0, i).trim(), val = d.slice(i + 1).trim();
    const key = k.startsWith('--') ? k : camel(k.toLowerCase());
    parts.push(JSON.stringify(key) + ': ' + JSON.stringify(val));
  }
  return '{ ' + parts.join(', ') + ' }';
}

function attrsToJsx(node, scope, ctx) {
  const out = [];
  const isInput = node.tagName === 'input' || node.tagName === 'textarea';
  const hasChange = node.attrs.some((a) => a.name === 'onchange' || a.name === 'oninput');
  for (const a of node.attrs) {
    let name = a.name;
    if (name.startsWith('hint-') || name === 'data-dc-script' || name === 'data-props') continue;
    if (name === 'style') {
      const ex = attrExpr(a.value, scope);
      if (ex.literal) {
        if (/!important/.test(a.value)) out.push('ref={__raw(' + JSON.stringify(a.value) + ')}');
        else out.push('style={' + styleObject(a.value) + '}');
      } else if (/!important/.test(a.value)) out.push('ref={__raw(' + ex.js + ')}');
      else out.push('style={__css(' + ex.js + ')}');
      continue;
    }
    let jsxName = ATTR_MAP[name] || name;
    if (!ATTR_MAP[name] && name.includes('-') && !/^(aria|data)-/.test(name)) jsxName = camel(name);
    if (name.includes(':')) jsxName = camel(name.replace(':', '-'));
    const ex = attrExpr(a.value, scope);
    if (ex.literal) {
      if (BOOL_ATTRS.has(name)) {
        if (name === 'checked' && !hasChange) { out.push('defaultChecked'); continue; }
        out.push(jsxName === name ? name.replace(/^readonly$/, 'readOnly').replace(/^autofocus$/, 'autoFocus') : jsxName); continue;
      }
      let v = a.value;
      if (name === 'href' || name === 'src') v = fixRefs(v);
      if (name === 'value' && isInput && !hasChange) { out.push('defaultValue=' + JSON.stringify(v)); continue; }
      out.push(jsxName + '=' + (/["\\\n{}]/.test(v) ? '{' + JSON.stringify(v) + '}' : '"' + v.replace(/"/g, '&quot;') + '"'));
    } else {
      let js = ex.js;
      if (name === 'href') js = '__href(' + js + ')';
      out.push(jsxName + '={' + js + '}');
    }
  }
  return out;
}

function textToJsx(text, parent, prev, next) {
  const pt = parent && parent.tagName;
  if (!text.trim()) {
    if (NO_TEXT.has(pt)) return '';
    const blockish = (n) => !n || (n.tagName && BLOCK.has(n.tagName));
    if (BLOCK.has(pt) && blockish(prev) && blockish(next)) return '';
    if (blockish(prev) && blockish(next) && (prev || next)) return '';
    return '{" "}';
  }
  if (pt === 'textarea' || pt === 'pre') return '{' + JSON.stringify(text) + '}';
  return null; // обрабатывается с дырками
}

function textWithHoles(text, scope) {
  const out = []; let last = 0, m;
  const push = (t) => {
    if (!t) return;
    t = t.replace(/\s+/g, ' ');
    if (/[{}<>]/.test(t) || /^ | $/.test(t)) out.push('{' + JSON.stringify(t) + '}');
    else out.push(t);
  };
  HOLE.lastIndex = 0;
  while ((m = HOLE.exec(text))) { push(text.slice(last, m.index)); out.push('{' + exprFor(m[1], scope) + '}'); last = m.index + m[0].length; }
  push(text.slice(last));
  return out.join('');
}

function childrenToJsx(node, scope, ctx) {
  const kids = node.childNodes || (node.content && node.content.childNodes) || [];
  const elems = kids.filter((k) => k.nodeName !== '#comment');
  const parts = [];
  elems.forEach((k, i) => {
    if (k.nodeName === '#text') {
      const pre = textToJsx(k.value, node, elems[i - 1], elems[i + 1]);
      if (pre !== null) { if (pre) parts.push(pre); return; }
      parts.push(textWithHoles(k.value, scope));
      return;
    }
    const j = elemToJsx(k, scope, ctx);
    if (j) parts.push(j);
  });
  return parts.join('\n');
}

function elemToJsx(node, scope, ctx) {
  const tag = node.tagName;
  if (!tag) return '';
  if (tag === 'helmet') { collectHelmet(node, ctx); return ''; }
  if (tag === 'script') return '';
  const get = (n) => (node.attrs.find((a) => a.name === n) || {}).value;
  if (tag === 'sc-if') {
    const m = get('value').match(/^\s*\{\{\s*([^{}]+?)\s*\}\}\s*$/);
    const cond = exprFor(m[1], scope);
    const inner = childrenToJsx(node, scope, ctx) || 'null';
    const key = m[1].trim();
    if (ctx.split && scope.length === 0 && ctx.split(key)) {
      const comp = 'Section' + key.split('.').map((s) => s[0].toUpperCase() + s.slice(1)).join('');
      ctx.sections.push({ comp, key, body: inner });
      return '{' + cond + ' ? <' + comp + ' $v={$v} /> : null}';
    }
    return '{' + cond + ' ? (<>' + inner + '</>) : null}';
  }
  if (tag === 'sc-for') {
    const m = get('list').match(/^\s*\{\{\s*([^{}]+?)\s*\}\}\s*$/);
    const as = get('as') || 'item';
    const list = exprFor(m[1], scope);
    const inner = childrenToJsx(node, [...scope, as, '$index'], ctx) || 'null';
    return '{(' + list + ' || []).map((' + as + ', $index) => (<Fragment key={$index}>' + inner + '</Fragment>))}';
  }
  if (tag === 'dc-import') {
    const name = get('name');
    ctx.imports.add(name);
    const props = [];
    for (const a of node.attrs) {
      if (a.name === 'name' || a.name.startsWith('hint-')) continue;
      const ex = attrExpr(a.value, scope);
      const pn = camel(a.name);
      props.push(ex.literal ? pn + '=' + JSON.stringify(a.value) : pn + '={' + ex.js + '}');
    }
    return '<' + name + (props.length ? ' ' + props.join(' ') : '') + ' />';
  }
  const attrs = attrsToJsx(node, scope, ctx);
  const open = '<' + tag + (attrs.length ? ' ' + attrs.join(' ') : '');
  const VOID = new Set(['img', 'input', 'br', 'hr', 'meta', 'link', 'source', 'col', 'area', 'wbr']);
  if (VOID.has(tag)) return open + ' />';
  if (tag === 'textarea') {
    const t = (node.childNodes || []).map((c) => c.value || '').join('');
    return open + (t ? ' defaultValue={' + JSON.stringify(t) + '}' : '') + ' />';
  }
  const inner = childrenToJsx(node, scope, ctx);
  return inner ? open + '>' + inner + '</' + tag + '>' : open + '></' + tag + '>';
}

function collectHelmet(node, ctx) {
  for (const k of node.childNodes || []) {
    if (k.tagName === 'style') ctx.css.push((k.childNodes || []).map((c) => c.value).join(''));
    else if (k.tagName === 'link') {
      const href = (k.attrs.find((a) => a.name === 'href') || {}).value || '';
      ctx.links.push(href);
    }
  }
}

function findAll(node, pred, out = []) {
  if (pred(node)) out.push(node);
  for (const k of node.childNodes || []) findAll(k, pred, out);
  return out;
}

// ---------- логика ----------
function parseLogic(script) {
  const ast = acorn.parse(script, { ecmaVersion: 2022, sourceType: 'script' });
  const cls = ast.body.find((n) => n.type === 'ClassDeclaration');
  const methods = cls.body.body.map((m) => ({ name: m.key.name, src: script.slice(m.start, m.end), node: m }));
  return { methods, cls };
}
const indent = (s) => '  ' + s.replace(/\n/g, '\n');

function write(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
}

// ---------- основной проход ----------
const PAGES = ['Main', 'Catalog', 'Figurine', 'Carbolite', 'Materials', 'Article', 'Login', 'Account', 'Admin'];
const COMPONENTS = ['SiteHeader', 'SiteFooter'];
const all = [...PAGES, ...COMPONENTS];
const parsed = {};
for (const name of all) {
  const html = fs.readFileSync(path.join(SRC_DIR, name + '.dc.html'), 'utf8');
  const doc = parse(html);
  const title = (findAll(doc, (n) => n.tagName === 'title')[0]?.childNodes?.[0]?.value || '').trim();
  const xdc = findAll(doc, (n) => n.tagName === 'x-dc')[0];
  const scriptNode = findAll(doc, (n) => n.tagName === 'script' && n.attrs.some((a) => a.name === 'data-dc-script'))[0];
  const script = fixRefs(scriptNode.childNodes.map((c) => c.value).join(''));
  const propsDecl = JSON.parse(scriptNode.attrs.find((a) => a.name === 'data-props').value);
  parsed[name] = { html, doc, title, xdc, script, propsDecl, logic: parseLogic(script) };
}

// общие методы «Хочу купить / Есть в коллекции» — одинаковые на Main, Catalog, Figurine
const WISH_PAGES = ['Main', 'Catalog', 'Figurine'];
const wishShared = [];
for (const m of parsed.Main.logic.methods) {
  if (!m.name.startsWith('sp') || ['spFromDb', 'spItems'].includes(m.name)) continue;
  if (WISH_PAGES.every((p) => parsed[p].logic.methods.some((x) => x.name === m.name && x.src === m.src))) wishShared.push(m.name);
}
// spFromDb — одинаковый на 4 страницах и не использует this
const fromDbSrc = parsed.Main.logic.methods.find((m) => m.name === 'spFromDb').src;
const FROMDB_PAGES = ['Main', 'Catalog', 'Figurine', 'Account'].filter((p) => parsed[p].logic.methods.some((m) => m.name === 'spFromDb' && m.src === fromDbSrc));
if (/\bthis\b/.test(fromDbSrc)) throw new Error('spFromDb использует this');

const bodyOf = (src) => src.slice(src.indexOf('{') + 1, src.lastIndexOf('}'));
const generated = [];
function emit(file, text) { write(file, text); generated.push(path.relative(ROOT, file)); }

const HEADER = (what) => `/* Сгенерировано из original-export/project/${what} инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */\n`;

emit(path.join(OUT, 'data', 'figuresFromDb.ts'), HEADER('Main.dc.html (метод spFromDb, одинаковый на страницах ' + FROMDB_PAGES.join(', ') + ')') +
  `// @ts-nocheck\n/**\n * Читает статуэтки из демонстрационной базы в localStorage (ключ "sp-db"), схемы v2 (админка) и v1 (старая).\n * Возвращает null, если базы нет — тогда страница показывает свои демонстрационные карточки.\n * Здесь будет вызов API, когда появится сервер.\n */\nexport function readFiguresFromDb() {${bodyOf(fromDbSrc)}}\n`);

// базовый класс с общей логикой отметок
const wishMethods = parsed.Main.logic.methods.filter((m) => wishShared.includes(m.name)).map((m) => '  ' + m.src).join('\n');
emit(path.join(OUT, 'features', 'wishlist', 'WishlistLogic.ts'), HEADER('Main.dc.html, Catalog.dc.html, Figurine.dc.html (одинаковые методы)') +
  `// @ts-nocheck\nimport { DCLogic } from '../../runtime/DCLogic';\n\n/**\n * Общая логика «Хочу купить» / «Есть в коллекции» для карточек статуэток.\n * Данные хранятся в localStorage: sp-want, sp-have, sp-profile, sp-auth.\n */\nexport class WishlistLogic extends DCLogic {\n${wishMethods}\n}\n`);

function extractData(name, methodsToFns, fileBase, doc) {
  // methodsToFns: [[methodName, fnName]] — тела без this (кроме вызовов друг друга / spHash)
  const ms = parsed[name].logic.methods;
  const fns = [];
  const local = methodsToFns.map(([m]) => m);
  for (const [m, fn] of methodsToFns) {
    const src = ms.find((x) => x.name === m).src;
    const params = src.slice(src.indexOf('(') + 1, src.indexOf(')'));
    let body = bodyOf(src);
    for (const [m2, fn2] of methodsToFns) body = body.split('this.' + m2 + '(').join(fn2 + '(');
    if (/\bthis\b/.test(body)) throw new Error(name + '.' + m + ' использует this');
    fns.push(`export function ${fn}(${params}) {${body}}`);
  }
  emit(path.join(OUT, 'data', fileBase + '.ts'), HEADER(name + '.dc.html (' + local.join(', ') + ')') + '// @ts-nocheck\n' + (doc ? '/** ' + doc + ' */\n' : '') + fns.join('\n\n') + '\n');
  return methodsToFns;
}

const dataDelegates = {}; // page -> [[method, fn, module]]
dataDelegates.Admin = extractData('Admin', [['spHash', 'spHash'], ['spSeed', 'seedDemoDb'], ['spMigrate', 'migrateV1ToV2'], ['spReadDb', 'readDemoDb']], 'demoDb',
  'Демонстрационная база v2 (схема из karbolit-admin-structure.md): заполнение, перевод из v1, чтение из localStorage "sp-db". Только для демо-режима без сервера.')
  .map((x) => [...x, '../../data/demoDb']);
dataDelegates.Login = extractData('Login', [['spHash', 'spHash'], ['spSeed', 'seedLegacyDbV1'], ['spReadDb', 'readOrSeedLegacyDb']], 'legacyDbV1',
  'Старая демонстрационная база v1, которую создаёт страница входа, если базы ещё нет. Админка переводит её в v2 при первом открытии.')
  .map((x) => [...x, '../../data/legacyDbV1']);
dataDelegates.Materials = extractData('Materials', [['spArticles', 'readArticlesFromDb']], 'articlesFromDb',
  'Статьи из демонстрационной базы (db.infos в v2, db.articles в v1). null — базы нет, показываются демонстрационные карточки.')
  .map((x) => [...x, '../../data/articlesFromDb']);

// демонстрационные карточки (запасной вариант spItems)
for (const p of ['Main', 'Catalog', 'Figurine', 'Account']) {
  const m = parsed[p].logic.methods.find((x) => x.name === 'spItems');
  const body = bodyOf(m.src);
  const head = 'var fromDb = this.spFromDb(); if (fromDb) return fromDb;';
  const t = body.trim();
  if (!t.startsWith(head)) throw new Error(p + ': неожиданное начало spItems');
  const rest = t.slice(head.length);
  if (/\bthis\b/.test(rest)) throw new Error(p + ': spItems использует this');
  const fn = 'demo' + p + 'Figures';
  emit(path.join(OUT, 'data', 'demo', fn + '.ts'), HEADER(p + '.dc.html (spItems, запасные демонстрационные карточки)') +
    `// @ts-nocheck\n/** Демонстрационные карточки, которые страница показывает, пока в localStorage нет базы "sp-db". */\nexport function ${fn}() {\n    ${rest.trim()}\n}\n`);
  (dataDelegates[p] = dataDelegates[p] || []).push(['spItems', fn, '../../data/demo/' + fn, 'items']);
}

// ---------- страницы и компоненты ----------
const ADMIN_GROUPS = [
  ['AdminHelpers', 'helpers', (n) => ['boot', 'isDirty', 'nowIso', 'fmt', 'num', 'plural', 'norm', 'clone', 'find', 'nextId', 'stamp', 'svc', 'toast', 'persist', 'ask', 'guard', 'go', 'dd', 'menu', 'readImages', 'download', 'kindName', 'authorName', 'userName', 'figLabel', 'figPhotos', 'mainThumb', 'figTags', 'syncMain', 'curName', 'curOpts', 'secTitle', 'ls', 'setLs', 'openList'].includes(n), 'Сессия, общие помощники, выпадающие списки, загрузка фото, выгрузка CSV, справочные функции.'],
  ['AdminActions', 'actions', (n) => ['openForm', 'coll', 'setD', 'setF', 'validUrl', 'parseNum', 'saveForm', 'formFail', 'quickAdd', 'addPhotos', 'setMainPhoto', 'delPhoto', 'movePhoto', 'replacePhoto', 'delRecord', 'toggleVisible', 'openModal', 'setM', 'noteModal', 'photoModal', 'bindModal', 'saveModal', 'fmtBody', 'parseBody'].includes(n), 'Формы, сохранение с проверками, фотографии, удаление с последствиями, модальные окна, разметка статей.'],
  ['AdminLists', 'lists', (n) => n === 'buildList', 'Конфигурации всех списков: колонки, фильтры, сортировка, пагинация, экспорт.'],
];

for (const name of all) {
  const P = parsed[name];
  const isComp = COMPONENTS.includes(name);
  const dir = path.join(OUT, isComp ? 'components' : 'pages', name);
  const ctx = { css: [], links: [], imports: new Set(), sections: [], split: name === 'Admin' ? (k) => /^s\.\w+$/.test(k) || ['M.open', 'confirm.open', 'V.open'].includes(k) : null };
  const rootKids = P.xdc.childNodes;
  const fake = { tagName: 'x-dc', childNodes: rootKids, attrs: [] };
  let jsx = childrenToJsx(fake, [], ctx);
  // CSS
  const css = fixRefs(ctx.css.join('\n'));
  const fontLinks = ctx.links.filter((l) => !/fonts\.googleapis\.com\/?$/.test(l));
  for (const l of fontLinks) if (!/fonts\.googleapis\.com\/css2\?family=Onest:wght@200;300;400;500;600/.test(l)) throw new Error('Неожиданная ссылка ' + l);
  emit(path.join(dir, name + '.css'), `/* Стили страницы из <helmet> файла original-export/project/${name}.dc.html (без изменений, кроме путей к картинкам).\n   Подключаются только пока страница открыта — как в Claude Design, где у каждой страницы свой документ. */\n` + css + '\n');
  // view
  const imports = [...ctx.imports].map((c) => `import ${c} from '../../components/${c}';`).join('\n');
  const helpers = "import { __s, __css, __raw, __href } from '../../runtime/dc';";
  let sectionFiles = '';
  if (ctx.sections.length) {
    for (const s of ctx.sections) {
      emit(path.join(dir, 'sections', s.comp + '.tsx'), HEADER(name + '.dc.html (блок <sc-if value="{{ ' + s.key + ' }}">)') +
        `// @ts-nocheck\nimport { Fragment } from 'react';\nimport { __s, __css, __raw, __href } from '../../../runtime/dc';\n\nexport default function ${s.comp}({ $v }: { $v: any }) {\n  return (<>${s.body}</>);\n}\n`);
    }
    sectionFiles = ctx.sections.map((s) => `import ${s.comp} from './sections/${s.comp}';`).join('\n') + '\n';
  }
  emit(path.join(dir, name + '.view.tsx'), HEADER(name + '.dc.html (разметка внутри <x-dc>)') +
    `// @ts-nocheck\nimport { Fragment } from 'react';\n${helpers}\n${imports ? imports + '\n' : ''}${sectionFiles}\n/** Разметка. $v — значения из renderVals() логики страницы. */\nexport default function ${name}View({ $v }: { $v: any }) {\n  return (<>${jsx}</>);\n}\n`);
  // logic
  let methods = P.logic.methods;
  let base = 'DCLogic', baseImport = "import { DCLogic } from '../../runtime/DCLogic';";
  const delegates = dataDelegates[name] || [];
  const dataImports = [];
  if (WISH_PAGES.includes(name)) { methods = methods.filter((m) => !wishShared.includes(m.name)); base = 'WishlistLogic'; baseImport = "import { WishlistLogic } from '../../features/wishlist/WishlistLogic';"; }
  if (FROMDB_PAGES.includes(name)) { methods = methods.map((m) => m.name === 'spFromDb' ? { ...m, src: 'spFromDb() { return readFiguresFromDb(); }' } : m); dataImports.push("import { readFiguresFromDb } from '../../data/figuresFromDb';"); }
  for (const [m, fn, mod, kind] of delegates) {
    if (kind === 'items') {
      methods = methods.map((x) => x.name === m ? { ...x, src: `spItems() {\n    var fromDb = this.spFromDb(); if (fromDb) return fromDb;\n    return ${fn}();\n  }` } : x);
    } else {
      methods = methods.map((x) => { if (x.name !== m) return x; const params = x.src.slice(x.src.indexOf('(') + 1, x.src.indexOf(')')); return { ...x, src: `${m}(${params}) { return ${fn}(${params}); }` }; });
    }
    const line = `import { ${fn} } from '${mod}';`;
    if (!dataImports.some((d) => d.startsWith('import { ' + fn + ' }'))) dataImports.push(line);
  }
  // склеить импорты одного модуля
  const byMod = {};
  for (const d of dataImports) { const mm = d.match(/import \{ (\w+) \} from '([^']+)'/); (byMod[mm[2]] = byMod[mm[2]] || []).push(mm[1]); }
  const dataImp = Object.entries(byMod).map(([mod, fns]) => `import { ${[...new Set(fns)].join(', ')} } from '${mod}';`).join('\n');
  if (name === 'Admin') {
    let prev = 'DCLogic', prevImport = "import { DCLogic } from '../../../runtime/DCLogic';";
    const used = new Set();
    for (const [cls, file, pred, doc] of ADMIN_GROUPS) {
      const ms = methods.filter((m) => pred(m.name)); ms.forEach((m) => used.add(m.name));
      emit(path.join(dir, 'logic', file + '.ts'), HEADER('Admin.dc.html (часть класса Component)') +
        `// @ts-nocheck\n${prevImport}\n\n/** ${doc} */\nexport class ${cls} extends ${prev} {\n${ms.map((m) => '  ' + m.src).join('\n')}\n}\n`);
      prevImport = `import { ${cls} } from './${file}';`; prev = cls;
    }
    const rest = methods.filter((m) => !used.has(m.name));
    emit(path.join(dir, name + '.logic.ts'), HEADER('Admin.dc.html (класс Component, разбит на части в ./logic)') +
      `// @ts-nocheck\nimport { AdminLists } from './logic/lists';\n${dataImp}\n\n/** Админ-панель: конструктор, жизненный цикл и сбор значений для разметки. Цепочка: DCLogic → AdminHelpers → AdminActions → AdminLists → AdminLogic. */\nexport default class ${name}Logic extends AdminLists {\n${rest.map((m) => '  ' + m.src).join('\n')}\n}\n`);
  } else {
    emit(path.join(dir, name + '.logic.ts'), HEADER(name + '.dc.html (класс Component)') +
      `// @ts-nocheck\n${baseImport}\n${dataImp ? dataImp + '\n' : ''}\nexport default class ${name}Logic extends ${base} {\n${methods.map((m) => '  ' + m.src).join('\n')}\n}\n`);
  }
  // настройки (Tweaks)
  const defaults = {};
  for (const [k, v] of Object.entries(P.propsDecl)) if (k !== '$preview') defaults[k] = v.default;
  const meta = { title: P.title, defaults, preview: P.propsDecl.$preview || null };
  emit(path.join(dir, 'index.tsx'), HEADER(name + '.dc.html') +
    `import { definePage } from '../../runtime/definePage';\nimport Logic from './${name}.logic';\nimport View from './${name}.view';\nimport css from './${name}.css?raw';\n\n/** ${isComp ? 'Компонент' : 'Страница'} «${P.title}». defaults — значения настроек (Tweaks) из data-props оригинала. */\nexport default definePage(Logic, View, css, ${JSON.stringify(meta, null, 2).replace(/\n/g, '\n')}${isComp ? ', { component: true }' : ''});\n`);
}
write(path.join(ROOT, 'scripts', 'generated-files.txt'), generated.join('\n') + '\n');
console.log('Готово: ' + generated.length + ' файлов. Общие методы отметок: ' + wishShared.join(', '));
