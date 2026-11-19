// @ts-nocheck
import Image from '../../../../components/ui/Image/Image.tsx';
import Button from '../../../../components/ui/Button/Button.tsx';
/* Сгенерировано из original-export/project/Admin.dc.html (блок <sc-if value="{{ V.open }}">) инструментом scripts/convert-dc.mjs. Дальше это обычный исходный код. */
import { Fragment } from 'react';
import type { SectionVOpenProps } from './SectionVOpen';
import './SectionVOpen.css';
import { __s, __css, __raw, __href } from '../../../../runtime/dc';

export default function SectionVOpen({ $v }: SectionVOpenProps) {
  return (
    <>
      <div className="a-modal">
        <Button type="button" className="a-modal-bg" aria-label="Закрыть просмотр" onClick={$v?.V?.close}></Button>{' '}
        <div
          className="a-modal-box"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фото"
          style={{ maxWidth: '900px', textAlign: 'center' }}
        >
          <Image
            src={$v?.V?.src}
            alt=""
            style={{ maxWidth: '100%', maxHeight: '70vh', borderRadius: '6px', background: '#DBE2EA' }}
          />
          <p style={{ margin: '14px 0 0', fontSize: '15px' }}>{$v?.V?.caption}</p>
          <Button type="button" className="a-ghost" style={{ marginTop: '18px' }} onClick={$v?.V?.close}>
            Закрыть
          </Button>
        </div>
      </div>
    </>
  );
}
