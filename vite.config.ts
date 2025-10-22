import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    base: "/My-Ecommerce/", // 👈 your repo name here!
    plugins: [react(), tailwindcss()],
    server: {
        port: 5173,
        strictPort: true, // 🚨 If 5173 is busy, it will throw error instead of switching
    },
    build: {
        assetsDir: "assets",
        sourcemap: false,
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name]-[hash].js`,
                chunkFileNames: `assets/[name]-[hash].js`,
                assetFileNames: `assets/[name]-[hash].[ext]`,
            },
        },
    },
})
