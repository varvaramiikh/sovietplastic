import type { SelectProps } from './Select';
import './Select.css';
export default function Select({ className = '', ...props }: SelectProps) {
  return <select className={`ui-select ${className}`} {...props} />;
}
