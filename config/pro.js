// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')

// custom config
const D = __dirname
const compDir = `${D}/../src/components`
const pubDir = `${D}/../public`

module.exports = {
  // mode
  mode: 'production',

  // IO
  entry: {
    Main: `${compDir}/Main`
  },
  output: {
    filename: "bundle.js",
    path: `${pubDir}/js`
  },
  resolve: {
    extensions:[".js",".jsx"]
  },

  // loaders
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        test: /\.jsx$/,
        use: 'babel-loader'
       }
    ]
  },

  // plugins and optimizations
  plugins: [new HtmlWebpackPlugin({
    title: 'ChatApp',
    filename: '../index.html'
  })],
  optimization: {
    nodeEnv: 'production'
  }
}
