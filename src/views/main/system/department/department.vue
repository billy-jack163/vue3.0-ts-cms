<template>
  <div class="department">
    <page-content
      :contentFormConfig="contentFormConfig"
      pageName="department"
      @createUser="createUsers"
      @handleEditor="handleEditor"
    ></page-content>
    <dialog-content
      ref="modalRef"
      :defaultValues="defaultValue"
      :modalConfig="modalConfig"
      pageName="department"
    ></dialog-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import contentFormConfig from './config/content.config'
import { modalConfig } from './config/modal.config'
import { usePgaeModal } from '@/hooks/user-modal-page'

import pageContent from '@/components/page-content/page-content.vue'
import dialogContent from '@/base-ui/dialog/dialog.vue'

export default defineComponent({
  name: 'department',
  components: {
    pageContent,
    dialogContent
  },
  setup() {
    const [modalRef, defaultValue, createUsers, handleEditor] = usePgaeModal()
    return {
      contentFormConfig,
      modalConfig,
      createUsers,
      handleEditor,
      defaultValue,
      modalRef
    }
  }
})
</script>

<style scoped></style>
