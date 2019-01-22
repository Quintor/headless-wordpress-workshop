const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withTs = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const webpackConfig = {
  webpack: function(config, options) {
    // Do not run type checking twice:
    if (options.isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    return config;
  }
};

const sassConfig = {};

module.exports = withPlugins([[withTs, webpackConfig], [withSass, sassConfig]]);
