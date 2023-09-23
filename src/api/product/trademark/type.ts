/**
 * 品牌返回值类型
 */
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

/**
 * 品牌数据类型
 */
export interface TradeMark {
  id?: number
  tmName: string
  logoUrl: string
}

/**
 * 品牌列表数据类型
 */
export type TradeMarkList = TradeMark[]

/**
 * 获取品牌列表数据类型
 */
export interface TradeMarkResponse extends ResponseData {
  data: {
    records: TradeMarkList
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
