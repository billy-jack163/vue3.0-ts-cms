import { Module } from 'vuex'
import {
  getCategoryGoodCount,
  getCategoryGoodsSale,
  getAddressGoodsSale,
  getCategoryGoodsFavor
} from '@/network/dashboard/dashboard'
const dashboard: Module<any, any> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeGoodCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeGoodSale(state, payload) {
      state.categoryGoodsSale = payload
    },
    changeAddressSale(state, payload) {
      state.addressGoodsSale = payload
    },
    changeGoodFavor(state, payload) {
      state.categoryGoodsFavor = payload
    }
  },
  actions: {
    // 获取相关图标数据
    async getDashboardDataAction({ commit }) {
      const goodCount = await getCategoryGoodCount()
      const goodSale = await getCategoryGoodsSale()
      const addressSale = await getAddressGoodsSale()
      const goodFavor = await getCategoryGoodsFavor()
      commit('changeGoodCount', goodCount.data)
      commit('changeGoodSale', goodSale.data)
      commit('changeAddressSale', addressSale.data)
      commit('changeGoodFavor', goodFavor.data)
    }
  }
}
export default dashboard
