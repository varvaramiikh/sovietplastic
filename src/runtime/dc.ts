import type { CSSProperties } from 'react';
import { toRoute } from '../routes';

/**
 * Помощники, которыми пользуется перенесённая разметка (*.view.tsx).
 * Они повторяют правила подстановок формата Claude Design:
 *   «a {{ x }} b» — строка с подстановкой, пустое значение даёт пустую строку.
 */

/** Значение для подстановки внутрь строки (class, aria-label, style…). */
export function __s(v: unknown): string {
  return v == null ? '' : String(v);
}

const cssCache = new Map<string, CSSProperties>();
/** Строка inline-стиля с подстановками → объект стиля React. */
export function __css(text: string): CSSProperties {
  const hit = cssCache.get(text);
  if (hit) return hit;
  const out: Record<string, string> = {};
  let depth = 0;
  let quote: string | null = null;
  let cur = '';
  const decls: string[] = [];
  for (const ch of text) {
    if (quote) {
      cur += ch;
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      cur += ch;
      continue;
    }
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ';' && depth === 0) {
      decls.push(cur);
      cur = '';
      continue;
    }
    cur += ch;
  }
  decls.push(cur);
  for (const d of decls) {
    const i = d.indexOf(':');
    if (i < 0) continue;
    const k = d.slice(0, i).trim();
    const v = d.slice(i + 1).trim();
    if (!k) continue;
    const key = k.startsWith('--')
      ? k
      : k
          .toLowerCase()
          .replace(/^-ms-/, 'ms-')
          .replace(/-([a-z])/g, (_m, c: string) => c.toUpperCase());
    out[key] = v;
  }
  cssCache.set(text, out as CSSProperties);
  return out as CSSProperties;
}

const rawCache = new Map<string, (el: HTMLElement | null) => void>();
/**
 * Inline-стиль с !important. Объект стиля React не умеет !important,
 * поэтому строка записывается в атрибут style как есть — так же, как в оригинале.
 */
export function __raw(text: string): (el: HTMLElement | null) => void {
  let fn = rawCache.get(text);
  if (!fn) {
    fn = (el) => {
      if (el) el.setAttribute('style', text);
    };
    rawCache.set(text, fn);
  }
  return fn;
}

/** Ссылка из данных: адреса вида «Catalog.dc.html» переводятся в маршруты приложения. */
export function __href(v: unknown): string | undefined {
  if (v == null) return undefined;
  return toRoute(String(v));
}
