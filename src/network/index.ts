import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import loginCache from './../untils/login-cache'
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = loginCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      // console.log('数据请求成功')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('数据请求失败')
      return err
    },
    responseInterceptor: (res) => {
      // console.log('数据响应成功')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('数据响应失败')
      return err
    }
  }
})
export default hyRequest
