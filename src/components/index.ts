import type { App, Component } from 'vue'
// 引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入项目中全部的全局组件
import SvgIcon from './SvgIcon/index.vue'
import Category from './Category/index.vue'

// 全局对象
const allGloablComponent: { [name: string]: Component } = {
  SvgIcon,
  Category,
}

// 对外暴露插件对象
export default {
  // 务必叫做install方法
  install(app: App) {
    Object.keys(allGloablComponent).forEach((key) => {
      // 注册为全局组件
      app.component(key, allGloablComponent[key])
    })
    // 将element-plus提供图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
