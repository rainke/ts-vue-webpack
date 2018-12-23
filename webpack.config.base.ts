import webpack from 'webpack';
import { resolve } from './build/utils';

const baseConfig: webpack.Configuration = {
  entry: {
    app: ['./src/main.ts']
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    alias: {
      '@': resolve('src')
      // 第三方库
    },
    modules: ['node_modules']
  },
  module: {
    // noParse: /^(vue)$/, // 第三方库，配合resolve.alias
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: resolve('node_modules/.cache/ts-loader'),
              cacheIdentifier: '5.3.1'
            }
          },
          'babel-loader',
          'ts-loader'
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: resolve('node_modules/.cache/vue-loader'),
              cacheIdentifier: '15.4.2'
            }
          },
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              },
              cacheDirectory: resolve('node_modules/.cache/vue-loader'),
              cacheIdentifier: '15.4.2'
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(svg)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          /* config.module.rule('fonts').use('url-loader') */
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      }
    ]
  },
  plugins: []
};

export default baseConfig;
