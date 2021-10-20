<template>
  <div id="nav-menu">
    <div class="logo">
      <img src="~assets/img/logo.svg" alt="" />
      <span class="title" v-if="!collapse">VUE3.0+TS</span>
    </div>
    <transition>
      <el-menu
        class="elMenu"
        :default-active="defaultActive"
        background-color="#001529"
        text-color="#b7bdc3"
        :collapse="collapse"
        active-text-color="#0a60bd"
      >
        <template v-for="item in userMenu" :key="item.id">
          <!-- 二级菜单 -->
          <template v-if="item.type === 1">
            <!-- 二级菜单可以展开的标题 -->
            <!-- 因为index要求的是字符串类型，因此拼接一个空的字符串 -->
            <el-submenu :index="item.id + ''">
              <!-- slot封装好了 -->
              <template #title>
                <i v-if="item.icon" :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </template>
              <!-- 遍历里面的item -->
              <template v-for="subitem in item.children" :key="subitem.id" class="is-active">
                <el-menu-item :index="subitem.id + ''" @click="handMenuRoute(subitem)">
                  <!-- 图标 -->
                  <i v-if="subitem.icon" :class="subitem.icon"></i>
                  <span>{{ subitem.name }}</span>
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
          <!-- 假如只有一级菜单 -->
          <template v-else-if="item.type === 2">
            <el-menu-item :index="item.id + ''">
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
// 解决刷新后菜单栏和相关页面不对应的问题
import { routeMaptoPath } from '@/untils/map-menus'
export default defineComponent({
  props: ['collapse'],
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    // 获取菜单栏信息
    const userMenu = computed(() => {
      return store.state.login.menu
    })
    // 当前路径
    const currentPath = route.path
    const menu = routeMaptoPath(userMenu.value, currentPath)

    // 动态传入默认的路径值
    const defaultActive = ref(menu.id + '')

    // 对菜单栏路由和vue-router定义的组件一一对应起来
    const handMenuRoute = (item: any) => {
      router.push({
        path: item.url
      })
    }
    return {
      userMenu,
      handMenuRoute,
      defaultActive
    }
  }
})
</script>

<style scoped lang="less">
#nav-menu {
  height: 100%;
  background-color: #001529;
  // .ysp-enter-active {
  //   animation: heartBeat 1s;
  // }
  // .ysp-leave-active {
  //   animation: heartBeat 1s reverse;
  // }
  .logo {
    display: flex;
    align-items: center;
    // 项目位于容器的开头
    justify-content: flex-start;
    padding: 12px 10px 8px 10px;
    height: 28px;
    img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .elMenu {
    border-right: 0;
    .is-active {
      background-color: #105fb0 !important;
      color: #fff !important;
    }
  }
}
</style>
