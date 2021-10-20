import { AxiosRequestConfig } from 'axios'
// 自定义一个拦截器类型
export interface HYRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: any) => any
  responseInterceptorCatch?: (error: any) => any
}
// 拦截器类型继承AxiosRequestConfig的属性
export interface HYRequestConfig extends AxiosRequestConfig {
  // 集成类，对HYRequestInterceptors所有属性进行集成
  interceptors?: HYRequestInterceptors
  showLoading?: boolean
}
