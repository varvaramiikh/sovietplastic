import Modal from '../Modal/Modal.tsx';
import Link from '../../ui/Link/Link.tsx';
import Button from '../../ui/Button/Button.tsx';
import type { AuthRequiredModalProps } from './AuthRequiredModal';
import './AuthRequiredModal.css';
export default function AuthRequiredModal({ gate }: AuthRequiredModalProps) {
  return (
    <Modal titleId="gate-title" onClose={gate?.close}>
      {' '}
      <h2
        id="gate-title"
        style={{
          margin: '0',
          paddingRight: '40px',
          fontSize: '24px',
          fontWeight: '500',
          lineHeight: '1.15',
          letterSpacing: '-0.01em',
        }}
      >
        Войдите в аккаунт
      </h2>
      <p style={{ margin: '14px 0 0', fontSize: '16px', lineHeight: '24px', color: '#3E4A60' }}>{gate?.text}</p>
      <div style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
        {' '}
        <Link href="/login" className="sp-mbtn" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
          Войти
        </Link>{' '}
        <Link href="/login" className="sp-mlink" style={{ textDecoration: 'none' }}>
          Зарегистрироваться
        </Link>{' '}
      </div>
    </Modal>
  );
}
