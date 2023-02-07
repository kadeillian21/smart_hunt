//@ts-check
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const Dotenvconfig = require('dotenv').config().parsed;

module.exports = {
  webpack: (config) => {
    config.plugins = config.plugins || [];
    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: '.env',
        systemvars: true,
      }),
    ];
    return config;
  },
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  experimental: {
    appDir: true,
  },
  publicRuntimeConfig: Dotenvconfig,
};

module.exports = withNx(nextConfig);
