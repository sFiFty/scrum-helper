const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: [
			path.join(__dirname, 'main.js')
		]
	},
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Production'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  resolve: {
    alias: {
      Components: path.resolve( __dirname, 'src', 'components'),
      Styles: path.resolve( __dirname, 'src', 'sass'),
      Apps: path.resolve( __dirname, 'src', 'apps'),
      Images: path.resolve( __dirname, 'static', 'images'),
      Helpers: path.resolve( __dirname, 'src', 'helpers'),
    }
  },
	output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
		filename: 'bundle.js'
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
      { test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
}