import { ref } from 'vue'
import dialogContent from '@/base-ui/dialog/dialog.vue'
// 定义类型
type CallbackFn = (item?: any) => void
export function usePgaeModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const modalRef = ref<InstanceType<typeof dialogContent>>()

  // 新建用户
  const createUsers = () => {
    // 重置配置信息
    defaultValue.value = {}
    if (modalRef.value) {
      modalRef.value.createUser = true
    }
    newCb && newCb()
  }
  const defaultValue = ref({})
  // 编辑用户
  const handleEditor = (item: any) => {
    // 浅拷贝
    defaultValue.value = { ...item }
    if (modalRef.value) {
      modalRef.value.createUser = true
    }
    // 将item传入editCb里面
    editCb && editCb(item)
  }
  return [modalRef, defaultValue, createUsers, handleEditor]
}
