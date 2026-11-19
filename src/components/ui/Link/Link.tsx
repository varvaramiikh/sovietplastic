import type { LinkProps } from './Link';
import './Link.css';
export default function Link({ className = '', ...props }: LinkProps) {
  return <a className={`ui-link ${className}`} {...props} />;
}
