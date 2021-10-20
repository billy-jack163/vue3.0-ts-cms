// 对axios进行类的封装,减少耦合性
import axios from 'axios'
import type { AxiosInstance } from 'axios'
// 对自定义类型进行导入
import type { HYRequestInterceptors, HYRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { nextTick } from 'vue'

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading?: boolean
  //   数据请求使用
  loading?: any
  //  对HYRequestConfig接口定义的目的是为了增加一个interceptors类型
  constructor(config: HYRequestConfig) {
    //  将axios整个对象赋值给instance
    this.instance = axios.create(config)
    // 对拦截器进行操作
    this.interceptors = config.interceptors
    // 手动对loading进行操作,??表示假如config.showLoading没有值的情况下，默认使用右边的值
    // this.showLoading = config.showLoading ?? true
    // console.log(config.showLoading)
    // 局部拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    // 全局拦截器
    this.instance.interceptors.request.use(
      (res) => {
        // console.log('全局数据请求成功')
        // console.log(this.showLoading)
        if (this.showLoading) {
          this.loading = ElLoading.service({
            fullscreen: true,
            text: '数据请求中'
          })
        }
        return res
      },
      (err) => {
        console.log('全局请求数据失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        //   全局响应拦截器
        const { data } = res
        if (data.returnCode === '-1001') {
          console.log('请求失败,错误信息')
        } else {
          setTimeout(() => {
            nextTick(() => {
              //   可选链的作用是省去了if判断是否有值的过程
              this.loading?.close()
            })
          }, 1000)
          return data
        }
      },
      (err) => {
        console.log('全局数据请求失败')
        // 全局响应拦截器
        // if (err.response.status === 200) {
        //   console.log('数据请求失败')
        // }
        nextTick(() => {
          //   可选链的作用是省去了if判断是否有值的过程
          this.loading?.close()
        })
        return err
      }
    )
  }
  request<T = any>(config: HYRequestConfig): Promise<T> {
    return new Promise((reslove, reject): any => {
      // 2.判断是否需要显示loading
      // if (config.showLoading === false) {
      this.showLoading = config.showLoading ?? true
      // }
      //   对拦截器做单独处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          reslove(res)
          console.log(res)
          //   对响应拦截器进行判断假如存在，就将其传给给config，并赋值给res
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  //   对相关请求进行分类
  get<T = any>(config: HYRequestConfig) {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYRequestConfig) {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HYRequestConfig) {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default HYRequest
