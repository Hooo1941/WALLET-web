import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import proxyaddr from './proxyconfig';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/wallet': {
        target: proxyaddr,
        changeOrigin: true,
      },
    },
  },
});
