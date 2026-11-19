import Link from '../../components/ui/Link/Link.tsx';
import { getNotFoundData } from './NotFound';
import './NotFound.css';

/**
 * Служебная заглушка для несуществующего адреса. В оригинале такой страницы не было:
 * в Claude Design переходы шли только между существующими артбордами.
 */
export default function NotFound() {
  const { pathname, links } = getNotFoundData();
  return (
    <div className="not-found">
      <h1 className="not-found__title">Страница не найдена</h1>
      <p className="not-found__message">Адрес {pathname} не входит в маршруты проекта.</p>
      <ul>
        {links.map(([name, href]) => (
          <li key={name}>
            <Link href={href}>{href}</Link> — {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
