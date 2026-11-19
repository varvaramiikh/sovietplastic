import type { TextAreaProps } from './TextArea';
import './TextArea.css';
export default function TextArea({ className = '', ...props }: TextAreaProps) {
  return <textarea className={`ui-textarea ${className}`} {...props} />;
}
