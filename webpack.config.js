var webpack = require('webpack');
var path = require('path');

var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
];

if (process.env.COMPRESS) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  );
}

module.exports = {

  output: {
    path: 'build',
    filename: 'bundle.js'
  },

  externals: [
    /*{
     "react": {
       root: "React",
       commonjs2: "react",
       commonjs: "react",
       amd: "react"
     },
    }*/
    {
      "app-config": "__config",
      "react": "React",
      "react/addons": "React",
      "react/lib/ReactMount": "React._ReactMount",
      "react-router": "ReactRouter",
      "fixed-data-table": "FixedDataTable",
      "tessel-js": "Tessel"
    }
  ],

  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loaders: ['react-hot', 'babel?stage=0'], exclude: /node_modules/ },
      { test: /\.css$/, loaders: ['style', 'css'] },
      { test: /\.(scss|sass)$/, loaders: ['style', 'css', 'sass'] },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ],
    noParse: [/* Regex */]
  },

  resolve: {
    root: [path.resolve("node_modules")],
    extensions: [
      '', '.js', '.jsx',
      '.css', 'sass',
      '.woff', '.woff2', '.ttf', '.eot', '.svg'
    ],
    alias: {}
  },

  node: {
    Buffer: false
  },

  plugins: plugins,

  devtool: process.env.COMPRESS ? null : 'inline-source-map'

};
