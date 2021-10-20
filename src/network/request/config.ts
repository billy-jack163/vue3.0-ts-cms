// 根据process.env.NODE_ENV区分
// 开发环境：developmeent
// 生成环境：production
// 测试环境：test
let BASE_URL = ''
const TIME_OUT = 10000
if (process.env.NODE_ENV === 'developmeent') {
  BASE_URL = '/api'
  console.log('developmeent')
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://coderwhy.org/prod'
  console.log('production')
} else {
  BASE_URL = '/api'
  // console.log('test')
}
export { BASE_URL, TIME_OUT }
