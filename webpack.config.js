var path = require('path');

module.exports = {
  entry: "./index.js",
  output: {
    filename: "bundle.js"
  }
}
module: {
  loaders: [
      {
          exclude: /node_modules/,
      }
  ]
}