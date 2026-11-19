import type { MouseEventHandler, ChangeEventHandler } from 'react';
export interface PurchasePlanModalProps {
  plan: {
    title?: string;
    note?: string;
    price?: string;
    cur?: string;
    skip?: MouseEventHandler<HTMLButtonElement>;
    save?: MouseEventHandler<HTMLButtonElement>;
    setNote?: ChangeEventHandler<HTMLInputElement>;
    setPrice?: ChangeEventHandler<HTMLInputElement>;
  };
}
