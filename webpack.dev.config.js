module.exports = {
  entry: './example/index.js',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
    publicPath: '/dist/',
  },
  devtool: 'eval',
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      },
    ]
  },
  devServer: {
    port: 9091,
    host: '0.0.0.0',
    disableHostCheck: true
  }
}
