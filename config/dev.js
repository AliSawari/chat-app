module.exports = {
  mode: 'development',
  entry: {
    Main: "../src/components/Main.jsx",
    Chat: "../src/components/Chat.jsx",
  },
  output: {
    filename: "[name].bundle.js",
    path: '../public/js'
  },
  resolve: {
    extensions:[".js",".jsx",".tsx"]
  },
  module: {
    rules: [
      {
       exclude: /(node_modules)/,
       use: ['babel-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}