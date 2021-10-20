<template>
  <div class="page-content">
    <hy-table :userList="dataList" v-bind="contentFormConfig" :dataCount="dataCount" v-model="page">
      <template #title>
        <div class="title">{{ contentFormConfig.title }}</div>
      </template>
      <template #handleUser>
        <el-button type="primary" size="medium" class="newUser" v-if="isCreate" @click="createUser"
          >新建用户</el-button
        >
      </template>

      <!-- 作用域插槽可以修改相关插槽内容 -->
      <template #status="scope">
        <el-button size="mini" :type="scope.row.enable ? 'success' : 'danger'">{{
          scope.row.enable ? '启用' : '禁用'
        }}</el-button>
      </template>
      <template #createAt="scope">
        <div>{{ $filters.formate(scope.row.createAt) }}</div>
      </template>
      <template #updateAt="scope">
        <div>{{ $filters.formate(scope.row.updateAt) }}</div>
      </template>
      <!-- 通过作用域获取每行数据 -->
      <template #button="scope">
        <div class="handle-btns">
          <el-button
            size="mini"
            class="el-icon-edit"
            v-if="isUpdate"
            type="text"
            @click="handleEditor(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            class="el-icon-delete"
            v-if="isDelete"
            type="text"
            @click="contentDelete(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
      <template #image="scope">
        <!-- :preview-src-list="[scope.row.imgUrl]"为图片是否能放大功能 -->
        <el-image
          class="page-content__image"
          style="width: 80px; height: 80px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        >
        </el-image>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import hyTable from '@/base-ui/table/hy-table.vue'
import usePermission from '@/hooks/use-permission'
export default defineComponent({
  props: {
    contentFormConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    hyTable
  },
  emits: ['createUser', 'handleEditor'],
  setup(props, { emit }) {
    const store = useStore()
    // 新建||编辑||删除操作
    const page = ref({ currentPage: 1, pageSize: 10 })
    const contentDelete = (item: any) => {
      store.dispatch('system/getDataDeletes', {
        item,
        pageName: props.pageName
      })
    }

    const createUser = () => {
      console.log(1111)
      emit('createUser')
    }
    const handleEditor = (item: any) => {
      emit('handleEditor', item)
    }
    // 用户菜单权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')
    // 当page改变时监听searchList函数
    watch(page, () => searchList())
    //请求查询数据列表
    // props.pageName的使用可以让跟本表格相关的数据，都可以通过传值的方式进行快速的搭建
    // offset为要下一列数据请求条件
    const searchList = (queryInfo?: any) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageUrl: props.pageName,
        queryInfo: {
          offset: (page.value.currentPage - 1) * page.value.pageSize,
          size: page.value?.pageSize,
          ...queryInfo
        }
      })
    }
    searchList()
    // 获取页面数量
    const dataCount = computed(() => store.getters[`system/pageCount`](props.pageName))
    //  页面列表
    const dataList = computed(() => store.getters[`system/pageList`](props.pageName))
    console.log(dataList)

    return {
      dataList,
      searchList,
      dataCount,
      page,
      isDelete,
      isCreate,
      isUpdate,
      contentDelete,
      createUser,
      handleEditor
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  background-color: #fff;
  .page-content__image {
    border-radius: 50%;
    box-shadow: 0px 0px 5px rgba(100, 100, 100, 0.5);
  }
  .title {
    display: flex;
    justify-content: center;
    line-height: 45px;
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
