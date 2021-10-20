import router from '@/router'
import { Module } from 'vuex'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '../../network/login/login'
import { mapMenusToRoutes, mapMenusToPermision } from '@/untils/map-menus'
import loginCache from './../../untils/login-cache'
const login: Module<any, any> = {
  // 命名空间为true才可使用相关逻辑
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      menu: [],
      permission: []
    }
  },
  mutations: {
    CHANGETOKEN(state, token: string) {
      state.token = token
      // console.log(state.token)
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    changeUserMenu(state, userMenu) {
      state.menu = userMenu
      // userMenus => routes
      const routes = mapMenusToRoutes(userMenu)
      // 用户菜单权限
      state.permission = mapMenusToPermision(userMenu)
      // 将routes => router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    async LoginAccount({ commit }, payload) {
      // 进行数据请求
      // 实现登录逻辑
      const getAccount = await accountLoginRequest(payload)
      const { id, token } = getAccount.data
      commit('CHANGETOKEN', token)
      // 将token进行保存
      loginCache.setCache('token', token)
      const getAccountData = await requestUserInfoById(id)
      //获取用户信息
      const userInfo = getAccountData.data
      commit('changeUserInfo', userInfo)
      // 保存是为了下面进行获取操作
      loginCache.setCache('userInfo', userInfo)
      // 获取用户
      const getMenu = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenu = await getMenu.data
      commit('changeUserMenu', userMenu)
      loginCache.setCache('userMenu', userMenu)

      // 首次登录进行页面跳转
      router.push('/main')
    },
    loginPhone(data, payload) {
      console.log(payload)
    },
    // 通过vuex是将数据放入内存中，因此进行刷新操作的时候用户数据就会消失掉，因此通过以下操作对数据进行保存
    // if判断的目的是为了防止所取的值为空
    loadLocalLogin({ commit }) {
      const token = loginCache.getCache('token')
      if (token) {
        commit('CHANGETOKEN', token)
      }
      const userInfo = loginCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenu = loginCache.getCache('userMenu')
      if (userMenu) {
        commit('changeUserMenu', userMenu)
      }
    }
  }
}
export default login
