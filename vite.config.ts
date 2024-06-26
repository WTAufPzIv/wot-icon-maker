import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import electronRenderer from "vite-plugin-electron-renderer" 
import polyfillExports from "vite-plugin-electron-renderer" 
import path from 'path'

const resolvePath = (str: string) => path.resolve(__dirname, str);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron([
      {
        entry: "electron/main.ts", // 主进程文件
      },
    ]),
    electronRenderer(),
    polyfillExports(),
  ],
  resolve: {
    alias: {
      "@core": path.resolve(__dirname, './core'),
      "@src": path.resolve(__dirname, './src'),
    }
  },
  build: {
    rollupOptions: {
      external: [
        '@core/utils/ipc',
        '@core/utils/files',
        '@core/const/path',
      ]
    }
  },
  server: {
    port: 3000
  },
});
