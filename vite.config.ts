import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    target: 'esnext', // Target modern browsers if possible
    sourcemap: false, // Disable source maps in production
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  }  
});
