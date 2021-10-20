<template>
  <div class="page-search">
    <h1>高级搜索</h1>
    <!-- 顶部表格的制作 -->
    <!-- 神奇的v-bind -->
    <top-form v-bind="searchFormConfig" v-model="formData"></top-form>
    <div class="user-practice">
      <el-button class="el-icon-refresh" @click="handleReset">重置</el-button>
      <el-button class="el-icon-search" type="primary" @click="handleQuery">搜索</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import topForm from '@/base-ui/form/form.vue'
export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    topForm
  },
  setup(props, { emit }) {
    //优化formData里面的属性应该动态绑定
    const formItems = props.searchFormConfig?.propList && []
    const formOriginData: any = {}
    // 初始化field里面的值
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    // 监听form数据变化,和searchFormConfig里面的field值一一对应
    const formData = ref(formOriginData)
    // 当用户点击重置时，初始化变量
    const handleReset = () => {
      formData.value = formOriginData
      emit('resetBtnClick')
    }
    // 搜索功能
    const handleQuery = () => {
      emit('handleQuery', formData.value)
    }
    return {
      formData,
      handleReset,
      handleQuery
    }
  }
})
</script>

<style scoped lang="less">
.page-search {
  background-color: #fff;
  margin-bottom: 15px;
  text-align: center;
  padding: 10px;
  .user-practice {
    text-align: right;
    padding: 0 50px 20px 0;
  }
}
</style>
