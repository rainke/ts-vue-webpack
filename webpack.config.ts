import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import merge from 'webpack-merge';
import { resolve, styleLoaders } from './build/utils';
import baseConfig from './webpack.config.base';

const config: webpack.Configuration = merge(baseConfig, {
  mode: 'development',
  entry: {
    app:  [
      'webpack-dev-server/client?http://127.0.0.1:8050/sockjs-node',
      'webpack/hot/dev-server',
      './src/main.ts'
    ]
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: '/',
    // https://github.com/webpack/webpack/issues/6642
    globalObject: 'this'
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [{ from: /.*/, to: path.posix.join('/', 'index.html') }]
    },
    hot: true,
    contentBase: resolve('public'),
    watchContentBase: true, // 联合contentBase,修改public的文件时自动刷新浏览器
    compress: false,
    host: 'localhost',
    port: 8050,
    open: true,
    overlay: { warnings: false, errors: true }, // 在页面显示编译错误提示
    publicPath: '/',
    proxy: {},
    quiet: true,
    watchOptions: {
      poll: false
    }
  },
  module: {
    rules: styleLoaders({
      sourceMap: true,
      modules: true
    })
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        BASE_URL: '"/"'
      }
    }),
    // TODO: openBrowserPlugin
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: true
    })
  ]
});

export default config;
