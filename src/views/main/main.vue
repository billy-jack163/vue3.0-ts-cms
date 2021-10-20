<template>
  <div id="main">
    <el-container class="contain">
      <el-aside :width="isCollapse ? '60px' : '210px'" class="contain-aside">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container class="in-contain">
        <el-header class="contain-header">
          <transition>
            <nav-header @changeFolds="changeFold"></nav-header>
          </transition>
        </el-header>
        <el-main class="contain-main">
          <!-- 拥有name属性router-view才能在正确的位置生效 -->
          <router-view class="cage"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import navMenu from '@/components/nav-menu/nav-menu.vue'
import navHeader from '@/components/nav-header/nav-header.vue'
export default defineComponent({
  components: {
    navMenu,
    navHeader
  },
  setup() {
    let isCollapse = ref<any>(false)
    const changeFold = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    const afterEnter = () => {
      console.log(1111)
    }
    return {
      changeFold,
      isCollapse,
      afterEnter
    }
  }
})
</script>

<style scoped lang="less">
#main {
  height: 100%;
  .contain {
    height: 100%;
    .contain-aside {
      background-color: #ccc;
    }
    .in-contain {
      .contain-header {
        display: flex;
        align-items: center;
        background-color: #fdfdfd;
        box-shadow: 0px 0px 5px #888888;
      }
      .contain-main {
        width: 100%;
        height: 100%;
        background: #f5f5f5;
      }
    }
  }
}
</style>
