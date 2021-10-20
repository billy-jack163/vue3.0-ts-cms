<template>
  <div class="map-echart">
    <base-echarts :option="option"></base-echarts>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import baseEcharts from './../base-echarts.vue'

import convertData from '@/base-ui/echart/until/covertData'
export default defineComponent({
  props: {
    addressGoodsSale: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    baseEcharts
  },
  setup(props) {
    const option: any = computed(() => {
      return {
        backgroundColor: '#fff',
        title: {
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params: any) {
            return params.name + ' : ' + params.value[2]
          }
        },
        legend: {
          orient: 'vertical',
          right: 20,
          top: 10,
          textStyle: {
            color: '#fff'
          }
        },
        visualMap: {
          min: 0,
          max: 200,
          left: 20,
          bottom: 20,
          calculable: true,
          text: ['高', '低'],
          inRange: {
            color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', '#01f9fe']
          },
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          map: 'china',
          roam: 'scale',
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#2091e3',
              borderColor: 'rgb(9, 54, 95)'
            },
            emphasis: {
              areaColor: 'rgb(10, 105, 187)'
            }
          }
        },
        series: [
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(props.addressGoodsSale),
            symbolSize: 12,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: '#fff',
                borderWidth: 1
              }
            }
          },
          {
            type: 'map',
            map: 'china',
            geoIndex: 0,
            aspectScale: 0.75,
            tooltip: {
              show: false
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
