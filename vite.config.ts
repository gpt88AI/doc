import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 开发端口固定为 27891，避免与常见 3000/5173 冲突。
// 文档站不依赖任何后端代理，所以不再配置 /api 转发。
const devPort = 27891

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/')) {
            if (id.includes('react-router')) return 'router'
            if (id.includes('lucide-react')) return 'icons'
            if (id.includes('@radix-ui') || id.includes('cmdk')) return 'ui'
            return 'vendor'
          }
        },
      },
    },
  },
  server: {
    port: devPort,
    strictPort: true,
  },
  preview: {
    port: devPort,
    strictPort: true,
  },
})
