'use strict'

let request = require('request')
let path = require('path')

let webpack = require('webpack')
let WebpackDevServer = require('webpack-dev-server')
let config = require('./webpack.config.js')

// -------- Entry point -------------------
config.entry = [
  './lib/main.js',
  'webpack/hot/dev-server',
  'webpack-dev-server/client?http://localhost:8080'
]

config.plugins.push(new webpack.HotModuleReplacementPlugin())
config.plugins.push(new webpack.NoErrorsPlugin())

config.output.path = '/'

// ------ webpack-dev-server --------
let server = new WebpackDevServer(webpack(config), {
  contentBase: __dirname,
  hot: true,
  quiet: false,
  noInfo: false,
  publicPath: '/lib/',

  stats: { colors: true }
})

// Webpack Hot Updates
server.use(/^.*update\.(json|js)$/, function(req, res) {
  let url = 'http://localhost:8080/lib' + req.baseUrl
  request(url)
  .pipe(res)
})

// Font assets
server.use(/^.*\.(woff|woff2|ttf|eot|svg)$/, function(req, res) {
  let url = 'http://localhost:8080/lib' + req.baseUrl
  request(url)
  .pipe(res)
})

// Server proxying
server.use('/*', function(req, res) {
  let url = 'http://localhost:8080' + req.baseUrl
  request(url)
  .pipe(res)
})

// ------ run the two servers -------
server.listen(8080, 'localhost', function() {
  console.log('Server is listening on port 8080')
})
