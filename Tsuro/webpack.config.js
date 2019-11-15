const path = require('path');
const { BannerPlugin } = require('webpack');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

const BASE_PATH = path.resolve(__dirname, '5');
const OUTPUT_FILENAME = 'xobs';

module.exports = {
  target: 'node',
  mode: 'production',
  entry: path.resolve(BASE_PATH, 'src/index.js'),
  output: {
    path: BASE_PATH,
    filename: OUTPUT_FILENAME,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
    }),
    new WebpackShellPlugin({
      onBuildEnd: [`chmod +x ${path.resolve(BASE_PATH, OUTPUT_FILENAME)}`],
    }),
  ],
  externals: [
    nodeExternals({
      whitelist: ['d3-node'],
    }),
  ],
};
