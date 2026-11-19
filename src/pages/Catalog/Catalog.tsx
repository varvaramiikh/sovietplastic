// @ts-nocheck
import TextInput from '../../components/ui/TextInput/TextInput.tsx';
import Button from '../../components/ui/Button/Button.tsx';
import Link from '../../components/ui/Link/Link.tsx';
import PurchasePlanModal from '../../components/modals/PurchasePlanModal/PurchasePlanModal.tsx';
import AuthRequiredModal from '../../components/modals/AuthRequiredModal/AuthRequiredModal.tsx';
import FigureCard from '../../components/cards/FigureCard/FigureCard.tsx';
/* Сгенерировано из original-export/project/Catalog.dc.html (разметка внутри <x-dc>) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
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
        <SiteHeader current="catalog" />
        <main style={{ flex: 'none' }}>
          <section className="sp-wrap" style={{ padding: '48px 48px 0', background: 'transparent' }}>
            <nav
              aria-label="Навигационная цепочка"
              style={{ fontSize: '13px', color: '#4E6488', display: 'flex', gap: '10px' }}
            >
              <Link href="/" style={{ color: '#4E6488' }}>
                Главная
              </Link>
              <span aria-hidden="true">/</span>
              <span>Коллекция</span>
            </nav>
            <div
              style={{
                marginTop: '28px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '24px',
              }}
            >
              <h1
                style={{
                  margin: '0',
                  fontSize: 'clamp(48px, 7vw, 104px)',
                  fontWeight: '500',
                  lineHeight: '0.85',
                  letterSpacing: '-0.03em',
                  textTransform: 'uppercase',
                }}
              >
                Коллекция
              </h1>
            </div>
            <div style={{ marginTop: '32px', borderTop: '1px solid #DCE2EA' }}></div>
          </section>
          <section className="sp-wrap" style={{ padding: '28px 48px 0', paddingTop: '24px' }}>
            <div aria-label="Фильтры" role="group" className="sp-filters">
              <div className="sp-frow">
                {' '}
                <span className="sp-flabel" id="f-kind">
                  Категория
                </span>{' '}
                <div className="sp-chips" role="group" aria-labelledby="f-kind">
                  {' '}
                  {($v?.kinds || []).map((o, $index) => (
                    <Fragment key={$index}>
                      {' '}
                      <Button
                        type="button"
                        className={`sp-chip ${__s(o?.cls)}`}
                        aria-pressed={o?.pressed}
                        onClick={o?.toggle}
                      >
                        {o?.label}
                        <span className="sp-chip-n">{o?.count}</span>
                      </Button>{' '}
                    </Fragment>
                  ))}{' '}
                </div>
              </div>
              <div className="sp-frow" style={{ marginTop: '16px' }}>
                {' '}
                <span className="sp-flabel" id="f-tag">
                  Теги
                </span>{' '}
                <div className="sp-chips" role="group" aria-labelledby="f-tag">
                  {' '}
                  {($v?.tagOpts || []).map((o, $index) => (
                    <Fragment key={$index}>
                      {' '}
                      <Button
                        type="button"
                        className={`sp-chip ${__s(o?.cls)}`}
                        aria-pressed={o?.pressed}
                        onClick={o?.toggle}
                      >
                        {o?.label}
                        <span className="sp-chip-n">{o?.count}</span>
                      </Button>{' '}
                    </Fragment>
                  ))}{' '}
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: '36px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '32px',
                paddingBottom: '18px',
                borderBottom: '1px solid #DCE2EA',
              }}
            >
              <div style={{ order: '1', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '24px' }}>
                <p aria-live="polite" style={{ margin: '0', fontSize: '16px' }}>
                  {'Найдено '}
                  <strong style={{ fontWeight: '500' }}>{$v?.foundText}</strong>
                </p>{' '}
                {$v?.hasFilters ? (
                  <>
                    {' '}
                    <Button type="button" className="sp-reset" onClick={$v?.reset}>
                      Сбросить фильтры
                    </Button>{' '}
                  </>
                ) : null}{' '}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {' '}
                <span id="cat-sort-label" style={{ fontSize: '15px', fontWeight: '400', color: '#4E6488' }}>
                  Сортировка
                </span>{' '}
                <div style={{ position: 'relative' }}>
                  {' '}
                  {$v?.sortOpen ? (
                    <>
                      {' '}
                      <Button
                        type="button"
                        aria-label="Закрыть список"
                        tabIndex="-1"
                        onClick={$v?.closeSort}
                        style={{
                          position: 'fixed',
                          inset: '0',
                          zIndex: '40',
                          border: '0',
                          padding: '0',
                          background: 'transparent',
                          cursor: 'default',
                        }}
                      ></Button>{' '}
                    </>
                  ) : null}{' '}
                  <Button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={$v?.sortExpanded}
                    aria-labelledby="cat-sort-label"
                    onClick={$v?.toggleSort}
                    style={{
                      position: 'relative',
                      zIndex: '41',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '24px',
                      minWidth: '230px',
                      height: '44px',
                      padding: '0 18px 0 16px',
                      border: '1px solid #C9D1DB',
                      borderRadius: '6px',
                      background: '#FFFFFF',
                      color: '#1B2A41',
                      fontFamily: 'inherit',
                      fontSize: '15px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      boxSizing: 'border-box',
                    }}
                  >
                    {$v?.sortLabel}
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      stroke="#1B2A41"
                      strokeWidth="1.5"
                      aria-hidden="true"
                      style={__css(`flex: none; transform: ${__s($v?.sortArrow)}`)}
                    >
                      <path d="M1 1.5l5 5 5-5"></path>
                    </svg>
                  </Button>{' '}
                  {$v?.sortOpen ? (
                    <>
                      <ul
                        role="listbox"
                        aria-labelledby="cat-sort-label"
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 6px)',
                          right: '0',
                          zIndex: '42',
                          minWidth: '100%',
                          margin: '0',
                          padding: '6px',
                          listStyle: 'none',
                          background: '#FFFFFF',
                          border: '1px solid #DCE2EA',
                          borderRadius: '8px',
                          boxShadow: '0 12px 32px rgba(27, 42, 65, 0.12)',
                          boxSizing: 'border-box',
                        }}
                      >
                        {' '}
                        {($v?.sortOptions || []).map((so, $index) => (
                          <Fragment key={$index}>
                            <li role="option" aria-selected={so?.selected}>
                              <Button type="button" onClick={so?.pick} className={`sp-opt ${__s(so?.cls)}`}>
                                {so?.label}
                                {so?.on ? (
                                  <>
                                    <svg
                                      width="14"
                                      height="10"
                                      viewBox="0 0 14 10"
                                      fill="none"
                                      stroke="#1B2A41"
                                      strokeWidth="1.6"
                                      aria-hidden="true"
                                    >
                                      <path d="M1 5l4 4 8-8"></path>
                                    </svg>
                                  </>
                                ) : null}
                              </Button>
                            </li>
                          </Fragment>
                        ))}{' '}
                      </ul>
                    </>
                  ) : null}{' '}
                </div>
              </div>
              <div style={{ order: '-1', position: 'relative', width: 'min(400px, 100%)' }}>
                {' '}
                <label
                  htmlFor="cat-search"
                  style={{
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    overflow: 'hidden',
                    clip: 'rect(0 0 0 0)',
                  }}
                >
                  Поиск по коллекции
                </label>{' '}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="#4E6488"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '16px', top: '14px' }}
                >
                  <circle cx="7" cy="7" r="5.5"></circle>
                  <path d="M11 11l4 4"></path>
                </svg>{' '}
                <TextInput
                  id="cat-search"
                  type="search"
                  value={$v?.q}
                  onChange={$v?.setQ}
                  placeholder="Поиск по названию, категории или тегу"
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 16px 0 44px',
                    border: '1px solid #C9D1DB',
                    borderRadius: '6px',
                    fontFamily: 'inherit',
                    fontSize: '15px',
                    color: '#252932',
                    background: '#FFFFFF',
                    boxSizing: 'border-box',
                  }}
                />{' '}
              </div>
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
                  <p style={{ margin: '0', fontSize: '22px', fontWeight: '500' }}>Ничего не найдено</p>
                  <p style={{ margin: '10px 0 0', fontSize: '16px', color: '#4E6488' }}>
                    Попробуйте убрать часть фильтров или изменить запрос.
                  </p>
                </div>
              </>
            ) : null}{' '}
            <div className="sp-grid" style={{ marginTop: '40px' }}>
              {' '}
              {($v?.pageItems || []).map((it, $index) => (
                <Fragment key={$index}>
                  <FigureCard item={it} />
                </Fragment>
              ))}{' '}
            </div>{' '}
            {$v?.hasPages ? (
              <>
                <nav
                  aria-label="Страницы каталога"
                  style={{
                    marginTop: '64px',
                    paddingTop: '24px',
                    borderTop: '1px solid #DCE2EA',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  {' '}
                  <Button
                    type="button"
                    className="sp-page"
                    aria-label="Предыдущая страница"
                    disabled={$v?.noPrev}
                    onClick={$v?.prev}
                    ref={__raw('border-radius: 6px !important; border-color: transparent !important')}
                  >
                    <svg
                      width="14"
                      height="12"
                      viewBox="0 0 14 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      aria-hidden="true"
                    >
                      <path d="M14 6H1.5M6.5 1l-5 5 5 5"></path>
                    </svg>
                  </Button>{' '}
                  {($v?.pages || []).map((p, $index) => (
                    <Fragment key={$index}>
                      {' '}
                      <Button
                        type="button"
                        className={`sp-page ${__s(p?.cls)}`}
                        aria-current={p?.current}
                        onClick={p?.pick}
                        ref={__raw('border-radius: 6px !important; border-color: transparent !important')}
                      >
                        {p?.n}
                      </Button>{' '}
                    </Fragment>
                  ))}{' '}
                  <Button
                    type="button"
                    className="sp-page"
                    aria-label="Следующая страница"
                    disabled={$v?.noNext}
                    onClick={$v?.next}
                    ref={__raw('border-radius: 6px !important; border-color: transparent !important')}
                  >
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
                  </Button>{' '}
                </nav>
              </>
            ) : null}{' '}
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

/* Сгенерировано из original-export/project/Catalog.dc.html инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { definePage } from '../../runtime/definePage';
import Logic from './Catalog';
import css from './Catalog.css?raw';

/** Страница «Коллекция — каталог статуэток». defaults — значения настроек (Tweaks) из data-props оригинала. */
export default definePage(Logic, View, css, {
  title: 'Коллекция — каталог статуэток',
  defaults: {},
  preview: {
    width: 1440,
    height: 2640,
  },
});
