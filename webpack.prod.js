const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.common.js')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(common, {
  mode: "production",
	output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.min.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      name: "vendor",
    }
  }
})