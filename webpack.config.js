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
    // preLoaders: [
    //   { test: /\.(js|jsx)$/, loaders: ['eslint'], exclude: /node_modules/ }
    // ],
    loaders: [
      { test: /\.(js|jsx)$/, loaders: ['react-hot', 'babel?stage=0'], exclude: /node_modules/ },
      { test: /node_modules.*\.css$/, loaders: ['style', 'css'], exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css!postcss' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      { test: /\.(jpg|gif)$/, loader: "url-loader" },
      { test: /\.json$/, loader: "json-loader" }


    ],
    noParse: [
      /* Regex */
      /sweetalert\.min\.js/
    ]
  },

  resolve: {
    root: [path.resolve("node_modules"), path.resolve("src/lib"), path.resolve("src")],
    extensions: [
      '', '.js', '.jsx',
      '.css',
      '.woff', '.woff2', '.ttf', '.eot', '.svg'
    ],
    alias: {}
  },

  node: {
    Buffer: false
  },

  plugins: plugins,

  devtool: process.env.COMPRESS ? null : 'inline-source-map',

  postcss: function() {
    return {
      defaults: [
        // Needed for importing
        require('postcss-import')({
            onImport: function (files) {
                files.forEach(this.addDependency);
            }.bind(this)
        }),
        require('postcss-nested'),
        require('postcss-custom-properties')(),
        require('cssnano')(),
        require('rucksack-css')(),
        require('autoprefixer-core')({browsers: ['> 5%', 'IE 9']})
      ]
    }
  }
};
