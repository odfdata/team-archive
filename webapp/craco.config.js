// const webpack = require('webpack');
const path = require('path')
const fs = require('fs')
const cracoBabelLoader = require('craco-babel-loader')

// manage relative paths to packages
const appDirectory = fs.realpathSync(process.cwd())
const resolvePackage = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  plugins: [
    {
      plugin: cracoBabelLoader,
      options: {
        includes: [
          resolvePackage('node_modules/@lighthouse-web3'),
        ]
      },
    },
  ],
    // webpack: {
    //     configure: (webpackConfig, { env, paths }) => {
    //         // eslint-disable-next-line no-param-reassign
    //         webpackConfig.resolve.fallback = {
    //             crypto: require.resolve('crypto-browserify'),
    //             http: require.resolve('stream-http'),
    //             https: require.resolve('https-browserify'),
    //             os: require.resolve('os-browserify/browser'),
    //             stream: require.resolve('stream-browserify'),
    //         };
    //         // Issue: https://github.com/webpack/changelog-v5/issues/10
    //         webpackConfig.plugins.push(
    //             new webpack.ProvidePlugin({
    //                 process: "process/browser.js",
    //                 Buffer: ["buffer", "Buffer"],
    //             })
    //         );
    //         return webpackConfig;
    //     },
    // },

}
