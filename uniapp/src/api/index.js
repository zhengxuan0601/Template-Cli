import http from './httpInstance'
import { SERVER_CONTEXT } from '@/config'

function getInfo () {
  return http({
    method: 'GET',
    url: `${SERVER_CONTEXT}/v1/findBlogConfig`
  })
}

function login (data) {
  return http({
    method: 'POST',
    url: `${SERVER_CONTEXT}/v1/userLogin`,
    data
  })
}

export {
  getInfo,
  login
}
