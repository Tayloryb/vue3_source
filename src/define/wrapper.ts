/** 基本请求格式 */
export type BaseWrapper = {
  code: number
  errorMsg: string
}

/** 通用包装格式 */
export type DataWrapper<T> = {
  data: T
} & BaseWrapper


/**
 * 自定义的请求配置定义
 */
export type RequestConfig = {
  /** 跳过通用错误code捕获 */
  ignoreCodeIntercept?: boolean
}

/**
 * 网络请求封装格式
 */
export type RequestWrapper<T extends BaseWrapper> = {
  success: boolean
} & T