import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

const resolvePath = (path: string) => {
  return fileURLToPath(new URL(path, import.meta.url))
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': resolvePath('./src'),
        '@app': resolvePath('./src/app'),
        '@pages': resolvePath('./src/pages'),
        '@widgets': resolvePath('./src/widgets'),
        '@features': resolvePath('./src/features'),
        '@entities': resolvePath('./src/entities'),
        '@shared': resolvePath('./src/shared'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://cpa-server-vtel.onrender.com',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    esbuild: isProduction
      ? {
          drop: ['debugger'],
          pure: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        }
      : undefined,
  }
})
