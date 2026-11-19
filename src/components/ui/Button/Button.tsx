import type { ButtonProps } from './Button';
import './Button.css';
export default function Button({ type = 'button', className = '', ...props }: ButtonProps) {
  return <button type={type} className={`ui-button ${className}`} {...props} />;
}
