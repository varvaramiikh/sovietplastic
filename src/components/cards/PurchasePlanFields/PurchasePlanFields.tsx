import TextInput from '../../ui/TextInput/TextInput.tsx';
import type { PurchasePlanFieldsProps } from './PurchasePlanFields';
import './PurchasePlanFields.css';
export default function PurchasePlanFields({ item }: PurchasePlanFieldsProps) {
  return (
    <div className="sp-plan">
      <label className="sp-plan-f">
        <span className="sp-plan-l">Где планирую купить</span>
        <TextInput type="text" value={item.note} onChange={item.setNote} placeholder="Магазин, сайт, барахолка" />
      </label>
      <label className="sp-plan-f sp-plan-price">
        <span className="sp-plan-l">Примерная цена</span>
        <span className="sp-plan-in">
          <TextInput type="text" inputMode="numeric" value={item.price} onChange={item.setPrice} placeholder="0" />
          <i>{item.cur}</i>
        </span>
      </label>
    </div>
  );
}
