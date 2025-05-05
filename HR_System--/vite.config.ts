import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api'), // เก็บ path /api/login.php เดิมไว้
      }
    }
  },
  base: '/',
})
