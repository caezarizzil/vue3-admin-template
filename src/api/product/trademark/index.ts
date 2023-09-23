// 品牌管理模块接口
import request from '@/utils/request'
import type { TradeMarkResponse, TradeMark, ResponseData } from './type'

// 品牌管理模块接口地址
enum API {
  // 获取品牌列表
  LIST_TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 添加品牌
  ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改品牌
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除品牌
  DELETE_TRADEMARK_URL = '/admin/product/baseTrademark/remove',
}

/**
 * 获取品牌列表
 * @param pageNum 页码
 * @param pageSize 每页条数
 * @returns {AxiosPromise}
 */
export const reqTrademarkList = (pageNum: number, pageSize: number) =>
  request.get<any, TradeMarkResponse>(
    API.LIST_TRADEMARK_URL + `${pageNum}/${pageSize}`,
  )

/**
 * 保存或修改品牌
 * 有id: 修改
 * 无id: 保存
 * @param data 要保存或修改的品牌
 */
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  if (data.id) {
    return request.put<any, ResponseData>(API.UPDATE_TRADEMARK_URL, data)
  } else {
    return request.post<any, ResponseData>(API.ADD_TRADEMARK_URL, data)
  }
}

/**
 * 删除品牌
 * @param id 要删除的品牌id
 */
export const reqDeleteTrademark = (id: number) => {
  return request.delete<any, ResponseData>(API.DELETE_TRADEMARK_URL + `/${id}`)
}
