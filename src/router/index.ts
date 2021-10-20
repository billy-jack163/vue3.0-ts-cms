import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import loginCache from '@/untils/login-cache'
// 解决手动输入路径到main时，没有当前id问题
import { firstName } from '@/untils/map-menus'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('views/main/main.vue'),
    children: []
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 导航守卫
// 通过token来对用户是否登录进行判断
router.beforeEach((to) => {
  const token = loginCache.getCache('token')
  if (to.path !== '/login') {
    if (!token) {
      return '/login'
    }
  }
  if (to.path === '/main') {
    return firstName.url
  }
})
export default router
