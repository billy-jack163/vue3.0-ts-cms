import { getPageListActions } from '@/network/main/main'
import { createStore } from 'vuex'
// 对login模块进行导入
import login from './login/login'
import system from './main/system/system'
import dashboard from './dashboard/dashboard'
const store = createStore({
  // 获取modal.config.ts里面配置信息相关内容
  state: {
    entireDepartment: [],
    entireRole: [],
    menuList: []
  },
  mutations: {
    changeEntireDepartment(state, payload) {
      state.entireDepartment = payload
    },
    changeEntireRole(state, payload) {
      state.entireRole = payload
    },
    changeEntireMenu(state, payload) {
      state.menuList = payload
    }
  },
  actions: {
    //获取初始化数据
    async getInitalDataAction({ commit }) {
      // 获取modal.config.ts里面配置信息相关内容
      const departement = await getPageListActions('department/list', {
        offset: 0,
        size: 1000
      })
      // const { list: departementList } es6起别名的语法
      const { list: departementList } = departement.data

      const role = await getPageListActions('role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = role.data
      const menu = await getPageListActions('menu/list', {
        offset: 0,
        size: 100
      })

      const { list: menuList } = menu.data

      commit('changeEntireDepartment', departementList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})
// 因为当用户刷新时，会使相关用户信息失效
export function setupStore(): void {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getInitalDataAction')
}
export default store
