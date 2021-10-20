<template>
  <div class="rose-echart">
    <base-echarts :option="option"></base-echarts>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import baseEcharts from '../base-echarts.vue'
export default defineComponent({
  components: {
    baseEcharts
  },
  props: {
    roseData: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const option: any = computed(() => {
      return {
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [50, 150],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: props.roseData
          }
        ]
      }
    })
    return {
      option
    }
  }
})
</script>

<style scoped></style>
