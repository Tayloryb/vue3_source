import { get, post } from './config/https'
import { JSErrorInfo, PromiseRejectionInfo } from '@/define/common'

export const getCaptcha = (params: {
  type: 'login' | 'updatepwd',
  email?: string
}) => get({
  url: 'public/captcha',
  params
})

export const errorReport = (params: JSErrorInfo | PromiseRejectionInfo) =>
  post({
    url: 'public/error',
    params
  })