/** Корневой путь локального сайта или проекта GitHub Pages. */
export function publicUrl(value?: string): string | undefined {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return value;
  const base = import.meta.env.BASE_URL;
  return base !== '/' && !value.startsWith(base) ? base + value.slice(1) : value;
}
export function routePath(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const local = base && (pathname === base || pathname.startsWith(base + '/')) ? pathname.slice(base.length) : pathname;
  return local.replace(/\/+$/, '') || '/';
}
export const isStaticDemo = import.meta.env.VITE_STATIC_DEMO === 'true';
