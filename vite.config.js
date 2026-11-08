import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  // This ensures Vite copies everything from 'public' to 'dist' during build
  publicDir: 'public',
})
