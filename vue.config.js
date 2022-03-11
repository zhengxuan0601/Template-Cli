module.exports = {
  runtimeCompiler: false,
  // 只在h5环境下代理可用
  devServer: {
    open: false,
    port: 8000,
    proxy: {
      '/feedbook': {
        ws: false,
        target: 'http://www.zdxblog.cn/feedbook',
        changeOrigin: true,
        pathRewrite: {
          '^/feedbook/': ''
        }
      }
    }
  }
}
