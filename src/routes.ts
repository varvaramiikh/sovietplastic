/**
 * Маршруты приложения. Имена страниц совпадают с файлами Claude Design (original-export/project/*.dc.html).
 * Переходы между страницами — обычные ссылки <a href>, с полной загрузкой страницы, как переходы между
 * артбордами в Claude Design: у каждой страницы своё состояние, общие данные лежат в localStorage.
 */
export const ROUTES = {
  Main: '/',
  Catalog: '/catalog',
  Figurine: '/figurine',
  Carbolite: '/carbolite',
  Materials: '/articles',
  Article: '/article',
  Login: '/login',
  Account: '/account',
  Admin: '/admin',
} as const;

/** Служебные маршруты — отдельные «доски» компонентов, как на холсте Claude Design. */
export const DESIGN_ROUTES = {
  SiteHeader: '/_design/site-header',
  SiteFooter: '/_design/site-footer',
} as const;

/** «Catalog.dc.html#x» → «/catalog#x». Остальные адреса возвращаются без изменений. */
export function toRoute(href: string): string {
  const m = href.match(/^(?:\.\/|\/)?([A-Z][A-Za-z]*)\.dc\.html(#.*)?$/);
  if (!m) return href;
  const base = (ROUTES as Record<string, string>)[m[1]];
  if (!base) return href;
  return m[2] ? (base === '/' ? '/' + m[2] : base + m[2]) : base;
}
