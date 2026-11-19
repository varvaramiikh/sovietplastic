import type { CSSProperties, ChangeEventHandler, MouseEventHandler } from 'react';
export interface FigureCardItem {
  title?: string;
  img?: string;
  scale?: number | string;
  category?: string;
  mainTag?: string;
  wantCls?: string;
  haveCls?: string;
  wantPressed?: boolean | 'true' | 'false';
  havePressed?: boolean | 'true' | 'false';
  toggleWant?: MouseEventHandler<HTMLButtonElement>;
  toggleHave?: MouseEventHandler<HTMLButtonElement>;
  go?: MouseEventHandler<HTMLAnchorElement>;
  planOn?: boolean;
  note?: string;
  price?: string;
  cur?: string;
  setNote?: ChangeEventHandler<HTMLInputElement>;
  setPrice?: ChangeEventHandler<HTMLInputElement>;
}
export interface FigureCardProps {
  item: FigureCardItem;
  href?: string;
}
export function getCardImageStyle(scale?: string | number): CSSProperties {
  return { height: `${scale ?? 80}%`, width: 'auto' };
}
