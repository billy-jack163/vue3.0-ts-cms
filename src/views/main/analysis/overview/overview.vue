<template>
  <div class="overview">
    <hy-card title="关于">
      <div class="c-left">
        Vue3Admin 是基于 Vue3、Vuex、VueRouter、Vite、 ElementPlus 、TypeScript、Echart5
        等后台系统解决方案。
      </div>
    </hy-card>
    <hy-card title="技术站"> </hy-card>
  </div>
</template>

<script lang="ts">
import hyCard from '@/base-ui/hy-card/hy-card.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { hyCard },
  name: 'overview',
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
