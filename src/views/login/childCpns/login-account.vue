<template>
  <div class="loginAccount">
    <el-form :rules="rules" :model="account" ref="getForm">
      <el-form-item label="账号" prop="name">
        <el-input placeholder="请输入账号" v-model="account.name" autofocus></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <!-- show-password类型为password -->
        <el-input placeholder="请输入密码" v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import localCache from './../../../untils/login-cache'
import { rules } from './config/account-config'
import { useStore } from 'vuex'
// 为了定义组件类型
import { ElForm } from 'element-plus'
export default defineComponent({
  setup() {
    const account = reactive({
      name: '',
      password: ''
    })
    // usestore的使用
    const store = useStore()
    const getForm = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isKeepPassword: boolean) => {
      //Elform中的validate会进行回调，然后对相关rules进行判断
      getForm.value?.validate((valid) => {
        if (valid) {
          store.dispatch('login/LoginAccount', { ...account })
          // 根据isKeepPassword对密码进行操作
          if (isKeepPassword) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 外层的else
        } else {
          console.log('未真正执行代码')
        }
      })
    }
    // module化的规矩

    return {
      account,
      rules,
      loginAction,
      getForm
    }
  }
})
</script>

<style scoped lang="less"></style>
