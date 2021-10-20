import axios from 'axios'
// // 基础选项的配置
// axios.defaults.baseURL = '/api'
// axios.defaults.timeout = 3000
// // // // 简单的get请求
// axios
//   .post('/login', {
//     name: 'coderwhy',
//     password: '123456'
//   })
//   .then(({ data }) => {
//     console.log(data)
//   })

// // 2、get请求，并且传入参数
// // axios
// //   .get('/image', {
// //     params: {
// //       name: 'ysp'
// //     }
// //   })
// //   .then(({ data }) => {
// //     console.log(data)
// //   })
// axios
//   .all([
//     axios.get('/image', {
//       params: {
//         name: 'ysp'
//       }
//     }),
//     axios.post('/cage')
//   ])
//   .then((res) => {
//     console.log(res[0].data)
//     console.log(res[1].data)
//   })
// //   拦截器的使用，请求时对数据进行拦截
// axios.interceptors.request.use(
//   (config) => {
//     console.log('请求成功拦截')
//     return config
//   },
//   (err) => {
//     console.log('请求发送失败')
//     return err
//   }
// )
// // 数据响应成功后对数据进行拦截
// axios.interceptors.response.use(
//   (res: any) => {
//     console.log('响应成功的拦截')
//     return res
//   },
//   (err: any) => {
//     console.log('服务器响应失败')
//     return err
//   }
// )
