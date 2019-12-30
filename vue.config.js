module.exports = {
    devServer: {
      open: true,
      host: 'localhost',
      port: 8081,
      https: false,
      hotOnly: false,
      proxy: {
        // 配置跨域
        '/api': {
          target: 'http://192.168.1.48:9000',
          ws: true,
          changOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      },
      before: app => {}
    }
  };