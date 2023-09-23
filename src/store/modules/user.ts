import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user'
// 引入数据类型
import type { loginFormData } from '@/api/user/type'
import type { UserState } from './types/type'
// 引入操作本地存储的方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入静态路由
import { staticRoute } from '@/router/routes'

// 创建用户小仓库
const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      // 用户唯一标识
      token: GET_TOKEN(),
      // 菜单路由数组
      menuRoutes: staticRoute,
      // 用户名
      username: '',
      // 头像
      avatar: '',
    }
  },
  actions: {
    // 用户登录方法
    async userLogin(data: loginFormData) {
      // 登录请求
      const result = await reqLogin(data)
      if (result.code === 200) {
        // 登录成功，存储token到仓库
        this.token = result.data as string
        // 本地存储持久化存储一份
        SET_TOKEN(result.data as string)
        // 能保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        // 登录失败
        return Promise.reject(new Error(result.data))
      }
    },
    // 获取用户信息
    async getUserInfo() {
      // 获取用户信息
      const result = await reqUserInfo()
      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 退出登录
    async userLogout() {
      // 调用接口退出登录（通知服务器，用户唯一标识失效）
      const result = await reqLogout()
      if (result.code === 200) {
        // 清空相关数据
        this.token = ''
        this.username = ''
        this.avatar = ''
        // 清空本地存储
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
