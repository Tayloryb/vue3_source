import { BaseWrapper, RequestConfig, RequestWrapper, ServerCode } from '@/define'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { defaultsDeep } from 'lodash-es'
import api from './config'
import { useGlobalStore } from '@/store'

/** 常规参数类型 */
type ParamsType = Record<string, string | number | string[] | number[] | undefined | unknown | unknown[]>

/** 请求数据格式 */
type RequestData = {
  /** 请求地址 */
  url: string
  /** 常规参数 */
  params?: ParamsType | ParamsType[] | FormData
  /** 完整axios配置 */
  config?: AxiosRequestConfig & RequestConfig
}

/**
 * GET请求
 * @param data GET请求数据
 * @returns
 */
export const get = <T extends BaseWrapper>(data: RequestData) =>
  transformWrapper(
    api.get<T>(
      data.url,
      defaultsDeep(
        {
          params: data.params,
          headers: getHeaders(),
        },
        data.config
      )
    )
  )

/**
 * POST请求
 * @param data POST请求数据
 * @returns
 */
export const post = <T extends BaseWrapper>(data: RequestData) =>
  transformWrapper(
    api.post<T>(
      data.url,
      data.params,
      defaultsDeep(
        {
          headers: getHeaders(),
        },
        data.config
      )
    )
  )

/**
 * 网络请求封装
 * @param promise
 * @param error
 * @returns
 */
const transformWrapper = <T extends BaseWrapper>(promise: Promise<AxiosResponse<T>>): Promise<RequestWrapper<T>> => {
  return promise.then((value) => ({
    success: value.data.code === ServerCode.SUCCESS,
    ...value.data,
  }))
}

/**
 * 获取通用的token及加密活动id
 * @returns
 */
export const getHeaders = () => {
  return {
    authorization: useGlobalStore().userToken
  }
}
