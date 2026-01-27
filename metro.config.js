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
      // '@': path.resolve(__dirname, 'app'),
      '@components': path.resolve(__dirname, 'app/components'),
      '@screens': path.resolve(__dirname, 'app/screens'),
      '@types': path.resolve(__dirname, 'app/types'),
      '@storage': path.resolve(__dirname, 'app/storage'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
