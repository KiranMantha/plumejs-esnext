const { merge } = require('webpack-merge');
const baseConfig = require('./base.js');

module.exports = merge(baseConfig, {
  devtool: false,
  mode: 'production',
  output: {
    publicPath: './'
  }
});
