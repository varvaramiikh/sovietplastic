// @ts-nocheck
import Image from '../../components/ui/Image/Image.tsx';
import Button from '../../components/ui/Button/Button.tsx';
import CheckButton from '../../components/ui/CheckButton/CheckButton.tsx';
import LikeButton from '../../components/ui/LikeButton/LikeButton.tsx';
import Link from '../../components/ui/Link/Link.tsx';
import PurchasePlanModal from '../../components/modals/PurchasePlanModal/PurchasePlanModal.tsx';
import AuthRequiredModal from '../../components/modals/AuthRequiredModal/AuthRequiredModal.tsx';
import FigureCard from '../../components/cards/FigureCard/FigureCard.tsx';
/* Сгенерировано из original-export/project/Figurine.dc.html (разметка внутри <x-dc>) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { Fragment } from 'react';
import { __s, __css, __raw, __href } from '../../runtime/dc';
import SiteHeader from '../../components/SiteHeader/SiteHeader.tsx';
import SiteFooter from '../../components/SiteFooter/SiteFooter.tsx';

/** Разметка. $v — значения из renderVals() логики страницы. */
function View({ $v }: { $v: any }) {
  return (
    <>
      <div
        id="top"
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
        <SiteHeader current="catalog" />
        <main style={{ flex: 'none' }}>
          <section className="sp-wrap" style={{ padding: '40px 48px 0' }}>
            <nav
              aria-label="Навигационная цепочка"
              style={{ fontSize: '13px', color: '#4E6488', display: 'flex', flexWrap: 'wrap', gap: '10px' }}
            >
              <Link href="/" style={{ color: '#4E6488' }}>
                Главная
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/catalog" style={{ color: '#4E6488' }}>
                Коллекция
              </Link>
              <span aria-hidden="true">/</span>
              <span>{$v?.item?.title}</span>
            </nav>
            <div className="sp-top" style={{ marginTop: '32px' }}>
              <div className="sp-gal">
                <div
                  style={{
                    position: 'relative',
                    flex: '1',
                    minWidth: '0',
                    height: '640px',
                    background: '#DBE2EA',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {' '}
                  <Image
                    src={$v?.item?.img}
                    alt={$v?.viewAlt}
                    style={__css(`height: ${__s($v?.view?.h)}; width: auto; margin-top: ${__s($v?.view?.mt)}`)}
                  />{' '}
                  <div className="sp-acts" style={{ top: '10px', right: '10px' }}>
                    {' '}
                    <LikeButton
                      className={$v?.itemMark?.wantCls}
                      pressed={$v?.itemMark?.wantPressed}
                      onClick={$v?.itemMark?.toggleWant}
                    />{' '}
                    <CheckButton
                      className={$v?.itemMark?.haveCls}
                      pressed={$v?.itemMark?.havePressed}
                      onClick={$v?.itemMark?.toggleHave}
                    />{' '}
                  </div>
                  <p
                    style={{
                      position: 'absolute',
                      top: '20px',
                      left: '24px',
                      margin: '0',
                      fontSize: '15px',
                      color: '#4E6488',
                    }}
                  >
                    <span style={{ color: '#252932', fontWeight: '500' }}>{$v?.viewNo}</span>
                    {' / '}
                    {$v?.viewCount}
                  </p>
                  <div
                    style={{
                      position: 'absolute',
                      left: '20px',
                      right: '20px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      pointerEvents: 'none',
                    }}
                  >
                    {' '}
                    <Button
                      type="button"
                      className="sp-arrow"
                      aria-label="Предыдущий ракурс"
                      onClick={$v?.prevView}
                      ref={__raw('pointer-events: auto; background: transparent !important; color: #1B2A41 !important')}
                    >
                      <svg
                        width="16"
                        height="14"
                        viewBox="0 0 14 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        aria-hidden="true"
                      >
                        <path d="M14 6H1.5M6.5 1l-5 5 5 5"></path>
                      </svg>
                    </Button>{' '}
                    <Button
                      type="button"
                      className="sp-arrow"
                      aria-label="Следующий ракурс"
                      onClick={$v?.nextView}
                      ref={__raw('pointer-events: auto; background: transparent !important; color: #1B2A41 !important')}
                    >
                      <svg
                        width="16"
                        height="14"
                        viewBox="0 0 14 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        aria-hidden="true"
                      >
                        <path d="M0 6h12.5M7.5 1l5 5-5 5"></path>
                      </svg>
                    </Button>{' '}
                  </div>
                </div>
                <div className="sp-thumbs-wrap">
                  <div role="group" aria-label="Ракурсы" className="sp-thumbs">
                    {' '}
                    {($v?.views || []).map((v, $index) => (
                      <Fragment key={$index}>
                        {' '}
                        <Button
                          type="button"
                          className={`sp-thumb ${__s(v?.cls)}`}
                          aria-label={v?.label}
                          onClick={v?.pick}
                        >
                          <Image
                            src={v?.img}
                            alt=""
                            style={__css(`height: ${__s(v?.h)}; width: auto; margin-top: ${__s(v?.mt)}`)}
                          />
                        </Button>{' '}
                      </Fragment>
                    ))}{' '}
                  </div>
                </div>
              </div>
              <div>
                <h1
                  style={{
                    margin: '18px 0 0',
                    fontSize: 'clamp(32px, 3vw, 44px)',
                    fontWeight: '500',
                    lineHeight: '1.05',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    marginTop: '0px',
                  }}
                >
                  {$v?.item?.title}
                </h1>
                <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #C9D1DB' }}>
                  <h2
                    style={{
                      margin: '0',
                      fontSize: '22px',
                      fontWeight: '600',
                      lineHeight: '1.2',
                      letterSpacing: '0',
                      textTransform: 'none',
                    }}
                  >
                    Характеристики
                  </h2>
                  <dl className="sp-col" style={{ marginTop: '24px' }}>
                    {' '}
                    {($v?.specs || []).map((s, $index) => (
                      <Fragment key={$index}>
                        <div className="sp-row">
                          <dt>
                            <span>{s?.k}</span>
                            <i aria-hidden="true"></i>
                          </dt>
                          <dd>{s?.v}</dd>
                        </div>
                      </Fragment>
                    ))}{' '}
                    <div
                      className="sp-row"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        gap: '14px',
                        gridTemplateColumns: 'none',
                      }}
                    >
                      <dt style={{ display: 'block', margin: '0' }}>
                        <span style={{ fontSize: '18px', fontWeight: '500', color: '#252932' }}>Теги</span>
                        <i aria-hidden="true" style={{ display: 'none' }}></i>
                      </dt>
                      <dd style={{ margin: '0', width: '100%', textAlign: 'left' }}>
                        <ul
                          style={{
                            listStyle: 'none',
                            margin: '0',
                            padding: '0',
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '8px',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-start',
                          }}
                        >
                          {' '}
                          {($v?.tags || []).map((tag, $index) => (
                            <Fragment key={$index}>
                              <li>
                                <Link href="/catalog" onClick={tag?.go} className="sp-chip">
                                  {tag?.label}
                                </Link>
                              </li>
                            </Fragment>
                          ))}{' '}
                        </ul>
                      </dd>
                    </div>
                  </dl>{' '}
                  {$v?.itemPlan?.on ? (
                    <>
                      <div
                        style={{ marginTop: '28px', padding: '20px 24px', borderRadius: '8px', background: '#F8FAFD' }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '16px',
                          }}
                        >
                          <p
                            style={{
                              margin: '0',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              fontSize: '12px',
                              fontWeight: '500',
                              letterSpacing: '0.14em',
                              textTransform: 'uppercase',
                              color: '#4E6488',
                            }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z"
                                fill="#B5656B"
                                stroke="#B5656B"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                            В списке «Хочу купить»
                          </p>{' '}
                          <Button type="button" className="sp-mlink" onClick={$v?.itemPlan?.edit}>
                            Изменить
                          </Button>{' '}
                        </div>
                        <dl className="sp-col" style={{ marginTop: '16px', gap: '12px' }}>
                          <div className="sp-row" style={{ fontSize: '16px', lineHeight: '24px' }}>
                            <dt>
                              <span>Где планирую купить</span>
                              <i aria-hidden="true"></i>
                            </dt>
                            <dd>{$v?.itemPlan?.note}</dd>
                          </div>
                          <div className="sp-row" style={{ fontSize: '16px', lineHeight: '24px' }}>
                            <dt>
                              <span>Примерная цена</span>
                              <i aria-hidden="true"></i>
                            </dt>
                            <dd>{$v?.itemPlan?.price}</dd>
                          </div>
                        </dl>
                      </div>
                    </>
                  ) : null}{' '}
                </div>
              </div>
            </div>
          </section>
          <section className="sp-wrap" style={{ padding: '88px 48px 0' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '24px',
              }}
            >
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
                Другие предметы
                <br />
                коллекции
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
            <div className="sp-more" style={{ marginTop: '56px' }}>
              {' '}
              {($v?.others || []).map((it, $index) => (
                <Fragment key={$index}>
                  <FigureCard item={it} href="#top" />
                </Fragment>
              ))}{' '}
            </div>
          </section>
        </main>{' '}
        {$v?.tagsOpen ? (
          <>
            <div
              style={{
                position: 'fixed',
                inset: '0',
                zIndex: '1000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
                boxSizing: 'border-box',
              }}
            >
              {' '}
              <Button
                type="button"
                aria-label="Закрыть окно"
                onClick={$v?.closeTags}
                style={{
                  position: 'absolute',
                  inset: '0',
                  border: '0',
                  padding: '0',
                  background: 'rgba(27, 42, 65, 0.6)',
                  cursor: 'pointer',
                }}
              ></Button>{' '}
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="tags-title"
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '560px',
                  maxHeight: '80vh',
                  overflowY: 'auto',
                  background: '#FFFFFF',
                  borderRadius: '8px',
                  padding: '36px 36px 32px',
                  boxSizing: 'border-box',
                  boxShadow: '0 24px 64px rgba(27, 42, 65, 0.25)',
                }}
              >
                {' '}
                <Button
                  type="button"
                  aria-label="Закрыть"
                  onClick={$v?.closeTags}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '44px',
                    height: '44px',
                    border: '0',
                    borderRadius: '6px',
                    background: 'transparent',
                    color: '#1B2A41',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
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
                  id="tags-title"
                  style={{ margin: '0', paddingRight: '48px', fontSize: '26px', fontWeight: '600', lineHeight: '1.15' }}
                >
                  {$v?.item?.title}
                </h2>
                <h3 style={{ margin: '28px 0 0', fontSize: '18px', fontWeight: '600' }}>Теги</h3>
                <ul
                  style={{
                    listStyle: 'none',
                    margin: '14px 0 0',
                    padding: '0',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px 28px',
                  }}
                >
                  {' '}
                  {($v?.tags || []).map((tag, $index) => (
                    <Fragment key={$index}>
                      <li>
                        <Link href="/catalog" onClick={tag?.go} className="sp-tagc">
                          <i aria-hidden="true"></i>
                          {tag?.label}
                        </Link>
                      </li>
                    </Fragment>
                  ))}{' '}
                </ul>
                <h3 style={{ margin: '32px 0 0', fontSize: '18px', fontWeight: '600' }}>Характеристики</h3>
                <dl className="sp-col" style={{ marginTop: '16px', gap: '16px' }}>
                  {' '}
                  {($v?.specs || []).map((s, $index) => (
                    <Fragment key={$index}>
                      <div className="sp-row" style={{ fontSize: '16px', lineHeight: '24px' }}>
                        <dt>
                          <span>{s?.k}</span>
                          <i aria-hidden="true"></i>
                        </dt>
                        <dd>{s?.v}</dd>
                      </div>
                    </Fragment>
                  ))}{' '}
                </dl>
              </div>
            </div>
          </>
        ) : null}{' '}
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

/* Сгенерировано из original-export/project/Figurine.dc.html инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { definePage } from '../../runtime/definePage';
import Logic from './Figurine';
import css from './Figurine.css?raw';

/** Страница «Статуэтка — карточка предмета». defaults — значения настроек (Tweaks) из data-props оригинала. */
export default definePage(Logic, View, css, {
  title: 'Статуэтка — карточка предмета',
  defaults: {},
  preview: {
    width: 1440,
    height: 3160,
  },
});
