import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/components/nav-header/types/index'
let firstName: any = ''
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  // 第一个参数表示要查找的相关文件，第二个参数表示是否进行递归查找，第三个参数表示正则匹配
  //  require.context使得不需要每次显式的调用import导入模块
  const routeFiles = require.context('../router/main', true, /\.ts/)
  // 获取每一个url并传给allRoutes
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // 根据菜单获取需要添加的routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstName) {
          firstName = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}
// 实现面包屑tab与菜单栏切换到的目录对应
export function routeMaptoBreadcrumb(userMenu: any, currentPath: string): any {
  const breadcrumb: IBreadcrumb[] = []
  routeMaptoPath(userMenu, currentPath, breadcrumb)
  return breadcrumb
}

// 解决菜单栏和主页面刷新后不对应问题
export function routeMaptoPath(userMenu: any, currentPath: string, breadcrumb?: any): any {
  for (const menu of userMenu) {
    if (menu.type === 1) {
      const findMenu = routeMaptoPath(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumb?.push({ name: menu.name })
        breadcrumb?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && currentPath === menu.url) {
      return menu
    }
  }
}
// 实现菜单权限
export function mapMenusToPermision(userMneus: any[]) {
  const permission: string[] = []
  // 递归调用
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else {
        permission.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMneus)
  return permission
}
// 对角色管理里面的编辑el-tree操作进行回显
export function getMenuLeafKeys(menuList: any[]) {
  const keysLeft: number[] = []
  const _recurseGetKeys = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.children) {
        _recurseGetKeys(menu.children)
      } else {
        keysLeft.push(menu.id)
      }
    }
  }
  _recurseGetKeys(menuList)
  return keysLeft
}
// 解决手动输入路径到main时，没有当前id问题
export { firstName }
