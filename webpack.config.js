var path = require('path')

var EXAMPLES_DIR = path.resolve(__dirname, 'docs')

module.exports = {
  entry: EXAMPLES_DIR + '/main.js',
  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: 'docs/__build__',
    publicPath: '/__build__/'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  }
}
