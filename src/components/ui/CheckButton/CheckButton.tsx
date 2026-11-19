import CollectionActionButton from '../CollectionActionButton/CollectionActionButton.tsx';
import type { CheckButtonProps } from './CheckButton';
import './CheckButton.css';
export default function CheckButton({ className = '', pressed = false, onClick }: CheckButtonProps) {
  return (
    <CollectionActionButton
      type="button"
      className={`sp-act ${className}`}
      data-tip="Есть в коллекции"
      aria-label="Есть в коллекции"
      aria-pressed={pressed}
      onClick={onClick}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
        <circle className="sp-ring" cx="12" cy="12" r="9.25" strokeWidth="1.5"></circle>
        <path
          className="sp-tick"
          d="M8 12.3l2.7 2.7L16 9.6"
          fill="none"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </CollectionActionButton>
  );
}
