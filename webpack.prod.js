const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.min.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      name: 'vendor',
    },
  },
});
