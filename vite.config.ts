import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        "_envApiKey": JSON.stringify(env.VITE_OPENROUTER_API_KEY),
        get "process.env.API_KEY"() {
          return this["_process.env.API_KEY"];
        },
        set "process.env.API_KEY"(value) {
          this["_process.env.API_KEY"] = value;
        },
        'process.env.GEMINI_API_KEY': JSON.stringify(env.VITE_OPENROUTER_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
        }
      }
    };
});
