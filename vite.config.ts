import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'VITE_');
  return {
    base: env.VITE_PUBLIC_BASE || '/',
    plugins: [react()],
    server: { port: 5173, strictPort: true, proxy: { '/api': 'http://127.0.0.1:3001' } },
    preview: { port: 4173, strictPort: true, proxy: { '/api': 'http://127.0.0.1:3001' } },
  };
});
