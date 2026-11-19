import type { TextInputProps } from './TextInput';
import './TextInput.css';
export default function TextInput({ className = '', ...props }: TextInputProps) {
  return <input className={`ui-textinput ${className}`} {...props} />;
}
