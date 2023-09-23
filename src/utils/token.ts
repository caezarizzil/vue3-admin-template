// 封装本地存储存储数据与读取数据方法

// 定义常量
const TOKEN_NAME = 'v3-admin-token'

// 存储token
export const SET_TOKEN = (token: string) =>
  localStorage.setItem(TOKEN_NAME, token)

// 读取token
export const GET_TOKEN = () => localStorage.getItem(TOKEN_NAME)

// 移除token
export const REMOVE_TOKEN = () => localStorage.removeItem(TOKEN_NAME)
