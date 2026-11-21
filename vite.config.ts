import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  plugins: [uni()],
  server: {
    port: 5174,
    proxy: { '/client-api': { target: process.env.VITE_CLIENT_PROXY || 'http://127.0.0.1:8082', changeOrigin: true } }
  }
})
