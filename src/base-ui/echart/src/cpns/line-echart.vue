<template>
  <div class="line-echart">
    <base-echarts :option="option"></base-echarts>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import baseEcharts from '@/base-ui/echart/src/base-echarts.vue'
export default defineComponent({
  components: {
    baseEcharts
  },
  props: {
    numCount: {
      type: Array
    },
    arrName: {
      type: Array
    }
  },
  setup(props) {
    const option = computed(() => {
      return {
        legend: {
          data: ['商品销量']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: props.arrName
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '商品销量',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: props.numCount
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
