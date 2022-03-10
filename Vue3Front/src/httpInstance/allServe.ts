import http from './http'
import { SERVICE_CONTEXT } from '@/config'

// 查询用户信息
function apiGetConfig (): Promise<any> {
  return http({
    method: 'get',
    url: `${SERVICE_CONTEXT}/v1/findBlogConfig`
  })
}

export {
  apiGetConfig
}
