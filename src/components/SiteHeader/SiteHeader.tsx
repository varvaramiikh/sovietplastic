// @ts-nocheck
import Image from '../ui/Image/Image.tsx';
import Button from '../ui/Button/Button.tsx';
import Link from '../ui/Link/Link.tsx';
/* Сгенерировано из original-export/project/SiteHeader.dc.html (разметка внутри <x-dc>) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { Fragment } from 'react';
import { __s, __css, __raw, __href } from '../../runtime/dc';

/** Разметка. $v — значения из renderVals() логики страницы. */
function View({ $v }: { $v: any }) {
  return (
    <>
      <header
        style={{
          fontFamily: "'Onest', system-ui, sans-serif",
          color: '#252932',
          padding: '16px 48px 0',
          boxSizing: 'border-box',
          width: '100%',
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            paddingBottom: '14px',
            borderBottom: '1px solid #C9D1DB',
          }}
        >
          {' '}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '19px',
              fontWeight: '400',
              letterSpacing: '-0.01em',
              color: '#252932',
              textDecoration: 'none',
            }}
          >
            {' '}
            <Image src="/images/logo-accent.svg" alt="" style={{ height: '38px', width: 'auto' }} />{' '}
            <span>Советский пластик</span>{' '}
          </Link>{' '}
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <nav
              aria-label="Основное меню"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '38px',
                fontSize: '13px',
                fontWeight: '500',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              {' '}
              {($v?.links || []).map((link, $index) => (
                <Fragment key={$index}>
                  {' '}
                  <Link
                    href={__href(link?.href)}
                    className="sp-navlink"
                    style={{ position: 'relative', padding: '6px 0', color: '#252932', textDecoration: 'none' }}
                  >
                    {link?.label}
                    {link?.active ? (
                      <>
                        <span
                          style={{
                            position: 'absolute',
                            left: '0',
                            right: '0',
                            bottom: '-3px',
                            height: '1px',
                            background: '#A9B9D2',
                          }}
                        ></span>
                      </>
                    ) : null}
                  </Link>{' '}
                </Fragment>
              ))}{' '}
            </nav>{' '}
            {$v?.signedOut ? (
              <>
                {' '}
                <Link
                  href="/login"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    height: '40px',
                    padding: '0 18px',
                    border: '1px solid #C9D1DB',
                    borderRadius: '6px',
                    background: 'transparent',
                    color: '#1B2A41',
                    fontFamily: 'inherit',
                    fontSize: '13px',
                    fontWeight: '500',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    boxSizing: 'border-box',
                  }}
                >
                  Войти
                </Link>{' '}
              </>
            ) : null}{' '}
            {$v?.signedIn ? (
              <>
                <div style={{ position: 'relative' }}>
                  {' '}
                  <Button
                    type="button"
                    aria-label="Профиль"
                    aria-haspopup="menu"
                    aria-expanded={$v?.menuExpanded}
                    onClick={$v?.toggleMenu}
                    style={{
                      width: '40px',
                      height: '40px',
                      padding: '0',
                      border: '1px solid #C9D1DB',
                      borderRadius: '50%',
                      background: '#F8FAFD',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxSizing: 'border-box',
                    }}
                  >
                    {' '}
                    {$v?.hasAvatar ? (
                      <>
                        <Image src={$v?.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </>
                    ) : null}{' '}
                    {$v?.noAvatar ? (
                      <>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#1B2A41"
                          strokeWidth="1.5"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="8.5" r="4"></circle>
                          <path d="M4 21c0-4.4 3.6-7.5 8-7.5s8 3.1 8 7.5" strokeLinecap="round"></path>
                        </svg>
                      </>
                    ) : null}{' '}
                  </Button>{' '}
                  {$v?.menuOpen ? (
                    <>
                      <div
                        role="menu"
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 8px)',
                          right: '0',
                          zIndex: '50',
                          minWidth: '200px',
                          padding: '6px',
                          background: '#FFFFFF',
                          border: '1px solid #DCE2EA',
                          borderRadius: '8px',
                          boxShadow: '0 12px 32px rgba(27, 42, 65, 0.12)',
                          boxSizing: 'border-box',
                        }}
                      >
                        {' '}
                        <Link
                          href="/account"
                          role="menuitem"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '40px',
                            padding: '0 12px',
                            borderRadius: '6px',
                            color: '#252932',
                            fontSize: '15px',
                            textDecoration: 'none',
                          }}
                        >
                          Личный кабинет
                        </Link>{' '}
                        <Button
                          type="button"
                          role="menuitem"
                          onClick={$v?.signOut}
                          style={{
                            width: '100%',
                            height: '40px',
                            padding: '0 12px',
                            border: '0',
                            borderRadius: '6px',
                            background: 'transparent',
                            color: '#252932',
                            fontFamily: 'inherit',
                            fontSize: '15px',
                            textAlign: 'left',
                            cursor: 'pointer',
                          }}
                        >
                          Выйти
                        </Button>{' '}
                      </div>
                    </>
                  ) : null}{' '}
                </div>
              </>
            ) : null}{' '}
          </div>
        </div>
      </header>
    </>
  );
}

/* Сгенерировано из original-export/project/SiteHeader.dc.html инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { definePage } from '../../runtime/definePage';
import Logic from './SiteHeader';
import css from './SiteHeader.css?raw';

/** Компонент «Шапка сайта». defaults — значения настроек (Tweaks) из data-props оригинала. */
export default definePage(
  Logic,
  View,
  css,
  {
    title: 'Шапка сайта',
    defaults: {
      current: '',
      signedIn: false,
    },
    preview: {
      width: 1440,
      height: 71,
    },
  },
  { component: true },
);
