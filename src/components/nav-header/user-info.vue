<template>
  <div class="user-info">
    <el-dropdown class="dropdown">
      <span class="el-dropdown-link">
        <el-avatar src="https://pic.imgdb.cn/item/616e81e12ab3f51d91bbb828.jpg"></el-avatar>
        <span class="avatar-name">余顺朋</span>
      </span>
      <!-- dropdown -->
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>账号设置</el-dropdown-item>
          <el-dropdown-item>切换账号</el-dropdown-item>
          <el-dropdown-item @click="exitLogin">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import loginCache from '@/untils/login-cache'
export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => {
      return store.state.login.userInfo.name
    })
    const router = useRouter()
    // 退出登录操作
    const exitLogin = () => {
      loginCache.deleteCache('name')
      loginCache.deleteCache('password')
      loginCache.deleteCache('token')
      router.replace('/login')
    }
    return {
      name,
      exitLogin
    }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  .avatar-name {
    padding: 10px;
  }
}
</style>
