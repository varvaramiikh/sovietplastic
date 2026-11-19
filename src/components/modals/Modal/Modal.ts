import type { ReactNode, MouseEventHandler } from 'react';
export interface ModalProps {
  titleId: string;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}
