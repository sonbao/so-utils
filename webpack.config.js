module.exports = {
  entry: './index.js',
  output: {
    filename: 'index.min.js',
    path: __dirname + '/lib',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
