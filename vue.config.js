module.exports = {
  publicPath: '/',
  lintOnSave: false,
  devServer: {
    open: true,
    port: 8080,
    https: false,
    proxy: {
      '/feedbook': {
        target: 'http://localhost:3000/feedbook',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/feedbook': ''
        }
      }
    }
  }
}
