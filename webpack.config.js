const path = require('path');

module.exports = {
  mode: "production",
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'yolanda-ui.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['js']
  }
};