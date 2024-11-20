import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, './env')
  return {
    base: env.VITE_DOMAIN,
    plugins: [vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    })],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@c': resolve(__dirname, './src/components'),
        '@a': resolve(__dirname, './src/assets'),
        '@v': resolve(__dirname, './src/views'),
        '@d': resolve(__dirname, './src/define'),
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/assets/css/index.less')}";`,
          },
          javascriptEnabled: true,
        },
      },
    },
    build: {
      outDir: './dist',
      assetsDir: './assets'
    }
  }
})