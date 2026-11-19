// @ts-nocheck
import Image from '../../components/ui/Image/Image.tsx';
import TextInput from '../../components/ui/TextInput/TextInput.tsx';
import Button from '../../components/ui/Button/Button.tsx';
/* Сгенерировано из original-export/project/Login.dc.html (разметка внутри <x-dc>) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
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
          <section className="sp-wrap" style={{ padding: '48px 48px 0' }}>
            <div className="sp-auth">
              <div style={{ maxWidth: '480px' }}>
                <h1
                  style={{
                    margin: '0',
                    fontSize: 'clamp(40px, 5vw, 72px)',
                    fontWeight: '500',
                    lineHeight: '0.9',
                    letterSpacing: '-0.03em',
                    textTransform: 'uppercase',
                  }}
                >
                  {$v?.heading}
                </h1>
                <p style={{ margin: '20px 0 0', fontSize: '17px', lineHeight: '26px', color: '#3E4A60' }}>{$v?.lead}</p>
                <div className="sp-tabs" role="tablist" style={{ marginTop: '40px' }}>
                  {' '}
                  <Button
                    type="button"
                    role="tab"
                    className={`sp-tab ${__s($v?.loginTabCls)}`}
                    aria-selected={$v?.loginSel}
                    onClick={$v?.toLogin}
                  >
                    Вход
                  </Button>{' '}
                  <Button
                    type="button"
                    role="tab"
                    className={`sp-tab ${__s($v?.regTabCls)}`}
                    aria-selected={$v?.regSel}
                    onClick={$v?.toReg}
                  >
                    Регистрация
                  </Button>{' '}
                </div>
                <form
                  onSubmit={$v?.submit}
                  style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}
                >
                  {' '}
                  {$v?.isReg ? (
                    <>
                      <div className="sp-field">
                        <label htmlFor="f-login">Логин</label>
                        <TextInput
                          id="f-login"
                          type="text"
                          autoComplete="username"
                          value={$v?.login}
                          onChange={$v?.setLogin}
                          placeholder="Латиница и цифры"
                        />
                      </div>
                      <div className="sp-field">
                        <label htmlFor="f-name">Имя</label>
                        <TextInput
                          id="f-name"
                          type="text"
                          autoComplete="name"
                          value={$v?.name}
                          onChange={$v?.setName}
                          placeholder="Как к вам обращаться"
                        />
                      </div>
                    </>
                  ) : null}{' '}
                  <div className="sp-field">
                    <label htmlFor="f-email">Электронная почта</label>
                    <TextInput
                      id="f-email"
                      type="email"
                      autoComplete="email"
                      value={$v?.email}
                      onChange={$v?.setEmail}
                      placeholder="name@example.ru"
                    />
                  </div>
                  {$v?.showPassword ? (
                    <>
                      <div className="sp-field">
                        <label htmlFor="f-pass">Пароль</label>
                        <TextInput
                          id="f-pass"
                          type="password"
                          autoComplete={$v?.passAuto}
                          value={$v?.pass}
                          onChange={$v?.setPass}
                          placeholder={$v?.passHint}
                        />
                      </div>{' '}
                    </>
                  ) : null}
                  {$v?.confirmPassword ? (
                    <>
                      <div className="sp-field">
                        <label htmlFor="f-pass2">Повторите пароль</label>
                        <TextInput
                          id="f-pass2"
                          type="password"
                          autoComplete="new-password"
                          value={$v?.pass2}
                          onChange={$v?.setPass2}
                        />
                      </div>
                    </>
                  ) : null}{' '}
                  {$v?.reset && (
                    <div className="sp-field">
                      <label htmlFor="f-code">Код из письма</label>
                      <TextInput
                        id="f-code"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        value={$v?.code}
                        onChange={$v?.setCode}
                      />
                    </div>
                  )}
                  {$v?.message && <p role="status">{$v?.message}</p>}
                  {!$v?.isReg && !$v?.recovery && (
                    <Button className="sp-forgot" type="button" disabled={$v?.busy} onClick={$v?.toForgot}>
                      Забыли пароль?
                    </Button>
                  )}
                  {$v?.reset && (
                    <Button className="sp-forgot" type="button" disabled={$v?.busy} onClick={$v?.toForgot}>
                      Запросить новый код
                    </Button>
                  )}
                  {$v?.hasError ? (
                    <>
                      <p role="alert" style={{ margin: '0', fontSize: '15px', color: '#9A4A50' }}>
                        {$v?.error}
                      </p>
                    </>
                  ) : null}{' '}
                  <Button type="submit" disabled={$v?.busy} className="sp-submit" style={{ marginTop: '8px' }}>
                    {$v?.submitLabel}
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
                  </Button>{' '}
                  <p style={{ margin: '0', fontSize: '15px', color: '#4E6488' }}>
                    {$v?.switchText}{' '}
                    <Button
                      type="button"
                      onClick={$v?.switchMode}
                      style={{
                        padding: '0 0 2px',
                        border: '0',
                        borderBottom: '1px solid #A9B9D2',
                        background: 'transparent',
                        color: '#1B2A41',
                        fontFamily: 'inherit',
                        fontSize: '15px',
                        fontWeight: '500',
                        cursor: 'pointer',
                      }}
                    >
                      {$v?.switchLink}
                    </Button>
                  </p>
                </form>
              </div>
              <div
                className="sp-auth-art"
                aria-hidden="true"
                style={{
                  order: '-1',
                  position: 'relative',
                  minHeight: '620px',
                  borderRadius: '8px',
                  background: '#DBE2EA',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                }}
              >
                {' '}
                <Image src="/images/logo-accent.svg" alt="" style={{ height: '88%', width: 'auto' }} />{' '}
              </div>
            </div>
          </section>
        </main>
        <div style={{ marginTop: 'auto', paddingTop: '100px' }}>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}

/* Сгенерировано из original-export/project/Login.dc.html инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { definePage } from '../../runtime/definePage';
import Logic from './Login';
import css from './Login.css?raw';

/** Страница «Вход и регистрация — Советский пластик». defaults — значения настроек (Tweaks) из data-props оригинала. */
export default definePage(Logic, View, css, {
  title: 'Вход и регистрация — Советский пластик',
  defaults: {
    mode: 'login',
  },
  preview: {
    width: 1440,
    height: 1140,
  },
});
