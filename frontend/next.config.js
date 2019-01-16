const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// next.config.js
const withTypescript = require("@zeit/next-typescript");
module.exports = withTypescript();

module.exports = withTypescript({
  webpack(config, options) {
    // Do not run type checking twice:
    if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin());

    return config;
  }
});
