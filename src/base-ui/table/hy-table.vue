<template>
  <div class="hy-table">
    <div class="header">
      <slot name="header">
        <slot name="title"></slot>
        <slot name="handleUser"></slot>
      </slot>
    </div>
    <el-table :data="userList" style="width: 100%" border v-bind="childrenProps">
      <el-table-column
        type="selection"
        align="center"
        width="60"
        v-if="isShowNumber"
      ></el-table-column>
      <el-table-column
        type="index"
        align="center"
        label="序号"
        width="80"
        v-if="isShowSelection"
      ></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <!--  :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth" 可直接使用v-bind="item"来替代-->
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <!-- 使用作用域插槽 -->
          <!-- 可通过scope.row来对父组件传输过来的内容做操作 -->
          <!-- :row="scope.row"是对作用域插槽值进行获取 -->
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <!-- layout="total, sizes, prev, pager, next, jumper"表示对元素进行排序 -->
        <el-pagination
          v-if="showFooter"
          class="footerPage"
          :page-sizes="[10, 20, 30]"
          :page-size="modelValue.pageSize"
          :current-page="modelValue.currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    userList: {
      type: Array,
      required: true
    },
    propList: {
      type: Array,
      required: true
    },
    isShowNumber: {
      type: Boolean,
      default: false
    },
    isShowSelection: {
      type: Boolean,
      default: false
    },
    dataCount: {
      type: Number
    },
    modelValue: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    // 多级菜单的使用
    childrenProps: {
      type: Object
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // pageSize
    const handleSizeChange = (pageSize: any) => {
      emit('update:modelValue', { ...props.modelValue, pageSize })
    }
    // currentPage
    const handleCurrentChange = (currentPage: any) => {
      emit('update:modelValue', { ...props.modelValue, currentPage })
    }
    return {
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.hy-table {
  .header {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-content: center;
    height: 45px;
    padding: 0 10px;
  }
  .footer {
    display: flex;
    justify-content: right;
    font-size: 18px;
    padding: 10px 5px 10px 0;
  }
}
</style>
