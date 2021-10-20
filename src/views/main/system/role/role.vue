<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClicks="resetBtnClicks"
      @handleQuery="handleQuerys"
    ></page-search>
    <page-content
      :contentFormConfig="contentFormConfig"
      pageName="role"
      ref="pageContentRef"
      @createUser="createUsers"
      @handleEditor="handleEditor"
    ></page-content>
    <dialog-content
      ref="modalRef"
      :otherInfo="otherInfo"
      :defaultValues="defaultValue"
      :modalConfig="modalConfig"
      pageName="role"
    >
      <template #tree
        ><el-tree
          ref="elTreeRef"
          class="tree"
          :data="menuList"
          show-checkbox
          node-key="id"
          @check="handleTreeData"
          :props="{ children: 'children', label: 'name' }"
      /></template>
    </dialog-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from 'vuex'

import { getMenuLeafKeys } from '@/untils/map-menus'

import contentFormConfig from './config/content.config'
import { searchFormConfig } from './config/searchFormConfig'
import { modalConfig } from './config/modal.config'

import { usePgaeModal } from '@/hooks/user-modal-page'
import { usePageSearch } from '@/hooks/user-search-page'
import { ElTree } from 'element-plus'

import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import dialogContent from '@/base-ui/dialog/dialog.vue'
export default defineComponent({
  name: 'role',
  components: {
    pageSearch,
    pageContent,
    dialogContent
  },
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    // 获取hooks里面的item
    const editCallBack = (item: any) => {
      const menus = getMenuLeafKeys(item.menuList)
      nextTick(() => {
        console.log(elTreeRef.value)
        elTreeRef.value?.setCheckedKeys(menus, false)
      })
    }
    const [modalRef, defaultValue, createUsers, handleEditor] = usePgaeModal(
      undefined,
      editCallBack
    )
    const [pageContentRef, resetBtnClicks, handleQuerys] = usePageSearch()
    const store = useStore()
    const menuList = computed(() => store.state.menuList)
    let otherInfo = ref({})
    // 处理EL-tree数据
    const handleTreeData = (data1: any, data2: any) => {
      const halfKey = data2.halfCheckedKeys
      const key = data2.checkedKeys
      const menuInfo = [...key, ...halfKey]
      otherInfo.value = { menuInfo }
    }
    return {
      contentFormConfig,
      searchFormConfig,
      modalConfig,
      modalRef,
      defaultValue,
      createUsers,
      handleEditor,
      pageContentRef,
      resetBtnClicks,
      handleQuerys,
      menuList,
      otherInfo,
      handleTreeData,
      editCallBack,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.role {
  .tree {
    padding: 0 35px 0 35px;
  }
}
</style>
