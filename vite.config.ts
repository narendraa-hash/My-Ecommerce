import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
    server: {
        port: 5173,
        strictPort: true, // 🚨 If 5173 is busy, it will throw error instead of switching
    },
})
