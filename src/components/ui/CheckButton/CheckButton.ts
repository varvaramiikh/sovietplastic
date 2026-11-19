import type { MouseEventHandler } from 'react';
export interface CheckButtonProps {
  className?: string;
  pressed?: boolean | 'true' | 'false';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
