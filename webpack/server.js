const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./base.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    static: path.join(__dirname, '../dist'),
    compress: true,
    hot: true,
    port: 3001,
    open: true,
    historyApiFallback: true
  }
});
