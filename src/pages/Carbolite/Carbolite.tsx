// @ts-nocheck
import Link from '../../components/ui/Link/Link.tsx';
/* Сгенерировано из original-export/project/Carbolite.dc.html (разметка внутри <x-dc>) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
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
        <SiteHeader current="carbolite" />
        <main style={{ flex: 'none' }}>
          <section className="sp-wrap" style={{ padding: '48px 48px 56px', background: 'transparent' }}>
            <nav
              aria-label="Навигационная цепочка"
              style={{ fontSize: '13px', color: '#4E6488', display: 'flex', gap: '10px' }}
            >
              <Link href="/" style={{ color: '#4E6488' }}>
                Главная
              </Link>
              <span aria-hidden="true">/</span>
              <span>О карболите</span>
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
                О карболите
              </h1>
            </div>
          </section>
          <section className="sp-wrap" style={{ padding: '0 48px' }}>
            <figure
              style={{
                margin: '0',
                height: '560px',
                background: '#DBE2EA',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                gap: '56px',
                paddingBottom: '36px',
                boxSizing: 'border-box',
                overflow: 'hidden',
              }}
            >
              {' '}
              <img src="/images/placeholder-skater.svg" alt="" style={{ height: '250px', width: 'auto' }} />{' '}
              <img src="/images/placeholder-ballerina.svg" alt="" style={{ height: '380px', width: 'auto' }} />{' '}
              <img src="/images/placeholder-boxer.svg" alt="" style={{ height: '300px', width: 'auto' }} />{' '}
              <img src="/images/placeholder-skater.svg" alt="" style={{ height: '220px', width: 'auto' }} />{' '}
            </figure>
          </section>
          <div aria-hidden="true" style={{ margin: '88px 48px 0', height: '1px', background: '#DCE2EA' }}></div>
          <section className="sp-wrap" style={{ padding: '88px 48px 0' }}>
            <div className="sp-split">
              <div>
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
                  Что такое
                  <br />
                  карболит
                </h2>
                <p style={{ margin: '40px 0 0', maxWidth: '460px', fontSize: '21px', lineHeight: '30px' }}>
                  Определение материала простыми словами — без предположения, что читатель уже разбирается в
                  коллекционировании.
                </p>
                <p
                  style={{
                    margin: '20px 0 0',
                    maxWidth: '460px',
                    fontSize: '18px',
                    lineHeight: '29px',
                    color: '#3E4A60',
                  }}
                >
                  Связь материала со статуэтками, представленными в собрании. Текст будет подготовлен позже.
                </p>
              </div>
              <div className="sp-gap"></div>
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
                <img
                  src="/images/placeholder-ballerina.svg"
                  alt="Деталь поверхности материала"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '60px',
                    height: '700px',
                    width: 'auto',
                    transform: 'translateX(-50%)',
                  }}
                />{' '}
              </figure>
            </div>
          </section>
          <section className="sp-wrap" style={{ marginTop: '88px', padding: '80px 48px 88px', background: '#F8FAFD' }}>
            <div className="sp-split-r">
              <figure
                style={{
                  margin: '0',
                  height: '528px',
                  background: '#DBE2EA',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                {' '}
                <img
                  src="/images/placeholder-boxer.svg"
                  alt="Основание статуэтки со следами производства"
                  style={{ height: '190%', width: 'auto', marginBottom: '-10px' }}
                />{' '}
              </figure>
              <div className="sp-gap"></div>
              <div>
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
                  Как создавались
                  <br />
                  статуэтки
                </h2>
                <p style={{ margin: '40px 0 0', maxWidth: '460px', fontSize: '21px', lineHeight: '30px' }}>
                  Особенности производства, которые можно увидеть на самих предметах.
                </p>
                <p
                  style={{
                    margin: '20px 0 0',
                    maxWidth: '460px',
                    paddingLeft: '20px',
                    borderLeft: '2px solid #A9B9D2',
                    fontSize: '16px',
                    lineHeight: '25px',
                    color: '#3E4A60',
                  }}
                >
                  Исторические даты, состав материала и сведения о предприятиях добавляются только по проверенным
                  источникам.
                </p>
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
                Особенности
                <br />
                предметов
              </h2>
              <p style={{ margin: '0 0 4px', maxWidth: '460px', fontSize: '18px', lineHeight: '29px' }}>
                Характерные свойства, которые можно рассмотреть на фотографиях: цвет, блеск, вес, клейма и отметки.
                Текст будет подготовлен позже.
              </p>
            </div>
            <div className="sp-pair" style={{ marginTop: '48px' }}>
              <figure style={{ margin: '0' }}>
                <div
                  style={{
                    height: '420px',
                    background: '#DBE2EA',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src="/images/placeholder-skater.svg"
                    alt="Клеймо на основании"
                    style={{ height: '210%', width: 'auto', marginBottom: '-20px' }}
                  />
                </div>
                <figcaption
                  style={{
                    marginTop: '14px',
                    borderTop: '1px solid #C9D1DB',
                    paddingTop: '14px',
                    fontSize: '18px',
                    lineHeight: '24px',
                  }}
                >
                  Клеймо или отметка на основании
                  <span style={{ display: 'block', marginTop: '4px', fontSize: '14px', color: '#4E6488' }}>
                    Подпись: что изображено
                  </span>
                </figcaption>
              </figure>
              <figure style={{ margin: '0' }}>
                <div
                  style={{
                    height: '420px',
                    background: '#DBE2EA',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '48px',
                    overflow: 'hidden',
                  }}
                >
                  <img src="/images/placeholder-ballerina.svg" alt="" style={{ height: '74%', width: 'auto' }} />
                  <img
                    src="/images/placeholder-ballerina.svg"
                    alt=""
                    style={{ height: '74%', width: 'auto', opacity: '0.7' }}
                  />
                </div>
                <figcaption
                  style={{
                    marginTop: '14px',
                    borderTop: '1px solid #C9D1DB',
                    paddingTop: '14px',
                    fontSize: '18px',
                    lineHeight: '24px',
                  }}
                >
                  Сравнение цвета или фактуры двух предметов
                  <span style={{ display: 'block', marginTop: '4px', fontSize: '14px', color: '#4E6488' }}>
                    Подпись: что изображено
                  </span>
                </figcaption>
              </figure>
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

/* Сгенерировано из original-export/project/Carbolite.dc.html инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { definePage } from '../../runtime/definePage';
import Logic from './Carbolite';
import css from './Carbolite.css?raw';

/** Страница «О карболите». defaults — значения настроек (Tweaks) из data-props оригинала. */
export default definePage(Logic, View, css, {
  title: 'О карболите',
  defaults: {},
  preview: {
    width: 1440,
    height: 3860,
  },
});
