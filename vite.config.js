import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths,
  assetsInclude: ['**/*.svg', '/src/assets/mermaids/*.svg'], // Include SVGs in general and specifically in /src/assets/mermaids
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html'
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.svg')) {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name][extname]';
        }
      }
    }
  }
})