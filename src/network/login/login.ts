// 获取相关实例
import hyRequest from '../index'
import { IAccount } from './types'
// 枚举的使用,变量只限于列举出来的枚举范围
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}
// account为账号密码
// 获取该用户的信息，比如id值和token
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<any>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}
// 获取该用户数据
export function requestUserInfoById(id: number) {
  return hyRequest.get<any>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}
// 获取该用户相关菜单栏
export function requestUserMenusByRoleId(id: number) {
  return hyRequest.get<any>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
