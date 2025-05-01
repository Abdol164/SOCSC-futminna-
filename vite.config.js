import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Increase the limit to 1000 kB
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://fc81j2ps-3000.uks1.devtunnels.ms', // OR http://localhost:3000
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
