import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './network/axios'
// 引入插件animate.css
import 'animate.css'
// 重置css样式
import 'normalize.css'
import 'assets/css/index.less'
import { setupStore } from '@/store/index'
// import hyRequest from './network'
// 引入element-plus相关样式和组件
import 'element-plus/lib/theme-chalk/base.css'
import globalRegister from './global'

const app = createApp(App)
// 刷新后对相关数据的保存
setupStore()
// element-plus的注册以及fomatTime的实现
app.use(globalRegister)
app.use(router)
app.use(store)
app.mount('#app')
