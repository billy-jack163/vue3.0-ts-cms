<template>
  <div class="goods">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-cotent pageName="goods" :contentFormConfig="contentFormConfig"></page-cotent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageCotent from '@/components/page-content/page-content.vue'
import { searchFormConfig } from './config/searchFormConfig'
import contentFormConfig from './config/content.config'
import PageSearch from '@/components/page-search/page-search.vue'
export default defineComponent({
  name: 'goods',
  components: {
    pageCotent,
    PageSearch
  },
  setup() {
    return {
      contentFormConfig,
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>
