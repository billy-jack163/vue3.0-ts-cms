import { ref } from 'vue'
import pageContent from '@/components/page-content/page-content.vue'
export function usePageSearch() {
  // 通过ref获取page-content整个组件
  const pageContentRef = ref<InstanceType<typeof pageContent>>()
  // 重置按钮
  const resetBtnClicks = () => {
    pageContentRef.value?.searchList()
  }
  // 查询按钮
  const handleQuerys = (queryInfo: any) => {
    pageContentRef.value?.searchList(queryInfo)
  }
  return [pageContentRef, resetBtnClicks, handleQuerys]
}
