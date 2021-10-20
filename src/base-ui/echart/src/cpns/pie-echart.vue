<template>
  <div class="pie-echart">
    <base-echarts :option="option"></base-echarts>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watchEffect } from 'vue'
import baseEcharts from './../base-echarts.vue'

export default defineComponent({
  props: {
    pieData: {
      type: Array,
      default: () => []
    }
  },
  components: {
    baseEcharts
  },
  setup(props) {
    const option = computed(() => {
      return {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: props.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
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
