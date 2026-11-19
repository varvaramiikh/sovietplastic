// @ts-nocheck
import Checkbox from '../../../../components/ui/Checkbox/Checkbox.tsx';
import TextInput from '../../../../components/ui/TextInput/TextInput.tsx';
import Button from '../../../../components/ui/Button/Button.tsx';
/* Сгенерировано из original-export/project/Admin.dc.html (блок <sc-if value="{{ s.list }}">) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { Fragment } from 'react';
import type { SectionSListProps } from './SectionSList';
import './SectionSList.css';
import { __s, __css, __raw, __href } from '../../../../runtime/dc';

export default function SectionSList({ $v }: SectionSListProps) {
  return (
    <>
      <div className="a-top">
        <div>
          <h1 className="a-h1">{$v?.L?.title}</h1>
          <p className="a-sub">{$v?.L?.count}</p>
        </div>
        <div className="a-row">
          <Button type="button" className="a-ghost" onClick={$v?.L?.export} title={$v?.L?.exportHint}>
            Экспорт в Excel
          </Button>
          {$v?.L?.hasAdd ? (
            <>
              <Button type="button" className="a-btn" onClick={$v?.L?.add}>
                {$v?.L?.addText}
              </Button>
            </>
          ) : null}
        </div>
      </div>
      <p className="a-hint" style={{ margin: '8px 0 0' }}>
        {$v?.L?.exportHint}
      </p>
      <div className="a-filters" style={{ marginTop: '20px' }}>
        {' '}
        <label className="a-search">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="#4E6488"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="5.5"></circle>
            <path d="M11 11l4 4"></path>
          </svg>
          <TextInput
            className="a-input"
            type="search"
            aria-label={$v?.L?.searchHint}
            placeholder={$v?.L?.searchHint}
            value={$v?.L?.q}
            onChange={$v?.L?.setQ}
          />
        </label>{' '}
        {($v?.L?.filters || []).map((fl, $index) => (
          <Fragment key={$index}>
            <div className={`a-dd ${__s(fl?.dd?.wCls)}`}>
              <Button
                type="button"
                className="a-select a-dd-btn"
                aria-haspopup="listbox"
                aria-expanded={fl?.dd?.exp}
                aria-invalid={fl?.dd?.inv}
                disabled={fl?.dd?.disabled}
                onClick={fl?.dd?.toggle}
              >
                <span>{fl?.dd?.label}</span>
              </Button>
              {fl?.dd?.open ? (
                <>
                  <div className="a-dd-list" role="listbox">
                    {fl?.dd?.searchable ? (
                      <>
                        <TextInput
                          className="a-input a-dd-q"
                          type="search"
                          placeholder="Поиск"
                          aria-label="Поиск в списке"
                          value={fl?.dd?.q}
                          onChange={fl?.dd?.setQ}
                        />
                      </>
                    ) : null}
                    {(fl?.dd?.opts || []).map((o, $index) => (
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
                    {fl?.dd?.none ? (
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
          </Fragment>
        ))}{' '}
        {$v?.L?.hasCols ? (
          <>
            <div className={`a-dd ${__s($v?.L?.cols?.wCls)}`} style={{ width: 'auto' }}>
              <Button
                type="button"
                className="a-ghost"
                aria-haspopup="true"
                aria-expanded={$v?.L?.cols?.exp}
                onClick={$v?.L?.cols?.toggle}
              >
                Колонки
              </Button>
              {$v?.L?.cols?.open ? (
                <>
                  <div
                    className="a-dd-list"
                    style={{ right: '0', left: 'auto', padding: '10px 12px', minWidth: '220px' }}
                  >
                    {($v?.L?.cols?.items || []).map((ci, $index) => (
                      <Fragment key={$index}>
                        <label
                          className="a-row"
                          style={{ gap: '10px', padding: '6px 0', fontSize: '14px', cursor: 'pointer' }}
                        >
                          <Checkbox
                            type="checkbox"
                            checked={ci?.on}
                            onChange={ci?.toggle}
                            style={{ width: '16px', height: '16px', accentColor: '#1B2A41' }}
                          />
                          {ci?.l}
                        </label>
                      </Fragment>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          </>
        ) : null}{' '}
        {$v?.L?.filtered ? (
          <>
            <Button type="button" className="a-link" onClick={$v?.L?.reset}>
              Сбросить
            </Button>
          </>
        ) : null}{' '}
      </div>{' '}
      {$v?.L?.filtered ? (
        <>
          <div className="a-chips" style={{ marginTop: '12px' }}>
            {($v?.L?.chips || []).map((ch, $index) => (
              <Fragment key={$index}>
                <Button
                  type="button"
                  className="a-chip a-chip-sel"
                  aria-label={`Убрать фильтр ${__s(ch?.l)}`}
                  onClick={ch?.remove}
                >
                  {ch?.l}
                  {' ×'}
                </Button>
              </Fragment>
            ))}
          </div>
        </>
      ) : null}{' '}
      {$v?.L?.none ? (
        <>
          <div className="a-empty">
            <p className="t">{$v?.L?.noneTitle}</p>
            <p className="s">{$v?.L?.noneText}</p>
          </div>
        </>
      ) : null}{' '}
      {$v?.L?.noMatch ? (
        <>
          <div className="a-empty">
            <p className="t">Ничего не найдено</p>
            <p className="s">Измените запрос или сбросьте фильтры.</p>
            <Button type="button" className="a-ghost" style={{ marginTop: '18px' }} onClick={$v?.L?.reset}>
              Сбросить фильтры
            </Button>
          </div>
        </>
      ) : null}{' '}
      {$v?.L?.isTable ? (
        <>
          <div className="a-tbl" style={{ marginTop: '20px' }}>
            <div className="a-tr a-th" style={__css(`grid-template-columns: ${__s($v?.L?.grid)}`)}>
              {($v?.L?.heads || []).map((h, $index) => (
                <Fragment key={$index}>
                  {h?.sortable ? (
                    <>
                      <Button
                        type="button"
                        className="a-sorth"
                        onClick={h?.go}
                        aria-label={`Сортировать: ${__s(h?.l)}`}
                      >
                        {h?.l} <i>{h?.ind}</i>
                      </Button>
                    </>
                  ) : null}
                  {h?.plain ? (
                    <>
                      <span style={__css(`text-align: ${__s(h?.align)}`)}>{h?.l}</span>
                    </>
                  ) : null}
                </Fragment>
              ))}
            </div>{' '}
            {($v?.L?.rows || []).map((r, $index) => (
              <Fragment key={$index}>
                <div className="a-tr" style={__css(`grid-template-columns: ${__s($v?.L?.grid)}`)}>
                  {' '}
                  {(r?.cells || []).map((c, $index) => (
                    <Fragment key={$index}>
                      {' '}
                      {c?.isThumb ? (
                        <>
                          <div className="a-thumb">
                            {c?.hasSrc ? (
                              <>
                                <img src={c?.src} alt="" />
                              </>
                            ) : null}
                            {c?.noSrc ? (
                              <>
                                <span className="a-hint" style={{ fontSize: '11px' }}>
                                  нет фото
                                </span>
                              </>
                            ) : null}
                          </div>
                        </>
                      ) : null}{' '}
                      {c?.isLink ? (
                        <>
                          <Button type="button" className="a-tbtn" onClick={c?.go}>
                            {c?.t}
                          </Button>
                        </>
                      ) : null}{' '}
                      {c?.isText ? (
                        <>
                          <span className={c?.cls}>{c?.t}</span>
                        </>
                      ) : null}{' '}
                      {c?.isBadge ? (
                        <>
                          <span className={`a-badge ${__s(c?.cls)}`}>
                            <i></i>
                            {c?.t}
                          </span>
                        </>
                      ) : null}{' '}
                      {c?.isMenu ? (
                        <>
                          <div className="a-acts">
                            <Button type="button" className="a-edit" onClick={c?.edit}>
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 16 16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.4"
                                aria-hidden="true"
                              >
                                <path d="M10.5 2.5l3 3L5 14H2v-3z"></path>
                                <path d="M9 4l3 3"></path>
                              </svg>
                              {c?.editText}
                            </Button>
                            <div className={`a-dd ${__s(c?.dd?.wCls)}`} style={{ width: 'auto', minWidth: '0' }}>
                              <Button
                                type="button"
                                className="a-select a-dd-btn"
                                aria-haspopup="listbox"
                                aria-expanded={c?.dd?.exp}
                                aria-label="Действия"
                                aria-invalid={c?.dd?.inv}
                                disabled={c?.dd?.disabled}
                                onClick={c?.dd?.toggle}
                              >
                                <span>{c?.dd?.label}</span>
                              </Button>
                              {c?.dd?.open ? (
                                <>
                                  <div className="a-dd-list" role="listbox" aria-label="Действия">
                                    {c?.dd?.searchable ? (
                                      <>
                                        <TextInput
                                          className="a-input a-dd-q"
                                          type="search"
                                          placeholder="Поиск"
                                          aria-label="Поиск в списке"
                                          value={c?.dd?.q}
                                          onChange={c?.dd?.setQ}
                                        />
                                      </>
                                    ) : null}
                                    {(c?.dd?.opts || []).map((o, $index) => (
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
                                    {c?.dd?.none ? (
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
                        </>
                      ) : null}{' '}
                    </Fragment>
                  ))}{' '}
                </div>
              </Fragment>
            ))}{' '}
          </div>
        </>
      ) : null}{' '}
      {$v?.L?.isGrid ? (
        <>
          <div className="a-photos" style={{ marginTop: '20px' }}>
            {($v?.L?.cards || []).map((p, $index) => (
              <Fragment key={$index}>
                <div className={`a-ph ${__s(p?.mainCls)}`}>
                  {' '}
                  <Button type="button" className="a-ph-img" onClick={p?.viewer} aria-label="Просмотр фото">
                    <img src={p?.src} alt="" />
                    {p?.isMain ? (
                      <>
                        <span className="a-ph-tag">Главное</span>
                      </>
                    ) : null}
                  </Button>{' '}
                  <div className="a-ph-body">
                    <Button type="button" className="a-tbtn" style={{ fontSize: '15px' }} onClick={p?.openFig}>
                      {p?.fig}
                    </Button>
                    <p className="a-hint" style={{ margin: '0' }}>
                      {p?.sub}
                    </p>
                    <div className="a-acts" style={{ justifyContent: 'flex-start' }}>
                      <Button type="button" className="a-edit" onClick={p?.edit}>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          aria-hidden="true"
                        >
                          <path d="M10.5 2.5l3 3L5 14H2v-3z"></path>
                          <path d="M9 4l3 3"></path>
                        </svg>
                        Изменить
                      </Button>
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
          </div>
        </>
      ) : null}{' '}
      {$v?.L?.has ? (
        <>
          <div className="a-pagebar">
            {' '}
            <span className="a-hint">{$v?.L?.range}</span>{' '}
            <nav className="a-pages" aria-label="Страницы">
              <Button
                type="button"
                className="a-page"
                disabled={$v?.L?.noPrev}
                onClick={$v?.L?.first}
                aria-label="Первая страница"
              >
                «
              </Button>
              <Button
                type="button"
                className="a-page"
                disabled={$v?.L?.noPrev}
                onClick={$v?.L?.prev}
                aria-label="Предыдущая"
              >
                ←
              </Button>
              {($v?.L?.pages || []).map((pg, $index) => (
                <Fragment key={$index}>
                  <Button type="button" className={`a-page ${__s(pg?.cls)}`} onClick={pg?.go}>
                    {pg?.n}
                  </Button>
                </Fragment>
              ))}
              <Button
                type="button"
                className="a-page"
                disabled={$v?.L?.noNext}
                onClick={$v?.L?.next}
                aria-label="Следующая"
              >
                →
              </Button>
              <Button
                type="button"
                className="a-page"
                disabled={$v?.L?.noNext}
                onClick={$v?.L?.last}
                aria-label="Последняя страница"
              >
                »
              </Button>
            </nav>
            <div className="a-row">
              <span className="a-hint">Строк на странице</span>
              <div className={`a-dd ${__s($v?.L?.perDD?.wCls)}`} style={{ width: 'auto', minWidth: '84px' }}>
                <Button
                  type="button"
                  className="a-select a-dd-btn"
                  aria-haspopup="listbox"
                  aria-expanded={$v?.L?.perDD?.exp}
                  aria-label="Строк на странице"
                  aria-invalid={$v?.L?.perDD?.inv}
                  disabled={$v?.L?.perDD?.disabled}
                  onClick={$v?.L?.perDD?.toggle}
                >
                  <span>{$v?.L?.perDD?.label}</span>
                </Button>
                {$v?.L?.perDD?.open ? (
                  <>
                    <div className="a-dd-list" role="listbox" aria-label="Строк на странице">
                      {$v?.L?.perDD?.searchable ? (
                        <>
                          <TextInput
                            className="a-input a-dd-q"
                            type="search"
                            placeholder="Поиск"
                            aria-label="Поиск в списке"
                            value={$v?.L?.perDD?.q}
                            onChange={$v?.L?.perDD?.setQ}
                          />
                        </>
                      ) : null}
                      {($v?.L?.perDD?.opts || []).map((o, $index) => (
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
                      {$v?.L?.perDD?.none ? (
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
    </>
  );
}
