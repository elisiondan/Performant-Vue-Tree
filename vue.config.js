// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const WorkerPlugin = require('worker-plugin');

module.exports = {
  runtimeCompiler: true,
  assetsDir: 'spa',
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL,
        ws: false,
        changeOrigin: true,
        secure: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'fi-api-data'),
      },
    },
    plugins: [
      new WorkerPlugin({
        globalObject: 'self',
      }),
    ],
  },
};
