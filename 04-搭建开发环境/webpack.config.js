const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,  // 清空上次打包的文件
  },

  mode: 'development',

  devtool: 'inline-source-map',

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'app.html', // 入口html文件名
      inject: 'body',  // 在哪里引入js文件
    })
  ],

  devServer: {
    static: './dist'
  },
}