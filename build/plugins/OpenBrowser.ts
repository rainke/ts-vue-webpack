import webpack from 'webpack';
import opn from 'opn';

interface OpenBrowserPluginOptions {
  url?: string;
}

class OpenBrowserPlugin {
  private firstRun = true;
  constructor(private options: OpenBrowserPluginOptions = {}) {}

  apply(compiler: webpack.Compiler) {
    compiler.hooks.done.tap('OpenBrowserPlugin', () => {
      if(this.firstRun) {
        this.firstRun = false;
        try {
          opn(this.options.url).catch(() => {})
        } catch(e) {
          // ignore
        }
      }
    })
  }
}

export default OpenBrowserPlugin;
