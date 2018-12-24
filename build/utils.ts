import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin  from 'mini-css-extract-plugin';

const rootDir = process.cwd();

export const resolve = (name: string) => {
  return path.resolve(rootDir, name);
};

interface Options {
    [prop: string]: any;
}

export const cssLoaders = (options:Options) => {
  const firstLoader = options.extract
    ? MiniCssExtractPlugin.loader
    : 'style-loader';

  const cssLoader: webpack.RuleSetLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
      modules: options.modules ? true: false,
      localIdentName: options.modules ? '[name]__[local]__[hash:base64:5]' : void 0
    }
  };

  const postcssLoader: webpack.RuleSetLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  function generateLoaders(loader?: webpack.RuleSetUse) {
    const loaders: webpack.RuleSetUse[] = [firstLoader, cssLoader, postcssLoader];
    loader && loaders.push(loader);
    return loaders;
  }
  return {
    // css: generateLoaders(),
    less: generateLoaders({
      loader: 'less-loader',
      options: {
        sourceMap: options.sourceMap
      }
    })
  };
};

export const styleLoaders = function(options: Options = {}) {
  const output: webpack.RuleSetRule[] = [];
  const loaders = cssLoaders(options);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      include: /modules?\.less$/,
      use: loader
    });
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      exclude: /modules?\.less$/,
      use: loader
    })
  }
  return output;
};
