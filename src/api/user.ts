import { DataWrapper } from '@/define'
import { post, get } from './config/https'

export function register(data: {
  account: string
  password: string
  phone?: string
  email?: string
}) {
  return post<DataWrapper<{
    account: string
    password: string
    phone?: string
    email?: string
  }>>({
    url: 'user/register',
    params: data
  })
}

export function getUserInfo() {
  return get<DataWrapper<{
    id: string
  }>>({
    url: 'user/whoami',
  })
}

export const login = (params: {
  account: string
  password: string
  login_method: 'password' | 'sms_code' | 'email_code'
}) => post<DataWrapper<{
  token: string
}>>({
  url: 'user/login',
  params
})