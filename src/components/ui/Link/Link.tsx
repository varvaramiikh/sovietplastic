import { publicUrl } from '../../../runtime/urls';
import type { LinkProps } from './Link';
import './Link.css';
export default function Link({ className = '', href, ...props }: LinkProps) {
  return <a href={publicUrl(href)} className={`ui-link ${className}`} {...props} />;
}
