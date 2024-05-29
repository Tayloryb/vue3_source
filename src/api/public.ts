import { get } from './config/https'

export const getCaptcha = (params: {
  type: 'login' | 'updatepwd',
  email?: string
}) => get({
  url: 'public/captcha',
  params
})