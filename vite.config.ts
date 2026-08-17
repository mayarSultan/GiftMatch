import path from 'path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor-motion'
            if (
              id.includes('react-router-dom') ||
              id.includes('/react-dom/') ||
              id.includes('/react/')
            ) {
              return 'vendor-react'
            }
          }
        },
      },
    },
  },
  test: {
    environment: 'node',
  },
})
