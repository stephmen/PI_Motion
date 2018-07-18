const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  path: path.resolve(__dirname, './dist'),
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    filename: './index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  }
}