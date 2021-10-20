import hyRequest from '../index'
// 枚举
enum dashboardAPI {
  categoryGoodCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}
export function getCategoryGoodCount() {
  return hyRequest.get({
    url: dashboardAPI.categoryGoodCount,
    showLoading: false
  })
}
export function getCategoryGoodsSale() {
  return hyRequest.get({
    url: dashboardAPI.categoryGoodsSale,
    showLoading: false
  })
}
export function getCategoryGoodsFavor() {
  return hyRequest.get({
    url: dashboardAPI.categoryGoodsFavor,
    showLoading: false
  })
}
export function getAddressGoodsSale() {
  return hyRequest.get({
    url: dashboardAPI.addressGoodsSale,
    showLoading: false
  })
}
