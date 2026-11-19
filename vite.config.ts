import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// РћР±С‹С‡РЅРѕРµ РѕРґРЅРѕСЃС‚СЂР°РЅРёС‡РЅРѕРµ РїСЂРёР»РѕР¶РµРЅРёРµ: dev-СЃРµСЂРІРµСЂ Рё preview РѕС‚РґР°СЋС‚ index.html РЅР° Р»СЋР±РѕР№ Р°РґСЂРµСЃ,
// РїРѕСЌС‚РѕРјСѓ РїСЂСЏРјС‹Рµ СЃСЃС‹Р»РєРё /catalog, /admin Рё С‚. Рї. РѕС‚РєСЂС‹РІР°СЋС‚СЃСЏ СЃСЂР°Р·Сѓ.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true, proxy: { '/api': 'http://127.0.0.1:3001' } },
  preview: { port: 4173, strictPort: true, proxy: { '/api': 'http://127.0.0.1:3001' } },
});
