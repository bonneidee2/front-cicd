import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this repo at https://bonneidee2.github.io/front-cicd/
  base: '/front-cicd/',
  plugins: [react()],
})
