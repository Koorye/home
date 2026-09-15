import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  // 仓库部署在 https://Koorye.github.io/home/，构建时用 /home/；
  // dev 时必须用 /，否则 base '/home/' 会和文件系统路径 /home/baai/... 冲突，
  // vite 会把模块路径误当作带 base 的 URL 处理，报 ENOENT /baai/...
  base: command === 'serve' ? '/' : '/home/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
}))
