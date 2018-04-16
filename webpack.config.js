var path = require("path");

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");
var ASSETS_DIR = path.resolve(__dirname,"assets");
//const webpack = require('webpack')
//var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var config = {
    entry: SRC_DIR + "/app/index.js",
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
       devtool: "eval-source-map",
       devServer: {
     contentBase: './dist',
     hot: true
   },
    module: {
		rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: {
		loader: 'babel-loader',
        options: {
          presets: ['react','es2016'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy',"transform-object-rest-spread"],
        }
		}
      },

    ]
    },
    devServer: {
      historyApiFallback: true
    },
    mode: 'development'
};

module.exports = config;
