<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="resetBtnClicks"
      @handleQuery="handleQuerys"
    ></page-search>
    <!--  pageName="users"直接传入子组件的是一个字符串 -->
    <page-content
      :contentFormConfig="contentFormConfig"
      pageName="users"
      @createUser="createUsers"
      @handleEditor="handleEditor"
      ref="pageContentRef"
    ></page-content>
    <dialog-content
      ref="modalRef"
      pageName="users"
      :modalConfig="modalComputedRef"
      :defaultValues="defaultValue"
    ></dialog-content>
  </div>
</template>

<script lang="ts">
import { usePageSearch } from '@/hooks/user-search-page'
import { usePgaeModal } from '@/hooks/user-modal-page'

import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { searchFormConfig } from './config/searchFormConfig'
import { modalConfig } from './config/modal.config'
import dialogContent from '@/base-ui/dialog/dialog.vue'
// page-content的内容配置
import contentFormConfig from './config/content.config'
import pageContent from '@/components/page-content/page-content.vue'
import pageSearch from '@/components/page-search/page-search.vue'

export default defineComponent({
  name: 'user',
  components: {
    pageSearch,
    pageContent,
    dialogContent
  },
  setup() {
    // 和hook里面return的数组一致否则会失效
    // hook的使用
    const [pageContentRef, resetBtnClicks, handleQuerys] = usePageSearch()
    const [modalRef, defaultValue, createUsers, handleEditor] = usePgaeModal()
    const store = useStore()
    // 副作用函数的使用
    // 动态添加部门和角色列表
    const modalComputedRef = computed(() => {
      const department = store.state.entireDepartment
      const oldDepartement = modalConfig.propList.find((item: any) => item.field === 'departement')
      const role = store.state.entireRole
      const oldRole = modalConfig.propList.find((item: any) => item.field === 'role')
      oldDepartement!.options = department.map((item: any) => {
        return { title: item.name, value: item.id }
      })
      oldRole!.options = role.map((item: any) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })

    //  oldDepartement!.options表示一定有值，相当异步请求同步化

    return {
      searchFormConfig,
      contentFormConfig,
      pageContentRef,
      resetBtnClicks,
      handleQuerys,
      modalConfig,
      defaultValue,
      createUsers,
      handleEditor,
      modalRef,
      modalComputedRef
    }
  }
})
</script>

<style scoped lang="less"></style>
