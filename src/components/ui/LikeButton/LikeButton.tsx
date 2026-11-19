import CollectionActionButton from '../CollectionActionButton/CollectionActionButton.tsx';
import type { LikeButtonProps } from './LikeButton';
import './LikeButton.css';
export default function LikeButton({ className = '', pressed = false, onClick }: LikeButtonProps) {
  return (
    <CollectionActionButton
      type="button"
      className={`sp-act ${className}`}
      data-tip="Хочу купить"
      aria-label="Хочу купить"
      aria-pressed={pressed}
      onClick={onClick}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
        <path
          className="sp-heart"
          d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z"
          strokeWidth="1.5"
          strokeLinejoin="round"
        ></path>
      </svg>
    </CollectionActionButton>
  );
}
