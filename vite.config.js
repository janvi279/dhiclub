import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),svgr()],
  resolve: {
    alias: {
      "@": "/src", // ✅ optional shortcut
    },
  },
  base: './',
   server: {
    host: true, // or '0.0.0.0'
    port: 5173,
     allowedHosts: [
      '607112b9d4ce.ngrok-free.app', // Add your Ngrok URL here
    ],
  }
})
