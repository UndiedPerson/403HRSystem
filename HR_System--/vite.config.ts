import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default defineConfig({
  plugins: [
    vue(),
    nodeResolve()  // ใช้ปลั๊กอินเพื่อรองรับ Node.js modules
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '/api'),
      }
    }
  },
  base: '/HrSystem_project/Human-Resource-Management-System_System_Analysis_and_Design_Project/HR_System--/',
})
