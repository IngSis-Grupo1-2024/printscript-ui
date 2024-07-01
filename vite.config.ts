import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.FRONTEND_URL': JSON.stringify(env.FRONTEND_URL),
      'process.env.BACKEND_URL': JSON.stringify(env.BACKEND_URL),
      'process.env.AUTH0_DOMAIN':JSON.stringify(env.AUTH0_DOMAIN),
      'process.env.AUTH0_CLIENT_ID':JSON.stringify(env.AUTH0_CLIENT_ID),
      'process.env.AUTH0_AUDIENCE':JSON.stringify(env.AUTH0_AUDIENCE),
      'process.env.AUTH0_SCOPE':JSON.stringify(env.AUTH0_SCOPE),
      'process.env.AUTH0_USERNAME':JSON.stringify(env.AUTH0_USERNAME),
      'process.env.AUTH0_PASSWORD':JSON.stringify(env.AUTH0_PASSWORD)
    },
    plugins: [react()],
  }
})
