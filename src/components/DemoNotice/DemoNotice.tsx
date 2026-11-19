import Button from '../ui/Button/Button.tsx';
import { openDemoAccount } from './DemoNotice';
import './DemoNotice.css';
export default function DemoNotice() {
  return (
    <aside className="demo-notice">
      <span>Демонстрационный макет. Данные сохраняются только в этом браузере; письма не отправляются.</span>
      <Button className="demo-notice__button" onClick={openDemoAccount}>
        Открыть демо-кабинет
      </Button>
    </aside>
  );
}
