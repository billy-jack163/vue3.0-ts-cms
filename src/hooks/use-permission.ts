import { useStore } from 'vuex'
export default function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permission = store.state.login.permission
  const verifyPermission = `system:${pageName}:${handleName}`
  // const name = ysp
  // !name => false
  // !!name => true
  return !!permission.find((item: any) => item === verifyPermission)
}
