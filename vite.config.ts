import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.VITE_FRONTEND_URL': JSON.stringify(env.VITE_FRONTEND_URL),
      'process.env.VITE_BACKEND_URL': JSON.stringify(env.VITE_BACKEND_URL),
      'process.env.VITE_AUTH0_DOMAIN':JSON.stringify(env.VITE_AUTH0_DOMAIN),
      'process.env.VITE_AUTH0_CLIENT_ID':JSON.stringify(env.VITE_AUTH0_CLIENT_ID),
      'process.env.VITE_AUTH0_AUDIENCE':JSON.stringify(env.VITE_AUTH0_AUDIENCE),
      'process.env.VITE_AUTH0_SCOPE':JSON.stringify(env.VITE_AUTH0_SCOPE),
      'process.env.VITE_AUTH0_USERNAME':JSON.stringify(env.VITE_AUTH0_USERNAME),
      'process.env.VITE_AUTH0_PASSWORD':JSON.stringify(env.VITE_AUTH0_PASSWORD)
    },
    plugins: [react()],
  }
})
