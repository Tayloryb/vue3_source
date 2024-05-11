import { BaseWrapper, RequestConfig, ServerCode } from '@/define'
import axios from 'axios'
import { setGlobalOptions } from 'vue-request'
import { message } from 'ant-design-vue'

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
    const { ignoreCodeIntercept } = <RequestConfig>res.config
    if (!ignoreCodeIntercept) {
      const { code, errorMsg } = <BaseWrapper>res.data
      if ([ServerCode.WRONG_TOKEN, ServerCode.EMPTY_TOKEN, ServerCode.EXPIRE_TOKEN].includes(code)) {
        message.error(`${errorMsg}`)
        // token失效失败后返回首页
        setTimeout(() => {
          const location = top?.location || parent.location
          location.href = import.meta.env.VITE_HOME_WEBSITE_URL
        }, 2000)
      } else if (code !== ServerCode.SUCCESS) {
        // 其他提示，纯提示
        message.error(`${errorMsg}`)
      }
    }
    return res
  }
)

export default api
