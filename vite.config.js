import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// BASE_PATH is the sub-path the site is served from. GitHub Pages project sites live at
// /<repo-name>/, so the deploy workflow sets it from the repo name. Vercel and local dev use '/'.
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
})
