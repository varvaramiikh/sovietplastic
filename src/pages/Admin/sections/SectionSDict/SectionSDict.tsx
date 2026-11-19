// @ts-nocheck
import Image from '../../../../components/ui/Image/Image.tsx';
import TextArea from '../../../../components/ui/TextArea/TextArea.tsx';
import Checkbox from '../../../../components/ui/Checkbox/Checkbox.tsx';
import TextInput from '../../../../components/ui/TextInput/TextInput.tsx';
import Link from '../../../../components/ui/Link/Link.tsx';
import Button from '../../../../components/ui/Button/Button.tsx';
/* Сгенерировано из original-export/project/Admin.dc.html (блок <sc-if value="{{ s.dict }}">) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { Fragment } from 'react';
import type { SectionSDictProps } from './SectionSDict';
import './SectionSDict.css';
import { __s, __css, __raw, __href } from '../../../../runtime/dc';

export default function SectionSDict({ $v }: SectionSDictProps) {
  return (
    <>
      <div className="a-formhead">
        <div style={{ minWidth: '0' }}>
          <nav className="a-crumbs" aria-label="Путь">
            {($v?.crumbs || []).map((c, $index) => (
              <Fragment key={$index}>
                {c?.link ? (
                  <>
                    <Button type="button" className="a-crumb" onClick={c?.go}>
                      {c?.l}
                    </Button>
                    <span aria-hidden="true">→</span>
                  </>
                ) : null}
                {c?.last ? (
                  <>
                    <span className="a-crumb-cur">{c?.l}</span>
                  </>
                ) : null}
              </Fragment>
            ))}
          </nav>
          <h1 className="a-h1" style={{ fontSize: '30px', marginTop: '10px' }}>
            {$v?.F?.heading}
          </h1>{' '}
          {$v?.F?.hasSub ? (
            <>
              <p className="a-sub" style={{ marginTop: '6px' }}>
                {$v?.F?.sub}
              </p>
            </>
          ) : null}{' '}
        </div>
        <div className="a-row" style={{ flex: 'none' }}>
          {' '}
          <span className={$v?.F?.dirtyCls}>{$v?.F?.dirtyText}</span>{' '}
          {$v?.F?.hasView ? (
            <>
              <Link href={__href($v?.F?.viewHref)} className="a-ghost" onClick={$v?.F?.view}>
                Открыть на сайте ↗
              </Link>
            </>
          ) : null}{' '}
          <Button type="button" className="a-ghost" onClick={$v?.F?.cancel}>
            Отмена
          </Button>{' '}
          <Button type="button" className="a-btn" disabled={$v?.saving} onClick={$v?.F?.save}>
            {$v?.F?.saveText}
          </Button>{' '}
        </div>
      </div>{' '}
      {$v?.F?.hasErrors ? (
        <>
          <p className="a-alert" role="alert" style={{ margin: '0 0 20px' }}>
            {$v?.F?.errorText}
          </p>
        </>
      ) : null}{' '}
      <section className="a-card" style={{ maxWidth: '880px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="a-f">
            <label htmlFor="d-name">
              {$v?.F?.nameLabel}
              <span className="a-req">*</span>
            </label>
            <TextInput
              id="d-name"
              className="a-input"
              type="text"
              value={$v?.F?.d?.name}
              onChange={$v?.F?.set?.name}
              aria-invalid={$v?.F?.inv?.name}
            />
            {$v?.F?.e?.name ? (
              <>
                <span className="a-err">{$v?.F?.em?.name}</span>
              </>
            ) : null}
            {$v?.F?.hasSimilar ? (
              <>
                <span className="a-warn">{$v?.F?.similar}</span>
              </>
            ) : null}
          </div>{' '}
          {$v?.F?.isKind ? (
            <>
              <label className="a-switch">
                <Checkbox type="checkbox" checked={$v?.F?.d?.visible} onChange={$v?.F?.set?.visibleBox} />
                <span className="a-switch-ui" aria-hidden="true"></span>
                <span>
                  <b style={{ fontWeight: '500' }}>Показывать на сайте</b>
                  <br />
                  <span className="a-hint">Скрытый тип убирает с сайта и все статуэтки этого типа.</span>
                </span>
              </label>
            </>
          ) : null}{' '}
          {$v?.F?.isAuthor ? (
            <>
              <div className="a-f">
                <label htmlFor="d-text">Текст об авторе</label>
                <TextArea
                  id="d-text"
                  className="a-textarea"
                  style={{ minHeight: '180px' }}
                  value={$v?.F?.d?.text}
                  onChange={$v?.F?.set?.text}
                />
              </div>
              <div className="a-grid2">
                <div className="a-f">
                  <label htmlFor="d-st">Источник</label>
                  <TextInput
                    id="d-st"
                    className="a-input"
                    type="text"
                    value={$v?.F?.d?.sourceText}
                    onChange={$v?.F?.set?.sourceText}
                  />
                </div>
                <div className="a-f">
                  <label htmlFor="d-su">Ссылка на источник</label>
                  <TextInput
                    id="d-su"
                    className="a-input"
                    type="url"
                    placeholder="https://"
                    value={$v?.F?.d?.sourceUrl}
                    onChange={$v?.F?.set?.sourceUrl}
                    aria-invalid={$v?.F?.inv?.sourceUrl}
                  />
                  {$v?.F?.e?.sourceUrl ? (
                    <>
                      <span className="a-err">{$v?.F?.em?.sourceUrl}</span>
                    </>
                  ) : null}
                </div>
              </div>
            </>
          ) : null}{' '}
          {$v?.F?.showLinked ? (
            <>
              <div>
                <p className="a-lab" style={{ margin: '0' }}>
                  {$v?.F?.linkedTitle}
                  {' · '}
                  {$v?.F?.linkedCount}
                </p>{' '}
                {$v?.F?.noLinked ? (
                  <>
                    <p className="a-hint" style={{ margin: '8px 0 0' }}>
                      Связанных статуэток нет.
                    </p>
                  </>
                ) : null}{' '}
                <div style={{ marginTop: '8px' }}>
                  {($v?.F?.linked || []).map((v, $index) => (
                    <Fragment key={$index}>
                      <div className="a-tr" style={{ gridTemplateColumns: '56px minmax(0,1fr)' }}>
                        <div className="a-thumb">
                          <Image src={v?.src} alt="" />
                        </div>
                        <Button type="button" className="a-tbtn" onClick={v?.go}>
                          {v?.l}
                        </Button>
                      </div>
                    </Fragment>
                  ))}
                </div>{' '}
                {$v?.F?.moreLinked ? (
                  <>
                    <Button type="button" className="a-link" style={{ marginTop: '10px' }} onClick={$v?.F?.allLinked}>
                      Показать все в списке статуэток
                    </Button>
                  </>
                ) : null}{' '}
              </div>
            </>
          ) : null}{' '}
          <div style={{ paddingTop: '16px', borderTop: '1px solid #DCE2EA' }}>
            <div className="a-meta">
              {' '}
              <span>
                {'Создано: '}
                <b>{$v?.F?.svc?.created}</b>
              </span>{' '}
              <span>
                {'Кем создано: '}
                <b>{$v?.F?.svc?.createdBy}</b>
              </span>{' '}
              <span>
                {'Изменено: '}
                <b>{$v?.F?.svc?.modified}</b>
              </span>{' '}
              <span>
                {'Кем изменено: '}
                <b>{$v?.F?.svc?.modifiedBy}</b>
              </span>{' '}
            </div>
          </div>{' '}
          {$v?.F?.canDelete ? (
            <>
              <Button
                type="button"
                className="a-ghost a-danger"
                style={{ alignSelf: 'flex-start' }}
                onClick={$v?.F?.del}
              >
                {$v?.F?.delText}
              </Button>
            </>
          ) : null}{' '}
        </div>
      </section>
    </>
  );
}
