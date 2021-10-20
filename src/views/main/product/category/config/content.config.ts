const contentFormConfig = {
  title: '用户列表',
  // 对el-table-column序列号的控制
  isShowNumber: true,
  // 是否展示全选反选
  isShowSelection: true,
  showFooter: false,
  // table表数据
  propList: [
    { prop: 'name', label: '商品名', minWidth: '100' },
    { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      slotName: 'button'
    }
  ]
}
export default contentFormConfig
