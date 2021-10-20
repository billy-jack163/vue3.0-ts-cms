import * as echart from 'echarts'
// 对echart进行封装操作，减少耦合性
import geoChina from '@/base-ui/echart/data/data.json'
echart.registerMap('china', geoChina)
export default function (el: HTMLElement) {
  const echartInstance = echart.init(el)
  const setOptions = (options: echart.EChartsOption) => {
    echartInstance.setOption(options)
  }
  // 对窗口变化进行监听
  // echartInstance.resize()的作用是随着窗口的改变而改变
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
  return {
    echartInstance,
    setOptions
  }
}
