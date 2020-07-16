const path = require('path')

module.exports = {
  lintOnSave: process.env.NODE_ENV === 'development',
  outputDir: './dist',
  publicPath: process.env.NODE_ENV === 'development' ? './' : process.env.VUE_APP_PAGES === 'gitee' ? '/service-platform/' : './',
  productionSourceMap: process.env.NODE_ENV === 'development',
  devServer: {
    /* 本地*/
    proxy: 'http://localhost:7050/omsp_app_service'
    /* 测试环境*/
    // proxy: 'http://192.168.17.159:7050/omsp_app_service'
    /* 外网*/
    // proxy: 'http://118.112.188.108:9289/omsp_app_service'
    // proxy: 'http://192.168.17.157:8050/omsp_app_service'
    // proxy: 'http://110.185.166.162:9019/omsp_app_service'
  },

  configureWebpack: { // webpack 配置
    devtool: 'source-map',

    // 配置路径别名,srcPath/assets是src/assets目录下的文件，以此类推；与直接写相对路径不影响
    resolve: {
      alias: {
        srcPath: path.resolve(__dirname, 'src/'),
        publicPath: path.resolve(__dirname, 'public/')
      }
    }

    // output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.js】
    //     filename: `js/[name].${process.env.NODE_ENV}.js`,
    //     chunkFilename: `js/[name]${process.env.NODE_ENV}.js`
    // },
    // 修改打包后css文件名
    // plugins: [
    //   new MiniCssExtractPlugin({
    //     filename: `css/[name].${process.env.NODE_ENV}.css`,
    //     // chunkFilename: `css/[name].${conf.version}.css`
    //   })
    // ]
  },

  // 定制化主题
  css: {
    loaderOptions: {
      less: {
        // 修改vant主题
        modifyVars: {
          'hack': `true; @import "${path.join(__dirname, './src/assets/css/OmspTheme.less')}";`
        }
        // 引入全局less
        // data:`@import "${path.join(__dirname, './src/assets/css/OmspTheme2.less')}"`
      }
    }
  }
}
