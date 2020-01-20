const webpackMerge = require('webpack-merge');
const webpackBase = require('./webpack-base.config');

module.exports = webpackMerge(webpackBase, {
  mode: 'development',
});
