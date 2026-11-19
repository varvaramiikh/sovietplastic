// @ts-nocheck
import TextInput from '../../components/ui/TextInput/TextInput.tsx';
import Button from '../../components/ui/Button/Button.tsx';
import Link from '../../components/ui/Link/Link.tsx';
import FigureCard from '../../components/cards/FigureCard/FigureCard.tsx';
/* Сгенерировано из original-export/project/Account.dc.html (разметка внутри <x-dc>) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { Fragment } from 'react';
import { __s, __css, __raw, __href } from '../../runtime/dc';
import SiteHeader from '../../components/SiteHeader/SiteHeader.tsx';
import SiteFooter from '../../components/SiteFooter/SiteFooter.tsx';

/** Разметка. $v — значения из renderVals() логики страницы. */
function View({ $v }: { $v: any }) {
  return (
    <>
      <div
        style={{
          fontFamily: "'Onest', system-ui, sans-serif",
          color: '#252932',
          background: '#FFFFFF',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden',
        }}
      >
        <SiteHeader current="" />
        <main style={{ flex: 'none' }}>
          {' '}
          {$v?.guest ? (
            <>
              <section className="sp-wrap" style={{ padding: '48px 48px 0' }}>
                <div style={{ padding: '56px 40px', borderRadius: '8px', background: '#F8FAFD', textAlign: 'center' }}>
                  <p style={{ margin: '0', fontSize: '22px', fontWeight: '500' }}>Вы не вошли в аккаунт</p>
                  <p style={{ margin: '10px 0 0', fontSize: '16px', color: '#4E6488' }}>
                    Войдите или зарегистрируйтесь, чтобы открыть свою коллекцию.
                  </p>{' '}
                  <Link href="/login" className="sp-btn" style={{ marginTop: '28px', textDecoration: 'none' }}>
                    Войти
                    <svg
                      width="14"
                      height="12"
                      viewBox="0 0 14 12"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1.4"
                      aria-hidden="true"
                    >
                      <path d="M0 6h12.5M7.5 1l5 5-5 5"></path>
                    </svg>
                  </Link>{' '}
                </div>
              </section>
            </>
          ) : null}{' '}
          {$v?.signed ? (
            <>
              <section className="sp-wrap" style={{ padding: '48px 48px 0' }}>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: '32px',
                  }}
                >
                  <div>
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
                      {$v?.greeting}
                    </p>
                    <h1
                      style={{
                        margin: '16px 0 0',
                        fontSize: 'clamp(48px, 7vw, 104px)',
                        fontWeight: '500',
                        lineHeight: '0.85',
                        letterSpacing: '-0.03em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Моя коллекция
                    </h1>
                  </div>
                  <div className="sp-who">
                    <div className="sp-ava" style={{ width: '56px', height: '56px' }}>
                      {' '}
                      {$v?.hasAvatar ? (
                        <>
                          <img src={$v?.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </>
                      ) : null}{' '}
                      {$v?.noAvatar ? (
                        <>
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#4E6488"
                            strokeWidth="1.4"
                            aria-hidden="true"
                          >
                            <circle cx="12" cy="8.5" r="4"></circle>
                            <path d="M4 21c0-4.4 3.6-7.5 8-7.5s8 3.1 8 7.5" strokeLinecap="round"></path>
                          </svg>
                        </>
                      ) : null}{' '}
                    </div>
                    <div style={{ minWidth: '0' }}>
                      <p style={{ margin: '0', fontSize: '17px', fontWeight: '500', lineHeight: '22px' }}>
                        {$v?.displayName}
                      </p>
                      <p style={{ margin: '2px 0 0', fontSize: '14px', lineHeight: '20px', color: '#4E6488' }}>
                        {$v?.displayLogin}
                      </p>
                    </div>{' '}
                    <Button
                      type="button"
                      className="sp-ghost"
                      onClick={$v?.openEdit}
                      style={{ marginLeft: '8px', gap: '10px' }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        aria-hidden="true"
                      >
                        <path d="M10.5 2.5l3 3L5 14H2v-3z" strokeLinejoin="round"></path>
                      </svg>
                      Редактировать профиль
                    </Button>{' '}
                    {$v?.isAdmin ? (
                      <>
                        <Link
                          href="/admin"
                          className="sp-btn"
                          onClick={$v?.goAdmin}
                          style={{ height: '40px', padding: '0 16px', gap: '10px', textDecoration: 'none' }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="1.4"
                            aria-hidden="true"
                          >
                            <rect x="1.5" y="1.5" width="5" height="5" rx="1"></rect>
                            <rect x="9.5" y="1.5" width="5" height="5" rx="1"></rect>
                            <rect x="1.5" y="9.5" width="5" height="5" rx="1"></rect>
                            <rect x="9.5" y="9.5" width="5" height="5" rx="1"></rect>
                          </svg>
                          Админ-панель
                        </Link>
                      </>
                    ) : null}{' '}
                  </div>
                </div>
                <div className="sp-stats" role="tablist" aria-label="Папки коллекции" style={{ marginTop: '40px' }}>
                  {' '}
                  <Button
                    type="button"
                    role="tab"
                    className={`sp-stat ${__s($v?.wantTabCls)}`}
                    aria-selected={$v?.wantSel}
                    onClick={$v?.toWant}
                  >
                    {' '}
                    <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true" style={{ flex: 'none' }}>
                      <path
                        d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z"
                        fill="#B5656B"
                        stroke="#B5656B"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      ></path>
                    </svg>{' '}
                    <span style={{ flex: '1', minWidth: '0' }}>
                      <span className="sp-stat-l" style={{ display: 'block' }}>
                        Хочу купить
                      </span>
                      <span className="sp-stat-s" style={{ display: 'block' }}>
                        {$v?.budgetText}
                      </span>
                    </span>{' '}
                    <span className="sp-stat-n">{$v?.wantCount}</span>{' '}
                  </Button>{' '}
                  <Button
                    type="button"
                    role="tab"
                    className={`sp-stat ${__s($v?.haveTabCls)}`}
                    aria-selected={$v?.haveSel}
                    onClick={$v?.toHave}
                  >
                    {' '}
                    <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true" style={{ flex: 'none' }}>
                      <circle cx="12" cy="12" r="9.25" fill="#7D9584" stroke="#7D9584" strokeWidth="1.5"></circle>
                      <path
                        d="M8 12.3l2.7 2.7L16 9.6"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>{' '}
                    <span style={{ flex: '1', minWidth: '0' }}>
                      <span className="sp-stat-l" style={{ display: 'block' }}>
                        Есть в коллекции
                      </span>
                      <span className="sp-stat-s" style={{ display: 'block' }}>
                        {$v?.haveText}
                      </span>
                    </span>{' '}
                    <span className="sp-stat-n">{$v?.haveCount}</span>{' '}
                  </Button>{' '}
                </div>{' '}
                {$v?.isEmpty ? (
                  <>
                    <div
                      style={{
                        marginTop: '40px',
                        padding: '56px 32px',
                        background: '#F8FAFD',
                        borderRadius: '8px',
                        textAlign: 'center',
                      }}
                    >
                      <p style={{ margin: '0', fontSize: '22px', fontWeight: '500' }}>{$v?.emptyTitle}</p>
                      <p style={{ margin: '10px 0 0', fontSize: '16px', color: '#4E6488' }}>{$v?.emptyText}</p>{' '}
                      <Link
                        href="/catalog"
                        style={{
                          marginTop: '24px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '14px',
                          paddingBottom: '8px',
                          borderBottom: '2px solid #A9B9D2',
                          fontSize: '13px',
                          fontWeight: '500',
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Перейти в коллекцию
                        <svg
                          width="14"
                          height="12"
                          viewBox="0 0 14 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          aria-hidden="true"
                        >
                          <path d="M0 6h12.5M7.5 1l5 5-5 5"></path>
                        </svg>
                      </Link>{' '}
                    </div>
                  </>
                ) : null}{' '}
                <div className="sp-grid" style={{ marginTop: '48px' }}>
                  {' '}
                  {($v?.shown || []).map((it, $index) => (
                    <Fragment key={$index}>
                      <FigureCard item={{ ...it, category: it?.kind, planOn: it?.showNote, cur: $v?.cur }} />
                    </Fragment>
                  ))}{' '}
                </div>
              </section>
            </>
          ) : null}{' '}
        </main>{' '}
        {$v?.editOpen ? (
          <>
            {' '}
            <Button
              type="button"
              className="sp-drawer-bg"
              aria-label="Закрыть окно"
              onClick={$v?.closeEdit}
            ></Button>{' '}
            <div className="sp-drawer" role="dialog" aria-modal="true" aria-labelledby="edit-title">
              {' '}
              <Button type="button" className="sp-x" aria-label="Закрыть" onClick={$v?.closeEdit}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M2 2l12 12M14 2L2 14"></path>
                </svg>
              </Button>{' '}
              <h2
                id="edit-title"
                style={{
                  margin: '0',
                  paddingRight: '48px',
                  fontSize: '28px',
                  fontWeight: '500',
                  lineHeight: '1.1',
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase',
                }}
              >
                Профиль
              </h2>
              <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div className="sp-ava" style={{ width: '96px', height: '96px' }}>
                  {' '}
                  {$v?.dHasAvatar ? (
                    <>
                      <img
                        src={$v?.dAvatar}
                        alt="Аватар"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </>
                  ) : null}{' '}
                  {$v?.dNoAvatar ? (
                    <>
                      <svg
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#4E6488"
                        strokeWidth="1.3"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="8.5" r="4"></circle>
                        <path d="M4 21c0-4.4 3.6-7.5 8-7.5s8 3.1 8 7.5" strokeLinecap="round"></path>
                      </svg>
                    </>
                  ) : null}{' '}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
                  {' '}
                  <label className="sp-ghost" style={{ position: 'relative', overflow: 'hidden' }}>
                    {$v?.avatarLabel}
                    <TextInput
                      type="file"
                      accept="image/*"
                      onChange={$v?.pickAvatar}
                      aria-label="Загрузить аватар"
                      style={{ position: 'absolute', inset: '0', opacity: '0', cursor: 'pointer' }}
                    />
                  </label>{' '}
                  {$v?.dHasAvatar ? (
                    <>
                      <Button type="button" className="sp-link" onClick={$v?.dropAvatar}>
                        Удалить фото
                      </Button>
                    </>
                  ) : null}{' '}
                </div>
              </div>
              <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="sp-field">
                  <label htmlFor="p-login">Логин</label>
                  <TextInput
                    id="p-login"
                    type="text"
                    autoComplete="username"
                    value={$v?.draft?.login}
                    onChange={$v?.setLogin}
                    placeholder="Латиница и цифры"
                  />
                </div>
                <div className="sp-field">
                  <label htmlFor="p-name">Имя</label>
                  <TextInput
                    id="p-name"
                    type="text"
                    autoComplete="name"
                    value={$v?.draft?.name}
                    onChange={$v?.setName}
                  />
                </div>
                <div className="sp-field">
                  <label htmlFor="p-email">Электронная почта</label>
                  <TextInput
                    id="p-email"
                    type="email"
                    autoComplete="email"
                    value={$v?.draft?.email}
                    onChange={$v?.setEmail}
                  />
                </div>
                <div>
                  {' '}
                  <span className="sp-flabel" id="p-cur">
                    Валюта по умолчанию
                  </span>{' '}
                  <div
                    role="radiogroup"
                    aria-labelledby="p-cur"
                    style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}
                  >
                    {' '}
                    {($v?.currencies || []).map((c, $index) => (
                      <Fragment key={$index}>
                        {' '}
                        <Button
                          type="button"
                          role="radio"
                          className={`sp-chip ${__s(c?.cls)}`}
                          aria-checked={c?.checked}
                          onClick={c?.pick}
                        >
                          {c?.label}
                        </Button>{' '}
                      </Fragment>
                    ))}{' '}
                  </div>
                </div>
              </div>
              <div className="sp-sep">
                <p className="sp-flabel" style={{ margin: '0' }}>
                  Пароль
                </p>
                <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="sp-field">
                    <label htmlFor="p-pass">Новый пароль</label>
                    <TextInput
                      id="p-pass"
                      type="password"
                      autoComplete="new-password"
                      value={$v?.pass}
                      onChange={$v?.setPass}
                      placeholder="Оставьте пустым, чтобы не менять"
                    />
                  </div>
                  <div className="sp-field">
                    <label htmlFor="p-pass2">Повторите пароль</label>
                    <TextInput
                      id="p-pass2"
                      type="password"
                      autoComplete="new-password"
                      value={$v?.pass2}
                      onChange={$v?.setPass2}
                    />
                  </div>
                </div>
              </div>{' '}
              {$v?.hasError ? (
                <>
                  <p role="alert" style={{ margin: '20px 0 0', fontSize: '15px', color: '#9A4A50' }}>
                    {$v?.error}
                  </p>
                </>
              ) : null}{' '}
              <div
                style={{
                  marginTop: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                {' '}
                <Button type="button" className="sp-btn" onClick={$v?.save}>
                  Сохранить
                </Button>{' '}
                <Link
                  href="/"
                  onClick={$v?.signOut}
                  className="sp-link"
                  style={{ fontSize: '14px', textDecoration: 'none' }}
                >
                  Выйти из аккаунта
                </Link>{' '}
              </div>
            </div>
          </>
        ) : null}{' '}
        {$v?.toast ? (
          <>
            <p className="sp-toast" role="status">
              {$v?.toastText}
            </p>
          </>
        ) : null}{' '}
        <div style={{ marginTop: 'auto', paddingTop: '100px' }}>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}

/* Сгенерировано из original-export/project/Account.dc.html инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { definePage } from '../../runtime/definePage';
import Logic from './Account';
import css from './Account.css?raw';

/** Страница «Личный кабинет — Советский пластик». defaults — значения настроек (Tweaks) из data-props оригинала. */
export default definePage(Logic, View, css, {
  title: 'Личный кабинет — Советский пластик',
  defaults: {
    signedIn: true,
    editOpen: false,
  },
  preview: {
    width: 1440,
    height: 1640,
  },
});
