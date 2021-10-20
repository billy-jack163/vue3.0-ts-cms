<template>
  <div class="menu">
    <page-content :contentFormConfig="contentFormConfig" pageName="menu"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import contentFormConfig from './config/content.config'
import pageContent from '@/components/page-content/page-content.vue'
export default defineComponent({
  name: 'menus',
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
