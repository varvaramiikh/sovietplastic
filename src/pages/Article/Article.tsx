// @ts-nocheck
import Link from '../../components/ui/Link/Link.tsx';
/* Сгенерировано из original-export/project/Article.dc.html (разметка внутри <x-dc>) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
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
          <article>
            <header className="sp-wrap" style={{ padding: '48px 48px 56px' }}>
              <nav
                aria-label="Навигационная цепочка"
                style={{ fontSize: '13px', color: '#4E6488', display: 'flex', gap: '10px' }}
              >
                <Link href="/" style={{ color: '#4E6488' }}>
                  Главная
                </Link>
                <span aria-hidden="true">/</span>
                <Link href="/articles" style={{ color: '#4E6488' }}>
                  Статьи
                </Link>
                <span aria-hidden="true">/</span>
                <span>Название статьи, которое может занимать две строки</span>
              </nav>
              <div className="sp-text" style={{ marginTop: '48px' }}>
                <h1
                  style={{
                    margin: '0',
                    fontSize: 'clamp(36px, 4.4vw, 60px)',
                    fontWeight: '500',
                    lineHeight: '1',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                  }}
                >
                  Название статьи, которое может занимать две строки
                </h1>
                <p style={{ margin: '28px 0 0', fontSize: '22px', lineHeight: '33px' }}>
                  Вступление объясняет, о чём материал и зачем его читать. Один короткий абзац, который не повторяет
                  заголовок другими словами.
                </p>
                <p style={{ margin: '24px 0 0', fontSize: '14px', lineHeight: '20px', color: '#4E6488' }}>
                  00 месяц 0000
                </p>
              </div>
            </header>
            <figure className="sp-wrap" style={{ margin: '0', padding: '0 48px' }}>
              <div
                style={{
                  height: '480px',
                  background: '#DBE2EA',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  gap: '48px',
                  paddingBottom: '40px',
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                }}
              >
                {' '}
                <img src="/images/placeholder-skater.svg" alt="" style={{ height: '300px', width: 'auto' }} />{' '}
                <img src="/images/placeholder-ballerina.svg" alt="" style={{ height: '440px', width: 'auto' }} />{' '}
                <img src="/images/placeholder-boxer.svg" alt="" style={{ height: '260px', width: 'auto' }} />{' '}
              </div>
              <figcaption style={{ marginTop: '14px', fontSize: '14px', color: '#4E6488' }}>
                Подпись к обложке, источник изображения
              </figcaption>
            </figure>
            <div className="sp-wrap" style={{ padding: '64px 48px 0' }}>
              <div className="sp-text">
                <p>
                  Абзац основного текста. Материал развивает тему последовательно: от вступления к разделам, каждый из
                  которых отвечает на один вопрос.
                </p>
                <p>
                  {
                    'Следующий абзац отделён отступом, без красной строки. Ссылки в тексте всегда подчёркнуты, например '
                  }
                  <Link href="/catalog">предметы из коллекции</Link>, чтобы их можно было отличить не только по цвету.
                </p>
                <h2
                  style={{
                    margin: '64px 0 18px',
                    fontSize: '34px',
                    fontWeight: '500',
                    lineHeight: '1.05',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                  }}
                >
                  Заголовок раздела
                </h2>
                <p>
                  Перед новым разделом пространства больше, чем после его заголовка, поэтому заголовок визуально
                  относится к следующему тексту.
                </p>
                <figure style={{ margin: '40px 0' }}>
                  <div style={{ height: '440px', background: '#C9D5E5', position: 'relative', overflow: 'hidden' }}>
                    <img
                      src="/images/placeholder-ballerina.svg"
                      alt=""
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50px',
                        height: '620px',
                        width: 'auto',
                        transform: 'translateX(-50%)',
                      }}
                    />
                  </div>
                  <figcaption style={{ marginTop: '14px', fontSize: '14px', color: '#4E6488' }}>
                    Что изображено, автор или источник
                  </figcaption>
                </figure>
                <h3 style={{ margin: '48px 0 14px', fontSize: '22px', fontWeight: '500', lineHeight: '1.2' }}>
                  Подзаголовок
                </h3>
                <p>
                  {'Абзац под подзаголовком. Жирным выделяются только '}
                  <strong style={{ fontWeight: '600' }}>действительно важные фрагменты</strong>.
                </p>
                <p
                  style={{
                    margin: '32px 0',
                    paddingLeft: '22px',
                    borderLeft: '2px solid #A9B9D2',
                    fontSize: '18px',
                    lineHeight: '29px',
                    color: '#3E4A60',
                  }}
                >
                  Важное замечание: небольшой отступ и тонкая линия слева, без значка, тени и рамки.
                </p>
                <ul
                  style={{
                    margin: '0 0 20px',
                    padding: '0',
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    fontSize: '19px',
                    lineHeight: '29px',
                  }}
                >
                  <li style={{ display: 'flex', gap: '16px' }}>
                    <span
                      aria-hidden="true"
                      style={{ flex: 'none', marginTop: '13px', width: '14px', height: '2px', background: '#A9B9D2' }}
                    ></span>
                    Первый пункт списка
                  </li>
                  <li style={{ display: 'flex', gap: '16px' }}>
                    <span
                      aria-hidden="true"
                      style={{ flex: 'none', marginTop: '13px', width: '14px', height: '2px', background: '#A9B9D2' }}
                    ></span>
                    Второй пункт, который может быть длиннее и переноситься на следующую строку
                  </li>
                  <li style={{ display: 'flex', gap: '16px' }}>
                    <span
                      aria-hidden="true"
                      style={{ flex: 'none', marginTop: '13px', width: '14px', height: '2px', background: '#A9B9D2' }}
                    ></span>
                    Третий пункт
                  </li>
                </ul>
              </div>
            </div>
            <figure className="sp-wrap" style={{ margin: '64px 0 0', padding: '0 48px' }}>
              <div
                style={{
                  height: '440px',
                  background: '#DBE2EA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <img
                  src="/images/placeholder-boxer.svg"
                  alt=""
                  style={{ height: '190%', width: 'auto', marginTop: '70%' }}
                />
              </div>
              <figcaption style={{ marginTop: '14px', fontSize: '14px', color: '#4E6488' }}>
                Что изображено, автор или источник
              </figcaption>
            </figure>
            <div className="sp-wrap" style={{ padding: '0 48px' }}>
              <div className="sp-text">
                <h2
                  style={{
                    margin: '64px 0 24px',
                    fontSize: '34px',
                    fontWeight: '500',
                    lineHeight: '1.05',
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                  }}
                >
                  Сравнение предметов
                </h2>
                <div className="sp-pair">
                  <figure style={{ margin: '0' }}>
                    <div
                      style={{
                        height: '300px',
                        background: '#DBE2EA',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img src="/images/placeholder-skater.svg" alt="" style={{ height: '80%', width: 'auto' }} />
                    </div>
                    <figcaption style={{ marginTop: '12px', fontSize: '15px' }}>
                      Предмет или ракурс 1
                      <span style={{ display: 'block', marginTop: '2px', fontSize: '14px', color: '#4E6488' }}>
                        Подпись
                      </span>
                    </figcaption>
                  </figure>
                  <figure style={{ margin: '0' }}>
                    <div
                      style={{
                        height: '300px',
                        background: '#DBE2EA',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img src="/images/placeholder-ballerina.svg" alt="" style={{ height: '70%', width: 'auto' }} />
                    </div>
                    <figcaption style={{ marginTop: '12px', fontSize: '15px' }}>
                      Предмет или ракурс 2
                      <span style={{ display: 'block', marginTop: '2px', fontSize: '14px', color: '#4E6488' }}>
                        Подпись
                      </span>
                    </figcaption>
                  </figure>
                </div>
                <div style={{ marginTop: '32px', overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px', lineHeight: '24px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #C9D1DB' }}>
                        <th
                          scope="col"
                          style={{
                            padding: '12px 12px 12px 0',
                            textAlign: 'left',
                            fontSize: '12px',
                            fontWeight: '500',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: '#4E6488',
                          }}
                        >
                          Признак
                        </th>
                        <th
                          scope="col"
                          style={{
                            padding: '12px',
                            textAlign: 'left',
                            fontSize: '12px',
                            fontWeight: '500',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: '#4E6488',
                          }}
                        >
                          Предмет 1
                        </th>
                        <th
                          scope="col"
                          style={{
                            padding: '12px 0 12px 12px',
                            textAlign: 'left',
                            fontSize: '12px',
                            fontWeight: '500',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: '#4E6488',
                          }}
                        >
                          Предмет 2
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #DCE2EA' }}>
                        <th
                          scope="row"
                          style={{
                            padding: '14px 12px 14px 0',
                            textAlign: 'left',
                            fontWeight: '400',
                            color: '#4E6488',
                          }}
                        >
                          Признак
                        </th>
                        <td style={{ padding: '14px 12px' }}>Значение</td>
                        <td style={{ padding: '14px 0 14px 12px' }}>Значение</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #DCE2EA' }}>
                        <th
                          scope="row"
                          style={{
                            padding: '14px 12px 14px 0',
                            textAlign: 'left',
                            fontWeight: '400',
                            color: '#4E6488',
                          }}
                        >
                          Признак
                        </th>
                        <td style={{ padding: '14px 12px' }}>Значение</td>
                        <td style={{ padding: '14px 0 14px 12px' }}>Значение</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #DCE2EA' }}>
                        <th
                          scope="row"
                          style={{
                            padding: '14px 12px 14px 0',
                            textAlign: 'left',
                            fontWeight: '400',
                            color: '#4E6488',
                          }}
                        >
                          Признак
                        </th>
                        <td style={{ padding: '14px 12px' }}>Значение</td>
                        <td style={{ padding: '14px 0 14px 12px' }}>Значение</td>
                      </tr>
                    </tbody>
                  </table>
                </div>{' '}
                <Link
                  href="/articles"
                  style={{
                    marginTop: '56px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '14px',
                    paddingBottom: '8px',
                    borderBottom: '2px solid #A9B9D2',
                    fontSize: '13px',
                    fontWeight: '500',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                  }}
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
                  Все статьи
                </Link>{' '}
              </div>
            </div>
          </article>
        </main>
        <div style={{ marginTop: 'auto', paddingTop: '100px' }}>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}

/* Сгенерировано из original-export/project/Article.dc.html инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { definePage } from '../../runtime/definePage';
import Logic from './Article';
import css from './Article.css?raw';

/** Страница «Статья — пример материала». defaults — значения настроек (Tweaks) из data-props оригинала. */
export default definePage(Logic, View, css, {
  title: 'Статья — пример материала',
  defaults: {},
  preview: {
    width: 1440,
    height: 4920,
  },
});
