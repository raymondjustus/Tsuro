const path = require('path');
const { BannerPlugin } = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin-next');

const files = {
  '5/xobs': '5/src/xobs.js',
  '5/xref': '5/src/xref.js',
};

module.exports = {
  target: 'node',
  mode: 'production',
  entry: Object.entries(files).reduce(
    (acc, [output, input]) =>
      Object.assign(acc, {
        [output]: path.resolve(__dirname, input),
      }),
    {}
  ),
  output: {
    path: __dirname,
    filename: '[name]',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.node$/,
        use: 'node-loader',
      },
    ],
  },
  plugins: [
    new BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
    }),
    new WebpackShellPlugin({
      onBuildEnd: Object.keys(files).map(output => `chmod +x ${path.resolve(__dirname, output)}`),
    }),
  ],
};
