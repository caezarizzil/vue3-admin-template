// import { defineConfig, loadEnv } from 'vite'
import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  // 获取各种环境下的配置
  const env = loadEnv(mode, process.cwd())
  
  // 返回配置对象
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定了要缓存的图标文件夹的路径
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定了 symbol 标签的 id 格式
        symbolId: 'icon-[dir]-[name]',
        // 指定插入位置，默认为 body-last，可以选择 body-last 或 body-first
        inject: 'body-last',
        // 属性用于指定自定义的 DOM id，默认为 __svg__icons__dom__
        customDomId: '__svg__icons__dom__',
      }),
      // MockServe 配置
      viteMockServe({
        // 设置模拟.ts 文件的存储文件夹
        mockPath: 'mock',
        // 设置是否监视mockPath对应的文件夹内文件中的更改，默认true
        watchFiles: false,
        // 是否启用 mock 功能
        enable: command === 'serve',
        // 是否在控制台显示请求日志
        logger: true,
      }),
    ],
    resolve: {
      alias: {
        // 相对路径别名配置，使用 @ 代替 src
        '@': path.resolve('./src'),
      },
    },
    // scss全局变量一个配置
    css: {
      // 配置预处理器选项
      preprocessorOptions: {
        // 配置SCSS选项
        scss: {
          // 启用在SCSS中使用JavaScript表达式的功能
          javascriptEnabled: true,
          // 指定额外的SCSS文件引入
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    //代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置
          target: env.VITE_SERVE_URL,
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  }
}
