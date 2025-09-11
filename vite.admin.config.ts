import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    root: '.',
    server: { port: 5176 },
    build: {
      rollupOptions: {
        input: path.resolve(__dirname, 'admin.html'),
      },
    },
    resolve: {
      alias: { '@': path.resolve(__dirname, 'src') },
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.VITE_OPENROUTER_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.VITE_OPENROUTER_API_KEY),
    },
  };
});

