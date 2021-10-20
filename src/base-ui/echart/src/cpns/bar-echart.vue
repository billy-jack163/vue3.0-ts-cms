<template>
  <div class="bar-echart">
    <base-echarts :option="option"></base-echarts>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import baseEcharts from './../base-echarts.vue'
import * as echarts from 'echarts'
export default defineComponent({
  props: {
    goodFavor: {
      type: Array,
      default: () => []
    },
    goodsName: {
      type: Array,
      default: () => []
    }
  },
  components: {
    baseEcharts
  },
  setup(props) {
    const option: any = computed(() => {
      return {
        xAxis: {
          data: props.goodsName,
          axisLabel: {
            inside: true,
            color: '#fff'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999'
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: props.goodFavor
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
