<template>
  <div class="dialog">
    <el-dialog v-model="createUser" title="新建用户" width="30%" center destroy-on-close>
      <!-- v-model="modal" -->
      <form-content v-bind="modalConfig" v-model="formData"></form-content>
      <slot name="tree"></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createUser = false">取消</el-button>
          <el-button type="primary" @click="handleCreateUser">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import formContent from '@/base-ui/form/form.vue'

export default defineComponent({
  components: {
    formContent
  },
  props: {
    modalConfig: {
      type: Object
    },
    // 列表内容的值
    defaultValues: {
      type: Object,
      default: () => ({})
    },
    // 将role组件里面的数据传入到dialog组件
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      requeire: true
    }
  },
  setup(props) {
    let createUser = ref(false)
    const formData = ref<any>({})
    const store = useStore()
    // 监听props.defaultValue
    watch(
      () => {
        return props.defaultValues
      },
      (newValue: any) => {
        for (const item of props.modalConfig?.propList) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )
    // 处理新建和编辑事件,通过vuex对事件进行管理
    const handleCreateUser = () => {
      createUser.value = false
      if (Object.keys(props.defaultValues).length > 0) {
        // 处理编辑
        store.dispatch('system/getEditorUser', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo },
          id: props.defaultValues.id
        })
      } else {
        // 处理新建
        store.dispatch('system/getNewsCreateUser', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    // watchEffect(() => {
    //   for (const item of props.modalConfig?.propList) {
    //     formData.value[`${item.field}`] = props.defaultValues[`${item.field}`]
    //   }
    // })
    return {
      formData,
      createUser,
      handleCreateUser
    }
  }
})
</script>

<style scoped lang="less"></style>
