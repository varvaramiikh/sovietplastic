import { lazy, type ComponentType } from 'react';
import { ROUTES, DESIGN_ROUTES } from '../routes';

type Loader = () => Promise<{ default: ComponentType }>;

/** Таблица маршрутов: адрес → страница. Страницы грузятся по требованию (отдельные файлы сборки). */
const PAGES: Record<string, Loader> = {
  [ROUTES.Main]: () => import('../pages/Main/Main.tsx'),
  [ROUTES.Catalog]: () => import('../pages/Catalog/Catalog.tsx'),
  [ROUTES.Figurine]: () => import('../pages/Figurine/Figurine.tsx'),
  [ROUTES.Carbolite]: () => import('../pages/Carbolite/Carbolite.tsx'),
  [ROUTES.Materials]: () => import('../pages/Materials/Materials.tsx'),
  [ROUTES.Article]: () => import('../pages/Article/Article.tsx'),
  [ROUTES.Login]: () => import('../pages/Login/Login.tsx'),
  [ROUTES.Account]: () => import('../pages/Account/Account.tsx'),
  [ROUTES.Admin]: () => import('../pages/Admin/Admin.tsx'),
  [DESIGN_ROUTES.SiteHeader]: () => import('../components/SiteHeader/SiteHeader.tsx'),
  [DESIGN_ROUTES.SiteFooter]: () => import('../components/SiteFooter/SiteFooter.tsx'),
};

const cache = new Map<string, ComponentType>();
export function pageFor(path: string): ComponentType | null {
  const load = PAGES[path];
  if (!load) return null;
  let C = cache.get(path);
  if (!C) {
    C = lazy(load);
    cache.set(path, C);
  }
  return C;
}

