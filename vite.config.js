import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default {
  // Make sure base path is correct
  base: '/',
  build: {
    outDir: 'dist' // Check if this matches your Netlify publish directory
  }
}