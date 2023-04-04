import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { getProxy } from "./build/proxy";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:{
      '@':'./src/',
    }
  },
  server: {
    proxy: getProxy('development')
  }
})
