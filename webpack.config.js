const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: '[name].[contentHash].css',
    disable: process.env.NODE_ENV === 'development'
});

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'build.[hash].js',
    path: `${__dirname}/dist`,
    publicPath: '/dist/',
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{ loader: "css-loader" }, { loader: "sass-loader" }],
          fallback: "style-loader"
        }),
      },
    ]
  },
  plugins: [ extractSass ],
  devServer: {
    port: 9091
  }
}
