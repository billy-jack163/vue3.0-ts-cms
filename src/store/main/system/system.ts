import { Module } from 'vuex'
import {
  getDataDelete,
  getPageListActions,
  createPageData,
  editorPageData
} from '@/network/main/main'
import loginCache from '@/untils/login-cache'
const system: Module<any, any> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      goodList: [],
      goodCount: 0,
      menuList: [],
      menuCount: 0,
      departmentList: [],
      departmentCount: 0,
      categoryList: [],
      categoryCount: 0
    }
  },
  mutations: {
    changeusersList(state, payload) {
      state.userList = payload
    },
    changeusersCount(state, payload) {
      state.userCount = payload
    },
    changeroleList(state, payload) {
      state.roleList = payload
    },
    changeroleCount(state, payload) {
      state.roleCount = payload
    },
    changegoodsList(state, payload) {
      state.goodList = payload
    },
    changegoodsCount(state, payload) {
      state.goodCount = payload
    },
    changemenuList(state, payload) {
      state.menuList = payload
    },
    changemenuCount(state, payload) {
      state.menuCount = payload
    },
    changedepartmentList(state, payload) {
      state.departmentList = payload
    },
    changedepartmentCount(state, payload) {
      state.departmentCount = payload
    },
    changecategoryList(state, payload) {
      state.categoryList = payload
    },
    changecategoryCount(state, payload) {
      state.categoryCount = payload
    }
  },
  getters: {
    // 页面列表渲染
    pageList(state: any) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.userList
          case 'role':
            return state.roleList
          case 'goods':
            return state.goodList
          case 'menu':
            return state.menuList
          case 'department':
            return state.departmentList
          case 'category':
            return state.categoryList
        }
      }
    },
    // 页面的数量
    pageCount(state: any) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.userCount
          case 'role':
            return state.roleCount
          case 'goods':
            return state.goodCount
          case 'menu':
            return state.menuCount
          case 'department':
            return state.departmentCount
          case 'category':
            return state.categoryCount
        }
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageUrl
      // 拼接字符串获取相关数据
      const pageUrl = `/${pageName}/list`
      const lists = await getPageListActions(pageUrl, payload.queryInfo)

      // 获取列表和数量
      const { list, totalCount } = lists.data
      loginCache.setCache('list', list)
      loginCache.setCache('totalCount', totalCount)
      commit(`change${pageName}List`, list)
      commit(`change${pageName}Count`, totalCount)
      // console.log(list)
    },
    // 删除数据操作
    async getDataDeletes({ dispatch }, payload: any) {
      // payload => use/id || role/id
      const { pageName, item } = payload
      const pageUrl = `${pageName}/${item.id}`
      // 调用删除网络接口
      await getDataDelete(pageUrl)
      // 删除后重新请求数据
      dispatch('getPageListAction', {
        pageUrl: pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    // 新建用户
    async getNewsCreateUser({ dispatch }, payload: any) {
      const { pageName, newData } = payload
      console.log(newData)
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)
      dispatch('getPageListAction', {
        pageUrl: pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    // 编辑用户
    async getEditorUser({ dispatch }, payload: any) {
      const { pageName, newData, id } = payload

      const pageUrl = `/${pageName}/${id}`
      await editorPageData(pageUrl, newData)
      // 重新请求列表数据
      dispatch('getPageListAction', {
        pageUrl: pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
    // localListAction({ commit }) {
    //   const getList = loginCache.getCache('list')
    //   commit('changeusersList', getList)
    //   const gettotalCount = loginCache.getCache('totalCount')
    //   commit('changeusersCount', gettotalCount)
    // }
  }
}
export default system
