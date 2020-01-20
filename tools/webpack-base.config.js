const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const ROOT_PATH = process.cwd();

const paths = {
  SRC: path.resolve(ROOT_PATH, 'src'),
  DIST: path.resolve(ROOT_PATH, 'dist'),
};

module.exports = {
  entry: path.resolve(paths.SRC, 'index.ts'),
  target: 'node',
  output: {
    path: paths.DIST,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new CopyPlugin([
      { from: path.resolve(ROOT_PATH, '.env'), to: paths.DIST },
    ]),
  ],
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  externals: [nodeExternals()],
};
