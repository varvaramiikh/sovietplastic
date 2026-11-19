// @ts-nocheck
import TextArea from '../../../../components/ui/TextArea/TextArea.tsx';
import Checkbox from '../../../../components/ui/Checkbox/Checkbox.tsx';
import TextInput from '../../../../components/ui/TextInput/TextInput.tsx';
import Link from '../../../../components/ui/Link/Link.tsx';
import Button from '../../../../components/ui/Button/Button.tsx';
/* Сгенерировано из original-export/project/Admin.dc.html (блок <sc-if value="{{ s.figure }}">) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { Fragment } from 'react';
import type { SectionSFigureProps } from './SectionSFigure';
import './SectionSFigure.css';
import { __s, __css, __raw, __href } from '../../../../runtime/dc';

export default function SectionSFigure({ $v }: SectionSFigureProps) {
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
        {($v?.F?.tabs || []).map((tb, $index) => (
          <Fragment key={$index}>
            <Button
              type="button"
              role="tab"
              className={`a-tab ${__s(tb?.cls)}`}
              aria-selected={tb?.sel}
              disabled={tb?.disabled}
              title={tb?.title}
              onClick={tb?.go}
            >
              {tb?.l}
              {tb?.hasN ? (
                <>
                  <b>{tb?.n}</b>
                </>
              ) : null}
            </Button>
          </Fragment>
        ))}
      </div>{' '}
      {$v?.F?.isNew ? (
        <>
          <p className="a-note" style={{ margin: '0 0 20px' }}>
            Фотографии, связи и заметки станут доступны после первого сохранения — у новой статуэтки ещё нет ID.
          </p>
        </>
      ) : null}{' '}
      {$v?.F?.t?.main ? (
        <>
          <section className="a-card" style={{ maxWidth: '880px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="a-f">
                <label htmlFor="f-name">
                  Название
                  <span className="a-req">*</span>
                </label>
                <TextInput
                  id="f-name"
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
              <div className="a-grid2">
                <div className="a-f">
                  <label htmlFor="f-kind">
                    Тип статуэтки
                    <span className="a-req">*</span>
                  </label>
                  <div className="a-row">
                    <div className={`a-dd ${__s($v?.F?.kindDD?.wCls)}`} style={{ flex: '1' }}>
                      <Button
                        type="button"
                        id="f-kind"
                        className="a-select a-dd-btn"
                        aria-haspopup="listbox"
                        aria-expanded={$v?.F?.kindDD?.exp}
                        aria-label="Тип статуэтки"
                        aria-invalid={$v?.F?.kindDD?.inv}
                        disabled={$v?.F?.kindDD?.disabled}
                        onClick={$v?.F?.kindDD?.toggle}
                      >
                        <span>{$v?.F?.kindDD?.label}</span>
                      </Button>
                      {$v?.F?.kindDD?.open ? (
                        <>
                          <div className="a-dd-list" role="listbox" aria-label="Тип статуэтки">
                            {$v?.F?.kindDD?.searchable ? (
                              <>
                                <TextInput
                                  className="a-input a-dd-q"
                                  type="search"
                                  placeholder="Поиск"
                                  aria-label="Поиск в списке"
                                  value={$v?.F?.kindDD?.q}
                                  onChange={$v?.F?.kindDD?.setQ}
                                />
                              </>
                            ) : null}
                            {($v?.F?.kindDD?.opts || []).map((o, $index) => (
                              <Fragment key={$index}>
                                <Button
                                  type="button"
                                  role="option"
                                  aria-selected={o?.sel}
                                  className={`a-dd-opt ${__s(o?.cls)}`}
                                  onClick={o?.pick}
                                >
                                  {o?.hasImg ? (
                                    <>
                                      <img src={o?.img} alt="" className="a-dd-img" />
                                    </>
                                  ) : null}
                                  <span>{o?.l}</span>
                                </Button>
                              </Fragment>
                            ))}
                            {$v?.F?.kindDD?.none ? (
                              <>
                                <p className="a-hint" style={{ margin: '8px 10px' }}>
                                  Ничего не найдено
                                </p>
                              </>
                            ) : null}
                          </div>
                        </>
                      ) : null}
                    </div>
                    <Button
                      type="button"
                      className="a-icon a-icon-lg"
                      aria-label="Добавить тип"
                      title="Добавить тип"
                      onClick={$v?.F?.quickKind}
                    >
                      +
                    </Button>
                  </div>
                  {$v?.F?.e?.kind ? (
                    <>
                      <span className="a-err">{$v?.F?.em?.kind}</span>
                    </>
                  ) : null}
                </div>
                <div className="a-f">
                  <label htmlFor="f-author">Автор</label>
                  <div className="a-row">
                    <div className={`a-dd ${__s($v?.F?.authorDD?.wCls)}`} style={{ flex: '1' }}>
                      <Button
                        type="button"
                        id="f-author"
                        className="a-select a-dd-btn"
                        aria-haspopup="listbox"
                        aria-expanded={$v?.F?.authorDD?.exp}
                        aria-label="Автор"
                        aria-invalid={$v?.F?.authorDD?.inv}
                        disabled={$v?.F?.authorDD?.disabled}
                        onClick={$v?.F?.authorDD?.toggle}
                      >
                        <span>{$v?.F?.authorDD?.label}</span>
                      </Button>
                      {$v?.F?.authorDD?.open ? (
                        <>
                          <div className="a-dd-list" role="listbox" aria-label="Автор">
                            {$v?.F?.authorDD?.searchable ? (
                              <>
                                <TextInput
                                  className="a-input a-dd-q"
                                  type="search"
                                  placeholder="Поиск"
                                  aria-label="Поиск в списке"
                                  value={$v?.F?.authorDD?.q}
                                  onChange={$v?.F?.authorDD?.setQ}
                                />
                              </>
                            ) : null}
                            {($v?.F?.authorDD?.opts || []).map((o, $index) => (
                              <Fragment key={$index}>
                                <Button
                                  type="button"
                                  role="option"
                                  aria-selected={o?.sel}
                                  className={`a-dd-opt ${__s(o?.cls)}`}
                                  onClick={o?.pick}
                                >
                                  {o?.hasImg ? (
                                    <>
                                      <img src={o?.img} alt="" className="a-dd-img" />
                                    </>
                                  ) : null}
                                  <span>{o?.l}</span>
                                </Button>
                              </Fragment>
                            ))}
                            {$v?.F?.authorDD?.none ? (
                              <>
                                <p className="a-hint" style={{ margin: '8px 10px' }}>
                                  Ничего не найдено
                                </p>
                              </>
                            ) : null}
                          </div>
                        </>
                      ) : null}
                    </div>
                    <Button
                      type="button"
                      className="a-icon a-icon-lg"
                      aria-label="Добавить автора"
                      title="Добавить автора"
                      onClick={$v?.F?.quickAuthor}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>{' '}
              {$v?.F?.q?.on ? (
                <>
                  <div className="a-quick">
                    <span className="a-lab" style={{ flex: 'none' }}>
                      {$v?.F?.q?.label}
                    </span>
                    <TextInput
                      className="a-input"
                      type="text"
                      aria-label={$v?.F?.q?.label}
                      value={$v?.F?.q?.name}
                      onChange={$v?.F?.q?.setName}
                    />
                    <Button type="button" className="a-btn" onClick={$v?.F?.q?.add}>
                      Добавить
                    </Button>
                    <Button type="button" className="a-link" onClick={$v?.F?.q?.cancel}>
                      Отмена
                    </Button>
                  </div>
                  {$v?.F?.q?.hasErr ? (
                    <>
                      <span className="a-err">{$v?.F?.q?.err}</span>
                    </>
                  ) : null}
                </>
              ) : null}{' '}
              <div className="a-f">
                <label htmlFor="f-factory">Производитель</label>
                <TextInput
                  id="f-factory"
                  className="a-input"
                  type="text"
                  placeholder="Не указан"
                  value={$v?.F?.d?.factoryName}
                  onChange={$v?.F?.set?.factoryName}
                />
                <span className="a-hint">Обычная строка: отдельного справочника производителей в базе нет.</span>
              </div>
              <div className="a-grid2">
                <div className="a-f">
                  <label htmlFor="f-h">Высота, см</label>
                  <TextInput
                    id="f-h"
                    className="a-input"
                    type="text"
                    inputMode="decimal"
                    placeholder="Не указана"
                    value={$v?.F?.d?.height}
                    onChange={$v?.F?.set?.height}
                    aria-invalid={$v?.F?.inv?.height}
                  />
                  {$v?.F?.e?.height ? (
                    <>
                      <span className="a-err">{$v?.F?.em?.height}</span>
                    </>
                  ) : null}
                </div>
                <div className="a-f">
                  <label htmlFor="f-l">Длина, см</label>
                  <TextInput
                    id="f-l"
                    className="a-input"
                    type="text"
                    inputMode="decimal"
                    placeholder="Не указана"
                    value={$v?.F?.d?.length}
                    onChange={$v?.F?.set?.length}
                    aria-invalid={$v?.F?.inv?.length}
                  />
                  {$v?.F?.e?.length ? (
                    <>
                      <span className="a-err">{$v?.F?.em?.length}</span>
                    </>
                  ) : null}
                </div>
              </div>
              <p className="a-hint" style={{ margin: '-8px 0 0' }}>
                Пустое поле — размер не указан. Старые нулевые значения при переносе тоже считаются «не указан», а не
                размером 0.
              </p>
              <div className="a-f">
                <span className="a-lab">Метки</span>{' '}
                <div className="a-chips">
                  {($v?.F?.tagChips || []).map((tg, $index) => (
                    <Fragment key={$index}>
                      <Button
                        type="button"
                        className="a-chip a-chip-sel"
                        aria-label={`Убрать метку ${__s(tg?.l)}`}
                        onClick={tg?.remove}
                      >
                        {tg?.l}
                        {' ×'}
                      </Button>
                    </Fragment>
                  ))}
                  {$v?.F?.noTags ? (
                    <>
                      <span className="a-hint">Метки не выбраны</span>
                    </>
                  ) : null}
                </div>
                <div className="a-row" style={{ marginTop: '6px' }}>
                  <div className={`a-dd ${__s($v?.F?.tagDD?.wCls)}`} style={{ maxWidth: '360px' }}>
                    <Button
                      type="button"
                      className="a-select a-dd-btn"
                      aria-haspopup="listbox"
                      aria-expanded={$v?.F?.tagDD?.exp}
                      aria-label="Добавить метку"
                      aria-invalid={$v?.F?.tagDD?.inv}
                      disabled={$v?.F?.tagDD?.disabled}
                      onClick={$v?.F?.tagDD?.toggle}
                    >
                      <span>{$v?.F?.tagDD?.label}</span>
                    </Button>
                    {$v?.F?.tagDD?.open ? (
                      <>
                        <div className="a-dd-list" role="listbox" aria-label="Добавить метку">
                          {$v?.F?.tagDD?.searchable ? (
                            <>
                              <TextInput
                                className="a-input a-dd-q"
                                type="search"
                                placeholder="Поиск"
                                aria-label="Поиск в списке"
                                value={$v?.F?.tagDD?.q}
                                onChange={$v?.F?.tagDD?.setQ}
                              />
                            </>
                          ) : null}
                          {($v?.F?.tagDD?.opts || []).map((o, $index) => (
                            <Fragment key={$index}>
                              <Button
                                type="button"
                                role="option"
                                aria-selected={o?.sel}
                                className={`a-dd-opt ${__s(o?.cls)}`}
                                onClick={o?.pick}
                              >
                                {o?.hasImg ? (
                                  <>
                                    <img src={o?.img} alt="" className="a-dd-img" />
                                  </>
                                ) : null}
                                <span>{o?.l}</span>
                              </Button>
                            </Fragment>
                          ))}
                          {$v?.F?.tagDD?.none ? (
                            <>
                              <p className="a-hint" style={{ margin: '8px 10px' }}>
                                Ничего не найдено
                              </p>
                            </>
                          ) : null}
                        </div>
                      </>
                    ) : null}
                  </div>
                  <Button type="button" className="a-link" onClick={$v?.F?.quickTag}>
                    + Новая метка
                  </Button>
                </div>
              </div>{' '}
              <label className="a-switch">
                <Checkbox type="checkbox" checked={$v?.F?.d?.visible} onChange={$v?.F?.set?.visibleBox} />
                <span className="a-switch-ui" aria-hidden="true"></span>
                <span>
                  <b style={{ fontWeight: '500' }}>Показывать на сайте</b>
                  <br />
                  <span className="a-hint">{$v?.F?.visHint}</span>
                </span>
              </label>{' '}
              <div className="a-f">
                <label htmlFor="f-comment">Комментарий</label>
                <TextArea
                  id="f-comment"
                  className="a-textarea"
                  value={$v?.F?.d?.comment}
                  onChange={$v?.F?.set?.comment}
                />
              </div>
            </div>
          </section>
        </>
      ) : null}{' '}
      {$v?.F?.t?.photos ? (
        <>
          <section className="a-card">
            <div className="a-top" style={{ alignItems: 'center' }}>
              <div>
                <h2>Фотографии</h2>
                <p className="a-hint">
                  Главное фото показывается на сайте. Сжатая копия создаётся автоматически. JPG, PNG или WEBP до 10 МБ.
                </p>
              </div>
            </div>{' '}
            <label className="a-drop" style={{ marginTop: '16px' }}>
              <TextInput
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                aria-label="Добавить фотографии"
                onChange={$v?.F?.addPhotos}
              />
              <span style={{ fontSize: '15px', fontWeight: '500', color: '#1B2A41' }}>Добавить фотографии</span>
              <span className="a-hint">Выберите несколько файлов или перетащите их сюда</span>
            </label>{' '}
            {$v?.F?.uploading ? (
              <>
                <p className="a-hint" style={{ margin: '12px 0 0' }}>
                  {'Обрабатываем файлы: '}
                  {$v?.F?.uploadLeft}…
                </p>
              </>
            ) : null}{' '}
            {($v?.F?.photoErrors || []).map((pe, $index) => (
              <Fragment key={$index}>
                <p className="a-err" style={{ margin: '10px 0 0' }}>
                  {pe?.t}
                </p>
              </Fragment>
            ))}{' '}
            {$v?.F?.noPhotos ? (
              <>
                <div className="a-empty">
                  <p className="t">Фотографий нет</p>
                  <p className="s">На сайте вместо фото будет заглушка.</p>
                </div>
              </>
            ) : null}{' '}
            <div className="a-photos" style={{ marginTop: '16px' }}>
              {($v?.F?.photos || []).map((p, $index) => (
                <Fragment key={$index}>
                  <div className={`a-ph ${__s(p?.mainCls)}`}>
                    {' '}
                    <Button type="button" className="a-ph-img" onClick={p?.viewer} aria-label="Просмотр фото">
                      <img src={p?.thumb} alt="" />
                      {p?.isMain ? (
                        <>
                          <span className="a-ph-tag">Главное</span>
                        </>
                      ) : null}
                    </Button>{' '}
                    <div className="a-ph-body">
                      <p className="a-hint" style={{ margin: '0' }}>
                        {p?.sub}
                      </p>
                      <div className="a-ph-ctl">
                        <div className="a-row" style={{ gap: '6px' }}>
                          <Button
                            type="button"
                            className="a-icon"
                            aria-label="Раньше"
                            disabled={p?.cantUp}
                            onClick={p?.up}
                          >
                            ←
                          </Button>
                          <Button
                            type="button"
                            className="a-icon"
                            aria-label="Позже"
                            disabled={p?.cantDown}
                            onClick={p?.down}
                          >
                            →
                          </Button>
                        </div>
                        <div className={`a-dd ${__s(p?.dd?.wCls)}`} style={{ width: 'auto', minWidth: '0' }}>
                          <Button
                            type="button"
                            className="a-select a-dd-btn"
                            aria-haspopup="listbox"
                            aria-expanded={p?.dd?.exp}
                            aria-label="Действия фото"
                            aria-invalid={p?.dd?.inv}
                            disabled={p?.dd?.disabled}
                            onClick={p?.dd?.toggle}
                          >
                            <span>{p?.dd?.label}</span>
                          </Button>
                          {p?.dd?.open ? (
                            <>
                              <div className="a-dd-list" role="listbox" aria-label="Действия фото">
                                {p?.dd?.searchable ? (
                                  <>
                                    <TextInput
                                      className="a-input a-dd-q"
                                      type="search"
                                      placeholder="Поиск"
                                      aria-label="Поиск в списке"
                                      value={p?.dd?.q}
                                      onChange={p?.dd?.setQ}
                                    />
                                  </>
                                ) : null}
                                {(p?.dd?.opts || []).map((o, $index) => (
                                  <Fragment key={$index}>
                                    <Button
                                      type="button"
                                      role="option"
                                      aria-selected={o?.sel}
                                      className={`a-dd-opt ${__s(o?.cls)}`}
                                      onClick={o?.pick}
                                    >
                                      {o?.hasImg ? (
                                        <>
                                          <img src={o?.img} alt="" className="a-dd-img" />
                                        </>
                                      ) : null}
                                      <span>{o?.l}</span>
                                    </Button>
                                  </Fragment>
                                ))}
                                {p?.dd?.none ? (
                                  <>
                                    <p className="a-hint" style={{ margin: '8px 10px' }}>
                                      Ничего не найдено
                                    </p>
                                  </>
                                ) : null}
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>{' '}
            {$v?.F?.hasReplace ? (
              <>
                <div className="a-quick" style={{ marginTop: '16px' }}>
                  <span>Выберите новый файл для замены фото:</span>
                  <label className="a-ghost" style={{ position: 'relative', overflow: 'hidden' }}>
                    Выбрать файл
                    <TextInput
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      aria-label="Файл для замены"
                      onChange={$v?.F?.replaceFile}
                      style={{ position: 'absolute', inset: '0', opacity: '0', cursor: 'pointer' }}
                    />
                  </label>
                  <Button type="button" className="a-link" onClick={$v?.F?.cancelReplace}>
                    Отмена
                  </Button>
                </div>
              </>
            ) : null}{' '}
          </section>
        </>
      ) : null}{' '}
      {$v?.F?.t?.links ? (
        <>
          <section className="a-card" style={{ maxWidth: '880px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="a-f">
                <label htmlFor="f-st">Источник</label>
                <TextInput
                  id="f-st"
                  className="a-input"
                  type="text"
                  value={$v?.F?.d?.sourceText}
                  onChange={$v?.F?.set?.sourceText}
                  placeholder="Название или описание источника"
                />
              </div>
              <div className="a-f">
                <label htmlFor="f-su">Ссылка на источник</label>
                <div className="a-row">
                  <TextInput
                    id="f-su"
                    className="a-input"
                    type="url"
                    placeholder="https://"
                    value={$v?.F?.d?.sourceUrl}
                    onChange={$v?.F?.set?.sourceUrl}
                    aria-invalid={$v?.F?.inv?.sourceUrl}
                  />
                  {$v?.F?.urlOk ? (
                    <>
                      <Link href={__href($v?.F?.d?.sourceUrl)} target="_blank" rel="noopener" className="a-ghost">
                        Открыть ссылку ↗
                      </Link>
                    </>
                  ) : null}
                </div>
                {$v?.F?.e?.sourceUrl ? (
                  <>
                    <span className="a-err">{$v?.F?.em?.sourceUrl}</span>
                  </>
                ) : null}
              </div>
              <div className="a-f">
                <label htmlFor="f-orig">Оригинал (OriginalID)</label>
                <div className={`a-dd ${__s($v?.F?.origDD?.wCls)}`}>
                  <Button
                    type="button"
                    id="f-orig"
                    className="a-select a-dd-btn"
                    aria-haspopup="listbox"
                    aria-expanded={$v?.F?.origDD?.exp}
                    aria-label="Оригинал"
                    aria-invalid={$v?.F?.origDD?.inv}
                    disabled={$v?.F?.origDD?.disabled}
                    onClick={$v?.F?.origDD?.toggle}
                  >
                    <span>{$v?.F?.origDD?.label}</span>
                  </Button>
                  {$v?.F?.origDD?.open ? (
                    <>
                      <div className="a-dd-list" role="listbox" aria-label="Оригинал">
                        {$v?.F?.origDD?.searchable ? (
                          <>
                            <TextInput
                              className="a-input a-dd-q"
                              type="search"
                              placeholder="Поиск"
                              aria-label="Поиск в списке"
                              value={$v?.F?.origDD?.q}
                              onChange={$v?.F?.origDD?.setQ}
                            />
                          </>
                        ) : null}
                        {($v?.F?.origDD?.opts || []).map((o, $index) => (
                          <Fragment key={$index}>
                            <Button
                              type="button"
                              role="option"
                              aria-selected={o?.sel}
                              className={`a-dd-opt ${__s(o?.cls)}`}
                              onClick={o?.pick}
                            >
                              {o?.hasImg ? (
                                <>
                                  <img src={o?.img} alt="" className="a-dd-img" />
                                </>
                              ) : null}
                              <span>{o?.l}</span>
                            </Button>
                          </Fragment>
                        ))}
                        {$v?.F?.origDD?.none ? (
                          <>
                            <p className="a-hint" style={{ margin: '8px 10px' }}>
                              Ничего не найдено
                            </p>
                          </>
                        ) : null}
                      </div>
                    </>
                  ) : null}
                </div>
                <span className="a-hint">
                  Статуэтка, вариантом которой является эта запись. Правила вариантов уточняются.
                </span>
              </div>
              <div>
                <p className="a-lab" style={{ margin: '0' }}>
                  {'Варианты этой статуэтки · '}
                  {$v?.F?.variantCount}
                </p>{' '}
                {$v?.F?.noVariants ? (
                  <>
                    <p className="a-hint" style={{ margin: '8px 0 0' }}>
                      Нет записей, у которых эта статуэтка указана как оригинал.
                    </p>
                  </>
                ) : null}{' '}
                <div style={{ marginTop: '8px' }}>
                  {($v?.F?.variants || []).map((v, $index) => (
                    <Fragment key={$index}>
                      <div className="a-tr" style={{ gridTemplateColumns: '56px minmax(0,1fr)' }}>
                        <div className="a-thumb">
                          <img src={v?.src} alt="" />
                        </div>
                        <Button type="button" className="a-tbtn" onClick={v?.go}>
                          {v?.l}
                        </Button>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null}{' '}
      {$v?.F?.t?.notes ? (
        <>
          <section className="a-card">
            <div className="a-top" style={{ alignItems: 'center' }}>
              <div>
                <h2>Заметки пользователей</h2>
                <p className="a-hint">Личные записи пользователей. На сайте в карточке статуэтки не публикуются.</p>
              </div>
              <Button type="button" className="a-btn" onClick={$v?.F?.addNote}>
                + Добавить заметку
              </Button>
            </div>{' '}
            {$v?.F?.noNotes ? (
              <>
                <div className="a-empty">
                  <p className="t">Заметок нет</p>
                </div>
              </>
            ) : null}{' '}
            <div style={{ marginTop: '12px' }}>
              {($v?.F?.notes || []).map((nt, $index) => (
                <Fragment key={$index}>
                  <div className="a-tr" style={{ gridTemplateColumns: 'minmax(0,1fr) minmax(0,2fr) 120px 90px 110px' }}>
                    <span>{nt?.user}</span>
                    <span className="a-hint" style={{ fontSize: '14px' }}>
                      {nt?.text}
                    </span>
                    <span>{nt?.price}</span>
                    <span className="a-hint">{nt?.cur}</span>
                    <div style={{ justifySelf: 'end' }}>
                      <div className={`a-dd ${__s(nt?.dd?.wCls)}`} style={{ width: 'auto', minWidth: '0' }}>
                        <Button
                          type="button"
                          className="a-select a-dd-btn"
                          aria-haspopup="listbox"
                          aria-expanded={nt?.dd?.exp}
                          aria-label="Действия заметки"
                          aria-invalid={nt?.dd?.inv}
                          disabled={nt?.dd?.disabled}
                          onClick={nt?.dd?.toggle}
                        >
                          <span>{nt?.dd?.label}</span>
                        </Button>
                        {nt?.dd?.open ? (
                          <>
                            <div className="a-dd-list" role="listbox" aria-label="Действия заметки">
                              {nt?.dd?.searchable ? (
                                <>
                                  <TextInput
                                    className="a-input a-dd-q"
                                    type="search"
                                    placeholder="Поиск"
                                    aria-label="Поиск в списке"
                                    value={nt?.dd?.q}
                                    onChange={nt?.dd?.setQ}
                                  />
                                </>
                              ) : null}
                              {(nt?.dd?.opts || []).map((o, $index) => (
                                <Fragment key={$index}>
                                  <Button
                                    type="button"
                                    role="option"
                                    aria-selected={o?.sel}
                                    className={`a-dd-opt ${__s(o?.cls)}`}
                                    onClick={o?.pick}
                                  >
                                    {o?.hasImg ? (
                                      <>
                                        <img src={o?.img} alt="" className="a-dd-img" />
                                      </>
                                    ) : null}
                                    <span>{o?.l}</span>
                                  </Button>
                                </Fragment>
                              ))}
                              {nt?.dd?.none ? (
                                <>
                                  <p className="a-hint" style={{ margin: '8px 10px' }}>
                                    Ничего не найдено
                                  </p>
                                </>
                              ) : null}
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </section>
        </>
      ) : null}{' '}
      {$v?.F?.t?.svc ? (
        <>
          <section className="a-card" style={{ maxWidth: '640px' }}>
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
            </div>{' '}
            <label
              className="a-row"
              style={{
                gap: '10px',
                marginTop: '20px',
                paddingTop: '18px',
                borderTop: '1px solid #DCE2EA',
                cursor: 'pointer',
              }}
            >
              <Checkbox
                type="checkbox"
                checked={$v?.F?.d?.final}
                onChange={$v?.F?.set?.finalBox}
                style={{ width: '18px', height: '18px', accentColor: '#1B2A41' }}
              />
              <span>
                <b style={{ fontWeight: '500' }}>final</b>{' '}
                <span className="a-hint">— старое свойство записи. Назначение уточняется.</span>
              </span>
            </label>{' '}
            {$v?.F?.canDelete ? (
              <>
                <Button type="button" className="a-ghost a-danger" style={{ marginTop: '24px' }} onClick={$v?.F?.del}>
                  Удалить статуэтку
                </Button>
              </>
            ) : null}{' '}
          </section>
        </>
      ) : null}{' '}
    </>
  );
}
