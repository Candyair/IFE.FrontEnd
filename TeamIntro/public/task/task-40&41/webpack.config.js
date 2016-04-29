var path = require('path');
var APP_PATH = path.resolve(__dirname, 'app');

var config = {
  context: APP_PATH,
  entry: {
    main: ['babel-polyfill', './main.js'],
    html: './index.html'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'file?name=[name].[ext]'
    },{
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    },{
      test: /\.jsx?$/,
      loader: 'babel',
      include: APP_PATH
    }, {
      test: /\.less$/,
      loaders: ['style', 'css', 'autoprefixer', 'less'],
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.less']
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  }
};

module.exports = config;