// @ts-nocheck
import Image from '../../components/ui/Image/Image.tsx';
import Button from '../../components/ui/Button/Button.tsx';
import Link from '../../components/ui/Link/Link.tsx';
/* Сгенерировано из original-export/project/Admin.dc.html (разметка внутри <x-dc>) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { Fragment } from 'react';
import { __s, __css, __raw, __href } from '../../runtime/dc';
import SectionSDash from './sections/SectionSDash/SectionSDash.tsx';
import SectionSList from './sections/SectionSList/SectionSList.tsx';
import SectionSFigure from './sections/SectionSFigure/SectionSFigure.tsx';
import SectionSInfo from './sections/SectionSInfo/SectionSInfo.tsx';
import SectionSDict from './sections/SectionSDict/SectionSDict.tsx';
import SectionSUser from './sections/SectionSUser/SectionSUser.tsx';
import SectionMOpen from './sections/SectionMOpen/SectionMOpen.tsx';
import SectionVOpen from './sections/SectionVOpen/SectionVOpen.tsx';
import SectionConfirmOpen from './sections/SectionConfirmOpen/SectionConfirmOpen.tsx';

/** Разметка. $v — значения из renderVals() логики страницы. */
function View({ $v }: { $v: any }) {
  return (
    <>
      {' '}
      {$v?.loading ? (
        <>
          <div className="a-gate">
            <p style={{ margin: '0', fontSize: '17px', color: '#4E6488' }}>Загружаем данные…</p>
          </div>
        </>
      ) : null}{' '}
      {$v?.loadError ? (
        <>
          <div className="a-gate">
            <div style={{ maxWidth: '460px' }}>
              <h1 style={{ margin: '0', fontSize: '28px', fontWeight: '500', textTransform: 'uppercase' }}>
                Не удалось загрузить
              </h1>
              <p style={{ margin: '14px 0 0', fontSize: '16px', lineHeight: '24px', color: '#3E4A60' }}>
                {$v?.loadErrorText}
              </p>
            </div>
          </div>
        </>
      ) : null}{' '}
      {$v?.denied ? (
        <>
          <div className="a-gate">
            <div style={{ maxWidth: '460px' }}>
              <p
                style={{
                  margin: '0',
                  fontSize: '12px',
                  fontWeight: '500',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#4E6488',
                }}
              >
                КарболитЪ · Админ-панель
              </p>
              <h1
                style={{
                  margin: '12px 0 0',
                  fontSize: '32px',
                  fontWeight: '500',
                  lineHeight: '1.1',
                  textTransform: 'uppercase',
                }}
              >
                Нет доступа
              </h1>
              <p style={{ margin: '14px 0 0', fontSize: '16px', lineHeight: '24px', color: '#3E4A60' }}>
                {$v?.deniedText}
              </p>
              <div
                style={{ marginTop: '28px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
              >
                <Link href="/login" className="a-btn">
                  Войти на сайте
                </Link>
                <Link href="/account" className="a-ghost">
                  Личный кабинет
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}{' '}
      {$v?.ready ? (
        <>
          {' '}
          {$v?.ddOpen ? (
            <>
              <Button
                type="button"
                className="a-dd-shade"
                aria-label="Закрыть список"
                tabIndex="-1"
                onClick={$v?.ddClose}
              ></Button>
            </>
          ) : null}{' '}
          <header className="a-topbar">
            {' '}
            <Button type="button" className="a-brand" onClick={$v?.goHome} title="Обзор админ-панели">
              <Image src="/images/logo-white.svg" alt="" style={{ height: '30px', width: 'auto' }} />
              <span>
                КарболитЪ
                <small>Админ-панель</small>
              </span>
            </Button>{' '}
            <div className="a-me">
              {' '}
              <Button
                type="button"
                className="a-ava"
                aria-label="Профиль"
                aria-haspopup="menu"
                aria-expanded={$v?.me?.exp}
                onClick={$v?.me?.toggle}
              >
                {$v?.me?.hasAvatar ? (
                  <>
                    <Image src={$v?.me?.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </>
                ) : null}
                {$v?.me?.noAvatar ? (
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
                ) : null}
              </Button>{' '}
              {$v?.me?.open ? (
                <>
                  <div className="a-me-menu" role="menu">
                    <p className="a-me-who">
                      {$v?.me?.name}
                      <small>{$v?.me?.email}</small>
                    </p>{' '}
                    <Link href="/account" role="menuitem" className="a-me-item">
                      Личный кабинет
                    </Link>{' '}
                    <Link href="/" role="menuitem" className="a-me-item">
                      Открыть сайт
                    </Link>{' '}
                    <Button type="button" role="menuitem" className="a-me-item" onClick={$v?.logout}>
                      Выйти
                    </Button>{' '}
                  </div>
                </>
              ) : null}{' '}
            </div>
          </header>
          <div className="a-app">
            <aside className="a-side" aria-label="Разделы админ-панели">
              <nav className="a-nav">
                {' '}
                <Link href="/" className="a-navi a-navi-site">
                  <span>Открыть сайт</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    aria-hidden="true"
                  >
                    <path d="M3 9l6-6M4 3h5v5"></path>
                  </svg>
                </Link>{' '}
                {($v?.nav || []).map((n, $index) => (
                  <Fragment key={$index}>
                    {' '}
                    {n?.head ? (
                      <>
                        <p className="a-navh">{n?.label}</p>
                      </>
                    ) : null}{' '}
                    {n?.item ? (
                      <>
                        <Button
                          type="button"
                          className={`a-navi ${__s(n?.cls)}`}
                          aria-current={n?.current}
                          onClick={n?.go}
                        >
                          <span>{n?.label}</span>
                          <b>{n?.count}</b>
                        </Button>
                      </>
                    ) : null}{' '}
                  </Fragment>
                ))}{' '}
              </nav>
              <p className="a-side-copy">SovietPlastic © 2019–2026</p>
            </aside>
            <main className="a-main">
              {' '}
              {$v?.previewNote ? (
                <>
                  <p className="a-note" style={{ margin: '0 0 24px' }}>
                    Предпросмотр холста: вход не выполнен, данные показаны от имени администратора. На сайте без входа
                    эта страница закрыта.
                  </p>
                </>
              ) : null}{' '}
              {$v?.s?.dash ? <SectionSDash $v={$v} /> : null} {$v?.s?.list ? <SectionSList $v={$v} /> : null}{' '}
              {$v?.s?.figure ? <SectionSFigure $v={$v} /> : null} {$v?.s?.info ? <SectionSInfo $v={$v} /> : null}{' '}
              {$v?.s?.dict ? <SectionSDict $v={$v} /> : null} {$v?.s?.user ? <SectionSUser $v={$v} /> : null}{' '}
            </main>
          </div>{' '}
          {$v?.M?.open ? <SectionMOpen $v={$v} /> : null} {$v?.V?.open ? <SectionVOpen $v={$v} /> : null}{' '}
        </>
      ) : null}{' '}
      {$v?.confirm?.open ? <SectionConfirmOpen $v={$v} /> : null}{' '}
      {$v?.toast?.on ? (
        <>
          <div className={`a-toast ${__s($v?.toast?.cls)}`} role="status">
            {$v?.toast?.text}
          </div>
        </>
      ) : null}{' '}
    </>
  );
}

/* Сгенерировано из original-export/project/Admin.dc.html инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { definePage } from '../../runtime/definePage';
import Logic from './Admin';
import css from './Admin.css?raw';

/** Страница «КарболитЪ — админ-панель». defaults — значения настроек (Tweaks) из data-props оригинала. */
export default definePage(Logic, View, css, {
  title: 'КарболитЪ — админ-панель',
  defaults: {
    canvasPreview: true,
  },
  preview: {
    width: 1440,
    height: 1400,
  },
});
