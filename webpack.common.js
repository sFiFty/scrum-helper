const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
require('babel-polyfill');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.join(__dirname, 'main.js'),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
  ],
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src', 'components'),
      Styles: path.resolve(__dirname, 'src', 'sass'),
      Screens: path.resolve(__dirname, 'src', 'screens'),
      Images: path.resolve(__dirname, 'static', 'images'),
      Helpers: path.resolve(__dirname, 'src', 'helpers'),
      Containers: path.resolve(__dirname, 'src', 'containers'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js|jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                'transform-decorators-legacy',
                'transform-class-properties',
              ],
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
    ],
  },
};
