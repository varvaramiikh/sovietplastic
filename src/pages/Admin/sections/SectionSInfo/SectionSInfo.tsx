// @ts-nocheck
import TextArea from '../../../../components/ui/TextArea/TextArea.tsx';
import TextInput from '../../../../components/ui/TextInput/TextInput.tsx';
import Link from '../../../../components/ui/Link/Link.tsx';
import Button from '../../../../components/ui/Button/Button.tsx';
/* Сгенерировано из original-export/project/Admin.dc.html (блок <sc-if value="{{ s.info }}">) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { Fragment } from 'react';
import type { SectionSInfoProps } from './SectionSInfo';
import './SectionSInfo.css';
import { __s, __css, __raw, __href } from '../../../../runtime/dc';

export default function SectionSInfo({ $v }: SectionSInfoProps) {
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
      <div className="a-tabs" role="tablist">
        <Button type="button" role="tab" className={`a-tab ${__s($v?.F?.editCls)}`} onClick={$v?.F?.toEdit}>
          Редактор
        </Button>
        <Button type="button" role="tab" className={`a-tab ${__s($v?.F?.prevCls)}`} onClick={$v?.F?.toPrev}>
          Предпросмотр
        </Button>
      </div>{' '}
      {$v?.F?.editing ? (
        <>
          <section className="a-card" style={{ maxWidth: '900px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="a-f">
                <label htmlFor="i-name">
                  Название
                  <span className="a-req">*</span>
                </label>
                <TextInput
                  id="i-name"
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
              </div>
              <div className="a-f" style={{ maxWidth: '260px' }}>
                <label htmlFor="i-date">
                  Дата материала
                  <span className="a-req">*</span>
                </label>
                <TextInput
                  id="i-date"
                  className="a-input"
                  type="date"
                  value={$v?.F?.d?.infoDate}
                  onChange={$v?.F?.set?.infoDate}
                  aria-invalid={$v?.F?.inv?.infoDate}
                />
                {$v?.F?.e?.infoDate ? (
                  <>
                    <span className="a-err">{$v?.F?.em?.infoDate}</span>
                  </>
                ) : null}
              </div>
              <div className="a-f">
                <label htmlFor="a-body">Основной текст</label>{' '}
                <div className="a-tool" role="toolbar" aria-label="Форматирование">
                  <Button type="button" onClick={$v?.F?.fmt?.h}>
                    Заголовок
                  </Button>
                  <Button type="button" onClick={$v?.F?.fmt?.b}>
                    <b>Жирный</b>
                  </Button>
                  <Button type="button" onClick={$v?.F?.fmt?.i}>
                    <i>Курсив</i>
                  </Button>
                  <Button type="button" onClick={$v?.F?.fmt?.ul}>
                    Список
                  </Button>
                  <Button type="button" onClick={$v?.F?.fmt?.q}>
                    Цитата
                  </Button>
                  <Button type="button" onClick={$v?.F?.fmt?.a}>
                    Ссылка
                  </Button>
                </div>{' '}
                <TextArea
                  id="a-body"
                  className="a-textarea"
                  style={{ minHeight: '360px', fontSize: '16px' }}
                  value={$v?.F?.d?.text}
                  onChange={$v?.F?.set?.text}
                />{' '}
                <p className="a-hint" style={{ margin: '0' }}>
                  Выделите текст и нажмите кнопку. Пустая строка начинает новый абзац.
                </p>
              </div>
              <div className="a-grid2">
                <div className="a-f">
                  <label htmlFor="i-st">Источник</label>
                  <TextInput
                    id="i-st"
                    className="a-input"
                    type="text"
                    value={$v?.F?.d?.sourceText}
                    onChange={$v?.F?.set?.sourceText}
                  />
                </div>
                <div className="a-f">
                  <label htmlFor="i-su">Ссылка на источник</label>
                  <TextInput
                    id="i-su"
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
              </div>
              <p className="a-hint" style={{ margin: '0' }}>
                В базе у статей нет признака публикации: все статьи видны на сайте.
              </p>{' '}
              {$v?.F?.canDelete ? (
                <>
                  <Button
                    type="button"
                    className="a-ghost a-danger"
                    style={{ alignSelf: 'flex-start' }}
                    onClick={$v?.F?.del}
                  >
                    Удалить статью
                  </Button>
                </>
              ) : null}{' '}
            </div>
          </section>
        </>
      ) : null}{' '}
      {$v?.F?.preview ? (
        <>
          <article className="a-prev">
            <p className="a-hint" style={{ margin: '0 0 8px' }}>
              {$v?.F?.prevDate}
            </p>
            <h2
              style={{
                margin: '0 0 20px',
                fontSize: '36px',
                fontWeight: '500',
                lineHeight: '1.05',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
              }}
            >
              {$v?.F?.prevTitle}
            </h2>{' '}
            {($v?.F?.blocks || []).map((b, $index) => (
              <Fragment key={$index}>
                {' '}
                {b?.h ? (
                  <>
                    <h3>{b?.text}</h3>
                  </>
                ) : null}{' '}
                {b?.p ? (
                  <>
                    <p>
                      {(b?.segs || []).map((g, $index) => (
                        <Fragment key={$index}>
                          {g?.isLink ? (
                            <>
                              <Link href={__href(g?.href)} target="_blank" rel="noopener">
                                {g?.t}
                              </Link>
                            </>
                          ) : null}
                          {g?.plain ? (
                            <>
                              <span style={__css(`font-weight: ${__s(g?.fw)}; font-style: ${__s(g?.fs)}`)}>{g?.t}</span>
                            </>
                          ) : null}
                        </Fragment>
                      ))}
                    </p>
                  </>
                ) : null}{' '}
                {b?.q ? (
                  <>
                    <blockquote>{b?.text}</blockquote>
                  </>
                ) : null}{' '}
                {b?.ul ? (
                  <>
                    <ul>
                      {(b?.items || []).map((li, $index) => (
                        <Fragment key={$index}>
                          <li>{li?.t}</li>
                        </Fragment>
                      ))}
                    </ul>
                  </>
                ) : null}{' '}
              </Fragment>
            ))}{' '}
            {$v?.F?.hasSource ? (
              <>
                <p className="a-hint" style={{ margin: '24px 0 0' }}>
                  {'Источник: '}
                  <Link href={__href($v?.F?.d?.sourceUrl)} target="_blank" rel="noopener">
                    {$v?.F?.sourceLabel}
                  </Link>
                </p>
              </>
            ) : null}{' '}
          </article>
        </>
      ) : null}{' '}
    </>
  );
}
