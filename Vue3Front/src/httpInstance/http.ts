import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'
import { REQUEST_SUCCESS } from '@/config'
import Message from '@/components/NxMessage'
import router from '../router'
const http = axios.create({
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache'
  }
})

// 相应拦截器
http.interceptors.response.use(function (response: AxiosResponse): any {
  if (response.data.isLogin === '-1' && response.data.success === false) {
    router.replace('/login')
    return
  }
  // 返回的是文件二进制流  用blob接收  直接返回不做其它处理
  if (response.headers['content-disposition'] && response.headers['content-disposition'].includes('attachment')) {
    return response
  }
  // 对错误进行统一处理
  if (response.data.code !== REQUEST_SUCCESS) {
    Message.error(response.data.message)
    return Promise.reject(response)
  }
  return Promise.resolve({
    code: response.data.code,
    msg: response.data.message,
    data: response.data.data
  })
}, function (error: any) {
  if (error.message.indexOf('timeout') > -1) {
    // 多语言需要自己在项目中配置
    // eslint-disable-next-line
  }
  // http返回401的错误状态也认为是登录过期
  const res = error.response || {}
  const message = res.statusText || '错误的请求'
  // 对响应错误做点什么
  Message.error('网络异常，请求失败')
  return Promise.reject(new Error(message))
})

// 请求拦截器
http.interceptors.request.use(function (config: AxiosRequestConfig): AxiosRequestConfig {
  return config
}, function (error: AxiosError): Promise<AxiosError> {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default http
