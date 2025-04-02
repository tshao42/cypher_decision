import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths,
  assetsInclude: ['**/*.svg'],
  build: {
    outDir: 'dist'
  }
})