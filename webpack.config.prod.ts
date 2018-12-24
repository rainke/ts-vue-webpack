import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import merge from 'webpack-merge';
import { resolve, styleLoaders } from './build/utils';
import baseConfig from './webpack.config.base';

const config: webpack.Configuration = merge(baseConfig, {
  mode: 'development',
  entry: {
    app:  [
      require.resolve(`webpack-dev-server/client`),
      require.resolve('webpack/hot/dev-server'),
      './src/main.ts'
    ]
  },
  output: {
    path: resolve('dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    publicPath: '/',
    globalObject: 'this'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: styleLoaders({
      sourceMap: true,
      extract: true
    })
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        BASE_URL: '"/"'
      }
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
});

export default config;
