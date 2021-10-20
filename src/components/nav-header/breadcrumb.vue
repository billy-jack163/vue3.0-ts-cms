<template>
  <div class="breadcrumb">
    <el-breadcrumb>
      <template v-for="item in breadcrumb" :key="item.name">
        <el-breadcrumb-item class="el-breadcrumb-item"
          ><a>{{ item.name }}</a></el-breadcrumb-item
        ></template
      >
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['breadcrumb'],
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.breadcrumb {
  .el-breadcrumb-item {
    font-size: 16px;
  }
}
</style>
