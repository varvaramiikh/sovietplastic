import { cacheUser } from '../../features/auth/auth';
import { publicUrl } from '../../runtime/urls';
export function openDemoAccount() {
  cacheUser({ id: 'demo', email: 'demo@example.com', login: 'collector', name: 'Коллекционер' });
  window.location.assign(publicUrl('/account')!);
}
