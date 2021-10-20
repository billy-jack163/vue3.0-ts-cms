<template>
  <div class="category">
    <page-content :contentFormConfig="contentFormConfig" pageName="category"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import contentFormConfig from './config/content.config'

import pageContent from '@/components/page-content/page-content.vue'
export default defineComponent({
  name: 'category',
  components: {
    pageContent
  },
  setup() {
    return {
      contentFormConfig
    }
  }
})
</script>

<style scoped></style>
