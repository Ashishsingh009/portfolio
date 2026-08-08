import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  // Keep build asset URLs relative so dist/index.html also works when opened locally.
  base: './',
  plugins: [react(), tailwindcss(), viteSingleFile()],
})
