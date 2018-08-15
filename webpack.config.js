module.exports = {
  entry: './src/components/App.jsx',
  output: {
    path: __dirname,
    filename: "./public/js/bundle.js"
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
  }
}
