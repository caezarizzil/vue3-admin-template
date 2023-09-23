import { createApp } from 'vue'
import App from './App.vue'

//引入模板的全局的样式
import '@/styles/index.scss'
// svg插件需要配置代码
import 'virtual:svg-icons-register'
// 引入自定义插件对象:注册整个项目全局组件
import gloalComponent from '@/components'
// 引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// ts-expect-error(忽略当前文件ts类型的检测)配置element-plus国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入路由
import router from './router'
// 引入仓库
import pinia from './store'
// 引入路由鉴权文件
import './permisstion'

// 获取应用实例对象
const app = createApp(App)
// 安装自定义插件
app.use(gloalComponent)
// 安装element-plus插件
app.use(ElementPlus, {
  // element-plus国际化配置
  locale: zhCn,
})
//注册模板路由
app.use(router)
//安装仓库
app.use(pinia)
// 将应用挂载到挂载点上
app.mount('#app')
