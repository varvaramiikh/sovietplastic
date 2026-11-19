// @ts-nocheck
import Button from '../../../../components/ui/Button/Button.tsx';
/* Сгенерировано из original-export/project/Admin.dc.html (блок <sc-if value="{{ s.dash }}">) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { Fragment } from 'react';
import type { SectionSDashProps } from './SectionSDash';
import './SectionSDash.css';
import { __s, __css, __raw, __href } from '../../../../runtime/dc';

export default function SectionSDash({ $v }: SectionSDashProps) {
  return (
    <>
      <div className="a-top">
        <div>
          <h1 className="a-h1">Обзор</h1>
          <p className="a-sub">{$v?.dash?.hello}</p>
        </div>
        <Button type="button" className="a-btn" onClick={$v?.dash?.addFigure}>
          + Добавить статуэтку
        </Button>
      </div>
      <div className="a-tiles" style={{ marginTop: '28px' }}>
        {($v?.dash?.tiles || []).map((t, $index) => (
          <Fragment key={$index}>
            <Button type="button" className="a-tile" onClick={t?.go}>
              <p className="n">{t?.n}</p>
              <p className="l">{t?.l}</p>
            </Button>
          </Fragment>
        ))}
      </div>
      <p className="a-sync" style={{ marginTop: '16px' }}>
        <i></i>
        {$v?.dash?.sync}
      </p>
      <div className="a-split" style={{ marginTop: '24px' }}>
        <section className="a-card">
          <h2>Последние изменения</h2>{' '}
          {$v?.dash?.noRecent ? (
            <>
              <p className="a-hint" style={{ marginTop: '12px' }}>
                Изменений пока нет.
              </p>
            </>
          ) : null}{' '}
          <div style={{ marginTop: '12px' }}>
            {($v?.dash?.recent || []).map((r, $index) => (
              <Fragment key={$index}>
                <div className="a-tr" style={{ gridTemplateColumns: '130px minmax(0,1fr) 170px' }}>
                  <span className="a-hint">{r?.type}</span>
                  <Button type="button" className="a-tbtn" onClick={r?.go}>
                    {r?.title}
                  </Button>
                  <span className="a-hint">{r?.date}</span>
                </div>
              </Fragment>
            ))}
          </div>
        </section>
        <section className="a-card">
          <h2>Что заполнить</h2>
          <p className="a-hint">Считается по текущим данным.</p>
          <div style={{ marginTop: '12px' }}>
            {($v?.dash?.tasks || []).map((t, $index) => (
              <Fragment key={$index}>
                <div className="a-tr" style={{ gridTemplateColumns: 'minmax(0,1fr) 56px 90px' }}>
                  <span>{t?.l}</span>
                  <b style={{ fontWeight: '500', textAlign: 'right' }}>{t?.n}</b>
                  {t?.has ? (
                    <>
                      <Button type="button" className="a-link" style={{ justifySelf: 'end' }} onClick={t?.go}>
                        Показать
                      </Button>
                    </>
                  ) : null}
                </div>
              </Fragment>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
