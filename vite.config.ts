import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    server: {
      port: 8501,
    },
    define: {
      // Polyfill process.env.API_KEY so the existing code works without modification
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    }
  }
})