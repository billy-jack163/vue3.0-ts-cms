<template>
  <div>
    <el-form>
      <el-form-item label="手机号" prop="num">
        <el-input placeholder="请输入手机号" v-model="phone.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          placeholder="请输入验证码"
          v-model="phone.verifyCode"
          class="inputVerifyCode"
        ></el-input>
        <el-button type="primary" class="get-btn">获取验证码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const phone = reactive({
      phoneNumber: '',
      verifyCode: ''
    })
    const store = useStore()
    const loginPhone = () => {
      store.dispatch('login/loginPhone', { ...phone })
    }
    return {
      phone,
      loginPhone
    }
  }
})
</script>

<style scoped lang="less">
.inputVerifyCode {
  width: 60%;
}
.get-btn {
  margin-left: 8px;
}
</style>
