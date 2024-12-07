import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  esbuild: {
    jsxInject: 'import React from "react"',
    target: 'esnext',
  },
  optimizeDeps: {
    exclude: [
      '@mantine/core'
      // Exclua outras dependências que possam estar gerando o erro
    ],
  },
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

