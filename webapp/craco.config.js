// const webpack = require('webpack');
const path = require('path')
const fs = require('fs')
const cracoBabelLoader = require('craco-babel-loader')
const { getLoader, loaderByName } = require("@craco/craco");

// manage relative paths to packages
const appDirectory = fs.realpathSync(process.cwd())
const resolvePackage = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  plugins: [
    {
      plugin: cracoBabelLoader,
      options: {
        includes: [
          resolvePackage('node_modules/@lighthouse-web3/custom'),
        ]
      },
    },
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions, context: { env, paths } }) => {

          const {
            match: { loader: babelLoader },
          } = getLoader(webpackConfig, loaderByName('babel-loader'));

          babelLoader.options.sourceType = "unambiguous";
          babelLoader.exclude = /@babel(?:\/|\\{1,2})runtime|core-js/;
          babelLoader.include = [
            path.resolve("src"),
            path.resolve("node_modules/@lighthouse-web3/custom")
          ];

          return webpackConfig;
        }
      }
    }
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
