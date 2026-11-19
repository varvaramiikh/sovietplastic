import { createRoot } from 'react-dom/client';
// Шрифт Onest (в оригинале — Google Fonts, начертания 200–600) подключён локально из пакета @fontsource/onest.
import '@fontsource/onest/200.css';
import '@fontsource/onest/300.css';
import '@fontsource/onest/400.css';
import '@fontsource/onest/500.css';
import '@fontsource/onest/600.css';
import App from './app/App.tsx';
import { authRequest, cacheUser } from './features/auth/auth';

// Без React.StrictMode: в режиме разработки он монтирует компоненты дважды, а перенесённая логика
// (как и оригинал) подписывается на события окна в componentDidMount без отписки.
async function start() {
  try { const { user } = await authRequest('me'); cacheUser(user); }
  catch { localStorage.removeItem('sp-auth'); localStorage.removeItem('sp-admin'); }
  createRoot(document.getElementById('root')!).render(<App />);
}
void start();
