// 小仓库: layout相关配置的仓库
import { defineStore } from "pinia"

const useLayoutSettingStore = defineStore('LayoutSetting', {
  state: () => {
    return {
      // 侧边栏折叠状态
      flod: false,
      // 控制刷新效果
      refresh: false,
    }
  }
})

export default useLayoutSettingStore
