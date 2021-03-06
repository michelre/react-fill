const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: 'react-fill.css',
    disable: process.env.NODE_ENV === 'development'
});

module.exports = {
  entry: './src/ReactFill.js',
  output: {
    filename: 'react-fill.js',
    path: `${__dirname}/dist`,
    publicPath: '/dist/',
    library: 'ReactFill',
    libraryTarget: 'umd'
  },
  externals: [
    'react',
    'react-dom',
    /^voca\/.+$/,
    'ramda'
  ],
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
