import hyRequest from '..'
export function getPageListActions(url: string, queryInfo: any) {
  return hyRequest.post({
    url: url,
    data: queryInfo,
    showLoading: false
  })
}
// 删除操作
export function getDataDelete(url: string) {
  return hyRequest.delete({
    url: url
  })
}
// 新建用户
export function createPageData(url: string, newData: any) {
  return hyRequest.post({
    url: url,
    data: newData
  })
}
export function editorPageData(url: string, newData: any) {
  return hyRequest.patch({
    url: url,
    data: newData
  })
}
