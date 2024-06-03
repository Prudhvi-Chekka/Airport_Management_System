// frontend/webpack.config.js

const path = require('path');
const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      zlib: require.resolve('browserify-zlib'),
      querystring: require.resolve('querystring-es3'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
      url: require.resolve('url/'),
      buffer: require.resolve('buffer/'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      fs: require.resolve('fs'),
    },
  },
};
