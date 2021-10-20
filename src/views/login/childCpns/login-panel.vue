<template>
  <div class="loginPanel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <!-- name的作用是和currentTab相互作用，可以做到是手机登录还是密码登录相关监听 -->
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号管理</span>
        </template>
        <login-acount ref="getAccount" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone ref="getPhone" />
      </el-tab-pane>
    </el-tabs>
    <div class="login-control">
      <el-checkbox label="记住密码" v-model="isKeepPassword"></el-checkbox>
      <el-link :underline="false">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick">立即登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import loginAcount from './login-account.vue'
import loginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    loginAcount,
    loginPhone
  },
  setup() {
    const currentTab = ref<string>('account')
    const isKeepPassword = ref(true)
    // loginAcount表示相关组件类型
    const getPhone = ref<InstanceType<typeof loginPhone>>()
    const getAccount = ref<InstanceType<typeof loginAcount>>()
    // login-panel只负责触发该事件真正相关逻辑在自身组件中完成，减少耦合性
    const handleLoginClick = () => {
      // ref调用必须.value进行拿值
      if (currentTab.value === 'account') {
        getAccount.value?.loginAction(isKeepPassword.value)
      } else {
        getPhone.value?.loginPhone()
      }
    }
    return {
      handleLoginClick,
      isKeepPassword,
      getAccount,
      currentTab,
      getPhone
    }
  }
})
</script>

<style scoped lang="less">
.loginPanel {
  margin-bottom: 120px;
  width: 340px;
  .title {
    display: flex;
    justify-content: center;
  }
  .login-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
