<template>
  <div class="nav-header">
    <div class="logo">
      <i
        :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
        class="menu-fold"
        @click="changeFold"
      ></i>
    </div>
    <div class="header-info">
      <!-- 面包屑 -->
      <breadcrumb :breadcrumb="breadcrumb"></breadcrumb>
      <!-- 个人信息栏 -->
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
// 用户信息的展示
import userInfo from './user-info.vue'
// 面包屑的制作
import breadcrumb from './breadcrumb.vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { routeMaptoBreadcrumb } from '@/untils/map-menus'

export default defineComponent({
  emits: ['changeFolds'],
  components: {
    userInfo,
    breadcrumb
  },
  setup(props, { emit }) {
    const store = useStore()
    const route = useRoute()
    // 使用computed属性是为了达到和watch一样的效果，用来监听事件的变化
    const breadcrumb = computed(() => {
      const menu = store.state.login.menu
      const currentPath = route.path
      return routeMaptoBreadcrumb(menu, currentPath)
    })

    const isFold = ref(false)
    //折叠层的实现
    const changeFold = () => {
      isFold.value = !isFold.value
      emit('changeFolds', isFold.value)
    }
    return {
      changeFold,
      isFold,
      breadcrumb
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  width: 100%;
  display: flex;
  align-items: center;
  .logo {
    padding-right: 15px;
    .menu-fold {
      font-size: 30px;
      cursor: pointer;
    }
  }
  .header-info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
