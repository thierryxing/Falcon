// https://cli.vuejs.org/zh/config/
const webpack = require('webpack')

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
      alias: {
        // node_modules/@vue/cli-service/lib/config/base.js 中已经配好的 @ 路径
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
        'jquery': 'jquery/dist/jquery.slim.js'
      }
    },
    devServer: {
      proxy: {
        '/api/v1': {
          changeOrigin: true,
          secure: false,
          // target: 'http://localhost:3000'
          target: 'https://www.easy-mock.com/mock/5b18ccb77dddfa3903693dba'
        },
        '/sidekiq': {
          changeOrigin: true,
          secure: false,
          target: 'http://localhost:3000'
        }
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        jQuery: 'jquery',
        Popper: ['popper.js', 'default'],
        'Util': 'exports-loader?Util!bootstrap/js/dist/util'
      })
    ]
  }
}
