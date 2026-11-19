// @ts-nocheck
import Checkbox from '../../../../components/ui/Checkbox/Checkbox.tsx';
import TextInput from '../../../../components/ui/TextInput/TextInput.tsx';
import Link from '../../../../components/ui/Link/Link.tsx';
import Button from '../../../../components/ui/Button/Button.tsx';
/* Сгенерировано из original-export/project/Admin.dc.html (блок <sc-if value="{{ s.user }}">) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { Fragment } from 'react';
import type { SectionSUserProps } from './SectionSUser';
import './SectionSUser.css';
import { __s, __css, __raw, __href } from '../../../../runtime/dc';

export default function SectionSUser({ $v }: SectionSUserProps) {
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
          <div className="a-grid2">
            <div className="a-f">
              <label htmlFor="u-login">
                Логин
                <span className="a-req">*</span>
              </label>
              <TextInput
                id="u-login"
                className="a-input"
                type="text"
                autoComplete="off"
                value={$v?.F?.d?.login}
                onChange={$v?.F?.set?.login}
                aria-invalid={$v?.F?.inv?.login}
              />
              {$v?.F?.e?.login ? (
                <>
                  <span className="a-err">{$v?.F?.em?.login}</span>
                </>
              ) : null}
            </div>
            <div className="a-f">
              <label htmlFor="u-name">Имя</label>
              <TextInput
                id="u-name"
                className="a-input"
                type="text"
                value={$v?.F?.d?.name}
                onChange={$v?.F?.set?.name}
              />
            </div>
          </div>
          <div className="a-grid2">
            <div className="a-f">
              <label htmlFor="u-email">
                Электронная почта
                <span className="a-req">*</span>
              </label>
              <TextInput
                id="u-email"
                className="a-input"
                type="email"
                autoComplete="off"
                value={$v?.F?.d?.email}
                onChange={$v?.F?.set?.email}
                aria-invalid={$v?.F?.inv?.email}
              />
              {$v?.F?.e?.email ? (
                <>
                  <span className="a-err">{$v?.F?.em?.email}</span>
                </>
              ) : null}
            </div>
            <div className="a-f">
              <label htmlFor="u-cur">Валюта по умолчанию</label>
              <div className={`a-dd ${__s($v?.F?.curDD?.wCls)}`}>
                <Button
                  type="button"
                  id="u-cur"
                  className="a-select a-dd-btn"
                  aria-haspopup="listbox"
                  aria-expanded={$v?.F?.curDD?.exp}
                  aria-label="Валюта по умолчанию"
                  aria-invalid={$v?.F?.curDD?.inv}
                  disabled={$v?.F?.curDD?.disabled}
                  onClick={$v?.F?.curDD?.toggle}
                >
                  <span>{$v?.F?.curDD?.label}</span>
                </Button>
                {$v?.F?.curDD?.open ? (
                  <>
                    <div className="a-dd-list" role="listbox" aria-label="Валюта по умолчанию">
                      {$v?.F?.curDD?.searchable ? (
                        <>
                          <TextInput
                            className="a-input a-dd-q"
                            type="search"
                            placeholder="Поиск"
                            aria-label="Поиск в списке"
                            value={$v?.F?.curDD?.q}
                            onChange={$v?.F?.curDD?.setQ}
                          />
                        </>
                      ) : null}
                      {($v?.F?.curDD?.opts || []).map((o, $index) => (
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
                      {$v?.F?.curDD?.none ? (
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
          <div style={{ padding: '18px 20px', borderRadius: '8px', background: '#F8FAFD' }}>
            <p className="a-lab" style={{ margin: '0' }}>
              {$v?.F?.passTitle}
            </p>
            <p className="a-hint" style={{ margin: '6px 0 0' }}>
              {$v?.F?.passHint}
            </p>
            <div className="a-grid2" style={{ marginTop: '14px' }}>
              <div className="a-f">
                <label htmlFor="u-p1">Новый пароль</label>
                <TextInput
                  id="u-p1"
                  className="a-input"
                  type="password"
                  autoComplete="new-password"
                  value={$v?.F?.d?.p1}
                  onChange={$v?.F?.set?.p1}
                  aria-invalid={$v?.F?.inv?.p1}
                />
                {$v?.F?.e?.p1 ? (
                  <>
                    <span className="a-err">{$v?.F?.em?.p1}</span>
                  </>
                ) : null}
              </div>
              <div className="a-f">
                <label htmlFor="u-p2">Повторите пароль</label>
                <TextInput
                  id="u-p2"
                  className="a-input"
                  type="password"
                  autoComplete="new-password"
                  value={$v?.F?.d?.p2}
                  onChange={$v?.F?.set?.p2}
                  aria-invalid={$v?.F?.inv?.p2}
                />
                {$v?.F?.e?.p2 ? (
                  <>
                    <span className="a-err">{$v?.F?.em?.p2}</span>
                  </>
                ) : null}
              </div>
            </div>
          </div>{' '}
          <label className="a-switch">
            <Checkbox
              type="checkbox"
              checked={$v?.F?.d?.isAdmin}
              disabled={$v?.F?.isMe}
              onChange={$v?.F?.set?.adminBox}
            />
            <span className="a-switch-ui" aria-hidden="true"></span>
            <span>
              <b style={{ fontWeight: '500' }}>Доступ к админ-панели (isAdmin)</b>
              <br />
              <span className="a-hint">{$v?.F?.adminHint}</span>
            </span>
          </label>{' '}
          {$v?.F?.showNotes ? (
            <>
              <div>
                <p className="a-lab" style={{ margin: '0' }}>
                  {'Заметки пользователя · '}
                  {$v?.F?.noteCount}
                </p>
                {$v?.F?.hasNotes ? (
                  <>
                    <Button type="button" className="a-link" style={{ marginTop: '10px' }} onClick={$v?.F?.openNotes}>
                      Открыть в «Заметках пользователей»
                    </Button>
                  </>
                ) : null}
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
                Удалить пользователя
              </Button>
            </>
          ) : null}{' '}
        </div>
      </section>
    </>
  );
}
