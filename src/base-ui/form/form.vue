<template>
  <div class="form">
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in propList" :key="item.prop">
          <el-col v-bind="colLayout">
            <!-- 遍历多选框 -->
            <el-form-item :label="item.label" :style="itemLayout" v-if="!item.isHidden">
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    propList: {
      type: Array
    },
    labelWidth: {
      type: String,
      default: '108px'
    },
    itemLayout: {
      type: Object,
      padding: '10px 40px'
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 8, //窗口1920px
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 监听page-search输入值的改变
    // $event在input元素中可以直接获取输入框里面的值
    const handleValueChange = (value: any, filed: string) => {
      emit('update:modelValue', { ...props.modelValue, [filed]: value })
    }
    return {
      handleValueChange
    }
  }
})
</script>

<style scoped lang="less">
.form {
  padding-top: 22px;
  width: 100%;
  height: 100%;
  .el-form-item {
    padding: 5px 30px;
    .form-region {
      width: 450px !important;
    }
  }
}
</style>
