import Modal from '../Modal/Modal.tsx';
import TextInput from '../../ui/TextInput/TextInput.tsx';
import Button from '../../ui/Button/Button.tsx';
import type { PurchasePlanModalProps } from './PurchasePlanModal';
import './PurchasePlanModal.css';
export default function PurchasePlanModal({ plan }: PurchasePlanModalProps) {
  return (
    <Modal titleId="plan-title" onClose={plan?.skip}>
      {' '}
      <p
        style={{
          margin: '0',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '12px',
          fontWeight: '500',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#4E6488',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z"
            fill="#B5656B"
            stroke="#B5656B"
            strokeWidth="1.5"
            strokeLinejoin="round"
          ></path>
        </svg>
        Добавлено в «Хочу купить»
      </p>
      <h2
        id="plan-title"
        style={{
          margin: '12px 0 0',
          paddingRight: '40px',
          fontSize: '24px',
          fontWeight: '500',
          lineHeight: '1.15',
          letterSpacing: '-0.01em',
        }}
      >
        {plan?.title}
      </h2>
      <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div className="sp-mf">
          <label htmlFor="plan-note">Где планирую купить</label>
          <TextInput
            id="plan-note"
            type="text"
            value={plan?.note}
            onChange={plan?.setNote}
            placeholder="Магазин, сайт, барахолка"
          />
        </div>
        <div className="sp-mf">
          <label htmlFor="plan-price">Примерная цена</label>
          <div className="sp-mf-cur">
            <TextInput
              id="plan-price"
              type="text"
              inputMode="numeric"
              value={plan?.price}
              onChange={plan?.setPrice}
              placeholder="0"
            />
            <span>{plan?.cur}</span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
        {' '}
        <Button type="button" className="sp-mbtn" onClick={plan?.save}>
          Сохранить
        </Button>{' '}
        <Button type="button" className="sp-mlink" onClick={plan?.skip}>
          Заполню позже
        </Button>{' '}
      </div>
      <p style={{ margin: '20px 0 0', fontSize: '14px', lineHeight: '20px', color: '#4E6488' }}>
        Эти заметки видны только вам и хранятся в личном кабинете.
      </p>
    </Modal>
  );
}
