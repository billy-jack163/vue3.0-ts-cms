/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare let $store: any
// 导入json文件对json文件的声明
declare module '*.json' {
  const value: any
  export default value
}
