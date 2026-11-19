import Button from '../Button/Button.tsx';
import type { CloseButtonProps } from './CloseButton';
import './CloseButton.css';
export default function CloseButton({ label = 'Закрыть', onClick }: CloseButtonProps) {
  return (
    <Button className="sp-mx" aria-label={label} onClick={onClick}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M2 2l12 12M14 2L2 14" />
      </svg>
    </Button>
  );
}
