var path = require('path')

var EXAMPLES_DIR = path.resolve(__dirname, 'docs')

module.exports = {
  entry: EXAMPLES_DIR + '/main.js',
  output: {
    filename: '[name].built.js',
    chunkFilename: '[id].chunk.built.js',
    path: 'docs',
    publicPath: ''
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
