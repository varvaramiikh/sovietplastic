// @ts-nocheck
import TextArea from '../../../../components/ui/TextArea/TextArea.tsx';
import Checkbox from '../../../../components/ui/Checkbox/Checkbox.tsx';
import TextInput from '../../../../components/ui/TextInput/TextInput.tsx';
import Button from '../../../../components/ui/Button/Button.tsx';
/* Сгенерировано из original-export/project/Admin.dc.html (блок <sc-if value="{{ M.open }}">) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { Fragment } from 'react';
import type { SectionMOpenProps } from './SectionMOpen';
import './SectionMOpen.css';
import { __s, __css, __raw, __href } from '../../../../runtime/dc';

export default function SectionMOpen({ $v }: SectionMOpenProps) {
  return (
    <>
      <div className="a-modal">
        {' '}
        <Button type="button" className="a-modal-bg" aria-label="Закрыть окно" onClick={$v?.M?.cancel}></Button>{' '}
        <div
          className="a-modal-box"
          role="dialog"
          aria-modal="true"
          aria-labelledby="m-title"
          style={{ maxWidth: '600px' }}
        >
          <h2 id="m-title">{$v?.M?.title}</h2>{' '}
          {$v?.M?.hasErr ? (
            <>
              <p className="a-alert" role="alert" style={{ margin: '16px 0 0' }}>
                {$v?.M?.err}
              </p>
            </>
          ) : null}{' '}
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {' '}
            {$v?.M?.isNote ? (
              <>
                <div className="a-f">
                  <label>
                    Пользователь
                    <span className="a-req">*</span>
                  </label>
                  <div className={`a-dd ${__s($v?.M?.userDD?.wCls)}`}>
                    <Button
                      type="button"
                      className="a-select a-dd-btn"
                      aria-haspopup="listbox"
                      aria-expanded={$v?.M?.userDD?.exp}
                      aria-label="Пользователь"
                      aria-invalid={$v?.M?.userDD?.inv}
                      disabled={$v?.M?.userDD?.disabled}
                      onClick={$v?.M?.userDD?.toggle}
                    >
                      <span>{$v?.M?.userDD?.label}</span>
                    </Button>
                    {$v?.M?.userDD?.open ? (
                      <>
                        <div className="a-dd-list" role="listbox" aria-label="Пользователь">
                          {$v?.M?.userDD?.searchable ? (
                            <>
                              <TextInput
                                className="a-input a-dd-q"
                                type="search"
                                placeholder="Поиск"
                                aria-label="Поиск в списке"
                                value={$v?.M?.userDD?.q}
                                onChange={$v?.M?.userDD?.setQ}
                              />
                            </>
                          ) : null}
                          {($v?.M?.userDD?.opts || []).map((o, $index) => (
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
                          {$v?.M?.userDD?.none ? (
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
                <div className="a-f">
                  <label>
                    Статуэтка
                    <span className="a-req">*</span>
                  </label>
                  <div className={`a-dd ${__s($v?.M?.figDD?.wCls)}`}>
                    <Button
                      type="button"
                      className="a-select a-dd-btn"
                      aria-haspopup="listbox"
                      aria-expanded={$v?.M?.figDD?.exp}
                      aria-label="Статуэтка"
                      aria-invalid={$v?.M?.figDD?.inv}
                      disabled={$v?.M?.figDD?.disabled}
                      onClick={$v?.M?.figDD?.toggle}
                    >
                      <span>{$v?.M?.figDD?.label}</span>
                    </Button>
                    {$v?.M?.figDD?.open ? (
                      <>
                        <div className="a-dd-list" role="listbox" aria-label="Статуэтка">
                          {$v?.M?.figDD?.searchable ? (
                            <>
                              <TextInput
                                className="a-input a-dd-q"
                                type="search"
                                placeholder="Поиск"
                                aria-label="Поиск в списке"
                                value={$v?.M?.figDD?.q}
                                onChange={$v?.M?.figDD?.setQ}
                              />
                            </>
                          ) : null}
                          {($v?.M?.figDD?.opts || []).map((o, $index) => (
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
                          {$v?.M?.figDD?.none ? (
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
                </div>{' '}
                <label className="a-row" style={{ gap: '10px', cursor: 'pointer' }}>
                  <Checkbox
                    type="checkbox"
                    checked={$v?.M?.d?.enable}
                    onChange={$v?.M?.set?.enableBox}
                    style={{ width: '18px', height: '18px', accentColor: '#1B2A41' }}
                  />
                  <span>
                    <b style={{ fontWeight: '500' }}>Enable</b> <span className="a-hint">— назначение уточняется</span>
                  </span>
                </label>{' '}
                <div className="a-f">
                  <label htmlFor="m-c1">Комментарий 1</label>
                  <TextArea
                    id="m-c1"
                    className="a-textarea"
                    style={{ minHeight: '70px' }}
                    value={$v?.M?.d?.comment1}
                    onChange={$v?.M?.set?.comment1}
                  />
                </div>
                <div className="a-f">
                  <label htmlFor="m-c2">Комментарий 2</label>
                  <TextArea
                    id="m-c2"
                    className="a-textarea"
                    style={{ minHeight: '70px' }}
                    value={$v?.M?.d?.comment2}
                    onChange={$v?.M?.set?.comment2}
                  />
                </div>
                <div className="a-f">
                  <label htmlFor="m-c3">Комментарий 3</label>
                  <TextArea
                    id="m-c3"
                    className="a-textarea"
                    style={{ minHeight: '70px' }}
                    value={$v?.M?.d?.comment3}
                    onChange={$v?.M?.set?.comment3}
                  />
                </div>
                <div className="a-grid2">
                  <div className="a-f">
                    <label htmlFor="m-price">Цена</label>
                    <TextInput
                      id="m-price"
                      className="a-input"
                      type="text"
                      inputMode="decimal"
                      placeholder="Цена неизвестна"
                      value={$v?.M?.d?.price}
                      onChange={$v?.M?.set?.price}
                      aria-invalid={$v?.M?.inv?.price}
                    />
                    <span className="a-hint">Пустое поле — цена неизвестна, а не 0.</span>
                  </div>
                  <div className="a-f">
                    <label>Валюта</label>
                    <div className={`a-dd ${__s($v?.M?.curDD?.wCls)}`}>
                      <Button
                        type="button"
                        className="a-select a-dd-btn"
                        aria-haspopup="listbox"
                        aria-expanded={$v?.M?.curDD?.exp}
                        aria-label="Валюта"
                        aria-invalid={$v?.M?.curDD?.inv}
                        disabled={$v?.M?.curDD?.disabled}
                        onClick={$v?.M?.curDD?.toggle}
                      >
                        <span>{$v?.M?.curDD?.label}</span>
                      </Button>
                      {$v?.M?.curDD?.open ? (
                        <>
                          <div className="a-dd-list" role="listbox" aria-label="Валюта">
                            {$v?.M?.curDD?.searchable ? (
                              <>
                                <TextInput
                                  className="a-input a-dd-q"
                                  type="search"
                                  placeholder="Поиск"
                                  aria-label="Поиск в списке"
                                  value={$v?.M?.curDD?.q}
                                  onChange={$v?.M?.curDD?.setQ}
                                />
                              </>
                            ) : null}
                            {($v?.M?.curDD?.opts || []).map((o, $index) => (
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
                            {$v?.M?.curDD?.none ? (
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
              </>
            ) : null}{' '}
            {$v?.M?.isPhoto ? (
              <>
                <div className="a-f">
                  <span className="a-lab">Файл</span>{' '}
                  {$v?.M?.hasImg ? (
                    <>
                      <div className="a-ph-img" style={{ maxWidth: '260px', borderRadius: '8px' }}>
                        <img src={$v?.M?.d?.pictureCompressed} alt="Предпросмотр" />
                      </div>
                    </>
                  ) : null}{' '}
                  <label
                    className="a-ghost"
                    style={{ position: 'relative', overflow: 'hidden', alignSelf: 'flex-start' }}
                  >
                    {$v?.M?.fileLabel}
                    <TextInput
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      aria-label="Выбрать файл"
                      onChange={$v?.M?.pickFile}
                      style={{ position: 'absolute', inset: '0', opacity: '0', cursor: 'pointer' }}
                    />
                  </label>{' '}
                  {$v?.M?.busy ? (
                    <>
                      <span className="a-hint">Обрабатываем файл…</span>
                    </>
                  ) : null}
                </div>
                <div className="a-f">
                  <label>
                    Статуэтка
                    <span className="a-req">*</span>
                  </label>
                  <div className={`a-dd ${__s($v?.M?.figDD?.wCls)}`}>
                    <Button
                      type="button"
                      className="a-select a-dd-btn"
                      aria-haspopup="listbox"
                      aria-expanded={$v?.M?.figDD?.exp}
                      aria-label="Статуэтка"
                      aria-invalid={$v?.M?.figDD?.inv}
                      disabled={$v?.M?.figDD?.disabled}
                      onClick={$v?.M?.figDD?.toggle}
                    >
                      <span>{$v?.M?.figDD?.label}</span>
                    </Button>
                    {$v?.M?.figDD?.open ? (
                      <>
                        <div className="a-dd-list" role="listbox" aria-label="Статуэтка">
                          {$v?.M?.figDD?.searchable ? (
                            <>
                              <TextInput
                                className="a-input a-dd-q"
                                type="search"
                                placeholder="Поиск"
                                aria-label="Поиск в списке"
                                value={$v?.M?.figDD?.q}
                                onChange={$v?.M?.figDD?.setQ}
                              />
                            </>
                          ) : null}
                          {($v?.M?.figDD?.opts || []).map((o, $index) => (
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
                          {$v?.M?.figDD?.none ? (
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
                </div>{' '}
                <label className="a-row" style={{ gap: '10px', cursor: 'pointer' }}>
                  <Checkbox
                    type="checkbox"
                    checked={$v?.M?.d?.isMain}
                    onChange={$v?.M?.set?.mainBox}
                    style={{ width: '18px', height: '18px', accentColor: '#1B2A41' }}
                  />
                  <span>
                    <b style={{ fontWeight: '500' }}>Главное фото</b>{' '}
                    <span className="a-hint">— у статуэтки будет только одно главное фото</span>
                  </span>
                </label>{' '}
              </>
            ) : null}{' '}
            {$v?.M?.isBind ? (
              <>
                <div className="a-f">
                  <label>
                    Статуэтка
                    <span className="a-req">*</span>
                  </label>
                  <div className={`a-dd ${__s($v?.M?.figDD?.wCls)}`}>
                    <Button
                      type="button"
                      className="a-select a-dd-btn"
                      aria-haspopup="listbox"
                      aria-expanded={$v?.M?.figDD?.exp}
                      aria-label="Статуэтка"
                      aria-invalid={$v?.M?.figDD?.inv}
                      disabled={$v?.M?.figDD?.disabled}
                      onClick={$v?.M?.figDD?.toggle}
                    >
                      <span>{$v?.M?.figDD?.label}</span>
                    </Button>
                    {$v?.M?.figDD?.open ? (
                      <>
                        <div className="a-dd-list" role="listbox" aria-label="Статуэтка">
                          {$v?.M?.figDD?.searchable ? (
                            <>
                              <TextInput
                                className="a-input a-dd-q"
                                type="search"
                                placeholder="Поиск"
                                aria-label="Поиск в списке"
                                value={$v?.M?.figDD?.q}
                                onChange={$v?.M?.figDD?.setQ}
                              />
                            </>
                          ) : null}
                          {($v?.M?.figDD?.opts || []).map((o, $index) => (
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
                          {$v?.M?.figDD?.none ? (
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
                <div className="a-f">
                  <span className="a-lab">
                    {$v?.M?.tagLabel}
                    <span className="a-req">*</span>
                  </span>{' '}
                  <div className="a-chips">
                    {($v?.M?.tagChips || []).map((tg, $index) => (
                      <Fragment key={$index}>
                        <Button type="button" className="a-chip a-chip-sel" onClick={tg?.remove}>
                          {tg?.l}
                          {' ×'}
                        </Button>
                      </Fragment>
                    ))}
                  </div>
                  <div className={`a-dd ${__s($v?.M?.tagDD?.wCls)}`}>
                    <Button
                      type="button"
                      className="a-select a-dd-btn"
                      aria-haspopup="listbox"
                      aria-expanded={$v?.M?.tagDD?.exp}
                      aria-label="Метка"
                      aria-invalid={$v?.M?.tagDD?.inv}
                      disabled={$v?.M?.tagDD?.disabled}
                      onClick={$v?.M?.tagDD?.toggle}
                    >
                      <span>{$v?.M?.tagDD?.label}</span>
                    </Button>
                    {$v?.M?.tagDD?.open ? (
                      <>
                        <div className="a-dd-list" role="listbox" aria-label="Метка">
                          {$v?.M?.tagDD?.searchable ? (
                            <>
                              <TextInput
                                className="a-input a-dd-q"
                                type="search"
                                placeholder="Поиск"
                                aria-label="Поиск в списке"
                                value={$v?.M?.tagDD?.q}
                                onChange={$v?.M?.tagDD?.setQ}
                              />
                            </>
                          ) : null}
                          {($v?.M?.tagDD?.opts || []).map((o, $index) => (
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
                          {$v?.M?.tagDD?.none ? (
                            <>
                              <p className="a-hint" style={{ margin: '8px 10px' }}>
                                Ничего не найдено
                              </p>
                            </>
                          ) : null}
                        </div>
                      </>
                    ) : null}
                  </div>{' '}
                  {$v?.M?.hasDup ? (
                    <>
                      <span className="a-warn">{$v?.M?.dup}</span>
                    </>
                  ) : null}
                </div>
              </>
            ) : null}{' '}
            {$v?.M?.hasSvc ? (
              <>
                <div className="a-meta" style={{ paddingTop: '14px', borderTop: '1px solid #DCE2EA' }}>
                  <span>
                    {'Создано: '}
                    <b>{$v?.M?.svc?.created}</b>
                    {', '}
                    {$v?.M?.svc?.createdBy}
                  </span>
                  <span>
                    {'Изменено: '}
                    <b>{$v?.M?.svc?.modified}</b>
                    {', '}
                    {$v?.M?.svc?.modifiedBy}
                  </span>
                </div>
              </>
            ) : null}{' '}
          </div>
          <div className="a-row" style={{ marginTop: '26px', justifyContent: 'flex-end' }}>
            <Button type="button" className="a-ghost" onClick={$v?.M?.cancel}>
              Отмена
            </Button>
            <Button type="button" className="a-btn" disabled={$v?.M?.busy} onClick={$v?.M?.save}>
              {$v?.M?.saveText}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
