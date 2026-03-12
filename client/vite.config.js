import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'BACKEND_TYPE', 'ACTIVEPIECES_BASE_URL', 'NODEJS_BASE_URL'],
})
