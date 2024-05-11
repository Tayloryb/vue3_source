import { DataWrapper } from '@/define'
import { post, get } from './config/https'


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
}) => post<DataWrapper<{
  token: string
}>>({
  url: 'user/login',
  params
})