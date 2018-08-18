// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')

// paths
const D = __dirname
const src = `${D}/../src`
const pubDir = `${D}/../public`
const compDir = `${src}/components`





// *****************
//  -------  INDEX ROUTE --------- 
// *****************




const homeRoute = {
  // mode
  mode: 'development',

  // IO
  entry: {
    Main: `${compDir}/Main`,
    App: `${compDir}/App`
  },
  output: {
    filename: "[name].bundle.js",
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
        use: ['babel-loader']
       }
    ]
  },

  // plugins and optimizations
  plugins: [new HtmlWebpackPlugin({
    title: 'ChatApp',
    filename: '../index.html'
  })],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    nodeEnv: 'development'
  }
}




// *****************
//  -------  LOGIN ROUTE --------- 
// *****************






const loginRoute = {
  // mode
  mode: 'development',

  // IO
  entry: {
    Main: `${compDir}/login/Main`
  },
  output: {
    filename: "[name].bundle.js",
    path: `${pubDir}/js/login`
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
        use: ['babel-loader']
       }
    ]
  },

  // plugins and optimizations
  plugins: [new HtmlWebpackPlugin({
    title: 'ChatApp',
    filename: '../../login.html'
  })],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    nodeEnv: 'development'
  }
}


module.exports = [homeRoute, loginRoute]