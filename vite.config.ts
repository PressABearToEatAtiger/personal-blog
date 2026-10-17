import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: process.env.PAGES_BASE_PATH || '/',
  plugins: [vue()],
  build: { rollupOptions: { output: { manualChunks: {
    markdown: ['markdown-it', 'highlight.js/lib/core', 'dompurify', 'yaml'],
  } } } },
})
