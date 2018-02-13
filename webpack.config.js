const path = require('path');
const webpack = require('webpack');
module.exports = {
	entry: {
		app: [
			path.join(__dirname, 'assets', 'main.js')
		]
	},
	output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
		filename: 'bundle.js'
  },
  resolve: {
    alias: {
      Components: path.resolve( __dirname, 'assets', 'components'),
      Containers: path.resolve( __dirname, 'assets', 'containers'),
      Styles: path.resolve( __dirname, 'assets', 'sass'),
      Images: path.resolve( __dirname, 'assets', 'images')
    }
  },
  devtool: "source-map",
  watch: true,
  devServer: {
    inline: true,
    port: 3333
  },
  module: {
    rules: [
      {
          test: /\.js?$/,
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
              'sass-loader'
          ]
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  plugins: [
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
      })
  ]
}