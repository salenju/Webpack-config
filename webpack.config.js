const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // 入口配置
  entry: './src/index.js',

  // 出口配置
  output: {
    filename: 'build.[hash:8].js', // 在每次打包文件中加入hash值确保文件名不重复,例如:pageA.8f735b91.js
    path: path.resolve('./build'),	// 输出资源的目录（系统绝对路径）
    publicPath: 'https://cdn.antfin.com' // 当html和静态资源(js/css等)不在同一个地方时需要配置publicPath
  },

  // 开发模式配置
  mode: 'development',

  // 模块配置
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        exclude: path.resolve(process.cwd(), './node_modules'),   // 过滤node_modules目录
        include: path.resolve(process.cwd(), './src')   // 只匹配src目录
      },
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader', // 将css以<styled>标签插入dom
          'css-loader',  // 解释css文件中的@import和url()
          'less-loader',
          'postcss-loader',
        ]
      },
    ]
  },

  // 解析配置
  resolve: {
    alias: {
      'Src': path.resolve(process.cwd(), './src')
    }
  },

  // 插件配置
  plugins: [
    new CleanWebpackPlugin(), // 每次打包前先清空./build文件下的所有文件
    new HtmlWebpackPlugin({
      filename: 'index.html',  // 打包后的html文件名称
      template: './src/index.html',  // 将./src/index.html作为模板html打包到build下
      title: 'Webpack 配置指南01',   // 更改html<title>
      hash: true,
      minify: {
        removeAttributeQuotes: true,   // 删除代码中的双引号
        collapseWhitespace: true,      // 删除代码间的空白
      }
    }),
  ],

  // 配置本地开发服务
  devServer: {
    contentBase: path.resolve('./build'),  // 静态文件根目录
    port: 3000,
    compress: true,  // 服务压缩
    open: true   // 启动服务后自动打开浏览器
  }
}