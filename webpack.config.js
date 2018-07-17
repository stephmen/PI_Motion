var nodeExternals = require('webpack-node-externals');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  target: 'node',
  //externals: [nodeExternals()],
  entry: {
    filename: './index.js',
  },
  output: {
    filename: '_build/bundle.js',
  }
}