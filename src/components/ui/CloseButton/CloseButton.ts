import type { MouseEventHandler } from 'react';
export interface CloseButtonProps {
  label?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}
