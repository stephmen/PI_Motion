const webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  mode: 'development',
  target: 'node',
  //externals: [nodeExternals()],
  entry: {
    filename: './index.js',
  },
  output: {
    filename: './dist/bundle.js',
  }
}