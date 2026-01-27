const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    alias: {
      '@components': path.resolve(__dirname, 'app/components'),
      '@screens': path.resolve(__dirname, 'app/screens'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
