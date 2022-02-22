const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,  // 清空上次打包的文件
    assetModuleFilename: 'images/[contenthash][ext]', // 静态文件保存地址+名称
  },

  mode: 'development',

  devtool: 'inline-source-map',

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // 入口html文件模板
      filename: 'app.html', // 入口html文件名
      inject: 'body',  // 在哪里引入js文件
    }),

    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash].css'
    }),
  ],

  devServer: {
    static: './dist'
  },

  module: {
    rules: [
      {
        test: /\.png$/,
        type: "asset/resource", // 资源文件
        generator: { // 优先级高于output中的assetModuleFilename配置
          filename: 'images/[contenthash][ext]',
        },
      },
      {
        test: /\.svg$/,
        type: 'asset/inline',  // base64
      },
      {
        test: /\.txt$/,
        type: 'asset/source',
      },
      {
        test: /\.jpg$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 * 1024, // 根据文件大小范围来打包方式: < 4MB —— inline； > 4MB —— resource
          }
        }
      },
      {
        test: /\.(css|less)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'], // 从右往左执行
      },
    ]
  }
}