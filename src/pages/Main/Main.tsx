// @ts-nocheck
import Image from '../../components/ui/Image/Image.tsx';
import Button from '../../components/ui/Button/Button.tsx';
import Link from '../../components/ui/Link/Link.tsx';
import PurchasePlanModal from '../../components/modals/PurchasePlanModal/PurchasePlanModal.tsx';
import AuthRequiredModal from '../../components/modals/AuthRequiredModal/AuthRequiredModal.tsx';
import FigureCard from '../../components/cards/FigureCard/FigureCard.tsx';
/* Сгенерировано из original-export/project/Main.dc.html (разметка внутри <x-dc>) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
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
          overflowX: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <SiteHeader current="" />
        <main id="top">
          <section className="k-first" aria-label="Главный экран" style={{ background: '#FFFFFF' }}>
            {' '}
            {$v?.showNews ? (
              <>
                <div
                  className="k-wrap k-carousel"
                  role="region"
                  aria-roledescription="карусель"
                  aria-label="Новости сайта"
                  style={{ marginTop: '16px', marginBottom: '16px' }}
                >
                  <div className="k-viewport">
                    <div className="k-track" style={__css(`transform: ${__s($v?.trackTx)}`)}>
                      {' '}
                      {($v?.news || []).map((n, $index) => (
                        <Fragment key={$index}>
                          <div className="k-slide" aria-hidden={n?.hidden}>
                            <div className="k-slide-bg" aria-hidden="true">
                              <Image src={n?.img} alt="" />
                            </div>
                            <div className="k-slide-text">
                              <p
                                style={{
                                  margin: '0',
                                  display: 'flex',
                                  gap: '64px',
                                  fontSize: '12px',
                                  fontWeight: '500',
                                  letterSpacing: '0.14em',
                                  textTransform: 'uppercase',
                                  color: '#4E6488',
                                }}
                              >
                                <span>{n?.label}</span>
                                <span style={{ letterSpacing: '0.02em', textTransform: 'none', fontWeight: '400' }}>
                                  {n?.date}
                                </span>
                              </p>
                              <p
                                style={{
                                  margin: '0',
                                  fontSize: 'clamp(24px, 2.5vw, 36px)',
                                  fontWeight: '500',
                                  lineHeight: '1.12',
                                  letterSpacing: '-0.02em',
                                }}
                              >
                                <Link href={__href(n?.href)} className="k-slide-title" tabIndex={n?.tab}>
                                  {n?.title}
                                </Link>
                              </p>{' '}
                              <Link href={__href(n?.href)} className="k-slide-btn" tabIndex={n?.tab}>
                                {n?.cta}
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
                          </div>
                        </Fragment>
                      ))}{' '}
                    </div>{' '}
                    <Button
                      type="button"
                      className="k-zone k-zone-l"
                      aria-label="Предыдущая новость"
                      onClick={$v?.prevNews}
                    ></Button>{' '}
                    <Button
                      type="button"
                      className="k-zone k-zone-r"
                      aria-label="Следующая новость"
                      onClick={$v?.nextNews}
                    ></Button>{' '}
                    <div className="k-dots">
                      {' '}
                      {($v?.news || []).map((n, $index) => (
                        <Fragment key={$index}>
                          {' '}
                          <Button
                            type="button"
                            className={`k-dot ${__s(n?.dotCls)}`}
                            aria-label={`Новость ${__s(n?.num)}`}
                            aria-current={n?.current}
                            onClick={n?.pick}
                          ></Button>{' '}
                        </Fragment>
                      ))}{' '}
                    </div>
                  </div>
                </div>
              </>
            ) : null}{' '}
            <div className="k-hero">
              <div aria-hidden="true" className="k-hero-art">
                <Image
                  src="/images/logo-accent.svg"
                  alt=""
                  style={{ height: '92%', width: 'auto', marginBottom: '2%' }}
                />
              </div>
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: '0',
                  background:
                    'linear-gradient(90deg, #FFFFFF 0%, #FFFFFF 18%, rgba(255, 255, 255, 0.6) 34%, rgba(255, 255, 255, 0) 55%)',
                  pointerEvents: 'none',
                }}
              ></div>
              <h1
                style={{
                  position: 'relative',
                  margin: '0',
                  fontSize: 'clamp(44px, 6.2vw, 96px)',
                  fontWeight: '500',
                  lineHeight: '0.84',
                  letterSpacing: '-0.03em',
                  textTransform: 'uppercase',
                }}
              >
                {' '}
                <span style={{ display: 'block' }}>Мир</span>{' '}
                <span style={{ display: 'block', paddingLeft: '8%' }}>Карболитовых</span>{' '}
                <span style={{ display: 'block' }}>Статуэток</span>{' '}
              </h1>{' '}
              <Link href="/catalog" className="k-hero-btn">
                Смотреть коллекцию
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
          </section>
          <section id="collection" className="k-wrap" style={{ paddingTop: '88px' }}>
            <div className="k-head">
              <h2
                style={{
                  margin: '0',
                  fontSize: 'clamp(40px, 4.7vw, 68px)',
                  fontWeight: '500',
                  lineHeight: '0.9',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                }}
              >
                Избранные
                <br />
                статуэтки
              </h2>{' '}
              <Link
                href="/catalog"
                style={{
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
                Вся коллекция
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
            <div className="k-grid4" style={{ marginTop: '48px' }}>
              {' '}
              {($v?.picks || []).map((it, $index) => (
                <Fragment key={$index}>
                  <FigureCard item={it} />
                </Fragment>
              ))}{' '}
            </div>
          </section>
          <section
            id="about"
            className="k-wrap"
            style={{ marginTop: '88px', paddingTop: '80px', paddingBottom: '88px', background: '#F8FAFD' }}
          >
            <div className="k-head" style={{ alignItems: 'start' }}>
              <h2
                style={{
                  margin: '0',
                  fontSize: 'clamp(40px, 4.7vw, 68px)',
                  fontWeight: '500',
                  lineHeight: '0.9',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                }}
              >
                Что такое карболит?
              </h2>
            </div>
            <div className="k-what" style={{ marginTop: '48px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{ margin: '0', maxWidth: '440px', fontSize: '21px', fontWeight: '400', lineHeight: '30px' }}>
                  Короткое объяснение материала: что это такое и почему из него делали статуэтки. Текст будет
                  подготовлен позже по надёжным источникам.
                </p>{' '}
                <Link
                  href="/carbolite"
                  style={{
                    marginTop: '36px',
                    alignSelf: 'flex-start',
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
                  Подробнее о карболите
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
              <div className="k-sp"></div>
              <figure
                style={{
                  position: 'relative',
                  margin: '0',
                  height: '528px',
                  background: '#C9D5E5',
                  overflow: 'hidden',
                }}
              >
                {' '}
                <Image
                  src="/images/placeholder-ballerina.svg"
                  alt=""
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '73px',
                    height: '632px',
                    width: 'auto',
                    transform: 'translateX(-50%)',
                  }}
                />{' '}
              </figure>
            </div>
          </section>
          <section id="news" className="k-wrap" style={{ paddingTop: '88px' }}>
            <div className="k-head">
              <h2
                style={{
                  margin: '0',
                  fontSize: 'clamp(40px, 4.7vw, 68px)',
                  fontWeight: '500',
                  lineHeight: '0.9',
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                }}
              >
                Новости
                <br />и статьи
              </h2>{' '}
              <Link
                href="/articles"
                style={{
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
                Все статьи
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
            <div className="k-news" style={{ marginTop: '48px' }}>
              {' '}
              {($v?.posts || []).map((p, $index) => (
                <Fragment key={$index}>
                  <article style={{ display: 'flex', flexDirection: 'column', minWidth: '0' }}>
                    {' '}
                    <Link href={__href(p?.href)} aria-label={p?.title} style={{ display: 'block' }}>
                      <figure
                        style={__css(
                          `margin: 0; aspect-ratio: 4 / 3; background: ${__s(p?.bg)}; display: flex; align-items: flex-end; justify-content: center; overflow: hidden`,
                        )}
                      >
                        {' '}
                        <Image
                          src={p?.img}
                          alt=""
                          style={__css(`height: ${__s(p?.h)}; width: auto; margin-bottom: ${__s(p?.mb)}`)}
                        />{' '}
                      </figure>
                    </Link>{' '}
                    <p style={{ margin: '14px 0 0', fontSize: '14px', color: '#4E6488' }}>{p?.date}</p>
                    <h3
                      style={{
                        margin: '6px 0 0',
                        fontSize: '22px',
                        fontWeight: '500',
                        lineHeight: '28px',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      <Link href={__href(p?.href)}>{p?.title}</Link>
                    </h3>
                    <p style={{ margin: '8px 0 0', fontSize: '16px', lineHeight: '24px', color: '#3E4A60' }}>
                      {p?.text}
                    </p>
                  </article>
                </Fragment>
              ))}{' '}
            </div>
          </section>
        </main>{' '}
        {$v?.gate?.open ? (
          <>
            <AuthRequiredModal gate={$v?.gate} />
          </>
        ) : null}{' '}
        {$v?.plan?.open ? (
          <>
            <PurchasePlanModal plan={$v?.plan} />
          </>
        ) : null}{' '}
        <div style={{ marginTop: 'auto', paddingTop: '100px' }}>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}

/* Сгенерировано из original-export/project/Main.dc.html инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { definePage } from '../../runtime/definePage';
import Logic from './Main';
import css from './Main.css?raw';

/** Страница «Советский пластик — мир карболитовых статуэток». defaults — значения настроек (Tweaks) из data-props оригинала. */
export default definePage(Logic, View, css, {
  title: 'Советский пластик — мир карболитовых статуэток',
  defaults: {
    newsMode: 'auto',
  },
  preview: {
    width: 1440,
    height: 4180,
  },
});
