module.exports = {
  // 解决跨域问题
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        // @对应的是一个src路径
        components: '@/components',
        content: 'components/content',
        common: 'components/common',
        assets: '@/assets',
        network: '@/network',
        views: '@/views',
        untils: '@/untils'
      }
    }
  }
}
