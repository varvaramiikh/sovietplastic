import type { MouseEventHandler } from 'react';
export interface LikeButtonProps {
  className?: string;
  pressed?: boolean | 'true' | 'false';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
