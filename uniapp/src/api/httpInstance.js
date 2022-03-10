import { REQUEST_SUCCESS } from '@/config'
export default ({ url, method, data }) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      method,
      data,
      timeout: 30000,
      success (res) {
        if (res.data.code !== REQUEST_SUCCESS) {
          uni.showToast({
            title: res.data.message,
            duration: 2000,
            icon: 'none'
          })
          return reject(res)
        }
        return resolve({
          code: res.data.code,
          data: res.data.data,
          message: res.data.message
        })
      },
      fail (err) {
        reject(err)
        uni.showToast({
          title: '网络连接超时',
          duration: 2000,
          icon: 'none'
        })
      }
    })
  })
}
