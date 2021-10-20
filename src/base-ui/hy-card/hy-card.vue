<template>
  <div class="hy-card">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h3 class="card-header__title">{{ title }}</h3>
        </div>
      </template>
      <slot></slot>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: String,
    default: () => ({ name: '商品列表' })
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.hy-card {
  .card-header {
    .card-header__title {
      margin: 0 !important;
    }
  }
}
</style>
