const contentFormConfig = {
  title: '商品列表',
  // 对el-table-column序列号的控制
  isShowNumber: true,
  // 是否展示全选反选
  isShowSelection: true,
  // table表数据
  propList: [
    { prop: 'desc', label: '简介', minWidth: '100' },
    { prop: 'favorCount', label: '点赞数', minWidth: '100' },
    { prop: 'address', label: '地址', minWidth: '100' },
    { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
    {
      props: 'imgUrl',
      label: '图片',
      minWidth: '80',
      slotName: 'image'
    },
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
