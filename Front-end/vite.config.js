import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/viacep': 'https://viacep.com.br',
    },
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/_mantine";',
      },
    },
    },
})

