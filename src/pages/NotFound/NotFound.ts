import { ROUTES } from '../../routes';

export function getNotFoundData() {
  return { pathname: window.location.pathname, links: Object.entries(ROUTES) };
}
