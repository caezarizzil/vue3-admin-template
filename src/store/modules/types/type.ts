import { RouteRecordRaw } from "vue-router"

// 定义小仓库数据state类型
export interface UserState {
  token: string | null | undefined
  menuRoutes: RouteRecordRaw[]
  username: string | undefined
  avatar: string | undefined
}
