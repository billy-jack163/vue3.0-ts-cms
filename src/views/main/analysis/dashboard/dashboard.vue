<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="8">
        <hy-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </hy-card>
      </el-col>
      <el-col :span="8">
        <hy-card title="不同城市商品销量">
          <map-echart :addressGoodsSale="addressGoodsSale"></map-echart>
        </hy-card>
      </el-col>
      <el-col :span="8">
        <hy-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </hy-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="picture-bottom">
      <el-col :span="12">
        <hy-card title="分类商品销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </hy-card>
      </el-col>
      <el-col :span="12">
        <hy-card title="分类商品收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </hy-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import roseEchart from '@/base-ui/echart/src/cpns/rose-echart.vue'
import mapEchart from '@/base-ui/echart/src/cpns/map-echart.vue'
import pieEchart from '@/base-ui/echart/src/cpns/pie-echart.vue'
import lineEchart from '@/base-ui/echart/src/cpns/line-echart.vue'
import barEchart from '@/base-ui/echart/src/cpns/bar-echart.vue'
import hyCard from '@/base-ui/hy-card/hy-card.vue'
export default defineComponent({
  name: 'dashboard',
  components: {
    hyCard,
    roseEchart,
    pieEchart,
    lineEchart,
    barEchart,
    mapEchart
  },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')
    // 商品数量
    interface IGoodCount {
      id?: number
      name?: string
      goodsCount?: number
    }
    // 商品数量
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: IGoodCount) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    console.log(categoryGoodsCount)
    // 商品销量
    const categoryGoodsSale = computed(() => {
      const arrName: string[] = []
      const numCount: number[] = []
      store.state.dashboard.categoryGoodsSale.forEach((item: any) => {
        arrName.push(item.name)
        numCount.push(item.goodsCount)
      })
      return { arrName, numCount }
    })
    // 分类商品收藏
    const categoryGoodsFavor = computed(() => {
      const goodsName: string[] = []
      const goodFavor: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        goodsName.push(item.name)
        goodFavor.push(item.goodsFavor)
      }
      return { goodsName, goodFavor }
    })
    // 不同城市产品销量
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })
    console.log(addressGoodsSale)
    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped lang="less">
.dashboard {
  .picture-bottom {
    margin-top: 25px;
  }
}
</style>
