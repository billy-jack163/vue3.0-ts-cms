<template>
  <div class="base-echart">
    <div ref="baseRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect, onMounted, ref } from 'vue'
import useEchart from '../hooks/echart'

export default defineComponent({
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '600px'
    },
    option: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const baseRef = ref<HTMLElement>()
    onMounted(() => {
      // 实现图形可视化
      const { setOptions } = useEchart(baseRef.value!)
      watchEffect(() => {
        setOptions(props.option)
      })
    })
    return {
      baseRef
    }
  }
})
</script>

<style scoped></style>
