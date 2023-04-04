import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { getProxy } from "./build/proxy";
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  resolve:{
    alias:{
      '@':'./src/',
    }
  },
  server: {
    https: true,
    proxy: getProxy('development')
  }
})
