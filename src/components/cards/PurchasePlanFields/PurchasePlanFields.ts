import type { FigureCardItem } from '../FigureCard/FigureCard';
export interface PurchasePlanFieldsProps {
  item: Pick<FigureCardItem, 'note' | 'price' | 'cur' | 'setNote' | 'setPrice'>;
}
