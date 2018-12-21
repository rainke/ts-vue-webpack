import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const rootDir = process.cwd();

export const resolve = (name: string) => {
  return path.resolve(rootDir, name);
};

interface Options {
    [prop: string]: any;
}

export const cssLoaders = (options:Options) => {
  const cssLoader: webpack.RuleSetLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  const postcssLoader: webpack.RuleSetLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  function generateLoaders(loader?: string, loaderOptions?: Options) {
    const loaders: webpack.RuleSetUse[] = ['style-loader', cssLoader, postcssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      });
    }
    if (options.extract) {
    } else {
      return (['vue-style-loader'] as webpack.RuleSetUse[]).concat(loaders);
    }
  }
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less')
  };
};
export const styleLoaders = function(options: Options) {
  const output: webpack.RuleSetRule[] = [];
  const loaders = cssLoaders(options);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    });
  }

  return output;
};
