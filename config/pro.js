module.exports = {
  mode: 'production',
  entry: '../src/components/Main.jsx',
  output: {
    path: '../public/js',
    filename: 'bundle.js'
  },
  resolve: {
    extensions:[".js",".jsx"]
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
    nodeEnv: 'production'
  }
}
