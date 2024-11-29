// import { BaseWrapper, RequestConfig, ServerCode } from '@/define'
import axios from 'axios'
import { setGlobalOptions } from 'vue-request'
// import { message } from 'ant-design-vue'

/** 设置全局的vue-request配置 */
setGlobalOptions({
  loadingDelay: 200,
  loadingKeep: 500,
  pagination: {
    currentKey: 'page',
    pageSizeKey: 'limit',
    totalKey: 'data.total',
    totalPageKey: 'data.last_page',
  },
})

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 15000,
})

// 请求返回统一拦截并进行路由跳转
api.interceptors.response.use(
  // 正常请求的code错误码拦截及路由跳转
  (res) => {
    return res.data
  }
)

export default api
