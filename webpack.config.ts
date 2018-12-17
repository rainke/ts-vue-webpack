import webpack from 'webpack';
import path from 'path';

const config: webpack.Configuration = {
  mode: 'development',
  entry:{
    app: [
      './src/main.ts'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
    // https://github.com/webpack/webpack/issues/6642
    globalObject: 'this'
  }
}

export default config;