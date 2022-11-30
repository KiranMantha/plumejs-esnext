const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

const appconstants = {
  publicPath: '/',
  root: '../',
  sourceDir: '../src',
  buildDir: '../dist'
};

module.exports = {
  entry: {
    main: './src/index.js',
    vendor: './src/vendor.js'
  },
  output: {
    path: path.resolve(__dirname, appconstants.buildDir),
    publicPath: appconstants.publicPath,
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    extensions: ['.js', '.scss', '.css']
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: path.resolve(__dirname, './css-to-string.loader.js')
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: false
      }
    })
    // new PreloadWebpackPlugin({
    //   rel: 'preload',
    //   as: 'script',
    // }),
  ]
};
