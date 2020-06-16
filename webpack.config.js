const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /index\.html$/,
        loader: 'raw'
      },
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
        loader: 'babel-loader',
      },
      {
        test: /\.pug$/,
        exclude: /node_modules/,
        loader: 'pug-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "src/index.pug"),
      filename: path.resolve(__dirname, "dist/index.html"),
    }),
    new MiniCssExtractPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist/"),
    open: true
  }
};
