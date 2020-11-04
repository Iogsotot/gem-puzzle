const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin = require('clean-webpack-plugin')}
const plugins = () => {
  const base = [
    new HTMLWebpackPlugin({
      template: 'index.html',
      title: 'AnyTitle'
    })
  ]
  return base;
}



module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: plugins(),
  context: path.resolve(__dirname, 'src'),
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader',
            'css-loader']
    }
  ]


}

