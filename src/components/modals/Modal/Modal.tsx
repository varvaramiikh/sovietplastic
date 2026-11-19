import Button from '../../ui/Button/Button.tsx';
import CloseButton from '../../ui/CloseButton/CloseButton.tsx';
import type { ModalProps } from './Modal';
import './Modal.css';
export default function Modal({ titleId, onClose, children }: ModalProps) {
  return (
    <div className="sp-modal">
      <Button className="sp-modal-bg" aria-label="Закрыть окно" onClick={onClose} />
      <div className="sp-modal-box" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <CloseButton onClick={onClose} />
        {children}
      </div>
    </div>
  );
}
