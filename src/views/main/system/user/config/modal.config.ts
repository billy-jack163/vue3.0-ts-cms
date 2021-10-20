export const modalConfig: any = {
  itemLayout: {
    padding: '0px 0px'
  },
  propList: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码',
      isHidden: false
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'departement',
      type: 'select',
      label: '部门管理',
      placeholder: '部门',
      options: []
    },
    {
      field: 'role',
      type: 'select',
      label: '角色管理',
      placeholder: '角色',
      options: []
    }
  ],
  colLayout: {
    span: 24
  }
}
