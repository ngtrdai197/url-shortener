import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import sassGlobImports from 'vite-plugin-sass-glob-import';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [react(), sassGlobImports()],
  server: {
    host: true,
    strictPort: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
});
