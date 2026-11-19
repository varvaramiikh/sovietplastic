// @ts-nocheck
import Image from '../../../../components/ui/Image/Image.tsx';
import TextInput from '../../../../components/ui/TextInput/TextInput.tsx';
import Button from '../../../../components/ui/Button/Button.tsx';
/* Сгенерировано из original-export/project/Admin.dc.html (блок <sc-if value="{{ confirm.open }}">) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { Fragment } from 'react';
import type { SectionConfirmOpenProps } from './SectionConfirmOpen';
import './SectionConfirmOpen.css';
import { __s, __css, __raw, __href } from '../../../../runtime/dc';

export default function SectionConfirmOpen({ $v }: SectionConfirmOpenProps) {
  return (
    <>
      <div className="a-modal">
        {' '}
        <Button type="button" className="a-modal-bg" aria-label="Закрыть окно" onClick={$v?.confirm?.no}></Button>{' '}
        <div className="a-modal-box" role="alertdialog" aria-modal="true" aria-labelledby="c-title">
          <h2 id="c-title">{$v?.confirm?.title}</h2>
          <p style={{ margin: '14px 0 0', fontSize: '16px', lineHeight: '24px', color: '#3E4A60' }}>
            {$v?.confirm?.text}
          </p>{' '}
          {$v?.confirm?.hasLinked ? (
            <>
              <div style={{ marginTop: '16px', padding: '14px 16px', borderRadius: '6px', background: '#F8FAFD' }}>
                <p className="a-lab" style={{ margin: '0' }}>
                  {'Связано · '}
                  {$v?.confirm?.linkedCount}
                </p>
                <ul style={{ margin: '8px 0 0', paddingLeft: '18px', fontSize: '14px', lineHeight: '22px' }}>
                  {($v?.confirm?.linked || []).map((l, $index) => (
                    <Fragment key={$index}>
                      <li>{l?.t}</li>
                    </Fragment>
                  ))}
                </ul>{' '}
                {$v?.confirm?.more ? (
                  <>
                    <p className="a-hint" style={{ margin: '6px 0 0' }}>
                      {$v?.confirm?.moreText}
                    </p>
                  </>
                ) : null}{' '}
                {$v?.confirm?.hasRepl ? (
                  <>
                    <div className="a-f" style={{ marginTop: '14px' }}>
                      <label>{$v?.confirm?.replLabel}</label>
                      <div className={`a-dd ${__s($v?.confirm?.replDD?.wCls)}`}>
                        <Button
                          type="button"
                          className="a-select a-dd-btn"
                          aria-haspopup="listbox"
                          aria-expanded={$v?.confirm?.replDD?.exp}
                          aria-label="Замена"
                          aria-invalid={$v?.confirm?.replDD?.inv}
                          disabled={$v?.confirm?.replDD?.disabled}
                          onClick={$v?.confirm?.replDD?.toggle}
                        >
                          <span>{$v?.confirm?.replDD?.label}</span>
                        </Button>
                        {$v?.confirm?.replDD?.open ? (
                          <>
                            <div className="a-dd-list" role="listbox" aria-label="Замена">
                              {$v?.confirm?.replDD?.searchable ? (
                                <>
                                  <TextInput
                                    className="a-input a-dd-q"
                                    type="search"
                                    placeholder="Поиск"
                                    aria-label="Поиск в списке"
                                    value={$v?.confirm?.replDD?.q}
                                    onChange={$v?.confirm?.replDD?.setQ}
                                  />
                                </>
                              ) : null}
                              {($v?.confirm?.replDD?.opts || []).map((o, $index) => (
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
                                        <Image src={o?.img} alt="" className="a-dd-img" />
                                      </>
                                    ) : null}
                                    <span>{o?.l}</span>
                                  </Button>
                                </Fragment>
                              ))}
                              {$v?.confirm?.replDD?.none ? (
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
              </div>
            </>
          ) : null}{' '}
          <div className="a-row" style={{ marginTop: '28px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <Button type="button" className="a-ghost" onClick={$v?.confirm?.no}>
              {$v?.confirm?.noText}
            </Button>
            {$v?.confirm?.hasAlt ? (
              <>
                <Button type="button" className="a-ghost" onClick={$v?.confirm?.alt}>
                  {$v?.confirm?.altText}
                </Button>
              </>
            ) : null}
            {$v?.confirm?.hasYes ? (
              <>
                <Button
                  type="button"
                  className={`a-btn ${__s($v?.confirm?.yesCls)}`}
                  disabled={$v?.confirm?.yesDisabled}
                  onClick={$v?.confirm?.yes}
                >
                  {$v?.confirm?.yesText}
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
