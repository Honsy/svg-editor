import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { getProxy } from "./build/proxy";
import basicSsl from '@vitejs/plugin-basic-ssl'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  base:'./svg-editor',
  resolve:{
    alias:{
      '@': path.resolve(__dirname, "src"),
    }
  },
  server: {
    https: true,
    proxy: getProxy('development')
  }
})
