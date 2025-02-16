import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
// import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  assetsInclude: ['**/*.jpg'], // Tambahkan ini
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
