// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or vue

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Forward to backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})