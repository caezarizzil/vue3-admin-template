// 路由鉴权
import router from '@/router'
// 引入进度条插件
// @ts-ignore
import NProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 取消展示加载圆圈
NProgress.configure({ showSpinner: false })
// 引入仓库
import pinia from '@/store'
import useUserStore from './store/modules/user'
// 引入项目设置
import settings from './settings'
// 获取用户仓库
const userStore = useUserStore(pinia)

// 全局前置路由守卫
// to：你将要访间那个路由
// from：你从来个路由而来
// next：路由的放行函数
router.beforeEach(async (to: any, from: any, next: any) => {
  // 设置标题
  document.title = `${settings.title}-${to.meta.title}`
  // 进度条开始
  NProgress.start()
  // 获取用户token
  const token = userStore.token || localStorage.getItem('token')
  // 判断用户是否登录
  if (token) {
    // 登录成功，不能访问login
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      const usernme = userStore.username
      if (usernme) {
        next()
      } else {
        try {
          await userStore.getUserInfo()
          next()
        } catch (error) {
          await userStore.userLogout()
          next({path: '/login', query: {redirect: to.path}})
        }
      }
    }
  } else {
    // 用户未登录，只能访问login
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 全局后置路由守卫
router.afterEach((to: any, from: any) => {
  // 进度条结束
  NProgress.done()
})
