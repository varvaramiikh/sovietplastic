// @ts-nocheck
import Link from '../ui/Link/Link.tsx';
/* Сгенерировано из original-export/project/SiteFooter.dc.html (разметка внутри <x-dc>) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { Fragment } from 'react';
import { __s, __css, __raw, __href } from '../../runtime/dc';

/** Разметка. $v — значения из renderVals() логики страницы. */
function View({ $v }: { $v: any }) {
  return (
    <>
      <footer
        style={{
          fontFamily: "'Onest', system-ui, sans-serif",
          color: '#FFFFFF',
          background: '#1B2A41',
          padding: '40px 48px 24px',
          boxSizing: 'border-box',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px 56px',
          }}
        >
          {' '}
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              color: '#FFFFFF',
              textDecoration: 'none',
            }}
          >
            {' '}
            <img src="/images/logo-white.svg" alt="" style={{ height: '44px', width: 'auto' }} />{' '}
            <span style={{ fontSize: '22px', fontWeight: '500', letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
              {'Советский '}
              <span style={{ color: '#A9B9D2' }}>пластик</span>
            </span>{' '}
          </Link>{' '}
          <nav
            aria-label="Меню в подвале"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '32px',
              fontSize: '13px',
              fontWeight: '500',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            {' '}
            <Link href="/catalog" className="sp-navlink" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
              Коллекция
            </Link>{' '}
            <Link href="/articles" className="sp-navlink" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
              Статьи
            </Link>{' '}
          </nav>
        </div>
        <p
          style={{
            margin: '32px 0 0',
            paddingTop: '18px',
            borderTop: '1px solid rgba(169, 185, 210, 0.3)',
            fontSize: '13px',
            lineHeight: '18px',
            color: '#A9B9D2',
          }}
        >
          © 2026 Советский пластик. Частная коллекция карболитовых статуэток.
        </p>
      </footer>
    </>
  );
}

/* Сгенерировано из original-export/project/SiteFooter.dc.html инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { definePage } from '../../runtime/definePage';
import Logic from './SiteFooter';
import css from './SiteFooter.css?raw';

/** Компонент «Подвал сайта». defaults — значения настроек (Tweaks) из data-props оригинала. */
export default definePage(
  Logic,
  View,
  css,
  {
    title: 'Подвал сайта',
    defaults: {},
    preview: {
      width: 1440,
      height: 176,
    },
  },
  { component: true },
);
