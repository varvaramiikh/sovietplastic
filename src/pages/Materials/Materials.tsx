// @ts-nocheck
import Image from '../../components/ui/Image/Image.tsx';
import Link from '../../components/ui/Link/Link.tsx';
/* Сгенерировано из original-export/project/Materials.dc.html (разметка внутри <x-dc>) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
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
        <SiteHeader current="materials" />
        <main style={{ flex: 'none' }}>
          <section className="sp-wrap" style={{ padding: '48px 48px 40px', background: 'transparent' }}>
            <nav
              aria-label="Навигационная цепочка"
              style={{ fontSize: '13px', color: '#4E6488', display: 'flex', gap: '10px' }}
            >
              <Link href="/" style={{ color: '#4E6488' }}>
                Главная
              </Link>
              <span aria-hidden="true">/</span>
              <span>Статьи</span>
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
                Статьи
              </h1>
            </div>
          </section>
          <section className="sp-wrap" style={{ padding: '0 48px' }}>
            <div style={{ borderTop: '1px solid #C9D1DB' }}>
              {' '}
              {($v?.items || []).map((m, $index) => (
                <Fragment key={$index}>
                  {' '}
                  <Link href="/article" className="sp-row">
                    <figure
                      style={__css(
                        `margin: 0; height: 230px; background: ${__s(m?.bg)}; display: flex; align-items: flex-end; justify-content: center; gap: 24px; overflow: hidden`,
                      )}
                    >
                      {' '}
                      <Image
                        src={m?.img}
                        alt=""
                        style={__css(`height: ${__s(m?.h)}; width: auto; margin-bottom: ${__s(m?.mb)}`)}
                      />{' '}
                    </figure>
                    <div>
                      <h2
                        className="sp-row-title"
                        style={{
                          margin: '16px 0 0',
                          maxWidth: '680px',
                          fontSize: '28px',
                          fontWeight: '500',
                          lineHeight: '34px',
                          letterSpacing: '-0.01em',
                          marginTop: '0px',
                        }}
                      >
                        {m?.title}
                      </h2>
                      <p
                        style={{
                          margin: '12px 0 0',
                          maxWidth: '620px',
                          fontSize: '17px',
                          lineHeight: '26px',
                          color: '#3E4A60',
                        }}
                      >
                        {m?.text}
                      </p>
                      <p style={{ margin: '18px 0 0', fontSize: '14px', color: '#4E6488' }}>{m?.date}</p>
                    </div>
                  </Link>{' '}
                </Fragment>
              ))}{' '}
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

/* Сгенерировано из original-export/project/Materials.dc.html инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { definePage } from '../../runtime/definePage';
import Logic from './Materials';
import css from './Materials.css?raw';

/** Страница «Статьи — Советский пластик». defaults — значения настроек (Tweaks) из data-props оригинала. */
export default definePage(Logic, View, css, {
  title: 'Статьи — Советский пластик',
  defaults: {},
  preview: {
    width: 1440,
    height: 2160,
  },
});
