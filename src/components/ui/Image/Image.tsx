import { publicUrl } from '../../../runtime/urls';
import type { ImageProps } from './Image';
import './Image.css';
export default function Image({ src, ...props }: ImageProps) {
  return <img src={publicUrl(src)} {...props} />;
}
