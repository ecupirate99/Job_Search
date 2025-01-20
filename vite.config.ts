import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  define: {
    'process.env': process.env,
    'import.meta.env.VITE_RAPID_API_KEY': JSON.stringify(process.env.VITE_RAPID_API_KEY)
  },
});
