import type { CheckboxProps } from './Checkbox';
import './Checkbox.css';
export default function Checkbox({ className = '', ...props }: CheckboxProps) {
  return <input className={`ui-checkbox ${className}`} type="checkbox" {...props} />;
}
